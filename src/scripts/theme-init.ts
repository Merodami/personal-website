import { THEME_CONFIG } from '../config/theme';

/**
 * Theme initialization script
 * This needs to be minimal and fast to prevent flash of unstyled content
 */
export function getInitialTheme(): string {
  try {
    const stored = localStorage.getItem(THEME_CONFIG.STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.state?.theme || THEME_CONFIG.DEFAULT_THEME;
    }
  } catch (e) {
    // Silent fail - return default
  }
  return THEME_CONFIG.DEFAULT_THEME;
}

// Export as string for inline script usage
export const themeInitScript = `
(function() {
  const STORAGE_KEY = '${THEME_CONFIG.STORAGE_KEY}';
  const DEFAULT_THEME = '${THEME_CONFIG.DEFAULT_THEME}';
  
  function getTheme() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.state?.theme || DEFAULT_THEME;
      }
    } catch (e) {}
    return DEFAULT_THEME;
  }
  
  document.documentElement.setAttribute('data-theme', getTheme());
})();
`;