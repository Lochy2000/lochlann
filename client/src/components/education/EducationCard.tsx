import { motion } from 'framer-motion';

interface EducationCardProps {
  title: string;
  institution: string;
  period: string;
  description: string;
}

const EducationCard: React.FC<EducationCardProps> = ({
  title,
  institution,
  period,
  description
}) => {
  return (
    <motion.div 
      className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 hover:border-primary/50 dark:hover:border-primary/50 transition-all"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-space font-bold text-slate-800 dark:text-white">{title}</h4>
          <p className="text-primary dark:text-primary-light">{institution}</p>
        </div>
        <span className="text-sm text-slate-500 dark:text-slate-400">{period}</span>
      </div>
      <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm">
        {description}
      </p>
    </motion.div>
  );
};

export default EducationCard;
