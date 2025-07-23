export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies: string[];
  logo?: string;
}

export const experiences: Experience[] = [
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
];
