import type { I18nConfig, AvailableLanguage } from './types';
import { AVAILABLE_LANGUAGES } from './types';

export const DEFAULT_LANGUAGE: AvailableLanguage = AVAILABLE_LANGUAGES[0];
export const FALLBACK_LANGUAGE: AvailableLanguage = AVAILABLE_LANGUAGES[0];

export const I18N_CONFIG: I18nConfig = {
  defaultLanguage: DEFAULT_LANGUAGE,
  fallbackLanguage: FALLBACK_LANGUAGE,
  supportedLanguages: ['en', 'es'] as const,
  detection: {
    order: ['localStorage', 'navigator', 'htmlTag'] as const,
    caches: ['localStorage'] as const,
  },
  interpolation: {
    escapeValue: false,
  },
} as const;

export const LANGUAGE_STORAGE_KEY = 'preferred-language' as const;

export const LANGUAGE_COOKIE_NAME = 'lang' as const;
export const LANGUAGE_COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 1 year in seconds

export const DATE_FORMAT_OPTIONS: Record<AvailableLanguage, Intl.DateTimeFormatOptions> = {
  en: { year: 'numeric', month: 'long', day: 'numeric' },
  es: { year: 'numeric', month: 'long', day: 'numeric' },
} as const;

export const NUMBER_FORMAT_OPTIONS: Record<AvailableLanguage, Intl.NumberFormatOptions> = {
  en: { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2 },
  es: { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2 },
} as const;
