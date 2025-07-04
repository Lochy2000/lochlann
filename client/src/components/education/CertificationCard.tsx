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
      className="bg-slate-800/50 p-6 rounded-xl shadow-md border border-blue-500/30 hover:border-cyan-400/60 transition-all duration-300 group backdrop-blur-sm"
      whileHover={{ 
        y: -5,
        boxShadow: '0 10px 30px rgba(59, 130, 246, 0.2)'
      }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 shrink-0 rounded-full bg-blue-500/10 flex items-center justify-center">
          <FaAward className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <div className="flex justify-between items-start">
            <h4 className="font-space font-bold text-white group-hover:text-cyan-400 transition-colors">{title}</h4>
            <span className="text-xs text-slate-400">{date}</span>
          </div>
          <p className="text-blue-400 text-sm">{issuer}</p>
          <p className="mt-2 text-slate-300 text-sm">
            Skills: {skills.join(', ')}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default CertificationCard;
