import type { AvailableLanguage } from './types';
import { LanguageStrategyFactory } from './strategies/LanguageStrategyFactory';
import { DEFAULT_LANGUAGE } from './constants';
import { initI18n, loadLanguage, i18next } from './i18nConfig';

export class I18nManager {
  private static instance: I18nManager;
  private initialized = false;
  private currentLanguage: AvailableLanguage = DEFAULT_LANGUAGE;

  private constructor() {}

  static getInstance(): I18nManager {
    if (!I18nManager.instance) {
      I18nManager.instance = new I18nManager();
    }
    return I18nManager.instance;
  }

  async initialize(language?: AvailableLanguage): Promise<void> {
    if (!this.initialized) {
      await initI18n(language || this.currentLanguage);
      this.initialized = true;
      this.currentLanguage = i18next.language as AvailableLanguage;
    }
  }

  async setLanguage(language: AvailableLanguage): Promise<void> {
    if (LanguageStrategyFactory.isValidLanguage(language)) {
      await this.initialize();
      await loadLanguage(language);
      this.currentLanguage = language;
    }
  }

  getCurrentLanguage(): AvailableLanguage {
    // For SSR, always use the manually set language, ignore i18next.language
    return this.currentLanguage;
  }

  // Allow external setting of current language for SSR
  setCurrentLanguageSync(language: AvailableLanguage): void {
    this.currentLanguage = language;
  }

  getMetadata() {
    const strategy = LanguageStrategyFactory.createStrategy(this.getCurrentLanguage());
    return strategy.getMetadata();
  }

  t(key: string, params?: Record<string, unknown>): string {
    if (!this.initialized) {
      // Fallback for SSR
      const strategy = LanguageStrategyFactory.createStrategy(this.currentLanguage);
      const translations = strategy.getTranslations();
      const keys = key.split('.');
      let value: unknown = translations;

      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = (value as Record<string, unknown>)[k];
        } else {
          return key;
        }
      }

      return typeof value === 'string' ? value : key;
    }

    return i18next.t(key, params);
  }

  getAvailableLanguages() {
    return LanguageStrategyFactory.getAvailableLanguages().map((code) => {
      const strategy = LanguageStrategyFactory.createStrategy(code);
      return strategy.getMetadata();
    });
  }
}

export const i18n = I18nManager.getInstance();
