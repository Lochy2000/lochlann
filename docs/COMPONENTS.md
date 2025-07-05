# Component Library

## Overview

The portfolio website is built using a modular component architecture. Components are organized by feature and responsibility, with clear separation between UI components, page components, and layout components.

## Component Categories

### UI Components (`/src/components/ui/`)

Base, reusable interface elements with no business logic.

#### Button Components

##### GradientButton
```typescript
interface GradientButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}
```

**Usage:**
```tsx
<GradientButton onClick={handleClick}>
  Get In Touch
</GradientButton>
```

**Features:**
- Gradient background animation
- Hover scale effect
- Disabled state handling
- Custom className support

##### SectionTitle
```typescript
interface SectionTitleProps {
  title: React.ReactNode;
  subtitle?: string;
  light?: boolean;
}
```

**Usage:**
```tsx
<SectionTitle
  title={<>My <span className="text-gradient">Projects</span></>}
  subtitle="A showcase of my recent work"
/>
```

#### Background Components

##### TechBackground
```typescript
interface TechBackgroundProps {
  variant?: 'portfolio' | 'about' | 'experience' | 'home' | 'contact';
  intensity?: 'subtle' | 'medium' | 'strong';
}
```

**Usage:**
```tsx
<TechBackground variant="portfolio" intensity="subtle" />
```

**Features:**
- Animated tech grid patterns
- Matrix-style moving lines
- Floating orbs with physics
- Page-specific color schemes
- Configurable intensity levels

### Page Components (`/src/pages/`)

Top-level route components that compose multiple features.

#### About.tsx
Main about page component with personal information and achievements.

**Structure:**
- Hero section with animated stats
- Passions showcase
- Personal interests
- Education and certifications

#### Experience.tsx
Professional experience showcase with interactive timeline.

**Structure:**
- Hero section with achievements
- Interactive timeline navigation
- Work experience details
- Education timeline
- Certifications grid
- Key milestones

#### Portfolio.tsx
Project showcase with GitHub-inspired design.

**Structure:**
- Hero section with repository stats
- Filterable project grid
- Technology tags
- Live demo and repository links

### Feature Components

#### About Components (`/src/components/about/`)

##### ImprovedAboutHero
```typescript
const ImprovedAboutHero: React.FC = () => {
  // Hero section with animated stats and introduction
}
```

**Features:**
- Animated background effects
- Interactive stats cards
- Responsive design
- Hover animations

##### HolisticSection
```typescript
const HolisticSection: React.FC = () => {
  // Multi-faceted passion showcase
}
```

##### PersonalInterestsSection
```typescript
const PersonalInterestsSection: React.FC = () => {
  // Personal interests and hobbies
}
```

#### Experience Components (`/src/components/experience/`)

##### EnhancedTimeline
```typescript
const EnhancedTimeline: React.FC = () => {
  // Main timeline component with navigation
}
```

**Features:**
- Sticky navigation menu
- Section scrolling
- Responsive design
- Interactive timeline items

##### EnhancedTimelineItem
```typescript
interface EnhancedTimelineItemProps {
  position: number;
  date: string;
  title: string;
  company: string;
  description: string;
  skills: string[];
  keyPoints?: string[];
  icon: IconType;
  iconColor: string;
  isAlternate?: boolean;
  location?: string;
  ongoing?: boolean;
  achievement?: string;
}
```

**Usage:**
```tsx
<EnhancedTimelineItem
  position={0}
  date="2024 - Present"
  title="Senior Developer"
  company="Tech Company"
  description="Leading development of modern web applications"
  skills={["React", "TypeScript", "Node.js"]}
  icon={FaBriefcase}
  iconColor="primary"
/>
```

##### EnhancedExperienceHero
```typescript
const EnhancedExperienceHero: React.FC = () => {
  // Experience page hero with stats
}
```

#### Portfolio Components (`/src/components/portfolio/`)

##### PortfolioCard
```typescript
interface PortfolioCardProps {
  title: string;
  shortTitle?: string;
  image: string;
  description: string;
  technologies: string[];
  demoLink?: string;
  githubLink?: string;
}
```

**Usage:**
```tsx
<PortfolioCard
  title="E-commerce Platform"
  image="/images/ecommerce.jpg"
  description="Full-stack e-commerce solution with React and Node.js"
  technologies={["React", "Node.js", "MongoDB", "Stripe"]}
  demoLink="https://demo.example.com"
  githubLink="https://github.com/username/project"
/>
```

**Features:**
- Hover animations and glow effects
- Technology tag display
- Image lazy loading
- Link handling for demos and repositories

#### Education Components (`/src/components/education/`)

##### EducationCard
```typescript
interface EducationCardProps {
  title: string;
  institution: string;
  period: string;
  description: string;
}
```

**Usage:**
```tsx
<EducationCard
  title="Bachelor of Science in Computer Science"
  institution="University of Technology"
  period="2020 - 2024"
  description="Focused on software engineering and web development"
/>
```

##### CertificationCard
```typescript
interface CertificationCardProps {
  title: string;
  issuer: string;
  date: string;
  skills: string[];
}
```

