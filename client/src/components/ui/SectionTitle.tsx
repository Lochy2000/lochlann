import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionTitleProps {
  title: string | ReactNode;
  subtitle?: string;
  light?: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, light = false }) => {
  return (
    <motion.div 
      className="text-center mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className={`text-3xl md:text-5xl font-space font-bold mb-4 inline-block ${light ? 'text-white' : 'text-gradient'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`max-w-2xl mx-auto ${light ? 'text-slate-300' : 'text-slate-600 dark:text-slate-300'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionTitle;
