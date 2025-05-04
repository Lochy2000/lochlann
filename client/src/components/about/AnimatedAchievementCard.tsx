import { useState } from 'react';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';

interface AnimatedAchievementCardProps {
  title: string;
  description: string;
  detailedDescription: string;
  icon: IconType;
  color: string;
}

const AnimatedAchievementCard: React.FC<AnimatedAchievementCardProps> = ({
  title,
  description,
  detailedDescription,
  icon: Icon,
  color,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className="relative h-64 w-full perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="flip-card-inner absolute w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        {/* Front of card */}
        <motion.div
          className={`flip-card-front absolute w-full h-full bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border-2 flex flex-col justify-between ${
            isHovered ? `border-${color}` : 'border-slate-200 dark:border-slate-700'
          }`}
          whileHover={{ y: -10, transition: { duration: 0.2 } }}
        >
          <div>
            <div className={`w-12 h-12 rounded-lg bg-${color.split('-')[0]}-500/10 dark:bg-${color.split('-')[0]}-500/20 flex items-center justify-center mb-4`}>
              <Icon className={`text-2xl text-${color}`} />
            </div>
            <h4 className="font-space font-bold text-lg mb-2 text-slate-800 dark:text-white">{title}</h4>
            <p className="text-slate-600 dark:text-slate-300 text-sm">
              {description}
            </p>
          </div>
          
          <button
            onClick={handleFlip}
            className={`mt-4 text-sm font-medium text-${color} hover:text-${color.split('-')[0]}-600 flex items-center transition-colors duration-200 read-more`}
          >
            Learn more
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1 read-more-arrow"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </motion.div>

        {/* Back of card */}
        <motion.div
          className={`flip-card-back absolute w-full h-full bg-${color.split('-')[0]}-500/5 dark:bg-${color.split('-')[0]}-500/10 p-6 rounded-xl shadow-lg border-2 border-${color} flex flex-col justify-between`}
        >
          <div>
            <h4 className={`font-space font-bold text-lg mb-3 text-${color}`}>{title}</h4>
            <p className="text-slate-700 dark:text-slate-200 text-sm">
              {detailedDescription}
            </p>
          </div>
          
          <button
            onClick={handleFlip}
            className={`mt-4 text-sm font-medium text-${color} hover:text-${color.split('-')[0]}-600 flex items-center transition-colors duration-200 read-more`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1 read-more-arrow"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AnimatedAchievementCard;
