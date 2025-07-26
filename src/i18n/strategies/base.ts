import type { LanguageStrategy, TranslationResource, LanguageMetadata } from '../types';

export abstract class BaseLanguageStrategy implements LanguageStrategy {
  protected abstract readonly translations: TranslationResource;
  protected abstract readonly metadata: LanguageMetadata;

  getTranslations(): TranslationResource {
    return this.translations;
  }

  getMetadata(): LanguageMetadata {
    return this.metadata;
  }
}
