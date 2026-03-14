# Personal Portfolio Site V2 - Enhancement Plan

## Overview

This document outlines the improvements and enhancements to make the portfolio site more closely match kieranroberts.dev while adding multi-language support, theme switching, and maintaining best practices.

## Key Improvements

### 1. Navigation Bar Enhancements

**Current Issues:**

- Too simple compared to the original
- Missing visual polish and micro-interactions
- No theme toggle button

**Improvements Needed:**

- Add glassmorphism effect with backdrop blur
- Implement smooth background transition on scroll
- Add theme toggle button with animated icon
- Better hover states with underline animations
- Active link indicator with animated underline
- Logo/name with hover effect

**Implementation:**

```astro
// Enhanced Navigation with theme toggle
<nav class="navigation">
  <div class="nav-blur-bg"></div>
  <div class="nav-content">
    <a class="nav-logo">
      <span class="gradient-text">Damian</span>
    </a>
    <div class="nav-links">
      <!-- Links with animated underlines -->
    </div>
    <div class="nav-actions">
      <LanguageToggle />
      <ThemeToggle />
    </div>
  </div>
</nav>
```

### 2. Typography System

**Font Stack:**

```css
:root {
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'Fira Code', 'Courier New', monospace;
}
```

**Font Sizes (Fluid Typography):**

```css
--text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
--text-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
--text-base: clamp(1rem, 0.925rem + 0.375vw, 1.125rem);
--text-lg: clamp(1.125rem, 1rem + 0.625vw, 1.25rem);
--text-xl: clamp(1.25rem, 1.125rem + 0.625vw, 1.5rem);
--text-2xl: clamp(1.5rem, 1.25rem + 1.25vw, 2rem);
--text-3xl: clamp(2rem, 1.5rem + 2.5vw, 3rem);
--text-4xl: clamp(2.5rem, 1.75rem + 3.75vw, 4rem);
--text-5xl: clamp(3rem, 2rem + 5vw, 5rem);
```

### 3. Multi-Language Architecture

**Structure:**

```
src/
├── i18n/
│   ├── config.ts          # i18n configuration
│   ├── utils.ts           # Helper functions
│   └── translations/
│       ├── en.json        # English translations
│       └── es.json        # Spanish translations
├── components/
│   └── LanguageToggle.astro
└── middleware.ts          # Language detection
```

**Language Detection Strategy:**

1. Check URL path prefix (/en, /es)
2. Check cookie preference
3. Check Accept-Language header
4. Default to English

**Implementation with Cloudflare Pages:**

```typescript
// _middleware.ts for Cloudflare Pages
export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  // Get country from Cloudflare
  const country = request.cf?.country || 'US';

  // Map countries to languages
  const countryToLang = {
    ES: 'es',
    MX: 'es',
    AR: 'es', // Spanish-speaking countries
    US: 'en',
    GB: 'en',
    CA: 'en', // English-speaking countries
  };

  const detectedLang = countryToLang[country] || 'en';

  // Redirect if needed
  if (!url.pathname.startsWith(`/${detectedLang}`)) {
    return Response.redirect(`${url.origin}/${detectedLang}${url.pathname}`);
  }

  return next();
}
```

**Translation System:**

```typescript
// i18n/config.ts
export const languages = {
  en: 'English',
  es: 'Español',
} as const;

export const defaultLang = 'en';

// i18n/utils.ts
export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as keyof typeof languages;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof languages) {
  return function t(key: string) {
    return translations[lang][key] || key;
  };
}
```

### 4. Theme System (Dark/Light)

**CSS Variables Structure:**

```css
:root {
  /* Light theme colors */
  --color-bg: #ffffff;
  --color-bg-secondary: #f9fafb;
  --color-text: #1f2937;
  --color-text-secondary: #6b7280;
  --color-border: #e5e7eb;
  --color-primary: #7c3aed;
  --color-primary-hover: #6d28d9;
}

[data-theme='dark'] {
  /* Dark theme colors */
  --color-bg: #0a0a0a;
  --color-bg-secondary: #111111;
  --color-text: #ffffff;
  --color-text-secondary: #9ca3af;
  --color-border: #1f2937;
  --color-primary: #a78bfa;
  --color-primary-hover: #c4b5fd;
}
```

**Theme Toggle Component:**

```astro
// components/ThemeToggle.astro
<button id="theme-toggle" class="theme-toggle" aria-label="Toggle theme">
  <svg class="sun-icon"><!-- Sun icon --></svg>
  <svg class="moon-icon"><!-- Moon icon --></svg>
</button>

<script>
  // Theme logic with localStorage and system preference
  const theme = (() => {
    if (typeof localStorage !== 'undefined' && localStorage.theme) {
      return localStorage.theme;
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  })();

  document.documentElement.setAttribute('data-theme', theme);
</script>
```

### 5. Component Architecture Improvements

**Folder Structure:**

