# 002 - Components & UI Architecture

**Total Components:** 26 Astro components across 10 subdirectories

---

## Table of Contents

1. [Component Hierarchy](#component-hierarchy)
2. [Layout Components](#layout-components)
3. [Section Components](#section-components)
4. [Card Components](#card-components)
5. [Common Components](#common-components)
6. [UI Components](#ui-components)
7. [Background Components](#background-components)
8. [Icon Components](#icon-components)
9. [SEO & Optimization Components](#seo--optimization-components)

---

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
│   │   ├── Section.astro
│   │   └── Badge.astro
│   ├── Experience.astro
│   │   ├── Section.astro
│   │   ├── Card.astro
│   │   └── Badge.astro
│   ├── Projects.astro
│   │   ├── Section.astro
│   │   └── ProjectCard.astro
│   │       └── Badge.astro
│   └── Contact.astro
│       ├── Section.astro
│       └── ContactCard.astro
├── Footer.astro
└── FloatingCVButton.astro  (Fixed floating button)
```

---

## Layout Components

### BaseLayout.astro
**Path:** `src/layouts/BaseLayout.astro`
**Purpose:** Root HTML template wrapping all pages

**Props:**
```typescript
interface Props {
  title?: string;
  description?: string;
  image?: string;
  noindex?: boolean;
}
```

**Head Section Renders:**
- SEOTags component with page metadata
- Canonical URL: `https://damianmeroni.dev{pathname}`
- Hreflang tags for `en`, `es`, and `x-default`
- CriticalCSS (inlined above-fold styles)
- FontOptimization (preload Inter font)
- Inline theme init script (prevents FOUC)
- Global CSS import

**Body Structure:**
- `<Header />` - Fixed navigation bar
- `<main class="main-content">` - Page content via `<slot />`
- `<Footer />` - Site footer
- `<FloatingCVButton />` - Fixed floating CV download

**Client Scripts:**
1. **dynamicI18n** - Global language switching utility (`window.dynamicI18n`)
2. **Intersection Observer** - Scroll animation system
   - Threshold: 0.1
   - Root margin: `0px 0px -50px 0px`
   - Observes `.animate-on-scroll` elements, adds `.animate` class
3. **Easter Egg** - Konami code sequence triggers appreciation message

**Prerender:** `export const prerender = true` (static generation)

---

### Header.astro
**Path:** `src/components/layout/Header.astro`
**Purpose:** Fixed navigation header with glass morphism

**Structure:**
- Fixed positioning: `top: 1rem`, `left: 50%`, `transform: translateX(-50%)`
- Glass-morphism: `backdrop-filter: blur()` + semi-transparent border
- Profile section: 32x32px rounded image + email address
- Desktop: Navigation + LanguageSwitcher + ThemeToggle
- Mobile: MobileMenu hamburger

**Email Display:**
- Desktop (640px+): Full `damian@gaialogy.io`
- Tablet: Truncated `damian@`
- Mobile (400px-): Hidden entirely

**Scroll Behavior:** Header hides on scroll down, shows on scroll up (requestAnimationFrame optimized)

**Responsive Breakpoints:**
- 1024px+: Full spacing
- 640px-1024px: Reduced padding/font
- 480px-640px: Compact layout
- 400px-: Minimal (email hidden)

---

### Navigation.astro
**Path:** `src/components/layout/Navigation.astro`

**Props:**
```typescript
interface Props {
  currentPath: string;
}
```

**Features:**
- Desktop-only (hidden below 640px)
- Active link detection: exact match for `/`, prefix match for others
- Feature-flag filtering: hides Projects link if `FEATURE_FLAGS.showProjects` is false
- Localized URLs via `getLocalizedUrl()`
- Active styling: background `color-surface`, text `color-text`

---

### MobileMenu.astro
**Path:** `src/components/layout/MobileMenu.astro`

**Props:**
```typescript
interface Props {
  currentPath: string;
}
```

**Features:**
- Full-screen overlay (position: fixed, z-index high)
- Hamburger toggle button (visible only on mobile)
- Dynamic HTML generation via inline script
- Translation-aware menu items
- Keyboard handling: Escape key closes menu
- Link click auto-closes menu
- Language change event listener updates menu text

---

### LanguageSwitcher.astro
**Path:** `src/components/layout/LanguageSwitcher.astro`

**Features:**
- Button showing current language code (EN/ES) with chevron
- Dropdown menu with glass-morphism styling
- Active language indicated with checkmark icon
- Switching uses `dynamicI18n.switchLanguage()` if available, falls back to page navigation
- Keyboard: Escape closes, outside click closes

**Accessibility:**
- `aria-label` on trigger button
- `aria-expanded` toggle
- `aria-controls` linking button to menu

---

### ThemeToggle.astro
**Path:** `src/components/layout/ThemeToggle.astro`

**Features:**
- Circular button (36px desktop, 32px mobile)
- Two SVG icons: Sun (light mode) and Moon (dark mode)
- Smooth rotation/scale CSS transitions between states
- Integrates with Zustand `useAppStore.toggleTheme()`
- Calls `themeUtils.initTheme()` on load

**CSS States:**
- `[data-theme='light']`: Sun visible (opacity 1, rotate 0), Moon hidden
- `[data-theme='dark']`: Moon visible (opacity 1, rotate 0), Sun hidden

---

### Footer.astro
**Path:** `src/components/layout/Footer.astro`

**Structure (3 columns):**
1. **Left:** Copyright text (`2024 Damian Meroni`)
2. **Center:** Tech stack pills (TypeScript, Astro, Tailwind, Zustand)
3. **Right:** Source code link + social icons (GitHub, LinkedIn, Email)

**Styling:**
- Dark background (`bg-gray-900`)
- Tech pills: purple background at 0.2 alpha, scale on hover
- Social icons as inline SVGs with hover effects
- Responsive: stacks vertically on mobile

---

## Section Components

### Hero.astro
**Path:** `src/components/sections/Hero.astro`
**Purpose:** Full-viewport hero section with animated text and CTAs

**Background Elements:**
- FloatingTechLogos (animated parallax background)
- StaticTechLogos (positioned around hero edges)
- Radial gradient overlay (purple/pink)

**Dynamic Text:** 9 rotating words with brand colors:
| Word | Color | Brand |
|------|-------|-------|
| build | #3178C6 | TypeScript |
| create | #61DAFB | React |
| develop | #339933 | Node.js |
| engineer | #F7DF1E | JavaScript |
| craft | #DD0031 | Angular |
| architect | #2496ED | Docker |
| code | #FF9900 | AWS |
| forge | #4169E1 | PostgreSQL |
| shape | #47A248 | MongoDB |

**CTAs:**
- Projects button (conditional on FEATURE_FLAGS)
- Contact button (outline variant)
- CV download link with document icon
- GitHub link with icon

**Typography:** `clamp(2.5rem, 5vw, 4.5rem)` for hero title with gradient text accent

**Animations:** Staggered fade-up (0s, 0.2s, 0.4s delays)

---

### About.astro (Home Section)
**Path:** `src/components/sections/About.astro`
**Purpose:** Brief about section on the home page

**Content:**
- Section with `id="about"` and centered max-width 3xl container
- Title + two paragraphs with scroll animation
- 4-column stats grid (2 on mobile):
  - 9+ years experience
  - Full-stack expert
  - Cloud architecture
  - 6+ years remote

---

### AboutPage.astro
**Path:** `src/components/sections/AboutPage.astro`
**Purpose:** Full about page with detailed background

**Content:**
- Three introduction paragraphs (prose typography)
- Technical Skills section with dynamic grid:
  - 1 col mobile, 2 cols tablet, 3 cols desktop
  - Dark cards (`bg-gray-800`) with skill names
  - Skills from i18n data: JavaScript/TypeScript, React/Next.js, Vue.js/Nuxt, Node.js/Fastify, AWS/Azure, PostgreSQL/MongoDB, Serverless/Lambda, Microservices, CI/CD

---

### Experience.astro
**Path:** `src/components/sections/Experience.astro`
**Purpose:** Work experience timeline

**Data Interface:**
```typescript
interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies: string[];
}
```

**Layout:** `lg:grid-cols-2` (left: title/description, right: experience cards)

**Card Elements:**
- Colored dot indicator (primary color)
- Company name (primary color text)
- Position + date range
- Description text
- Technology badges (primary variant)

**Jobs (from translations):**
1. Expian UK (2023-2025) - Senior Software Engineer
2. HelviX (2022-2023) - Senior Software Engineer
3. CEGID Invoice & Financing (2020-2022) - Senior Software Engineer
4. Dafiti (2019) - Full-Stack Engineer
5. Grupo Clarin-AGEA (2016-2019) - Full-Stack Developer

---

### Projects.astro
**Path:** `src/components/sections/Projects.astro`
**Purpose:** Featured projects showcase on home page

**Features:**
- Section with gradient background
- Filters to featured projects only (`p.featured`)
- Grid: `md:grid-cols-2`, `lg:grid-cols-3`
- Staggered animation delay per item (index * 100ms)
- "View All Projects" link with arrow icon

---

### Contact.astro
**Path:** `src/components/sections/Contact.astro`
**Purpose:** Contact section with multiple methods

**Contact Methods (3 cards):**
1. **Email:** mailto:damian@gaialogy.io
2. **LinkedIn:** External link to profile
3. **Calendar:** Calendly booking link

**Features:**
- Large gradient heading
- Auto-fit grid (`minmax(320px, 1fr)`)
- Quick contact CTA box with rotating border animation (3s loop)
- Gradient text support for both themes

---

## Card Components

### ProjectCard.astro
**Path:** `src/components/cards/ProjectCard.astro`

**Props:**
```typescript
interface Props {
  project: Project;
}
```

**Structure:**
1. Image section (aspect-video, lazy loading, scale on hover)
2. Title (h3, gradient on card hover)
3. Description (line-clamp-3)
4. Tags (Badge components, flex wrap)
5. Actions (Live Demo + GitHub links with arrow icons)

---

### ContactCard.astro
**Path:** `src/components/cards/ContactCard.astro`

**Props:**
```typescript
interface Props {
  title: string;
  description: string;
  icon: string;        // HTML SVG string
  link?: { href: string; text: string; external?: boolean };
  button?: { href: string; text: string; external?: boolean };
}
```

**Advanced Effects:**
- **Animated Border:** Linear gradient background, 8s animation, opacity on hover
- **Glow Effects:** Outer radial glow (150%) + inner glow (30% 20%)
- **Icon Container:** 72x72px, morphing background on hover, SVG rotation
- **Height:** 550px desktop, 360px mobile
- **Theme Support:** Dark (rgba(20,20,20,0.5) + blur), Light (rgba(249,247,253,0.95) + shadow)
- **CTA Underline Animation:** Width 0 to 100% on hover

---

## Common Components

### Button.astro
**Path:** `src/components/common/Button.astro`

**Props:**
```typescript
interface Props {
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  class?: string;
  external?: boolean;
}
```

**Variants:**
| Variant | Background | Text | Border |
|---------|-----------|------|--------|
| primary | Gradient (primary to accent) | White | None |
| secondary | Surface color | Text color | Yes |
| outline | Transparent | Text color | Yes |

**Sizes:**
| Size | Padding | Font |
|------|---------|------|
| sm | px-4 py-2 | text-sm |
| md | px-6 py-3 | text-base |
| lg | px-8 py-4 | text-lg |

**Rendering:** Dynamic element (`<a>` or `<button>`), external links get `target="_blank" rel="noopener noreferrer"`

---

### Badge.astro
**Path:** `src/components/common/Badge.astro`

**Props:**
```typescript
interface Props {
  text: string;
  variant?: 'default' | 'primary' | 'success' | 'warning';
}
```

**Variants:**
| Variant | Background | Text Color |
|---------|-----------|------------|
| default | Surface | Secondary |
| primary | Purple (0.1 alpha) | Primary |
| success | Green (0.1 alpha) | Green |
| warning | Yellow (0.1 alpha) | Yellow |

**Styling:** Pill shape (border-radius: 9999px), font-size: 0.75rem, font-weight: 500

---

### Card.astro
**Path:** `src/components/common/Card.astro`

**Props:**
```typescript
interface Props {
  class?: string;
  hover?: boolean;
}
```

**Features:**
- Surface background with border, border-radius: 12px
- Conditional hover: `translateY(-2px)` + shadow increase
- Dark theme: gradient background + blur + subtle inset highlight via `::before`
- Light theme: subtle shadow with purple/pink tones

---

### Section.astro
**Path:** `src/components/common/Section.astro`

**Props:**
```typescript
interface Props {
  id?: string;
  class?: string;
  gradient?: boolean;
}
```

**Features:**
- Padding: 4rem mobile, 6rem desktop
- Relative positioning, z-index: 10
- Container: `mx-auto px-4`
- Optional gradient overlay: radial gradients (purple 0.05 alpha top, pink 0.05 alpha bottom)

---

## UI Components

### DynamicText.astro
**Path:** `src/components/ui/DynamicText.astro`
**Purpose:** Rotating word animation with typing/deleting effect

**Props:**
```typescript
interface Props {
  words: Array<{ text: string; color: string }>;
  className?: string;
}
```

**Animation Flow:**
1. Show first word (800ms)
2. Delete current word (80ms per character)
3. Pause (300ms)
4. Type new word (120ms per character)
5. Display word (2.5s)
6. Loop back to step 2

**Event System:**
- Listens for `dynamicTextUpdate` custom events
- Supports language changes without re-initialization
- Updates word colors dynamically

**Visual:** Blinking cursor effect (`::after` with `|` pipe, 1s blink animation)

---

### FloatingCVButton.astro
**Path:** `src/components/ui/FloatingCVButton.astro`
**Purpose:** Fixed floating button for CV download

**Features:**
- Position: fixed, bottom: 2rem, right: 2rem
- Circular (60px), expands to show "Download CV" text on hover
- Pulse ring animation (2s infinite, scale 1 to 1.3)
- Appears after scrolling past hero section (80% viewport height)
- Document icon with checkmark SVG
- Language-aware PDF link (EN or ES version)

**Responsive:**
- Mobile: 56px, no text expansion, hidden pulse text
- Desktop: Full hover expansion with text

---

## Background Components

### FloatingTechLogos.astro
**Path:** `src/components/background/FloatingTechLogos.astro`
**Purpose:** Animated floating technology logos in hero background

**Features:**
- 23+ technology logos as raw SVG imports
- Random positioning (0-100% x/y), rotation (0-360deg)
- Float animation: 15-25s duration, staggered 0-0.5s delay
- Keyframes: fade in at 2%, float up/down, rotate 360deg, fade out at 98%

**Parallax Effect:**
- Mouse move listener with debounced updates
- 3-level depth system (items cycle through depths 1, 2, 3)
- `transform3d` for hardware-accelerated movement
- Smooth easing: `currentX += (mouseX - currentX) * 0.05`

**Responsive:**
- Desktop: All logos visible at 0.35 opacity (dark) / 0.3 (light)
- Mobile (768px-): 30% more floating items, filtered display

---

### StaticTechLogos.astro
**Path:** `src/components/background/StaticTechLogos.astro`
**Purpose:** Positioned static logos around the hero section edges

**Layout:**
- 21 technologies positioned in an arc pattern
- Top arc (y: 13-17%), left side (x: 8-15%), right side (x: 85-92%), bottom arc (y: 83-89%)
- Random variation of +/-1.5% for natural feel
- Varied sizes: 40-60px per logo

**Features:**
- Brand-colored labels per technology
- Hover: scale(1.1), opacity 0.8 to 1
- Dark logo handling (GitHub, Next.js, etc.): light background in light theme
- Hidden on mobile (max-width: 768px)

---

## Icon Components

### TechLogo.astro
**Path:** `src/components/icons/TechLogo.astro`

**Props:**
```typescript
interface Props {
  name: string;
  size?: number;  // default 40px
  className?: string;
}
```

**Supported Technologies (23):**
TypeScript, React, Node.js, JavaScript, Angular, Vue.js, Svelte, Next.js, AWS, Docker, PostgreSQL, MongoDB, Redis, Express, Fastify, Git, GitHub, Tailwind CSS, Playwright, Cypress, Jest, Vitest, Astro

**Rendering:**
- Dynamic SVG imports from `@assets/tech-logos/`
- CSS filter approach for brand colors from monochrome SVGs
- Fallback: first character badge if logo not found
- Theme-aware: adjusted filters for dark/light modes
- Hover: scale(1.1) transform

---

## SEO & Optimization Components

### SEOTags.astro
**Path:** `src/components/seo/SEOTags.astro`

**Props:**
```typescript
interface Props {
  title?: string;
  description?: string;
  image?: string;
  noindex?: boolean;
  canonical?: string;
}
```

**Meta Tags Generated:**
- charset: UTF-8, viewport: width=device-width
- description, canonical URL
- Conditional noindex/nofollow
- Open Graph: type, url, title, description, image
- Twitter Card: summary_large_image with all meta
- Favicon suite: ico, 16x16, 32x32, apple-touch, webmanifest
- Page `<title>` tag

---

### CriticalCSS.astro
**Path:** `src/components/CriticalCSS.astro`
**Purpose:** Inline critical above-fold styles in `<head>`

**Covers:**
- Universal box-sizing reset
- Body margin/font-family fallback
- Container max-width (1280px)
- Hero title fluid sizing
- Theme CSS variables (dark + light)
- Header sticky positioning
- Hero section min-height: 100vh
- Grid layouts (2-col, 3-col)

---

### FontOptimization.astro
**Path:** `src/components/FontOptimization.astro`
**Purpose:** Optimized font loading strategy

**Strategy:**
1. `<link rel="preload">` for Inter woff2 (high priority)
2. Inline `@font-face` with `font-display: swap` and basic Latin subset
3. System font fallback stack
4. `<link rel="preconnect">` to fonts.googleapis.com and fonts.gstatic.com
