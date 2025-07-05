# Contributing Guidelines

## Welcome

Thank you for your interest in contributing to this personal portfolio project. This document provides guidelines and instructions for contributing to the codebase.

## Code of Conduct

### Our Standards

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 8.x or higher
- Git
- Basic knowledge of React, TypeScript, and Tailwind CSS

### Development Setup

1. **Fork the repository**
2. **Clone your fork**
```bash
git clone https://github.com/your-username/personal-portfolio
cd personal-portfolio
```

3. **Install dependencies**
```bash
npm install
```

4. **Create a feature branch**
```bash
git checkout -b feature/your-feature-name
```

5. **Start development server**
```bash
npm run dev
```

## Development Process

### Branch Naming

Use descriptive branch names with the following prefixes:

- `feature/` - New features or enhancements
- `bugfix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `style/` - Code style improvements
- `test/` - Adding or updating tests

### Commit Guidelines

Follow conventional commit format:

```
type(scope): description
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Formatting changes
- `refactor` - Code refactoring
- `test` - Adding tests
- `chore` - Maintenance tasks

### Code Style

#### TypeScript
```typescript
// Use explicit types for props
interface ComponentProps {
  title: string;
  description?: string;
  onClick?: () => void;
}

// Use const assertions for objects
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000
} as const;
```

#### React Components
```typescript
const Component: React.FC<ComponentProps> = ({
  title,
  description,
  onClick
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  const handleClick = useCallback(() => {
    onClick?.();
  }, [onClick]);
  
  useEffect(() => {
    // Effect logic
  }, []);
  
  if (!title) {
    return null;
  }
  
  return (
    <div className="component-container">
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
};
```

## Testing

### Running Tests
```bash
npm run test           # Run all tests
npm run test:watch     # Watch mode
npm run test:coverage  # With coverage
```

### Writing Tests
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Component } from './Component';

describe('Component', () => {
  it('renders with required props', () => {
    render(<Component title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('handles user interactions', () => {
    const handleClick = jest.fn();
    render(<Component title="Test" onClick={handleClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## Pull Request Process

### Before Submitting

1. **Run tests and checks**
```bash
npm run test
npm run check
npm run lint
```

2. **Update documentation**
- Update README if adding features
- Add JSDoc comments to new functions
- Update component documentation

3. **Test your changes**
- Test in different browsers
- Check responsive design
- Verify accessibility

### PR Template

```markdown
## Description
Brief description of changes made

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring
- [ ] Performance improvement

## Testing
- [ ] Tests pass locally
- [ ] Added tests for new functionality
- [ ] Manual testing completed

## Screenshots
If applicable, add screenshots of UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes
```

### Review Process

1. Automated checks must pass
2. Code review by maintainer
3. Address feedback
4. Approval and merge

## Issue Reporting

### Bug Reports

```markdown
**Describe the bug**
Clear description of what the bug is

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. See error

**Expected behavior**
What you expected to happen

**Screenshots**
If applicable, add screenshots

**Environment:**
- OS: [e.g. Windows 10]
- Browser: [e.g. Chrome 91]
- Version: [e.g. 1.0.0]
```

### Feature Requests

```markdown
**Feature Description**
Clear description of the feature

**Problem Statement**
What problem does this solve?

**Proposed Solution**
How should this be implemented?

**Alternatives**
Any alternative solutions considered?

**Additional Context**
Any other relevant information
```

## Development Guidelines

### Performance

- Use React.memo for expensive components
- Implement lazy loading for large components
- Optimize images and assets
- Monitor bundle size

### Accessibility

- Use semantic HTML elements
- Provide alt text for images
- Ensure keyboard navigation
- Maintain color contrast ratios
- Test with screen readers

### Security

- Sanitize user inputs
- Use HTTPS in production
- Implement CSP headers
- Avoid exposing sensitive data

## Questions and Support

If you have questions about contributing:

1. Check existing documentation
2. Search existing issues
3. Create a new issue with the "question" label
4. Reach out to maintainers

Thank you for contributing to this project!
