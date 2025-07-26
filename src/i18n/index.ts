export { i18n } from './astroHooks';
export { setupI18n } from './astroHelpers';
export { useAstroI18n, getLocalizedUrl, getAlternateUrls } from './astroUtils';
export { i18nStore } from './store';
export type { AvailableLanguage, TranslationResource, LanguageMetadata } from './types';
export { AVAILABLE_LANGUAGES } from './types';
export { DEFAULT_LANGUAGE, FALLBACK_LANGUAGE } from './constants';
export { detectUserLanguage, persistLanguage, formatDate, formatNumber } from './utils';
export { LanguageStrategyFactory } from './strategies/LanguageStrategyFactory';
