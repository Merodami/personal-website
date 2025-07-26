import { createStore } from 'zustand/vanilla';
import { persist } from 'zustand/middleware';
import type { AvailableLanguage, LanguageMetadata, TranslationResource } from './types';
import { LanguageStrategyFactory } from './strategies/LanguageStrategyFactory';
import { DEFAULT_LANGUAGE, LANGUAGE_STORAGE_KEY } from './constants';
import { detectUserLanguage, persistLanguage, interpolate } from './utils';

interface I18nState {
  currentLanguage: AvailableLanguage;
  translations: TranslationResource;
  metadata: LanguageMetadata;
  isLoading: boolean;
  setLanguage: (language: AvailableLanguage) => Promise<void>;
  t: (key: string, params?: Record<string, unknown>) => string;
  initialize: () => void;
}

export const i18nStore = createStore<I18nState>()(
  persist(
    (set, get) => ({
      currentLanguage: DEFAULT_LANGUAGE,
      translations: {} as TranslationResource,
      metadata: {} as LanguageMetadata,
      isLoading: false,

      setLanguage: async (language: AvailableLanguage) => {
        if (!LanguageStrategyFactory.isValidLanguage(language)) {
          console.warn(`Invalid language: ${language}`);
          return;
        }

        set({ isLoading: true });

        try {
          const strategy = LanguageStrategyFactory.createStrategy(language);
          const translations = strategy.getTranslations();
          const metadata = strategy.getMetadata();

          persistLanguage(language);

          set({
            currentLanguage: language,
            translations,
            metadata,
            isLoading: false,
          });
        } catch (error) {
          console.error('Failed to set language:', error);
          set({ isLoading: false });
        }
      },

      t: (key: string, params?: Record<string, unknown>) => {
        const state = get();
        // Navigate through nested translation object
        const keys = key.split('.');
        let value: unknown = state.translations;

        for (const k of keys) {
          if (value && typeof value === 'object' && k in value) {
            value = (value as Record<string, unknown>)[k];
          } else {
            value = undefined;
            break;
          }
        }

        const translation = typeof value === 'string' ? value : key;
        return params ? interpolate(translation, params) : translation;
      },

      initialize: () => {
        const detectedLanguage = detectUserLanguage();
        const strategy = LanguageStrategyFactory.createStrategy(detectedLanguage);

        set({
          currentLanguage: detectedLanguage,
          translations: strategy.getTranslations(),
          metadata: strategy.getMetadata(),
          isLoading: false,
        });

        persistLanguage(detectedLanguage);
      },
    }),
    {
      name: LANGUAGE_STORAGE_KEY,
      partialize: (state) => ({ currentLanguage: state.currentLanguage }),
    }
  )
);
