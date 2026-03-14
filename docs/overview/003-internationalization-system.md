# 003 - Internationalization (i18n) System

**Architecture:** Hybrid (Static SSG + Dynamic Client-Side Switching)
**Languages:** English (en, default), Spanish (es)
**Pattern:** Strategy Pattern with Factory

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Strategy Pattern Implementation](#strategy-pattern-implementation)
3. [Astro SSG Integration](#astro-ssg-integration)
4. [Client-Side Dynamic Switching](#client-side-dynamic-switching)
5. [Translation Structure](#translation-structure)
6. [Full Translation Keys](#full-translation-keys)
7. [URL Routing Strategy](#url-routing-strategy)
8. [DOM Integration Points](#dom-integration-points)
9. [Adding a New Language](#adding-a-new-language)

---

## Architecture Overview

The i18n system uses a **hybrid approach** combining static page generation for SEO with client-side dynamic switching for UX:

```
Build Time (SEO):
  /index.astro      -> /index.html     (English)
  /es/index.astro   -> /es/index.html  (Spanish)

Runtime (UX):
  User clicks ES -> DynamicI18n.switchLanguage('es')
                  -> history.pushState('/es/')
                  -> DOM content updated
                  -> No page reload
```

### File Structure

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
    ├── EnglishStrategy.ts      # English implementation
    ├── SpanishStrategy.ts      # Spanish implementation
    └── LanguageStrategyFactory.ts  # Factory for creating strategies
```

---

## Strategy Pattern Implementation

### Type Definitions (`types.ts`)

```typescript
const AVAILABLE_LANGUAGES = ['en', 'es'] as const;
type AvailableLanguage = 'en' | 'es';

const LANGUAGE_DIRECTION = {
  ltr: 'ltr',
  rtl: 'rtl',
} as const;

interface TranslationResource {
  common: { /* UI labels */ };
  hero: { /* Hero section */ };
  about: { /* About section */ };
  aboutPage: { /* About page content */ };
  experience: { /* Work experience */ };
  projects: { /* Projects section */ };
  contact: { /* Contact section */ };
  footer: { /* Footer content */ };
}

interface LanguageMetadata {
  code: AvailableLanguage;
  name: string;              // Display name ("English", "Espanol")
  locale: string;            // Intl locale ("en-US", "es-AR")
  direction: 'ltr' | 'rtl';
  dateFormat: string;        // "MM/DD/YYYY" or "DD/MM/YYYY"
  numberFormat: string;      // "1,234.56" or "1.234,56"
}

interface LanguageStrategy {
  getTranslations(): TranslationResource;
  getMetadata(): LanguageMetadata;
}
```

### Base Strategy (`strategies/base.ts`)

```typescript
abstract class BaseLanguageStrategy implements LanguageStrategy {
  protected abstract readonly translations: TranslationResource;
  protected abstract readonly metadata: LanguageMetadata;

  getTranslations(): TranslationResource {
    return this.translations;
  }

  getMetadata(): LanguageMetadata {
    return this.metadata;
  }
}
```

### Concrete Strategies

**EnglishStrategy (`strategies/EnglishStrategy.ts`):**
```typescript
class EnglishStrategy extends BaseLanguageStrategy {
  protected readonly translations = enTranslations;
  protected readonly metadata: LanguageMetadata = {
    code: 'en',
    name: 'English',
    locale: 'en-US',
    direction: 'ltr',
    dateFormat: 'MM/DD/YYYY',
    numberFormat: '1,234.56',
  };
}
```

**SpanishStrategy (`strategies/SpanishStrategy.ts`):**
```typescript
class SpanishStrategy extends BaseLanguageStrategy {
  protected readonly translations = esTranslations;
  protected readonly metadata: LanguageMetadata = {
    code: 'es',
    name: 'Espanol',
    locale: 'es-AR',          // Argentine Spanish
    direction: 'ltr',
    dateFormat: 'DD/MM/YYYY',
    numberFormat: '1.234,56',  // European number format
  };
}
```

### Factory (`strategies/LanguageStrategyFactory.ts`)

```typescript
class LanguageStrategyFactory {
  private static strategies: Record<AvailableLanguage, new () => LanguageStrategy> = {
    en: EnglishStrategy,
    es: SpanishStrategy,
  };

  static createStrategy(language: AvailableLanguage): LanguageStrategy {
    const StrategyClass = this.strategies[language];
    if (!StrategyClass) {
      console.warn(`Unsupported language: ${language}, falling back to default`);
      return new this.strategies[DEFAULT_LANGUAGE]();
    }
    return new StrategyClass();
  }

  static isValidLanguage(language: string): language is AvailableLanguage {
    return language in this.strategies;
  }

  static getAvailableLanguages(): AvailableLanguage[] {
    return Object.keys(this.strategies) as AvailableLanguage[];
  }
}
```

---

## Astro SSG Integration

### `astroUtils.ts`

**`useAstroI18n(astroUrl: URL)`** - Primary SSG hook

```typescript
function useAstroI18n(astroUrl: URL): {
  lang: AvailableLanguage;
  i18n: {
    t<T>(key: string): T;
    getCurrentLanguage(): AvailableLanguage;
    getAvailableLanguages(): LanguageMetadata[];
  };
}
```

- Detects language from URL: `/es*` returns `'es'`, everything else returns `'en'`
- Creates fresh i18n instance (avoids singleton issues in SSG)
- `t()` uses lodash-es `get()` for dot-notation key access with fallback to key string

**`getLocalizedUrl(currentPath, targetLang)`** - URL generation

```typescript
// English (default locale, no prefix):
getLocalizedUrl('/about', 'en')     // '/about'
getLocalizedUrl('/es/about', 'en')  // '/about'

// Spanish (es prefix):
getLocalizedUrl('/about', 'es')     // '/es/about'
getLocalizedUrl('/', 'es')          // '/es'
```

**`getAlternateUrls(currentPath)`** - Hreflang generation

```typescript
getAlternateUrls('/about')
// { en: '/about', es: '/es/about' }
```

### Usage in Astro Components

```astro
---
const { lang, i18n } = useAstroI18n(Astro.url);
const t = i18n.t;
---
<h1>{t('hero.title.part1')}</h1>
<p>{t('about.paragraph1')}</p>
```

---

## Client-Side Dynamic Switching

### `DynamicI18n` Class (`src/utils/dynamicI18n.ts`)
**Lines:** 403
**Purpose:** Enables language switching without page reload

**State:**
```typescript
{
  currentLanguage: AvailableLanguage;
  translations: TranslationResource;
  isLoading: boolean;
}
```

**Key Methods:**

**`switchLanguage(targetLanguage)`:**
1. Bails if already on target language
2. Sets `isLoading: true`
3. Creates strategy via LanguageStrategyFactory
4. Updates URL via `window.history.pushState()` (no reload)
5. Updates internal state with new translations
6. Calls `updatePageContent()` to refresh all DOM elements
7. Persists preference to localStorage
8. Dispatches `language-changed` custom event

**`t<T>(key)`:** Retrieves translation using lodash-es `get()`

**`updatePageContent()`** - DOM refresh orchestrator:
1. Updates all `[data-i18n]` elements (text content or placeholder for inputs)
2. Updates all `[data-i18n-html]` elements (innerHTML)
3. Updates `document.title` based on current route
4. Updates `document.documentElement.lang` attribute
5. Calls sub-updaters:
   - `updateLanguageSwitcher()` - Active language indicator
   - `updateExperienceCards()` - Re-renders job cards
   - `updateNavigationLinks()` - Adds/removes `/es` prefix
   - `updateDynamicText()` - Updates rotating words + dispatches `dynamicTextUpdate` event
   - `updateCVDownloadButton()` - Switches PDF link (EN/ES)
   - `updateContactCards()` - Updates titles, descriptions, button text
   - `updateSkillsGrid()` - Re-renders skills array

**Global Instance:** `export const dynamicI18n = new DynamicI18n()` (assigned to `window.dynamicI18n` in BaseLayout)

**Browser Navigation:** Listens for `popstate` event to sync language on back/forward

---

## Translation Structure

### Constants (`constants.ts`)

```typescript
const DEFAULT_LANGUAGE: AvailableLanguage = 'en';
const LANGUAGE_STORAGE_KEY = 'preferred-language' as const;
```

### Utility Functions (`utils.ts`)

| Function | Purpose |
|----------|---------|
| `detectUserLanguage()` | Priority: localStorage > navigator.language > HTML lang > default |
| `persistLanguage(lang)` | Saves to localStorage, updates `<html lang>` and `dir` |
| `formatDate(date, locale)` | Intl.DateTimeFormat with year/month/day |
| `formatNumber(number, locale)` | Intl.NumberFormat for locale formatting |
| `interpolate(template, params)` | Replaces `{{key}}` with values |
| `getTranslationKey(key, translations)` | lodash-es `get()` with fallback to key |

---

## Full Translation Keys

### Common Keys

| Key | English | Spanish |
|-----|---------|---------|
| `common.email` | damian@gaialogy.io | damian@gaialogy.io |
| `common.emailShort` | Contact | Contacto |
| `common.yearsExperience` | 9+ | 9+ |
| `common.fullStack` | Expert | Experto |
| `common.cloudArchitecture` | Cloud | Cloud |
| `common.yearsRemote` | 6+ | 6+ |
| `common.viewMyWork` | View My Work | Ver Mi Trabajo |
| `common.getInTouch` | Get In Touch | Contactar |
| `common.home` | Home | Inicio |
| `common.about` | About | Sobre Mi |
| `common.experience` | Experience | Experiencia |
| `common.projects` | Projects | Proyectos |
| `common.contact` | Contact | Contacto |
| `common.resumePdf` | Resume PDF | CV PDF |
| `common.lightMode` | Light Mode | Modo Claro |
| `common.darkMode` | Dark Mode | Modo Oscuro |
| `common.close` | Close | Cerrar |
| `common.menu` | Menu | Menu |
| `common.toggleTheme` | Toggle Theme | Cambiar Tema |
| `common.selectLanguage` | Select Language | Seleccionar Idioma |
| `common.readMore` | Read More | Leer Mas |
| `common.present` | Present | Presente |

### Hero Keys

| Key | English | Spanish |
|-----|---------|---------|
| `hero.title.part1` | I design and | Diseno y |
| `hero.title.part2` | performant sites | sitios performantes |
| `hero.title.part3` | for real business needs. | para necesidades empresariales reales. |
| `hero.description` | Senior Software Engineer... | Ingeniero de Software Senior... |

### Hero Dynamic Words

| Key | English | Spanish |
|-----|---------|---------|
| `hero.dynamicWords.build` | build | construyo |
| `hero.dynamicWords.create` | create | creo |
| `hero.dynamicWords.develop` | develop | desarrollo |
| `hero.dynamicWords.engineer` | engineer | optimizo |
| `hero.dynamicWords.craft` | craft | ejecuto |
| `hero.dynamicWords.architect` | architect | arquitecto |
| `hero.dynamicWords.code` | code | programo |
| `hero.dynamicWords.forge` | forge | implemento |
| `hero.dynamicWords.shape` | shape | estructuro |

### Experience Jobs (5 entries)

| Company | Position | Period |
|---------|----------|--------|
| Expian UK | Senior Software Engineer | 2023-2025 |
| HelviX | Senior Software Engineer | 2022-2023 |
| CEGID Invoice & Financing | Senior Software Engineer | 2020-2022 |
| Dafiti | Full-Stack Engineer | 2019 |
| Grupo Clarin-AGEA | Full-Stack Developer | 2016-2019 |

Each job includes: description, technologies array (used as Badge components)

### About Page Skills

```
JavaScript/TypeScript, React/Next.js, Vue.js/Nuxt, Node.js/Fastify,
AWS/Azure, PostgreSQL/MongoDB, Serverless/Lambda, Microservices, CI/CD
```

### Contact Keys

| Key | English | Spanish |
|-----|---------|---------|
| `contact.title` | Get In Touch | Contacto |
| `contact.emailMe` | Email Me | Enviarme un Email |
| `contact.linkedin` | LinkedIn | LinkedIn |
| `contact.scheduleCall` | Schedule a Call | Agendar una Llamada |
| `contact.bookMeeting` | Book a Meeting | Reservar Reunion |
| `contact.viewProfile` | View Profile | Ver Perfil |

### Footer Keys

| Key | English | Spanish |
|-----|---------|---------|
| `footer.copyright` | 2024 Damian Meroni. | 2024 Damian Meroni. |
| `footer.rights` | All rights reserved. | Todos los derechos reservados. |

---

## URL Routing Strategy

| Path | Language | Prefix |
|------|----------|--------|
| `/` | English | None (default) |
| `/about` | English | None |
| `/projects` | English | None |
| `/contact` | English | None |
| `/es` | Spanish | `/es` |
| `/es/about` | Spanish | `/es` |
| `/es/projects` | Spanish | `/es` |
| `/es/contact` | Spanish | `/es` |

Astro config: `prefixDefaultLocale: false` means English has no prefix.

### Hreflang Tags (in BaseLayout head)

```html
<link rel="alternate" hreflang="en" href="https://damianmeroni.dev/about" />
<link rel="alternate" hreflang="es" href="https://damianmeroni.dev/es/about" />
<link rel="alternate" hreflang="x-default" href="https://damianmeroni.dev/about" />
```

---

## DOM Integration Points

The DynamicI18n system uses data attributes to identify translatable elements:

| Attribute | Purpose | Update Method |
|-----------|---------|---------------|
| `[data-i18n]` | Text content translation | `textContent` or `placeholder` |
| `[data-i18n-html]` | HTML content translation | `innerHTML` |
| `[data-i18n-experience-cards]` | Experience card container | Full innerHTML rebuild |
| `[data-i18n-skills]` | Skills grid container | Full innerHTML rebuild |
| `[data-cv-download]` | CV download link | `href` attribute update |
| `[data-cv-download-floating]` | Floating CV button | `href` attribute update |
| `[data-i18n-title]` | Contact card title | `textContent` |
| `[data-i18n-description]` | Contact card description | `textContent` |
| `[data-i18n-link-text]` | Contact card link text | `textContent` |
| `[data-i18n-button-text]` | Contact card button text | `textContent` |
| `.nav-link` | Navigation links | `href` + `/es` prefix |
| `.language-code` | Language switcher display | `textContent` (EN/ES) |
| `.language-option` | Language dropdown options | `.active` class toggle |
| `.data-i18n-dynamic-words` | Dynamic text words | `data-words` + custom event |

---

## Adding a New Language

To add a new language (e.g., Italian):

1. **Create locale file:** `src/i18n/locales/it.ts` with all TranslationResource keys
2. **Create strategy:** `src/i18n/strategies/ItalianStrategy.ts` extending BaseLanguageStrategy
3. **Register in factory:** Add `it: ItalianStrategy` to LanguageStrategyFactory.strategies
4. **Update types:** Add `'it'` to AVAILABLE_LANGUAGES array
5. **Create pages:** Add `src/pages/it/` directory with all page variants
6. **Update Astro config:** Add `'it'` to `i18n.locales` array
7. **Update BaseLayout:** Add hreflang tag for Italian
8. **Update DynamicI18n:** Add Italian URL/CV path handling
9. **Add CV PDF:** `public/cv/international/Damian_Meroni_CV_IT_I.pdf`

The Strategy pattern makes this extensible without modifying existing language code.
