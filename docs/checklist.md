# Project Checklist

## 10 Modern Design Versions (Plan 001)

**Started:** 2026-03-14
**Status:** In Progress

---

### Pre-Flight (Before Starting Any Version)

- [x] Research top 10 modern frontend design approaches (2025-2026)
- [x] Create 10 skill files in `.claude/skills/`
- [x] Create master orchestrator skill (`build-portfolio-version`)
- [x] Document full project overview (`docs/overview/000-COMPLETE-PROJECT-OVERVIEW.md`)
- [x] Create execution plan (`docs/plans/001-10-design-versions.md`)
- [x] Create this checklist (`docs/checklist.md`)
- [ ] Ensure `main` branch is clean and stable before branching
- [ ] Run full test suite on main (`yarn test:coverage`) to establish baseline
- [ ] Document current Lighthouse scores on main for comparison
- [ ] Verify all quality checks pass (`yarn quality:all`)

---

### Version 1: Liquid Glass / Dark Glassmorphism

**Branch:** `design/v1-liquid-glass` | **Skill:** `/build-liquid-glass`

#### Design System
- [ ] Create glass CSS custom properties (blur, glass-bg, glass-border, glow colors)
- [ ] Implement SVG feTurbulence noise texture filter
- [ ] Create glass panel utility classes (.glass-panel, .glass-card, .glass-nav)
- [ ] Build animated gradient background keyframes
- [ ] Define glow effect utilities

#### Components
- [ ] Header: floating glass navbar with blur, luminous hover
- [ ] Hero: animated mesh gradient background, glass text panel, glass tech bubbles
- [ ] About: glass card with layered depth, stats in glass cells
- [ ] Experience: timeline with glass cards, glowing dot indicators
- [ ] Projects: bento-style glass grid with hover glow
- [ ] Contact: glass contact cards with animated border shimmer
- [ ] Footer: glass panel with gradient border top
- [ ] FloatingCVButton: glass style with glow pulse

#### Verification
- [ ] `yarn build` passes
- [ ] `yarn test` passes
- [ ] i18n switching works (EN/ES)
- [ ] Theme toggle works (glass-dark / glass-light)
- [ ] Mobile responsive (320px-1920px)
- [ ] Lighthouse Performance 90+
- [ ] Lighthouse Accessibility 95+
- [ ] `yarn lint` passes
- [ ] `astro check` passes
- [ ] FCP < 1.8s, LCP < 2.5s, CLS < 0.1
- [ ] Bundle size < 200KB gzip
- [ ] `prefers-reduced-motion` disables/reduces animations
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Refer to `.claude/skills/build-{name}.md` for full design specs

---

### Version 2: Kinetic Typography + Scroll Storytelling

**Branch:** `design/v2-kinetic-typography` | **Skill:** `/build-kinetic-typography`

#### Design System
- [ ] Define dramatic type scale (display: 8-12rem, body: 1rem)
- [ ] Implement variable font with animated axes
- [ ] Create text animation utilities (reveal-chars, reveal-words, reveal-lines)
- [ ] Set up CSS scroll-driven animation timelines
- [ ] Configure smooth scroll behavior

#### Components
- [ ] Header: minimal, disappears into content
- [ ] Hero: massive animated headline, character-by-character name reveal
- [ ] About: line-by-line text reveal on scroll, animated stats
- [ ] Experience: horizontal scrolling timeline with pinned reveals
- [ ] Projects: large titles that scale on scroll, details reveal underneath
- [ ] Contact: dramatic "Let's Talk" text that builds on scroll
- [ ] Footer: minimal, text-only

#### Verification
- [ ] `yarn build` passes
- [ ] `yarn test` passes
- [ ] i18n switching works (EN/ES)
- [ ] Theme toggle works
- [ ] Mobile responsive (320px-1920px)
- [ ] Lighthouse Performance 90+
- [ ] Lighthouse Accessibility 95+
- [ ] `yarn lint` passes
- [ ] `astro check` passes
- [ ] FCP < 1.8s, LCP < 2.5s, CLS < 0.1
- [ ] Bundle size < 200KB gzip
- [ ] `prefers-reduced-motion` disables/reduces animations
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Refer to `.claude/skills/build-{name}.md` for full design specs

---

### Version 3: Bento Grid Modular Layout

**Branch:** `design/v3-bento-grid` | **Skill:** `/build-bento-grid`

#### Design System
- [ ] Define base grid unit (80px) and cell size system
- [ ] Create named grid template areas for each section
- [ ] Implement responsive grid breakpoints (4 -> 2 -> 1 cols)
- [ ] Set up container queries on card components
- [ ] Build card variant styles (stat, profile, tech, experience, project, contact)

