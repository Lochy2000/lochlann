import React from 'react';
import { useTheme } from '../../../client/src/components/ThemeProvider';

const FeaturedPosts: React.FC = () => {
  const { theme } = useTheme();
  const cardBgColor = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-700';

  return (
    <section className="py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8">Featured Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Featured post cards will go here */}
          <div className={`${cardBgColor} rounded-lg shadow-md overflow-hidden`}>
            <img src="https://via.placeholder.com/600x400" alt="Featured Post" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Featured Post Title</h3>
              <p className={`${textColor}`}>Featured post description goes here.</p>
              <a href="#" className="inline-block mt-4 text-blue-500 hover:text-blue-700">Read More</a>
            </div>
          </div>
          <div className={`${cardBgColor} rounded-lg shadow-md overflow-hidden`}>
            <img src="https://via.placeholder.com/600x400" alt="Featured Post" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Featured Post Title</h3>
              <p className={`${textColor}`}>Featured post description goes here.</p>
              <a href="#" className="inline-block mt-4 text-blue-500 hover:text-blue-700">Read More</a>
            </div>
          </div>
          <div className={`${cardBgColor} rounded-lg shadow-md overflow-hidden`}>
            <img src="https://via.placeholder.com/600x400" alt="Featured Post" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Featured Post Title</h3>
              <p className={`${textColor}`}>Featured post description goes here.</p>
              <a href="#" className="inline-block mt-4 text-blue-500 hover:text-blue-700">Read More</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;