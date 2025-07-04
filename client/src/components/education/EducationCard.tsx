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
      className="bg-slate-800/50 p-6 rounded-xl shadow-md border border-blue-500/30 hover:border-cyan-400/60 transition-all duration-300 group backdrop-blur-sm"
      whileHover={{ 
        y: -5,
        boxShadow: '0 10px 30px rgba(59, 130, 246, 0.2)'
      }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-space font-bold text-white group-hover:text-cyan-400 transition-colors">{title}</h4>
          <p className="text-blue-400">{institution}</p>
        </div>
        <span className="text-sm text-slate-400">{period}</span>
      </div>
      <p className="mt-3 text-slate-300 text-sm">
        {description}
      </p>
    </motion.div>
  );
};

export default EducationCard;