#### Components
- [ ] Header: clean nav integrated into grid or floating above
- [ ] Home: single bento grid with profile, stats, experience, tech, contact cells
- [ ] About: bento grid with bio, skills, location, languages
- [ ] Experience: vertical bento stream of job cards
- [ ] Projects: bento grid of varied-size project cards
- [ ] Contact: bento grid of contact method cards
- [ ] Footer: minimal row of info cells

#### Verification
- [ ] `yarn build` passes
- [ ] `yarn test` passes
- [ ] i18n switching works (EN/ES)
- [ ] Theme toggle works
- [ ] Mobile responsive (320px-1920px)
- [ ] Lighthouse Performance 90+
- [ ] Lighthouse Accessibility 95+
- [ ] `yarn lint` passes
- [ ] `astro check` passes
- [ ] FCP < 1.8s, LCP < 2.5s, CLS < 0.1
- [ ] Bundle size < 200KB gzip
- [ ] `prefers-reduced-motion` disables/reduces animations
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Refer to `.claude/skills/build-{name}.md` for full design specs

---

### Version 4: 3D Immersive / WebGL Experience

**Branch:** `design/v4-3d-immersive` | **Skill:** `/build-3d-immersive`

#### Design System
- [ ] Install and configure Three.js
- [ ] Set up WebGLRenderer with full-viewport canvas
- [ ] Create scene, camera, lighting system
- [ ] Build particle system for background atmosphere
- [ ] Implement post-processing (bloom, depth of field, grain)
- [ ] Create HTML overlay system for text content

#### Components
- [ ] Hero: 3D geometric shape + particle field, HTML overlay for text
- [ ] About: floating info panels in 3D space
- [ ] Experience: 3D timeline path with station stops
- [ ] Projects: project cards floating in 3D space
- [ ] Contact: convergence point with 3D elements
- [ ] Camera: scroll-driven camera transitions between stations
- [ ] Mobile fallback: simplified 2D version for low-power devices

#### Verification
- [ ] `yarn build` passes
- [ ] `yarn test` passes
- [ ] i18n switching works (EN/ES)
- [ ] Theme toggle works
- [ ] Mobile fallback renders correctly
- [ ] Lighthouse Performance 85+ (3D has overhead)
- [ ] Lighthouse Accessibility 95+ (HTML overlay)
- [ ] 60fps on mid-range devices
- [ ] `yarn lint` passes
- [ ] `astro check` passes
- [ ] FCP < 1.8s, LCP < 2.5s, CLS < 0.1
- [ ] Bundle size < 200KB gzip
- [ ] `prefers-reduced-motion` disables/reduces animations
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Refer to `.claude/skills/build-{name}.md` for full design specs

---

### Version 5: Neobrutalism / Raw Digital

**Branch:** `design/v5-neobrutalism` | **Skill:** `/build-neobrutalism`

#### Design System
- [ ] Define bold color palette (yellow, pink, lime, black, white)
- [ ] Create border utilities (.border-thick, .border-black)
- [ ] Build hard shadow classes (.shadow-hard offset 4-8px, no blur)
- [ ] Set up monospace + display font pairing
- [ ] Create sticker/badge rotation utilities

#### Components
- [ ] Header: thick black bottom border, chunky buttons
- [ ] Hero: massive bold headline on solid color, no effects
- [ ] About: thick bordered sections, colored stat boxes, rotated skill stickers
- [ ] Experience: bordered cards with hard shadows, bold company names
- [ ] Projects: bordered grid with project images, hard shadow hover
- [ ] Contact: bold colored section with large bordered buttons
- [ ] Footer: black bg, white text, bordered sections

#### Verification
- [ ] `yarn build` passes
- [ ] `yarn test` passes
- [ ] i18n switching works (EN/ES)
- [ ] Theme toggle works (high-contrast dark / high-contrast light)
- [ ] Mobile responsive (320px-1920px)
- [ ] Lighthouse Performance 95+ (minimal CSS, no JS animations)
- [ ] Lighthouse Accessibility 95+
- [ ] `yarn lint` passes
- [ ] `astro check` passes
- [ ] FCP < 1.8s, LCP < 2.5s, CLS < 0.1
- [ ] Bundle size < 200KB gzip
- [ ] `prefers-reduced-motion` disables/reduces animations
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Refer to `.claude/skills/build-{name}.md` for full design specs

---

### Version 6: Organic / Fluid Design