```
src/
├── components/
│   ├── common/
│   │   ├── Button/
│   │   │   ├── Button.astro
│   │   │   ├── Button.styles.ts
│   │   │   └── Button.types.ts
│   │   ├── Card/
│   │   ├── Badge/
│   │   └── Section/
│   ├── layout/
│   │   ├── Header/
│   │   │   ├── Header.astro
│   │   │   ├── Navigation.astro
│   │   │   ├── MobileMenu.astro
│   │   │   └── Header.styles.ts
│   │   └── Footer/
│   └── sections/
│       ├── Hero/
│       ├── About/
│       ├── Experience/
│       ├── Projects/
│       └── Contact/
├── styles/
│   ├── base/
│   │   ├── reset.css
│   │   ├── typography.css
│   │   └── animations.css
│   ├── themes/
│   │   ├── dark.css
│   │   └── light.css
│   └── utilities/
│       └── helpers.css
└── config/
    ├── site.ts
    └── navigation.ts
```

### 6. Design Improvements to Match Original

**Visual Enhancements:**

1. **Gradient Backgrounds:**
   - Subtle gradient overlays
   - Animated gradient orbs in background
   - Mesh gradients for sections

2. **Card Design:**
   - Glass morphism effect
   - Subtle shadows with colored tints
   - Hover animations with lift effect
   - Border gradients on hover

3. **Animations:**
   - Smooth page transitions
   - Staggered animations for lists
   - Parallax scrolling effects
   - Intersection Observer for reveal animations
   - Smooth scroll with Lenis

4. **Micro-interactions:**
   - Button press effects
   - Link hover animations
   - Magnetic cursor effects (optional)
   - Smooth transitions everywhere

### 7. Performance Optimizations

**Image Optimization:**

```astro
// Use Astro's Image component import {Image} from 'astro:assets';

<Image
  src={projectImage}
  alt={project.title}
  widths={[400, 800, 1200]}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
  loading="lazy"
  format="webp"
/>
```

**Font Loading:**

```html
<link rel="preconnect" href="https://fonts.gstatic.com" />
<link rel="preload" href="/fonts/Inter-var.woff2" as="font" type="font/woff2" crossorigin />
```

**Code Splitting:**

- Lazy load heavy components
- Use dynamic imports for non-critical features
- Optimize bundle sizes

### 8. SEO & Meta Tags per Language

```astro
// layouts/BaseLayout.astro

const lang = getLangFromUrl(Astro.url); const t = useTranslations(lang); const meta = { title: t('meta.title'),
description: t('meta.description'), // ... other meta };

<html lang={lang}>
  <head>
    <title>{meta.title}</title>
    <meta name="description" content={meta.description} />

    <!-- Language alternates -->
    <link rel="alternate" hreflang="en" href="/en" />
    <link rel="alternate" hreflang="es" href="/es" />
    <link rel="alternate" hreflang="x-default" href="/en" />
  </head>
</html>
```

### 9. Configuration Files

**site.config.ts:**

```typescript
export const siteConfig = {
  name: 'Damian',
  title: {
    en: 'Damian - Full Stack Developer',
    es: 'Damian - Desarrollador Full Stack',
  },
  description: {
    en: 'Full-stack developer creating modern web experiences',
    es: 'Desarrollador full-stack creando experiencias web modernas',
  },
  url: 'https://yourdomain.com',
  languages: ['en', 'es'],
  defaultLanguage: 'en',
  social: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    twitter: 'https://twitter.com/yourusername',
  },
};
```

### 10. Deployment Configuration

**Cloudflare Pages Functions:**

```
functions/
├── _middleware.ts    # Language routing
└── api/
    └── contact.ts    # Contact form handler
```

**wrangler.toml updates:**

```toml
[site]
bucket = "./dist"

[[redirects]]
from = "/"
to = "/en"
status = 302

[env.production.vars]
DEFAULT_LOCALE = "en"
SUPPORTED_LOCALES = "en,es"
```

## Implementation Priority

1. **Phase 1: Core Improvements**
   - Update navigation bar design
   - Implement theme system
   - Add Inter font and typography system
   - Improve overall visual design

2. **Phase 2: Internationalization**
   - Set up i18n architecture
   - Create translation files
   - Implement language routing
   - Add language toggle

3. **Phase 3: Polish**
   - Add all animations
   - Implement micro-interactions
   - Optimize performance
   - Add missing sections

4. **Phase 4: Testing & Deployment**
   - Test on multiple devices
   - Verify Cloudflare Pages setup
   - Optimize for Core Web Vitals
   - Deploy and monitor

## Technologies Stack

- **Framework:** Astro 5.x
- **Styling:** Tailwind CSS 4.x + CSS Modules
- **Language:** TypeScript
- **Animations:** CSS animations + Intersection Observer
- **Font:** Inter Variable Font
- **Icons:** Heroicons/Lucide
- **Deployment:** Cloudflare Pages
- **i18n:** Custom implementation with Cloudflare Workers
- **Theme:** CSS custom properties with localStorage
