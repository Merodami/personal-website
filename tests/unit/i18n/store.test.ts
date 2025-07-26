import { describe, it, expect, beforeEach, vi } from 'vitest';
import { i18nStore } from '@/i18n/store';
import type { TranslationResource, LanguageMetadata, AvailableLanguage } from '@/i18n/types';

// Mock the utils to avoid localStorage issues in tests
vi.mock('@/i18n/utils', () => ({
  detectUserLanguage: vi.fn(() => 'en'),
  persistLanguage: vi.fn(),
  getTranslationKey: vi.fn((key) => key),
  interpolate: vi.fn((template) => template),
}));

describe('i18nStore', () => {
  beforeEach(() => {
    // Reset store state
    i18nStore.setState({
      currentLanguage: 'en',
      translations: {} as TranslationResource,
      metadata: {} as LanguageMetadata,
      isLoading: false,
    });
    vi.clearAllMocks();
  });

  describe('setLanguage', () => {
    it('should update language and load translations', async () => {
      const { setLanguage } = i18nStore.getState();

      await setLanguage('es');

      const state = i18nStore.getState();
      expect(state.currentLanguage).toBe('es');
      expect(state.translations.common.home).toBe('Inicio');
      expect(state.metadata.code).toBe('es');
      expect(state.isLoading).toBe(false);
    });

    it('should handle invalid language gracefully', async () => {
      const { setLanguage } = i18nStore.getState();
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      await setLanguage('invalid' as AvailableLanguage);

      const state = i18nStore.getState();
      expect(state.currentLanguage).toBe('en'); // Should remain unchanged
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });

    it('should complete language change successfully', async () => {
      const { setLanguage } = i18nStore.getState();

      await setLanguage('es');

      // Verify the language was changed
      const state = i18nStore.getState();
      expect(state.currentLanguage).toBe('es');
      expect(state.isLoading).toBe(false);
    });
  });

  describe('t (translation function)', () => {
    it('should translate keys', () => {
      const { t } = i18nStore.getState();

      expect(t('common.home')).toBe('common.home'); // Mocked to return key
    });

    it('should handle interpolation', () => {
      const { t } = i18nStore.getState();

      expect(t('greeting', { name: 'John' })).toBe('greeting'); // Mocked to return key
    });
  });

  describe('initialize', () => {
    it('should detect and set initial language', () => {
      const { initialize } = i18nStore.getState();

      initialize();

      const state = i18nStore.getState();
      expect(state.currentLanguage).toBe('en');
      expect(state.translations).toBeDefined();
      expect(state.metadata).toBeDefined();
    });
  });

  describe('persistence', () => {
    it('should persist only currentLanguage', () => {
      // The persist middleware should only save currentLanguage
      const persistedState = i18nStore.persist.getOptions().partialize?.(i18nStore.getState());

      expect(persistedState).toEqual({ currentLanguage: 'en' });
    });
  });
});