**Branch:** `design/v6-organic-fluid` | **Skill:** `/build-organic-fluid`

#### Design System
- [ ] Define earthy color palette (terracotta, sage, cream, warm brown, forest)
- [ ] Create SVG blob shapes for section dividers (3-4 variations)
- [ ] Build grain texture SVG filter
- [ ] Implement soft shadow utilities
- [ ] Define organic clip-path shapes
- [ ] Set up breathing animation keyframes

#### Components
- [ ] Header: pill-shaped floating nav, warm tones
- [ ] Hero: asymmetric split, blob-shaped profile image, warm gradient + grain
- [ ] About: flowing text with organic pull-quotes, pill skill badges
- [ ] Experience: curved SVG timeline, rounded experience cards
- [ ] Projects: masonry layout with organic card shapes
- [ ] Contact: warm section with organic background shapes
- [ ] Footer: organic divider, warm tones

#### Verification
- [ ] `yarn build` passes
- [ ] `yarn test` passes
- [ ] i18n switching works (EN/ES)
- [ ] Theme toggle works (warm light / moody dark)
- [ ] Mobile responsive (320px-1920px)
- [ ] Lighthouse Performance 90+
- [ ] Lighthouse Accessibility 95+
- [ ] `yarn lint` passes
- [ ] `astro check` passes
- [ ] FCP < 1.8s, LCP < 2.5s, CLS < 0.1
- [ ] Bundle size < 200KB gzip
- [ ] `prefers-reduced-motion` disables/reduces animations
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Refer to `.claude/skills/build-{name}.md` for full design specs

---

### Version 7: Retro-Futurism / Y2K Revival

**Branch:** `design/v7-retro-futurism` | **Skill:** `/build-retro-futurism`

#### Design System
- [ ] Define neon color palette (pink, cyan, lime, chrome silver)
- [ ] Create neon glow border utilities
- [ ] Build chrome text gradient styles
- [ ] Implement scanline overlay CSS
- [ ] Create holographic gradient keyframes
- [ ] Build perspective grid floor background
- [ ] Define glitch animation keyframes

#### Components
- [ ] Header: terminal-style nav, monospace, neon underlines
- [ ] Hero: perspective grid floor, chrome name, neon subtitle, glitch text
- [ ] About: terminal/console presentation, HUD-style stats
- [ ] Experience: retro file-manager listing, expandable entries
- [ ] Projects: retro window frames with minimize/maximize dots
- [ ] Contact: "transmission incoming" theme, neon CTA
- [ ] Footer: retro terminal style, monospace credits

#### Verification
- [ ] `yarn build` passes
- [ ] `yarn test` passes
- [ ] i18n switching works (EN/ES)
- [ ] Theme toggle works (neon dark / VHS light)
- [ ] Mobile responsive (320px-1920px)
- [ ] Lighthouse Performance 90+
- [ ] Lighthouse Accessibility 95+
- [ ] `yarn lint` passes
- [ ] `astro check` passes
- [ ] FCP < 1.8s, LCP < 2.5s, CLS < 0.1
- [ ] Bundle size < 200KB gzip
- [ ] `prefers-reduced-motion` disables/reduces animations
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Refer to `.claude/skills/build-{name}.md` for full design specs

---

### Version 8: Editorial / Magazine Layout

**Branch:** `design/v8-editorial-magazine` | **Skill:** `/build-editorial-magazine`

#### Design System
- [ ] Define dramatic type scale (display 8-10rem, body 1.1rem)
- [ ] Set up serif + sans-serif font pairing
- [ ] Create drop cap styles
- [ ] Build pull quote component
- [ ] Implement scroll-snap section behavior
- [ ] Define hairline rule divider utilities

#### Components
- [ ] Header: minimal wordmark + hamburger, thin border
- [ ] Hero: full-viewport image, overlaid massive serif text
- [ ] About: magazine spread (pull quote + multi-column body + drop cap)
- [ ] Experience: article-style timeline, large year markers, hairline rules
- [ ] Projects: horizontal scrolling gallery, full-bleed images, scroll-snap
- [ ] Contact: centered with extreme whitespace, serif headline
- [ ] Footer: colophon-style, thin rule, small type

#### Verification
- [ ] `yarn build` passes
- [ ] `yarn test` passes
- [ ] i18n switching works (EN/ES)
- [ ] Theme toggle works (white editorial / dark editorial)
- [ ] Mobile responsive (320px-1920px)
- [ ] Lighthouse Performance 90+
- [ ] Lighthouse Accessibility 95+
- [ ] `yarn lint` passes
- [ ] `astro check` passes
- [ ] FCP < 1.8s, LCP < 2.5s, CLS < 0.1
- [ ] Bundle size < 200KB gzip
- [ ] `prefers-reduced-motion` disables/reduces animations
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Refer to `.claude/skills/build-{name}.md` for full design specs

