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
      'Spearheaded architectural design of high-throughput event-driven ticketing platform on AWS, processing 5,000+ tickets/second. Engineered React SPAs and extended 5+ microservices, optimizing AWS infrastructure for 20% latency reduction and 10% cost decrease.',
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
      'Architected Vue.js SPA for steel industry management platform, improving delivery time by 20%. Engineered 3 critical microservices supporting 1,000+ concurrent operations. Achieved 30% Lighthouse score improvement through performance optimizations.',
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
      'Led migration from monolithic to microservices architecture on AWS, improving system resilience by 40%. Developed 10+ serverless functions for event-driven architecture. Built Vue.js SPA improving workflow completion by 15%.',
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
      'Contributed to high-traffic B2C e-commerce PWA serving 15,000+ concurrent users. Enhanced API documentation with Stoplight/OpenAPI. Expanded Cypress E2E test coverage by 20%.',
    technologies: ['React', 'Redux', 'PWA', 'Cypress', 'OpenAPI', 'Stoplight'],
  },
  {
    company: 'Grupo Clarín-AGEA',
    position: 'Full-Stack Developer',
    startDate: '2016',
    endDate: '2019',
    description:
      'Developed frontend (AngularJS) and backend (Node.js) systems for media services. Championed API-first design and comprehensive testing. Integrated New Relic monitoring achieving 99.9% uptime.',
    technologies: ['AngularJS', 'Node.js', 'Express.js', 'New Relic', 'API Design'],
  },
];
