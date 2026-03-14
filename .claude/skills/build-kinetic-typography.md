---
name: build-kinetic-typography
description: Build a complete portfolio website version using Kinetic Typography + Scroll-Driven Storytelling - oversized animated text, letter-by-letter reveals, scroll-triggered transformations, and dramatic typographic contrast.
user_invocable: true
---

# Skill: Build Kinetic Typography Portfolio

You are building **Version 2: Kinetic Typography + Scroll-Driven Storytelling** of Damian Meroni's portfolio website.

## Design Philosophy

Typography is the primary interactive element. Headlines build letter by letter, words morph on scroll, and text responds to scroll position. The design creates a dramatic, editorial experience where every section tells a story through motion and type.

## Visual Identity

- **Background:** Near-black (#0a0a0a) with minimal color, letting type dominate
- **Typography:** Oversized display type (clamp(4rem, 12vw, 12rem)) for headings
- **Font Pairing:** Bold grotesque for display (Space Grotesk/Instrument Sans) + light Inter for body
- **Color:** Monochromatic with a single accent (electric purple or hot orange)
- **Contrast:** Massive headings (120px+) vs tiny body text (14px) creates visual drama
- **Whitespace:** Extreme, generous spacing between sections (200px+)
- **Motion:** Every text element has an entrance animation tied to scroll

## Key Visual Effects

1. **Character-by-Character Reveals:** Headings animate in one letter at a time with stagger
2. **Scroll-Scrubbed Text:** Text properties (size, weight, opacity, position) tied to scroll position
3. **Split Text Animations:** Words split apart, scatter, and reassemble on scroll
4. **Variable Font Morphing:** Font weight shifts from 100 to 900 as elements enter viewport
5. **Horizontal Scroll Sections:** Project showcases scroll horizontally within a vertically-scrolling page
6. **Pinned Sections:** Sections pin in place while internal text transforms
7. **Smooth Scroll:** Lenis-style smooth scrolling for premium feel

## Implementation Process

### Step 1: Read Project Context
Read these files to understand the full project:
- `docs/overview/000-COMPLETE-PROJECT-OVERVIEW.md` (full context)
- `src/i18n/locales/en.ts` and `src/i18n/locales/es.ts` (all content/translations)
- `src/data/projects.ts` and `src/data/social.ts` (data)
- `src/config/constants.ts` and `src/config/theme.ts` (configuration)
- `astro.config.mjs` (build config)

### Step 2: Typography System
- Define a dramatic type scale (display: 8-12rem, h1: 5-8rem, h2: 3-5rem, body: 1rem)
- Implement variable font with animated axes (weight, width)
- Create text animation utility classes (reveal-chars, reveal-words, reveal-lines)
- CSS scroll-driven animations for text properties

### Step 3: Scroll Animation System
- Implement CSS `animation-timeline: view()` for entrance animations
- Use `animation-timeline: scroll()` for progress-linked effects
- Create pinned section behavior with CSS `position: sticky`
- Horizontal scroll sections with `scroll-snap-type: x mandatory`

### Step 4: Rebuild Components
**Hero:** Full-viewport with massive animated headline. Name animates character by character. Title words appear with staggered delays. Subtitle fades in last.

**About:** Text paragraphs reveal line by line as user scrolls. Stats animate with counting effect.

**Experience:** Horizontal scrolling timeline. Each job pins and reveals details before moving to next.

**Projects:** Large project titles that scale down as you scroll past. Project details reveal underneath.

**Contact:** Final section with large "Let's Talk" text that morphs/builds dramatically.

**Footer:** Minimal, text-only with subtle type animation.

### Step 5: Preserve Functionality
All i18n, theme, SEO, navigation, and data systems remain intact.

### Mobile Responsiveness
- All layouts must work from 320px to 1920px
- Touch targets minimum 44x44px
- Scroll-driven animations may need simplified fallback on mobile; reduce text sizes from 12rem to 4rem on small screens
- Test on iOS Safari and Android Chrome

### Accessibility
- Semantic HTML (header, nav, main, section, footer)
- ARIA labels on all interactive elements
- Keyboard navigation (Tab, Enter, Escape)
- `prefers-reduced-motion` media query disables/reduces all animations
- Color contrast WCAG AA minimum (4.5:1 normal text, 3:1 large text)
- Animated text must have `prefers-reduced-motion` fallback showing static text; ensure scroll-linked animations don't cause vestibular issues

### Performance
- Target: Lighthouse Performance 90+, FCP < 1.8s, LCP < 2.5s, CLS < 0.1
- Bundle size < 200KB gzip
- Use CSS-only effects where possible
- Lazy load images and heavy assets
- CSS scroll-driven animations are off-main-thread; prefer native CSS over JS for scroll effects; Variable font file < 100KB

## Output
Complete deployable Astro website where typography and scroll are the primary design elements.
