# 🚀 Damian Meroni - Personal Website

<div align="center">

[![Live Site](https://img.shields.io/badge/🌐_Live_Site-damianmeroni.dev-8B5CF6?style=for-the-badge)](https://damianmeroni.dev)

[![Build Status](https://img.shields.io/github/actions/workflow/status/Merodami/personal-website/pages.yml?branch=main&style=flat-square&label=Build)](https://github.com/Merodami/personal-website/actions)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-blue.svg?style=flat-square)](https://www.typescriptlang.org/)
[![Astro](https://img.shields.io/badge/Astro-5.12+-orange.svg?style=flat-square)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1+-38bdf8.svg?style=flat-square)](https://tailwindcss.com/)
[![Tests](https://img.shields.io/badge/Tests-Passing-green.svg?style=flat-square)](https://github.com/Merodami/personal-website/actions)
[![License](https://img.shields.io/badge/License-Proprietary-red.svg?style=flat-square)](#-license)

<br>

<img src="https://img.shields.io/badge/Performance-99-green?style=for-the-badge&logo=lighthouse&logoColor=white" alt="Lighthouse Performance">
<img src="https://img.shields.io/badge/Accessibility-100-green?style=for-the-badge&logo=lighthouse&logoColor=white" alt="Lighthouse Accessibility">
<img src="https://img.shields.io/badge/Best%20Practices-100-green?style=for-the-badge&logo=lighthouse&logoColor=white" alt="Lighthouse Best Practices">
<img src="https://img.shields.io/badge/SEO-100-green?style=for-the-badge&logo=lighthouse&logoColor=white" alt="Lighthouse SEO">

<br>
<br>

> A blazing-fast, modern personal website showcasing my work as a Senior Software Engineer. Built with cutting-edge technologies and optimized for exceptional performance, accessibility, and user experience.

</div>

## 📊 Performance Metrics

<div align="center">

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| **Overall Performance** | 99/100 | 90+ | ✅ Exceptional |
| **First Contentful Paint** | 1.1s | < 1.8s | ✅ Fast |
| **Largest Contentful Paint** | 2.3s | < 2.5s | ✅ Good |
| **Total Blocking Time** | 0ms | < 200ms | ✅ Excellent |
| **Cumulative Layout Shift** | 0.017 | < 0.1 | ✅ Excellent |
| **Speed Index** | 1.1s | < 3.4s | ✅ Fast |

[View Live Lighthouse Report](https://lighthouse-metrics.com/lighthouse/checks/c16824b5-61cf-4b74-a110-b38f6d809cb0) 

</div>

## ✨ Key Features

### 🎯 Performance & Optimization
- **⚡ Lightning Fast** - 99/100 Lighthouse score with optimized critical rendering path
- **🚀 Edge Deployment** - Global CDN with < 50ms latency worldwide
- **📦 Optimized Assets** - WebP/AVIF images, Brotli compression, code splitting
- **🔄 Progressive Enhancement** - Works without JavaScript, enhanced with it

### 🎨 Design & UX
- **🌙 Dark Mode First** - Elegant dark theme as default with smooth transitions
- **📱 Fully Responsive** - Mobile-first design tested on 20+ devices
- **✨ Micro-interactions** - Subtle animations and hover effects
- **🎯 Accessibility** - WCAG 2.1 AA compliant with screen reader optimization

### 🛠️ Developer Experience
- **🧪 Comprehensive Testing** - Unit & integration tests with Vitest
- **🔍 Type Safety** - 100% TypeScript with strict mode
- **🚨 Code Quality** - ESLint, Prettier, and Husky pre-commit hooks
- **📊 State Management** - Zustand with Redux DevTools integration

## 🛠️ Tech Stack

<div align="center">

| Category | Technologies |
|----------|-------------|
| **Frontend** | ![Astro](https://img.shields.io/badge/Astro-FF5D01?style=flat-square&logo=astro&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) |
| **State & Data** | ![Zustand](https://img.shields.io/badge/Zustand-000000?style=flat-square&logo=react&logoColor=white) ![Sharp](https://img.shields.io/badge/Sharp-99CC00?style=flat-square&logo=sharp&logoColor=white) |
| **Testing** | ![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=flat-square&logo=vitest&logoColor=white) ![Testing Library](https://img.shields.io/badge/Testing_Library-E33332?style=flat-square&logo=testing-library&logoColor=white) |
| **DevOps** | ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat-square&logo=github-actions&logoColor=white) ![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=flat-square&logo=cloudflare&logoColor=white) |
| **Tools** | ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=prettier&logoColor=white) ![Yarn](https://img.shields.io/badge/Yarn-2C8EBB?style=flat-square&logo=yarn&logoColor=white) |

</div>

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20+ LTS
- **Yarn** 4.9.1 (via Corepack)

### Installation

```bash
# Clone the repository
git clone https://github.com/Merodami/personal-website.git
cd personal-website

# Enable Corepack for Yarn
corepack enable

# Install dependencies
yarn install

# Start development server
yarn dev
```

Visit `http://localhost:3000` to see the site in action!

## 📜 Available Scripts

```bash
# Development
yarn dev              # Start dev server (port 3000)
yarn preview          # Preview production build (port 3001)

# Building
yarn build            # Type check + build for production
yarn astro check      # TypeScript diagnostics

# Code Quality
yarn lint             # Run ESLint
yarn format           # Format with Prettier
yarn test             # Run tests with Vitest
yarn test:ui          # Open Vitest UI
yarn test:coverage    # Generate coverage report
yarn test:watch       # Run tests in watch mode

# Performance
yarn open-lighthouse  # Generate Lighthouse report

# Deployment
yarn deploy           # Deploy to Cloudflare Pages
```

## 🧪 Testing

The project uses **Vitest** for a modern testing experience:

```bash
# Run all tests
yarn test

# Run with coverage
yarn test:coverage

# Interactive UI
yarn test:ui
```

### Test Structure
```
tests/
├── unit/           # Unit tests for utilities and functions
├── integration/    # Integration tests for workflows
└── setup.ts        # Test configuration and mocks
```

### Current Test Coverage
- ✅ Theme utilities (100% coverage)
- ✅ Theme persistence integration
- ✅ localStorage mock implementation
- ✅ DOM manipulation tests

## 🏗️ Project Architecture

```
personal-website/
├── .github/workflows/    # CI/CD pipelines
├── functions/           # Edge functions (Cloudflare Workers)
├── public/             # Static assets
├── src/
│   ├── assets/         # Images and icons
│   ├── components/     # Reusable UI components
│   │   ├── common/     # Shared components
│   │   ├── layout/     # Layout components
│   │   ├── sections/   # Page sections
│   │   └── seo/        # SEO components
│   ├── config/         # App configuration
│   ├── data/           # Static data
│   ├── layouts/        # Page layouts
│   ├── pages/          # Route pages
│   ├── scripts/        # Utility scripts
│   ├── stores/         # State management
│   ├── styles/         # Global styles
│   ├── types/          # TypeScript types
│   └── utils/          # Helper functions
├── tests/              # Test files
├── CLAUDE.md           # Development standards
└── README.md           # You are here! 📍
```

## 🎨 Design System

### Color Palette
- **Dark Mode**: `#0a0a0a` background with purple accents
- **Light Mode**: `#ffffff` background with purple accents
- **Accent**: Purple gradient `#8B5CF6` → `#A855F7`

### Typography
- **Primary**: Inter Variable Font
- **Fallback**: System font stack
- **Responsive**: Fluid typography with `clamp()`

### Breakpoints
```css
/* Mobile First */
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Desktops */
xl: 1280px  /* Large screens */
2xl: 1536px /* Extra large */
```

## 🌍 Features in Detail

### 🌐 Internationalization
- Automatic language detection via CloudFlare
- Spanish (ES) and English (EN) support
- SEO-friendly URL structure
- Persistent language preference

### 🔐 Security
- Content Security Policy (CSP)
- HTTPS enforcement
- No inline scripts
- Regular dependency audits
- Edge security via Cloudflare

### ♿ Accessibility
- WCAG 2.1 AA compliant
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation
- Screen reader tested

### 📈 SEO Optimization
- Dynamic meta tags
- JSON-LD structured data
- Auto-generated sitemap
- Optimized robots.txt
- Open Graph & Twitter cards

## 🚀 Deployment

The site auto-deploys to Cloudflare Pages on every push to `main`:

### Build Configuration
- **Framework**: Astro
- **Build Command**: `yarn build`
- **Output Directory**: `dist`
- **Node Version**: 20

### Environment Variables
```env
# Required for deployment
CLOUDFLARE_API_TOKEN=your_token
CLOUDFLARE_ACCOUNT_ID=your_account_id
```

## 📊 Continuous Integration

Every commit triggers:
1. **Code Quality Checks** - ESLint & Prettier
2. **Type Checking** - TypeScript strict mode
3. **Test Suite** - All unit & integration tests
4. **Build Verification** - Production build test
5. **Deployment** - Auto-deploy to Cloudflare

## 🤝 Contributing

While this is a personal project, I welcome:
- 🐛 Bug reports
- 💡 Feature suggestions
- 🔧 Performance improvements

Please open an issue or reach out at hello@damianmeroni.dev

## 📄 License

© 2024 Damian Meroni. All rights reserved.

This project is proprietary and not licensed for public use, modification, or distribution.

---

<div align="center">

**Built with ❤️ by [Damian Meroni](https://damianmeroni.dev)**

*Senior Software Engineer • Full-Stack Developer • Performance Enthusiast*

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=flat-square&logo=linkedin)](https://linkedin.com/in/damianmeroni)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=flat-square&logo=github)](https://github.com/Merodami)
[![Email](https://img.shields.io/badge/Email-Contact-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:hello@damianmeroni.dev)

</div>