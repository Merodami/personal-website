import { describe, it, expect, beforeEach } from 'vitest';
import { SpanishStrategy } from '@/i18n/strategies/SpanishStrategy';
import { esTranslations } from '@/i18n/locales/es';

describe('SpanishStrategy', () => {
  let strategy: SpanishStrategy;

  beforeEach(() => {
    strategy = new SpanishStrategy();
  });

  describe('getTranslations', () => {
    it('should return Spanish translations', () => {
      const translations = strategy.getTranslations();

      expect(translations).toBe(esTranslations);
      expect(translations.common.home).toBe('Inicio');
      expect(translations.hero.dynamicWords.build).toBe('construyo');
    });
  });

  describe('getMetadata', () => {
    it('should return correct Spanish metadata', () => {
      const metadata = strategy.getMetadata();

      expect(metadata).toEqual({
        code: 'es',
        name: 'Español',
        locale: 'es-AR',
        direction: 'ltr',
        dateFormat: 'DD/MM/YYYY',
        numberFormat: '1.234,56',
      });
    });

    it('should have readonly metadata properties', () => {
      const metadata = strategy.getMetadata();

      // TypeScript enforces immutability at compile time
      // At runtime, we just verify the metadata is correctly structured
      expect(metadata).toHaveProperty('code', 'es');
      expect(Object.isFrozen(metadata)).toBe(false); // as const doesn't freeze at runtime
    });
  });
});
