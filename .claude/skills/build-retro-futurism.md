---
name: build-retro-futurism
description: Build a complete portfolio website version using Retro-Futurism / Y2K Revival - neon gradients, chrome effects, scanline overlays, pixel elements, holographic surfaces, and nostalgic-yet-futuristic aesthetic.
user_invocable: true
---

# Skill: Build Retro-Futurism Portfolio

You are building **Version 7: Retro-Futurism / Y2K Revival** of Damian Meroni's portfolio website.

## Design Philosophy

A nostalgic-yet-forward-looking aesthetic merging 1990s/early-2000s visual language with modern technology. Chrome effects, neon gradients, scanline overlays, and CRT-style elements create tension between old and new. Visually unforgettable.

## Visual Identity

- **Colors:** Neon palette (hot pink #FF00FF, electric blue #00FFFF, lime green #00FF41, chrome silver #C0C0C0)
- **Background:** Deep space black (#050510) with star field or grid pattern
- **Typography:** Retro-tech fonts (Space Grotesk for headings, VT323/monospace for accents)
- **Effects:** Chrome metallic text, holographic gradients, scanline overlays
- **Borders:** Neon glow borders (box-shadow with color spread)
- **UI Elements:** Retro window frames, terminal-style interfaces, pixel accents
- **Textures:** Scanline overlay, CRT curvature, static noise

## Key Visual Effects

1. **Neon Glow:** Colored box-shadows and text-shadows simulating neon tubes
2. **Chrome Text:** Metallic gradient on headings (linear-gradient with silver/white stops)
3. **Scanline Overlay:** CSS repeating-linear-gradient creating CRT scanline effect
4. **Holographic Gradients:** Animated conic-gradient creating rainbow/iridescent shifts
5. **Grid Background:** Perspective CSS grid creating retro 3D grid floor
6. **Pixel Art Accents:** Small decorative pixel elements mixed with modern type
7. **Glitch Effects:** CSS clip-path + animation creating text glitch moments
8. **Star Field:** CSS radial-gradient dots simulating stars

## Implementation Process

### Step 1: Read Project Context
Read these files to understand the full project:
- `docs/overview/000-COMPLETE-PROJECT-OVERVIEW.md` (full context)
- `src/i18n/locales/en.ts` and `src/i18n/locales/es.ts` (all content/translations)
- `src/data/projects.ts` and `src/data/social.ts` (data)
- `src/config/constants.ts` and `src/config/theme.ts` (configuration)
- `astro.config.mjs` (build config)

### Step 2: Design System
- Neon color palette with glow variants
- Chrome text gradient mixin
- Scanline overlay CSS (2px repeating-linear-gradient)
- Neon border utility (box-shadow: 0 0 10px color, 0 0 20px color)
- Retro window frame component
- Glitch animation keyframes
- Grid floor background

### Step 3: Rebuild Components
**Header:** Retro terminal-style nav with monospace font. Neon underline on active link. Pixel-art logo or ASCII art name.

**Hero:** Full-screen with perspective grid floor extending to horizon. Chrome gradient name in massive type. Neon subtitle. Glitch effect on dynamic text. Floating neon-bordered tech icons.

**About:** Terminal/console style presentation. Stats displayed as retro "HUD" elements. Skills as pixel-art style badges with neon glow.

**Experience:** Retro file manager or terminal listing style. Jobs as expandable terminal entries. Tech tags with neon pill style.

**Projects:** Retro window frames containing project previews. Drag-style window headers with minimize/maximize dots. Neon CTA buttons.

**Contact:** "Transmission incoming" themed section. Contact methods as retro communication channels. CTA as pulsing neon button.

**Footer:** Retro terminal-style footer with monospace credits, neon border top.

### Step 4: Preserve Functionality
All i18n, theme (neon dark + VHS light), SEO, navigation.

### Mobile Responsiveness
- All layouts must work from 320px to 1920px
- Touch targets minimum 44x44px
- Scanline overlay may cause rendering issues on mobile; simplify to solid backgrounds on small screens; neon glows reduce intensity
- Test on iOS Safari and Android Chrome

### Accessibility
- Semantic HTML (header, nav, main, section, footer)
- ARIA labels on all interactive elements
- Keyboard navigation (Tab, Enter, Escape)
- `prefers-reduced-motion` media query disables/reduces all animations
- Color contrast WCAG AA minimum (4.5:1 normal text, 3:1 large text)
- Scanline overlay must not reduce text contrast below WCAG AA; glitch animations must respect `prefers-reduced-motion`; neon on dark backgrounds needs contrast verification

### Performance
- Target: Lighthouse Performance 90+, FCP < 1.8s, LCP < 2.5s, CLS < 0.1
- Bundle size < 200KB gzip
- Use CSS-only effects where possible
- Lazy load images and heavy assets
- CSS-only scanlines and glitch effects are lightweight; avoid canvas/WebGL for retro effects; keep font count to 2 maximum

## Output
Complete Astro website with retro-futuristic Y2K aesthetic. Nostalgic, bold, unforgettable.
