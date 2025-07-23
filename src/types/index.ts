// Common types used throughout the application

export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  canonicalURL?: string;
}

export interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}
