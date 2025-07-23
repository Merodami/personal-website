export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  ariaLabel: string;
}

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/yourusername',
    icon: 'github',
    ariaLabel: 'Visit my GitHub profile',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/yourusername',
    icon: 'linkedin',
    ariaLabel: 'Connect on LinkedIn',
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/yourusername',
    icon: 'twitter',
    ariaLabel: 'Follow me on Twitter',
  },
  {
    name: 'Email',
    url: 'mailto:hello@yourdomain.com',
    icon: 'email',
    ariaLabel: 'Send me an email',
  },
];
