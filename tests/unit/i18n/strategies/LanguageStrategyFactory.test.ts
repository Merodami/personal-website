import { describe, it, expect, vi } from 'vitest';
import { LanguageStrategyFactory } from '@/i18n/strategies/LanguageStrategyFactory';
import { EnglishStrategy } from '@/i18n/strategies/EnglishStrategy';
import { SpanishStrategy } from '@/i18n/strategies/SpanishStrategy';
import type { AvailableLanguage } from '@/i18n/types';

describe('LanguageStrategyFactory', () => {
  describe('createStrategy', () => {
    it('should create English strategy for "en"', () => {
      const strategy = LanguageStrategyFactory.createStrategy('en');
      expect(strategy).toBeInstanceOf(EnglishStrategy);
      expect(strategy.getMetadata().code).toBe('en');
    });

    it('should create Spanish strategy for "es"', () => {
      const strategy = LanguageStrategyFactory.createStrategy('es');
      expect(strategy).toBeInstanceOf(SpanishStrategy);
      expect(strategy.getMetadata().code).toBe('es');
    });

    it('should fallback to English for unsupported language', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const strategy = LanguageStrategyFactory.createStrategy('fr' as AvailableLanguage);

      expect(strategy).toBeInstanceOf(EnglishStrategy);
      expect(consoleSpy).toHaveBeenCalledWith('Language "fr" not supported, falling back to en');

      consoleSpy.mockRestore();
    });
  });

  describe('isValidLanguage', () => {
    it('should return true for supported languages', () => {
      expect(LanguageStrategyFactory.isValidLanguage('en')).toBe(true);
      expect(LanguageStrategyFactory.isValidLanguage('es')).toBe(true);
    });

    it('should return false for unsupported languages', () => {
      expect(LanguageStrategyFactory.isValidLanguage('fr')).toBe(false);
      expect(LanguageStrategyFactory.isValidLanguage('de')).toBe(false);
      expect(LanguageStrategyFactory.isValidLanguage('')).toBe(false);
    });
  });

  describe('getAvailableLanguages', () => {
    it('should return all available languages', () => {
      const languages = LanguageStrategyFactory.getAvailableLanguages();

      expect(languages).toEqual(['en', 'es']);
      expect(languages).toHaveLength(2);
    });
  });
});
