# Personal Portfolio Site Analysis - kieranroberts.dev

## Overview

Kieran Roberts' portfolio is a modern, dark-themed developer portfolio built with Astro, Tailwind CSS, and TypeScript. It features smooth animations, interactive elements, and a professional design that showcases work effectively.

## Design System

### Color Palette

- **Primary Background**: Dark gray/black (#0a0a0a or similar)
- **Secondary Background**: Slightly lighter gray for cards
- **Accent Colors**:
  - Purple/Violet for primary actions and highlights
  - Blue for secondary elements
  - Green for success/positive elements
- **Text Colors**:
  - Primary: White (#ffffff)
  - Secondary: Gray (#9ca3af)
  - Muted: Darker gray (#6b7280)

### Typography

- **Font Family**: System font stack with sans-serif fallback
- **Font Sizes**:
  - Hero headline: 4xl-6xl responsive
  - Section headers: 3xl-4xl
  - Subheadings: xl-2xl
  - Body text: base-lg
  - Small text: sm

### Spacing System

- Consistent use of Tailwind spacing scale
- Section padding: 16-24 units vertical
- Container max-width: ~1280px
- Card padding: 6-8 units

## Page Structure

### 1. Navigation Header

- **Features**:
  - Fixed/sticky positioning
  - Logo/name on the left
  - Navigation links (Projects, About, Blog, Contact)
  - Dark/light theme toggle (optional)
  - Mobile hamburger menu
- **Behavior**:
  - Transparent on hero, solid background on scroll
  - Smooth transitions
  - Active link highlighting

### 2. Hero Section

- **Content**:
  - Large animated headline: "I build and design performant sites for real business needs."
  - Subtitle/description
  - CTA buttons (View Projects, Contact)
  - Animated background elements or gradient
- **Features**:
  - Text animation on load (typewriter or fade-in)
  - Subtle parallax effects
  - Responsive sizing

### 3. Introduction/About Section

- **Layout**: Centered text block
- **Content**:
  - Brief professional introduction
  - Key skills or focus areas
  - Personal touch/personality

### 4. Career & Experience Section

- **Layout**: Two-column on desktop, stacked on mobile
- **Left Column**:
  - Section title
  - Brief description
- **Right Column**:
  - Timeline or list of positions
  - Company logos
  - Dates and descriptions
- **Interactive Elements**:
  - Hover effects on items
  - Smooth reveal animations on scroll

### 5. Projects/Portfolio Section

- **Layout**: Grid of project cards
- **Project Card Components**:
  - Screenshot/thumbnail
  - Title
  - Brief description
  - Tech stack tags
  - Links (Live demo, GitHub)
- **Features**:
  - Hover animations (scale, shadow)
  - Filter by technology (optional)
  - Modal or dedicated pages for details

### 6. Testimonials Section

- **Layout**: Carousel or grid
- **Testimonial Card**:
  - Quote text
  - Author name
  - Author title/company
  - Author avatar (optional)
- **Design**:
  - Quote marks or special styling
  - Card-based with shadows
  - Dark background cards

### 7. Blog/Writing Section

- **Layout**: List or grid of articles
- **Article Preview**:
  - Title
  - Date
  - Reading time
  - Brief excerpt
  - Category tags
- **Features**:
  - Pagination or "Load more"
  - Category filtering
  - Search functionality

### 8. Personal Projects Section

- **Layout**: Similar to main projects but more experimental
- **Content**: Side projects, open source contributions
- **Styling**: Differentiated from client work

### 9. Book a Meeting Section

- **Layout**: Centered CTA section
- **Content**:
  - Headline encouraging contact
  - Brief description
  - Calendar integration or contact form
  - CTA button

### 10. Footer

- **Layout**: Multi-column
- **Content**:
  - Copyright notice
  - Social media links
  - Quick navigation
  - Contact information
- **Design**: Minimal, dark background

## Interactive Elements

### Animations

1. **Scroll-triggered animations**:
   - Fade-in from bottom
   - Stagger animations for lists
   - Parallax effects

2. **Hover effects**:
   - Card lift (transform + shadow)
   - Button color transitions
   - Link underline animations

3. **Page transitions**:
   - Smooth scrolling
   - Route transitions (if using View Transitions API)

### Micro-interactions

- Button press effects
- Form field focus states
- Loading states
- Success/error feedback

## Technical Implementation

### Component Architecture

```
src/
├── components/
│   ├── common/
│   │   ├── Button.astro
│   │   ├── Card.astro
│   │   ├── Badge.astro
│   │   └── Section.astro
│   ├── layout/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Navigation.astro
│   │   └── MobileMenu.astro
│   └── sections/
│       ├── Hero.astro
│       ├── About.astro
│       ├── Experience.astro
│       ├── Projects.astro
│       ├── Testimonials.astro
│       ├── Blog.astro
│       ├── Contact.astro
│       └── BookMeeting.astro
├── layouts/
│   ├── BaseLayout.astro
│   └── BlogLayout.astro
├── pages/
│   ├── index.astro
│   ├── projects/
│   │   └── [slug].astro
│   ├── blog/
│   │   └── [slug].astro
│   └── 404.astro
├── content/
│   ├── projects/
│   └── blog/
├── data/
│   ├── experience.ts
│   ├── testimonials.ts
│   └── social.ts
└── utils/
    ├── animations.ts
    └── helpers.ts
```

### Key Features to Implement

1. **Content Collections** for projects and blog posts
2. **View Transitions** for smooth page navigation
3. **Image Optimization** with Astro's Image component
4. **SEO Optimization** with proper meta tags
5. **Performance** - lazy loading, code splitting
6. **Accessibility** - ARIA labels, keyboard navigation
7. **Progressive Enhancement** - works without JavaScript

### Animation Libraries to Consider

- **Framer Motion** or **Motion One** for complex animations
- **AOS (Animate on Scroll)** for simple scroll animations
- **CSS animations** for micro-interactions

### Data Structure Examples

#### Project Type

```typescript
interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  date: Date;
}
```

#### Experience Type

```typescript
interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies: string[];
}
```

## Implementation Priority

1. Basic layout and navigation
2. Hero section with animations
3. Projects showcase
4. About/Experience sections
5. Blog functionality
6. Testimonials
7. Contact/Meeting booking
8. Refinements and animations
