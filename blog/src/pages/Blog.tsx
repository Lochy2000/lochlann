import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { FaCalendarAlt, FaClock, FaTag, FaCoffee, FaCode, FaTerminal, FaSearch } from 'react-icons/fa';
import { firebaseBlogService, type BlogPost } from '../utils/firebaseBlogService';

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

// Backup mock blog post data in case API fails
const mockBlogPosts = [
  {
    id: '1',
    slug: 'choosing-right-tech-stack',
    title: 'Choosing the Right Tech Stack for Your Project',
    excerpt: "When embarking on a new web development project, one of the most critical decisions you'll make is selecting the right technology stack.",
    coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200",
    date: 'May 15, 2025',
    readTime: '5 min read',
    category: 'Web Development',
    categorySlug: 'web-development',
    categoryColor: 'bg-blue-500',
    tags: ['react', 'javascript', 'frontend'],
    featured: true
  },
  {
    id: '2',
    slug: 'demystifying-databases',
    title: 'Demystifying Databases: What I Wish I Knew Sooner',
    excerpt: "Trying to choose the right database for your app? Here's a no-fluff breakdown of SQL, NoSQL, flat files, and cloud DBs—explained like you're new here.",
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200',
    date: 'May 12, 2025',
    readTime: '7 min read',
    category: 'Databases',
    categorySlug: 'databases',
    categoryColor: 'bg-green-500',
    tags: ['sql', 'nosql', 'backend'],
    featured: true
  },
  // ... other mock posts
];

// Available categories for the filter
const categories = [
  { name: 'All', slug: 'all' },
  { name: 'Web Development', slug: 'web-development' },
  { name: 'Databases', slug: 'databases' },
  { name: 'Tutorials', slug: 'tutorials' },
  { name: 'Tools', slug: 'tools' },
  { name: 'Coffee Thoughts', slug: 'coffee-thoughts' }
];

