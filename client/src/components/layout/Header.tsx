import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MobileMenu from './MobileMenu';
import { getBlogUrl } from '@/lib/blogUrl';

const Header = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const blogUrl = getBlogUrl();

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
    isScrolled ? 'bg-white/90 dark:bg-slate-900/90 shadow-sm' : 'bg-transparent'
  } backdrop-blur-md z-50 transition-all duration-300`;

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="https://res.cloudinary.com/dpw2txejq/image/upload/v1746605161/lego-loch_r7voyr.png"
            alt="Profile image"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-space font-semibold text-xl dark:text-white">Lochlann</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/"
            className={`${location.pathname === '/' ? 'text-primary dark:text-primary-light' : 'text-slate-700 dark:text-slate-300'} hover:text-primary dark:hover:text-primary-light transition-colors`}>
            Home
          </Link>
          <Link 
            to="/about"
            className={`${location.pathname === '/about' ? 'text-primary dark:text-primary-light' : 'text-slate-700 dark:text-slate-300'} hover:text-primary dark:hover:text-primary-light transition-colors`}>
            About
          </Link>
          <Link 
            to="/experience"
            className={`${location.pathname === '/experience' ? 'text-primary dark:text-primary-light' : 'text-slate-700 dark:text-slate-300'} hover:text-primary dark:hover:text-primary-light transition-colors`}>
            Experience
          </Link>
          <Link 
            to="/portfolio"
            className={`${location.pathname === '/portfolio' ? 'text-primary dark:text-primary-light' : 'text-slate-700 dark:text-slate-300'} hover:text-primary dark:hover:text-primary-light transition-colors`}>
            Portfolio
          </Link>
          <Link 
            to="/marine-conservation"
            className={`${location.pathname === '/marine-conservation' ? 'text-primary dark:text-primary-light' : 'text-slate-700 dark:text-slate-300'} hover:text-primary dark:hover:text-primary-light transition-colors`}>
            Marine Conservation
          </Link>
          <a 
            href={blogUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary-light transition-colors">
            Blog
          </a>
          <Link 
            to="/contact" 
            className="px-5 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-medium hover:shadow-lg transition-all glow-effect">
            Contact
          </Link>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-slate-700 dark:text-white z-50 relative p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
          style={{ pointerEvents: 'auto' }}
        >
          {mobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>
      
      <MobileMenu isOpen={mobileMenuOpen} onClose={toggleMobileMenu} />
    </header>
  );
};

export default Header;
