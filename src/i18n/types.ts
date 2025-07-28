export const AVAILABLE_LANGUAGES = ['en', 'es'] as const;
export type AvailableLanguage = (typeof AVAILABLE_LANGUAGES)[number];

export const LANGUAGE_DIRECTION = {
  ltr: 'ltr',
  rtl: 'rtl',
} as const;
export type LanguageDirection = keyof typeof LANGUAGE_DIRECTION;

export interface TranslationResource {
  common: {
    email: string;
    emailShort: string;
    yearsExperience: string;
    fullStack: string;
    cloudArchitecture: string;
    yearsRemote: string;
    viewMyWork: string;
    getInTouch: string;
    home: string;
    about: string;
    experience: string;
    projects: string;
    contact: string;
    resumePdf: string;
    lightMode: string;
    darkMode: string;
    systemMode: string;
    close: string;
    menu: string;
    toggleTheme: string;
    selectLanguage: string;
    readMore: string;
    present: string;
  };
  hero: {
    title: {
      part1: string;
      part2: string;
      part3: string;
    };
    description: string;
    dynamicWords: {
      build: string;
      create: string;
      develop: string;
      engineer: string;
      craft: string;
      architect: string;
      code: string;
      forge: string;
      shape: string;
    };
  };
  about: {
    title: string;
    paragraph1: string;
    paragraph2: string;
    stats: {
      experience: string;
      experienceLabel: string;
      fullStack: string;
      fullStackLabel: string;
      cloud: string;
      cloudLabel: string;
      remote: string;
      remoteLabel: string;
    };
  };
  experience: {
    title: string;
    downloadResume: string;
    downloadCV: string;
    current: string;
    responsibilities: string;
    jobs: Array<{
      company: string;
      position: string;
      startDate: string;
      endDate: string;
      description: string;
      technologies: string[];
    }>;
  };
  projects: {
    title: string;
    featured: string;
    description: string;
    technologies: string;
    viewProject: string;
  };
  contact: {
    title: string;
    subtitle: string;
    email: string;
    location: string;
    availability: string;
    available: string;
    notAvailable: string;
    letscreate: string;
    amazing: string;
    readyTransform: string;
    chooseWay: string;
    emailMe: string;
    emailDescription: string;
    linkedin: string;
    linkedinDescription: string;
    viewProfile: string;
    scheduleCall: string;
    scheduleDescription: string;
    bookMeeting: string;
    preferQuick: string;
    respondTime: string;
  };
  footer: {
    copyright: string;
    rights: string;
  };
}

export interface LanguageMetadata {
  code: AvailableLanguage;
  name: string;
  locale: string;
  direction: LanguageDirection;
  dateFormat: string;
  numberFormat: string;
}

export interface LanguageStrategy {
  getTranslations(): TranslationResource;
  getMetadata(): LanguageMetadata;
}
