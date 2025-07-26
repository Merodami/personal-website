// Main utilities for hybrid i18n implementation
export { useAstroI18n, getLocalizedUrl, getAlternateUrls } from './astroUtils';

// Types
export type { AvailableLanguage, TranslationResource, LanguageMetadata } from './types';
export { AVAILABLE_LANGUAGES } from './types';

// Constants and utilities
export { DEFAULT_LANGUAGE, FALLBACK_LANGUAGE } from './constants';
export { detectUserLanguage, persistLanguage, formatDate, formatNumber } from './utils';
export { LanguageStrategyFactory } from './strategies/LanguageStrategyFactory';
