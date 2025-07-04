import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface EnhancedBackgroundProps {
  children: ReactNode;
  variant?: 'default' | 'gradient' | 'minimal';
  className?: string;
}

const EnhancedBackground: React.FC<EnhancedBackgroundProps> = ({ 
  children, 
  variant = 'default',
  className = ''
}) => {
  const getBackgroundClass = () => {
    switch (variant) {
      case 'gradient':
        return 'animated-gradient-bg';
      case 'minimal':
        return 'bg-slate-50 dark:bg-slate-900';
      default:
        return 'bg-slate-900';
    }
  };

  return (
    <div className={`relative min-h-screen ${getBackgroundClass()} grain-overlay ${className}`}>
      {/* Floating Orbs */}
      {variant !== 'minimal' && (
        <div className="floating-orbs">
          <div className="orb"></div>
          <div className="orb"></div>
          <div className="orb"></div>
          <div className="orb"></div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Section Divider */}
      <div className="section-divider"></div>
    </div>
  );
};

export default EnhancedBackground;