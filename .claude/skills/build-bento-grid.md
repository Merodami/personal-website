---
name: build-bento-grid
description: Build a complete portfolio website version using Bento Grid Modular Layout - asymmetric card grids with varied sizes, clean rounded corners, mixed content types, and organized visual hierarchy.
user_invocable: true
---

# Skill: Build Bento Grid Portfolio

You are building **Version 3: Bento Grid Modular Layout** of Damian Meroni's portfolio website.

## Design Philosophy

Inspired by Japanese bento boxes. Content arranged in asymmetric, varied-size card blocks where size encodes importance. Clean, structured, yet visually dynamic. The grid itself tells the hierarchy story.

## Visual Identity

- **Layout:** CSS Grid with varied cell sizes (1x1, 2x1, 1x2, 2x2, 3x1)
- **Cards:** Rounded corners (16-20px), subtle borders, soft shadows
- **Background:** Light neutral (#fafafa) or dark (#0f0f0f) with card contrast
- **Colors:** Neutral cards with accent highlights per category
- **Typography:** Clean, readable (Inter/Plus Jakarta Sans), consistent hierarchy within cards
- **Spacing:** Consistent gap (16-20px) between all cells
- **Content Variety:** Stats, images, code snippets, maps, tech stacks, text in different cells

## Key Visual Effects

1. **Asymmetric Grid:** `grid-template-areas` with named regions of varying sizes
2. **Hover Animations:** Cards scale slightly (1.02), shadow deepens, subtle glow
3. **Staggered Entry:** Cards animate in with cascade delay on scroll
4. **Container Queries:** Cards adapt content layout based on their own size
5. **Interactive Cards:** Some cards have hover-reveal content (flip, expand)
6. **Responsive Collapse:** 4-col desktop -> 2-col tablet -> 1-col mobile stacking

## Implementation Process

### Step 1: Read Project Context
Read these files to understand the full project:
- `docs/overview/000-COMPLETE-PROJECT-OVERVIEW.md` (full context)
- `src/i18n/locales/en.ts` and `src/i18n/locales/es.ts` (all content/translations)
- `src/data/projects.ts` and `src/data/social.ts` (data)
- `src/config/constants.ts` and `src/config/theme.ts` (configuration)
- `astro.config.mjs` (build config)

### Step 2: Grid System Design
- Define base grid unit (80px) with cells as multiples
- Create named grid template areas for each page section
- Implement responsive grid breakpoints
- CSS `container-type: inline-size` on each card for container queries

### Step 3: Card Component System
Create diverse card types:
- **Stat Card (1x1):** Single metric with label (years exp, skills count)
- **Profile Card (2x2):** Photo + name + title + social links
- **Tech Stack Card (2x1):** Grid of technology logos
- **Experience Card (2x1 or 3x1):** Job title + company + date + tags
- **Project Card (2x2):** Image + title + tags + CTA
- **Contact Card (1x1):** Single contact method with icon
- **Quote/Bio Card (2x1):** Text-heavy with large quote
- **Map Card (1x1):** Location indicator
- **Code Card (1x1):** Syntax-highlighted code snippet

### Step 4: Rebuild Pages
**Home:** Single bento grid containing all key info (profile, stats, featured experience, tech stack, contact methods)

**About:** Bento grid with bio, skills matrix, location, languages, interests

**Experience:** Vertical bento stream of experience cards with tech stack cards interspersed

**Contact:** Bento grid of contact methods, availability, social links

**Footer:** Minimal row of small info cells in bento style.

### Step 5: Preserve Functionality
All i18n, theme, SEO, navigation intact.

### Mobile Responsiveness
- All layouts must work from 320px to 1920px
- Touch targets minimum 44x44px
- Grid collapses from 4-col to 2-col to 1-col; container queries handle card internal layout changes
- Test on iOS Safari and Android Chrome

### Accessibility
- Semantic HTML (header, nav, main, section, footer)
- ARIA labels on all interactive elements
- Keyboard navigation (Tab, Enter, Escape)
- `prefers-reduced-motion` media query disables/reduces all animations
- Color contrast WCAG AA minimum (4.5:1 normal text, 3:1 large text)
- Grid landmark roles for screen readers; ensure tab order follows visual order

### Performance
- Target: Lighthouse Performance 90+, FCP < 1.8s, LCP < 2.5s, CLS < 0.1
- Bundle size < 200KB gzip
- Use CSS-only effects where possible
- Lazy load images and heavy assets
- Lightweight by nature; main concern is image optimization in project cards

## Output
Complete Astro website with bento grid as the primary layout paradigm across all pages.
