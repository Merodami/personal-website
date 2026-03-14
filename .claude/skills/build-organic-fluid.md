---
name: build-organic-fluid
description: Build a complete portfolio website version using Organic / Fluid Design - curved shapes, earthy color palettes, blob-like elements, morphing SVG animations, soft textures, and nature-inspired aesthetic.
user_invocable: true
---

# Skill: Build Organic Fluid Portfolio

You are building **Version 6: Organic / Fluid Design** of Damian Meroni's portfolio website.

## Design Philosophy

Design is "softening." Organic shapes, curved asymmetrical forms inspired by nature, and earthy color palettes replace rigid geometric layouts. Creates warmth and approachability that contrasts with cold tech-forward designs.

## Visual Identity

- **Colors:** Earthy, muted palette (terracotta #C4704B, sage #A3B18A, cream #FEFAE0, warm brown #6B4226, forest #344E41)
- **Shapes:** Blob-like, organic dividers; no straight section breaks
- **Backgrounds:** Warm with subtle grain/paper texture
- **Typography:** Rounded sans-serif (Plus Jakarta Sans) + elegant serif for accents (Lora/Playfair)
- **Corners:** Large border-radius (24-40px) everywhere
- **Whitespace:** Generous, flowing, asymmetric
- **Illustrations:** Hand-drawn feel, organic quality
- **Textures:** Grain, noise, paper-like overlays

## Key Visual Effects

1. **Blob Dividers:** SVG blob shapes between sections instead of straight lines
2. **Morphing Blobs:** Background blobs that continuously morph using SVG animation
3. **Breathing Elements:** Subtle scale pulsing (1.0 to 1.02) on decorative elements
4. **Organic Flow:** Asymmetric layouts that flow naturally, not snapping to strict grids
5. **Grain Texture:** SVG feTurbulence noise overlay at 5-8% opacity for warmth
6. **Soft Shadows:** Large, diffused shadows (0 20px 60px rgba(0,0,0,0.08))
7. **Curved Clip Paths:** `clip-path` with custom polygon/ellipse for section shapes

## Implementation Process

### Step 1: Read Project Context
Read these files to understand the full project:
- `docs/overview/000-COMPLETE-PROJECT-OVERVIEW.md` (full context)
- `src/i18n/locales/en.ts` and `src/i18n/locales/es.ts` (all content/translations)
- `src/data/projects.ts` and `src/data/social.ts` (data)
- `src/config/constants.ts` and `src/config/theme.ts` (configuration)
- `astro.config.mjs` (build config)

### Step 2: Design System
- Earthy color palette as CSS custom properties
- SVG blob generator for section dividers (3-4 variations)
- Grain texture SVG filter
- Soft shadow utility classes
- Organic shape clip-path definitions
- CSS trigonometric functions (sin(), cos()) for breathing animations

### Step 3: Rebuild Components
**Header:** Pill-shaped floating nav with large border-radius. Warm tones. Subtle shadow.

**Hero:** Asymmetric split layout. Large organic blob shape containing profile image. Curved text flow. Warm gradient background with grain. Floating botanical/organic decorative SVG elements.

**About:** Flowing text layout with organic pull-quotes. Skills as rounded pill badges in earthy tones. Bio text wrapping around organic shapes.

**Experience:** Curved timeline path (SVG line). Experience cards with large rounded corners, earthy card backgrounds, soft shadows. Tech tags in muted color pills.

**Projects:** Masonry-style layout with organic card shapes. Images with rounded clip-paths. Hover: card "breathes" (subtle scale + shadow change).

**Contact:** Warm-toned section with organic background shapes. Contact cards as rounded panels with botanical illustrations. CTA with hand-drawn style underline.

**Footer:** Organic-shaped footer with curved top divider, warm earthy tones.

### Step 4: Preserve Functionality
All i18n, theme (warm light + moody dark variants), SEO, navigation.

### Mobile Responsiveness
- All layouts must work from 320px to 1920px
- Touch targets minimum 44x44px
- Blob shapes simplify on mobile (fewer control points); asymmetric layouts stack vertically; breathing animations reduce on small screens
- Test on iOS Safari and Android Chrome

### Accessibility
- Semantic HTML (header, nav, main, section, footer)
- ARIA labels on all interactive elements
- Keyboard navigation (Tab, Enter, Escape)
- `prefers-reduced-motion` media query disables/reduces all animations
- Color contrast WCAG AA minimum (4.5:1 normal text, 3:1 large text)
- Ensure earthy muted colors meet contrast ratios (terracotta on cream needs checking); organic shapes don't interfere with content readability

### Performance
- Target: Lighthouse Performance 90+, FCP < 1.8s, LCP < 2.5s, CLS < 0.1
- Bundle size < 200KB gzip
- Use CSS-only effects where possible
- Lazy load images and heavy assets
- SVG blob complexity can impact rendering; limit SVG path points; CSS trig functions have good browser support but provide fallbacks

## Output
Complete Astro website with warm, organic aesthetic. Nature-inspired, approachable, human.
