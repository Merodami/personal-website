import { BaseLanguageStrategy } from './base';
import { esTranslations } from '../locales/es';
import type { TranslationResource, LanguageMetadata } from '../types';

export class SpanishStrategy extends BaseLanguageStrategy {
  protected readonly translations: TranslationResource = esTranslations;

  protected readonly metadata: LanguageMetadata = {
    code: 'es',
    name: 'Español',
    locale: 'es-AR',
    direction: 'ltr',
    dateFormat: 'DD/MM/YYYY',
    numberFormat: '1.234,56',
  } as const;
}
