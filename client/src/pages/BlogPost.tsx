import { Helmet } from 'react-helmet';
import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'wouter';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaTag, FaArrowLeft } from 'react-icons/fa';
import { fadeIn } from '@/lib/framerAnimations';

// Mock blog post data - this would normally come from the API
const blogPost = {
  slug: 'choosing-right-tech-stack',
  title: 'Choosing the Right Tech Stack for Your Project',
  content: `
    <p>When embarking on a new web development project, one of the most critical decisions you'll make is selecting the right technology stack. This choice will impact everything from development speed and cost to long-term maintenance and scalability.</p>
    
    <h2>What is a Tech Stack?</h2>
    <p>A technology stack is the combination of programming languages, frameworks, libraries, and tools used to build a web or mobile application. It typically consists of:</p>
    <ul>
      <li>Frontend technologies (client-side)</li>
      <li>Backend technologies (server-side)</li>
      <li>Database management systems</li>
      <li>Infrastructure and hosting solutions</li>
    </ul>
    
    <h2>Factors to Consider</h2>
    <h3>1. Project Requirements</h3>
    <p>Begin by clearly defining what your application needs to do. Consider:</p>
    <ul>
      <li>Type of application (e-commerce, content management, social network, etc.)</li>
      <li>Expected traffic volume</li>
      <li>Data complexity</li>
      <li>Security requirements</li>
      <li>Integration needs</li>
    </ul>
    
    <h3>2. Team Expertise</h3>
    <p>Your team's existing skills should heavily influence your decision. While learning new technologies can be valuable, using familiar tools will typically result in faster development and fewer bugs.</p>
    
    <h3>3. Scalability</h3>
    <p>Consider your growth projections. Will your application need to handle increasing loads or additional features? Some technology stacks scale more easily than others.</p>
    
    <h3>4. Community and Support</h3>
    <p>A vibrant community means better documentation, more third-party libraries, and easier problem-solving. Popular technologies like React, Node.js, and PostgreSQL have large communities.</p>
    
    <h3>5. Long-term Maintenance</h3>
    <p>Technology choices should be sustainable. Consider:</p>
    <ul>
      <li>How active is the development of the technology?</li>
      <li>Will it be around in 5+ years?</li>
      <li>Is it easy to find developers for this stack?</li>
    </ul>
    
    <h2>Popular Tech Stack Combinations</h2>
    <h3>MERN Stack</h3>
    <p><strong>MongoDB, Express.js, React, Node.js</strong></p>
    <p>Best for: Single-page applications with dynamic content</p>
    
    <h3>LAMP Stack</h3>
    <p><strong>Linux, Apache, MySQL, PHP</strong></p>
    <p>Best for: Traditional web applications and content management systems</p>
    
    <h3>JAMstack</h3>
    <p><strong>JavaScript, APIs, Markup</strong></p>
    <p>Best for: Static sites with dynamic functionality via APIs</p>
    
    <h2>Conclusion</h2>
    <p>There's no one-size-fits-all solution when it comes to choosing a tech stack. The right choice depends on your specific project requirements, team expertise, and long-term goals. By carefully considering these factors, you can select a technology stack that sets your project up for success.</p>
  `,
  date: 'May 15, 2025',
  readTime: '5 min read',
  category: 'Web Development',
  categoryColor: 'bg-primary',
  image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200'
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: post, isLoading, error } = useQuery({
    queryKey: [`/api/blog/post/${slug}`],
    queryFn: async () => {
      // In a real app, this would fetch from the API
      // For now, just return the mock data if the slug matches
      if (slug === blogPost.slug) {
        return blogPost;
      }
      throw new Error('Post not found');
    },
    enabled: false // Disable actual fetching since we're using mock data
  });

  // Since we're not really fetching, manually set the post
  const currentPost = post || (slug === blogPost.slug ? blogPost : null);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !currentPost) {
    return (
      <div className="container mx-auto px-4 py-20 mt-16 text-center">
        <h1 className="text-3xl font-space font-bold text-slate-800 dark:text-white mb-4">Post Not Found</h1>
        <p className="text-slate-600 dark:text-slate-300 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
        <Link href="/blog">
          <a className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-medium">
            <FaArrowLeft className="mr-2" /> Back to Blog
          </a>
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{currentPost.title} | Lochlann O'Higgins Blog</title>
        <meta name="description" content={currentPost.content.substring(0, 160).replace(/<[^>]*>/g, '')} />
      </Helmet>
      
      <div className="mt-16 pb-20">
        {/* Hero Section */}
        <div className="w-full h-96 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark/90"></div>
          <img 
            src={currentPost.image} 
            alt={currentPost.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 py-8">
            <span className={`${currentPost.categoryColor} text-white text-sm px-3 py-1 rounded`}>
              {currentPost.category}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-space font-bold text-white mt-3 mb-4">
              {currentPost.title}
            </h1>
            <div className="flex items-center text-sm text-white/80">
              <span className="flex items-center">
                <FaCalendarAlt className="mr-1" /> {currentPost.date}
              </span>
              <span className="mx-3">•</span>
              <span className="flex items-center">
                <FaClock className="mr-1" /> {currentPost.readTime}
              </span>
              <span className="mx-3">•</span>
              <span className="flex items-center">
                <FaTag className="mr-1" /> {currentPost.category}
              </span>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <motion.div 
          className="container mx-auto px-4 py-12"
          variants={fadeIn}
          initial="initial"
          animate="animate"
        >
          <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 md:p-12">
            <div 
              className="prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: currentPost.content }}
            ></div>
            
            <hr className="my-8 border-slate-200 dark:border-slate-700" />
            
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <Link href="/blog">
                <a className="inline-flex items-center text-primary dark:text-primary-light hover:underline">
                  <FaArrowLeft className="mr-2" /> Back to Blog
                </a>
              </Link>
              
              <div className="flex space-x-4">
                <a 
                  href={`https://twitter.com/intent/tweet?text=${currentPost.title}&url=${encodeURIComponent(window.location.href)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-primary transition-colors"
                >
                  <span className="sr-only">Share on Twitter</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.016 10.016 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                  </svg>
                </a>
                <a 
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${currentPost.title}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-primary transition-colors"
                >
                  <span className="sr-only">Share on LinkedIn</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h-.003z" />
                  </svg>
                </a>
                <a 
                  href={`mailto:?subject=${currentPost.title}&body=Check out this article: ${encodeURIComponent(window.location.href)}`} 
                  className="text-slate-500 hover:text-primary transition-colors"
                >
                  <span className="sr-only">Share via Email</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default BlogPost;
