import type { AvailableLanguage, LanguageStrategy } from '../types';
import { EnglishStrategy } from './EnglishStrategy';
import { SpanishStrategy } from './SpanishStrategy';
import { DEFAULT_LANGUAGE } from '../constants';

export class LanguageStrategyFactory {
  private static readonly strategies: Record<AvailableLanguage, new () => LanguageStrategy> = {
    en: EnglishStrategy,
    es: SpanishStrategy,
  };

  static createStrategy(language: AvailableLanguage): LanguageStrategy {
    const StrategyClass = this.strategies[language];

    if (!StrategyClass) {
      console.warn(`Language "${language}" not supported, falling back to ${DEFAULT_LANGUAGE}`);
      return new this.strategies[DEFAULT_LANGUAGE]();
    }

    return new StrategyClass();
  }

  static isValidLanguage(language: string): language is AvailableLanguage {
    return language in this.strategies;
  }

  static getAvailableLanguages(): AvailableLanguage[] {
    return Object.keys(this.strategies) as AvailableLanguage[];
  }
}
