import { Helmet } from 'react-helmet';
import { useQuery } from '@tanstack/react-query';
import SectionTitle from '@/components/ui/SectionTitle';
import BlogCard from '@/components/blog/BlogCard';
import { motion } from 'framer-motion';
import { staggerContainer } from '@/lib/framerAnimations';
import { Link } from 'wouter';
import { FaArrowRight } from 'react-icons/fa';

// Mock data - this would normally come from the API
const blogPosts = [
  {
    slug: 'choosing-right-tech-stack',
    title: 'Choosing the Right Tech Stack for Your Project',
    excerpt: 'A comprehensive guide to evaluating and selecting the best technologies for your next web development project.',
    date: 'May 15, 2025',
    readTime: '5 min read',
    category: 'Web Development',
    categoryColor: 'bg-primary',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=600'
  },
  {
    slug: 'wordpress-to-react',
    title: 'Migrating from WordPress to React: A Case Study',
    excerpt: 'How I helped a client transition from a traditional WordPress site to a modern React-based application.',
    date: 'April 28, 2025',
    readTime: '8 min read',
    category: 'Case Study',
    categoryColor: 'bg-secondary',
    image: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=600'
  },
  {
    slug: 'seo-best-practices',
    title: 'SEO Best Practices for Modern Web Applications',
    excerpt: 'Learn how to optimize your React and JavaScript-heavy websites for search engines to improve visibility.',
    date: 'April 10, 2025',
    readTime: '6 min read',
    category: 'SEO',
    categoryColor: 'bg-accent',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600'
  }
];

interface BlogProps {
  showAll?: boolean;
}

const Blog: React.FC<BlogProps> = ({ showAll = true }) => {
  const { data = blogPosts, isLoading } = useQuery({
    queryKey: ['/api/blog/posts'],
    queryFn: async () => {
      // In a real app, this would fetch from the API
      // For now, just return the mock data
      return blogPosts;
    },
    enabled: false // Disable actual fetching since we're using mock data
  });

  const displayedPosts = showAll ? data : data.slice(0, 3);

  return (
    <>
      {showAll && (
        <Helmet>
          <title>Blog | Lochlann O'Higgins</title>
          <meta name="description" content="Articles and insights on web development, design, and digital marketing by Lochlann O'Higgins." />
        </Helmet>
      )}
      
      <section id="blog" className={`py-20 bg-light dark:bg-dark ${showAll ? 'mt-16' : ''}`}>
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Latest Blog Posts"
            subtitle="Insights, tutorials, and thoughts on web development and technology."
          />
          
          {isLoading ? (
            <div className="flex justify-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.1 }}
            >
              {displayedPosts.map((post, index) => (
                <BlogCard
                  key={index}
                  slug={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.date}
                  readTime={post.readTime}
                  category={post.category}
                  categoryColor={post.categoryColor}
                  image={post.image}
                />
              ))}
            </motion.div>
          )}
          
          {!showAll && (
            <div className="text-center mt-12">
              <Link href="/blog">
                <a className="px-8 py-3 rounded-full border-2 border-primary dark:border-primary-light text-primary dark:text-primary-light font-medium hover:bg-primary/10 dark:hover:bg-primary/20 transition-all inline-flex items-center">
                  <span>View All Posts</span>
                  <FaArrowRight className="ml-2" />
                </a>
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Blog;
