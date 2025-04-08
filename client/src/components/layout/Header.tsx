import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import MobileMenu from './MobileMenu';

const Header = () => {
  const [location] = useLocation();
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

  const headerClasses = `fixed w-full ${
    isScrolled ? 'bg-light/90 dark:bg-dark/90 shadow-sm' : 'bg-transparent'
  } backdrop-blur-md z-40 transition-all duration-300`;

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-space font-bold">
            L
          </div>
          <span className="font-space font-semibold text-xl dark:text-white">Lochlann</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            href="/" 
            className={`${location === '/' ? 'text-primary dark:text-primary-light' : 'text-slate-700 dark:text-white'} hover:text-primary dark:hover:text-primary-light transition-colors`}>
            Home
          </Link>
          <Link 
            href="/about" 
            className={`${location === '/about' ? 'text-primary dark:text-primary-light' : 'text-slate-700 dark:text-white'} hover:text-primary dark:hover:text-primary-light transition-colors`}>
            About
          </Link>
          <Link 
            href="/experience" 
            className={`${location === '/experience' ? 'text-primary dark:text-primary-light' : 'text-slate-700 dark:text-white'} hover:text-primary dark:hover:text-primary-light transition-colors`}>
            Experience
          </Link>
          <Link 
            href="/portfolio" 
            className={`${location === '/portfolio' ? 'text-primary dark:text-primary-light' : 'text-slate-700 dark:text-white'} hover:text-primary dark:hover:text-primary-light transition-colors`}>
            Portfolio
          </Link>
          <Link 
            href="/blog" 
            className={`${location === '/blog' ? 'text-primary dark:text-primary-light' : 'text-slate-700 dark:text-white'} hover:text-primary dark:hover:text-primary-light transition-colors`}>
            Blog
          </Link>
          <Link 
            href="/contact" 
            className="px-5 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-medium hover:shadow-lg transition-all glow-effect">
            Contact
          </Link>
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
      
      <MobileMenu isOpen={mobileMenuOpen} onClose={toggleMobileMenu} />
    </header>
  );
};

export default Header;
