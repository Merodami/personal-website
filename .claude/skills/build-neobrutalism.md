---
name: build-neobrutalism
description: Build a complete portfolio website version using Neobrutalism / Raw Digital design - thick black borders, hard drop shadows, clashing bold colors, monospaced fonts, and deliberately raw aesthetic.
user_invocable: true
---

# Skill: Build Neobrutalist Portfolio

You are building **Version 5: Neobrutalism / Raw Digital** of Damian Meroni's portfolio website.

## Design Philosophy

The anti-design rebellion. Deliberately embraces rawness, high contrast, thick borders, and clashing colors. Conveys authenticity, individuality, and a refusal to follow templates. Shows the developer thinks differently.

## Visual Identity

- **Borders:** Thick black 2-4px borders on ALL elements
- **Shadows:** Hard drop shadows (4-8px offset, no blur, solid black)
- **Colors:** Bold, clashing palette (electric yellow #FFE500, hot pink #FF6B9D, lime #B8FF57, black #000, white #FFF)
- **Background:** Stark white or bold solid color sections
- **Typography:** Mix of monospace (JetBrains Mono/Space Mono) for code feel + bold grotesque for display (Archivo Black)
- **Corners:** Sharp edges, NO rounded corners (0px border-radius)
- **Grid:** Visible grid structure, elements feel deliberately "placed"
- **Texture:** None - flat, raw, no gradients, no glass, no shadows beyond hard offsets

## Key Visual Effects

1. **Hard Shadow Cards:** Every card has a solid 4-8px offset shadow (no blur)
2. **Bold Color Blocks:** Sections alternate between clashing background colors
3. **Oversized Type:** Headlines at 5-8rem, bold weight, tight tracking
4. **Raw Links:** Underlined with thick 3px underline, color shifts on hover
5. **Visible Borders:** Everything has a border, making the structure explicit
6. **Minimal Animation:** Intentionally simple or absent; content-first approach
7. **Sticker/Badge Elements:** Rotated labels, stamp-like badges for tech tags

## Implementation Process

### Step 1: Read Project Context
Read these files to understand the full project:
- `docs/overview/000-COMPLETE-PROJECT-OVERVIEW.md` (full context)
- `src/i18n/locales/en.ts` and `src/i18n/locales/es.ts` (all content/translations)
- `src/data/projects.ts` and `src/data/social.ts` (data)
- `src/config/constants.ts` and `src/config/theme.ts` (configuration)
- `astro.config.mjs` (build config)

### Step 2: Design System
- CSS custom properties for the bold color palette
- Border utilities (.border-thick, .border-black)
- Hard shadow utility (.shadow-hard, .shadow-hard-lg)
- Typography scale with monospace + display fonts
- Sticker/badge rotation utilities

### Step 3: Rebuild Components
**Header:** Thick black bottom border, no blur/glass. Navigation links with underline hover. Language/theme toggles as chunky bordered buttons.

**Hero:** Massive bold headline on solid color background. Name in display font, title in monospace. CTAs as bordered buttons with hard shadows. No background effects, just type.

**About:** Two-column with thick bordered sections. Stats in bold colored boxes with hard shadows. Skills as "sticker" badges rotated at slight angles.

**Experience:** Stack of bordered cards with hard shadows. Company names in bold color. Tech tags as pill badges with borders and slight rotation.

**Projects:** Grid of bordered cards with project images that have thick borders. Hard shadow hover effect (shadow shifts from 4px to 8px).

**Contact:** Bold colored section. Contact methods as large bordered buttons. CTA in massive type with hard underline.

**Footer:** Black background, white text, bordered sections. Tech stack as monospace text.

### Step 4: Preserve Functionality
All i18n, theme (adapt dark/light to high-contrast variants), SEO, navigation.

### Mobile Responsiveness
- All layouts must work from 320px to 1920px
- Touch targets minimum 44x44px
- Thick borders and hard shadows scale well to mobile; reduce headline sizes; stack all content single-column
- Test on iOS Safari and Android Chrome

### Accessibility
- Semantic HTML (header, nav, main, section, footer)
- ARIA labels on all interactive elements
- Keyboard navigation (Tab, Enter, Escape)
- `prefers-reduced-motion` media query disables/reduces all animations
- Color contrast WCAG AA minimum (4.5:1 normal text, 3:1 large text)
- High contrast is inherently accessible; verify clashing colors still meet 4.5:1 contrast ratio; borders help delineate interactive areas

### Performance
- Target: Lighthouse Performance 90+, FCP < 1.8s, LCP < 2.5s, CLS < 0.1
- Bundle size < 200KB gzip
- Use CSS-only effects where possible
- Lazy load images and heavy assets
- Lightest version; no animation libraries, minimal CSS, no images required; target Lighthouse 97+

## Output
Complete Astro website with raw neobrutalist aesthetic. Minimal CSS, no animations library, pure design confidence.
