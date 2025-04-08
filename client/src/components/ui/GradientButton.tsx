import { Button, ButtonProps } from '@/components/ui/button';
import { forwardRef } from 'react';

interface GradientButtonProps extends ButtonProps {
  withGlow?: boolean;
}

const GradientButton = forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ withGlow = true, className = '', children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={`bg-gradient-to-r from-primary to-secondary text-white font-medium hover:shadow-lg transition-all ${withGlow ? 'glow-effect' : ''} ${className}`}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

GradientButton.displayName = 'GradientButton';

export default GradientButton;
