import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  detectUserLanguage,
  isValidLanguage,
  persistLanguage,
  formatDate,
  formatNumber,
  interpolate,
  getTranslationKey,
} from '@/i18n/utils';

describe('i18n utils', () => {
  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();
    // Clear localStorage
    global.localStorage.clear();
  });

  describe('isValidLanguage', () => {
    it('should return true for valid languages', () => {
      expect(isValidLanguage('en')).toBe(true);
      expect(isValidLanguage('es')).toBe(true);
    });

    it('should return false for invalid languages', () => {
      expect(isValidLanguage('fr')).toBe(false);
      expect(isValidLanguage('de')).toBe(false);
      expect(isValidLanguage('')).toBe(false);
    });
  });

  describe('detectUserLanguage', () => {
    it('should return default language in SSR environment', () => {
      const originalWindow = global.window;
      // @ts-expect-error - simulating SSR
      delete global.window;

      expect(detectUserLanguage()).toBe('en');

      global.window = originalWindow;
    });

    it('should detect language from localStorage first', () => {
      // Mock localStorage in jsdom
      Object.defineProperty(window, 'localStorage', {
        value: {
          getItem: vi.fn(() => 'es'),
          setItem: vi.fn(),
          clear: vi.fn(),
        },
        writable: true,
      });
      expect(detectUserLanguage()).toBe('es');
    });

    it('should detect language from navigator if not in localStorage', () => {
      // Reset localStorage mock to return null
      Object.defineProperty(window, 'localStorage', {
        value: {
          getItem: vi.fn(() => null),
          setItem: vi.fn(),
          clear: vi.fn(),
        },
        writable: true,
      });

      Object.defineProperty(navigator, 'language', {
        value: 'es-AR',
        configurable: true,
      });

      expect(detectUserLanguage()).toBe('es');
    });

    it('should return default language if no valid language detected', () => {
      // Reset localStorage mock to return null
      Object.defineProperty(window, 'localStorage', {
        value: {
          getItem: vi.fn(() => null),
          setItem: vi.fn(),
          clear: vi.fn(),
        },
        writable: true,
      });

      Object.defineProperty(navigator, 'language', {
        value: 'fr-FR',
        configurable: true,
      });

      expect(detectUserLanguage()).toBe('en');
    });
  });

  describe('persistLanguage', () => {
    it('should not throw in SSR environment', () => {
      const originalWindow = global.window;
      // @ts-expect-error - simulating SSR
      delete global.window;

      expect(() => persistLanguage('es')).not.toThrow();

      global.window = originalWindow;
    });

    it('should save language to localStorage and update DOM', () => {
      const mockLocalStorage = {
        getItem: vi.fn(),
        setItem: vi.fn(),
        clear: vi.fn(),
      };
      Object.defineProperty(window, 'localStorage', {
        value: mockLocalStorage,
        writable: true,
      });

      persistLanguage('es');

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('preferred-language', 'es');
      expect(document.documentElement.lang).toBe('es');
      expect(document.documentElement.dir).toBe('ltr');
    });
  });

  describe('formatDate', () => {
    it('should format date according to locale', () => {
      const date = new Date('2024-01-15T00:00:00');

      // Format depends on environment, so just check it contains expected parts
      expect(formatDate(date, 'en-US')).toContain('January');
      expect(formatDate(date, 'en-US')).toMatch(/2024/);
      expect(formatDate(date, 'es-AR')).toContain('enero');
      expect(formatDate(date, 'es-AR')).toMatch(/2024/);
    });
  });

  describe('formatNumber', () => {
    it('should format number according to locale', () => {
      const number = 1234.56;

      expect(formatNumber(number, 'en-US')).toBe('1,234.56');
      expect(formatNumber(number, 'es-AR')).toBe('1.234,56');
    });
  });

  describe('interpolate', () => {
    it('should replace placeholders with values', () => {
      const template = 'Hello {{name}}, you have {{count}} messages';
      const params = { name: 'John', count: 5 };

      expect(interpolate(template, params)).toBe('Hello John, you have 5 messages');
    });

    it('should handle missing parameters', () => {
      const template = 'Hello {{name}}, welcome {{missing}}';
      const params = { name: 'John' };

      expect(interpolate(template, params)).toBe('Hello John, welcome {{missing}}');
    });

    it('should handle non-string templates', () => {
      // Test with invalid inputs using type assertion for testing purposes
      // @ts-expect-error - Testing invalid input handling
      expect(interpolate(null, {})).toBe('');
      // @ts-expect-error - Testing invalid input handling
      expect(interpolate(undefined, {})).toBe('');
      // @ts-expect-error - Testing invalid input handling
      expect(interpolate(123, {})).toBe('');
    });
  });

  describe('getTranslationKey', () => {
    it('should return translation value for valid key', () => {
      const translations = {
        greeting: 'Hello',
        nested: {
          message: 'Welcome',
        },
      };

      expect(getTranslationKey('greeting', translations)).toBe('Hello');
      // getTranslationKey doesn't handle nested keys with dots
      expect(getTranslationKey('nested', translations)).toBe('nested');
    });

    it('should return key if translation not found', () => {
      const translations = { greeting: 'Hello' };

      expect(getTranslationKey('missing.key', translations)).toBe('missing.key');
    });

    it('should handle non-string values', () => {
      const translations = {
        number: 123,
        object: { nested: 'value' },
      };

      expect(getTranslationKey('number', translations)).toBe('number');
      expect(getTranslationKey('object', translations)).toBe('object');
    });
  });
});
