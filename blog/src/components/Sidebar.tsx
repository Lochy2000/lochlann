import React from 'react';
import { useTheme } from '../../../client/src/components/ThemeProvider';

const Sidebar: React.FC = () => {
  const { theme } = useTheme();
  const bgColor = theme === 'dark' ? 'bg-gray-800' : 'bg-white';

  return (
    <aside className="py-12">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4">Stay Connected</h2>
        <div className="flex space-x-4 mb-8">
          <a href="#" className="text-blue-500 hover:text-blue-700">Twitter</a>
          <a href="#" className="text-blue-500 hover:text-blue-700">LinkedIn</a>
          <a href="#" className="text-blue-500 hover:text-blue-700">GitHub</a>
        </div>
        <div className={`${bgColor} rounded-lg shadow-md p-6`}>
          <h3 className="text-xl font-bold mb-4">Subscribe to Newsletter</h3>
          <form>
            <input type="email" placeholder="Your email address" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button type="submit" className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700">Subscribe</button>
          </form>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;