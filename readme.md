# Personal Portfolio Website

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.4-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.1-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.13-38B2AC.svg)](https://tailwindcss.com/)

A modern, responsive personal portfolio website built with React, TypeScript, and Tailwind CSS. Features a sci-fi inspired design system with animated backgrounds, smooth transitions, and a comprehensive showcase of professional work and personal interests.

## Screenshots

![Hero Section](docs/screenshots/hero-section.png)
*Homepage hero section with animated tech background*

![About Page](docs/screenshots/about-page.png)
*About page showcasing personal journey and achievements*

![Experience Timeline](docs/screenshots/experience-timeline.png)
*Interactive experience timeline with hover effects*

![Portfolio Grid](docs/screenshots/portfolio-grid.png)
*Portfolio section with GitHub-inspired cards*

## Features

- **Modern Design System**: Sci-fi inspired UI with consistent color themes
- **Responsive Layout**: Optimized for all device sizes
- **Interactive Animations**: Framer Motion powered transitions and hover effects
- **Tech Background**: Animated matrix-style grid patterns and floating elements
- **Component Architecture**: Modular, reusable React components
- **Type Safety**: Full TypeScript implementation
- **Performance Optimized**: Built with Vite for fast development and builds

## Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/personal-portfolio
cd personal-portfolio
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

4. Open [http://localhost:5000](http://localhost:5000) to view the site

### Building for Production

```bash
npm run build
```

## Documentation

### Core Documentation
- [Architecture Overview](docs/ARCHITECTURE.md) - System design and project structure
- [Component Library](docs/COMPONENTS.md) - Complete component documentation
- [Design System](docs/DESIGN_SYSTEM.md) - Colors, typography, and styling guidelines
- [Development Guide](docs/DEVELOPMENT.md) - Setup, workflows, and best practices

### Technical Documentation
- [API Reference](docs/API.md) - Data structures and interfaces
- [Deployment Guide](docs/DEPLOYMENT.md) - Build and deployment instructions
- [Performance Guide](docs/PERFORMANCE.md) - Optimization techniques and metrics

### Contributing
- [Contributing Guidelines](docs/CONTRIBUTING.md) - How to contribute to the project
- [Code Style Guide](docs/CODE_STYLE.md) - Coding standards and conventions

## Tech Stack

### Frontend
- **React 18.3.1** - UI library
- **TypeScript 5.5.4** - Type safety
- **Vite 5.4.1** - Build tool and dev server
- **Tailwind CSS 3.4.13** - Utility-first CSS framework

### Animation & Interaction
- **Framer Motion 11.11.9** - Animation library
- **Lucide React 0.263.1** - Icon library
- **React Router DOM 6.28.0** - Client-side routing

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## Project Structure

```
client/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── about/          # About page components
│   │   ├── experience/     # Experience timeline components
│   │   ├── portfolio/      # Portfolio grid components
│   │   └── ui/             # Base UI components
│   ├── pages/              # Main page components
│   ├── data/               # Static data and content
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility libraries
│   └── utils/              # Helper functions
├── public/                 # Static assets
└── docs/                   # Documentation files
```

## Key Features by Section

### Homepage
- Animated hero section with typing effect
- Featured portfolio preview
- Responsive navigation with mobile menu

### About Page
- Personal journey showcase
- Interactive stats cards
- Skills and interests sections
- Education and certifications

### Experience Page
- Interactive timeline with navigation
- Detailed work history
- Skills and achievements highlighting
- Downloadable CV functionality

### Portfolio Page
- GitHub-inspired project cards
- Technology filtering
- Live demo and repository links
- Responsive grid layout

## Performance Metrics

- **Lighthouse Score**: 95+ across all categories
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Lochlann O'Higgins**
- Portfolio: [https://lochlann.dev](https://lochlann.dev)
- GitHub: [@Lochy2000](https://github.com/Lochy2000)
- Email: lochlannohiggins@gmail.com

## Acknowledgments

- Design inspiration from modern portfolio websites
- Animation patterns from Framer Motion documentation
- Color schemes influenced by GitHub's design system
