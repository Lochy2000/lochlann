import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSearch, FaBars, FaTimes, FaCoffee, FaCodeBranch, FaLaptopCode, FaLock } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { isMobileDevice, debounce } from '../utils/mobileDetection';

const BlogHeader: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect mobile device
  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);
  
  // Determine if we're in local development
  const isLocalDevelopment = window.location.port === "5001";
  // For standalone deployment, we'll link to the main site
  const mainSiteUrl = isLocalDevelopment 
    ? "http://localhost:5000" 
    : window.location.hostname.includes('lochlann-deh4.vercel.app') 
      ? "https://lochlann.vercel.app"
      : "/";

  useEffect(() => {
    // Debounced scroll handler for better mobile performance
    const handleScroll = debounce(() => {
      setIsScrolled(window.scrollY > 10);
    }, isMobile ? 100 : 50); // Longer debounce on mobile
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (searchOpen) setSearchOpen(false);
    
    // Prevent body scroll when mobile menu is open
    if (!mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (mobileMenuOpen) {
      closeMobileMenu();
    }
  };

  // Close mobile menu on route changes
  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname]);

  // Clean up body overflow on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
    // Reset search
    setSearchQuery('');
    setSearchOpen(false);
  };

  // Use our blog-specific header class
  const headerClasses = `w-full blog-header ${
    isScrolled 
      ? 'bg-white/90 dark:bg-dark/90 shadow-md' 
      : 'bg-transparent'
  } backdrop-blur-md transition-all duration-300 z-50`;

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <a 
          href="/" 
          className="flex items-center space-x-2 z-50"
        >
          <img
            src="https://res.cloudinary.com/dpw2txejq/image/upload/v1746605161/lego-loch_r7voyr.png"
            alt="Profile image"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-space font-semibold text-xl text-slate-800 dark:text-white">
            <span className="hidden sm:inline">Lochlann's</span> Tech Blog
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          <a
            href="/"
            className={`${
              location.pathname === '/' || location.pathname === ''  || location.pathname === '/#/' || location.pathname === '/#'
                ? 'text-primary dark:text-primary-light' 
                : 'text-slate-700 dark:text-slate-300'
            } hover:text-primary dark:hover:text-primary-light transition-colors font-medium px-2 py-1`}
          >
            Home
          </a>
          <Link 
            to="/category/web-development"
            className={`${
              location.pathname.includes('/category/web-development') 
                ? 'text-primary dark:text-primary-light' 
                : 'text-slate-700 dark:text-slate-300'
            } hover:text-primary dark:hover:text-primary-light transition-colors font-medium flex items-center gap-1 px-2 py-1`}>
            <FaLaptopCode className="text-sm" /> Web Dev
          </Link>
          <Link 
            to="/category/react"
            className={`${
              location.pathname.includes('/category/react') 
                ? 'text-primary dark:text-primary-light' 
                : 'text-slate-700 dark:text-slate-300'
            } hover:text-primary dark:hover:text-primary-light transition-colors font-medium flex items-center gap-1 px-2 py-1`}>
            <FaCodeBranch className="text-sm" /> React
          </Link>
          <Link 
            to="/category/coffee-thoughts"
            className={`${
              location.pathname.includes('/category/coffee-thoughts') 
                ? 'text-primary dark:text-primary-light' 
                : 'text-slate-700 dark:text-slate-300'
            } hover:text-primary dark:hover:text-primary-light transition-colors font-medium flex items-center gap-1 px-2 py-1`}>
            <FaCoffee className="text-sm" /> Coffee Thoughts
          </Link>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSearch}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Search blog"
            >
              <FaSearch className="w-4 h-4" />
            </button>
            <ThemeToggle />
          </div>
          
          {isAuthenticated && (
            <Link 
              to="/admin"
              className="lofi-button-secondary flex items-center gap-1"
            >
              <FaLock className="text-sm" /> Admin
            </Link>
          )}
        </nav>
        
        {/* Mobile Menu Button and Search */}
        <div className="flex items-center space-x-2 md:hidden">
          <button
            onClick={toggleSearch}
            className="p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            aria-label="Search blog"
          >
            <FaSearch className="w-4 h-4" />
          </button>
          <ThemeToggle />
          <button 
            className="p-2 text-slate-700 dark:text-white"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
          >
            {mobileMenuOpen ? (
              <FaTimes className="h-6 w-6" />
            ) : (
              <FaBars className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-white dark:bg-dark shadow-md z-40 border-t border-slate-200 dark:border-slate-700"
          >
            <div className="container mx-auto px-4 py-4">
              <form onSubmit={handleSearch} className="flex items-center">
                <input
                  type="text"
                  placeholder="Search articles, tutorials, projects..."
                  className="lofi-input w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button 
                  type="submit"
                  className="lofi-button ml-2 px-4 py-2"
                >
                  Search
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-slate-900/95 backdrop-blur-sm flex flex-col"
          >
            <div className="flex justify-end p-4">
              <button
                onClick={closeMobileMenu}
                className="text-slate-200 hover:text-white"
                aria-label="Close mobile menu"
              >
                <FaTimes className="h-6 w-6" />
              </button>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 space-y-6 text-lg">
              <a
                href="/"
                className={`text-slate-300 hover:text-primary-light font-medium ${
                  location.pathname === '/' ? 'text-primary-light' : ''
                }`}
                onClick={closeMobileMenu}
              >
                Home
              </a>
              <Link
                to="/category/web-development"
                className={`text-slate-300 hover:text-primary-light font-medium flex items-center gap-2 ${
                  location.pathname.includes('/category/web-development') ? 'text-primary-light' : ''
                }`}
                onClick={closeMobileMenu}
              >
                <FaLaptopCode /> Web Dev
              </Link>
              <Link
                to="/category/react"
                className={`text-slate-300 hover:text-primary-light font-medium flex items-center gap-2 ${
                  location.pathname.includes('/category/react') ? 'text-primary-light' : ''
                }`}
                onClick={closeMobileMenu}
              >
                <FaCodeBranch /> React
              </Link>
              <Link
                to="/category/coffee-thoughts"
                className={`text-slate-300 hover:text-primary-light font-medium flex items-center gap-2 ${
                  location.pathname.includes('/category/coffee-thoughts') ? 'text-primary-light' : ''
                }`}
                onClick={closeMobileMenu}
              >
                <FaCoffee /> Coffee Thoughts
              </Link>
              
              {isAuthenticated && (
                <Link 
                  to="/admin"
                  className="lofi-button-secondary mt-4 flex items-center gap-2"
                  onClick={closeMobileMenu}
                >
                  <FaLock /> Admin
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default BlogHeader;
