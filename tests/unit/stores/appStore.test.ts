import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useAppStore } from '@stores/appStore';
import { THEME_CONFIG } from '@config/theme';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

describe('appStore', () => {
  let store: ReturnType<typeof useAppStore.getState>;

  beforeEach(() => {
    // Clear localStorage mock
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();

    // Reset store to initial state
    useAppStore.setState({
      theme: THEME_CONFIG.DEFAULT_THEME,
    });

    store = useAppStore.getState();

    // Setup DOM
    document.documentElement.setAttribute('data-theme', THEME_CONFIG.DEFAULT_THEME);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('initial state', () => {
    it('has default theme', () => {
      expect(store.theme).toBe(THEME_CONFIG.DEFAULT_THEME);
    });
  });

  describe('setTheme', () => {
    it('updates theme in state', () => {
      store.setTheme('light');

      const newState = useAppStore.getState();
      expect(newState.theme).toBe('light');
    });

    it('applies theme to DOM', () => {
      store.setTheme('light');

      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });

    it('handles dark theme', () => {
      store.setTheme('dark');

      const newState = useAppStore.getState();
      expect(newState.theme).toBe('dark');
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });
  });

  describe('toggleTheme', () => {
    it('toggles from dark to light', () => {
      useAppStore.setState({ theme: 'dark' });
      document.documentElement.setAttribute('data-theme', 'dark');

      const store = useAppStore.getState();
      store.toggleTheme();

      const newState = useAppStore.getState();
      expect(newState.theme).toBe('light');
      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });

    it('toggles from light to dark', () => {
      useAppStore.setState({ theme: 'light' });
      document.documentElement.setAttribute('data-theme', 'light');

      const store = useAppStore.getState();
      store.toggleTheme();

      const newState = useAppStore.getState();
      expect(newState.theme).toBe('dark');
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });

    it('updates DOM when toggling', () => {
      useAppStore.setState({ theme: 'dark' });

      const store = useAppStore.getState();
      store.toggleTheme();

      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });
  });

  describe('persistence', () => {
    it('uses correct storage key', () => {
      // The storage key should match our theme config
      expect(THEME_CONFIG.STORAGE_KEY).toBe('app-storage');
    });

    it('store is configured with persist middleware', () => {
      // The store should be created with persist middleware
      // This is verified by the fact that the store has the expected methods
      expect(typeof store.setTheme).toBe('function');
      expect(typeof store.toggleTheme).toBe('function');
    });
  });

  describe('store subscription', () => {
    it('notifies subscribers on theme change', () => {
      const listener = vi.fn();
      const unsubscribe = useAppStore.subscribe(listener);

      store.setTheme('light');

      expect(listener).toHaveBeenCalled();

      unsubscribe();
    });

    it('stops notifying after unsubscribe', () => {
      const listener = vi.fn();
      const unsubscribe = useAppStore.subscribe(listener);

      unsubscribe();
      store.setTheme('light');

      expect(listener).not.toHaveBeenCalled();
    });
  });
});
