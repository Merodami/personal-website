import { createStore } from 'zustand/vanilla';
import { persist } from 'zustand/middleware';
import { THEME_CONFIG, type Theme } from '@config/theme';

interface AppState {
  // Theme
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;

  // Add more state here in the future
  // e.g., language, user preferences, etc.
}

export const useAppStore = createStore<AppState>()(
  persist(
    (set) => ({
      // Theme state
      theme: THEME_CONFIG.DEFAULT_THEME,

      setTheme: (theme) => {
        set({ theme });
        // Apply to DOM
        document.documentElement.setAttribute('data-theme', theme);
      },

      toggleTheme: () => {
        set((state) => {
          const newTheme = state.theme === 'dark' ? 'light' : 'dark';
          // Apply to DOM
          document.documentElement.setAttribute('data-theme', newTheme);
          return { theme: newTheme };
        });
      },
    }),
    {
      name: THEME_CONFIG.STORAGE_KEY,
    }
  )
);
