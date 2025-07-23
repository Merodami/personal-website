export type Theme = 'light' | 'dark';

export function getTheme(): Theme {
  if (typeof localStorage !== 'undefined' && localStorage.theme) {
    return localStorage.theme as Theme;
  }
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

export function setTheme(theme: Theme): void {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.theme = theme;
}

export function toggleTheme(): void {
  const currentTheme = document.documentElement.getAttribute('data-theme') as Theme;
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
}
