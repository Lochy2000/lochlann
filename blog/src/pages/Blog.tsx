import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { FaCalendarAlt, FaClock, FaTag, FaCoffee, FaCode, FaTerminal, FaSearch } from 'react-icons/fa';
import { firebaseBlogService, type BlogPost } from '../utils/firebaseBlogService';
import ParallaxVideo from '../components/ParallaxVideo';

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

// Type without the required fields for easier mock data
type MockBlogPost = Partial<BlogPost> & {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  readTime: string;
  category: string;
  categorySlug: string;
  categoryColor: string;
  tags: string[];
  featured: boolean;
};

// Backup mock blog post data in case API fails
const mockBlogPosts: MockBlogPost[] = [
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
  { name: 'React', slug: 'react' },
  { name: 'Databases', slug: 'databases' },
  { name: 'Tools', slug: 'tools' },
  { name: 'Uncategorized', slug: 'uncategorized' }
];

const Blog: React.FC = () => {
  const { category: categoryParam, tag: tagParam } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'all');
  const [searchQuery, setSearchQuery] = useState('');

  // Set category from URL params on load
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);
  
  // Set tag filter from URL params on load
  useEffect(() => {
    if (tagParam) {
      setSearchQuery(`#${tagParam}`);
    }
  }, [tagParam]);

  // Fetch blog posts from Firebase
  const { data: blogPosts, isLoading, error } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      try {
        console.log('Fetching blog posts from Firebase');
        const posts = await firebaseBlogService.getPublishedPosts();
        console.log('Fetched blog posts:', posts);
        
        if (posts && posts.length > 0) {
          // Process posts to ensure they have all required fields
          const processedPosts = posts.map(post => ({
            ...post,
            // Ensure categorySlug exists
            categorySlug: post.categorySlug || post.category?.toLowerCase().replace(/\s+/g, '-') || 'uncategorized',
            // Ensure tags is always an array
            tags: Array.isArray(post.tags) ? post.tags : 
                  (typeof post.tags === 'string' ? post.tags.split(',').map(t => t.trim()) : []),
            // Ensure image and coverImage exist
            image: post.image || post.coverImage || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
            coverImage: post.coverImage || post.image || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
            // Ensure author exists
            author: post.author || {
              name: 'Lochlann O\'Higgins',
              image: 'https://res.cloudinary.com/dpw2txejq/image/upload/v1746605161/lego-loch_r7voyr.png',
              bio: 'Junior developer with a passion for web technologies and lo-fi aesthetics.'
            }
          }));
          
          console.log('Processed posts:', processedPosts);
          return processedPosts;
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
      
      {/* Parallax Video Background */}
      <ParallaxVideo
        videoSrc="https://res.cloudinary.com/dpw2txejq/video/upload/v1747743810/lofi-bg_llx3on.mp4"
        overlayOpacity={0.5}
      />
      
      <div className="mt-16 md:mt-12">
        {/* Hero Section - Only show on home page */}
        {!categoryParam && !tagParam && !searchQuery && (
          <motion.section 
            className="px-4 py-8 md:py-10 text-center relative overflow-hidden z-10"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div className="max-w-3xl mx-auto relative z-10 bg-slate-900/30 p-6 rounded-xl border border-purple-500/20 shadow-neon-purple backdrop-blur-sm">
              <motion.h1 
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-space text-white"
                variants={itemVariants}
              >
                <span className="text-purple-400">{"<"}</span>
                Lochlann's Tech Blog
                <span className="text-purple-400">{"/>"}</span>
              </motion.h1>
              
              <motion.p 
                className="text-lg text-slate-300 mb-6 max-w-2xl mx-auto"
                variants={itemVariants}
              >
                Tutorials, insights, and musings on web development, AI, and lo-fi aesthetics. 
                Join me as I navigate the tech world as a junior developer.
              </motion.p>
              
              <motion.div variants={itemVariants}>
                <form className="max-w-lg mx-auto flex mb-6" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="text"
                    placeholder="Search articles..."
                    className="lofi-input flex-grow bg-slate-800/70 text-white border border-blue-500/20 focus:border-blue-400/70 focus:ring-1 focus:ring-blue-400"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button className="lofi-button ml-2 px-4 bg-blue-600 hover:bg-blue-500 text-white shadow-neon border border-blue-400/30">
                    <FaSearch className="mr-2 inline-block" /> Search
                  </button>
                </form>
              </motion.div>
              
              <motion.div 
              className="flex flex-wrap justify-center gap-2"
              variants={itemVariants}
              >
              {categories.map(category => (
              <button
              key={category.slug}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCategory === category.slug
              ? 'bg-purple-600 text-white shadow-neon-purple border border-purple-400/50'
              : 'bg-slate-800/80 text-slate-300 border border-slate-600/50 hover:bg-slate-700/90 hover:border-purple-500/30'
              }`}
              onClick={() => setSelectedCategory(category.slug)}
              >
              {category.name}
              </button>
              ))}
              </motion.div>
            </div>
          </motion.section>
        )}
        
        {/* Category filter for non-home pages */}
        {(categoryParam || tagParam || searchQuery) && (
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-wrap gap-2 mb-4 justify-center">
              {categories.map(category => (
                <Link
                  key={category.slug}
                  to={category.slug === 'all' ? '/' : `/category/${category.slug}`}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.slug
                    ? 'bg-purple-600 text-white shadow-neon-purple border border-purple-400/50'
                    : 'bg-slate-800/80 text-slate-300 border border-slate-600/50 hover:bg-slate-700/90 hover:border-purple-500/30'
                  }`}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        )}
        
        {/* Featured Posts Section */}
        {featuredPosts && featuredPosts.length > 0 && selectedCategory === 'all' && !searchQuery && (
          <section className="py-8 bg-slate-900/30 backdrop-blur-sm border-t border-b border-blue-500/10" data-section="featured-posts">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-6 font-space text-white">
                Featured Posts
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredPosts.map(post => (
                  <Link 
                    key={post.id}
                    to={`/post/${post.slug}`}
                    className="block group"
                  >
                    <article className="bg-white/70 dark:bg-lofi-terminal/70 h-full rounded-xl overflow-hidden shadow-neon hover:shadow-neon-lg transform hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm">
                      <div className="h-52 overflow-hidden relative">
                        <img 
                          src={post.coverImage || ('image' in post ? post.image : '')}
                          alt={post.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <span className={`${post.categoryColor} text-white text-xs px-3 py-1 rounded-full font-medium`}>
                            {post.category}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-5">
                        <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                          {post.title}
                        </h3>
                        
                        <p className="text-slate-600 dark:text-slate-300 mb-3 text-sm line-clamp-2">
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
        <section className="py-8 bg-slate-900/20 backdrop-blur-sm" data-section="recent-posts">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 font-space text-white">
              {searchQuery 
                ? `Search Results for "${searchQuery}"`
                : selectedCategory !== 'all'
                  ? `${categories.find(cat => cat.slug === selectedCategory)?.name} Posts`
                  : 'Recent Posts'
              }
            </h2>
            
            {filteredPosts.length === 0 ? (
              <div className="lofi-card text-center p-8 bg-white/70 dark:bg-lofi-terminal/70 backdrop-blur-sm">
                <FaSearch className="mx-auto text-4xl text-slate-400 mb-3" />
                <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">
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
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
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
                      <article className="lofi-card h-full flex flex-col bg-white/70 dark:bg-lofi-terminal/70 backdrop-blur-sm shadow-neon hover:shadow-neon-lg">
                        <div className="h-44 overflow-hidden rounded-lg mb-3 relative">
                          <img 
                            src={post.coverImage || ('image' in post ? post.image : '')}
                            alt={post.title}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-3 left-3">
                            <span className={`${post.categoryColor} text-white text-xs px-3 py-1 rounded-full font-medium`}>
                              {post.category}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex-grow px-4 pb-4">
                          <h3 className="text-base font-bold mb-2 text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary-light transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          
                          <p className="text-slate-600 dark:text-slate-300 mb-3 text-sm line-clamp-2">
                            {post.excerpt}
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-4 pb-3">
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
              <div className="mt-8 flex justify-center">
                <div className="inline-flex rounded-md shadow-sm" role="group">
                  <button 
                    className="lofi-button-secondary rounded-r-none border-r-0 px-3 py-1.5 text-sm"
                    disabled
                  >
                    Previous
                  </button>
                  <button className="bg-primary text-white font-medium py-1.5 px-3 text-sm">
                    1
                  </button>
                  <button className="lofi-button-secondary py-1.5 px-3 text-sm border-l-0 border-r-0">
                    2
                  </button>
                  <button className="lofi-button-secondary py-1.5 px-3 text-sm border-l-0 rounded-l-none">
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section className="py-10 bg-gradient-to-br from-purple-900/40 to-slate-900/40 backdrop-blur-sm border-t border-purple-500/10">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <FaCoffee className="text-3xl text-purple-400 mx-auto mb-3" />
              <h2 className="text-2xl font-bold mb-3 font-space text-white">
                Join the Devs & Coffee Newsletter
              </h2>
              <p className="text-slate-300 mb-6">
                Get the latest articles, tutorials, and lo-fi coding inspiration delivered straight to your inbox. No spam, just dev goodness.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="lofi-input flex-grow bg-slate-800/70 text-white border border-purple-500/20 focus:border-purple-400/70 focus:ring-1 focus:ring-purple-400"
                />
                <button className="lofi-button bg-purple-600 hover:bg-purple-500 text-white shadow-neon-purple border border-purple-400/30">
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