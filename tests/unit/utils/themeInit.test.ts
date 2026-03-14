import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { themeInitScript } from '@utils/themeInit';
import { THEME_CONFIG } from '@config/theme';
import { JSDOM } from 'jsdom';

describe('themeInitScript', () => {
  let dom: JSDOM;
  let localStorageMock: { [key: string]: string };

  beforeEach(() => {
    dom = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>', {
      url: 'http://localhost',
    });
    global.document = dom.window.document;
    global.window = dom.window as unknown as Window & typeof globalThis;

    // Mock localStorage
    localStorageMock = {};
    global.localStorage = {
      getItem: vi.fn((key: string) => localStorageMock[key] || null),
      setItem: vi.fn((key: string, value: string) => {
        localStorageMock[key] = value;
      }),
      removeItem: vi.fn((key: string) => {
        delete localStorageMock[key];
      }),
      clear: vi.fn(() => {
        localStorageMock = {};
      }),
      length: 0,
      key: vi.fn(() => null),
    } as unknown as Storage;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('script generation', () => {
    it('generates an IIFE script', () => {
      expect(themeInitScript).toMatch(/^\s*\(function\(\)\s*\{/);
      expect(themeInitScript).toMatch(/\}\)\(\);\s*$/);
    });

    it('includes the correct storage key', () => {
      expect(themeInitScript).toContain(`const STORAGE_KEY = '${THEME_CONFIG.STORAGE_KEY}'`);
    });

    it('includes the correct default theme', () => {
      expect(themeInitScript).toContain(`const DEFAULT_THEME = '${THEME_CONFIG.DEFAULT_THEME}'`);
    });
  });

  describe('theme initialization', () => {
    it('sets default theme when no stored theme exists', () => {
      // Execute the script
      eval(themeInitScript);

      expect(document.documentElement.getAttribute('data-theme')).toBe(THEME_CONFIG.DEFAULT_THEME);
    });

    it('loads theme from localStorage when available', () => {
      // Set up localStorage with a saved theme
      const savedState = {
        state: { theme: 'light' },
      };
      localStorageMock[THEME_CONFIG.STORAGE_KEY] = JSON.stringify(savedState);

      // Execute the script
      eval(themeInitScript);

      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });

    it('handles corrupted localStorage data gracefully', () => {
      // Set corrupted data in localStorage
      localStorageMock[THEME_CONFIG.STORAGE_KEY] = 'invalid json';

      // Execute the script - should fall back to default
      eval(themeInitScript);

      expect(document.documentElement.getAttribute('data-theme')).toBe(THEME_CONFIG.DEFAULT_THEME);
    });

    it('handles missing state property in stored data', () => {
      // Set data without state property
      localStorageMock[THEME_CONFIG.STORAGE_KEY] = JSON.stringify({});

      // Execute the script
      eval(themeInitScript);

      expect(document.documentElement.getAttribute('data-theme')).toBe(THEME_CONFIG.DEFAULT_THEME);
    });

    it('handles missing theme property in state', () => {
      // Set data with state but no theme
      const savedState = {
        state: {},
      };
      localStorageMock[THEME_CONFIG.STORAGE_KEY] = JSON.stringify(savedState);

      // Execute the script
      eval(themeInitScript);

      expect(document.documentElement.getAttribute('data-theme')).toBe(THEME_CONFIG.DEFAULT_THEME);
    });
  });

  describe('error handling', () => {
    it('handles localStorage access errors', () => {
      // Mock localStorage to throw an error
      global.localStorage.getItem = vi.fn(() => {
        throw new Error('Access denied');
      });

      // Execute the script - should not throw
      expect(() => eval(themeInitScript)).not.toThrow();

      // Should fall back to default theme
      expect(document.documentElement.getAttribute('data-theme')).toBe(THEME_CONFIG.DEFAULT_THEME);
    });

    it('handles JSON parse errors silently', () => {
      // This is already tested in 'handles corrupted localStorage data gracefully'
      // but we can add a console spy to ensure no errors are logged
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      localStorageMock[THEME_CONFIG.STORAGE_KEY] = '{invalid json}';

      eval(themeInitScript);

      // Should not log any errors
      expect(consoleSpy).not.toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });

  describe('SSR safety', () => {
    it('script can be safely included in SSR', () => {
      // The script should be a string that can be included in HTML
      expect(typeof themeInitScript).toBe('string');

      // Script should be wrapped in an IIFE to avoid global scope pollution
      expect(themeInitScript.trim()).toMatch(/^\(function\(\)/);
      expect(themeInitScript.trim()).toMatch(/\}\)\(\);$/);

      // All DOM access should be inside the IIFE
      const scriptWithoutIIFE = themeInitScript.replace(
        /^\s*\(function\(\)\s*\{[\s\S]*\}\)\(\);\s*$/,
        ''
      );
      expect(scriptWithoutIIFE).not.toContain('document');
      expect(scriptWithoutIIFE).not.toContain('window');
      expect(scriptWithoutIIFE).not.toContain('localStorage');
    });

    it('prevents flash of incorrect theme', () => {
      // Set light theme in localStorage
      const savedState = {
        state: { theme: 'light' },
      };
      localStorageMock[THEME_CONFIG.STORAGE_KEY] = JSON.stringify(savedState);

      // Document starts with default theme
      document.documentElement.setAttribute('data-theme', 'dark');

      // Execute script
      eval(themeInitScript);

      // Theme should be immediately updated
      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });
  });
});
