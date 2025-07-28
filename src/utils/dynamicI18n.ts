import type { AvailableLanguage, TranslationResource } from '@/i18n/types';
import { LanguageStrategyFactory } from '@/i18n/strategies/LanguageStrategyFactory';
import { getLocalizedUrl } from '@/i18n/astroUtils';
import { get } from 'lodash-es';

interface DynamicI18nState {
  currentLanguage: AvailableLanguage;
  translations: TranslationResource;
  isLoading: boolean;
}

export class DynamicI18n {
  private state: DynamicI18nState;
  private listeners: Set<(state: DynamicI18nState) => void> = new Set();

  constructor() {
    // Initialize with current page language
    const currentPath = window.location.pathname;
    const currentLanguage: AvailableLanguage = currentPath.startsWith('/es') ? 'es' : 'en';

    const strategy = LanguageStrategyFactory.createStrategy(currentLanguage);
    this.state = {
      currentLanguage,
      translations: strategy.getTranslations(),
      isLoading: false,
    };
  }

  /**
   * Switch language dynamically without page reload
   */
  async switchLanguage(targetLanguage: AvailableLanguage): Promise<void> {
    if (this.state.currentLanguage === targetLanguage) return;

    this.setState({ isLoading: true });

    try {
      const strategy = LanguageStrategyFactory.createStrategy(targetLanguage);
      const translations = strategy.getTranslations();

      // Update URL using history.pushState
      const currentPath = window.location.pathname;
      const newUrl = getLocalizedUrl(currentPath, targetLanguage);

      window.history.pushState({ language: targetLanguage }, '', newUrl);

      // Update state
      this.setState({
        currentLanguage: targetLanguage,
        translations,
        isLoading: false,
      });

      // Update page content
      this.updatePageContent();

      // Store preference
      localStorage.setItem('preferred-language', targetLanguage);

      // Dispatch custom event for other components
      window.dispatchEvent(
        new CustomEvent('language-changed', {
          detail: { language: targetLanguage, translations },
        })
      );
    } catch (error) {
      console.error('Failed to switch language:', error);
      this.setState({ isLoading: false });
    }
  }

  /**
   * Get translation for a key
   */
  t<T = string>(key: string): T {
    return get(this.state.translations, key, key) as T;
  }

  /**
   * Subscribe to state changes
   */
  subscribe(listener: (state: DynamicI18nState) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /**
   * Get current state
   */
  getState(): DynamicI18nState {
    return { ...this.state };
  }

  private setState(updates: Partial<DynamicI18nState>): void {
    this.state = { ...this.state, ...updates };
    this.listeners.forEach((listener) => listener(this.state));
  }

  private updatePageContent(): void {
    // Update all elements with data-i18n attributes
    const elements = document.querySelectorAll('[data-i18n]');

    elements.forEach((element) => {
      const key = element.getAttribute('data-i18n');
      if (key) {
        const translation = this.t(key);

        // Check if this is a button with an icon (SVG child)
        const hasSvgChild = element.querySelector('svg') !== null;

        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          (element as HTMLInputElement).placeholder = translation;
        } else if (!hasSvgChild) {
          // Only update text content if there's no SVG icon
          element.textContent = translation;
        }

        // Always update aria-label if present
        if (element.hasAttribute('aria-label')) {
          element.setAttribute('aria-label', translation);
        }

        // Always update title if present
        if (element.hasAttribute('title')) {
          element.setAttribute('title', translation);
        }
      }
    });

    // Update elements with data-i18n-html attributes (for HTML content)
    const htmlElements = document.querySelectorAll('[data-i18n-html]');
    htmlElements.forEach((element) => {
      const key = element.getAttribute('data-i18n-html');
      if (key) {
        const translation = this.t(key);
        element.innerHTML = translation;
      }
    });

    // Update document title and meta description if they exist
    const currentLang = this.state.currentLanguage;
    const currentPath = window.location.pathname;

    // Update page title based on current route
    if (currentPath === '/' || currentPath === '/es/') {
      document.title = this.t('hero.title.part1') + ' ' + this.t('hero.title.part2');
    } else if (currentPath.includes('about')) {
      document.title = this.t('about.title') + ' - Damian Meroni';
    } else if (currentPath.includes('contact')) {
      document.title = this.t('contact.title') + ' - Damian Meroni';
    } else if (currentPath.includes('projects')) {
      document.title = this.t('projects.title') + ' - Damian Meroni';
    }

    // Update html lang attribute
    document.documentElement.setAttribute('lang', currentLang);

    // Update language switcher state
    this.updateLanguageSwitcher();

    // Update dynamic components that need regeneration
    this.updateExperienceCards();

    // Update navigation links
    this.updateNavigationLinks();

    // Update dynamic text component
    this.updateDynamicText();

    // Update CV download button
    this.updateCVDownloadButton();

    // Update contact cards
    this.updateContactCards();
  }

