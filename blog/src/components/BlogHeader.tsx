import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const BlogHeader = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Use our blog-specific header class
  const headerClasses = `w-full blog-header ${isScrolled ? 'bg-light/90 dark:bg-dark/90 shadow-sm' : 'bg-transparent'} backdrop-blur-md transition-all duration-300`;

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div>
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-space font-bold">
              L
            </div>
            <span className="font-space font-semibold text-xl dark:text-white">Lochlann Blog</span>
          </Link>
        </div>

        {/* Search Bar */}
        <div>
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 rounded-full text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light"
          />
        </div>

        {/* Desktop Navigation - Blog specific links */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className={`${location.pathname === '/' ? 'text-primary dark:text-primary-light' : 'text-slate-700 dark:text-slate-300'} hover:text-primary dark:hover:text-primary-light transition-colors`}
          >
            Blog Home
          </Link>
          <Link 
            to="/categories"
            className={`${location.pathname === '/categories' ? 'text-primary dark:text-primary-light' : 'text-slate-700 dark:text-slate-300'} hover:text-primary dark:hover:text-primary-light transition-colors`}>
            Categories
          </Link>
          <Link 
            to="/archives"
            className={`${location.pathname === '/archives' ? 'text-primary dark:text-primary-light' : 'text-slate-700 dark:text-slate-300'} hover:text-primary dark:hover:text-primary-light transition-colors`}>
            Archives
          </Link>
          <Link 
            to="/tags"
            className={`${location.pathname === '/tags' ? 'text-primary dark:text-primary-light' : 'text-slate-700 dark:text-slate-300'} hover:text-primary dark:hover:text-primary-light transition-colors`}>
            Tags
          </Link>
          <Link 
            to="/about"
            className={`${location.pathname === '/about' ? 'text-primary dark:text-primary-light' : 'text-slate-700 dark:text-slate-300'} hover:text-primary dark:hover:text-primary-light transition-colors`}>
            About Blog
          </Link>
          <a 
            href="http://localhost:5000" 
            className="px-5 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-medium hover:shadow-lg transition-all glow-effect">
            Main Site
          </a>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-slate-700 dark:text-white"
          onClick={toggleMobileMenu}
          aria-label="Open mobile menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default BlogHeader;