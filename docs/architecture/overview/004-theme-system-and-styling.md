# 004 - Theme System & Styling

---

## Table of Contents

1. [Theme Architecture](#theme-architecture)
2. [CSS Custom Properties (Design Tokens)](#css-custom-properties-design-tokens)
3. [Typography System](#typography-system)
4. [Animation System](#animation-system)
5. [Tailwind CSS Configuration](#tailwind-css-configuration)
6. [PostCSS Configuration](#postcss-configuration)
7. [Theme Persistence & Switching](#theme-persistence--switching)
8. [FOUC Prevention](#fouc-prevention)
9. [Glass Morphism & Special Effects](#glass-morphism--special-effects)
10. [Responsive Design System](#responsive-design-system)
11. [Accessibility Features](#accessibility-features)

---

## Theme Architecture

### How It Works

```
Page Load:
  1. Inline <script> reads localStorage('app-storage')
  2. Sets data-theme="dark|light" on <html> BEFORE paint
  3. CSS variables activate immediately (no flash)

User Toggle:
  1. ThemeToggle click -> useAppStore.toggleTheme()
  2. Zustand updates state + localStorage
  3. themeUtils.setTheme() -> requestAnimationFrame
  4. Sets data-theme attribute on <html>
  5. CSS transitions handle visual change (0.3s ease)
  6. Dispatches 'theme-change' custom event
```

### Key Files

| File | Purpose |
|------|---------|
| `src/config/theme.ts` | Config constants (storage key, defaults) |
| `src/stores/appStore.ts` | Zustand store (theme state + persistence) |
| `src/utils/theme.ts` | Theme utilities (get/set/toggle/init) |
| `src/utils/theme-init.ts` | Inline script for FOUC prevention |
| `src/utils/themeInit.ts` | Same as above (duplicate) |
| `src/utils/themeToggle.ts` | Toggle button controller |
| `src/styles/base/themes.css` | CSS custom properties per theme |
| `src/components/layout/ThemeToggle.astro` | Toggle UI component |

### Configuration (`src/config/theme.ts`)

```typescript
const THEME_CONFIG = {
  STORAGE_KEY: 'app-storage',
  DEFAULT_THEME: 'dark',
  THEMES: {
    LIGHT: 'light',
    DARK: 'dark',
  },
};

type Theme = 'light' | 'dark';
```

---

## CSS Custom Properties (Design Tokens)

### Light Theme (`:root`)

```css
/* Backgrounds */
--color-bg: #ffffff;
--color-bg-secondary: #f9fafb;
--color-bg-tertiary: #f3f4f6;
--color-surface: #f9fafb;
--color-surface-hover: #f3f4f6;

/* Text */
--color-text: #111827;
--color-text-secondary: #4b5563;
--color-text-tertiary: #6b7280;
--color-text-inverse: #ffffff;

/* Borders */
--color-border: #e5e7eb;
--color-border-hover: #d1d5db;

/* Brand */
--color-primary: #a855f7;         /* Purple */
--color-primary-hover: #9333ea;
--color-primary-light: #faf5ff;
--color-primary-dark: #7e22ce;
--color-accent: #ec4899;          /* Pink */
--color-accent-hover: #db2777;

/* Shadows */
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);

/* Glass */
--glass-bg: rgba(255, 255, 255, 0.7);
--glass-border: rgba(255, 255, 255, 0.18);
```

### Dark Theme (`[data-theme='dark']`)

```css
/* Backgrounds */
--color-bg: #0a0a0a;
--color-bg-secondary: #111111;
--color-bg-tertiary: #1a1a1a;
--color-surface: #1f1f1f;
--color-surface-hover: #262626;

/* Text */
--color-text: #ffffff;
--color-text-secondary: #d1d5db;
--color-text-tertiary: #9ca3af;
--color-text-inverse: #000000;

/* Borders */
--color-border: #374151;
--color-border-hover: #4b5563;

/* Brand (brighter for dark backgrounds) */
--color-primary: #d946ef;         /* Brighter magenta */
--color-primary-hover: #e879f9;
--color-primary-light: #4a044e;
--color-primary-dark: #f0abfc;
--color-accent: #f472b6;          /* Lighter pink */
--color-accent-hover: #f9a8d4;

/* Shadows (stronger for dark mode) */
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.2);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.2);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.3);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.4);

/* Glass */
--glass-bg: rgba(31, 31, 31, 0.7);
--glass-border: rgba(255, 255, 255, 0.08);
```

### Theme Transition

All elements have smooth transitions on theme change:
```css
*, *::before, *::after {
  transition: background-color 0.3s ease, border-color 0.3s ease;
}
```

### Utility Color Classes

```css
.bg-primary    { background-color: var(--color-bg); }
.bg-secondary  { background-color: var(--color-bg-secondary); }
.bg-tertiary   { background-color: var(--color-bg-tertiary); }
.bg-surface    { background-color: var(--color-surface); }
.text-primary  { color: var(--color-text); }
.text-secondary { color: var(--color-text-secondary); }
.text-tertiary { color: var(--color-text-tertiary); }
.border-primary { border-color: var(--color-border); }
.border-hover  { border-color: var(--color-border-hover); }
```

---

## Typography System

### Font Stack

```css
/* Primary */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;

/* Monospace */
font-family: 'Fira Code', 'JetBrains Mono', 'Courier New', monospace;
```

### Font Loading

- **Source:** Google Fonts CDN (Inter variable, woff2)
- **Display:** `swap` (shows system font immediately, swaps when loaded)
- **Subset:** Basic Latin (U+0020-007F) for fast initial load
- **Variable Weight:** 100-900 (all weights from one file)
- **OpenType Features:** `'cv11', 'ss01', 'ss03'` (Inter-specific optimizations)
- **Rendering:** `optimizeLegibility`, antialiased font smoothing

### Fluid Font Sizes (CSS clamp)

| Token | Min | Preferred | Max |
|-------|-----|-----------|-----|
| `--text-xs` | 0.75rem | 0.7rem + 0.25vw | 0.875rem |
| `--text-sm` | 0.875rem | 0.8rem + 0.375vw | 1rem |
| `--text-base` | 1rem | 0.925rem + 0.375vw | 1.125rem |
| `--text-lg` | 1.125rem | 1rem + 0.625vw | 1.25rem |
| `--text-xl` | 1.25rem | 1.125rem + 0.625vw | 1.5rem |
| `--text-2xl` | 1.5rem | 1.25rem + 1.25vw | 2rem |
| `--text-3xl` | 2rem | 1.5rem + 2.5vw | 3rem |
| `--text-4xl` | 2.5rem | 1.75rem + 3.75vw | 4rem |
| `--text-5xl` | 3rem | 2rem + 5vw | 5rem |
| `--text-6xl` | 3.5rem | 2.5rem + 5vw | 6rem |

### Line Heights

| Token | Value |
|-------|-------|
| `--leading-none` | 1 |
| `--leading-tight` | 1.25 |
| `--leading-snug` | 1.375 |
| `--leading-normal` | 1.5 |
| `--leading-relaxed` | 1.625 |
| `--leading-loose` | 2 |

### Font Weights

| Token | Value |
|-------|-------|
| `--font-thin` | 100 |
| `--font-light` | 300 |
| `--font-normal` | 400 |
| `--font-medium` | 500 |
| `--font-semibold` | 600 |
| `--font-bold` | 700 |
| `--font-extrabold` | 800 |
| `--font-black` | 900 |

### Letter Spacing

| Token | Value |
|-------|-------|
| `--tracking-tighter` | -0.05em |
| `--tracking-tight` | -0.025em |
| `--tracking-normal` | 0 |
| `--tracking-wide` | 0.025em |
| `--tracking-wider` | 0.05em |
| `--tracking-widest` | 0.1em |

### Heading Styles

| Level | Size | Weight | Leading | Tracking |
|-------|------|--------|---------|----------|
| h1 | `--text-5xl` | bold | tight | tight |
| h2 | `--text-4xl` | semibold | tight | tight |
| h3 | `--text-3xl` | medium | tight | tight |
| h4 | `--text-2xl` | medium | normal | normal |
| h5 | `--text-xl` | normal | normal | normal |
| h6 | `--text-lg` | normal | normal | normal |

**Body:** `font-light`, `--text-base`, `--leading-normal`
**Paragraphs:** `--leading-relaxed`

---

## Animation System

### Global CSS Animations (`global.css`)

**Keyframes:**

```css
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes slide-in-left {
  from { opacity: 0; transform: translateX(-20px); }
  to   { opacity: 1; transform: translateX(0); }
}

@keyframes slide-in-right {
  from { opacity: 0; transform: translateX(20px); }
  to   { opacity: 1; transform: translateX(0); }
}

@keyframes scale-in {
  from { opacity: 0; transform: scale(0.9); }
  to   { opacity: 1; transform: scale(1); }
}
```

All: 0.8s duration, ease-out timing, forwards fill mode

**Utility Classes:**
- `.animate-fade-in`, `.animate-slide-in-left`, `.animate-slide-in-right`, `.animate-scale-in`

**Delay Classes:**
`.animation-delay-100` through `.animation-delay-2000` (100ms, 200ms, 300ms, 400ms, 500ms, 1s, 1.5s, 2s)

### Scroll Animation System

Configured in BaseLayout.astro via IntersectionObserver:

```javascript
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);
document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
```

**CSS:** `.animate-on-scroll` has opacity transition; `.animate-on-scroll.animate` triggers the reveal

### Component-Specific Animations

| Component | Animation | Duration |
|-----------|-----------|----------|
| Hero text | Staggered fade-up | 0s, 0.2s, 0.4s delays |
| DynamicText | Typing/deleting characters | 80ms delete, 120ms type |
| DynamicText cursor | Blinking pipe | 1s infinite |
| FloatingTechLogos | Float + rotate | 15-25s per cycle |
| FloatingCVButton | Pulse ring | 2s infinite |
| ContactCard border | Rotating gradient | 8s infinite |
| ContactCard CTA border | Rotating gradient | 3s infinite |
| Header | Hide/show on scroll | requestAnimationFrame |

### Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## Tailwind CSS Configuration

### `tailwind.config.js`

```javascript
{
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: ['class', '[data-theme-state="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      typography: {
        DEFAULT: { css: { maxWidth: '100ch' } },
      },
    },
  },
}
```

- Dark mode: Class-based with `data-theme-state` attribute selector
- Font family extension: Manrope as primary sans-serif
- Typography plugin: Prose max-width set to 100 characters

---

## PostCSS Configuration

### `postcss.config.js`

```javascript
{
  plugins: {
    'postcss-import': {},     // Enables @import statements
    'postcss-nesting': {},    // Enables CSS nesting (SCSS-like syntax)
  }
}
```

---

## Theme Persistence & Switching

### State Management (`src/stores/appStore.ts`)

```typescript
const useAppStore = create(
  persist(
    (set, get) => ({
      theme: THEME_CONFIG.DEFAULT_THEME,  // 'dark'

      setTheme: (theme: Theme) => {
        set({ theme });
        document.documentElement.setAttribute('data-theme', theme);
      },

      toggleTheme: () => {
        const newTheme = get().theme === 'dark' ? 'light' : 'dark';
        set({ theme: newTheme });
        document.documentElement.setAttribute('data-theme', newTheme);
        return newTheme;
      },
    }),
    { name: THEME_CONFIG.STORAGE_KEY }  // 'app-storage'
  )
);
```

**localStorage Structure:**
```json
{
  "state": {
    "theme": "dark"
  },
  "version": 0
}
```

### Theme Utilities (`src/utils/theme.ts`)

| Function | Purpose |
|----------|---------|
| `getStoredTheme()` | Reads theme from localStorage, handles corruption |
| `setTheme(theme)` | Saves to localStorage + applies to DOM via rAF + dispatches event |
| `toggleTheme()` | Switches dark/light, returns new theme |
| `initTheme()` | Sets `data-theme` attribute on page load |
| `isDarkTheme()` | Returns boolean check |
| `onThemeChange(callback)` | Listens for `theme-change` custom events, returns unsubscribe |

### Theme Toggle Controller (`src/utils/themeToggle.ts`)

```typescript
class ThemeToggleController {
  constructor({ toggleButton }) {
    // Attaches click -> useAppStore.getState().toggleTheme()
  }
  destroy() { /* removes listener */ }
}

function initThemeToggle() {
  themeUtils.initTheme();
  // Waits for DOMContentLoaded
  // Queries '#theme-toggle' button
  // Returns ThemeToggleController instance
}
```

---

## FOUC Prevention

### Inline Script (`src/utils/theme-init.ts`)

Injected in `<head>` as `is:inline` script in BaseLayout:

```javascript
(function() {
  const STORAGE_KEY = 'app-storage';
  const DEFAULT_THEME = 'dark';

  function getTheme() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.state?.theme || DEFAULT_THEME;
      }
    } catch (e) {}
    return DEFAULT_THEME;
  }

  document.documentElement.setAttribute('data-theme', getTheme());
})();
```

This runs synchronously before any CSS is applied, preventing the flash of wrong theme colors.

---

## Glass Morphism & Special Effects

### Glass Effect

```css
.glass {
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  background: var(--glass-bg);
}
```

Used in: Header, LanguageSwitcher dropdown

### Gradient Text

```css
.gradient-text {
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

Used in: Hero accent phrase, Contact heading, 404 page heading

### Gradient Backgrounds

```css
.gradient-primary {
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
}

.gradient-accent {
  background: linear-gradient(135deg, var(--color-accent), var(--color-primary));
}
```

### Card Hover Effects (Dark Theme)

```css
/* Card.astro dark theme */
[data-theme='dark'] .card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-primary), transparent);
  opacity: 0.3;
}
```

---

## Responsive Design System

### Breakpoints

| Size | Width | Usage |
|------|-------|-------|
| xs | 400px | Header email visibility |
| sm | 480px | Header spacing reduction |
| md | 640px | Navigation visibility, grid 2-col |
| lg | 768px | Background logos, container padding |
| xl | 1024px | Header full spacing, grid 3-col |
| 2xl | 1280px | Container max-width |

### Global Layout Variables

```css
--max-width: 1280px;
--header-height: 4rem;
--header-height-mobile: 3.5rem;
```

### Container

```css
.container {
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 1rem;    /* Mobile */
}

@media (min-width: 640px) {
  .container {
    padding: 0 2rem;  /* Desktop */
  }
}
```

### Scrollbar Styling

```css
::-webkit-scrollbar { width: 10px; }
::-webkit-scrollbar-track { background: var(--color-bg-secondary); }
::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: 5px;
}
::-webkit-scrollbar-thumb:hover { background: var(--color-border-hover); }
```

---

## Accessibility Features

### Focus Styles

```css
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

### Selection Styling

```css
::selection {
  background-color: var(--color-primary);
  color: var(--color-text-inverse);
}
```

### Visually Hidden (Screen Reader Only)

```css
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

### Semantic HTML Structure

```
<header>     -> Fixed navigation
<nav>        -> Navigation links
<main>       -> Page content
<section>    -> Content sections with IDs
<footer>     -> Site footer
<h1>-<h6>    -> Proper heading hierarchy
```

### ARIA Attributes Used

| Element | Attribute | Value |
|---------|-----------|-------|
| ThemeToggle | `aria-label` | "Toggle theme" |
| LanguageSwitcher | `aria-label` | "Select language" |
| LanguageSwitcher | `aria-expanded` | true/false |
| LanguageSwitcher | `aria-controls` | "language-menu" |
| MobileMenu close | `aria-label` | "Close menu" |
| Social links | `aria-label` | Per-link description |
| FloatingCVButton | `aria-label` | i18n download text |
