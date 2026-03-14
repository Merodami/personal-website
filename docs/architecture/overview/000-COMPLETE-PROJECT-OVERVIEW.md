# Complete Project Overview: damianmeroni.dev

**Project:** Damian Meroni's Personal Portfolio Website
**Live URL:** https://damianmeroni.dev
**Repository:** github.com:Merodami/personal-website
**Last Updated:** 2026-03-14

> This is the consolidated master document combining all 8 detailed analysis files.
> For focused reading, see individual files: `001` through `008` in this directory.

---

## Master Table of Contents

- [Part 1: Project Summary & Architecture](#part-1-project-summary--architecture)
- [Part 2: Technology Stack](#part-2-technology-stack)
- [Part 3: Project Structure](#part-3-project-structure)
- [Part 4: Components & UI Architecture](#part-4-components--ui-architecture)
- [Part 5: Internationalization System](#part-5-internationalization-system)
- [Part 6: Theme System & Styling](#part-6-theme-system--styling)
- [Part 7: State Management & Utilities](#part-7-state-management--utilities)
- [Part 8: Data Layer & Content](#part-8-data-layer--content)
- [Part 9: Testing & Quality Assurance](#part-9-testing--quality-assurance)
- [Part 10: Deployment & Infrastructure](#part-10-deployment--infrastructure)
- [Part 11: Performance & Metrics](#part-11-performance--metrics)
- [Part 12: Key Architectural Decisions](#part-12-key-architectural-decisions)

---

# Part 1: Project Summary & Architecture

A production-grade, high-performance personal portfolio website for Damian Meroni, a Senior Software Engineer with 9+ years of experience. The site showcases professional experience, technical skills, and projects with full bilingual support (English/Spanish), dark/light theme switching, and sophisticated UI animations.

## Core Features

- **Bilingual Support (EN/ES):** Hybrid i18n with static pages for SEO + dynamic client-side switching without page reload
- **Dark/Light Theme:** Persistent theme with FOUC prevention, smooth transitions, and Zustand state management
- **Responsive Design:** Mobile-first with 6 breakpoints (400px, 480px, 640px, 768px, 1024px, 1280px)
- **Performance Optimized:** Lighthouse 99/100, critical CSS inlining, font preloading, image optimization
- **Accessibility:** WCAG 2.1 AA, semantic HTML, keyboard navigation, screen reader support, reduced motion support
- **Animated UI:** Floating tech logos with parallax, scroll-triggered animations, dynamic text rotation, glass morphism effects
- **CV Downloads:** Bilingual PDFs (EN/ES) with floating download button
- **SEO Optimized:** Open Graph, Twitter Cards, hreflang tags, sitemap, robots.txt, structured metadata
- **Easter Egg:** Konami code (up, up, down, down, left, right, left, right, B, A) displays appreciation message

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home page (Hero, About, Experience, Contact) |
| `/about` | Detailed about page with technical skills |
| `/projects` | Project showcase grid (feature-flagged, currently hidden) |
| `/contact` | Contact methods (Email, LinkedIn, Calendly) |
| `/404` | Custom error page with gradient styling |
| `/es/*` | Spanish variants of all pages above |

## High-Level Architecture

```
User Request
    |
    v
Cloudflare Workers (Edge, 200+ data centers)
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

## Design Patterns

1. **Static Site Generation (SSG):** All pages pre-rendered at build time, zero server-side rendering
2. **Strategy Pattern:** i18n system uses abstract base + concrete strategies per language
3. **Factory Pattern:** LanguageStrategyFactory creates language strategy instances
4. **Singleton Pattern:** DynamicI18n client-side instance (global `window.dynamicI18n`)
5. **Observer Pattern:** Custom events for theme/language changes, Zustand subscriptions
6. **Island Architecture:** Astro's default, only interactive JS shipped where needed
7. **Component Composition:** Small, focused Astro components with scoped styles

## Data Flow

```
Build Time (Astro SSG):
  URL path -> useAstroI18n() -> LanguageStrategyFactory -> Strategy -> Translations -> HTML

Client-Side (Dynamic):
  User Action -> DynamicI18n.switchLanguage() -> history.pushState() -> DOM Update
  User Action -> useAppStore.toggleTheme() -> localStorage -> DOM data-theme attribute
```

## Codebase Scale

| Metric | Value |
|--------|-------|
| TypeScript files | 46 files, ~4,180 lines |
| Astro files | 37 files, ~3,884 lines |
| Total source code | ~5,492 lines |
| Test files | 15 files, ~190 tests |
| Components | 26 Astro components |
| Tech logo assets | 24 SVGs |
| Translation keys | ~150+ per language |

---

# Part 2: Technology Stack

## Core Dependencies

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

## Dev Dependencies

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

## Runtime Environment

| Tool | Version |
|------|---------|
| Node.js | >= 20.0.0 (LTS) |
| npm | >= 10.0.0 |
| Yarn | 4.9.1 (Corepack, node-modules linker) |

## npm Scripts

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

# Part 3: Project Structure

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
│   │   ├── index.astro, about.astro, contact.astro, projects.astro, 404.astro
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

## Astro Configuration (`astro.config.mjs`)

```javascript
{
  site: 'https://damianmeroni.dev',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: { prefixDefaultLocale: false }
  },
  output: 'static',
  integrations: [
    sitemap({ filter, changefreq: 'weekly', priority: 0.8 }),
    compress({ css: true, html: true, img: true, js: true, svg: true })
  ],
  image: { service: { entrypoint: 'astro/assets/services/sharp' } },
  vite: {
    plugins: [tailwind()],
    build: {
      cssCodeSplit: true,
      assetsInlineLimit: 4096,
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

## TypeScript Configuration (`tsconfig.json`)

- Extends `astro/tsconfigs/strict`
- Path aliases: `@components/*`, `@layouts/*`, `@styles/*`, `@utils/*`, `@config/*`, `@data/*`, `@stores/*`, `@assets/*`, `@i18n/*`, `@/*`
- `verbatimModuleSyntax: true`

---

# Part 4: Components & UI Architecture

**26 Astro components across 10 subdirectories**

## Component Hierarchy

```
BaseLayout.astro (Master Template)
├── SEOTags.astro           (Head: meta, OG, Twitter)
├── CriticalCSS.astro       (Head: inlined critical styles)
├── FontOptimization.astro  (Head: font preload, @font-face)
├── Header.astro            (Fixed navigation bar)
│   ├── Navigation.astro    (Desktop nav links)
│   ├── MobileMenu.astro    (Full-screen mobile nav)
│   ├── LanguageSwitcher.astro (EN/ES dropdown)
│   └── ThemeToggle.astro   (Dark/light toggle)
├── <slot />                (Page content)
│   ├── Hero.astro
│   │   ├── DynamicText.astro
│   │   ├── FloatingTechLogos.astro
│   │   ├── StaticTechLogos.astro
│   │   └── Button.astro
│   ├── About.astro / AboutPage.astro
│   ├── Experience.astro
│   ├── Projects.astro -> ProjectCard.astro
│   └── Contact.astro -> ContactCard.astro
├── Footer.astro
└── FloatingCVButton.astro  (Fixed floating button)
```

## BaseLayout.astro

**Path:** `src/layouts/BaseLayout.astro` | **Props:** `title?, description?, image?, noindex?`

**Head:** SEOTags, canonical URL, hreflang (en/es/x-default), CriticalCSS, FontOptimization, inline theme init script, global CSS import

**Body:** Header, `<main><slot /></main>`, Footer, FloatingCVButton

**Client Scripts:** dynamicI18n (global), IntersectionObserver (scroll animations, threshold: 0.1), Easter egg (Konami code)

## Layout Components

### Header.astro
Fixed glass-morphism navigation bar. Profile image (32x32) + email. Hides on scroll down, shows on scroll up (rAF). Responsive: full email > truncated > hidden across 4 breakpoints (400/480/640/1024px).

### Navigation.astro
Desktop-only nav (`display: none` below 640px). Active link detection. Feature-flag filtering (hides Projects if disabled). Localized URLs via `getLocalizedUrl()`.

### MobileMenu.astro
Full-screen overlay. Hamburger toggle. Dynamic HTML generation. Escape key closes. Language change event listener updates text.

### LanguageSwitcher.astro
Button with language code (EN/ES) + chevron. Glass-morphism dropdown. Uses `dynamicI18n.switchLanguage()` or falls back to navigation. ARIA: `aria-label`, `aria-expanded`, `aria-controls`.

### ThemeToggle.astro
Circular button (36px desktop, 32px mobile). Sun/Moon SVG icons. Smooth rotation/scale transitions. Integrates with `useAppStore.toggleTheme()`.

### Footer.astro
3-column: copyright | tech stack pills (TS, Astro, Tailwind, Zustand) | social icons (GitHub, LinkedIn, Email).

## Section Components

### Hero.astro
Full-viewport hero. Background: FloatingTechLogos (parallax) + StaticTechLogos + radial gradient. **9 rotating words** with brand colors (build/#3178C6, create/#61DAFB, develop/#339933, engineer/#F7DF1E, craft/#DD0031, architect/#2496ED, code/#FF9900, forge/#4169E1, shape/#47A248). CTAs: Projects (conditional), Contact, CV download, GitHub. Typography: `clamp(2.5rem, 5vw, 4.5rem)`. Staggered fade-up animations.

### About.astro (Home)
Centered section with title, 2 paragraphs, 4-column stats grid: 9+ years, Expert, Cloud, 6+ remote.

### AboutPage.astro
Prose intro (3 paragraphs). Technical Skills grid (1/2/3 cols responsive): JavaScript/TypeScript, React/Next.js, Vue.js/Nuxt, Node.js/Fastify, AWS/Azure, PostgreSQL/MongoDB, Serverless/Lambda, Microservices, CI/CD.

### Experience.astro
`lg:grid-cols-2` layout. 5 job entries (2016-2025) as Card components with colored dot, company, position, dates, description, technology badges.

### Projects.astro
Featured projects in `md:grid-cols-2 lg:grid-cols-3` grid. Staggered animation delays. "View All" link. Feature-flagged (currently OFF).

### Contact.astro
3 ContactCards: Email (mailto), LinkedIn (external), Calendar (Calendly). Auto-fit grid (`minmax(320px, 1fr)`). CTA box with rotating border animation (3s).

## Card Components

### ProjectCard.astro
`Props: { project: Project }`. Image (aspect-video, lazy, scale on hover), title (gradient on hover), description (line-clamp-3), tags (Badge), actions (Live Demo + GitHub).

### ContactCard.astro
`Props: { title, description, icon (SVG string), link?, button? }`. Animated border (8s gradient), glow effects, 72px icon container, 550px desktop / 360px mobile height, theme-aware backgrounds, CTA underline animation.

## Common Components

### Button.astro
`Props: { href?, variant: primary|secondary|outline, size: sm|md|lg, class?, external? }`. Dynamic element (`<a>` or `<button>`). Scale(1.02) on hover.

### Badge.astro
`Props: { text, variant: default|primary|success|warning }`. Pill shape (9999px radius), 0.75rem font, 500 weight.

### Card.astro
`Props: { class?, hover? }`. Surface background, 12px radius, conditional hover (translateY -2px + shadow). Dark theme: gradient `::before` highlight.

### Section.astro
`Props: { id?, class?, gradient? }`. Padding: 4rem mobile, 6rem desktop. Optional radial gradient overlay.

## UI Components

### DynamicText.astro
`Props: { words: Array<{text, color}>, className? }`. Typing/deleting animation loop: show (800ms) -> delete (80ms/char) -> pause (300ms) -> type (120ms/char) -> display (2.5s) -> repeat. Blinking cursor. Listens for `dynamicTextUpdate` events.

### FloatingCVButton.astro
Fixed bottom-right (2rem). Circular (60px), expands on hover. Pulse ring (2s infinite). Appears after scrolling past hero. Language-aware PDF link.

## Background Components

### FloatingTechLogos.astro
23+ logos, random positioning/rotation, float animation (15-25s), 3-level parallax depth. Mouse move listener with lerp easing (`current += (target - current) * 0.05`). Hardware-accelerated `transform3d`.

### StaticTechLogos.astro
21 logos in arc pattern around hero edges. Brand-colored labels. Hover: scale(1.1). Hidden on mobile (768px-). Dark logo handling for GitHub/Next.js/Fastify/Express.

## SEO & Optimization Components

### SEOTags.astro
`Props: { title?, description?, image?, noindex?, canonical? }`. Generates: charset, viewport, description, canonical, OG tags, Twitter Cards, favicon suite, `<title>`.

### CriticalCSS.astro
Inlines above-fold styles: reset, layout, hero, theme variables, header, grid.

### FontOptimization.astro
Preloads Inter woff2, inline `@font-face` with `font-display: swap` + basic Latin subset, system font fallback stack, preconnect to Google Fonts CDN.

---

# Part 5: Internationalization System

**Architecture:** Hybrid (Static SSG + Dynamic Client-Side Switching)
**Languages:** English (en, default), Spanish (es)
**Pattern:** Strategy Pattern with Factory

## i18n File Structure

```
src/i18n/
├── index.ts                    # Public API (re-exports)
├── types.ts                    # Type definitions
├── constants.ts                # Defaults and storage keys
├── utils.ts                    # Utility functions
├── astroUtils.ts               # Astro SSG helpers
├── locales/
│   ├── en.ts                   # English translations (~250 lines)
│   └── es.ts                   # Spanish translations (~250 lines)
└── strategies/
    ├── base.ts                 # Abstract base strategy
    ├── EnglishStrategy.ts      # English: en-US, MM/DD/YYYY, 1,234.56
    ├── SpanishStrategy.ts      # Spanish: es-AR, DD/MM/YYYY, 1.234,56
    └── LanguageStrategyFactory.ts  # Factory with validation + fallback
```

## Strategy Pattern

```typescript
// Abstract base
abstract class BaseLanguageStrategy implements LanguageStrategy {
  protected abstract readonly translations: TranslationResource;
  protected abstract readonly metadata: LanguageMetadata;
  getTranslations(): TranslationResource;
  getMetadata(): LanguageMetadata;
}

// Factory
class LanguageStrategyFactory {
  static createStrategy(language: AvailableLanguage): LanguageStrategy;
  static isValidLanguage(language: string): language is AvailableLanguage;
  static getAvailableLanguages(): AvailableLanguage[];
}
```

## Astro SSG Integration (`astroUtils.ts`)

```typescript
function useAstroI18n(astroUrl: URL): { lang, i18n: { t, getCurrentLanguage, getAvailableLanguages } }
function getLocalizedUrl(currentPath, targetLang): string   // '/about' + 'es' -> '/es/about'
function getAlternateUrls(currentPath): { en: string, es: string }
```

## Client-Side Dynamic Switching (`DynamicI18n` class, 403 lines)

**`switchLanguage(targetLanguage)`:** Guard -> Strategy -> history.pushState -> updatePageContent() -> persist -> dispatch event

**`updatePageContent()`** orchestrates: `[data-i18n]` text, `[data-i18n-html]` HTML, document.title, lang attribute, then sub-updaters for experience cards, navigation links, dynamic text, CV buttons, contact cards, skills grid, language switcher.

**Global:** `window.dynamicI18n`, listens for `popstate` (back/forward sync).

## URL Routing Strategy

| Path | Language | Prefix |
|------|----------|--------|
| `/`, `/about`, `/projects`, `/contact` | English | None (default) |
| `/es`, `/es/about`, `/es/projects`, `/es/contact` | Spanish | `/es` |

Hreflang tags: `en`, `es`, `x-default` in BaseLayout head.

## Translation Keys (Highlights)

### Common

| Key | EN | ES |
|-----|----|----|
| `common.home` | Home | Inicio |
| `common.about` | About | Sobre Mi |
| `common.viewMyWork` | View My Work | Ver Mi Trabajo |
| `common.getInTouch` | Get In Touch | Contactar |

### Hero Dynamic Words

| EN | ES | Color |
|----|----|-------|
| build | construyo | #3178C6 (TypeScript) |
| create | creo | #61DAFB (React) |
| develop | desarrollo | #339933 (Node.js) |
| engineer | optimizo | #F7DF1E (JavaScript) |
| craft | ejecuto | #DD0031 (Angular) |
| architect | arquitecto | #2496ED (Docker) |
| code | programo | #FF9900 (AWS) |
| forge | implemento | #4169E1 (PostgreSQL) |
| shape | estructuro | #47A248 (MongoDB) |

### Contact

| Key | EN | ES |
|-----|----|----|
| `contact.title` | Get In Touch | Contacto |
| `contact.emailMe` | Email Me | Enviarme un Email |
| `contact.scheduleCall` | Schedule a Call | Agendar una Llamada |
| `contact.bookMeeting` | Book a Meeting | Reservar Reunion |

## DOM Integration Points

| Attribute | Purpose |
|-----------|---------|
| `[data-i18n]` | Text content translation |
| `[data-i18n-html]` | HTML content translation |
| `[data-i18n-experience-cards]` | Experience card container (full rebuild) |
| `[data-i18n-skills]` | Skills grid container (full rebuild) |
| `[data-cv-download]` / `[data-cv-download-floating]` | CV download href |
| `.nav-link` | Navigation href (add/remove `/es`) |
| `.language-code` / `.language-option` | Language switcher UI |

## Adding a New Language

1. Create locale file `src/i18n/locales/it.ts`
2. Create strategy `src/i18n/strategies/ItalianStrategy.ts`
3. Register in factory
4. Update `AVAILABLE_LANGUAGES` type
5. Create `src/pages/it/` directory
6. Update `astro.config.mjs` locales
7. Add hreflang tag in BaseLayout
8. Update DynamicI18n URL/CV handling

---

# Part 6: Theme System & Styling

## Theme Architecture Flow

```
Page Load:
  1. Inline script reads localStorage('app-storage')
  2. Sets data-theme="dark|light" on <html> BEFORE paint (FOUC prevention)
  3. CSS variables activate immediately

User Toggle:
  1. ThemeToggle click -> useAppStore.toggleTheme()
  2. Zustand updates state + localStorage
  3. requestAnimationFrame -> data-theme attribute on <html>
  4. CSS transitions: 0.3s ease on background-color, border-color
  5. Dispatches 'theme-change' custom event
```

## CSS Design Tokens

### Light Theme (`:root`)

| Category | Token | Value |
|----------|-------|-------|
| Background | `--color-bg` | #ffffff |
| Background | `--color-bg-secondary` | #f9fafb |
| Background | `--color-surface` | #f9fafb |
| Text | `--color-text` | #111827 |
| Text | `--color-text-secondary` | #4b5563 |
| Brand | `--color-primary` | #a855f7 (Purple) |
| Brand | `--color-accent` | #ec4899 (Pink) |
| Border | `--color-border` | #e5e7eb |
| Glass | `--glass-bg` | rgba(255, 255, 255, 0.7) |

### Dark Theme (`[data-theme='dark']`)

| Category | Token | Value |
|----------|-------|-------|
| Background | `--color-bg` | #0a0a0a |
| Background | `--color-bg-secondary` | #111111 |
| Background | `--color-surface` | #1f1f1f |
| Text | `--color-text` | #ffffff |
| Text | `--color-text-secondary` | #d1d5db |
| Brand | `--color-primary` | #d946ef (Brighter magenta) |
| Brand | `--color-accent` | #f472b6 (Lighter pink) |
| Border | `--color-border` | #374151 |
| Glass | `--glass-bg` | rgba(31, 31, 31, 0.7) |

## Typography System

**Font:** Inter variable (100-900), `font-display: swap`, basic Latin subset preloaded
**Fallback:** -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif
**Monospace:** Fira Code, JetBrains Mono, Courier New

### Fluid Font Sizes (CSS clamp)

| Token | Min | Max |
|-------|-----|-----|
| `--text-xs` | 0.75rem | 0.875rem |
| `--text-base` | 1rem | 1.125rem |
| `--text-2xl` | 1.5rem | 2rem |
| `--text-4xl` | 2.5rem | 4rem |
| `--text-6xl` | 3.5rem | 6rem |

### Headings

h1: `--text-5xl` bold | h2: `--text-4xl` semibold | h3: `--text-3xl` medium | h4-h6: decreasing

## Animation System

### Global Keyframes
`fade-in`, `slide-in-left`, `slide-in-right`, `scale-in` (all 0.8s ease-out). Delay classes: 100ms through 2000ms.

### Scroll Animations
IntersectionObserver (threshold 0.1, rootMargin `0px 0px -50px 0px`) adds `.animate` class to `.animate-on-scroll` elements.

### Component Animations

| Component | Animation | Duration |
|-----------|-----------|----------|
| Hero text | Staggered fade-up | 0s, 0.2s, 0.4s |
| DynamicText | Typing/deleting | 80ms/120ms per char |
| FloatingTechLogos | Float + rotate | 15-25s cycle |
| FloatingCVButton | Pulse ring | 2s infinite |
| ContactCard border | Rotating gradient | 8s infinite |
| Header | Hide/show on scroll | rAF |

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Special Effects

- **Glass morphism:** `backdrop-filter: blur(10px)` + `--glass-bg` + `--glass-border`
- **Gradient text:** `background-clip: text` with primary-to-accent gradient
- **Card dark highlight:** `::before` gradient line at top

## Responsive Breakpoints

| Size | Width | Usage |
|------|-------|-------|
| xs | 400px | Header email visibility |
| sm | 480px | Header spacing |
| md | 640px | Navigation, grid 2-col |
| lg | 768px | Background logos, container padding |
| xl | 1024px | Full spacing, grid 3-col |
| 2xl | 1280px | Container max-width |

## Accessibility

- `:focus-visible` outline: 2px solid primary, 2px offset
- `::selection` with primary background
- `.visually-hidden` for screen readers
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- ARIA: `aria-label`, `aria-expanded`, `aria-controls` on interactive elements

---

# Part 7: State Management & Utilities

## Zustand Store (`src/stores/appStore.ts`)

```typescript
interface AppState {
  theme: Theme;                        // 'light' | 'dark'
  setTheme: (theme: Theme) => void;    // Set + apply to DOM
  toggleTheme: () => void;             // Switch + apply to DOM
}
// Persist middleware: localStorage key 'app-storage'
// Format: { "state": { "theme": "dark" }, "version": 0 }
```

## Theme Utilities (`src/utils/theme.ts`, 118 lines)

| Function | Purpose |
|----------|---------|
| `getStoredTheme()` | Read from localStorage, handle corruption, SSR-safe |
| `setTheme(theme)` | Save + rAF DOM update + dispatch `theme-change` event |
| `toggleTheme()` | Switch dark/light, return new theme |
| `initTheme()` | Set `data-theme` on page load |
| `isDarkTheme()` | Boolean check |
| `onThemeChange(cb)` | Subscribe to `theme-change` events, return unsubscribe |

## FOUC Prevention (`src/utils/theme-init.ts`)

Inline IIFE in `<head>` reads `localStorage('app-storage')` and sets `data-theme` before first paint.

## Floating Logos Controller (`src/utils/floatingLogos.ts`, 74 lines)

3-level parallax depth system. Mouse move normalized to -0.5/0.5. Lerp easing: `current += (target - current) * 0.05`. Hardware-accelerated `translate3d`. rAF throttled.

## Theme Toggle Controller (`src/utils/themeToggle.ts`, 46 lines)

Click handler calls `useAppStore.getState().toggleTheme()`. Waits for DOMContentLoaded. Queries `#theme-toggle`.

## Configuration

```typescript
// src/config/constants.ts
SITE_CONFIG = { name, title, description, url, ogImage, author }
NAVIGATION_ITEMS = [ { href: '/', label: 'Home' }, ... ]
FEATURE_FLAGS = { showProjects: false }

// src/config/theme.ts
THEME_CONFIG = { STORAGE_KEY: 'app-storage', DEFAULT_THEME: 'dark', THEMES: { LIGHT, DARK } }
```

## Complete Data Flows

### Page Load
1. `<head>`: theme-init script sets `data-theme`, CriticalCSS inlined, font preloaded
2. `<body>`: Components render with SSG translations (useAstroI18n)
3. Client scripts: dynamicI18n instantiates, IntersectionObserver starts, theme toggle initializes, parallax starts

### Theme Change
`ThemeToggle click -> toggleTheme() -> Zustand set + persist -> DOM data-theme -> CSS variables -> 0.3s transitions`

### Language Change
`LanguageSwitcher -> switchLanguage() -> Strategy factory -> history.pushState -> updatePageContent() -> persist -> dispatch event`

---

# Part 8: Data Layer & Content

**Mixed data strategy:** Static TS files + Translation files + Config constants + Public assets. No database, CMS, or API.

## Projects (`src/data/projects.ts`)

```typescript
interface Project {
  id: string; title: string; description: string; image: string;
  tags: string[]; liveUrl?: string; githubUrl?: string; featured: boolean; date: Date;
}
```

3 entries (feature-flagged OFF, placeholder data): E-commerce Platform, Task Management App, Weather Dashboard.

## Social Links (`src/data/social.ts`)

| Name | URL | Icon |
|------|-----|------|
| GitHub | github.com/Merodami | github |
| LinkedIn | linkedin.com/in/dmeroni | linkedin |
| Email | mailto:damian@gaialogy.io | email |

## Professional Experience (5 positions, 2016-2025)

| Company | Position | Period | Key Tech |
|---------|----------|--------|----------|
| Expian UK | Senior Software Engineer | 2023-2025 | TS, React, AWS, PostgreSQL, Microservices |
| HelviX | Senior Software Engineer | 2022-2023 | TS, Vue.js, AWS, MongoDB, Serverless |
| CEGID | Senior Software Engineer | 2020-2022 | TS, React, Azure, PostgreSQL, Docker |
| Dafiti | Full-Stack Engineer | 2019 | JS, React, Node.js, MongoDB |
| Grupo Clarin-AGEA | Full-Stack Developer | 2016-2019 | JS, Angular, Node.js, PostgreSQL |

## Technology Logos (`src/assets/tech-logos/`)

24 SVGs: Angular, Astro, AWS, Cypress, Docker, Express, Fastify, Git, GitHub, JavaScript, Jest, MongoDB, Next.js, Node.js, Playwright, PostgreSQL, React, Redis, Redux, Svelte, Tailwind CSS, TypeScript, Vitest, Vue.js

## CV Files (`public/cv/international/`)

| File | Size | Language |
|------|------|----------|
| Damian_Meroni_CV_EN_I.pdf | 170KB | English |
| Damian_Meroni_CV_ES_I.pdf | 174KB | Spanish |

## Feature Flags

`showProjects: false` hides: Navigation Projects link, Hero "View My Work" button, Projects section on home, Projects page (redirects to home).

---

# Part 9: Testing & Quality Assurance

## Test Infrastructure

**Runner:** Vitest 3.2.4 | **Environment:** happy-dom | **Coverage:** V8 (text, json, html) | **Setup:** `tests/setup.ts` (IntersectionObserver mock, localStorage mock, clearAllMocks beforeEach)

## Test Suite (~190 tests)

| File | Tests | What It Tests |
|------|-------|---------------|
| `theme.test.ts` | 20 | getStoredTheme, setTheme, toggleTheme, isDarkTheme, onThemeChange |
| `themeInit.test.ts` | 12 | IIFE generation, localStorage read, corruption handling, FOUC prevention |
| `floatingLogos.test.ts` | 12 | Parallax depth, mouse tracking, rAF throttle, lerp, destroy cleanup |
| `dynamicI18n.test.ts` | 20 | Init, switchLanguage, t(), subscriptions, error handling |
| `dynamicI18n.client.test.ts` | 8 | Skills grid, CV link, title, lang attr, switcher, nav links, dynamic words |
| `i18n/utils.test.ts` | 16 | detectUserLanguage, persistLanguage, formatDate/Number, interpolate |
| `EnglishStrategy.test.ts` | 3 | Translations, metadata (en-US, MM/DD/YYYY) |
| `SpanishStrategy.test.ts` | 3 | Translations, metadata (es-AR, DD/MM/YYYY) |
| `LanguageStrategyFactory.test.ts` | 6 | createStrategy, isValidLanguage, getAvailableLanguages, fallback |
| `ThemeToggle.test.ts` | 15 | Click handling, destroy, initThemeToggle, accessibility |
| `appStore.test.ts` | 11 | Initial state, setTheme, toggleTheme, persistence, subscriptions |
| `constants.test.ts` | 20 | SITE_CONFIG fields, NAVIGATION_ITEMS, FEATURE_FLAGS validation |
| `projects.test.ts` | 20 | Structure, types, uniqueness, URLs, dates, featured filtering |
| `social.test.ts` | 20 | Structure, protocols, GitHub/LinkedIn patterns, ARIA labels |
| `themePersistence.test.ts` | 2 | Cross-util persistence, toggle workflow |

## Mock Infrastructure

**DOM Mocks (`tests/mocks/domMocks.ts`):** setupDOMEnvironment, createMockLocalStorage, setupI18nDOMEnvironment (with all data attributes)

**i18n Mocks (`tests/mocks/i18nMocks.ts`):** mockTranslations, mockLanguageStrategyFactory, createMockTranslations, setupI18nMocks

## Code Quality Tools

| Tool | Config | Purpose |
|------|--------|---------|
| ESLint v9 | `eslint.config.js` | Flat config, no-explicit-any error, unused vars with ^_ exception |
| Prettier | `.prettierrc` | 100 width, semicolons, single quotes, astro plugin |
| Knip | `knip.json` | Dead code, unused exports/deps |
| jscpd | `.jscpd.json` | Copy-paste detection (threshold 0) |
| dependency-cruiser | `.dependency-cruiser.cjs` | 11 rules: no-circular, no-orphans, not-to-dev-dep, etc. |
| type-coverage | package.json script | **100%** TypeScript coverage |
| Husky | `.husky/pre-commit` | `yarn lint-staged` on commit |
| lint-staged | package.json | ESLint fix + Prettier write on staged files |

## Quality Metrics

| Metric | Value |
|--------|-------|
| Type Coverage | 100% |
| Code Duplication | 0% |
| Unused Dependencies | 0 |
| Unused Exports | 0 |
| ESLint Issues | 0 |

---

# Part 10: Deployment & Infrastructure

## Deployment Pipeline

```
git push main -> GitHub Actions (pages.yml)
  -> Checkout -> Node 20 -> Corepack -> yarn install --frozen-lockfile
  -> yarn lint -> yarn build (astro check + astro build)
  -> npx wrangler deploy -> Cloudflare Workers Edge -> damianmeroni.dev
```

**CI Pipeline (`ci.yml`):** Triggers on push to main/dev + PRs. Steps: checkout, node, install, lint, astro check, test:coverage, build.

**Deploy Pipeline (`pages.yml`):** Triggers on push to main + PRs. Concurrency: cancels superseded runs. Secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`.

## Cloudflare Workers (`wrangler.toml`)

```toml
name = "personal-website"
compatibility_date = "2024-01-01"
[assets]
directory = "./dist"
[[routes]]
pattern = "damianmeroni.dev/*"
zone_name = "damianmeroni.dev"
```

Global edge (200+ data centers), zero cold starts, auto HTTPS, DDoS protection.

## Build Output

```
dist/
├── index.html, about/, contact/, projects/, 404.html  (English)
├── es/ (index, about, contact, projects)               (Spanish)
├── assets/ ([hash].css, [hash].js, chunks/)            (Hashed)
├── cv/international/ (EN + ES PDFs)
├── images/, favicons, robots.txt, site.webmanifest, sitemap-index.xml
```

## Asset Optimization

CSS code splitting, < 4KB inlined, hash filenames, Sharp images, astro-compress (CSS/HTML/JS/SVG), Cloudflare Brotli.

## SEO

Auto-generated sitemap (weekly, priority 0.8), robots.txt, OG + Twitter Cards, hreflang (en/es/x-default), canonical URLs.

## PWA

`site.webmanifest`: "Damian's Portfolio", standalone display, Slate 800/900 theme, 192x192 + 512x512 icons.

## Development

Node 20 (.nvmrc, .node-version), Yarn 4.9.1 (Corepack, node-modules), VS Code (format on save, ESLint fix, workspace TypeScript).

---

# Part 11: Performance & Metrics

## Lighthouse Scores

| Category | Score |
|----------|-------|
| **Performance** | 99/100 |
| **Accessibility** | 100/100 |
| **Best Practices** | 100/100 |
| **SEO** | 100/100 |

## Core Web Vitals

| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| First Contentful Paint (FCP) | 1.1s | < 1.5s | Pass |
| Largest Contentful Paint (LCP) | 2.3s | < 2.5s | Pass |
| Total Blocking Time (TBT) | 0ms | < 200ms | Pass |
| Cumulative Layout Shift (CLS) | 0.017 | < 0.1 | Pass |
| Speed Index (SI) | 1.1s | < 3.0s | Pass |

## Optimizations Applied

1. **Critical CSS** inlined in `<head>` (CriticalCSS.astro)
2. **Font preload** with `font-display: swap` + unicode subset (FontOptimization.astro)
3. **Image optimization** via Sharp (responsive, lazy loading)
4. **Compression** via astro-compress + Cloudflare Brotli
5. **Code splitting** by route, manual critical chunks
6. **Cache busting** with hash-based filenames
7. **requestAnimationFrame** for all animations
8. **IntersectionObserver** for scroll-triggered animations
9. **Debounced parallax** with lerp easing
10. **Static prerendering** with zero runtime server overhead
11. **Inline theme init** prevents FOUC

---

# Part 12: Key Architectural Decisions

| Decision | Rationale |
|----------|-----------|
| **Astro SSG over Next.js/Gatsby** | Zero JS by default, perfect for content-heavy portfolio |
| **Strategy Pattern for i18n** | Extensible to new languages without modifying existing code |
| **Zustand over React Context** | Lightweight (~1KB), works outside React, built-in persistence |
| **Cloudflare Workers** | Global edge deployment, zero cold starts, free tier friendly |
| **Tailwind CSS 4 via Vite** | Utility-first, tree-shakeable, build-time optimization |
| **Static output only** | Maximum performance, CDN-cacheable, no server costs |
| **CSS custom properties for theming** | Zero-JS theme application, smooth transitions |
| **lodash-es over native** | Consistent API, tree-shakeable ES modules |
| **Yarn 4 with node-modules** | Modern package management, compatible with all tools |
| **Feature flags** | Projects section toggleable without code changes |
| **Hybrid i18n** | SEO from static pages, UX from client-side switching |
| **Inline theme init script** | Prevents flash of wrong theme on page load |

---

## Git History

| Metric | Value |
|--------|-------|
| Total Commits | ~90 |
| Active Branches | 13 local, 18 remote |
| Merged PRs | #1-#9 |
| Branch Strategy | `main` (prod) / `dev` (integration) / `task/<feature>` |

**Development Phases:** Foundation -> Design -> i18n -> Quality Push -> Performance Tuning -> CV Integration -> Test Expansion

---

*Individual detailed files: `001-project-deep-dive-full-detailed.md` through `008-data-layer-and-content.md`*
