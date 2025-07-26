import type { AvailableLanguage } from './types';
import { AVAILABLE_LANGUAGES } from './types';
import { DEFAULT_LANGUAGE, LANGUAGE_STORAGE_KEY } from './constants';
import { get, isString } from 'lodash-es';

export const detectUserLanguage = (): AvailableLanguage => {
  // Return default for SSR
  if (typeof window === 'undefined') {
    return DEFAULT_LANGUAGE;
  }

  // Check localStorage first
  const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (storedLanguage && isValidLanguage(storedLanguage)) {
    return storedLanguage;
  }

  // Check browser language
  const browserLanguage = navigator.language.split('-')[0];
  if (isValidLanguage(browserLanguage)) {
    return browserLanguage;
  }

  // Check HTML lang attribute
  const htmlLang = document.documentElement.lang.split('-')[0];
  if (isValidLanguage(htmlLang)) {
    return htmlLang;
  }

  return DEFAULT_LANGUAGE;
};

export const isValidLanguage = (lang: string): lang is AvailableLanguage => {
  return AVAILABLE_LANGUAGES.includes(lang as AvailableLanguage);
};

export const persistLanguage = (language: AvailableLanguage): void => {
  if (typeof window === 'undefined') return;

  localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  document.documentElement.lang = language;
  document.documentElement.dir = 'ltr'; // Both en and es are LTR
};

export const formatDate = (date: Date, locale: string): string => {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

export const formatNumber = (number: number, locale: string): string => {
  return new Intl.NumberFormat(locale).format(number);
};

export const interpolate = (template: string, params: Record<string, unknown> = {}): string => {
  if (!isString(template)) return '';

  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    const value = get(params, key);
    return value !== undefined ? String(value) : match;
  });
};

export const getTranslationKey = (key: string, translations: Record<string, unknown>): string => {
  const value = get(translations, key);
  return isString(value) ? value : key;
};
