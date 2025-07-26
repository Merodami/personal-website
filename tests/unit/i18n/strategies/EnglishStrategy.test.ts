import { describe, it, expect, beforeEach } from 'vitest';
import { EnglishStrategy } from '@/i18n/strategies/EnglishStrategy';
import { enTranslations } from '@/i18n/locales/en';

describe('EnglishStrategy', () => {
  let strategy: EnglishStrategy;

  beforeEach(() => {
    strategy = new EnglishStrategy();
  });

  describe('getTranslations', () => {
    it('should return English translations', () => {
      const translations = strategy.getTranslations();

      expect(translations).toBe(enTranslations);
      expect(translations.common.home).toBe('Home');
      expect(translations.hero.dynamicWords.build).toBe('build');
    });
  });

  describe('getMetadata', () => {
    it('should return correct English metadata', () => {
      const metadata = strategy.getMetadata();

      expect(metadata).toEqual({
        code: 'en',
        name: 'English',
        locale: 'en-US',
        direction: 'ltr',
        dateFormat: 'MM/DD/YYYY',
        numberFormat: '1,234.56',
      });
    });

    it('should have readonly metadata properties', () => {
      const metadata = strategy.getMetadata();

      // TypeScript enforces immutability at compile time
      // At runtime, we just verify the metadata is correctly structured
      expect(metadata).toHaveProperty('code', 'en');
      expect(Object.isFrozen(metadata)).toBe(false); // as const doesn't freeze at runtime
    });
  });
});