const Blog: React.FC = () => {
  const { category: categoryParam, tag: tagParam } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'all');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch blog posts from Firebase
  const { data: blogPosts, isLoading, error } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      try {
        console.log('Fetching blog posts from Firebase');
        const posts = await firebaseBlogService.getPublishedPosts();
        console.log('Fetched blog posts:', posts);
        
        if (posts.length > 0) {
          return posts; // Return Firebase posts if available
        }
        
        // Only fallback to mock data if no posts are found
        console.log('No posts found in Firebase, using mock data');
        return mockBlogPosts;
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        // Fallback to mock data if Firebase fails
        return mockBlogPosts;
      }
    }
  });

  // Filter posts based on category and search query
  const filteredPosts = (blogPosts || []).filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.categorySlug === selectedCategory;
    const matchesSearch = !searchQuery || 
      post.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  // Get featured posts
  const featuredPosts = (blogPosts || []).filter(post => post.featured);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Lochlann's Tech Blog | Web Development Tutorials & Lo-Fi Coding</title>
        <meta name="description" content="Explore tutorials, insights, and musings on web development, databases, AI, and lo-fi aesthetics from a junior developer's perspective." />
        <meta name="keywords" content="web development, coding tutorials, javascript, typescript, react, databases, developer blog, lo-fi coding" />
      </Helmet>
      
      <div className="mt-16 md:mt-20">
        {/* Hero Section */}
        <motion.section 
          className="px-4 py-12 md:py-20 text-center relative overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="max-w-4xl mx-auto relative z-10">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-space text-slate-900 dark:text-white"
              variants={itemVariants}
            >
              <span className="gradient-text">{"<"}</span>
              Lochlann's Tech Blog
              <span className="gradient-text">{"/>"}</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-slate-700 dark:text-slate-300 mb-8 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Tutorials, insights, and musings on web development, AI, and lo-fi aesthetics. 
              Join me as I navigate the tech world as a junior developer.
            </motion.p>
            
            <motion.div variants={itemVariants}>
              <form className="max-w-lg mx-auto flex mb-8" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="lofi-input flex-grow"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="lofi-button ml-2 px-4">
                  <FaSearch className="mr-2 inline-block" /> Search
                </button>
              </form>
            </motion.div>
            
            <motion.div 
              className="flex flex-wrap justify-center gap-2 mb-4"
              variants={itemVariants}
            >
              {categories.map(category => (
                <button
                  key={category.slug}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.slug
                      ? 'bg-primary text-white shadow-lofi'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                  onClick={() => setSelectedCategory(category.slug)}
                >
                  {category.name}
                </button>
              ))}
            </motion.div>
          </div>
        </motion.section>
        
        {/* Featured Posts Section */}
        {featuredPosts && featuredPosts.length > 0 && selectedCategory === 'all' && !searchQuery && (
          <section className="py-12 bg-slate-50 dark:bg-slate-900/30">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 font-space text-slate-900 dark:text-white">
                Featured Posts
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featuredPosts.map(post => (
                  <Link 
                    key={post.id}
                    to={`/post/${post.slug}`}
                    className="block group"
                  >
                    <article className="bg-white dark:bg-lofi-terminal h-full rounded-xl overflow-hidden shadow-lofi hover:shadow-lofi-lg transform hover:-translate-y-1 transition-all duration-300">
                      <div className="h-60 overflow-hidden relative">
                        <img 
                          src={post.coverImage || post.image} 
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
                ))}
              </div>
            </div>
          </section>
        )}
        
        {/* All Posts Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 font-space text-slate-900 dark:text-white">
              {searchQuery 
                ? `Search Results for "${searchQuery}"`
                : selectedCategory !== 'all'
                  ? `${categories.find(cat => cat.slug === selectedCategory)?.name} Posts`
                  : 'Recent Posts'
              }
            </h2>
            
            {filteredPosts.length === 0 ? (
              <div className="lofi-card text-center p-12">
                <FaSearch className="mx-auto text-5xl text-slate-400 mb-4" />
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                  No posts found
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  {searchQuery 
                    ? `No posts matching "${searchQuery}" were found.` 
                    : 'No posts found in this category yet.'
                  }
                </p>
                <button 
                  onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                  className="lofi-button"
                >
                  View All Posts
                </button>
              </div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredPosts.map(post => (
                  <motion.div 
                    key={post.id}
                    variants={itemVariants}
                  >
                    <Link 
                      to={`/post/${post.slug}`}
                      className="block group h-full"
                    >
                      <article className="lofi-card h-full flex flex-col">
                        <div className="h-48 overflow-hidden rounded-lg mb-4 relative">
                          <img 
                            src={post.coverImage || post.image} 
                            alt={post.title}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-3 left-3">
                            <span className={`${post.categoryColor} text-white text-xs px-3 py-1 rounded-full font-medium`}>
                              {post.category}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex-grow">
                          <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary-light transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          
                          <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm line-clamp-3">
                            {post.excerpt}
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-2">
                          <span className="flex items-center">
                            <FaCalendarAlt className="mr-1" /> {post.date}
                          </span>
                          <span className="flex items-center">
                            <FaClock className="mr-1" /> {post.readTime}
                          </span>
                        </div>
                      </article>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
            
            {/* Pagination (to be implemented later) */}
            {filteredPosts.length > 0 && (
              <div className="mt-12 flex justify-center">
                <div className="inline-flex rounded-md shadow-sm" role="group">
                  <button 
                    className="lofi-button-secondary rounded-r-none border-r-0"
                    disabled
                  >
                    Previous
                  </button>
                  <button className="bg-primary text-white font-medium py-2 px-4">
                    1
                  </button>
                  <button className="lofi-button-secondary py-2 px-4 border-l-0 border-r-0">
                    2
                  </button>
                  <button className="lofi-button-secondary py-2 px-4 border-l-0 rounded-l-none">
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section className="py-16 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <FaCoffee className="text-4xl text-coffee mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4 font-space text-slate-900 dark:text-white">
                Join the Devs & Coffee Newsletter
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-8">
                Get the latest articles, tutorials, and lo-fi coding inspiration delivered straight to your inbox. No spam, just dev goodness.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="lofi-input flex-grow"
                />
                <button className="lofi-button">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Blog;