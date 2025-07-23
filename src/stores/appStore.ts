import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import { THEME_CONFIG, type Theme } from '../config/theme';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

interface AppState extends ThemeState {
  // Add more app-wide state here as needed
  // Example: language, user preferences, etc.
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        // Theme state with dark as default
        theme: THEME_CONFIG.DEFAULT_THEME,
        setTheme: (theme) => set({ theme }, false, 'setTheme'),
        toggleTheme: () =>
          set(
            (state) => ({
              theme:
                state.theme === THEME_CONFIG.THEMES.DARK
                  ? THEME_CONFIG.THEMES.LIGHT
                  : THEME_CONFIG.THEMES.DARK,
            }),
            false,
            'toggleTheme'
          ),

        // Add more state and actions here as your app grows
      }),
      {
        name: THEME_CONFIG.STORAGE_KEY,
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          theme: state.theme,
          // Add other fields to persist here
        }),
      }
    ),
    {
      name: 'AppStore',
      enabled: import.meta.env.DEV, // Only enable in development
    }
  )
);

// Helper hook for theme specifically
export const useTheme = () => {
  const { theme, setTheme, toggleTheme } = useAppStore();
  return { theme, setTheme, toggleTheme };
};
