---
name: build-editorial-magazine
description: Build a complete portfolio website version using Editorial / Magazine Layout - dramatic whitespace, large-scale photography, sophisticated typography hierarchies, horizontal scroll sections, and luxury publication aesthetic.
user_invocable: true
---

# Skill: Build Editorial Magazine Portfolio

You are building **Version 8: Editorial / Magazine Layout** of Damian Meroni's portfolio website.

## Design Philosophy

The portfolio as a high-end publication. Large-scale imagery, dramatic whitespace, sophisticated typography, and content structured like magazine spreads. Inherent sense of prestige and curation. Scroll-snapped "pages" that feel like flipping through a luxury magazine.

## Visual Identity

- **Whitespace:** Extreme (40-60% of viewport is empty space)
- **Typography:** Serif for headings (Playfair Display/Cormorant Garamond) + clean sans-serif for body (Inter)
- **Colors:** Monochromatic (black + white) with ONE accent color (warm red #C62828 or gold #B8860B)
- **Images:** Large, full-bleed, high-quality photography
- **Layout:** Multi-column editorial grids, asymmetric text placement
- **Borders:** Thin hairline rules (1px) as section dividers
- **Navigation:** Minimal, almost invisible; content IS the navigation
- **Pagination:** Scroll-snap sections that feel like pages

## Key Visual Effects

1. **Full-Bleed Images:** Images that extend edge-to-edge with text overlay
2. **Multi-Column Text:** 2-3 column text layouts like a magazine article
3. **Horizontal Scroll:** Project showcase scrolls horizontally (scroll-snap-type: x)
4. **Scroll Snap Pages:** Vertical sections snap into place (scroll-snap-type: y)
5. **Large Caps:** Decorative drop caps at the start of text sections
6. **Pull Quotes:** Large, prominent quotes breaking the text flow
7. **Subtle Reveal:** Content fades in gently with minimal animation

## Implementation Process

### Step 1: Read Project Context
Read these files to understand the full project:
- `docs/overview/000-COMPLETE-PROJECT-OVERVIEW.md` (full context)
- `src/i18n/locales/en.ts` and `src/i18n/locales/es.ts` (all content/translations)
- `src/data/projects.ts` and `src/data/social.ts` (data)
- `src/config/constants.ts` and `src/config/theme.ts` (configuration)
- `astro.config.mjs` (build config)

### Step 2: Typography System
- Dramatic type scale: Display (8-10rem), H1 (5rem), H2 (3rem), body (1.1rem)
- Serif + sans-serif pairing with clear hierarchy
- Drop cap styles for section openings
- Pull quote component with large italic serif type
- Letterspacing, leading, and measure controls for readability

### Step 3: Rebuild Components
**Header:** Minimal: just a small wordmark and hamburger. Almost invisible. Thin top border.

**Hero:** Full-viewport image with overlaid text. Name in massive serif. Title in small caps sans-serif. Dramatic vertical spacing. Single accent color line.

**About:** Magazine spread layout. Left column: large pull quote. Right column: multi-column body text. Drop cap on first paragraph. Black-and-white profile photo.

**Experience:** Vertical timeline styled as magazine article. Large year markers as section dividers. Hairline rules between entries. Company names in serif, details in sans-serif.

**Projects:** Horizontal scrolling gallery. Each project gets a full "page" with full-bleed image + overlaid title. Scroll-snap for crisp page transitions.

**Contact:** Centered with extreme whitespace. Simple serif headline. Minimal contact methods with thin underlines. Elegant, restrained.

**Footer:** Thin hairline rule. Small colophon-style text. Magazine issue/date feel.

### Step 4: Preserve Functionality
All i18n, theme (white editorial + dark editorial variants), SEO, navigation.

### Mobile Responsiveness
- All layouts must work from 320px to 1920px
- Touch targets minimum 44x44px
- CRITICAL: Extreme whitespace (40-60%) must reduce on mobile to 10-20%; full-bleed images become contained; horizontal scroll sections become vertical stacking; multi-column text becomes single column
- Test on iOS Safari and Android Chrome

### Accessibility
- Semantic HTML (header, nav, main, section, footer)
- ARIA labels on all interactive elements
- Keyboard navigation (Tab, Enter, Escape)
- `prefers-reduced-motion` media query disables/reduces all animations
- Color contrast WCAG AA minimum (4.5:1 normal text, 3:1 large text)
- Ensure serif fonts are readable at all sizes; horizontal scroll sections need clear affordances; scroll-snap sections need keyboard navigation

### Performance
- Target: Lighthouse Performance 90+, FCP < 1.8s, LCP < 2.5s, CLS < 0.1
- Bundle size < 200KB gzip
- Use CSS-only effects where possible
- Lazy load images and heavy assets
- Large images are the main concern; use AVIF/WebP with responsive srcset; lazy load below-fold images; keep total page weight under 2MB

## Output
Complete Astro website with luxury editorial magazine aesthetic. Prestigious, curated, sophisticated.
