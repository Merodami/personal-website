# 001 - Project Deep Dive: Full Detailed Overview

**Project:** Damian Meroni's Personal Portfolio Website
**Live URL:** https://damianmeroni.dev
**Repository:** github.com:Merodami/personal-website
**Last Updated:** 2026-03-14

---

## Table of Contents

1. [Project Summary](#project-summary)
2. [Technology Stack](#technology-stack)
3. [Architecture Overview](#architecture-overview)
4. [Project Structure](#project-structure)
5. [Build & Output Strategy](#build--output-strategy)
6. [Performance Metrics](#performance-metrics)
7. [Code Quality Metrics](#code-quality-metrics)
8. [Git History & Evolution](#git-history--evolution)
9. [Key Architectural Decisions](#key-architectural-decisions)

---

## Project Summary

A production-grade, high-performance personal portfolio website for Damian Meroni, a Senior Software Engineer with 9+ years of experience. The site showcases professional experience, technical skills, and projects with full bilingual support (English/Spanish), dark/light theme switching, and sophisticated UI animations.

### Core Features

- **Bilingual Support (EN/ES):** Hybrid i18n with static pages for SEO + dynamic client-side switching without page reload
- **Dark/Light Theme:** Persistent theme with FOUC prevention, smooth transitions, and Zustand state management
- **Responsive Design:** Mobile-first with 6 breakpoints (400px, 480px, 640px, 768px, 1024px, 1280px)
- **Performance Optimized:** Lighthouse 99/100, critical CSS inlining, font preloading, image optimization
- **Accessibility:** WCAG 2.1 AA, semantic HTML, keyboard navigation, screen reader support, reduced motion support
- **Animated UI:** Floating tech logos with parallax, scroll-triggered animations, dynamic text rotation, glass morphism effects
- **CV Downloads:** Bilingual PDFs (EN/ES) with floating download button
- **SEO Optimized:** Open Graph, Twitter Cards, hreflang tags, sitemap, robots.txt, structured metadata
- **Easter Egg:** Konami code (up, up, down, down, left, right, left, right, B, A) displays appreciation message

### Pages

| Route | Description |
|-------|-------------|
| `/` | Home page (Hero, About, Experience, Contact) |
| `/about` | Detailed about page with technical skills |
| `/projects` | Project showcase grid (feature-flagged, currently hidden) |
| `/contact` | Contact methods (Email, LinkedIn, Calendly) |
| `/404` | Custom error page with gradient styling |
| `/es/*` | Spanish variants of all pages above |

---

## Technology Stack

### Core Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `astro` | ^5.12.4 | Meta framework (SSG) |
| `typescript` | ^5.8.3 | Type safety |
| `@tailwindcss/vite` | ^4.1.11 | Utility-first CSS via Vite plugin |
| `zustand` | ^5.0.6 | State management (theme persistence) |
| `lodash-es` | ^4.17.21 | Utility functions (get, isString) |
| `sharp` | ^0.34.3 | Image optimization service |
| `wrangler` | ^4.26.1 | Cloudflare Workers CLI (deployment) |
| `@astrojs/sitemap` | ^3.4.2 | Auto-generated sitemap |
| `@astrojs/check` | ^0.9.4 | Astro type checking |
| `astro-compress` | ^2.3.8 | CSS/HTML/JS/SVG/IMG compression |

### Dev Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `vitest` | ^3.2.4 | Test runner |
| `@vitest/coverage-v8` | ^3.2.4 | V8 code coverage |
| `@vitest/ui` | ^3.2.4 | Interactive test UI |
| `happy-dom` | ^18.0.1 | Lightweight DOM for testing |
| `eslint` | ^9.32.0 | Linting (flat config) |
| `@typescript-eslint/*` | ^8.38.0 | TypeScript ESLint rules |
| `prettier` | ^3.6.2 | Code formatting |
| `prettier-plugin-astro` | ^0.14.1 | Astro file formatting |
| `husky` | ^9.1.7 | Git hooks |
| `lint-staged` | ^16.1.2 | Staged file linting |
| `dependency-cruiser` | ^17.0.0 | Dependency analysis |
| `jscpd` | ^4.0.5 | Copy-paste detection |
| `knip` | ^5.62.0 | Unused code detection |
| `type-coverage` | ^2.29.7 | Type coverage measurement |
| `lighthouse` | ^12.8.0 | Performance auditing |
| `postcss` | ^8.5.6 | CSS processing |
| `postcss-import` | ^16.1.1 | CSS @import support |
| `postcss-nesting` | ^13.0.2 | CSS nesting syntax |

### Runtime Environment

| Tool | Version |
|------|---------|
| Node.js | >= 20.0.0 (LTS) |
| npm | >= 10.0.0 |
| Yarn | 4.9.1 (Corepack) |
| Package Manager | Yarn with node-modules linker |

---

## Architecture Overview

### High-Level Architecture

```
User Request
    |
    v
Cloudflare Workers (Edge)
    |
    v
Static Assets (./dist)
    |
    ├── HTML pages (pre-rendered by Astro SSG)
    ├── CSS (code-split, compressed)
    ├── JS (minimal, hash-named)
    ├── Images (Sharp-optimized)
    └── PDFs (CV files)
```

### Key Patterns

1. **Static Site Generation (SSG):** All pages pre-rendered at build time, zero server-side rendering
2. **Strategy Pattern:** i18n system uses abstract base + concrete strategies per language
3. **Factory Pattern:** LanguageStrategyFactory creates language strategy instances
4. **Singleton Pattern:** DynamicI18n client-side instance (global `window.dynamicI18n`)
5. **Observer Pattern:** Custom events for theme/language changes, Zustand subscriptions
6. **Island Architecture:** Astro's default, only interactive JS shipped where needed
7. **Component Composition:** Small, focused Astro components with scoped styles

### Data Flow

```
Build Time (Astro SSG):
  URL path -> useAstroI18n() -> LanguageStrategyFactory -> Strategy -> Translations -> HTML

Client-Side (Dynamic):
  User Action -> DynamicI18n.switchLanguage() -> history.pushState() -> DOM Update
  User Action -> useAppStore.toggleTheme() -> localStorage -> DOM data-theme attribute
```

---

## Project Structure

```
personal-website/
├── .github/workflows/         # CI/CD pipelines
│   ├── ci.yml                 # Test & lint pipeline
│   └── pages.yml              # Build & deploy to Cloudflare
├── .husky/                    # Git hooks
│   └── pre-commit             # Runs lint-staged
├── .vscode/                   # Editor configuration
│   └── settings.json          # Format on save, ESLint fix, workspace TS
├── docs/                      # Project documentation
│   ├── overview/              # This documentation suite
│   ├── CLAUDE.md              # AI assistant guidelines
│   ├── CODE_EXCELLENCE_ANALYSIS.md
│   ├── CV_ES.txt              # Spanish resume text
│   ├── GENERAL_PROJECT.md     # Project architecture overview
│   ├── LIGHTHOUSE_REPORT.md   # Performance metrics
│   ├── PERSONAL_SITE.md       # Design reference analysis
│   ├── PERSONAL_SITE_V2.md    # Enhancement roadmap
│   ├── PLAYWRIGHT_IMPLEMENTATION.md  # E2E testing plan
│   └── i18n-implementation-plan.md   # i18n architecture (COMPLETE)
├── public/                    # Static assets (served as-is)
│   ├── cv/international/      # CV PDFs (EN, ES)
│   ├── images/                # Profile images
│   ├── favicon-*.png          # Favicon suite
│   ├── robots.txt             # SEO crawl rules
│   └── site.webmanifest       # PWA manifest
├── src/                       # Source code
│   ├── assets/tech-logos/     # 24 SVG technology logos
│   ├── components/            # Astro components (26 files)
│   │   ├── background/        # FloatingTechLogos, StaticTechLogos
│   │   ├── cards/             # ContactCard, ProjectCard
│   │   ├── common/            # Badge, Button, Card, Section
│   │   ├── icons/             # TechLogo
│   │   ├── layout/            # Header, Footer, Navigation, MobileMenu, LanguageSwitcher, ThemeToggle
│   │   ├── sections/          # Hero, About, AboutPage, Contact, Experience, Projects
│   │   ├── seo/               # SEOTags
│   │   ├── ui/                # DynamicText, FloatingCVButton
│   │   ├── CriticalCSS.astro  # Inlined critical styles
│   │   └── FontOptimization.astro  # Font loading strategy
│   ├── config/                # App configuration
│   │   ├── constants.ts       # Site config, nav items, feature flags
│   │   └── theme.ts           # Theme config (storage key, defaults)
│   ├── data/                  # Static data
│   │   ├── projects.ts        # Project entries (3 items)
│   │   └── social.ts          # Social links (GitHub, LinkedIn, Email)
│   ├── i18n/                  # Internationalization system
│   │   ├── strategies/        # Strategy pattern implementation
│   │   ├── locales/           # Translation files (en.ts, es.ts)
│   │   ├── astroUtils.ts      # Astro SSG i18n helpers
│   │   ├── constants.ts       # Language defaults
│   │   ├── index.ts           # Public API exports
│   │   ├── types.ts           # Type definitions
│   │   └── utils.ts           # Language detection, formatting
│   ├── layouts/               # Page layouts
│   │   └── BaseLayout.astro   # Master HTML template
│   ├── pages/                 # Astro pages (file-based routing)
│   │   ├── es/                # Spanish locale pages
│   │   ├── index.astro        # Home
│   │   ├── about.astro        # About
│   │   ├── contact.astro      # Contact
│   │   ├── projects.astro     # Projects
│   │   └── 404.astro          # Error page
│   ├── stores/                # State management
│   │   └── appStore.ts        # Zustand theme store
│   ├── styles/                # Global styles
│   │   ├── base/themes.css    # Light/dark CSS variables
│   │   ├── base/typography.css # Font system
│   │   └── global.css         # Base styles, animations
│   ├── types/                 # TypeScript declarations
│   │   └── global.d.ts        # Window interface augmentation
│   └── utils/                 # Utility modules
│       ├── dynamicI18n.ts     # Client-side language switching (403 lines)
│       ├── floatingLogos.ts   # Parallax logo animation
│       ├── theme.ts           # Theme utilities
│       ├── theme-init.ts      # FOUC prevention script
│       ├── themeInit.ts       # FOUC prevention script (duplicate)
│       └── themeToggle.ts     # Toggle controller
├── tests/                     # Test suite
│   ├── integration/           # Integration tests
│   ├── mocks/                 # Test mocks (DOM, i18n)
│   ├── unit/                  # Unit tests (13 files)
│   └── setup.ts               # Test environment setup
├── astro.config.mjs           # Astro configuration
├── eslint.config.js           # ESLint flat config
├── knip.json                  # Unused code detection config
├── package.json               # Dependencies & scripts
├── postcss.config.js          # PostCSS plugins
├── tailwind.config.js         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration (strict)
├── vitest.config.ts           # Test runner configuration
└── wrangler.toml              # Cloudflare deployment config
```

### Codebase Scale

| Metric | Value |
|--------|-------|
| TypeScript files | 46 files, ~4,180 lines |
| Astro files | 37 files, ~3,884 lines |
| Total source code | ~5,492 lines |
| Test files | 15 files |
| Components | 26 Astro components |
| Tech logo assets | 24 SVGs |
| Translation keys | ~150+ per language |

---

## Build & Output Strategy

### Astro Configuration (`astro.config.mjs`)

```javascript
{
  site: 'https://damianmeroni.dev',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: { prefixDefaultLocale: false }  // /about (EN), /es/about (ES)
  },
  output: 'static',                          // Pure SSG
  integrations: [
    sitemap({ filter, changefreq: 'weekly', priority: 0.8 }),
    compress({ css: true, html: true, img: true, js: true, svg: true })
  ],
  image: { service: { entrypoint: 'astro/assets/services/sharp' } },
  vite: {
    plugins: [tailwind()],
    build: {
      cssCodeSplit: true,
      assetsInlineLimit: 4096,               // Inline assets < 4KB
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[hash][extname]',
          chunkFileNames: 'assets/chunks/[hash].js',
          entryFileNames: 'assets/[hash].js'
        }
      }
    }
  }
}
```

### Build Pipeline

1. `astro check` - TypeScript validation
2. `astro build` - Static site generation to `./dist`
3. `astro-compress` - Post-build compression of all assets
4. `wrangler deploy` - Push to Cloudflare Workers edge network

### npm Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `astro dev --port 3000` | Local development server |
| `build` | `astro check && astro build` | Production build with type checking |
| `preview` | `astro preview --port 3001` | Preview production build locally |
| `test` | `vitest` | Run test suite |
| `test:coverage` | `vitest run --coverage` | Tests with V8 coverage report |
| `test:ui` | `vitest --ui` | Interactive test browser UI |
| `lint` | `eslint . --ext .js,.ts` | Run ESLint |
| `format` | `prettier --write .` | Format all files |
| `deploy` | `wrangler deploy` | Deploy to Cloudflare |
| `quality:all` | Combined | Types + deps + duplicates + unused |
| `quality:ci` | Combined (strict) | CI variant with strict mode |

---

## Performance Metrics

### Lighthouse Scores (Latest)

| Category | Score |
|----------|-------|
| **Performance** | 99/100 |
| **Accessibility** | 100/100 |
| **Best Practices** | 100/100 |
| **SEO** | 100/100 |

### Core Web Vitals

| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| First Contentful Paint (FCP) | 1.1s | < 1.5s | Pass |
| Largest Contentful Paint (LCP) | 2.3s | < 2.5s | Pass |
| Total Blocking Time (TBT) | 0ms | < 200ms | Pass |
| Cumulative Layout Shift (CLS) | 0.017 | < 0.1 | Pass |
| Speed Index (SI) | 1.1s | < 3.0s | Pass |

### Performance Optimizations Applied

1. **Critical CSS Inlining** - Above-fold styles in `<head>` via CriticalCSS.astro
2. **Font Preloading** - Inter variable font with `font-display: swap` and unicode subset
3. **Image Optimization** - Sharp service with responsive sizes and lazy loading
4. **Asset Compression** - Brotli for HTML/CSS/JS/SVG/images via astro-compress
5. **Code Splitting** - CSS split by route, manual chunks for critical path
6. **Cache Busting** - Hash-based filenames for all assets
7. **requestAnimationFrame** - All animations use rAF for 60fps
8. **Intersection Observer** - Scroll animations only trigger when visible
9. **Debounced Events** - Mouse move parallax with smooth interpolation
10. **Static Prerendering** - Zero runtime server overhead

---

## Code Quality Metrics

| Metric | Value |
|--------|-------|
| Type Coverage | 100% |
| Code Duplication | 0% |
| Unused Dependencies | 0 |
| Unused Exports | 0 |
| ESLint Issues | 0 |
| Test Count | ~130+ tests |

---

## Git History & Evolution

### Repository Statistics

| Metric | Value |
|--------|-------|
| Total Commits | ~90 |
| Active Branches | 13 local, 18 remote |
| Merged PRs | #1 through #9 |
| Main Branch | `main` |
| Current Branch | `task/add-test-scenarios` |

### Development Phases

1. **Foundation:** Initial Astro setup, CI/CD pipelines, basic pages
2. **Design Implementation:** Component architecture, responsive layouts, animations
3. **Internationalization:** Strategy pattern i18n, bilingual content, dynamic switching
4. **Quality Push:** ESLint, Prettier, type coverage, test infrastructure
5. **Performance Tuning:** Critical CSS, font optimization, compression, Lighthouse 99
6. **CV Integration:** Bilingual PDFs, floating download button, experience data
7. **Current:** Test scenario expansion, documentation

### Branch Strategy

- `main` - Production (protected, auto-deploys)
- `dev` - Integration branch
- `task/<feature-name>` - Feature branches with PR reviews

---

## Key Architectural Decisions

| Decision | Rationale |
|----------|-----------|
| **Astro SSG over Next.js/Gatsby** | Zero JS by default, perfect for content-heavy portfolio |
| **Strategy Pattern for i18n** | Extensible to new languages without modifying existing code |
| **Zustand over React Context** | Lightweight, works outside React, built-in persistence |
| **Cloudflare Workers** | Global edge deployment, zero cold starts, free tier friendly |
| **Tailwind CSS 4 via Vite** | Utility-first, tree-shakeable, build-time optimization |
| **Static output only** | Maximum performance, CDN-cacheable, no server costs |
| **CSS custom properties for theming** | Zero-JS theme application, smooth transitions |
| **lodash-es over native** | Consistent API, tree-shakeable ES modules |
| **Yarn 4 with node-modules** | Modern package management, compatible with all tools |
| **Feature flags** | Projects section toggleable without code changes |
| **Hybrid i18n (static + dynamic)** | SEO from static pages, UX from client-side switching |
| **Inline theme init script** | Prevents flash of wrong theme on page load |
