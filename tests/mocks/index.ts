// Re-export all mocks for easy importing
export * from './i18nMocks';
export * from './domMocks';

// Common mock configurations
import { vi } from 'vitest';
import { mockLanguageStrategyFactory, mockAstroUtils, mockLodashGet } from './i18nMocks';

// Standard vi.mock configurations
export const setupI18nMocks = () => {
  vi.mock('@/i18n/strategies/LanguageStrategyFactory', () => ({
    LanguageStrategyFactory: mockLanguageStrategyFactory,
  }));

  vi.mock('@/i18n/astroUtils', () => mockAstroUtils);

  vi.mock('lodash-es', () => ({
    get: mockLodashGet,
  }));
};