  private updateLanguageSwitcher(): void {
    const currentLang = this.state.currentLanguage;

    // Update language code display
    const langCodeElement = document.querySelector('.language-code');
    if (langCodeElement) {
      langCodeElement.textContent = currentLang.toUpperCase();
    }

    // Update active states in language options
    const languageOptions = document.querySelectorAll('.language-option');
    languageOptions.forEach((option) => {
      const optionLang = (option as HTMLElement).dataset.lang;
      if (optionLang === currentLang) {
        option.classList.add('active');
        // Show check icon if it exists
        const checkIcon = option.querySelector('.check-icon');
        if (checkIcon) {
          (checkIcon as HTMLElement).style.display = '';
        }
      } else {
        option.classList.remove('active');
        // Hide check icon if it exists
        const checkIcon = option.querySelector('.check-icon');
        if (checkIcon) {
          (checkIcon as HTMLElement).style.display = 'none';
        }
      }
    });
  }

  private updateExperienceCards(): void {
    const experienceContainer = document.querySelector('[data-i18n-experience-cards]');
    if (!experienceContainer) return;

    // Get the new experience data
    const experiences = this.t<
      Array<{
        company: string;
        position: string;
        startDate: string;
        endDate: string;
        description: string;
        technologies: string[];
      }>
    >('experience.jobs');

    // Generate new HTML for experience cards
    const cardsHTML = experiences
      .map(
        (exp) => `
      <div class="relative" style="background: var(--glass-bg); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid var(--glass-border); border-radius: 1rem; padding: 1.5rem; transition: all 0.3s ease;">
        <div class="flex items-start gap-4">
          <div class="flex-shrink-0 w-2 h-2 rounded-full mt-2" style="background-color: var(--color-primary)"></div>
          <div class="flex-grow">
            <div class="flex flex-wrap items-center gap-2 mb-2">
              <h3 class="text-xl font-semibold text-primary">${exp.position}</h3>
              <span class="text-secondary">at</span>
              <span class="font-medium" style="color: var(--color-primary)">${exp.company}</span>
            </div>
            <div class="text-sm text-secondary mb-3">
              ${exp.startDate} - ${exp.endDate}
            </div>
            <p class="text-secondary mb-4">${exp.description}</p>
            <div class="flex flex-wrap gap-2">
              ${exp.technologies
                .map(
                  (tech) => `
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" 
                      style="background-color: var(--color-primary-alpha); color: var(--color-primary);">
                  ${tech}
                </span>
              `
                )
                .join('')}
            </div>
          </div>
        </div>
      </div>
    `
      )
      .join('');

    // Update the container content
    experienceContainer.innerHTML = cardsHTML;
  }

