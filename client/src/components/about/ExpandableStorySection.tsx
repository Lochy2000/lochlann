import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface ExpandableStorySectionProps {
  title: string;
  summary: string;
  fullContent: string;
}

const ExpandableStorySection: React.FC<ExpandableStorySectionProps> = ({
  title,
  summary,
  fullContent,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mb-6">
      <h4 className="text-xl font-space font-bold mb-2 text-slate-800 dark:text-white">
        {title}
      </h4>
      
      <p className="text-slate-600 dark:text-slate-300">
        {summary}
      </p>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              {fullContent}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      
      <button
        onClick={toggleExpand}
        className="mt-2 flex items-center text-primary hover:text-primary-dark transition-colors duration-200 text-sm font-medium"
      >
        {isExpanded ? (
          <>
            Read less <FaChevronUp className="ml-1" />
          </>
        ) : (
          <>
            Read more <FaChevronDown className="ml-1" />
          </>
        )}
      </button>
    </div>
  );
};

export default ExpandableStorySection;
