---
name: build-liquid-glass
description: Build a complete portfolio website version using the Liquid Glass / Dark Glassmorphism design approach - translucent frosted-glass panels, light refraction effects, deep dark backgrounds with luminous glass cards, and layered depth.
user_invocable: true
---

# Skill: Build Liquid Glass Portfolio

You are building **Version 1: Liquid Glass / Dark Glassmorphism** of Damian Meroni's portfolio website.

## Design Philosophy

The hottest aesthetic of 2025-2026, inspired by Apple's "Liquid Glass" design language. Combines translucent, frosted-glass surfaces with real-time light refraction, layered depth, and fluid motion. Deep dark backgrounds create a premium, high-tech feel.

## Visual Identity

- **Background:** Deep dark (#050508 to #0a0a12) with subtle gradient nebula effects
- **Cards/Panels:** Translucent glass (`backdrop-filter: blur(20px)`, `background: rgba(255,255,255,0.05)`)
- **Borders:** 1px solid rgba(255,255,255,0.08) with subtle gradient borders
- **Glows:** Soft purple/teal/blue luminous glows behind glass elements
- **Depth:** Multiple z-index planes with parallax-like layered movement
- **Typography:** Clean sans-serif (Inter), light weight on glass, bold for headings
- **Accents:** Gradient highlights shifting purple (#a855f7) to cyan (#06b6d4)
- **Noise:** Subtle SVG feTurbulence grain overlay on glass panels for realism

## Key Visual Effects

1. **Glass Cards:** Every card/panel uses `backdrop-filter: blur(16-24px)` with semi-transparent backgrounds
2. **Light Refraction:** CSS `@property` animated gradients that shift as user scrolls
3. **Layered Depth:** 3+ depth layers with cursor-tracking parallax movement
4. **Glow Effects:** Radial gradient glows behind key elements, animated on hover
5. **Border Shimmer:** Gradient borders that rotate/shift on hover using `conic-gradient`
6. **Noise Texture:** SVG feTurbulence grain overlay at 3-5% opacity
7. **Smooth Transitions:** 0.4s cubic-bezier easing on all interactive elements

## Implementation Process

### Step 1: Read Project Context
Read these files to understand the full project:
- `docs/overview/000-COMPLETE-PROJECT-OVERVIEW.md` (full context)
- `src/i18n/locales/en.ts` and `src/i18n/locales/es.ts` (all content/translations)
- `src/data/projects.ts` and `src/data/social.ts` (data)
- `src/config/constants.ts` and `src/config/theme.ts` (configuration)
- `astro.config.mjs` (build config)

### Step 2: Create Design System
Create a new CSS design system with:
- Glass-specific CSS custom properties (blur levels, glass-bg, glass-border, glow colors)
- Noise texture SVG filter definition
- Glass panel utility classes (.glass-panel, .glass-card, .glass-nav)
- Animated gradient background keyframes
- Glow effect utilities

### Step 3: Rebuild Each Component
Rebuild every component with the liquid glass aesthetic:

**Layout:**
- Header: floating glass navbar with blur, subtle border, luminous hover states
- Footer: glass panel with reduced opacity, gradient border top

**Hero:**
- Full-viewport with animated mesh gradient background (dark purple/teal/blue nebula)
- Glass panel containing hero text with subtle inner glow
- Dynamic text with glass-morphism letter backgrounds
- Floating tech logos as glass bubbles with blur

**Sections:**
- About: Glass card with layered depth, stats in individual glass cells
- Experience: Timeline with glass cards, glowing dot indicators
- Projects: Bento-style glass grid with hover glow expansion
- Contact: Glass contact cards with animated border shimmer

**Interactive Effects:**
- Cursor-following subtle spotlight effect on glass panels
- Hover: cards lift (translateY -4px), glow intensifies, border brightens
- Scroll: sections fade in with glass blur transition (blur 20px to 0)

### Step 4: Preserve All Functionality
Keep all existing functionality intact:
- i18n system (EN/ES with dynamic switching)
- Theme system (adapt for glass-specific dark/light variants)
- SEO tags, sitemap, accessibility
- Feature flags, navigation, mobile menu
- CV download, social links, Calendly integration

### Step 5: Performance
- Keep Lighthouse 95+ performance
- Use CSS-only effects where possible (no heavy JS libraries)
- Lazy load images, optimize fonts
- Critical CSS for above-fold glass effects

## Output
Create all files in a new branch or directory. The result should be a complete, deployable Astro website with the Liquid Glass aesthetic applied to every element.
