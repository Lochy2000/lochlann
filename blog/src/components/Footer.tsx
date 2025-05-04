

import { useTheme } from '../../../client/src/components/ThemeProvider';

const Footer: React.FC = () => {
  const { theme } = useTheme();

  const textColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const linkTextColor = theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-800';

  return (
    <footer className="py-12 bg-gray-100 dark:bg-gray-800 mt-8">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <p className={textColor}>&copy; {new Date().getFullYear()} My Blog. All rights reserved.</p>
        <div className="flex space-x-4">
          <a href="#" className={linkTextColor}>Twitter</a>
          <a href="#" className={linkTextColor}>LinkedIn</a>
          <a href="#" className={linkTextColor}>GitHub</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;