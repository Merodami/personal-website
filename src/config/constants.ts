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

export const ANIMATION_DURATION = {
  fast: 200,
  normal: 300,
  slow: 800,
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export const SOCIAL_LINKS = {
  github: 'https://github.com/Merodami',
  linkedin: 'https://www.linkedin.com/in/dmeroni',
  twitter: 'https://twitter.com/yourusername',
} as const;

export const FEATURE_FLAGS = {
  showProjects: false, // Toggle this to false to hide the projects section
} as const;
