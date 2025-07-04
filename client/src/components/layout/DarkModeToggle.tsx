import { useState, useEffect } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { FaMoon, FaSun } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const DarkModeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // After component mounts, we can safely show the toggle
  // This prevents hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <motion.button
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-6 right-6 p-3 rounded-full bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 z-50 hover:shadow-xl transition-all duration-300 group"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 180, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'dark' ? (
          <FaSun className="h-6 w-6 text-yellow-400 group-hover:text-yellow-300 transition-colors" />
        ) : (
          <FaMoon className="h-6 w-6 text-slate-800 group-hover:text-slate-600 transition-colors" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default DarkModeToggle;
