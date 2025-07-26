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
      
      window.history.pushState(
        { language: targetLanguage },
        '',
        newUrl
      );

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
      window.dispatchEvent(new CustomEvent('language-changed', {
        detail: { language: targetLanguage, translations }
      }));

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
    this.listeners.forEach(listener => listener(this.state));
  }

  private updatePageContent(): void {
    // Update all elements with data-i18n attributes
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (key) {
        const translation = this.t(key);
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          (element as HTMLInputElement).placeholder = translation;
        } else {
          element.textContent = translation;
        }
      }
    });

    // Update elements with data-i18n-html attributes (for HTML content)
    const htmlElements = document.querySelectorAll('[data-i18n-html]');
    htmlElements.forEach(element => {
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

// Export for use in components
export default dynamicI18n;