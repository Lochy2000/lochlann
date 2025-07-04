import { useState } from 'react';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';

interface EnhancedAchievementCardProps {
  title: string;
  description: string;
  detailedDescription?: string;
  icon: IconType;
  color?: string;
  date?: string;
  category?: string;
}

const EnhancedAchievementCard: React.FC<EnhancedAchievementCardProps> = ({
  title,
  description,
  detailedDescription,
  icon: Icon,
  color = 'primary',
  date,
  category
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const colorMap: Record<string, { primary: string; bg: string; border: string }> = {
    primary: { 
      primary: 'text-primary', 
      bg: 'bg-blue-50 dark:bg-blue-900/20', 
      border: 'border-blue-200 dark:border-blue-800'
    },
    'blue-500': { 
      primary: 'text-blue-600 dark:text-blue-400', 
      bg: 'bg-blue-50 dark:bg-blue-900/20', 
      border: 'border-blue-200 dark:border-blue-800'
    },
    'green-500': { 
      primary: 'text-green-600 dark:text-green-400', 
      bg: 'bg-green-50 dark:bg-green-900/20', 
      border: 'border-green-200 dark:border-green-800'
    },
    'purple-500': { 
      primary: 'text-purple-600 dark:text-purple-400', 
      bg: 'bg-purple-50 dark:bg-purple-900/20', 
      border: 'border-purple-200 dark:border-purple-800'
    },
    'cyan-500': { 
      primary: 'text-cyan-600 dark:text-cyan-400', 
      bg: 'bg-cyan-50 dark:bg-cyan-900/20', 
      border: 'border-cyan-200 dark:border-cyan-800'
    },
    'orange-500': { 
      primary: 'text-orange-600 dark:text-orange-400', 
      bg: 'bg-orange-50 dark:bg-orange-900/20', 
      border: 'border-orange-200 dark:border-orange-800'
    }
  };

  const colors = colorMap[color] || colorMap.primary;

  return (
    <motion.div
      className="relative h-64 w-full cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => detailedDescription && setIsFlipped(!isFlipped)}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="flip-card-inner absolute w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of card */}
        <motion.div
          className={`flip-card-front absolute w-full h-full bg-white dark:bg-slate-800 p-6 rounded-xl border ${colors.border} flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-md`}
          style={{ backfaceVisibility: "hidden" }}
          animate={{
            borderColor: isHovered ? 'rgba(59, 130, 246, 0.5)' : undefined
          }}
        >
          {/* Tech border effect */}
          <motion.div
            className="absolute inset-0 rounded-xl"
            animate={{
              background: isHovered 
                ? 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.05), transparent)'
                : 'transparent'
            }}
            transition={{ duration: 0.3 }}
          />

          <div className="relative z-10">
            {/* Icon */}
            <div className={`w-12 h-12 rounded-lg ${colors.bg} flex items-center justify-center mb-4 ${colors.border} border`}>
              <Icon className={`text-xl ${colors.primary}`} />
            </div>

            <h4 className="font-space font-bold text-lg mb-2 text-slate-900 dark:text-white leading-tight">
              {title}
            </h4>
            
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              {description}
            </p>
          </div>

          {/* Learn more button */}
          {detailedDescription && (
            <motion.button
              onClick={() => setIsFlipped(!isFlipped)}
              className={`mt-4 text-sm font-medium ${colors.primary} hover:underline flex items-center transition-colors duration-200`}
              whileHover={{ x: 2 }}
            >
              Learn more
              <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          )}
        </motion.div>

        {/* Back of card */}
        {detailedDescription && (
          <motion.div
            className={`flip-card-back absolute w-full h-full bg-white dark:bg-slate-800 p-6 rounded-xl border ${colors.border} flex flex-col justify-between shadow-sm`}
            style={{ 
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)"
            }}
          >
            <div>
              <h4 className={`font-space font-bold text-lg mb-3 ${colors.primary}`}>
                {title}
              </h4>
              
              <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed">
                {detailedDescription}
              </p>
            </div>

            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className={`mt-4 text-sm font-medium ${colors.primary} hover:underline flex items-center transition-colors duration-200`}
            >
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );

};

export default EnhancedAchievementCard;