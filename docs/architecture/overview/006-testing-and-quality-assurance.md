# 006 - Testing & Quality Assurance

---

## Table of Contents

1. [Test Infrastructure](#test-infrastructure)
2. [Test Suite Overview](#test-suite-overview)
3. [Unit Tests (Detailed)](#unit-tests-detailed)
4. [Integration Tests](#integration-tests)
5. [Mock Infrastructure](#mock-infrastructure)
6. [Code Quality Tools](#code-quality-tools)
7. [Git Hooks & Lint-Staged](#git-hooks--lint-staged)
8. [Quality npm Scripts](#quality-npm-scripts)

---

## Test Infrastructure

### Vitest Configuration (`vitest.config.ts`)

```typescript
{
  test: {
    globals: true,                    // describe, it, expect without imports
    environment: 'happy-dom',         // Lightweight DOM simulation
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/', 'dist/',
        '**/*.d.ts', '**/*.config.*',
        '**/mockData.ts', 'tests/setup.ts'
      ]
    }
  },
  resolve: {
    alias: {
      '@/': 'src/',
      '@components': 'src/components',
      '@layouts': 'src/layouts',
      '@pages': 'src/pages',
      '@styles': 'src/styles',
      '@utils': 'src/utils',
      '@stores': 'src/stores',
      '@data': 'src/data',
      '@types': 'src/types',
      '@config': 'src/config'
    }
  }
}
```

### Test Setup (`tests/setup.ts`)

```typescript
// IntersectionObserver mock
global.IntersectionObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}));

// localStorage mock
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn()
  }
});

// Reset all mocks before each test
beforeEach(() => { vi.clearAllMocks(); });
```

---

## Test Suite Overview

| File | Tests | Category |
|------|-------|----------|
| `tests/unit/utils/theme.test.ts` | 20 | Theme utilities |
| `tests/unit/utils/themeInit.test.ts` | 12 | FOUC prevention |
| `tests/unit/utils/floatingLogos.test.ts` | 12 | Animation controller |
| `tests/unit/utils/dynamicI18n.test.ts` | 20 | i18n client logic |
| `tests/unit/utils/dynamicI18n.client.test.ts` | 8 | i18n DOM updates |
| `tests/unit/i18n/utils.test.ts` | 16 | i18n utilities |
| `tests/unit/i18n/strategies/EnglishStrategy.test.ts` | 3 | English strategy |
| `tests/unit/i18n/strategies/SpanishStrategy.test.ts` | 3 | Spanish strategy |
| `tests/unit/i18n/strategies/LanguageStrategyFactory.test.ts` | 6 | Factory pattern |
| `tests/unit/components/ThemeToggle.test.ts` | 15 | Theme toggle UI |
| `tests/unit/stores/appStore.test.ts` | 11 | Zustand store |
| `tests/unit/config/constants.test.ts` | 20 | Site config validation |
| `tests/unit/data/projects.test.ts` | 20 | Project data integrity |
| `tests/unit/data/social.test.ts` | 20 | Social links validation |
| `tests/integration/themePersistence.test.ts` | 2 | Theme persistence flow |
| `tests/integration/theme-persistence.test.ts` | 2 | Duplicate of above |
| **Total** | **~190** | |

---

## Unit Tests (Detailed)

### Theme Utilities (`tests/unit/utils/theme.test.ts`) - 20 tests

**`getStoredTheme()`:**
- Returns DEFAULT_THEME when nothing stored
- Returns stored theme from localStorage (Zustand persist format)
- Handles corrupted localStorage (invalid JSON)
- Handles missing state/theme properties

**`setTheme()`:**
- Saves to localStorage with THEME_CONFIG.STORAGE_KEY
- Applies `data-theme` attribute to `document.documentElement`
- Dispatches `theme-change` custom event with detail
- Handles localStorage errors gracefully (still applies DOM)

**`toggleTheme()`:**
- dark -> light, light -> dark
- Returns new theme value
- Updates storage

**`isDarkTheme()`:**
- Returns true when stored theme is 'dark'
- Returns false when stored theme is 'light'

**`onThemeChange()`:**
- Registers callback for `theme-change` events
- Unsubscribe function stops notifications
- Returns no-op in SSR environment

---

### Theme Init Script (`tests/unit/utils/themeInit.test.ts`) - 12 tests

**Script Generation:**
- Generates valid IIFE pattern
- Contains STORAGE_KEY and DEFAULT_THEME constants

**Execution Logic:**
- Sets default theme when no stored theme
- Loads theme from localStorage when available
- Handles corrupted JSON silently
- Handles missing `state.theme` path

**Safety:**
- Doesn't throw on localStorage errors
- Safe for HTML embedding (string format)
- IIFE prevents global scope pollution
- Applies theme before first paint (prevents FOUC)

---

### Floating Logos (`tests/unit/utils/floatingLogos.test.ts`) - 12 tests

**FloatingLogosController:**
- Calculates item depths (cycling 1, 2, 3)
- Mouse movement updates coordinates
- Triggers requestAnimationFrame on mouse move
- Prevents multiple simultaneous animation frames
- Applies `translate3d` + `rotate(var(--rotation))` transforms
- Uses lerp (linear interpolation): `current += (target - current) * 0.05`
- Cancels animation frame on `destroy()`

**`initFloatingLogos()`:**
- Returns controller when container and items exist
- Returns null when container missing
- Returns null when items missing
- Attaches mousemove listener to document

---

### Dynamic i18n (`tests/unit/utils/dynamicI18n.test.ts`) - 20 tests

**Initialization:**
- English for root path `/`
- Spanish for `/es/about` path
- Loads translations from correct strategy

**`switchLanguage()`:**
- Switches language successfully
- No-op when switching to current language
- Dispatches `language-changed` custom event
- Error handling: logs error, maintains current language, resets isLoading

**`t()` Method:**
- Returns value for valid keys
- Returns key string for missing translations
- Supports generic type parameter

**State Management:**
- Subscription with listener functions
- Unsubscribe stops notifications
- `getState()` returns immutable copy

---

### Dynamic i18n Client DOM (`tests/unit/utils/dynamicI18n.client.test.ts`) - 8 tests

- Skills grid: populates `[data-i18n-skills]` container
- CV link: updates href to correct language PDF path
- Document title: combines hero.title parts
- HTML lang attribute: set to language code
- Language switcher: updates `.language-code`, toggles `.active` class
- Navigation links: adds/removes `/es` prefix
- Dynamic words: dispatches `dynamicTextUpdate` custom event
- Experience dates: updates time element content

---

### i18n Utilities (`tests/unit/i18n/utils.test.ts`) - 16 tests

**`isValidLanguage()`:** True for 'en'/'es', false for others

**`detectUserLanguage()`:**
- SSR: returns 'en' (no window)
- localStorage first: returns stored preference
- navigator.language fallback: parses 'es-AR' to 'es'
- Default: 'en' when no valid language detected

**`persistLanguage()`:**
- Saves to localStorage with 'preferred-language' key
- Sets `document.documentElement.lang` and `.dir` attributes
- Silent in SSR (no errors)

**`formatDate()`:** Locale-aware date formatting (en-US vs es-AR)

**`formatNumber()`:** Locale-aware number formatting

**`interpolate()`:** Replaces `{{name}}` placeholders, leaves missing keys intact

**`getTranslationKey()`:** Returns translation value or key string if missing

---

### Language Strategies - 12 tests total

**EnglishStrategy (3 tests):**
- `getTranslations()` returns enTranslations (verified specific keys)
- `getMetadata()`: code='en', name='English', locale='en-US', direction='ltr'

**SpanishStrategy (3 tests):**
- `getTranslations()` returns esTranslations (common.home='Inicio')
- `getMetadata()`: code='es', name='Espanol', locale='es-AR'

**LanguageStrategyFactory (6 tests):**
- `createStrategy('en')` returns EnglishStrategy
- `createStrategy('es')` returns SpanishStrategy
- Unsupported language falls back to English with console.warn
- `isValidLanguage()`: true for 'en'/'es', false for 'fr'
- `getAvailableLanguages()`: returns ['en', 'es']

---

### Theme Toggle Component (`tests/unit/components/ThemeToggle.test.ts`) - 15 tests

**ThemeToggleController:**
- Click handling toggles theme via store
- Handles multiple sequential clicks
- `destroy()` removes event listeners
- No calls after destroy

**`initThemeToggle()`:**
- Calls `themeUtils.initTheme()` on initialization
- Returns controller when `#theme-toggle` button exists
- Returns null when button missing
- Waits for DOMContentLoaded when document still loading

**Accessibility:**
- Button has `aria-label`: "Toggle theme"
- Title attributes for tooltips
- Uses `<button>` element for keyboard accessibility

---

### App Store (`tests/unit/stores/appStore.test.ts`) - 11 tests

**Initial State:**
- Theme equals `THEME_CONFIG.DEFAULT_THEME` ('dark')

**`setTheme()`:**
- Updates state correctly
- Applies `data-theme` attribute to DOM
- Handles both 'light' and 'dark'

**`toggleTheme()`:**
- 'dark' toggles to 'light'
- 'light' toggles to 'dark'
- Updates DOM immediately

**Persistence:**
- Uses 'app-storage' localStorage key
- Configured with persist middleware

**Subscriptions:**
- Notifies listeners on change
- Stops notifying after `unsubscribe()`

---

### Config Constants (`tests/unit/config/constants.test.ts`) - 20 tests

**SITE_CONFIG:**
- All required fields present (name, title, description, url, ogImage, author)
- Type validation (strings, object)
- Non-empty values
- HTTPS URL validation
- Email format validation
- ogImage path pattern: `/images|assets/[\w\/-]+\.(jpg|jpeg|png|webp)/`
- SEO: title contains name

**NAVIGATION_ITEMS:**
- Non-empty array
- Required fields (href, label)
- Path pattern: `/[\w-]*/`
- Unique hrefs and labels
- Includes home path (`/`)

**FEATURE_FLAGS:**
- `showProjects` flag exists
- All values are boolean
- Cross-validation with navigation items

---

### Project Data (`tests/unit/data/projects.test.ts`) - 20 tests

- Non-empty array of projects
- Required fields: id, title, description, image, tags, featured, date
- Type validation: strings, boolean, Date instance
- Unique IDs
- Non-empty fields
- At least one tag per project
- Image path pattern: `/images/projects/[\w-]+\.(jpg|png|webp)/`
- URL validation for liveUrl/githubUrl (https/http)
- Dates in past but after 2020
- At least one featured project
- Featured projects have liveUrl
- Sorted newest-first by date

---

### Social Links (`tests/unit/data/social.test.ts`) - 20 tests

- Non-empty array
- Required fields: name, url, icon, ariaLabel
- Protocol validation: https://, http://, or mailto:
- Icon format: lowercase with hyphens
- ARIA labels: min 5 chars, action words
- GitHub required (pattern: github.com/username)
- LinkedIn pattern validation
- Email links: mailto format

---

## Integration Tests

### Theme Persistence (`tests/integration/themePersistence.test.ts`) - 2 tests

**Test 1: Persists theme changes across utils and DOM**
1. Initialize with default theme
2. Call `setTheme('light')`
3. Await requestAnimationFrame
4. Mock localStorage to return saved state
5. Re-initialize and verify persistence
6. Simulates page reload scenario

**Test 2: Handles theme toggle workflow**
1. Start with default (dark)
2. Toggle to light, verify `isDarkTheme() === false`
3. Toggle back, verify `isDarkTheme() === true`
4. Listener subscription validates state changes
5. Tests complete user workflow

**Note:** `tests/integration/theme-persistence.test.ts` is a duplicate file with identical content.

---

## Mock Infrastructure

### DOM Mocks (`tests/mocks/domMocks.ts`)

**`setupDOMEnvironment()`:**
- Custom DOM setup with configurable URL
- `window.location.pathname` properly mocked
- CustomEvent polyfill for happy-dom
- `requestAnimationFrame` mock: `setTimeout(cb, 16)` (simulates ~60fps)
- `window.history.pushState` / `replaceState` mocks

**`createMockLocalStorage()`:**
- Functioning in-memory storage mock
- `getItem()`, `setItem()`, `removeItem()`, `clear()`

**`setupI18nDOMEnvironment()`:**
- Complete DOM with all i18n data attributes
- Navigation links, language switcher, experience cards container
- Skills grid, CV download links, contact cards

---

### i18n Mocks (`tests/mocks/i18nMocks.ts`)

**`mockTranslations`:**
- Default English translations for testing
- Covers: common, hero (with dynamic words), aboutPage (skills), experience (jobs), contact

**`mockLanguageStrategyFactory`:**
- `createStrategy()` returning mock strategy
- Mock strategy returns mock translations and metadata

**`createMockTranslations(overrides)`:**
- Merges custom translations with defaults

**`setupMockStrategy(translations)`:**
- Configures mock factory with specific translations

**`setupI18nMocks()`:**
- `vi.mock()` declarations for all i18n dependencies
- Mocks lodash-es `get()` with dot-notation path traversal

---

## Code Quality Tools

### ESLint (`eslint.config.js`)

**Format:** ESLint v9+ flat config

**Rules (TypeScript files):**
| Rule | Setting | Rationale |
|------|---------|-----------|
| `no-unused-vars` | off | Covered by TypeScript |
| `@typescript-eslint/no-unused-vars` | error | ^_ prefix exception for intentional unused |
| `@typescript-eslint/no-explicit-any` | error | Strict typing enforced |
| `@typescript-eslint/explicit-function-return-type` | off | Optional return types |

**Ignores:** node_modules/, dist/, .github/, .astro/

---

### Prettier (`.prettierrc`)

```json
{
  "printWidth": 100,
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "plugins": ["prettier-plugin-astro"],
  "overrides": [
    { "files": "**/*.astro", "options": { "parser": "astro" } }
  ]
}
```

**Ignored:** dist, node_modules, .astro, public, *.md

---

### Knip (`knip.json`) - Unused Code Detection

```json
{
  "entry": ["src/pages/**/*.{astro,ts,tsx}", "src/layouts/**/*.astro"],
  "project": ["src/**/*.{ts,tsx,js,jsx,astro}"],
  "ignore": ["**/*.spec.ts", "**/*.test.ts", ".astro/**", "src/utils/theme.ts"],
  "ignoreDependencies": ["sharp"],
  "ignoreExportsUsedInFile": true
}
```

Detects dead code, unused exports, and unnecessary dependencies.

---

### jscpd (`.jscpd.json`) - Copy-Paste Detection

- Threshold: 0 (detect all duplication)
- Reporters: HTML + console
- Formats: JS, TS, JSX, TSX, CSS, SCSS, HTML, Astro
- Excludes: node_modules, dist, build, public, .yarn, lighthouse, .astro

---

### dependency-cruiser (`.dependency-cruiser.cjs`) - Dependency Analysis

**Forbidden Patterns (11 rules):**

| Rule | Severity | Purpose |
|------|----------|---------|
| no-circular | warn | Circular dependency detection |
| no-orphans | info | Unused module detection |
| no-deprecated-core | warn | Deprecated Node.js modules |
| not-to-deprecated | warn | Deprecated npm packages |
| no-non-package-json | error | Unlisted packages |
| not-to-unresolvable | error | Broken imports |
| no-duplicate-dep-types | warn | Package in multiple dep types |
| not-to-spec | error | Prod code importing test files |
| not-to-dev-dep | error | Prod code using devDependencies |
| optional-deps-used | info | Optional dependency usage |
| peer-deps-used | warn | Peer dependency usage |

**Features:**
- TypeScript pre-compilation support
- tsconfig.json parsing
- Graphviz (dot) reporter for visualization
- Supports: .js, .jsx, .ts, .tsx, .astro, .d.ts

---

### type-coverage - TypeScript Coverage

Measures percentage of types that are explicitly typed (not `any`).

Current: **100%** coverage

---

## Git Hooks & Lint-Staged

### Husky Pre-Commit (`.husky/pre-commit`)

```bash
yarn lint-staged
```

### Lint-Staged Configuration (in `package.json`)

```json
{
  "lint-staged": {
    "*.{js,ts,astro}": "eslint --fix",
    "*.{js,ts,astro,css,md,json}": "prettier --write"
  }
}
```

**Flow:** On `git commit` -> Husky runs lint-staged -> ESLint fixes + Prettier formats only staged files -> Commit proceeds if no errors

---

## Quality npm Scripts

| Script | Purpose |
|--------|---------|
| `yarn test` | Run all tests |
| `yarn test:ui` | Interactive test browser UI |
| `yarn test:coverage` | Tests with V8 coverage report |
| `yarn test:watch` | Watch mode for development |
| `yarn lint` | ESLint check |
| `yarn format` | Prettier format all files |
| `yarn quality:types` | Type coverage measurement |
| `yarn quality:types:detail` | Detailed type coverage |
| `yarn quality:deps` | Dependency analysis (circular, orphans) |
| `yarn quality:deps:graph` | Generate SVG dependency graph |
| `yarn quality:duplicates` | Copy-paste detection |
| `yarn quality:duplicates:report` | HTML duplication report |
| `yarn quality:unused` | Knip unused code detection |
| `yarn quality:unused:strict` | Knip strict mode (production) |
| `yarn quality:all` | Run all quality checks |
| `yarn quality:ci` | CI variant (strict mode) |
| `yarn open-lighthouse` | Run Lighthouse audit locally |
