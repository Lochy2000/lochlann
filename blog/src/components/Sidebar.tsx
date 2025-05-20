import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaTag, FaCalendarAlt, FaRss, FaCode, FaCoffee } from 'react-icons/fa';

// Mock categories data
const categories = [
  { name: 'Web Development', slug: 'web-development', count: 4 },
  { name: 'Databases', slug: 'databases', count: 3 },
  { name: 'Tutorials', slug: 'tutorials', count: 5 },
  { name: 'Tools', slug: 'tools', count: 2 },
  { name: 'Coffee Thoughts', slug: 'coffee-thoughts', count: 3 }
];

// Mock tags data
const tags = [
  { name: 'react', count: 8 },
  { name: 'javascript', count: 12 },
  { name: 'sql', count: 5 },
  { name: 'nosql', count: 3 },
  { name: 'python', count: 6 },
  { name: 'backend', count: 7 },
  { name: 'frontend', count: 9 },
  { name: 'tools', count: 4 },
  { name: 'lofi', count: 3 },
  { name: 'productivity', count: 5 }
];

// Mock recent posts
const recentPosts = [
  {
    id: 1,
    slug: 'choosing-right-tech-stack',
    title: 'Choosing the Right Tech Stack for Your Project',
    date: 'May 15, 2025'
  },
  {
    id: 2,
    slug: 'demystifying-databases',
    title: 'Demystifying Databases: What I Wish I Knew Sooner',
    date: 'May 12, 2025'
  },
  {
    id: 3,
    slug: 'sql-databases-for-beginners',
    title: 'SQL Databases for Beginners',
    date: 'May 10, 2025'
  }
];

const Sidebar: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
    // Reset search
    setSearchQuery('');
  };
  
  return (
    <div className="space-y-8">
      {/* Search */}
      <div className="lofi-card">
        <h3 className="text-xl font-bold mb-4 font-space text-slate-900 dark:text-white">
          Search
        </h3>
        
        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            placeholder="Search posts..."
            className="lofi-input flex-grow"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            type="submit"
            className="lofi-button ml-2 px-4"
            aria-label="Search"
          >
            <FaSearch />
          </button>
        </form>
      </div>
      
      {/* Categories */}
      <div className="lofi-card">
        <h3 className="text-xl font-bold mb-4 font-space text-slate-900 dark:text-white">
          Categories
        </h3>
        
        <ul className="space-y-2">
          {categories.map(category => (
            <li key={category.slug}>
              <Link 
                to={`/category/${category.slug}`}
                className="flex items-center justify-between text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary-light transition-colors"
              >
                <span className="flex items-center">
                  {category.name === 'Coffee Thoughts' ? (
                    <FaCoffee className="mr-2 text-coffee" />
                  ) : (
                    <FaCode className="mr-2 text-primary" />
                  )}
                  {category.name}
                </span>
                <span className="text-sm bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">
                  {category.count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Recent Posts */}
      <div className="lofi-card">
        <h3 className="text-xl font-bold mb-4 font-space text-slate-900 dark:text-white">
          Recent Posts
        </h3>
        
        <ul className="space-y-4">
          {recentPosts.map(post => (
            <li key={post.id}>
              <Link 
                to={`/post/${post.slug}`}
                className="block group"
              >
                <h4 className="font-medium text-slate-800 dark:text-slate-200 group-hover:text-primary dark:group-hover:text-primary-light transition-colors line-clamp-2">
                  {post.title}
                </h4>
                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center mt-1">
                  <FaCalendarAlt className="mr-1" /> {post.date}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Tags Cloud */}
      <div className="lofi-card">
        <h3 className="text-xl font-bold mb-4 font-space text-slate-900 dark:text-white">
          Popular Tags
        </h3>
        
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <Link 
              key={tag.name}
              to={`/tags/${tag.name}`}
              className="lofi-tag flex items-center"
            >
              <FaTag className="mr-1 text-xs" /> {tag.name}
              <span className="ml-1 opacity-70">({tag.count})</span>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Newsletter */}
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-slate-800 dark:to-slate-900 rounded-xl shadow-lofi dark:shadow-none p-6">
        <h3 className="text-xl font-bold mb-2 font-space text-slate-900 dark:text-white">
          Join the Newsletter
        </h3>
        
        <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">
          Get notified when I publish new articles and tutorials.
        </p>
        
        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email"
            placeholder="your@email.com"
            className="lofi-input w-full"
          />
          <button className="lofi-button w-full">
            Subscribe
          </button>
        </form>
      </div>
      
      {/* RSS Feed */}
      <div className="text-center">
        <a 
          href="/rss.xml"
          className="lofi-link inline-flex items-center"
        >
          <FaRss className="mr-2" /> Subscribe via RSS
        </a>
      </div>
    </div>
  );
};

export default Sidebar;