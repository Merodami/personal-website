import { describe, it, expect, beforeEach, vi } from 'vitest';
import { themeUtils } from '@utils/theme';
import { THEME_CONFIG } from '@config/theme';

describe('themeUtils', () => {
  beforeEach(() => {
    // Clear DOM
    document.documentElement.removeAttribute('data-theme');
    // Clear localStorage mock
    vi.mocked(localStorage.getItem).mockReturnValue(null);
  });

  describe('getStoredTheme', () => {
    it('returns default theme when no theme is stored', () => {
      expect(themeUtils.getStoredTheme()).toBe(THEME_CONFIG.DEFAULT_THEME);
    });

    it('returns stored theme from localStorage', () => {
      const mockStorage = {
        state: { theme: 'light' as const },
      };
      vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify(mockStorage));

      expect(themeUtils.getStoredTheme()).toBe('light');
    });

    it('handles corrupted localStorage data', () => {
      vi.mocked(localStorage.getItem).mockReturnValue('invalid json');

      expect(themeUtils.getStoredTheme()).toBe(THEME_CONFIG.DEFAULT_THEME);
    });
  });

  describe('setTheme', () => {
    it('saves theme to localStorage and applies to DOM', () => {
      themeUtils.setTheme('light');

      expect(localStorage.setItem).toHaveBeenCalledWith(
        THEME_CONFIG.STORAGE_KEY,
        expect.stringContaining('"theme":"light"')
      );
      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });

    it('dispatches theme-change event', () => {
      const listener = vi.fn();
      window.addEventListener('theme-change', listener);

      themeUtils.setTheme('dark');

      expect(listener).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: { theme: 'dark' },
        })
      );

      window.removeEventListener('theme-change', listener);
    });

    it('handles localStorage errors gracefully', () => {
      vi.mocked(localStorage.setItem).mockImplementation(() => {
        throw new Error('Storage error');
      });

      expect(() => themeUtils.setTheme('light')).not.toThrow();
      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });
  });

  describe('toggleTheme', () => {
    it('toggles from dark to light', () => {
      vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify({ state: { theme: 'dark' } }));

      const newTheme = themeUtils.toggleTheme();

      expect(newTheme).toBe('light');
      expect(localStorage.setItem).toHaveBeenCalledWith(
        THEME_CONFIG.STORAGE_KEY,
        expect.stringContaining('"theme":"light"')
      );
    });

    it('toggles from light to dark', () => {
      vi.mocked(localStorage.getItem).mockReturnValue(
        JSON.stringify({ state: { theme: 'light' } })
      );

      const newTheme = themeUtils.toggleTheme();

      expect(newTheme).toBe('dark');
    });
  });

  describe('isDarkTheme', () => {
    it('returns true for dark theme', () => {
      vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify({ state: { theme: 'dark' } }));

      expect(themeUtils.isDarkTheme()).toBe(true);
    });

    it('returns false for light theme', () => {
      vi.mocked(localStorage.getItem).mockReturnValue(
        JSON.stringify({ state: { theme: 'light' } })
      );

      expect(themeUtils.isDarkTheme()).toBe(false);
    });
  });

  describe('onThemeChange', () => {
    it('registers and unregisters theme change listeners', () => {
      const callback = vi.fn();
      const unsubscribe = themeUtils.onThemeChange(callback);

      themeUtils.setTheme('light');
      expect(callback).toHaveBeenCalledWith('light');

      unsubscribe();
      callback.mockClear();

      themeUtils.setTheme('dark');
      expect(callback).not.toHaveBeenCalled();
    });
  });
});
