import { BaseLanguageStrategy } from './base';
import { enTranslations } from '../locales/en';
import type { TranslationResource, LanguageMetadata } from '../types';

export class EnglishStrategy extends BaseLanguageStrategy {
  protected readonly translations: TranslationResource = enTranslations;

  protected readonly metadata: LanguageMetadata = {
    code: 'en',
    name: 'English',
    locale: 'en-US',
    direction: 'ltr',
    dateFormat: 'MM/DD/YYYY',
    numberFormat: '1,234.56',
  } as const;
}
