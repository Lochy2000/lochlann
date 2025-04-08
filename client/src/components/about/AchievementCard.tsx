import { motion } from 'framer-motion';
import { IconType } from 'react-icons';

interface AchievementCardProps {
  title: string;
  description: string;
  icon: IconType;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ title, description, icon: Icon }) => {
  return (
    <motion.div 
      className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="w-12 h-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4">
        <Icon className="text-2xl text-primary" />
      </div>
      <h4 className="font-space font-bold text-lg mb-2 text-slate-800 dark:text-white">{title}</h4>
      <p className="text-slate-600 dark:text-slate-300 text-sm">
        {description}
      </p>
    </motion.div>
  );
};

export default AchievementCard;
