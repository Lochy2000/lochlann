import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope, FaTwitter } from 'react-icons/fa';

const BlogFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-slate-900 dark:bg-darker">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-space font-bold mr-3">
              L
            </div>
            <span className="font-space font-semibold text-xl text-white">Lochlann O'Higgins</span>
          </div>
          
          <div className="flex space-x-6 mb-6 md:mb-0">
            <a 
              href="https://github.com/lochlannohiggins" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-primary-light transition-colors"
              aria-label="GitHub"
            >
              <FaGithub className="text-2xl" />
            </a>
            <a 
              href="https://linkedin.com/in/lochlann-ohiggins" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-primary-light transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="text-2xl" />
            </a>
            <a 
              href="mailto:Lochlann_oht@hotmail.com" 
              className="text-slate-400 hover:text-primary-light transition-colors"
              aria-label="Email"
            >
              <FaEnvelope className="text-2xl" />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-primary-light transition-colors"
              aria-label="Twitter"
            >
              <FaTwitter className="text-2xl" />
            </a>
          </div>
          
          <div className="text-slate-400 text-sm flex justify-between items-center">
            <span>&copy; {currentYear} Lochlann O'Higgins. All rights reserved.</span>
            <Link to="/privacy-policy" className="hover:text-primary-light transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default BlogFooter;