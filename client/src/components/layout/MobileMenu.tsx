import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getBlogUrl } from '@/lib/blogUrl';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const blogUrl = getBlogUrl();

  // Close the mobile menu when changing routes
  useEffect(() => {
    if (isOpen) onClose();
  }, [location.pathname, isOpen, onClose]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const menuVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          {/* Menu */}
          <motion.div
            className="fixed top-0 right-0 w-4/5 h-full bg-light dark:bg-darker shadow-xl z-50 p-6"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="flex justify-end">
              <button 
                className="text-slate-700 dark:text-white"
                onClick={onClose}
                aria-label="Close menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <motion.div className="flex flex-col space-y-6 mt-12">
              <motion.div variants={itemVariants}>
                <Link to="/" className="text-slate-700 dark:text-white text-lg font-medium">
                  Home
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link to="/about" className="text-slate-700 dark:text-white text-lg font-medium">
                  About
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link to="/experience" className="text-slate-700 dark:text-white text-lg font-medium">
                  Experience
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link to="/portfolio" className="text-slate-700 dark:text-white text-lg font-medium">
                  Portfolio
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <a href={blogUrl} className="text-slate-700 dark:text-white text-lg font-medium">
                  Blog
                </a>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link to="/contact" className="w-full px-5 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-medium text-center block">
                  Contact
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
