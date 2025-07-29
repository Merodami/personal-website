export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  ariaLabel: string;
}

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/Merodami',
    icon: 'github',
    ariaLabel: 'Visit my GitHub profile',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/dmeroni',
    icon: 'linkedin',
    ariaLabel: 'Connect on LinkedIn',
  },
  {
    name: 'Email',
    url: 'mailto:damian@gaialogy.io',
    icon: 'email',
    ariaLabel: 'Send me an email',
  },
];
