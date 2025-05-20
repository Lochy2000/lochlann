import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
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

// Mock featured posts (we'll use the same data from Blog.tsx in a real implementation)
const featuredPosts = [
  {
    id: 1,
    slug: 'choosing-right-tech-stack',
    title: 'Choosing the Right Tech Stack for Your Project',
    excerpt: "When embarking on a new web development project, one of the most critical decisions you'll make is selecting the right technology stack.",
    coverImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200',
    date: 'May 15, 2025',
    readTime: '5 min read',
    category: 'Web Development',
    categorySlug: 'web-development',
    categoryColor: 'bg-blue-500'
  },
  {
    id: 2,
    slug: 'demystifying-databases',
    title: 'Demystifying Databases: What I Wish I Knew Sooner',
    excerpt: "Trying to choose the right database for your app? Here's a no-fluff breakdown of SQL, NoSQL, flat files, and cloud DBs—explained like you're new here.",
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200',
    date: 'May 12, 2025',
    readTime: '7 min read',
    category: 'Databases',
    categorySlug: 'databases',
    categoryColor: 'bg-green-500'
  }
];

const FeaturedPosts: React.FC = () => {
  return (
    <motion.section
      className="mb-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-3xl font-bold mb-6 font-space text-slate-900 dark:text-white">
        Featured Posts
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {featuredPosts.map(post => (
          <motion.div
            key={post.id}
            variants={itemVariants}
          >
            <Link 
              to={`/post/${post.slug}`}
              className="block group h-full"
            >
              <article className="bg-white dark:bg-lofi-terminal h-full rounded-xl overflow-hidden shadow-lofi hover:shadow-lofi-lg transform hover:-translate-y-1 transition-all duration-300">
                <div className="h-60 overflow-hidden relative">
                  <img 
                    src={post.coverImage} 
                    alt={post.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`${post.categoryColor} text-white text-xs px-3 py-1 rounded-full font-medium`}>
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center">
                      <FaCalendarAlt className="mr-1" /> {post.date}
                    </span>
                    <span className="mx-2">•</span>
                    <span className="flex items-center">
                      <FaClock className="mr-1" /> {post.readTime}
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default FeaturedPosts;