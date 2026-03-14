---
name: build-portfolio-version
description: Master orchestrator skill to build any of the 10 modern portfolio website versions. Pass the version number (1-10) or name to build that specific design variant.
user_invocable: true
---

# Skill: Build Portfolio Version (Master Orchestrator)

Build one of 10 modern portfolio website versions. Each version applies a distinct design philosophy to Damian Meroni's portfolio while preserving all functionality (i18n, theme, SEO, data).

## Available Versions

| # | Skill Name | Design Approach | Vibe |
|---|-----------|-----------------|------|
| 1 | `/build-liquid-glass` | Liquid Glass / Dark Glassmorphism | Premium, futuristic, sleek |
| 2 | `/build-kinetic-typography` | Kinetic Typography + Scroll Storytelling | Bold, dramatic, editorial |
| 3 | `/build-bento-grid` | Bento Grid Modular Layout | Clean, organized, modern |
| 4 | `/build-3d-immersive` | 3D Immersive / WebGL | Mind-blowing, technical |
| 5 | `/build-neobrutalism` | Neobrutalism / Raw Digital | Rebellious, authentic, bold |
| 6 | `/build-organic-fluid` | Organic / Fluid Design | Warm, natural, approachable |
| 7 | `/build-retro-futurism` | Retro-Futurism / Y2K Revival | Nostalgic, playful, memorable |
| 8 | `/build-editorial-magazine` | Editorial / Magazine Layout | Prestigious, curated, sophisticated |
| 9 | `/build-minimalist-motion` | Minimalist Motion | Refined, quiet luxury, crafted |
| 10 | `/build-generative-adaptive` | AI-Powered Adaptive / Generative UI | Cutting-edge, personalized |

## Usage

Invoke a specific version skill: `/build-liquid-glass`, `/build-bento-grid`, etc.

Or use this skill with a version number: `/build-portfolio-version 3` to build the Bento Grid version.

## Process for Each Version

1. **Read Context:** `docs/overview/000-COMPLETE-PROJECT-OVERVIEW.md` + relevant source files
2. **Create Branch:** `git checkout -b design/version-{number}-{name}`
3. **Implement Design:** Apply the specific design philosophy to all components
4. **Preserve Functionality:** i18n (EN/ES), theme toggle, SEO, accessibility, feature flags
5. **Verify:** Build passes (`yarn build`), tests pass, Lighthouse 90+
6. **Document:** Note key design decisions in the branch

## Key Files to Read First

- `docs/overview/000-COMPLETE-PROJECT-OVERVIEW.md` (complete project context)
- `src/i18n/locales/en.ts` + `es.ts` (all translatable content)
- `src/data/projects.ts` + `social.ts` (data structures)
- `src/config/constants.ts` + `theme.ts` (configuration)
- `src/layouts/BaseLayout.astro` (master template)
- `astro.config.mjs` (build configuration)
