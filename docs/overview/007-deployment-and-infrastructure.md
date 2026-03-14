# 007 - Deployment & Infrastructure

---

## Table of Contents

1. [Deployment Architecture](#deployment-architecture)
2. [Cloudflare Workers Configuration](#cloudflare-workers-configuration)
3. [CI/CD Pipelines](#cicd-pipelines)
4. [Build Process](#build-process)
5. [Domain & Routing](#domain--routing)
6. [Static Assets](#static-assets)
7. [SEO Infrastructure](#seo-infrastructure)
8. [PWA Manifest](#pwa-manifest)
9. [Development Environment](#development-environment)
10. [VS Code Configuration](#vs-code-configuration)

---

## Deployment Architecture

```
Developer -> git push main
                |
                v
        GitHub Actions (pages.yml)
                |
                ├── Checkout code
                ├── Install deps (yarn --frozen-lockfile)
                ├── Lint (eslint)
                ├── Build (astro check && astro build)
                └── Deploy (wrangler deploy)
                        |
                        v
               Cloudflare Workers Edge
                        |
                        v
            Static Assets (./dist)
                        |
                        v
          damianmeroni.dev (global CDN)
```

---

## Cloudflare Workers Configuration

### `wrangler.toml`

```toml
name = "personal-website"
compatibility_date = "2024-01-01"

[assets]
directory = "./dist"

[[routes]]
pattern = "damianmeroni.dev/*"
zone_name = "damianmeroni.dev"
```

**Key Details:**
- **Platform:** Cloudflare Workers (edge computing)
- **Asset Serving:** Static files from `./dist` directory
- **Compatibility Date:** 2024-01-01 (determines which Workers runtime features are available)
- **Route Pattern:** All requests to `damianmeroni.dev/*` routed to this worker
- **Zone:** Cloudflare DNS zone for `damianmeroni.dev`

**Advantages:**
- Global edge deployment (200+ data centers)
- Zero cold starts for static assets
- Free tier includes 100K requests/day
- Built-in DDoS protection
- Automatic HTTPS

---

## CI/CD Pipelines

### Pipeline 1: CI (`ci.yml`)

**Purpose:** Test and validate on every push/PR

**Triggers:**
- Push to `main`, `dev` branches
- Pull requests targeting `main`

**Job:** `test` on `ubuntu-latest`

**Steps:**
1. `actions/checkout@v4` - Clone repository
2. `actions/setup-node@v4` - Node 20 (active LTS)
3. `corepack enable` - Enable Yarn
4. `yarn install --frozen-lockfile` - Reproducible install
5. `yarn lint` - ESLint validation
6. `yarn astro check` - TypeScript checking
7. `yarn test:coverage` - Full test suite with coverage
8. `yarn build` - Production build

**Gate:** All steps must pass for PR merge

---

### Pipeline 2: Build & Deploy (`pages.yml`)

**Purpose:** Build and deploy to Cloudflare Workers

**Triggers:**
- Push to `main` (production deploy)
- Pull requests to `main` (preview)

**Concurrency:**
```yaml
concurrency:
  group: pages-${{ github.head_ref || github.ref }}
  cancel-in-progress: true
```
Cancels superseded runs (e.g., rapid pushes)

**Permissions:**
- `contents: read` - Read repository
- `deployments: write` - Create deployment records

**Job:** `Build & Deploy` on `ubuntu-latest`

**Steps:**
1. `actions/checkout@v4`
2. `actions/setup-node@v4` - Node 20
3. `corepack enable`
4. `yarn install --frozen-lockfile`
5. `yarn lint`
6. ~~`yarn test --if-present`~~ (commented out)
7. `yarn build` - Produces `./dist`
8. `npx wrangler@latest deploy` - Deploy to Cloudflare

**Required Secrets:**
| Secret | Purpose |
|--------|---------|
| `CLOUDFLARE_API_TOKEN` | Authentication for Wrangler CLI |
| `CLOUDFLARE_ACCOUNT_ID` | Target Cloudflare account |

---

## Build Process

### Build Script (`build.sh`)

```bash
#!/bin/bash
npm install
npm run build
```

Simple fallback build script (CI pipelines use more detailed steps).

### Astro Build Pipeline

```
1. astro check          # TypeScript validation
2. astro build          # Static site generation
   ├── Pages rendered to HTML
   ├── CSS code-split by route
   ├── JS bundled with Rollup
   ├── Images optimized with Sharp
   └── Output to ./dist/
3. astro-compress       # Post-build compression
   ├── CSS minified
   ├── HTML minified (preserving attribute quotes)
   ├── JS minified
   ├── SVG optimized
   └── Images compressed
```

### Build Output Structure

```
dist/
├── index.html              # English home
├── about/index.html        # English about
├── contact/index.html      # English contact
├── projects/index.html     # English projects
├── 404.html                # Error page
├── es/
│   ├── index.html          # Spanish home
│   ├── about/index.html    # Spanish about
│   ├── contact/index.html  # Spanish contact
│   └── projects/index.html # Spanish projects
├── assets/
│   ├── [hash].css          # Hashed CSS bundles
│   ├── [hash].js           # Hashed JS bundles
│   └── chunks/
│       └── [hash].js       # Code-split chunks
├── cv/international/
│   ├── Damian_Meroni_CV_EN_I.pdf
│   └── Damian_Meroni_CV_ES_I.pdf
├── images/
│   ├── profile.jpeg
│   └── profile-64.jpeg
├── favicon.ico
├── favicon-16x16.png
├── favicon-32x32.png
├── apple-touch-icon.png
├── android-chrome-*.png
├── robots.txt
├── site.webmanifest
└── sitemap-index.xml
```

### Asset Optimization

| Optimization | Configuration |
|-------------|---------------|
| CSS code splitting | `cssCodeSplit: true` |
| Small asset inlining | `assetsInlineLimit: 4096` (< 4KB inlined) |
| Hash-based filenames | `[hash][extname]` for cache busting |
| Manual chunks | Critical CSS separated |
| HTML compression | Attribute quotes preserved |
| Image optimization | Sharp service (responsive, WebP) |
| SVG optimization | Via astro-compress |
| Brotli compression | Cloudflare edge (automatic) |

---

## Domain & Routing

### Primary Domain

- **Production:** `https://damianmeroni.dev`
- **DNS:** Managed via Cloudflare
- **SSL:** Automatic via Cloudflare (edge certificates)

### URL Structure

| URL Pattern | Content |
|-------------|---------|
| `/` | English home |
| `/about` | English about |
| `/contact` | English contact |
| `/projects` | English projects |
| `/es` | Spanish home |
| `/es/about` | Spanish about |
| `/es/contact` | Spanish contact |
| `/es/projects` | Spanish projects |
| `/404` | Error page |

### Routing Strategy

- English (default): No prefix
- Spanish: `/es` prefix
- 404: Custom error page
- Astro config: `prefixDefaultLocale: false`

---

## Static Assets

### Public Directory (`public/`)

| Asset | Size | Purpose |
|-------|------|---------|
| `favicon.ico` | 15KB | Traditional favicon |
| `favicon-16x16.png` | 1.3KB | Small favicon |
| `favicon-32x32.png` | 2.4KB | Standard favicon |
| `apple-touch-icon.png` | 38KB | iOS home screen |
| `android-chrome-192x192.png` | 42KB | Android icon |
| `android-chrome-512x512.png` | 187KB | Android splash |
| `profile.jpeg` | - | Full-size profile photo |
| `profile-64.jpeg` | - | 64x64 thumbnail |
| `Damian_Meroni_CV_EN_I.pdf` | 170KB | English resume |
| `Damian_Meroni_CV_ES_I.pdf` | 174KB | Spanish resume |
| `robots.txt` | - | SEO crawl rules |
| `site.webmanifest` | - | PWA manifest |

### Source Assets (`src/assets/`)

24 SVG technology logos (202B - 5.1KB each):
angular, astro, aws, cypress, docker, express, fastify, git, github, javascript, jest, mongodb, nextjs, nodejs, playwright, postgresql, react, redis, redux, svelte, tailwindcss, typescript, vitest, vue

---

## SEO Infrastructure

### Robots.txt (`public/robots.txt`)

Standard crawl rules for search engines.

### Sitemap

Auto-generated by `@astrojs/sitemap`:
- Filters out 404 page
- Change frequency: weekly
- Priority: 0.8
- Last modified: build date
- Output: `sitemap-index.xml`

### Meta Tags (via SEOTags.astro)

- charset, viewport, description
- Canonical URLs
- Conditional noindex/nofollow
- Open Graph (Facebook/LinkedIn)
- Twitter Card (summary_large_image)
- Favicon suite
- Page title

### Hreflang Tags (via BaseLayout.astro)

```html
<link rel="alternate" hreflang="en" href="https://damianmeroni.dev{path}" />
<link rel="alternate" hreflang="es" href="https://damianmeroni.dev/es{path}" />
<link rel="alternate" hreflang="x-default" href="https://damianmeroni.dev{path}" />
```

---

## PWA Manifest

### `public/site.webmanifest`

```json
{
  "name": "Damian's Portfolio",
  "short_name": "Portfolio",
  "icons": [
    { "src": "/android-chrome-192x192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/android-chrome-512x512.png", "sizes": "512x512", "type": "image/png" }
  ],
  "theme_color": "#1e293b",
  "background_color": "#0f172a",
  "display": "standalone"
}
```

- Theme color: Slate 800 (#1e293b)
- Background: Slate 900 (#0f172a)
- Display: Standalone (app-like experience)

---

## Development Environment

### Node Version

```
.nvmrc: 20
.node-version: 20
```

Both files specify Node 20 LTS for compatibility with nvm, fnm, and other version managers.

### Package Manager

**Yarn 4.9.1** via Corepack:
```yaml
# .yarnrc.yml
nodeLinker: node-modules
```

Uses traditional `node_modules` directory (not Plug'n'Play) for tool compatibility.

### Engine Requirements (`package.json`)

```json
{
  "engines": {
    "node": ">=20.0.0",
    "npm": ">=10.0.0"
  }
}
```

### Local Development

```bash
# Start dev server
yarn dev          # http://localhost:3000

# Preview production build
yarn build && yarn preview   # http://localhost:3001

# Run tests
yarn test         # All tests
yarn test:ui      # Interactive UI
yarn test:watch   # Watch mode

# Quality checks
yarn quality:all  # Types + deps + duplicates + unused
```

---

## VS Code Configuration

### `.vscode/settings.json`

```json
{
  "editor.formatOnSave": true,
  "[astro]": {
    "editor.defaultFormatter": "astro-build.astro-vscode",
    "editor.formatOnSave": true
  },
  "prettier.documentSelectors": ["**/*.astro"],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
```

**Features:**
- Format on save (global + Astro files)
- Astro files: use astro-vscode extension
- Prettier: handles Astro file formatting
- ESLint: auto-fix on save (explicit mode)
- TypeScript: use workspace version (not global)

### Recommended Extensions

- `astro-build.astro-vscode` - Astro language support
- ESLint extension (for fix-on-save)
- Prettier extension (for formatting)
