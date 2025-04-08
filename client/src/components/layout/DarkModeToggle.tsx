import { useState, useEffect } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { FaMoon, FaSun } from 'react-icons/fa';
import { motion } from 'framer-motion';

const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // After component mounts, we can safely show the toggle
  // This prevents hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <motion.button
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-6 right-6 p-3 rounded-full bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 z-50"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        <FaSun className="h-6 w-6 text-yellow-400" />
      ) : (
        <FaMoon className="h-6 w-6 text-slate-800" />
      )}
    </motion.button>
  );
};

export default DarkModeToggle;
