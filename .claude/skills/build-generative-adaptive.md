---
name: build-generative-adaptive
description: Build a complete portfolio website version using AI-Powered Adaptive / Generative UI - dynamic layouts, generative visual elements, AI chat navigation, context-aware theming, and personalized content ordering.
user_invocable: true
---

# Skill: Build Generative Adaptive Portfolio

You are building **Version 10: AI-Powered Adaptive / Generative UI** of Damian Meroni's portfolio website.

## Design Philosophy

The most forward-looking approach. The interface adapts based on visitor context. Generative visual elements create unique experiences. An AI assistant provides conversational navigation. The portfolio feels alive and responsive to each visitor.

## Visual Identity

- **Background:** Dark with generative art canvas (p5.js/canvas-based procedural patterns)
- **Colors:** Dynamic palette that shifts based on time-of-day or user preference
- **Typography:** Clean, readable (Inter) with AI-generated section headers
- **Layout:** Modular, rearrangeable blocks that adapt to viewport and context
- **Accents:** Generative gradient patterns, unique per session
- **UI:** Chat interface panel, adaptive card ordering
- **Texture:** Procedural noise/patterns generated in real-time

## Key Visual Effects

1. **Generative Background:** Canvas-based procedural art (flow fields, particle systems, or cellular automata)
2. **Time-Aware Theme:** Colors shift based on visitor's local time (warm morning, cool evening)
3. **AI Chat Panel:** Sliding panel with conversational portfolio navigation
4. **Dynamic Content Order:** Most relevant projects/experience shown first based on referrer
5. **Session-Unique Patterns:** Generative patterns seeded per session (each visit looks slightly different)
6. **Adaptive Cards:** Cards that rearrange based on viewport and interaction patterns
7. **Smart Greetings:** Dynamic welcome message based on time, return visits, referrer

## Implementation Process

### Step 1: Read Project Context
Read these files to understand the full project:
- `docs/overview/000-COMPLETE-PROJECT-OVERVIEW.md` (full context)
- `src/i18n/locales/en.ts` and `src/i18n/locales/es.ts` (all content/translations)
- `src/data/projects.ts` and `src/data/social.ts` (data)
- `src/config/constants.ts` and `src/config/theme.ts` (configuration)
- `astro.config.mjs` (build config)

### Step 2: Generative Art System
- Create a `<canvas>` background with a flow field or particle system
- Seed the generator with session ID for unique patterns
- Use `requestAnimationFrame` for smooth 60fps animation
- Implement time-of-day color palette shifting:
  - Morning (6-12): Warm golds, soft oranges
  - Afternoon (12-18): Clean blues, bright whites
  - Evening (18-22): Deep purples, warm magentas
  - Night (22-6): Dark navy, cool cyans

### Step 3: Adaptive Layout System
- Detect referrer (LinkedIn, GitHub, direct, search) to infer visitor intent
- Reorder content sections based on likely interest:
  - From LinkedIn: Experience first, then skills, then projects
  - From GitHub: Projects first, then tech stack, then experience
  - Direct/search: Standard order with hero
- Store visit count in localStorage for return visitor greeting

### Step 4: AI Chat Integration
- Implement a chat panel (slide-in from right)
- Connect to Claude API or similar for conversational navigation
- Chat can answer questions about experience, skills, projects
- Chat suggests relevant sections based on conversation
- Fallback: pre-scripted responses if API unavailable

### Step 5: Rebuild Components
**Header:** Adaptive greeting ("Good morning" / "Welcome back"). Minimal nav + chat trigger button.

**Hero:** Generative canvas background. Dynamic greeting. Session-unique color accent. Contextual CTA based on likely visitor intent.

**About:** Adaptive card layout. Cards rearrange based on what the visitor might care about.

**Experience:** Smart ordering. Most relevant experience highlighted based on context.

**Projects:** Dynamic grid. Featured project changes based on referrer context.

**Contact:** Contextual CTA. "Let's discuss [relevant topic]" based on browsing behavior.

**Chat Panel:** Floating button -> sliding panel. Conversational interface to explore the portfolio.

**Footer:** Adaptive footer that shows contextually relevant links based on browsing path.

### Step 6: Preserve Functionality
All i18n, theme (time-adaptive), SEO (static HTML for crawlers, dynamic for visitors), navigation.

### Mobile Responsiveness
- All layouts must work from 320px to 1920px
- Touch targets minimum 44x44px
- Generative canvas reduces particle count on mobile; chat panel becomes full-screen overlay on mobile; referrer detection works the same
- Test on iOS Safari and Android Chrome

### Accessibility
- Semantic HTML (header, nav, main, section, footer)
- ARIA labels on all interactive elements
- Keyboard navigation (Tab, Enter, Escape)
- `prefers-reduced-motion` media query disables/reduces all animations
- Color contrast WCAG AA minimum (4.5:1 normal text, 3:1 large text)
- Canvas must have `role='presentation'` or `aria-hidden='true'`; all content in HTML, not canvas; chat panel needs ARIA live region for screen reader announcements; time-aware theme must not override user's system preference

### Performance
- Target: Lighthouse Performance 90+, FCP < 1.8s, LCP < 2.5s, CLS < 0.1
- Bundle size < 200KB gzip
- Use CSS-only effects where possible
- Lazy load images and heavy assets
- Target 85+ Lighthouse; generative canvas is the main cost; limit to 30fps on mobile; provide static gradient fallback if canvas causes jank; AI chat loads lazily

## Output
Complete Astro website with AI-powered personalization and generative visuals. Cutting-edge, unique per visitor.