  private updateNavigationLinks(): void {
    const currentLang = this.state.currentLanguage;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (!href) return;

      // Extract the base path (remove language prefix)
      let basePath = href;
      if (href.startsWith('/es/')) {
        basePath = href.replace('/es', '') || '/';
      }

      // Generate new URL for current language
      const newHref = currentLang === 'es' ? `/es${basePath}` : basePath;
      link.setAttribute('href', newHref);
    });
  }

  private updateDynamicText(): void {
    const dynamicTextElement = document.querySelector('.data-i18n-dynamic-words');
    if (!dynamicTextElement) return;

    // Generate new words array for current language
    const newWords = [
      { text: this.t('hero.dynamicWords.build'), color: '#3178C6' }, // TypeScript blue
      { text: this.t('hero.dynamicWords.create'), color: '#61DAFB' }, // React cyan
      { text: this.t('hero.dynamicWords.develop'), color: '#339933' }, // Node.js green
      { text: this.t('hero.dynamicWords.engineer'), color: '#F7DF1E' }, // JavaScript yellow
      { text: this.t('hero.dynamicWords.craft'), color: '#DD0031' }, // Angular red
      { text: this.t('hero.dynamicWords.architect'), color: '#2496ED' }, // Docker blue
      { text: this.t('hero.dynamicWords.code'), color: '#FF9900' }, // AWS orange
      { text: this.t('hero.dynamicWords.forge'), color: '#4169E1' }, // PostgreSQL blue
      { text: this.t('hero.dynamicWords.shape'), color: '#47A248' }, // MongoDB green
    ];

    // Update the data-words attribute
    dynamicTextElement.setAttribute('data-words', JSON.stringify(newWords));

    // Trigger a custom event to notify the DynamicText component
    const updateEvent = new CustomEvent('dynamicTextUpdate', {
      detail: { words: newWords },
    });
    dynamicTextElement.dispatchEvent(updateEvent);
  }

  private updateCVDownloadButton(): void {
    const currentLang = this.state.currentLanguage;
    const cvPath =
      currentLang === 'es' ? '/cv/Damian_Meroni_CV_ES_I.pdf' : '/cv/Damian_Meroni_CV_EN_I.pdf';

    // Update all CV download buttons (hero and floating)
    const cvDownloadButtons = document.querySelectorAll(
      '[data-cv-download], [data-cv-download-floating]'
    );
    cvDownloadButtons.forEach((button) => {
      if (button instanceof HTMLAnchorElement) {
        button.href = cvPath;
      }
    });
  }

  private updateContactCards(): void {
    // Update contact card titles
    const titleElements = document.querySelectorAll('[data-i18n-title]');
    titleElements.forEach((element, index) => {
      const titleKeys = ['contact.emailMe', 'contact.linkedin', 'contact.scheduleCall'];
      if (titleKeys[index]) {
        element.textContent = this.t(titleKeys[index]);
      }
    });

    // Update contact card descriptions
    const descriptionElements = document.querySelectorAll('[data-i18n-description]');
    descriptionElements.forEach((element, index) => {
      const descriptionKeys = [
        'contact.emailDescription',
        'contact.linkedinDescription',
        'contact.scheduleDescription',
      ];
      if (descriptionKeys[index]) {
        element.textContent = this.t(descriptionKeys[index]);
      }
    });

    // Update link text
    const linkTextElements = document.querySelectorAll('[data-i18n-link-text]');
    linkTextElements.forEach((element, index) => {
      if (index === 1) {
        // LinkedIn link
        element.textContent = this.t('contact.viewProfile');
      }
      // Email link text stays the same (hello@damianmeroni.dev)
    });

    // Update button text
    const buttonTextElements = document.querySelectorAll('[data-i18n-button-text]');
    buttonTextElements.forEach((element) => {
      element.textContent = this.t('contact.bookMeeting');
    });
  }
}

// Create global instance
export const dynamicI18n = new DynamicI18n();

// Handle browser back/forward navigation
window.addEventListener('popstate', () => {
  const currentPath = window.location.pathname;
  const language: AvailableLanguage = currentPath.startsWith('/es') ? 'es' : 'en';

  if (language !== dynamicI18n.getState().currentLanguage) {
    dynamicI18n.switchLanguage(language);
  }
});
