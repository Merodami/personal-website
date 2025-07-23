export interface Technology {
  name: string;
  icon: string; // Can be an emoji, svg path, or icon class
  color?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const technologies: Technology[] = [
  // Frontend
  { name: 'React', icon: '⚛', color: '#61DAFB', size: 'lg' },
  { name: 'Vue', icon: 'V', color: '#4FC08D', size: 'md' },
  { name: 'TypeScript', icon: 'TS', color: '#3178C6', size: 'lg' },
  { name: 'JavaScript', icon: 'JS', color: '#F7DF1E', size: 'md' },
  { name: 'HTML5', icon: '<>', color: '#E34C26', size: 'sm' },
  { name: 'CSS3', icon: '#', color: '#1572B6', size: 'sm' },
  { name: 'Tailwind', icon: 'tw', color: '#06B6D4', size: 'md' },
  { name: 'Sass', icon: '$', color: '#CC6699', size: 'sm' },
  { name: 'Angular', icon: 'A', color: '#DD0031', size: 'lg' },
  { name: 'Next.js', icon: 'N', color: '#000000', size: 'md' },
  { name: 'Astro', icon: 'A', color: '#FF5D01', size: 'lg' },
  { name: 'Vite', icon: 'V', color: '#646CFF', size: 'md' },

  // Backend & Languages
  { name: 'Node.js', icon: 'N', color: '#339933', size: 'lg' },
  { name: 'Express', icon: 'ex', color: '#000000', size: 'md' },
  { name: 'Fastify', icon: 'F', color: '#000000', size: 'md' },
  { name: 'NestJS', icon: 'N', color: '#E0234E', size: 'md' },
  { name: 'GraphQL', icon: '◈', color: '#E10098', size: 'md' },
  { name: 'REST', icon: 'API', color: '#009688', size: 'sm' },
  { name: 'WebSocket', icon: 'WS', color: '#010101', size: 'sm' },
  { name: 'gRPC', icon: 'g', color: '#244c5a', size: 'sm' },

  // Database & Storage
  { name: 'PostgreSQL', icon: 'PG', color: '#4169E1', size: 'md' },
  { name: 'MongoDB', icon: 'M', color: '#47A248', size: 'md' },
  { name: 'Redis', icon: 'R', color: '#DC382D', size: 'sm' },
  { name: 'MySQL', icon: 'My', color: '#4479A1', size: 'md' },
  { name: 'DynamoDB', icon: 'Dy', color: '#4053D6', size: 'md' },
  { name: 'Elasticsearch', icon: 'ES', color: '#005571', size: 'md' },
  { name: 'Kafka', icon: 'K', color: '#231F20', size: 'md' },
  { name: 'RabbitMQ', icon: 'MQ', color: '#FF6600', size: 'sm' },

  // Cloud & DevOps
  { name: 'AWS', icon: 'λ', color: '#FF9900', size: 'lg' },
  { name: 'Lambda', icon: 'λ', color: '#FF9900', size: 'md' },
  { name: 'S3', icon: 'S3', color: '#569A31', size: 'sm' },
  { name: 'EC2', icon: 'EC2', color: '#FF9900', size: 'sm' },
  { name: 'Docker', icon: 'D', color: '#2496ED', size: 'md' },
  { name: 'Kubernetes', icon: 'K8s', color: '#326CE5', size: 'lg' },
  { name: 'CI/CD', icon: '∞', color: '#2088FF', size: 'md' },
  { name: 'Terraform', icon: 'Tf', color: '#7B42BC', size: 'md' },

  // Testing & Tools
  { name: 'Jest', icon: 'J', color: '#C21325', size: 'sm' },
  { name: 'Cypress', icon: 'Cy', color: '#17202C', size: 'md' },
  { name: 'Vitest', icon: 'V', color: '#6E9F18', size: 'sm' },
  { name: 'Playwright', icon: 'Pw', color: '#2EAD33', size: 'md' },
  { name: 'Git', icon: 'G', color: '#F05032', size: 'sm' },
  { name: 'GitHub', icon: 'GH', color: '#181717', size: 'md' },
  { name: 'GitLab', icon: 'GL', color: '#FC6D26', size: 'sm' },
  { name: 'Jira', icon: 'J', color: '#0052CC', size: 'sm' },

  // Architecture & Patterns
  { name: 'Microservices', icon: 'μ', color: '#FF6B6B', size: 'lg' },
  { name: 'DDD', icon: 'D³', color: '#4ECDC4', size: 'md' },
  { name: 'CQRS', icon: 'CQ', color: '#45B7D1', size: 'sm' },
  { name: 'Event Sourcing', icon: 'ES', color: '#F7DC6F', size: 'md' },
  { name: 'Clean Architecture', icon: 'CA', color: '#52C41A', size: 'lg' },
  { name: 'SOLID', icon: 'S', color: '#722ED1', size: 'md' },
  { name: 'TDD', icon: 'T', color: '#EB2F96', size: 'sm' },
  { name: 'Agile', icon: 'A', color: '#13C2C2', size: 'md' },

  // Monitoring & Performance
  { name: 'Grafana', icon: 'G', color: '#F46800', size: 'md' },
  { name: 'Prometheus', icon: 'P', color: '#E6522C', size: 'md' },
  { name: 'ELK', icon: 'E', color: '#005571', size: 'sm' },
  { name: 'APM', icon: 'A', color: '#00BFA5', size: 'sm' },
  { name: 'Sentry', icon: 'S', color: '#362C63', size: 'sm' },
  { name: 'NewRelic', icon: 'NR', color: '#008C99', size: 'md' },
];

// Function to get random technologies
export function getRandomTechnologies(count: number): Technology[] {
  const shuffled = [...technologies].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
