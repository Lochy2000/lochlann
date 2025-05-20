import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaClock, FaTag, FaCode, FaCoffee } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

// Mock posts data (would come from API/props in real implementation)
const recentPosts = [
  {
    id: 3,
    slug: 'sql-databases-for-beginners',
    title: 'SQL Databases for Beginners',
    excerpt: 'A beginner-friendly guide to SQL databases—what they are, how they work, and how to set one up (especially on Windows) for real-world projects.',
    coverImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200',
    date: 'May 10, 2025',
    readTime: '8 min read',
    category: 'Databases',
    categorySlug: 'databases',
    categoryColor: 'bg-green-500',
    tags: ['sql', 'postgresql', 'backend']
  },
  {
    id: 4,
    slug: 'connect-sql-to-python',
    title: 'How to Connect SQL to a Python Project',
    excerpt: 'Learn how to connect your PostgreSQL database to a Python project using psycopg2 or SQLAlchemy. Step-by-step setup with code examples for Windows.',
    coverImage: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200',
    date: 'May 8, 2025',
    readTime: '6 min read',
    category: 'Tutorials',
    categorySlug: 'tutorials',
    categoryColor: 'bg-purple-500',
    tags: ['python', 'sql', 'backend']
  },
  {
    id: 5,
    slug: 'ultimate-developer-toolbelt',
    title: 'The Ultimate Developer Toolbelt: My Go-To Resources',
    excerpt: 'From UI inspiration to AI coding tools, explore the ultimate collection of dev tools and resources I use (and love) as a junior developer.',
    coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200',
    date: 'May 5, 2025',
    readTime: '4 min read',
    category: 'Tools',
    categorySlug: 'tools',
    categoryColor: 'bg-yellow-500',
    tags: ['tools', 'resources', 'productivity']
  },
  {
    id: 6,
    slug: 'lofi-coding-aesthetic',
    title: 'Lo-Fi Coding: Creating the Perfect Dev Environment',
    excerpt: 'Exploring how to blend lo-fi aesthetics with practical coding environments for maximum productivity and chill vibes.',
    coverImage: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200',
    date: 'May 1, 2025',
    readTime: '5 min read',
    category: 'Coffee Thoughts',
    categorySlug: 'coffee-thoughts',
    categoryColor: 'bg-coffee',
    tags: ['lofi', 'productivity', 'workspace']
  }
];

const RecentPosts: React.FC = () => {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-3xl font-bold mb-6 font-space text-slate-900 dark:text-white">
        Recent Posts
      </h2>
      
      <div className="space-y-6">
        {recentPosts.map(post => (
          <motion.div
            key={post.id}
            variants={itemVariants}
          >
            <Link 
              to={`/post/${post.slug}`}
              className="block group"
            >
              <article className="lofi-card flex flex-col md:flex-row md:items-center gap-6">
                <div className="md:w-1/3 h-48 md:h-40 overflow-hidden rounded-lg">
                  <img 
                    src={post.coverImage} 
                    alt={post.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="md:w-2/3">
                  <div className="flex items-center mb-2">
                    <Link 
                      to={`/category/${post.categorySlug}`}
                      className={`${post.categoryColor} text-white text-xs px-3 py-1 rounded-full inline-flex items-center`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {post.category === 'Coffee Thoughts' ? (
                        <FaCoffee className="mr-1" />
                      ) : post.category === 'Tutorials' ? (
                        <FaCode className="mr-1" />
                      ) : null}
                      {post.category}
                    </Link>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-300 mb-3 line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-y-2 gap-x-4 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center">
                      <FaCalendarAlt className="mr-1" /> {post.date}
                    </span>
                    <span className="flex items-center">
                      <FaClock className="mr-1" /> {post.readTime}
                    </span>
                    <div className="flex items-center gap-1">
                      <FaTag className="text-xs" />
                      {post.tags.slice(0, 2).map((tag, index) => (
                        <Link
                          key={tag}
                          to={`/tags/${tag}`}
                          className="hover:text-primary dark:hover:text-primary-light transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {tag}{index < Math.min(post.tags.length, 2) - 1 ? ',' : ''}
                        </Link>
                      ))}
                      {post.tags.length > 2 && (
                        <span>+{post.tags.length - 2}</span>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <Link 
          to="/archives"
          className="lofi-button-secondary inline-flex"
        >
          View All Posts
        </Link>
      </div>
    </motion.section>
  );
};

export default RecentPosts;