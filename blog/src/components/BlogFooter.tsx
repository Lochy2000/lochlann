import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaTwitter, FaLinkedin, FaCoffee, FaRss, FaCode } from 'react-icons/fa';

const currentYear = new Date().getFullYear();

// Determine if we're in local development
const isLocalDevelopment = window.location.port === "5001";
const mainSiteUrl = isLocalDevelopment ? "http://localhost:5000" : "/";

const BlogFooter: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-lofi-terminal border-t border-slate-200 dark:border-slate-800 mt-20">
      <div className="container mx-auto py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-space font-bold shadow-lofi">
                L
              </div>
              <span className="font-space font-semibold text-xl text-slate-800 dark:text-white">
                Lochlann's Tech Blog
              </span>
            </Link>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Tutorials, insights, and musings on web development, AI, and lo-fi aesthetics. 
              Join me as I navigate the tech world as a junior developer.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary-light transition-colors"
                aria-label="GitHub Profile"
              >
                <FaGithub className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary-light transition-colors"
                aria-label="Twitter Profile"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com/in/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary-light transition-colors"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-space font-bold text-slate-900 dark:text-white text-lg mb-4">
              Categories
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/category/tutorials" 
                  className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary-light transition-colors flex items-center gap-2"
                >
                  <FaCode className="text-xs" /> Tutorials
                </Link>
              </li>
              <li>
                <Link 
                  to="/category/projects" 
                  className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary-light transition-colors flex items-center gap-2"
                >
                  <FaCode className="text-xs" /> Projects
                </Link>
              </li>
              <li>
                <Link 
                  to="/category/coffee-thoughts" 
                  className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary-light transition-colors flex items-center gap-2"
                >
                  <FaCoffee className="text-xs" /> Coffee Thoughts
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-space font-bold text-slate-900 dark:text-white text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/tags/react" 
                  className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary-light transition-colors"
                >
                  React
                </Link>
              </li>
              <li>
                <Link 
                  to="/tags/typescript" 
                  className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary-light transition-colors"
                >
                  TypeScript
                </Link>
              </li>
              <li>
                <Link 
                  to="/tags/ai" 
                  className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary-light transition-colors"
                >
                  AI & Machine Learning
                </Link>
              </li>
              <li>
                <Link 
                  to="/tags/lofi" 
                  className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary-light transition-colors"
                >
                  Lo-Fi Design
                </Link>
              </li>
              <li>
                <a 
                  href="/rss.xml" 
                  className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary-light transition-colors flex items-center gap-2"
                >
                  <FaRss className="text-xs" /> RSS Feed
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="my-8 border-slate-200 dark:border-slate-700" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            &copy; {currentYear} Lochlann O'Higgins. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-slate-500 dark:text-slate-400 text-sm hover:text-primary dark:hover:text-primary-light transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-slate-500 dark:text-slate-400 text-sm hover:text-primary dark:hover:text-primary-light transition-colors">
              Terms of Use
            </Link>
            <Link to="/sitemap" className="text-slate-500 dark:text-slate-400 text-sm hover:text-primary dark:hover:text-primary-light transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default BlogFooter;