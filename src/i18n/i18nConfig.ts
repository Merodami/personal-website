import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { LanguageStrategyFactory } from './strategies/LanguageStrategyFactory';
import { I18N_CONFIG, LANGUAGE_STORAGE_KEY } from './constants';
import type { AvailableLanguage } from './types';

export const initI18n = async (language?: AvailableLanguage) => {
  const detectedLang = language || 'en';
  const strategy = LanguageStrategyFactory.createStrategy(detectedLang);

  await i18next.use(LanguageDetector).init({
    ...I18N_CONFIG,
    lng: detectedLang,
    resources: {
      [detectedLang]: {
        translation: strategy.getTranslations(),
      },
    },
    detection: {
      order: ['querystring', 'localStorage', 'navigator'],
      lookupQuerystring: 'lang',
      lookupLocalStorage: LANGUAGE_STORAGE_KEY,
      caches: ['localStorage'],
    },
  });

  return i18next;
};

export const loadLanguage = async (language: AvailableLanguage) => {
  if (!i18next.hasResourceBundle(language, 'translation')) {
    const strategy = LanguageStrategyFactory.createStrategy(language);
    i18next.addResourceBundle(language, 'translation', strategy.getTranslations());
  }

  await i18next.changeLanguage(language);

  // Only access browser APIs if we're in the browser
  if (typeof window !== 'undefined') {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    document.documentElement.lang = language;
  }
};

export { i18next };
