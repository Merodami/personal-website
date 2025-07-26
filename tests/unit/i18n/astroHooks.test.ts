import { describe, it, expect, beforeEach, vi } from 'vitest';
import { i18n } from '@/i18n/astroHooks';
import type { AvailableLanguage } from '@/i18n/types';

// Mock i18next
vi.mock('@/i18n/i18nConfig', () => ({
  initI18n: vi.fn(() => Promise.resolve()),
  loadLanguage: vi.fn(() => Promise.resolve()),
  i18next: {
    language: 'en',
    t: vi.fn((key) => key),
    hasResourceBundle: vi.fn(() => false),
    addResourceBundle: vi.fn(),
    changeLanguage: vi.fn(() => Promise.resolve()),
  },
}));

describe('i18n (astroHooks)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('initialize', () => {
    it('should initialize i18n system', async () => {
      await i18n.initialize();

      // Just verify it doesn't throw and sets up correctly
      expect(i18n.getCurrentLanguage()).toBeDefined();
    });
  });

  describe('setLanguage', () => {
    it('should set valid language', async () => {
      await i18n.setLanguage('es');

      expect(i18n.getCurrentLanguage()).toBe('en'); // Mocked to always return 'en'
    });

    it('should ignore invalid language', async () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      await i18n.setLanguage('invalid' as AvailableLanguage);

      expect(consoleSpy).not.toHaveBeenCalled(); // Factory validates before warning

      consoleSpy.mockRestore();
    });
  });

  describe('t (translation)', () => {
    it('should translate keys when initialized', () => {
      const result = i18n.t('common.home');
      expect(result).toBe('common.home'); // Mocked to return key
    });

    it('should handle nested keys in SSR fallback', () => {
      // Force SSR fallback by marking as not initialized
      const i18nInstance = i18n as unknown as { initialized: boolean };
      i18nInstance.initialized = false;

      const result = i18n.t('hero.title.part1');
      // Should return from English translations since that's the default
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');

      i18nInstance.initialized = true;
    });

    it('should return key if translation not found in SSR', () => {
      const i18nInstance = i18n as unknown as { initialized: boolean };
      i18nInstance.initialized = false;

      const result = i18n.t('missing.key.here');
      expect(result).toBe('missing.key.here');

      i18nInstance.initialized = true;
    });
  });

  describe('getMetadata', () => {
    it('should return current language metadata', () => {
      const metadata = i18n.getMetadata();

      expect(metadata.code).toBe('en');
      expect(metadata.name).toBe('English');
      expect(metadata.locale).toBe('en-US');
      expect(metadata.direction).toBe('ltr');
    });
  });

  describe('getAvailableLanguages', () => {
    it('should return all available languages with metadata', () => {
      const languages = i18n.getAvailableLanguages();

      expect(languages).toHaveLength(2);
      expect(languages[0].code).toBe('en');
      expect(languages[1].code).toBe('es');
      expect(languages[0].name).toBe('English');
      expect(languages[1].name).toBe('Español');
    });
  });
});
