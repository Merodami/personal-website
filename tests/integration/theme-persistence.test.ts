import { describe, it, expect, beforeEach, vi } from 'vitest';
import { themeUtils } from '@utils/theme';
import { THEME_CONFIG } from '@config/theme';

describe('Theme Persistence Integration', () => {
  beforeEach(() => {
    // Clean state
    vi.clearAllMocks();
    vi.mocked(localStorage.getItem).mockReturnValue(null);
    document.documentElement.removeAttribute('data-theme');
  });

  it('persists theme changes across utils and DOM', () => {
    // Initial state
    themeUtils.initTheme();
    expect(document.documentElement.getAttribute('data-theme')).toBe(THEME_CONFIG.DEFAULT_THEME);

    // Change theme
    themeUtils.setTheme('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');

    // Mock localStorage to return the saved theme
    vi.mocked(localStorage.setItem).mockClear();
    vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify({ state: { theme: 'light' } }));

    // Simulate page reload by re-initializing
    document.documentElement.removeAttribute('data-theme');
    themeUtils.initTheme();

    // Theme should persist
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('handles theme toggle workflow', () => {
    const listener = vi.fn();
    const unsubscribe = themeUtils.onThemeChange(listener);

    // Start with default theme
    expect(themeUtils.isDarkTheme()).toBe(true);

    // Toggle theme
    const newTheme = themeUtils.toggleTheme();
    expect(newTheme).toBe('light');

    // Mock the updated localStorage state after toggle
    vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify({ state: { theme: 'light' } }));

    expect(themeUtils.isDarkTheme()).toBe(false);
    expect(listener).toHaveBeenCalledWith('light');

    // Toggle back
    themeUtils.toggleTheme();

    // Mock the updated localStorage state after second toggle
    vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify({ state: { theme: 'dark' } }));

    expect(themeUtils.isDarkTheme()).toBe(true);
    expect(listener).toHaveBeenCalledWith('dark');

    unsubscribe();
  });
});
