import { THEME_CONFIG } from '@config/theme';

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
