import type { AvailableLanguage } from './types';
import { LanguageStrategyFactory } from './strategies/LanguageStrategyFactory';
import { get } from 'lodash-es';

/**
 * Unified language detection for Astro components
 * Detects language from URL path and returns both lang and i18n instance
 */
export function useAstroI18n(astroUrl: URL) {
  const pathname = astroUrl.pathname;
  const lang: AvailableLanguage = pathname.startsWith('/es') ? 'es' : 'en';

  // Create a direct i18n instance that bypasses the singleton issues
  const i18nInstance = createDirectI18n(lang);

  return { lang, i18n: i18nInstance };
}

/**
 * Create a direct i18n instance that works without the singleton
 */
function createDirectI18n(lang: AvailableLanguage) {
  const strategy = LanguageStrategyFactory.createStrategy(lang);

  return {
    t: <T = string>(key: string): T => {
      const translations = strategy.getTranslations();
      return get(translations, key, key) as T;
    },
    getCurrentLanguage: () => lang,
    getAvailableLanguages: () => {
      return LanguageStrategyFactory.getAvailableLanguages().map((code: AvailableLanguage) => {
        const strat = LanguageStrategyFactory.createStrategy(code);
        return strat.getMetadata();
      });
    },
  };
}

/**
 * Get the correct URL for the given language and current path
 */
export function getLocalizedUrl(currentPath: string, targetLang: AvailableLanguage): string {
  // Remove language prefix from current path
  const basePathWithoutLang = currentPath.startsWith('/es')
    ? currentPath.replace(/^\/es/, '')
    : currentPath;

  // Generate URL for target language
  if (targetLang === 'es') {
    return `/es${basePathWithoutLang}` || '/es';
  } else {
    return basePathWithoutLang || '/';
  }
}

/**
 * Generate alternate URLs for all supported languages
 */
export function getAlternateUrls(currentPath: string) {
  return {
    en: getLocalizedUrl(currentPath, 'en'),
    es: getLocalizedUrl(currentPath, 'es'),
  };
}
