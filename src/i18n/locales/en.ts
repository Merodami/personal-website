import type { TranslationResource } from '../types';

export const enTranslations: TranslationResource = {
  common: {
    email: 'damian@gaialogy.io',
    emailShort: 'Contact',
    yearsExperience: '9+',
    fullStack: 'Expert',
    cloudArchitecture: 'Cloud',
    yearsRemote: '6+',
    viewMyWork: 'View My Work',
    getInTouch: 'Get In Touch',
    home: 'Home',
    about: 'About',
    experience: 'Experience',
    projects: 'Projects',
    contact: 'Contact',
    resumePdf: 'Resume PDF',
    lightMode: 'Light Mode',
    darkMode: 'Dark Mode',
    systemMode: 'System Mode',
    close: 'Close',
    menu: 'Menu',
    toggleTheme: 'Toggle theme',
    selectLanguage: 'Select language',
    readMore: 'Read More',
    present: 'Present',
  },
  hero: {
    title: {
      part1: 'I design and',
      part2: 'performant sites',
      part3: 'for real business needs.',
    },
    description:
      'Senior Software Engineer with 9+ years of experience architecting scalable, cloud-native applications and distributed systems. Expert in full-stack development, microservices, and event-driven architectures, with proven success in systems processing 5,000+ events/second.',
    dynamicWords: {
      build: 'build',
      create: 'create',
      develop: 'develop',
      engineer: 'engineer',
      craft: 'craft',
      architect: 'architect',
      code: 'code',
      forge: 'forge',
      shape: 'shape',
    },
  },
  about: {
    title: 'About Me',
    paragraph1:
      "I'm a Senior Software Engineer with 9+ years of experience collaborating with engineering teams to architect, develop, and deploy scalable, cloud-native applications and distributed systems for SaaS, B2B, and B2C environments. My expertise spans full-stack development with TypeScript, Node.js, React, and Vue.js, combined with advanced microservices and event-driven architectures.",
    paragraph2:
      'My passion lies in Architecture patterns (DDD, Microservices, Serverless), API-first architectures, and leveraging cloud technologies (AWS, Azure) to build robust, maintainable solutions. I excel at translating complex business requirements into scalable technical solutions, with proven expertise in remote collaboration across European and Latin American time zones for 6+ years.',
    stats: {
      experience: '9+',
      experienceLabel: 'Years Experience',
      fullStack: 'Expert',
      fullStackLabel: 'Full-Stack',
      cloud: 'Cloud',
      cloudLabel: 'Architecture',
      remote: '6+',
      remoteLabel: 'Years Remote',
    },
  },
  aboutPage: {
    title: 'About Me',
    intro1:
      "Hello! I'm Damian, a passionate full-stack developer with a deep love for creating elegant, performant web applications. My journey in web development has been driven by curiosity and a constant desire to learn and improve.",
    intro2:
      "I specialize in modern JavaScript frameworks, with extensive experience in React, Vue.js, and Node.js ecosystems. I'm equally comfortable working on the frontend crafting beautiful user interfaces or diving deep into backend architecture and database optimization.",
    intro3:
      "What sets me apart is my holistic approach to development. I don't just write code; I solve problems. I believe in understanding the business context, user needs, and technical constraints to deliver solutions that truly make a difference.",
    technicalSkillsTitle: 'Technical Skills',
    skills: [
      'JavaScript/TypeScript',
      'React/Next.js',
      'Vue.js/Nuxt',
      'Node.js/Fastify',
      'AWS/Azure',
      'PostgreSQL/MongoDB',
      'Serverless/Lambda',
      'Microservices',
      'CI/CD',
    ],
  },
  experience: {
    title: 'Work Experience',
    downloadResume: 'Download Resume',
    downloadCV: 'Download CV',
    current: 'Current',
    responsibilities: 'Key Responsibilities',
    jobs: [
      {
        company: 'Expian UK',
        position: 'Senior Software Engineer',
        startDate: '2023',
        endDate: '2025',
        description:
          'Contributed to the engineering team in designing and implementing a high-throughput event-driven ticketing platform on AWS, processing thousands of tickets per second. Collaborated on developing React SPAs and extending multiple microservices, working with the team to optimize AWS infrastructure for improved latency and cost efficiency.',
        technologies: [
          'TypeScript',
          'Node.js',
          'React',
          'AWS Lambda',
          'DynamoDB',
          'SQS',
          'SNS',
          'Vite',
          'Valtio',
        ],
      },
      {
        company: 'HelviX',
        position: 'Senior Software Engineer',
        startDate: '2022',
        endDate: '2023',
        description:
          'Collaborated with the engineering team to architect and develop a Vue.js SPA for steel industry management platform, significantly improving delivery times. Worked on engineering critical microservices supporting high concurrent operations. Contributed to substantial performance optimizations that enhanced Lighthouse scores.',
        technologies: [
          'Vue.js',
          'VueX',
          'Node.js',
          'AWS',
          'Serverless Framework',
          'Domain-Driven Design',
        ],
      },
      {
        company: 'CEGID Invoice & Financing',
        position: 'Senior Software Engineer',
        startDate: '2020',
        endDate: '2022',
        description:
          'Led the engineering team in migrating from monolithic to microservices architecture on AWS, significantly improving system resilience. Collaborated on developing numerous serverless functions for event-driven architecture. Worked with the team to build Vue.js SPA that enhanced workflow completion efficiency.',
        technologies: [
          'Node.js',
          'Vue.js',
          'AWS Lambda',
          'API Gateway',
          'Domain-Driven Design',
          'Atomic Design',
        ],
      },
      {
        company: 'Dafiti',
        position: 'Full-Stack Engineer',
        startDate: '2019',
        endDate: '2019',
        description:
          'Contributed to the development team working on high-traffic B2C e-commerce PWA serving thousands of concurrent users. Collaborated on enhancing API documentation with Stoplight/OpenAPI. Worked with the team to expand Cypress E2E test coverage significantly.',
        technologies: ['React', 'Redux', 'PWA', 'Cypress', 'OpenAPI', 'Stoplight'],
      },
      {
        company: 'Grupo Clarín-AGEA',
        position: 'Full-Stack Developer',
        startDate: '2016',
        endDate: '2019',
        description:
          'Collaborated with the development team on frontend (AngularJS) and backend (Node.js) systems for media services. Worked with the team to champion API-first design and comprehensive testing practices. Contributed to integrating New Relic monitoring for high system uptime.',
        technologies: ['AngularJS', 'Node.js', 'Express.js', 'New Relic', 'API Design'],
      },
    ],
  },
  projects: {
    title: 'Featured Projects',
    featured: 'Featured',
    description: 'Description',
    technologies: 'Technologies',
    viewProject: 'View Project',
  },
  contact: {
    title: 'Get In Touch',
    subtitle: "I'm always interested in hearing about new opportunities and challenges.",
    email: 'Email',
    location: 'Location',
    availability: 'Availability',
    available: 'Available for remote opportunities',
    notAvailable: 'Not available',
    letscreate: "Let's Create Something",
    amazing: 'Amazing',
    readyTransform: 'Ready to transform your ideas into reality?',
    chooseWay: 'Choose your preferred way to connect.',
    emailMe: 'Email Me',
    emailDescription: 'For project inquiries and professional opportunities',
    linkedin: 'LinkedIn',
    linkedinDescription: "Let's connect and grow our professional network",
    viewProfile: 'View Profile',
    scheduleCall: 'Schedule a Call',
    scheduleDescription: 'Book a 30-minute consultation to discuss your project',
    bookMeeting: 'Book Meeting',
    preferQuick: 'Prefer a quick chat?',
    respondTime: 'I typically respond within 24 hours',
  },
  footer: {
    copyright: '© 2024 Damian Meroni.',
    rights: 'All rights reserved.',
  },
} as const;
