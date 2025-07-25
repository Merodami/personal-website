import { THEME_CONFIG, type Theme } from '@config/theme';

interface StorageState {
  state: {
    theme: Theme;
    [key: string]: unknown;
  };
}

/**
 * Theme utility functions for consistent theme management across the app
 */
export const themeUtils = {
  /**
   * Get the current theme from storage with proper error handling
   */
  getStoredTheme(): Theme {
    if (typeof window === 'undefined') {
      return THEME_CONFIG.DEFAULT_THEME;
    }

    try {
      const stored = localStorage.getItem(THEME_CONFIG.STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as StorageState;
        return parsed.state?.theme || THEME_CONFIG.DEFAULT_THEME;
      }
    } catch (error) {
      console.warn('Failed to parse theme from storage:', error);
    }

    return THEME_CONFIG.DEFAULT_THEME;
  },

  /**
   * Set theme in storage and apply to DOM
   */
  setTheme(theme: Theme): void {
    if (typeof window === 'undefined') return;

    try {
      // Get existing storage or create new
      let storage: StorageState;
      try {
        const existing = localStorage.getItem(THEME_CONFIG.STORAGE_KEY);
        storage = existing
          ? JSON.parse(existing)
          : { state: { theme: THEME_CONFIG.DEFAULT_THEME } };
      } catch {
        storage = { state: { theme: THEME_CONFIG.DEFAULT_THEME } };
      }

      // Update theme
      storage.state.theme = theme;
      localStorage.setItem(THEME_CONFIG.STORAGE_KEY, JSON.stringify(storage));

      // Apply to DOM
      document.documentElement.setAttribute('data-theme', theme);

      // Dispatch event for listeners
      window.dispatchEvent(new CustomEvent('theme-change', { detail: { theme } }));
    } catch (error) {
      console.error('Failed to set theme:', error);
      // Fallback: at least apply to DOM
      document.documentElement.setAttribute('data-theme', theme);
    }
  },

  /**
   * Toggle between light and dark themes
   */
  toggleTheme(): Theme {
    const current = this.getStoredTheme();
    const newTheme =
      current === THEME_CONFIG.THEMES.DARK ? THEME_CONFIG.THEMES.LIGHT : THEME_CONFIG.THEMES.DARK;

    this.setTheme(newTheme);
    return newTheme;
  },

  /**
   * Initialize theme on page load
   */
  initTheme(): void {
    if (typeof window === 'undefined') return;

    const theme = this.getStoredTheme();
    document.documentElement.setAttribute('data-theme', theme);
  },

  /**
   * Check if current theme is dark
   */
  isDarkTheme(): boolean {
    return this.getStoredTheme() === THEME_CONFIG.THEMES.DARK;
  },

  /**
   * Listen for theme changes
   */
  onThemeChange(callback: (theme: Theme) => void): () => void {
    if (typeof window === 'undefined') return () => {};

    const handler = (event: Event) => {
      const customEvent = event as CustomEvent<{ theme: Theme }>;
      callback(customEvent.detail.theme);
    };

    window.addEventListener('theme-change', handler);
    return () => window.removeEventListener('theme-change', handler);
  },
};
