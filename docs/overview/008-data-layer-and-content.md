# 008 - Data Layer & Content

---

## Table of Contents

1. [Data Architecture](#data-architecture)
2. [Projects Data](#projects-data)
3. [Social Links Data](#social-links-data)
4. [Professional Experience (via i18n)](#professional-experience-via-i18n)
5. [Technical Skills (via i18n)](#technical-skills-via-i18n)
6. [Contact Information](#contact-information)
7. [Technology Logos](#technology-logos)
8. [CV / Resume Files](#cv--resume-files)
9. [Site Configuration](#site-configuration)
10. [Feature Flags](#feature-flags)

---

## Data Architecture

The project uses a **mixed data strategy:**

1. **Static TypeScript files** (`src/data/`) - Project entries and social links
2. **Translation files** (`src/i18n/locales/`) - Bilingual content (experience, skills, UI text)
3. **Configuration constants** (`src/config/`) - Site metadata, navigation, feature flags
4. **Public assets** (`public/`) - PDFs, images, favicons

There is no database, CMS, or API. All data is compiled at build time.

---

## Projects Data

### File: `src/data/projects.ts`

### Interface

```typescript
interface Project {
  id: string;           // Unique identifier
  title: string;        // Display title
  description: string;  // Short description
  image: string;        // Image path (/images/projects/...)
  tags: string[];       // Technology tags
  liveUrl?: string;     // Optional live demo URL
  githubUrl?: string;   // Optional GitHub repo URL
  featured: boolean;    // Show in featured section
  date: Date;           // Project date (for sorting)
}
```

### Current Entries (3 projects)

| ID | Title | Tags | Featured | Date |
|----|-------|------|----------|------|
| project-1 | E-commerce Platform | Next.js, TypeScript, Stripe, Tailwind CSS | Yes | 2023-10-01 |
| project-2 | Task Management App | React, Node.js, Socket.io, MongoDB | Yes | 2023-08-15 |
| project-3 | Weather Dashboard | Vue.js, OpenWeatherAPI, Mapbox, Chart.js | No | 2023-06-20 |

### Full Data

```typescript
const projects: Project[] = [
  {
    id: 'project-1',
    title: 'E-commerce Platform',
    description: 'Modern e-commerce with Next.js and Stripe integration...',
    image: '/images/projects/ecommerce.jpg',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'Tailwind CSS'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/username/project',
    featured: true,
    date: new Date('2023-10-01'),
  },
  {
    id: 'project-2',
    title: 'Task Management App',
    description: 'Collaborative task management with real-time updates...',
    image: '/images/projects/taskapp.jpg',
    tags: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    liveUrl: 'https://example.com',
    featured: true,
    date: new Date('2023-08-15'),
  },
  {
    id: 'project-3',
    title: 'Weather Dashboard',
    description: 'Beautiful weather dashboard with location-based forecasts...',
    image: '/images/projects/weather.jpg',
    tags: ['Vue.js', 'OpenWeatherAPI', 'Mapbox', 'Chart.js'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/username/weather',
    featured: false,
    date: new Date('2023-06-20'),
  },
];
```

**Note:** Projects section is currently feature-flagged OFF (`FEATURE_FLAGS.showProjects = false`). These appear to be placeholder/example entries.

### Usage

- **Home page (Projects.astro):** Filters `projects.filter(p => p.featured)`, renders in grid
- **Projects page:** Renders all projects in grid with scroll animations
- **ProjectCard.astro:** Receives single Project as prop

---

## Social Links Data

### File: `src/data/social.ts`

### Interface

```typescript
interface SocialLink {
  name: string;      // Display name
  url: string;       // Full URL or mailto:
  icon: string;      // Icon identifier
  ariaLabel: string; // Accessibility label
}
```

### Current Entries (3 links)

```typescript
const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/Merodami',
    icon: 'github',
    ariaLabel: 'Visit my GitHub profile',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/dmeroni',
    icon: 'linkedin',
    ariaLabel: 'Connect on LinkedIn',
  },
  {
    name: 'Email',
    url: 'mailto:damian@gaialogy.io',
    icon: 'email',
    ariaLabel: 'Send me an email',
  },
];
```

### Usage

- **Footer.astro:** Renders social icons with links
- **Contact.astro:** References email for contact card

---

## Professional Experience (via i18n)

Experience data lives in translations for bilingual support.

### Translation Key: `experience.jobs`

**5 positions spanning 2016-2025:**

#### 1. Expian UK (2023-2025)
- **Position:** Senior Software Engineer
- **Technologies:** TypeScript, Node.js, React, AWS, PostgreSQL, Redis, Docker, Microservices
- **Description:** Led development of microservices architecture for financial technology platform

#### 2. HelviX (2022-2023)
- **Position:** Senior Software Engineer
- **Technologies:** TypeScript, Vue.js, Node.js, AWS, MongoDB, Serverless, Lambda
- **Description:** Architected serverless solutions for healthcare data processing

#### 3. CEGID Invoice & Financing (2020-2022)
- **Position:** Senior Software Engineer
- **Technologies:** TypeScript, React, Node.js, Azure, PostgreSQL, Docker, CI/CD
- **Description:** Built enterprise invoicing and financing platform

#### 4. Dafiti (2019)
- **Position:** Full-Stack Engineer
- **Technologies:** JavaScript, React, Node.js, MongoDB, Express
- **Description:** E-commerce platform development for Latin American market

#### 5. Grupo Clarin-AGEA (2016-2019)
- **Position:** Full-Stack Developer
- **Technologies:** JavaScript, Angular, Node.js, PostgreSQL, Express
- **Description:** Media and publishing platform development

### Usage

- **Experience.astro:** Renders from `t('experience.jobs')` as Card components
- **DynamicI18n:** `updateExperienceCards()` rebuilds cards on language switch
- Each job renders: company, position, dates, description, technology badges

---

## Technical Skills (via i18n)

### Translation Key: `aboutPage.skills`

**9 skill categories:**

| # | English | Spanish |
|---|---------|---------|
| 1 | JavaScript/TypeScript | JavaScript/TypeScript |
| 2 | React/Next.js | React/Next.js |
| 3 | Vue.js/Nuxt | Vue.js/Nuxt |
| 4 | Node.js/Fastify | Node.js/Fastify |
| 5 | AWS/Azure | AWS/Azure |
| 6 | PostgreSQL/MongoDB | PostgreSQL/MongoDB |
| 7 | Serverless/Lambda | Serverless/Lambda |
| 8 | Microservices | Microservicios |
| 9 | CI/CD | CI/CD |

### Usage

- **AboutPage.astro:** Renders in 3-column grid (1-col mobile, 2-col tablet)
- **DynamicI18n:** `updateSkillsGrid()` rebuilds on language switch

---

## Contact Information

### Direct Contact Data

| Method | Value | Source |
|--------|-------|--------|
| Email | damian@gaialogy.io | translations (`common.email`) |
| LinkedIn | linkedin.com/in/dmeroni | `social.ts` |
| Calendly | (booking link) | Contact.astro (hardcoded) |

### Contact Section Content (i18n)

| Key | English | Spanish |
|-----|---------|---------|
| `contact.title` | Get In Touch | Contacto |
| `contact.subtitle` | I'm always interested... | Siempre estoy interesado... |
| `contact.emailMe` | Email Me | Enviarme un Email |
| `contact.emailDescription` | Drop me a line... | Enviame un mensaje... |
| `contact.linkedin` | LinkedIn | LinkedIn |
| `contact.linkedinDescription` | Let's connect... | Conectemos... |
| `contact.viewProfile` | View Profile | Ver Perfil |
| `contact.scheduleCall` | Schedule a Call | Agendar una Llamada |
| `contact.scheduleDescription` | Book a meeting... | Agenda una reunion... |
| `contact.bookMeeting` | Book a Meeting | Reservar Reunion |
| `contact.available` | Available for remote opportunities | Disponible para oportunidades remotas |
| `contact.respondTime` | I respond within 24h | Respondo en 24h |

---

## Technology Logos

### Source: `src/assets/tech-logos/`

24 SVG files used throughout the site (Hero background, About page, Experience badges):

| Technology | File | Size | Brand Color |
|-----------|------|------|-------------|
| Angular | angular.svg | 298B | #DD0031 |
| Astro | astro.svg | 779B | #FF5D01 |
| AWS | aws.svg | 3.1KB | #FF9900 |
| Cypress | cypress.svg | 1.5KB | #17202C |
| Docker | docker.svg | 1.7KB | #2496ED |
| Express | express.svg | 773B | #000000 |
| Fastify | fastify.svg | 1.1KB | #000000 |
| Git | git.svg | 702B | #F05032 |
| GitHub | github.svg | 822B | #181717 |
| JavaScript | javascript.svg | 974B | #F7DF1E |
| Jest | jest.svg | 2.6KB | #C21325 |
| MongoDB | mongodb.svg | 527B | #47A248 |
| Next.js | nextjs.svg | 322B | #000000 |
| Node.js | nodejs.svg | 1.6KB | #339933 |
| Playwright | playwright.svg | 1.0KB | #2EAD33 |
| PostgreSQL | postgresql.svg | 5.1KB | #4169E1 |
| React | react.svg | 2.9KB | #61DAFB |
| Redis | redis.svg | 1.1KB | #DC382D |
| Redux | redux.svg | 1.4KB | #764ABC |
| Svelte | svelte.svg | 1.8KB | #FF3E00 |
| Tailwind CSS | tailwindcss.svg | 602B | #06B6D4 |
| TypeScript | typescript.svg | 1.3KB | #3178C6 |
| Vitest | vitest.svg | 1.4KB | #6E9F18 |
| Vue.js | vue.svg | 202B | #4FC08D |

### Usage Contexts

1. **FloatingTechLogos.astro:** All 24 logos as floating animated background
2. **StaticTechLogos.astro:** 21 logos positioned around hero section
3. **TechLogo.astro:** Individual logo rendering with brand color filters
4. **Experience.astro:** Technology badges per job entry

---

## CV / Resume Files

### Location: `public/cv/international/`

| File | Size | Language |
|------|------|----------|
| `Damian_Meroni_CV_EN_I.pdf` | 170KB | English |
| `Damian_Meroni_CV_ES_I.pdf` | 174KB | Spanish |

### Download Points

1. **Hero.astro:** CV download link with document icon
2. **FloatingCVButton.astro:** Fixed floating button (appears after scrolling)

### Language-Aware Paths

```
English: /cv/international/Damian_Meroni_CV_EN_I.pdf
Spanish: /cv/international/Damian_Meroni_CV_ES_I.pdf
```

Updated dynamically by `DynamicI18n.updateCVDownloadButton()` on language switch.

---

## Site Configuration

### File: `src/config/constants.ts`

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
```

**Used by:** SEOTags.astro (default meta values), BaseLayout.astro (page titles)

### Navigation Items

```typescript
const NAVIGATION_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];
```

**Used by:** Navigation.astro, MobileMenu.astro (filtered by feature flags)

---

## Feature Flags

### File: `src/config/constants.ts`

```typescript
const FEATURE_FLAGS = {
  showProjects: false,
};
```

### Impact When `showProjects = false`:

| Component | Behavior |
|-----------|----------|
| Navigation.astro | Projects link hidden from nav |
| MobileMenu.astro | Projects link hidden from mobile menu |
| Hero.astro | "View My Work" button hidden |
| index.astro | Projects section not rendered |
| projects.astro | Page redirects to home |

### Impact When `showProjects = true`:

All project-related UI becomes visible, projects page accessible, navigation includes Projects link.

---

## Data Flow Diagram

```
Build Time:
  src/data/projects.ts ──> ProjectCard.astro ──> HTML
  src/data/social.ts ──> Footer.astro ──> HTML
  src/i18n/locales/en.ts ──> useAstroI18n() ──> All components ──> HTML
  src/i18n/locales/es.ts ──> useAstroI18n() ──> All /es/ components ──> HTML
  src/config/constants.ts ──> SEOTags.astro ──> HTML head

Client-Side:
  DynamicI18n.switchLanguage()
    ├──> LanguageStrategyFactory.createStrategy()
    ├──> strategy.getTranslations()
    ├──> updatePageContent()
    │    ├──> [data-i18n] elements
    │    ├──> Experience cards (rebuild)
    │    ├──> Skills grid (rebuild)
    │    ├──> Navigation links
    │    ├──> CV download links
    │    ├──> Contact cards
    │    └──> Dynamic text words
    └──> history.pushState() (URL update)
```
