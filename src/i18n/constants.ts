import type { AvailableLanguage } from './types';
import { AVAILABLE_LANGUAGES } from './types';

export const DEFAULT_LANGUAGE: AvailableLanguage = AVAILABLE_LANGUAGES[0];

export const LANGUAGE_STORAGE_KEY = 'preferred-language' as const;
