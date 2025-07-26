export const SITE_CONFIG = {
  name: 'Damian',
  title: 'Damian - Full Stack Developer',
  description: 'Full-stack developer specializing in creating modern, responsive web applications',
  url: 'https://damian.dev',
  ogImage: '/images/profile.jpeg',
  author: {
    name: 'Damian',
    email: 'hello@damian.dev',
  },
};

export const NAVIGATION_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const;

export const FEATURE_FLAGS = {
  showProjects: false, // Toggle this to false to hide the projects section
} as const;
