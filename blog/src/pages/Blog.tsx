import React from 'react';
import FeaturedPosts from '../components/FeaturedPosts';
import RecentPosts from '../components/RecentPosts';
import Sidebar from '../components/Sidebar';

const Blog: React.FC = () => {
  return (
    <div className="mt-24 container mx-auto px-4">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2 text-slate-800 dark:text-white">Blog</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">Thoughts, stories, and ideas about web development</p>
      </div>
      
      <FeaturedPosts />
      
      <div className="flex flex-col md:flex-row mt-12 gap-8">
        <div className="md:w-2/3">
          <RecentPosts />
        </div>
        <div className="md:w-1/3">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Blog;