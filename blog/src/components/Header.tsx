import React from 'react';

import { useTheme } from '../../../client/src/components/ThemeProvider';

const Header: React.FC = () => {
  const { theme } = useTheme();

  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-800';
  const linkTextColor = theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-800';

  return (
    <header className={`w-full bg-gray-100 dark:bg-gray-800 shadow-md`}>
      <div className="container mx-auto py-4 px-6">
        <nav className="flex items-center justify-between">
          <a href="/" className={`text-2xl font-bold ${textColor}`}>My Blog</a>
          <ul className="flex space-x-4">
            <li><a href="/" className={linkTextColor}>Home</a></li>
            <li><a href="/categories" className={linkTextColor}>Categories</a></li>
            <li><a href="/about" className={linkTextColor}>About</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;