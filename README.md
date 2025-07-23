# Damian Meroni - Personal Website

[![Build Status](https://github.com/Merodami/personal-website/workflows/CI%20&%20Deploy%20to%20Cloudflare%20Pages/badge.svg)](https://github.com/Merodami/personal-website/actions)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-blue.svg)](https://www.typescriptlang.org/)
[![Astro](https://img.shields.io/badge/Astro-5.12+-orange.svg)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1+-38bdf8.svg)](https://tailwindcss.com/)

> A modern, high-performance personal website showcasing my work as a Senior Software Engineer. Built with cutting-edge technologies and optimized for speed, accessibility, and user experience.

🌐 **Live Site:** [damianmeroni.dev](https://damianmeroni.dev)

## ✨ Features

- **⚡ Lightning Fast** - Built with Astro for optimal performance
- **📱 Fully Responsive** - Mobile-first design that works on all devices  
- **🌙 Dark Mode by Default** - Dark theme as default with persistent theme switching
- **🌍 Internationalization** - Multi-language support with automatic detection
- **♿ Accessible** - WCAG 2.1 AA compliant with semantic HTML
- **🔍 SEO Optimized** - Meta tags, structured data, and sitemap generation
- **📊 Performance Monitored** - Lighthouse CI integration for quality assurance
- **🚀 Edge Functions** - Cloudflare Workers for intelligent routing
- **🔧 State Management** - Zustand for scalable app state with persistence
- **🐛 Dev Tools** - Redux DevTools integration and custom state inspector

## 🛠️ Tech Stack

### Core Technologies
- **[Astro 5.x](https://astro.build)** - Modern static site generator
- **[TypeScript 5.x](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS 4.x](https://tailwindcss.com/)** - Utility-first styling
- **[Sharp](https://sharp.pixelplumbing.com/)** - High-performance image processing
- **[Zustand](https://zustand.docs.pmnd.rs/)** - Lightweight state management with persistence

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting and quality
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Husky](https://typicode.github.io/husky/)** - Git hooks
- **[npm](https://www.npmjs.com/)** - Package manager

### Deployment & CI/CD
- **[Cloudflare Pages](https://pages.cloudflare.com/)** - Global edge deployment
- **[GitHub Actions](https://github.com/features/actions)** - Automated CI/CD pipeline
- **[Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)** - Performance monitoring

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ LTS (required for latest dependencies)
- npm (included with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/Merodami/personal-website.git
cd personal-website

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:3000`

### Development Commands

```bash
# Development
npm run dev              # Start dev server on port 3000
npm start                # Alias for dev

# Building
npm run build            # Build for production (includes type checking)
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint
npm run format           # Format code with Prettier

# Performance
npm run open-lighthouse  # Generate Lighthouse report

# Maintenance  
npm update               # Update all dependencies to latest
```

## 🔧 State Management & Development Tools

### Theme System
The application uses a robust theme system with dark mode as the default:

- **Default Theme**: Dark mode for better user experience
- **Persistent Storage**: Theme preference saved across sessions
- **Industry Standards**: Centralized configuration and utility functions
- **Type Safety**: Full TypeScript support for theme values

### State Management with Zustand
```typescript
// Access theme state anywhere in the app
import { useTheme } from '../stores/appStore';

const { theme, setTheme, toggleTheme } = useTheme();
```

### Development Tools

#### Redux DevTools Integration
- Install [Redux DevTools Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
- View state changes in real-time during development
- Track all theme and state mutations

#### Custom State Inspector
- **Development only**: Bottom-right corner widget
- **Real-time monitoring**: Shows current state, DOM attributes, localStorage
- **Interactive controls**: Toggle theme, refresh state
- **Mobile responsive**: Adapts to different screen sizes

#### File Structure for State Management
```
src/
├── config/
│   └── theme.ts             # Theme constants and types
├── stores/
│   └── appStore.ts          # Zustand store with persistence
├── utils/
│   └── theme.ts             # Theme utility functions
├── scripts/
│   └── theme-init.ts        # Initial theme loading script
└── components/
    └── dev/
        └── StateInspector.astro  # Development state inspector
```

## 📁 Project Structure

```
personal-website/
├── .github/
│   └── workflows/           # GitHub Actions CI/CD
├── functions/
│   └── _middleware.ts       # Cloudflare edge functions
├── public/
│   ├── images/             # Static images
│   ├── icons/              # Favicon and app icons
│   ├── fonts/              # Web fonts
│   └── robots.txt          # SEO crawler instructions
├── src/
│   ├── assets/             # Build-time assets
│   │   └── tech-logos/     # Technology logos
│   ├── components/         # Reusable UI components
│   │   ├── common/         # Shared components (Button, Card, etc.)
│   │   ├── layout/         # Layout components (Header, Footer, etc.)
│   │   ├── sections/       # Page sections (Hero, About, etc.)
│   │   ├── cards/          # Card components
│   │   ├── background/     # Background components
│   │   ├── icons/          # Icon components
│   │   ├── seo/            # SEO components
│   │   └── dev/            # Development-only components
│   ├── config/             # Configuration files (theme constants)
│   ├── scripts/            # Utility scripts (theme initialization)
│   ├── content/            # Content collections
│   ├── data/               # Static data and constants
│   ├── stores/             # Zustand state management
│   ├── hooks/              # Custom hooks
│   ├── layouts/            # Page layouts
│   ├── pages/              # Route pages
│   ├── styles/             # Global styles and CSS
│   │   └── base/           # Base styles, themes, typography
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Utility functions (theme utilities)
├── astro.config.mjs        # Astro configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── wrangler.toml           # Cloudflare Pages configuration
└── CLAUDE.md               # Development standards and guidelines
```

## 🎨 Design System

### Typography
- **Primary Font:** Inter Variable Font
- **Fallback:** System font stack for performance

### Color Scheme
- **Light Mode:** Clean whites and grays with purple accents
- **Dark Mode:** Deep grays with purple highlights
- **Accent:** Purple gradient (#8B5CF6 to #A855F7)

### Responsive Breakpoints
- **Mobile:** 320px - 767px
- **Tablet:** 768px - 1023px  
- **Desktop:** 1024px - 1439px
- **Large Desktop:** 1440px+

## 🌍 Internationalization

The site supports multiple languages with intelligent routing:

- **Spanish (ES)** - Default for Spanish-speaking countries
- **English (EN)** - Default for all other regions
- **Automatic Detection** - Based on CloudFlare geolocation
- **Manual Override** - Users can switch languages anytime

## ⚡ Performance Features

- **Static Generation** - Pre-built HTML for fastest loading
- **Image Optimization** - WebP/AVIF formats with responsive sizing
- **Code Splitting** - Minimal JavaScript bundles
- **Edge Caching** - Global CDN with intelligent caching
- **Compression** - Brotli/Gzip compression for all assets

### Performance Targets
- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms  
- **CLS (Cumulative Layout Shift):** < 0.1
- **JavaScript Bundle:** < 200KB (gzipped)

## 🚀 Deployment

### Cloudflare Pages (Recommended)

The site is configured for automatic deployment to Cloudflare Pages:

**Build Settings:**
- **Framework:** Astro
- **Build Command:** `npm run build`
- **Build Output:** `dist`
- **Node Version:** 18+

**Environment Variables:**
```bash
# Required for GitHub Actions deployment
CLOUDFLARE_API_TOKEN=your_token_here
CLOUDFLARE_ACCOUNT_ID=your_account_id_here
```

### Manual Deployment

```bash
# Build for production
npm run build

# Deploy with Wrangler CLI
npx wrangler pages deploy dist --project-name=personal-website
```

## 🧪 Quality Assurance

### Automated Testing
- **TypeScript Checking** - Strict type validation
- **ESLint** - Code quality and consistency
- **Lighthouse CI** - Performance monitoring
- **Build Verification** - Ensures clean production builds

### Performance Monitoring
- **Lighthouse Reports** - Generated on every build
- **Core Web Vitals** - Tracked and optimized
- **Bundle Analysis** - Monitor JavaScript payload size

## 📊 SEO & Analytics

### SEO Features
- **Meta Tags** - Dynamic title, description, and OG tags
- **Structured Data** - JSON-LD schema markup
- **XML Sitemap** - Auto-generated and updated
- **Robots.txt** - Optimized for search crawlers
- **Canonical URLs** - Prevent duplicate content issues

### Analytics Integration
- **Google Tag Manager** - Flexible tracking setup
- **Performance Monitoring** - Core Web Vitals tracking
- **Privacy Focused** - GDPR/CCPA compliant implementation

## 🛡️ Security

- **Content Security Policy** - Prevents XSS attacks
- **HTTPS Only** - Secure connection enforcement
- **No Inline Scripts** - Enhanced security posture
- **Dependency Audits** - Regular security vulnerability checks
- **Edge Security** - Cloudflare's security features

## 🤝 Contributing

This is a personal website project, but if you notice any issues or have suggestions:

1. **Open an Issue** - Describe the problem or suggestion
2. **Security Issues** - Email directly to hello@damianmeroni.dev
3. **Performance Issues** - Include Lighthouse report if possible

## 📄 Development Standards

Detailed development guidelines, coding standards, and architectural decisions are documented in [`CLAUDE.md`](./CLAUDE.md). This includes:

- **Code Style Guidelines** - TypeScript, CSS, and component patterns
- **Performance Standards** - Core Web Vitals targets and optimization strategies  
- **Accessibility Requirements** - WCAG compliance and testing procedures
- **Browser Support** - Compatibility matrix and polyfill strategy

## 📝 License

© 2024 Damian Meroni. All rights reserved.

This project is proprietary and not licensed for public use, modification, or distribution.

---

**Built with ❤️ by [Damian Meroni](https://damianmeroni.dev)**

*Senior Software Engineer specializing in scalable architectures and high-performance web applications*