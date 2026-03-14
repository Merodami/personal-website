# 005 - State Management & Utilities

---

## Table of Contents

1. [State Management (Zustand)](#state-management-zustand)
2. [Dynamic i18n Client Utility](#dynamic-i18n-client-utility)
3. [Theme Utilities](#theme-utilities)
4. [Floating Logos Controller](#floating-logos-controller)
5. [Theme Toggle Controller](#theme-toggle-controller)
6. [FOUC Prevention Scripts](#fouc-prevention-scripts)
7. [Configuration Layer](#configuration-layer)
8. [Global Type Declarations](#global-type-declarations)

---

## State Management (Zustand)

### Store Definition (`src/stores/appStore.ts`)

The app uses a **Zustand vanilla store** (not React hooks) with persistence middleware.

**Interface:**
```typescript
interface AppState {
  theme: Theme;                        // 'light' | 'dark'
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}
```

**Store Implementation:**
```typescript
const useAppStore = create(
  persist(
    (set, get) => ({
      theme: THEME_CONFIG.DEFAULT_THEME,   // 'dark'

      setTheme: (theme: Theme) => {
        set({ theme });
        document.documentElement.setAttribute('data-theme', theme);
      },

      toggleTheme: () => {
        const current = get().theme;
        const newTheme = current === 'dark' ? 'light' : 'dark';
        set({ theme: newTheme });
        document.documentElement.setAttribute('data-theme', newTheme);
        return newTheme;
      },
    }),
    {
      name: THEME_CONFIG.STORAGE_KEY,      // 'app-storage'
    }
  )
);
```

**Persistence:**
- Storage: `localStorage`
- Key: `'app-storage'`
- Format: `{ "state": { "theme": "dark" }, "version": 0 }`
- Auto-hydrates on page load

**Usage Pattern:**
```typescript
// Read state
const theme = useAppStore.getState().theme;

// Update state
useAppStore.getState().toggleTheme();
useAppStore.getState().setTheme('light');

// Subscribe to changes
const unsubscribe = useAppStore.subscribe((state) => {
  console.log('Theme changed:', state.theme);
});
```

**Why Zustand:**
- Works outside React (vanilla store API)
- Built-in persistence middleware
- Minimal overhead (~1KB)
- No provider wrapper needed
- TypeScript-first API

---

## Dynamic i18n Client Utility

### `src/utils/dynamicI18n.ts` (403 lines)

The largest utility file, handling client-side language switching without page reload.

### Class: `DynamicI18n`

**State:**
```typescript
{
  currentLanguage: AvailableLanguage;    // 'en' | 'es'
  translations: TranslationResource;     // Current translation object
  isLoading: boolean;                    // True during language switch
}
```

**Constructor:**
- Detects language from `window.location.pathname` (`/es*` = Spanish, else English)
- Creates language strategy via `LanguageStrategyFactory`
- Initializes state with detected language and translations

### Core Methods

**`switchLanguage(targetLanguage: AvailableLanguage): Promise<void>`**

Full switching flow:
1. Guard: bail if already on target language
2. Set `isLoading: true`
3. Create new strategy via factory
4. Get new translations from strategy
5. Calculate new URL path (add/remove `/es` prefix)
6. `window.history.pushState({}, '', newPath)` (no page reload)
7. Update internal state (language, translations, isLoading: false)
8. Call `updatePageContent()` to refresh all DOM
9. `persistLanguage(targetLanguage)` to localStorage
10. Dispatch `language-changed` CustomEvent with language + translations detail
11. Error handling: logs error, resets isLoading

**`t<T = string>(key: string): T`**
- Uses lodash-es `get()` with dot-notation paths
- Returns typed value or key string as fallback

**`subscribe(listener: Function): () => void`**
- Adds listener to internal `Set<Function>`
- Returns unsubscribe function
- Listeners called on every `setState()` update

**`getState(): DynamicI18nState`**
- Returns shallow copy of internal state (immutable)

### DOM Update Methods

**`updatePageContent()` - Master Orchestrator**

Updates every translatable element in the DOM:

1. **`[data-i18n]` elements:** Sets `textContent` (or `placeholder` for inputs)
2. **`[data-i18n-html]` elements:** Sets `innerHTML`
3. **`aria-label` and `title` attributes:** Always updated if present
4. **`document.title`:** Route-aware title generation:
   - `/` or `/es/`: `hero.title.part1 + ' ' + hero.title.part2`
   - `/about`: `about.title + ' - Damian Meroni'`
   - `/contact`: `contact.title + ' - Damian Meroni'`
   - `/projects`: `projects.title + ' - Damian Meroni'`
5. **`document.documentElement.lang`:** Set to language code

Then calls specialized sub-updaters:

**`updateLanguageSwitcher()`**
- Updates `.language-code` text (EN/ES)
- Toggles `.active` class on `.language-option[data-lang]` elements
- Shows/hides `.check-icon` children

**`updateExperienceCards()`**
- Queries `[data-i18n-experience-cards]` container
- Gets `experience.jobs` array from translations
- Rebuilds entire container innerHTML with job cards (company, position, dates, tech badges)

**`updateNavigationLinks()`**
- Queries all `.nav-link` elements
- Strips existing `/es` prefix from href
- Adds `/es` prefix if current language is Spanish

**`updateDynamicText()`**
- Queries `.data-i18n-dynamic-words` element
- Creates word array with text + brand colors from `hero.dynamicWords`
- Sets `data-words` attribute to JSON string
- Dispatches `dynamicTextUpdate` custom event for DynamicText component

**`updateCVDownloadButton()`**
- Updates `[data-cv-download]` and `[data-cv-download-floating]` hrefs
- Spanish: `/cv/international/Damian_Meroni_CV_ES_I.pdf`
- English: `/cv/international/Damian_Meroni_CV_EN_I.pdf`

**`updateContactCards()`**
- Updates `[data-i18n-title]`: emailMe, linkedin, scheduleCall
- Updates `[data-i18n-description]`: corresponding descriptions
- Updates `[data-i18n-link-text]`: viewProfile
- Updates `[data-i18n-button-text]`: bookMeeting

**`updateSkillsGrid()`**
- Queries `[data-i18n-skills]` container
- Gets `aboutPage.skills` array
- Rebuilds grid items HTML

### Global Instance & Events

```typescript
export const dynamicI18n = new DynamicI18n();
// Assigned to window.dynamicI18n in BaseLayout.astro

// Browser back/forward navigation sync
window.addEventListener('popstate', () => {
  const lang = detectLanguageFromPath();
  dynamicI18n.switchLanguage(lang);
});
```

**Custom Events Dispatched:**
- `language-changed`: `{ detail: { language, translations } }`
- `dynamicTextUpdate`: Triggers DynamicText word refresh

---

## Theme Utilities

### `src/utils/theme.ts` (118 lines)

**`themeUtils` Object:**

**`getStoredTheme(): Theme`**
- SSR-safe (returns DEFAULT_THEME if no `window`)
- Reads `localStorage.getItem('app-storage')`
- Parses JSON: `parsed.state.theme`
- Handles corruption: warns and returns default
- Returns DEFAULT_THEME as fallback

**`setTheme(theme: Theme): void`**
- SSR-safe (returns early if no `window`)
- Reads existing localStorage or creates `{ state: { theme: DEFAULT_THEME } }`
- Updates `storage.state.theme = theme`
- Saves to localStorage
- Uses `requestAnimationFrame` for DOM update:
  - Sets `data-theme` attribute on `<html>`
  - Triggers reflow: `void document.documentElement.offsetHeight`
- Dispatches `theme-change` CustomEvent with `{ detail: { theme } }`
- Error fallback: applies DOM attribute even if storage fails

**`toggleTheme(): Theme`**
- Gets current theme
- Calculates opposite (dark/light)
- Calls `setTheme()` with new theme
- Returns new theme

**`initTheme(): void`**
- SSR-safe
- Reads stored theme
- Sets `data-theme` attribute on `<html>`

**`isDarkTheme(): boolean`**
- Returns `getStoredTheme() === THEME_CONFIG.THEMES.DARK`

**`onThemeChange(callback): () => void`**
- SSR-safe (returns no-op unsubscribe)
- Adds `theme-change` event listener on window
- Extracts theme from `event.detail.theme`
- Calls callback with theme
- Returns unsubscribe function

---

## Floating Logos Controller

### `src/utils/floatingLogos.ts` (74 lines)

**Interface:**
```typescript
interface FloatingLogosConfig {
  container: HTMLElement;
  items: NodeListOf<HTMLElement>;
}
```

### Class: `FloatingLogosController`

**Properties:**
- `mouseX`, `mouseY`: Normalized mouse position (-0.5 to 0.5)
- `currentX`, `currentY`: Smoothed target position (for easing)
- `ticking`: requestAnimationFrame throttle flag
- `itemDepths`: Array of depth values (1, 2, or 3) per item
- `animationFrameId`: For cleanup

**Constructor:**
- Calculates item depths: `index % 3 + 1` (creates 3 parallax layers)

**`updateTransforms()`:**
- Smooths position with easing: `current += (target - current) * 0.05`
- For each item:
  - `moveX = (currentX * depth) / 50`
  - `moveY = (currentY * depth) / 50`
  - Applies `transform: translate3d(calc(-50% + moveX), calc(-50% + moveY), 0) rotate(var(--rotation))`
- Resets ticking flag

**`animate()`:**
- Requests animation frame for `updateTransforms` if not already ticking
- Prevents multiple simultaneous frames

**`handleMouseMove(event: MouseEvent)`:**
- Normalizes: `mouseX = (clientX - windowWidth/2) / windowWidth`
- Normalizes: `mouseY = (clientY - windowHeight/2) / windowHeight`
- Calls `animate()`

**`startInitialAnimation()`:**
- Continuous rAF loop for smooth updates even without mouse movement

**`destroy()`:**
- Cancels animation frame if running

### Initialization

```typescript
function initFloatingLogos(): FloatingLogosController | null {
  const container = document.querySelector('#floating-tech-logos');
  const items = container?.querySelectorAll('.tech-float-item');
  if (!container || !items?.length) return null;

  const controller = new FloatingLogosController({ container, items });
  document.addEventListener('mousemove', controller.handleMouseMove);
  controller.startInitialAnimation();
  return controller;
}
```

---

## Theme Toggle Controller

### `src/utils/themeToggle.ts` (46 lines)

**Interface:**
```typescript
interface ThemeToggleConfig {
  toggleButton: HTMLElement;
}
```

### Class: `ThemeToggleController`

- Constructor: attaches click handler that calls `useAppStore.getState().toggleTheme()`
- `destroy()`: removes click event listener

### Initialization

```typescript
function initThemeToggle(): ThemeToggleController | null {
  themeUtils.initTheme();

  if (document.readyState === 'loading') {
    // Wait for DOMContentLoaded
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    const button = document.querySelector('#theme-toggle');
    if (button) return new ThemeToggleController({ toggleButton: button });
    return null;
  }
}
```

---

## FOUC Prevention Scripts

### `src/utils/theme-init.ts` and `src/utils/themeInit.ts`

Both files export an identical `themeInitScript` string constant:

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

**Purpose:** Runs synchronously in `<head>` before any CSS is applied, ensuring the correct theme is set before the first paint.

**Why IIFE:** Prevents variable leakage into global scope.

**Error Safety:** Catches JSON parse errors and localStorage access errors gracefully.

**Note:** Two files exist with identical content (theme-init.ts and themeInit.ts). This appears to be a duplication.

---

## Configuration Layer

### Site Configuration (`src/config/constants.ts`)

```typescript
const SITE_CONFIG = {
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

const NAVIGATION_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const FEATURE_FLAGS = {
  showProjects: false,   // Projects section is currently hidden
};
```

### Theme Configuration (`src/config/theme.ts`)

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

## Global Type Declarations

### `src/types/global.d.ts`

```typescript
declare global {
  interface Window {
    dynamicI18n: DynamicI18n;
  }
}

export {};
```

Augments the `Window` interface to provide type-safe access to the global `dynamicI18n` instance used for client-side language switching.

---

## Data Flow Summary

### Theme Change Flow

```
User clicks ThemeToggle
  -> ThemeToggleController.handleClick()
  -> useAppStore.getState().toggleTheme()
  -> Zustand: set({ theme: newTheme })
  -> Zustand persist: localStorage.setItem('app-storage', ...)
  -> DOM: document.documentElement.setAttribute('data-theme', newTheme)
  -> CSS: Variables change instantly via [data-theme='dark'] / :root
  -> Transitions: 0.3s ease on background-color and border-color
```

### Language Change Flow

```
User clicks LanguageSwitcher option
  -> dynamicI18n.switchLanguage(targetLang)
  -> LanguageStrategyFactory.createStrategy(targetLang)
  -> strategy.getTranslations()
  -> window.history.pushState({}, '', newPath)
  -> updatePageContent()
    -> Update all [data-i18n] elements
    -> Update experience cards (full rebuild)
    -> Update navigation links (add/remove /es)
    -> Update dynamic text words
    -> Update CV download links
    -> Update contact cards
    -> Update skills grid
  -> persistLanguage(targetLang) -> localStorage
  -> Dispatch 'language-changed' event
```

### Page Load Flow

```
1. HTML head:
   - theme-init script reads localStorage -> sets data-theme (FOUC prevention)
   - CriticalCSS inlined (above-fold styles)
   - Font preload (Inter woff2)

2. HTML body:
   - Components render with SSG translations (from useAstroI18n)
   - Header, main content, footer, floating CV button

3. Client scripts:
   - dynamicI18n instantiates (detects language from URL)
   - Intersection Observer starts watching .animate-on-scroll elements
   - Theme toggle controller initializes
   - Floating logos parallax starts
   - Easter egg listener attaches
```

---

## Utility Dependencies

| Utility | Dependencies |
|---------|-------------|
| `dynamicI18n.ts` | lodash-es (get), i18n (strategies, types, utils) |
| `theme.ts` | config/theme (THEME_CONFIG) |
| `theme-init.ts` | config/theme (THEME_CONFIG, compile-time) |
| `themeInit.ts` | config/theme (THEME_CONFIG, compile-time) |
| `themeToggle.ts` | stores/appStore, utils/theme |
| `floatingLogos.ts` | No external dependencies |
