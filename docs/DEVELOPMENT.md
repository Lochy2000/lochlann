# Development Guide

## Getting Started

### Prerequisites

Before starting development, ensure you have the following installed:

- **Node.js** 18.x or higher
- **npm** 8.x or higher (comes with Node.js)
- **Git** for version control
- **VS Code** (recommended) with extensions:
  - ES7+ React/Redux/React-Native snippets
  - TypeScript Importer
  - Tailwind CSS IntelliSense
  - Prettier - Code formatter
  - ESLint

### Environment Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/personal-portfolio
cd personal-portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
Navigate to [http://localhost:5000](http://localhost:5000)

## Development Workflow

### Branch Strategy

```
main
├── develop
│   ├── feature/new-component
│   ├── feature/update-design
│   └── bugfix/animation-issue
└── hotfix/critical-bug
```

**Branch Types:**
- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - New features or enhancements
- `bugfix/*` - Bug fixes
- `hotfix/*` - Critical production fixes

### Commit Message Convention

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes
- `refactor` - Code refactoring
- `test` - Adding or updating tests
- `chore` - Maintenance tasks

**Examples:**
```bash
feat(portfolio): add new project showcase component
fix(animation): resolve timeline animation performance issue
docs(readme): update installation instructions
style(components): apply consistent formatting
```

## Project Scripts

### Development
```bash
# Start development server
npm run dev

# Start with specific port
npm run dev -- --port 3000

# Build for development (with source maps)
npm run build:dev
```

### Production
```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Analyze bundle size
npm run analyze
```

### Code Quality
```bash
# Run TypeScript type checking
npm run check

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

### Testing
```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run e2e tests
npm run test:e2e
```

## File Structure Guidelines

### Naming Conventions

**Files and Directories:**
- Use PascalCase for React components: `PortfolioCard.tsx`
- Use camelCase for utilities and hooks: `useAnimation.ts`
- Use kebab-case for non-component files: `api-client.ts`
- Use lowercase for directories: `components/`, `utils/`, `hooks/`

**Components:**
```typescript
// Good
const PortfolioCard: React.FC<PortfolioCardProps> = () => {};
export default PortfolioCard;

// Avoid
const portfolioCard = () => {};
export default portfolioCard;
```

### File Organization

```
src/
├── components/
│   ├── ui/              # Base UI components
│   │   ├── Button/
│   │   │   ├── index.ts
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx
│   │   │   └── Button.stories.tsx
│   │   └── ...
│   ├── feature/         # Feature-specific components
│   └── layout/          # Layout components
├── pages/               # Page components
├── hooks/               # Custom hooks
├── utils/               # Utility functions
├── types/               # TypeScript type definitions
├── data/                # Static data
└── assets/              # Static assets
```

## Component Development

### Component Template

```typescript
// src/components/example/ExampleComponent.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ExampleComponentProps {
  title: string;
  description?: string;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const ExampleComponent: React.FC<ExampleComponentProps> = ({
  title,
  description,
  onClick,
  className = '',
  children
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Component logic
  }, []);

  const handleClick = () => {
    onClick?.();
  };

  return (
    <motion.div
      className={`example-component ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={handleClick}
    >
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      {description && (
        <p className="text-slate-300 mt-2">{description}</p>
      )}
      {children}
    </motion.div>
  );
};

export default ExampleComponent;
```

## Troubleshooting

### Common Issues

**TypeScript Errors:**
```bash
# Clear TypeScript cache
npm run check -- --noEmit

# Restart TypeScript server in VS Code
Ctrl+Shift+P -> "TypeScript: Restart TS Server"
```

**Build Errors:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
```

**Animation Performance:**
```typescript
// Reduce motion complexity
const performantAnimation = {
  scale: [1, 1.02, 1], // Smaller scale changes
  transition: { duration: 0.2 } // Shorter duration
};
```

### Performance Monitoring

```typescript
// Monitor component renders
import { Profiler } from 'react';

const onRenderCallback = (id, phase, actualDuration) => {
  console.log(`${id} ${phase} took ${actualDuration}ms`);
};

<Profiler id="ComponentName" onRender={onRenderCallback}>
  <Component />
</Profiler>
```
