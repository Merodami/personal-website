export const THEME_CONFIG = {
  STORAGE_KEY: 'app-storage',
  DEFAULT_THEME: 'dark',
  THEMES: {
    LIGHT: 'light',
    DARK: 'dark',
  },
} as const;

export type Theme = (typeof THEME_CONFIG.THEMES)[keyof typeof THEME_CONFIG.THEMES];
