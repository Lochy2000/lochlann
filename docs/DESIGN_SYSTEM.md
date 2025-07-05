# Design System

## Overview

The portfolio website uses a sci-fi inspired design system with dark themes, animated backgrounds, and modern typography. The design emphasizes professionalism while maintaining visual interest through subtle animations and effects.

## Color Palette

### Primary Colors

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| Primary Blue | `#3B82F6` | `rgb(59, 130, 246)` | Primary actions, links, highlights |
| Secondary Purple | `#8B5CF6` | `rgb(139, 92, 246)` | Secondary actions, accents |
| Accent Cyan | `#06B6D4` | `rgb(6, 182, 212)` | Interactive elements, hover states |
| Success Green | `#22C55E` | `rgb(34, 197, 94)` | Success states, experience theme |

### Background Colors

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| Dark Primary | `#0F172A` | `rgb(15, 23, 42)` | Main background (slate-950) |
| Dark Secondary | `#1E293B` | `rgb(30, 41, 59)` | Section backgrounds (slate-800) |
| Dark Tertiary | `#334155` | `rgb(51, 65, 85)` | Card backgrounds (slate-700) |

### Text Colors

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| Primary Text | `#FFFFFF` | `rgb(255, 255, 255)` | Headings, important text |
| Secondary Text | `#CBD5E1` | `rgb(203, 213, 225)` | Body text (slate-300) |
| Muted Text | `#94A3B8` | `rgb(148, 163, 184)` | Supporting text (slate-400) |

### Page-Specific Themes

#### About Page Theme
- Primary: Blue (`#3B82F6`)
- Secondary: Cyan (`#06B6D4`)
- Gradient: Blue to Cyan to Purple

#### Experience Page Theme
- Primary: Green (`#22C55E`)
- Secondary: Blue (`#3B82F6`)
- Gradient: Green to Blue to Purple

#### Portfolio Page Theme
- Primary: Purple (`#8B5CF6`)
- Secondary: Cyan (`#06B6D4`)
- Gradient: Purple to Cyan to Purple

## Typography

### Font Stack

```css
font-family: 'Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', sans-serif;
```

### Font Weights

| Weight | Value | Usage |
|--------|-------|-------|
| Regular | 400 | Body text, descriptions |
| Medium | 500 | Subheadings, labels |
| Semibold | 600 | Section headings |
| Bold | 700 | Main headings, emphasis |

### Font Sizes

| Size Class | Pixel Value | Rem Value | Usage |
|------------|-------------|-----------|-------|
| text-xs | 12px | 0.75rem | Small labels, metadata |
| text-sm | 14px | 0.875rem | Body text, descriptions |
| text-base | 16px | 1rem | Default body text |
| text-lg | 18px | 1.125rem | Large body text |
| text-xl | 20px | 1.25rem | Subheadings |
| text-2xl | 24px | 1.5rem | Section headings |
| text-4xl | 36px | 2.25rem | Page headings |
| text-6xl | 60px | 3.75rem | Hero headings |

### Typography Hierarchy

```css
/* Hero Headings */
.hero-heading {
  font-size: 3.75rem; /* text-6xl */
  font-weight: 700;   /* font-bold */
  line-height: 1.1;
}

/* Section Headings */
.section-heading {
  font-size: 2.25rem; /* text-4xl */
  font-weight: 600;   /* font-semibold */
  line-height: 1.2;
}

/* Card Headings */
.card-heading {
  font-size: 1.5rem;  /* text-2xl */
  font-weight: 600;   /* font-semibold */
  line-height: 1.3;
}

/* Body Text */
.body-text {
  font-size: 1rem;    /* text-base */
  font-weight: 400;   /* font-normal */
  line-height: 1.6;
}
```

## Spacing System

### Spacing Scale (Tailwind)

| Class | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Tight spacing |
| `space-2` | 8px | Small spacing |
| `space-4` | 16px | Medium spacing |
| `space-6` | 24px | Large spacing |
| `space-8` | 32px | Section spacing |
| `space-12` | 48px | Major section spacing |
| `space-16` | 64px | Page section spacing |
| `space-20` | 80px | Large page spacing |

### Layout Spacing

```css
/* Container Padding */
.container {
  padding-left: 1rem;  /* px-4 */
  padding-right: 1rem; /* px-4 */
}

/* Section Padding */
.section-padding {
  padding-top: 3rem;    /* py-12 */
  padding-bottom: 3rem; /* py-12 */
}

/* Card Padding */
.card-padding {
  padding: 1.5rem; /* p-6 */
}
```

