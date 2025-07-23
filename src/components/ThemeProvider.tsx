import { useEffect } from 'react';
import { useAppStore } from '../stores/appStore';

export function ThemeProvider() {
  const theme = useAppStore((state) => state.theme);

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return null;
}