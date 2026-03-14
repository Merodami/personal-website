import { describe, it, expect, vi, beforeAll, beforeEach } from 'vitest';
import {
  mockLanguageStrategyFactory,
  createMockTranslations,
  setupMockStrategy,
  mockTranslations,
} from '../../mocks';

// Mock DOM environment before any imports
beforeAll(() => {
  // Setup JSDOM globals
  global.window = {
    location: { pathname: '/' },
    history: { pushState: vi.fn() },
    addEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  } as unknown as Window & typeof globalThis;

  global.document = {
    documentElement: { setAttribute: vi.fn(), getAttribute: vi.fn() },
    title: '',
    querySelectorAll: vi.fn(() => []),
    querySelector: vi.fn(() => null),
  } as unknown as Document;

  global.localStorage = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  } as unknown as Storage;

  global.CustomEvent = class MockCustomEvent extends Event {
    public detail: unknown;
    constructor(type: string, eventInitDict?: CustomEventInit) {
      super(type, eventInitDict);
      this.detail = eventInitDict?.detail;
    }
  } as unknown as typeof CustomEvent;
});

// Mock dependencies
vi.mock('@/i18n/strategies/LanguageStrategyFactory', () => ({
  LanguageStrategyFactory: mockLanguageStrategyFactory,
}));

vi.mock('@/i18n/astroUtils', () => ({
  getLocalizedUrl: vi.fn((path: string, lang: string) => (lang === 'es' ? `/es${path}` : path)),
}));

vi.mock('lodash-es', () => ({
  get: vi.fn((obj: Record<string, unknown>, path: string, defaultValue?: unknown) => {
    const keys = path.split('.');
    let result: unknown = obj;
    for (const key of keys) {
      result = (result as Record<string, unknown>)?.[key];
      if (result === undefined) return defaultValue;
    }
    return result;
  }),
}));

// Import after mocks are configured
import { DynamicI18n } from '@utils/dynamicI18n';

describe('DynamicI18n', () => {
  let i18n: DynamicI18n;

  beforeEach(() => {
    vi.clearAllMocks();
    // Reset window location
    global.window.location.pathname = '/';
    // Setup default mock strategy
    setupMockStrategy(mockTranslations);
  });

  describe('initialization', () => {
    it('initializes with English for root path', () => {
      global.window.location.pathname = '/';

      i18n = new DynamicI18n();
      const state = i18n.getState();

      expect(state.currentLanguage).toBe('en');
      expect(state.isLoading).toBe(false);
      expect(mockLanguageStrategyFactory.createStrategy).toHaveBeenCalledWith('en');
    });

    it('initializes with Spanish for /es path', () => {
      global.window.location.pathname = '/es/about';

      i18n = new DynamicI18n();
      const state = i18n.getState();

      expect(state.currentLanguage).toBe('es');
      expect(mockLanguageStrategyFactory.createStrategy).toHaveBeenCalledWith('es');
    });

    it('loads translations from strategy', () => {
      i18n = new DynamicI18n();
      const state = i18n.getState();

      expect(state.translations).toBeDefined();
      expect(state.translations.common).toBeDefined();
      expect((state.translations as unknown as typeof mockTranslations).common.hello).toBe('Hello');
    });
  });

  describe('switchLanguage', () => {
    beforeEach(() => {
      global.window.location.pathname = '/about';
      i18n = new DynamicI18n();
    });

    it('switches language successfully', async () => {
      const newTranslations = createMockTranslations({
        common: {
          hello: 'Hola',
          world: 'Mundo',
        },
      });

      setupMockStrategy(newTranslations);

      await i18n.switchLanguage('es');

      expect(mockLanguageStrategyFactory.createStrategy).toHaveBeenCalledWith('es');
      expect(window.history.pushState).toHaveBeenCalledWith({ language: 'es' }, '', '/es/about');
      expect(localStorage.setItem).toHaveBeenCalledWith('preferred-language', 'es');
    });

    it('does nothing if switching to current language', async () => {
      await i18n.switchLanguage('en');

      expect(window.history.pushState).not.toHaveBeenCalled();
      expect(localStorage.setItem).not.toHaveBeenCalled();
    });

    it('dispatches language-changed event', async () => {
      await i18n.switchLanguage('es');

      expect(window.dispatchEvent).toHaveBeenCalled();
      const eventCall = vi.mocked(window.dispatchEvent).mock.calls[0][0] as CustomEvent;
      expect(eventCall.type).toBe('language-changed');
      expect(eventCall.detail.language).toBe('es');
    });

    it('handles errors gracefully', async () => {
      mockLanguageStrategyFactory.createStrategy.mockImplementation(() => {
        throw new Error('Strategy error');
      });
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      await i18n.switchLanguage('es');

      expect(consoleSpy).toHaveBeenCalledWith('Failed to switch language:', expect.any(Error));
      const state = i18n.getState();
      expect(state.isLoading).toBe(false);
      expect(state.currentLanguage).toBe('en');

      consoleSpy.mockRestore();
    });

    it('sets loading state during switch', async () => {
      const states: boolean[] = [];
      i18n.subscribe((state) => {
        states.push(state.isLoading);
      });

      await i18n.switchLanguage('es');

      expect(states).toContain(true);
      expect(states[states.length - 1]).toBe(false);
    });
  });

  describe('translation (t method)', () => {
    beforeEach(() => {
      i18n = new DynamicI18n();
    });

    it('returns translation for valid key', () => {
      expect(i18n.t('common.hello')).toBe('Hello');
      expect(i18n.t('hero.title.part1')).toBe('Welcome');
    });

    it('returns key for missing translation', () => {
      expect(i18n.t('missing.key')).toBe('missing.key');
    });

    it('supports generic type parameter', () => {
      const result: string = i18n.t<string>('common.hello');
      expect(result).toBe('Hello');
    });
  });

  describe('state management', () => {
    beforeEach(() => {
      i18n = new DynamicI18n();
    });

    it('allows subscribing to state changes', () => {
      const listener = vi.fn();
      const unsubscribe = i18n.subscribe(listener);

      i18n.switchLanguage('es');

      expect(listener).toHaveBeenCalled();
      expect(listener).toHaveBeenCalledWith(
        expect.objectContaining({
          currentLanguage: expect.any(String),
          isLoading: expect.any(Boolean),
          translations: expect.any(Object),
        })
      );

      unsubscribe();
    });

    it('unsubscribes listeners correctly', async () => {
      const listener = vi.fn();
      const unsubscribe = i18n.subscribe(listener);

      unsubscribe();
      await i18n.switchLanguage('es');

      // Since we unsubscribed, the listener should only be called once during the initial subscription
      expect(listener).not.toHaveBeenCalled();
    });

    it('returns immutable state copy', () => {
      const state1 = i18n.getState();
      const state2 = i18n.getState();

      expect(state1).not.toBe(state2);
      expect(state1).toEqual(state2);
    });
  });
});
