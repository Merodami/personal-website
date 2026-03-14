---
name: build-3d-immersive
description: Build a complete portfolio website version using 3D Immersive WebGL Experience - interactive 3D environments, particle systems, camera transitions, and shader-driven visual effects.
user_invocable: true
---

# Skill: Build 3D Immersive Portfolio

You are building **Version 4: 3D Immersive / WebGL Experience** of Damian Meroni's portfolio website.

## Design Philosophy

The most technically impressive approach. Visitors navigate a 3D environment rather than scrolling a flat page. Interactive 3D elements respond to cursor and scroll. The portfolio itself demonstrates technical mastery.

## Visual Identity

- **Environment:** Dark space with floating geometric elements and particle fields
- **Colors:** Deep space palette (dark navy #0a0e1a) with neon accents (cyan #00ffff, purple #8b5cf6)
- **3D Elements:** Geometric shapes (icosahedrons, torus knots), particle systems, floating text
- **Lighting:** Dramatic point lights, ambient occlusion, bloom post-processing
- **Typography:** Clean sans-serif rendered both in HTML overlay and 3D text geometry
- **Transitions:** Camera movements between sections (dolly, orbit, zoom)
- **Atmosphere:** Subtle fog, depth of field, film grain post-processing

## Key Visual Effects

1. **3D Hero Scene:** Particle field or geometric shape that reacts to cursor
2. **Camera Transitions:** Smooth camera movements between portfolio sections
3. **Interactive Objects:** 3D elements that respond to hover/click
4. **Particle Systems:** Background particle field creating depth and atmosphere
5. **Post-Processing:** Bloom, depth of field, chromatic aberration, film grain
6. **Scroll-Linked 3D:** 3D scene transforms tied to scroll position
7. **HTML Overlay:** Traditional text content overlaid on the 3D canvas

## Implementation Process

### Step 1: Read Project Context
Read these files to understand the full project:
- `docs/overview/000-COMPLETE-PROJECT-OVERVIEW.md` (full context)
- `src/i18n/locales/en.ts` and `src/i18n/locales/es.ts` (all content/translations)
- `src/data/projects.ts` and `src/data/social.ts` (data)
- `src/config/constants.ts` and `src/config/theme.ts` (configuration)
- `astro.config.mjs` (build config)

### Step 2: Three.js Setup
- Install three.js (or use CDN for Astro)
- Create a full-viewport `<canvas>` behind HTML content
- Set up scene, camera (PerspectiveCamera), renderer (WebGLRenderer)
- Add OrbitControls or custom scroll-driven camera

### Step 3: 3D Scene Design
**Hero:** Rotating geometric shape (icosahedron with wireframe) centered, particle field background, name rendered as 3D text or HTML overlay

**Sections:** As user scrolls, camera moves through the 3D space to different "stations":
- Station 1: Hero with floating geometry
- Station 2: About - floating info panels in 3D space
- Station 3: Experience - timeline rendered as a 3D path
- Station 4: Projects - project cards floating in 3D space
- Station 5: Contact - convergence point with contact info

### Step 4: Performance Optimization
- Use `InstancedMesh` for repeated geometries
- Implement level-of-detail (LOD) for complex scenes
- Limit draw calls and polygon count
- Provide graceful fallback for low-power devices
- Use `requestAnimationFrame` efficiently
- Lazy-load 3D assets

**Footer:** HTML overlay footer below canvas, minimal styling.

### Step 5: HTML Overlay
All text content rendered as HTML positioned over the canvas for:
- Accessibility (screen readers can read HTML)
- SEO (search engines index HTML)
- i18n (translation system works on HTML)
- Performance (text rendering is faster in HTML)

### Step 6: Preserve Functionality
i18n, theme toggle, SEO, mobile fallback (simplified 2D on mobile).

### Mobile Responsiveness
- All layouts must work from 320px to 1920px
- Touch targets minimum 44x44px
- Provide full 2D fallback on mobile (no WebGL canvas); detect via `window.matchMedia('(max-width: 768px)')` or GPU capability check
- Test on iOS Safari and Android Chrome

### Accessibility
- Semantic HTML (header, nav, main, section, footer)
- ARIA labels on all interactive elements
- Keyboard navigation (Tab, Enter, Escape)
- `prefers-reduced-motion` media query disables/reduces all animations
- Color contrast WCAG AA minimum (4.5:1 normal text, 3:1 large text)
- All content must be in HTML overlay (not rendered in canvas); canvas is decorative (`role='presentation'`); HTML content is the accessible layer

### Performance
- Target: Lighthouse Performance 90+, FCP < 1.8s, LCP < 2.5s, CLS < 0.1
- Bundle size < 200KB gzip
- Use CSS-only effects where possible
- Lazy load images and heavy assets
- Target 85+ Lighthouse; use InstancedMesh, LOD, limit draw calls; lazy-load 3D assets; provide loading indicator

## Output
Complete Astro website with a Three.js 3D experience as the primary visual layer.