**Usage:**
```tsx
<CertificationCard
  title="AWS Certified Solutions Architect"
  issuer="Amazon Web Services"
  date="2024"
  skills={["Cloud Architecture", "AWS Services", "Security"]}
/>
```

### Layout Components (`/src/components/layout/`)

#### Header
```typescript
const Header: React.FC = () => {
  // Main navigation header
}
```

**Features:**
- Responsive navigation menu
- Mobile hamburger menu
- Active link highlighting
- Smooth scroll to sections

#### Navigation
```typescript
interface NavigationProps {
  isOpen: boolean;
  onToggle: () => void;
}
```

#### Footer
```typescript
const Footer: React.FC = () => {
  // Site footer with links and contact info
}
```

### Home Components (`/src/components/home/`)

#### ModernHero
```typescript
const ModernHero: React.FC = () => {
  // Homepage hero section
}
```

#### FeaturedProjects
```typescript
const FeaturedProjects: React.FC = () => {
  // Homepage project showcase
}
```

## Component Patterns

### Composition Pattern

Components are designed to be composable and reusable:

```tsx
<Timeline>
  <TimelineSection title="Work Experience">
    <TimelineItem {...experienceData} />
    <TimelineItem {...experienceData} />
  </TimelineSection>
  <TimelineSection title="Education">
    <TimelineItem {...educationData} />
  </TimelineSection>
</Timeline>
```

### Render Props Pattern

For complex data sharing:

```tsx
<AnimationProvider>
  {({ controls, isVisible }) => (
    <motion.div animate={controls}>
      <Content isVisible={isVisible} />
    </motion.div>
  )}
</AnimationProvider>
```

### Custom Hooks Pattern

For reusable logic:

```tsx
const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};
```

## Animation Components

### Framer Motion Integration

Most components use Framer Motion for animations:

```tsx
const AnimatedCard: React.FC<CardProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ 
        y: -5,
        boxShadow: "0 10px 30px rgba(59, 130, 246, 0.2)"
      }}
    >
      {children}
    </motion.div>
  );
};
```

### Animation Variants

Shared animation configurations:

```typescript
export const fadeInUp = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const scaleOnHover = {
  whileHover: { 
    scale: 1.05,
    transition: { duration: 0.2 }
  }
};
```

## Styling Conventions

### CSS Classes

Components follow consistent naming conventions:

```tsx
const Component: React.FC = () => {
  return (
    <div className="component-container">
      <div className="component-header">
        <h2 className="component-title">Title</h2>
        <p className="component-subtitle">Subtitle</p>
      </div>
      <div className="component-content">
        {/* Content */}
      </div>
    </div>
  );
};
```

### Tailwind CSS Usage

Utility-first approach with component classes:

```tsx
<div className="bg-slate-800/50 p-6 rounded-xl border border-blue-500/30 hover:border-cyan-400/60 transition-all duration-300 group backdrop-blur-sm">
  <h3 className="text-white group-hover:text-cyan-400 transition-colors">
    Title
  </h3>
</div>
```

## Component Testing

### Testing Structure

```typescript
// Component.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Component } from './Component';

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Component onClick={handleClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## Performance Optimizations

### Lazy Loading

Components are lazy-loaded where appropriate:

```tsx
const LazyComponent = lazy(() => import('./HeavyComponent'));

const App: React.FC = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <LazyComponent />
    </Suspense>
  );
};
```

### Memoization

Expensive computations are memoized:

```tsx
const ExpensiveComponent: React.FC<Props> = memo(({ data }) => {
  const processedData = useMemo(() => {
    return data.map(item => processItem(item));
  }, [data]);

  return <div>{processedData}</div>;
});
```

### Callback Optimization

Event handlers are optimized with useCallback:

```tsx
const Component: React.FC = () => {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  return <button onClick={handleClick}>{count}</button>;
};
```

## Component Documentation

Each component should include:

1. **Purpose**: What the component does
2. **Props**: Interface definition with descriptions
3. **Usage Examples**: Basic and advanced usage
4. **Features**: Key functionality and behaviors
5. **Styling**: CSS classes and customization options
6. **Accessibility**: ARIA labels and keyboard navigation
7. **Testing**: Test cases and scenarios

## Best Practices

### Component Design
- Keep components small and focused
- Use TypeScript for type safety
- Follow single responsibility principle
- Implement proper error boundaries
- Use semantic HTML elements

### State Management
- Use local state for component-specific data
- Lift state up when multiple components need access
- Use custom hooks for reusable stateful logic
- Avoid prop drilling with context when appropriate

### Performance
- Use React.memo for expensive re-renders
- Implement proper key props for lists
- Lazy load heavy components
- Optimize images and assets
- Monitor bundle sizes

### Accessibility
- Use semantic HTML elements
- Provide proper ARIA labels
- Ensure keyboard navigation
- Maintain color contrast ratios
- Test with screen readers

### Testing
- Write unit tests for individual components
- Test user interactions and edge cases
- Use React Testing Library best practices
- Mock external dependencies
- Maintain good test coverage
