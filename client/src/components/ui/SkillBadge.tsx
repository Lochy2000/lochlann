import { motion } from 'framer-motion';

interface SkillBadgeProps {
  name: string;
  variant?: 'default' | 'accent' | 'secondary';
}

const SkillBadge: React.FC<SkillBadgeProps> = ({ name, variant = 'default' }) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'accent':
        return 'px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200 text-sm font-medium border border-emerald-200 dark:border-emerald-800';
      case 'secondary':
        return 'px-3 py-1 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200 text-sm font-medium border border-purple-200 dark:border-purple-800';
      default:
        return 'px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-primary/20 dark:text-primary-light text-sm font-medium border border-blue-200 dark:border-primary/30';
    }
  };

  return (
    <motion.span 
      className={getVariantClasses()}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {name}
    </motion.span>
  );
};

export default SkillBadge;
