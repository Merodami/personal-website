import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { setupI18nMocks } from '../../mocks';

// Setup mocks before imports
setupI18nMocks();

// Import after mocks are configured
import { DynamicI18n } from '@utils/dynamicI18n';

describe('DynamicI18n DOM integration', () => {
  let i18n: DynamicI18n;

  beforeEach(() => {
    window.history.pushState({}, '', '/');
    document.body.innerHTML = '';
    document.title = '';
    i18n = new DynamicI18n();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('updateSkillsGrid', () => {
    it('updates skills container with new skills', async () => {
      document.body.innerHTML = `
        <div data-i18n-skills></div>
      `;

      const mockSkills = ['JavaScript', 'TypeScript', 'React'];

      i18n.t = vi.fn((key: string) => {
        if (key === 'aboutPage.skills') return mockSkills;
        return key;
      }) as unknown as DynamicI18n['t'];

      await i18n.switchLanguage('es');

      const container = document.querySelector('[data-i18n-skills]');
      expect(container?.innerHTML).toContain('JavaScript');
      expect(container?.innerHTML).toContain('TypeScript');
      expect(container?.innerHTML).toContain('React');
    });
  });

  describe('special DOM updates', () => {
    it('updates CV link href', async () => {
      document.body.innerHTML = `
        <a data-cv-download href="/old-cv.pdf">Download CV</a>
      `;

      await i18n.switchLanguage('es');

      const link = document.querySelector('[data-cv-download]') as HTMLAnchorElement;
      expect(link.getAttribute('href')).toBe('/cv/international/Damian_Meroni_CV_ES_I.pdf');
    });

    it('updates experience dates', async () => {
      document.body.innerHTML = `
        <time data-i18n="experience.senior.date">Old Date</time>
      `;

      i18n.t = vi.fn((key: string) => {
        if (key === 'experience.senior.date') return '2023 - Present';
        return key;
      }) as unknown as DynamicI18n['t'];

      await i18n.switchLanguage('es');

      const time = document.querySelector('time');
      expect(time?.textContent).toBe('2023 - Present');
    });

    it('updates link text elements', async () => {
      document.body.innerHTML = `
        <span data-i18n-link-text>Old Text</span>
        <span data-i18n-link-text>LinkedIn Text</span>
      `;

      i18n.t = vi.fn((key: string) => {
        if (key === 'contact.viewProfile') return 'View Profile';
        return key;
      }) as unknown as DynamicI18n['t'];

      await i18n.switchLanguage('es');

      const spans = document.querySelectorAll('[data-i18n-link-text]');
      expect(spans[1].textContent).toBe('View Profile');
    });

    it('updates button text elements', async () => {
      document.body.innerHTML = `
        <span data-i18n-button-text>Old Button Text</span>
      `;

      i18n.t = vi.fn((key: string) => {
        if (key === 'contact.bookMeeting') return 'Book a Meeting';
        return key;
      }) as unknown as DynamicI18n['t'];

      await i18n.switchLanguage('es');

      const span = document.querySelector('[data-i18n-button-text]');
      expect(span?.textContent).toBe('Book a Meeting');
    });

    it('updates document title for different pages', async () => {
      i18n.t = vi.fn((key: string) => {
        if (key === 'hero.title.part1') return 'Welcome';
        if (key === 'hero.title.part2') return 'Home';
        return key;
      }) as unknown as DynamicI18n['t'];

      await i18n.switchLanguage('es');

      expect(document.title).toBe('Welcome Home');
    });

    it('updates html lang attribute', async () => {
      await i18n.switchLanguage('es');

      expect(document.documentElement.getAttribute('lang')).toBe('es');
    });

    it('updates language switcher state', async () => {
      document.body.innerHTML = `
        <div class="language-code">EN</div>
        <div class="language-option active" data-lang="en">
          <div class="check-icon"></div>
        </div>
        <div class="language-option" data-lang="es">
          <div class="check-icon" style="display: none;"></div>
        </div>
      `;

      await i18n.switchLanguage('es');

      const langCode = document.querySelector('.language-code');
      const enOption = document.querySelector('[data-lang="en"]');
      const esOption = document.querySelector('[data-lang="es"]');

      expect(langCode?.textContent).toBe('ES');
      expect(enOption?.classList.contains('active')).toBe(false);
      expect(esOption?.classList.contains('active')).toBe(true);
    });

    it('updates navigation links', async () => {
      document.body.innerHTML = `
        <a class="nav-link" href="/about">About</a>
        <a class="nav-link" href="/es/projects">Projects</a>
      `;

      await i18n.switchLanguage('es');

      const links = document.querySelectorAll('.nav-link');
      expect(links[0].getAttribute('href')).toBe('/es/about');
      expect(links[1].getAttribute('href')).toBe('/es/projects');
    });

    it('updates dynamic text component data', async () => {
      document.body.innerHTML = `
        <div class="data-i18n-dynamic-words" data-words="[]"></div>
      `;

      const dynamicWords: Record<string, string> = {
        'hero.dynamicWords.build': 'Construir',
        'hero.dynamicWords.create': 'Crear',
        'hero.dynamicWords.develop': 'Desarrollar',
        'hero.dynamicWords.engineer': 'Ingeniero',
        'hero.dynamicWords.craft': 'Crear',
        'hero.dynamicWords.architect': 'Arquitecto',
        'hero.dynamicWords.code': 'Código',
        'hero.dynamicWords.forge': 'Forjar',
        'hero.dynamicWords.shape': 'Formar',
      };

      i18n.t = vi.fn((key: string) => {
        return dynamicWords[key] || key;
      }) as unknown as DynamicI18n['t'];

      const eventListener = vi.fn();
      const element = document.querySelector('.data-i18n-dynamic-words');
      element?.addEventListener('dynamicTextUpdate', eventListener);

      await i18n.switchLanguage('es');

      expect(eventListener).toHaveBeenCalled();
      const event = eventListener.mock.calls[0][0] as CustomEvent;
      expect(event.detail.words).toBeDefined();
      expect(event.detail.words[0].text).toBe('Construir');
    });
  });
});
