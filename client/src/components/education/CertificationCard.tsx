import { motion } from 'framer-motion';
import { FaAward } from 'react-icons/fa';

interface CertificationCardProps {
  title: string;
  issuer: string;
  date: string;
  skills: string[];
}

const CertificationCard: React.FC<CertificationCardProps> = ({
  title,
  issuer,
  date,
  skills
}) => {
  return (
    <motion.div 
      className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 hover:border-primary/50 dark:hover:border-primary/50 transition-all"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
          <FaAward className="w-6 h-6 text-primary" />
        </div>
        <div>
          <div className="flex justify-between items-start">
            <h4 className="font-space font-bold text-slate-800 dark:text-white">{title}</h4>
            <span className="text-xs text-slate-500 dark:text-slate-400">{date}</span>
          </div>
          <p className="text-primary dark:text-primary-light text-sm">{issuer}</p>
          <p className="mt-2 text-slate-600 dark:text-slate-300 text-sm">
            Skills: {skills.join(', ')}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default CertificationCard;
