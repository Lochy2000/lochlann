import { Button, ButtonProps } from '@/components/ui/button';
import { forwardRef } from 'react';

interface OutlineButtonProps extends ButtonProps {
  color?: 'primary' | 'secondary' | 'accent';
}

const OutlineButton = forwardRef<HTMLButtonElement, OutlineButtonProps>(
  ({ color = 'primary', className = '', children, ...props }, ref) => {
    // Tailwind classes based on color
    const colorClasses = {
      primary: 'border-primary dark:border-primary-light text-primary dark:text-primary-light hover:bg-primary/10',
      secondary: 'border-secondary dark:border-secondary-light text-secondary dark:text-secondary-light hover:bg-secondary/10',
      accent: 'border-accent dark:border-accent text-accent dark:text-accent hover:bg-accent/10',
    };

    return (
      <Button
        ref={ref}
        variant="outline"
        className={`border-2 font-medium transition-all ${colorClasses[color]} ${className}`}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

OutlineButton.displayName = 'OutlineButton';

export default OutlineButton;
