export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  date: Date;
}

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'E-commerce Platform',
    description:
      'A modern e-commerce platform built with Next.js and Stripe integration. Features include product search, cart management, and secure checkout.',
    image: '/images/projects/ecommerce.jpg',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'Tailwind CSS'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/username/project',
    featured: true,
    date: new Date('2023-10-01'),
  },
  {
    id: 'project-2',
    title: 'Task Management App',
    description:
      'A collaborative task management application with real-time updates and team features.',
    image: '/images/projects/taskapp.jpg',
    tags: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    liveUrl: 'https://example.com',
    featured: true,
    date: new Date('2023-08-15'),
  },
  {
    id: 'project-3',
    title: 'Weather Dashboard',
    description:
      'A beautiful weather dashboard with location-based forecasts and interactive maps.',
    image: '/images/projects/weather.jpg',
    tags: ['Vue.js', 'OpenWeatherAPI', 'Mapbox', 'Chart.js'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/username/weather',
    featured: false,
    date: new Date('2023-06-20'),
  },
];
