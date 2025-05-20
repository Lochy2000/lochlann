import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCode } from 'react-icons/fa';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.5,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

const NotFound: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Lochlann's Tech Blog</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
      </Helmet>
      
      <motion.div 
        className="flex flex-col items-center justify-center py-16 px-4 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="terminal-window w-full max-w-xl mx-auto mb-8"
          variants={itemVariants}
        >
          <div className="terminal-header">
            <div className="terminal-button terminal-close"></div>
            <div className="terminal-button terminal-minimize"></div>
            <div className="terminal-button terminal-maximize"></div>
            <div className="ml-4 text-xs text-slate-400">404.sh</div>
          </div>
          <div className="terminal-body p-6">
            <p className="terminal-prompt">cd /blog/the-page-you-wanted</p>
            <p className="text-red-400 mt-2">Error: No such file or directory</p>
            <p className="terminal-prompt mt-4">ls -la /blog/</p>
            <p className="mt-2">
              drwxr-xr-x  2 lochlann  staff  home<br />
              drwxr-xr-x  2 lochlann  staff  tutorials<br />
              drwxr-xr-x  2 lochlann  staff  projects<br />
              drwxr-xr-x  2 lochlann  staff  about<br />
            </p>
            <p className="terminal-prompt mt-4">cd /blog/</p>
            <p className="text-green-400 mt-2">Successfully navigated to /blog/</p>
            <div className="mt-4 flex">
              <span className="terminal-prompt"></span>
              <span className="cursor-blink">_</span>
            </div>
          </div>
        </motion.div>
        
        <motion.h1 
          className="text-4xl font-bold mb-4 text-slate-800 dark:text-white font-space"
          variants={itemVariants}
        >
          404 - Page Not Found
        </motion.h1>
        
        <motion.p 
          className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-lg"
          variants={itemVariants}
        >
          The page you're looking for has been moved, deleted, or never existed in the first place. Let's get you back on track.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4"
          variants={itemVariants}
        >
          <Link 
            to="/"
            className="lofi-button flex items-center justify-center gap-2"
          >
            <FaArrowLeft /> Back to Blog Home
          </Link>
          
          <Link 
            to="/category/tutorials"
            className="lofi-button-secondary flex items-center justify-center gap-2"
          >
            <FaCode /> Explore Tutorials
          </Link>
        </motion.div>
      </motion.div>
    </>
  );
};

export default NotFound;