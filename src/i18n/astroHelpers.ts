import { i18n } from './astroHooks';
import type { AvailableLanguage } from './types';
import { LanguageStrategyFactory } from './strategies/LanguageStrategyFactory';

/**
 * Helper function for Astro components to initialize i18n synchronously
 * Uses the strategy pattern for immediate SSR rendering
 */
export function setupI18n(lang: string | null): typeof i18n {
  const language = (lang || 'en') as AvailableLanguage;

  // Force synchronous language setting for SSR
  if (LanguageStrategyFactory.isValidLanguage(language)) {
    i18n.setCurrentLanguageSync(language);
  }

  return i18n;
}
