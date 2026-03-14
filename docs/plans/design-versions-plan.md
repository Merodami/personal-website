# Plan 001: 10 Modern Design Versions of Portfolio Website

**Created:** 2026-03-14
**Status:** In Progress

## Context

Rebuild the existing portfolio website (damianmeroni.dev) in 10 completely different modern design styles. Each version applies a distinct 2025-2026 design philosophy while preserving all functionality: i18n (EN/ES), theme switching, SEO, accessibility, Cloudflare deployment, and test coverage.

The 10 skills are defined in `.claude/skills/build-*.md` and the full project context lives in `docs/overview/000-COMPLETE-PROJECT-OVERVIEW.md`.

## Scope

### In Scope
- 10 visually distinct website versions, each on its own git branch
- All versions preserve: i18n, theme, SEO, accessibility, data, navigation
- Each version rebuilds: styles, component layouts, animations, visual effects
- Documentation of design decisions per version
- Lighthouse 90+ on all versions

### Out of Scope
- Backend changes, API integrations (except Version 10 AI chat, which is optional)
- New pages beyond the existing set (Home, About, Projects, Contact, 404)
- Content changes (same translations, same data)
- Deployment of all 10 versions (only the chosen winner gets deployed)

## Approach

Each version is built on an isolated git branch (`design/v{N}-{name}`). The master skill `/build-portfolio-version` orchestrates the process. Each version follows the same steps: read context, create design system, rebuild components, verify build, document.

## Versions

| # | Branch | Skill | Design Approach |
|---|--------|-------|-----------------|
| 1 | `design/v1-liquid-glass` | `/build-liquid-glass` | Liquid Glass / Dark Glassmorphism |
| 2 | `design/v2-kinetic-typography` | `/build-kinetic-typography` | Kinetic Typography + Scroll Storytelling |
| 3 | `design/v3-bento-grid` | `/build-bento-grid` | Bento Grid Modular Layout |
| 4 | `design/v4-3d-immersive` | `/build-3d-immersive` | 3D Immersive / WebGL Experience |
| 5 | `design/v5-neobrutalism` | `/build-neobrutalism` | Neobrutalism / Raw Digital |
| 6 | `design/v6-organic-fluid` | `/build-organic-fluid` | Organic / Fluid Design |
| 7 | `design/v7-retro-futurism` | `/build-retro-futurism` | Retro-Futurism / Y2K Revival |
| 8 | `design/v8-editorial-magazine` | `/build-editorial-magazine` | Editorial / Magazine Layout |
| 9 | `design/v9-minimalist-motion` | `/build-minimalist-motion` | Minimalist Motion / Subtle Interaction |
| 10 | `design/v10-generative-adaptive` | `/build-generative-adaptive` | AI-Powered Adaptive / Generative UI |

## Recommended Build Order

Build simplest versions first to establish patterns, then tackle complex ones:

1. **v5 Neobrutalism** (CSS-only, no animation libraries, fastest to build)
2. **v9 Minimalist Motion** (CSS + light JS, proven patterns)
3. **v3 Bento Grid** (CSS Grid focus, moderate complexity)
4. **v1 Liquid Glass** (CSS effects + blur, moderate complexity)
5. **v8 Editorial Magazine** (Typography + layout focus, moderate)
6. **v6 Organic Fluid** (SVG + CSS shapes, moderate)
7. **v7 Retro-Futurism** (CSS effects + creative styling, moderate)
8. **v2 Kinetic Typography** (Scroll animations, medium-high)
9. **v4 3D Immersive** (Three.js, high complexity)
10. **v10 Generative Adaptive** (AI + Canvas, highest complexity)

## Acceptance Criteria

- [ ] All 10 versions build without errors (`yarn build`)
- [ ] All versions pass existing tests (`yarn test`)
- [ ] All versions score Lighthouse 90+ Performance
- [ ] All versions have working i18n (EN/ES switching)
- [ ] All versions have working theme toggle (dark/light)
- [ ] All versions are mobile-responsive (320px to 1920px)
- [ ] All versions are accessible (semantic HTML, ARIA, keyboard nav)
- [ ] Each version is visually distinct from every other version
- [ ] Design decisions documented per version

## Quality Assurance

### Per-Version Testing
- `yarn lint` + `astro check` must pass
- `yarn test:coverage` must pass (maintain existing coverage baseline)
- `yarn build` must produce valid static output

### Performance Metrics
- Lighthouse Performance: 90+ (85+ for v4 3D, v10 AI)
- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- Bundle size: < 200KB gzip per version

### Browser Testing
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- iOS Safari 16+
- Android Chrome

### Accessibility
- Lighthouse Accessibility: 95+
- Keyboard navigation functional
- `prefers-reduced-motion` respected
- WCAG AA color contrast (4.5:1 normal, 3:1 large text)

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Version 4 (3D/WebGL) may be too heavy for mobile | Provide 2D fallback on mobile devices |
| Version 10 (AI) requires API keys | Make AI features optional with graceful fallback |
| Some designs may conflict with Astro SSG | Use client-side JS only for interactive effects |
| Performance regression from heavy animations | Profile and optimize; use CSS-only where possible |
| 10 branches may diverge from main | Rebase from main before starting each version |
| Bundle size explosion from new libraries | Set 200KB gzip budget per version; audit before merge |
| Existing tests may break from layout changes | Run full test suite per branch; fix or adapt tests |
| Accessibility failures from design choices | Run axe-core audit per version; v7 scanlines and v2 motion need extra care |
| CLS from scroll-driven animations | Measure CLS separately; ensure no layout shifts during scroll animations |
| Mobile rendering of complex effects | Test on real iOS Safari and Android Chrome; provide fallbacks |

## Files Likely Affected (Per Version)

All versions modify the same set of files:
- `src/styles/**` - Complete style overhaul
- `src/components/**` - Component layout/structure changes
- `src/layouts/BaseLayout.astro` - Layout-level changes
- `tailwind.config.js` - Theme/color changes
- `src/config/theme.ts` - Theme variant adjustments
- New files: version-specific CSS, animation utilities, SVG assets