## Component Styles

### Buttons

#### Primary Button
```css
.btn-primary {
  background: linear-gradient(45deg, #3B82F6, #8B5CF6);
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
}
```

#### Secondary Button
```css
.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid rgba(59, 130, 246, 0.3);
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: rgba(59, 130, 246, 0.1);
  border-color: rgba(59, 130, 246, 0.6);
}
```

### Cards

#### Base Card
```css
.card {
  background: rgba(30, 41, 59, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 0.75rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.card:hover {
  border-color: rgba(6, 182, 212, 0.6);
  box-shadow: 0 10px 30px rgba(59, 130, 246, 0.2);
  transform: translateY(-2px);
}
```

#### Portfolio Card
```css
.portfolio-card {
  background: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 0.75rem;
  overflow: hidden;
  transition: all 0.3s ease;
}

.portfolio-card:hover {
  border-color: rgba(6, 182, 212, 0.6);
  box-shadow: 0 20px 40px rgba(139, 92, 246, 0.3);
  transform: translateY(-5px);
}
```

## Animation System

### Transition Timing

| Duration | Usage |
|----------|-------|
| 150ms | Micro-interactions (button hover) |
| 300ms | Standard transitions (card hover) |
| 500ms | Page transitions |
| 800ms | Complex animations |

### Easing Functions

```css
/* Standard ease */
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

/* Ease out */
transition-timing-function: cubic-bezier(0, 0, 0.2, 1);

/* Ease in out */
transition-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
```

### Framer Motion Variants

```typescript
// Stagger container
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Fade in up
export const fadeInUp = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Scale on hover
export const scaleOnHover = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};
```

## Background Effects

### Tech Grid Pattern
```css
.tech-grid {
  background-image: radial-gradient(
    circle at 2px 2px, 
    rgba(59, 130, 246, 0.4) 2px, 
    transparent 0
  );
  background-size: 40px 40px;
  opacity: 0.4;
}
```

### Matrix Lines
```css
.matrix-lines {
  background-image: 
    linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
    linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px);
  background-size: 60px 60px;
  opacity: 0.3;
}
```

## Responsive Design

### Breakpoints

| Breakpoint | Min Width | Usage |
|------------|-----------|-------|
| sm | 640px | Small tablets |
| md | 768px | Tablets |
| lg | 1024px | Small desktops |
| xl | 1280px | Large desktops |
| 2xl | 1536px | Extra large screens |

### Responsive Typography

```css
/* Mobile first approach */
.responsive-heading {
  font-size: 2rem;     /* Default mobile */
}

@media (min-width: 768px) {
  .responsive-heading {
    font-size: 3rem;   /* Tablet */
  }
}

@media (min-width: 1024px) {
  .responsive-heading {
    font-size: 4rem;   /* Desktop */
  }
}
```

### Grid System

```css
/* Mobile: Single column */
.responsive-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

/* Tablet: Two columns */
@media (min-width: 768px) {
  .responsive-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
}

/* Desktop: Three columns */
@media (min-width: 1024px) {
  .responsive-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
}
```

## Accessibility

### Color Contrast

All color combinations meet WCAG 2.1 AA standards:
- Normal text: 4.5:1 contrast ratio minimum
- Large text: 3:1 contrast ratio minimum
- UI components: 3:1 contrast ratio minimum

### Focus States

```css
.focusable:focus {
  outline: 2px solid #3B82F6;
  outline-offset: 2px;
}

.focusable:focus-visible {
  outline: 2px solid #3B82F6;
  outline-offset: 2px;
}
```

### Motion Preferences

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Design Tokens

### CSS Custom Properties

```css
:root {
  /* Colors */
  --color-primary: 59 130 246;
  --color-secondary: 139 92 246;
  --color-accent: 6 182 212;
  --color-success: 34 197 94;
  
  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  
  /* Typography */
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  
  /* Border Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
}
```

## Usage Guidelines

### Do's
- Use consistent spacing from the scale
- Maintain color contrast ratios
- Follow typography hierarchy
- Use semantic color meanings
- Test animations with reduced motion
- Ensure focus states are visible

### Don'ts
- Don't use arbitrary spacing values
- Don't use colors outside the palette
- Don't override font weights arbitrarily
- Don't create overly complex animations
- Don't forget mobile responsiveness
- Don't ignore accessibility guidelines
