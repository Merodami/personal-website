import { describe, it, expect, beforeEach, vi } from 'vitest';
import { i18n } from '@/i18n/astroHooks';
import { i18nStore } from '@/i18n/store';
import { persistLanguage } from '@/i18n/utils';

describe('i18n Language Switching Integration', () => {
  beforeEach(() => {
    // Clear localStorage
    localStorage.clear();

    // Reset document
    document.documentElement.lang = '';
    document.documentElement.dir = '';
  });

  describe('Language persistence', () => {
    it('should persist language preference', () => {
      const mockLocalStorage = {
        getItem: vi.fn(),
        setItem: vi.fn(),
        clear: vi.fn(),
      };
      Object.defineProperty(window, 'localStorage', {
        value: mockLocalStorage,
        writable: true,
      });

      persistLanguage('es');

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('preferred-language', 'es');
      expect(document.documentElement.lang).toBe('es');
      expect(document.documentElement.dir).toBe('ltr');
    });

    it('should initialize with default language', () => {
      i18nStore.getState().initialize();

      // Should use default language when localStorage is empty
      const state = i18nStore.getState();
      expect(state.currentLanguage).toBeDefined();
      expect(['en', 'es']).toContain(state.currentLanguage);
    });
  });

  describe('Complete language switching flow', () => {
    it('should switch language and update all related data', async () => {
      // Start with English
      await i18n.setLanguage('en');
      let metadata = i18n.getMetadata();

      expect(metadata.code).toBe('en');
      expect(metadata.name).toBe('English');

      // Switch to Spanish
      await i18n.setLanguage('es');
      metadata = i18n.getMetadata();

      expect(metadata.code).toBe('es');
      expect(metadata.name).toBe('Español');
    });
  });

  describe('Translation consistency', () => {
    it('should have matching keys in all languages', () => {
      const enStrategy = i18n.getAvailableLanguages().find((l) => l.code === 'en');
      const esStrategy = i18n.getAvailableLanguages().find((l) => l.code === 'es');

      expect(enStrategy).toBeDefined();
      expect(esStrategy).toBeDefined();

      // Both languages should have the same structure
      const enKeys = Object.keys(enStrategy!);
      const esKeys = Object.keys(esStrategy!);

      expect(enKeys).toEqual(esKeys);
    });
  });

  describe('Browser language detection', () => {
    it('should detect Spanish browser language', () => {
      Object.defineProperty(navigator, 'language', {
        value: 'es-AR',
        configurable: true,
      });

      i18nStore.getState().initialize();

      expect(i18nStore.getState().currentLanguage).toBe('es');
    });

    it('should fallback to English for unsupported browser language', () => {
      Object.defineProperty(navigator, 'language', {
        value: 'fr-FR',
        configurable: true,
      });

      i18nStore.getState().initialize();

      expect(i18nStore.getState().currentLanguage).toBe('en');
    });
  });
});