---

### Version 9: Minimalist Motion / Subtle Interaction

**Branch:** `design/v9-minimalist-motion` | **Skill:** `/build-minimalist-motion`

#### Design System
- [ ] Define easing curves and transition duration scale
- [ ] Create scroll-triggered entrance animations (fade + translateY)
- [ ] Implement custom cursor (circle, mix-blend-mode: difference)
- [ ] Build magnetic button effect
- [ ] Set up View Transitions API for page transitions
- [ ] Define underline animation for links

#### Components
- [ ] Header: almost invisible, small name + minimal nav
- [ ] Hero: centered name + title, generous spacing, subtle fade-in
- [ ] About: beautiful typography, line-by-line subtle slide-up
- [ ] Experience: clean list, hover reveals description with height animation
- [ ] Projects: name grid, cursor-following image preview on hover
- [ ] Contact: centered minimal, magnetic email link, underline animations
- [ ] Footer: barely there, small type
- [ ] Custom cursor: 20px circle, expands on links, text label on images

#### Verification
- [ ] `yarn build` passes
- [ ] `yarn test` passes
- [ ] i18n switching works (EN/ES)
- [ ] Theme toggle works
- [ ] Mobile responsive (320px-1920px)
- [ ] All micro-interactions feel intentional and polished
- [ ] Lighthouse Performance 95+ (lightweight by design)
- [ ] Lighthouse Accessibility 95+
- [ ] `yarn lint` passes
- [ ] `astro check` passes
- [ ] FCP < 1.8s, LCP < 2.5s, CLS < 0.1
- [ ] Bundle size < 200KB gzip
- [ ] `prefers-reduced-motion` disables/reduces animations
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Refer to `.claude/skills/build-{name}.md` for full design specs

---

### Version 10: AI-Powered Adaptive / Generative UI

**Branch:** `design/v10-generative-adaptive` | **Skill:** `/build-generative-adaptive`

#### Design System
- [ ] Create generative canvas background (flow field or particles)
- [ ] Implement time-of-day color palette shifting
- [ ] Build session-unique pattern seed system
- [ ] Create adaptive layout rearrangement system
- [ ] Design chat panel UI component

#### Components
- [ ] Header: adaptive greeting ("Good morning"), chat trigger button
- [ ] Hero: generative canvas background, dynamic greeting, contextual CTA
- [ ] About: adaptive card layout (rearranges based on context)
- [ ] Experience: smart ordering based on referrer
- [ ] Projects: dynamic grid with context-aware featured project
- [ ] Contact: contextual CTA based on browsing behavior
- [ ] Chat panel: sliding panel with conversational navigation
- [ ] Fallback: graceful degradation when AI/APIs unavailable

#### Verification
- [ ] `yarn build` passes
- [ ] `yarn test` passes
- [ ] i18n switching works (EN/ES)
- [ ] Theme toggle works (time-adaptive)
- [ ] Mobile responsive (320px-1920px)
- [ ] Generative background runs at 60fps
- [ ] Chat panel works (or falls back gracefully)
- [ ] Lighthouse Performance 85+
- [ ] Lighthouse Accessibility 95+
- [ ] `yarn lint` passes
- [ ] `astro check` passes
- [ ] FCP < 1.8s, LCP < 2.5s, CLS < 0.1
- [ ] Bundle size < 200KB gzip
- [ ] `prefers-reduced-motion` disables/reduces animations
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Refer to `.claude/skills/build-{name}.md` for full design specs

---

### Post-Build (After All 10 Versions)

- [ ] Cross-browser testing on Chrome, Firefox, Safari, Edge
- [ ] Mobile testing on iOS Safari and Android Chrome
- [ ] Accessibility audit (axe-core) on all 10 versions
- [ ] `prefers-reduced-motion` verified on all 10 versions
- [ ] Bundle size comparison table across versions
- [ ] All 10 branches exist and build cleanly
- [ ] Screenshot comparison of all 10 versions (desktop + mobile)
- [ ] Performance comparison table (Lighthouse scores)
- [ ] Choose winning version(s) for production deployment
- [ ] Merge winner to `main`
- [ ] Deploy to damianmeroni.dev
- [ ] Archive non-winning branches (keep for reference)
- [ ] Update project documentation with final design choice
