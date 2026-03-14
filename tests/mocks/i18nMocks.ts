import { vi } from 'vitest';

// Default mock translations
export const mockTranslations = {
  common: {
    hello: 'Hello',
    world: 'World',
  },
  hero: {
    title: {
      part1: 'Welcome',
      part2: 'Home',
    },
    dynamicWords: {
      build: 'Build',
      create: 'Create',
      develop: 'Develop',
      engineer: 'Engineer',
      craft: 'Craft',
      architect: 'Architect',
      code: 'Code',
      forge: 'Forge',
      shape: 'Shape',
    },
  },
  aboutPage: {
    skills: ['JavaScript', 'TypeScript', 'React'],
  },
  experience: {
    jobs: [
      {
        company: 'Test Company',
        position: 'Senior Developer',
        startDate: '2023',
        endDate: 'Present',
        description: 'Test description',
        technologies: ['React', 'TypeScript'],
      },
    ],
  },
  contact: {
    emailMe: 'Email Me',
    linkedin: 'LinkedIn',
    scheduleCall: 'Schedule Call',
    emailDescription: 'Email description',
    linkedinDescription: 'LinkedIn description',
    scheduleDescription: 'Schedule description',
    viewProfile: 'View Profile',
    bookMeeting: 'Book Meeting',
  },
};

// Mock strategy factory
export const mockLanguageStrategyFactory = {
  createStrategy: vi.fn().mockReturnValue({
    getTranslations: vi.fn().mockReturnValue(mockTranslations),
  }),
};

// Mock astro utils
export const mockAstroUtils = {
  getLocalizedUrl: vi.fn((path: string, lang: string) => (lang === 'es' ? `/es${path}` : path)),
};

// Mock lodash get function
export const mockLodashGet = vi.fn(
  (obj: Record<string, unknown>, path: string, defaultValue?: unknown) => {
    const keys = path.split('.');
    let result: unknown = obj;
    for (const key of keys) {
      result = (result as Record<string, unknown>)?.[key];
      if (result === undefined) return defaultValue;
    }
    return result;
  }
);

// Helper to create custom translations
export const createMockTranslations = (customTranslations: Record<string, unknown>) => {
  return { ...mockTranslations, ...customTranslations };
};

// Helper to setup strategy with custom translations
export const setupMockStrategy = (translations = mockTranslations) => {
  const mockStrategy = {
    getTranslations: vi.fn().mockReturnValue(translations),
  };

  mockLanguageStrategyFactory.createStrategy.mockReturnValue(mockStrategy);
  return mockStrategy;
};
