import { motion } from 'framer-motion';

interface TechBackgroundProps {
  variant?: 'portfolio' | 'about' | 'experience' | 'home' | 'contact';
  intensity?: 'subtle' | 'medium' | 'strong';
}

const TechBackground: React.FC<TechBackgroundProps> = ({ 
  variant = 'portfolio', 
  intensity = 'medium' 
}) => {
  // Color schemes for different pages
  const colorSchemes = {
    portfolio: {
      primary: 'rgba(139, 92, 246, 0.4)', // Purple
      secondary: 'rgba(6, 182, 212, 0.3)', // Cyan
      accent: 'rgba(34, 197, 94, 0.2)', // Green
    },
    about: {
      primary: 'rgba(59, 130, 246, 0.4)', // Blue
      secondary: 'rgba(139, 92, 246, 0.3)', // Purple
      accent: 'rgba(6, 182, 212, 0.2)', // Cyan
    },
    experience: {
      primary: 'rgba(34, 197, 94, 0.4)', // Green
      secondary: 'rgba(59, 130, 246, 0.3)', // Blue
      accent: 'rgba(139, 92, 246, 0.2)', // Purple
    },
    home: {
      primary: 'rgba(6, 182, 212, 0.4)', // Cyan
      secondary: 'rgba(139, 92, 246, 0.3)', // Purple
      accent: 'rgba(34, 197, 94, 0.2)', // Green
    },
    contact: {
      primary: 'rgba(251, 146, 60, 0.4)', // Orange
      secondary: 'rgba(139, 92, 246, 0.3)', // Purple
      accent: 'rgba(59, 130, 246, 0.2)', // Blue
    }
  };

  const colors = colorSchemes[variant];
  const opacityMultiplier = intensity === 'subtle' ? 1.2 : intensity === 'strong' ? 1.5 : 1;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Tech grid pattern */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, ${colors.primary} 2px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Matrix-style grid lines */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(90deg, ${colors.secondary} 1px, transparent 1px),
            linear-gradient(${colors.secondary} 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />
      
      {/* Floating tech elements - slower and more subtle */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`vertical-${i}`}
            className="absolute w-0.5 h-32 bg-gradient-to-b from-transparent to-transparent"
            style={{
              left: `${10 + i * 15}%`,
              top: `${Math.random() * 80}%`,
              background: `linear-gradient(to bottom, transparent, ${colors.primary}, transparent)`
            }}
            animate={{
              scaleY: [0, 1, 0],
              opacity: [0, opacityMultiplier * 0.8, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 4, // Slower animation
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Horizontal scanning lines - slower */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`horizontal-${i}`}
            className="absolute h-0.5 w-full"
            style={{
              top: `${25 + i * 25}%`,
              background: `linear-gradient(to right, transparent, ${colors.accent}, transparent)`
            }}
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, opacityMultiplier * 0.6, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4, // Much slower
              repeat: Infinity,
              delay: Math.random() * 6,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Subtle floating orbs */}
      <div className="absolute inset-0">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${60 + i * 15}px`,
              height: `${60 + i * 15}px`,
              background: `radial-gradient(circle, ${colors.primary}, transparent)`,
              left: `${20 + i * 20}%`,
              top: `${15 + i * 20}%`,
              filter: 'blur(2px)',
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.2 * opacityMultiplier, 0.5 * opacityMultiplier, 0.2 * opacityMultiplier],
            }}
            transition={{
              duration: 12 + i * 2, // Very slow movement
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TechBackground;
