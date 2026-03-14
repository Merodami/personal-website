---
name: build-minimalist-motion
description: Build a complete portfolio website version using Minimalist Motion / Subtle Interaction Design - clean spacious layouts, monochromatic palette, precise micro-interactions, custom cursors, magnetic buttons, and quiet luxury aesthetic.
user_invocable: true
---

# Skill: Build Minimalist Motion Portfolio

You are building **Version 9: Minimalist Motion / Subtle Interaction Design** of Damian Meroni's portfolio website.

## Design Philosophy

"Less is more" elevated by precise, purposeful micro-interactions. Every hover, scroll, and click triggers a carefully crafted response. The design appears simple, but the motion layer creates richness. This is "quiet luxury" web design, where craft is in the details.

## Visual Identity

- **Colors:** Monochromatic (black #0a0a0a, white #fafafa) with ONE muted accent (warm gray or single pastel)
- **Typography:** Single font family (Inter or Suisse Int'l) in varying weights
- **Whitespace:** Extreme generosity, content breathes
- **Layout:** Simple single-column or subtle two-column, centered
- **Borders:** Almost none, separation through space
- **Shadows:** Barely visible, if any
- **Motion:** Every interactive element has a precise, subtle response

## Key Visual Effects

1. **Micro Hover States:** Every link, button, card has a crafted hover transition
2. **Magnetic Buttons:** Buttons subtly drift toward cursor when nearby
3. **Custom Cursor:** Circle cursor that changes size/blend mode over different content
4. **Smooth Page Transitions:** Crossfade between routes via View Transitions API
5. **Text Slide-In:** Content slides up 20px + fades in with staggered timing
6. **Underline Animations:** Link underlines animate from left to right on hover
7. **Loading Skeleton:** Shimmer loading states that feel intentional
8. **Cursor Spotlight:** Subtle radial gradient following cursor on dark backgrounds

## Implementation Process

### Step 1: Read Project Context
Read these files to understand the full project:
- `docs/overview/000-COMPLETE-PROJECT-OVERVIEW.md` (full context)
- `src/i18n/locales/en.ts` and `src/i18n/locales/es.ts` (all content/translations)
- `src/data/projects.ts` and `src/data/social.ts` (data)
- `src/config/constants.ts` and `src/config/theme.ts` (configuration)
- `astro.config.mjs` (build config)

### Step 2: Motion System
- Define easing curves: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` for entrances
- Transition duration scale: fast (150ms), normal (300ms), slow (500ms)
- Intersection Observer for scroll-triggered entrances (fade + translateY)
- CSS `@starting-style` for entry animations on newly-rendered elements
- Custom cursor implementation (div following mouse with lerp)

### Step 3: Rebuild Components
**Header:** Almost invisible. Small name on left, minimal nav on right. Appears on scroll-up, hides on scroll-down. No background, just text.

**Hero:** Centered. Name in medium weight. Title underneath. One line of description. Generous vertical space (50vh padding). Subtle fade-in on load.

**About:** Simple paragraphs with beautiful typography. Text reveals line by line with subtle slide-up. Stats as inline text, not cards.

**Experience:** Clean list. Company name, role, date. No cards, no borders. Hover reveals description with smooth height animation. Minimal but informative.

**Projects:** Simple grid of project names/titles. Hover reveals project image as a floating thumbnail following cursor. Click transitions to project detail with View Transitions API.

**Contact:** Centered, minimal. Email as a large link with magnetic effect. Social links with underline animation. Nothing extra.

**Footer:** Barely visible, small monochromatic text, single line.

### Step 4: Interaction Polish
- Every `<a>` and `<button>` has a crafted hover state
- Magnetic effect on CTA buttons
- Custom cursor that:
  - Default: 20px circle, mix-blend-mode: difference
  - Over links: expands to 60px
  - Over images: becomes "View" text label
- Smooth scroll with subtle momentum

### Step 5: Preserve Functionality
All i18n, theme, SEO, navigation. The simplicity is the feature.

### Mobile Responsiveness
- All layouts must work from 320px to 1920px
- Touch targets minimum 44x44px
- Custom cursor effects replaced with touch-appropriate interactions; magnetic buttons become standard touch buttons; hover previews become tap-to-reveal
- Test on iOS Safari and Android Chrome

### Accessibility
- Semantic HTML (header, nav, main, section, footer)
- ARIA labels on all interactive elements
- Keyboard navigation (Tab, Enter, Escape)
- `prefers-reduced-motion` media query disables/reduces all animations
- Color contrast WCAG AA minimum (4.5:1 normal text, 3:1 large text)
- Custom cursor must not be the only hover indicator; ensure all hover states have focus equivalents; View Transitions must not disorient users

### Performance
- Target: Lighthouse Performance 90+, FCP < 1.8s, LCP < 2.5s, CLS < 0.1
- Bundle size < 200KB gzip
- Use CSS-only effects where possible
- Lazy load images and heavy assets
- Lightest animation version; CSS transitions only, no heavy libraries; custom cursor uses requestAnimationFrame efficiently; target Lighthouse 97+

## Output
Complete Astro website with refined minimalism. Every pixel intentional, every motion crafted.
