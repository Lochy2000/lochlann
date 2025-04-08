import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { FaCalendarAlt, FaClock, FaArrowRight } from 'react-icons/fa';

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  categoryColor: string;
  image: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  slug,
  title,
  excerpt,
  date,
  readTime,
  category,
  categoryColor,
  image
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link href={`/blog/${slug}`}>
        <a className="group block">
          <article className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-700 hover:border-primary/50 dark:hover:border-primary/50 transition-all h-full flex flex-col">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={image} 
                alt={title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div 
                className={`absolute top-4 left-4 ${categoryColor} text-white text-xs px-2 py-1 rounded`}
              >
                {category}
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 mb-3">
                <span className="flex items-center">
                  <FaCalendarAlt className="mr-1" /> {date}
                </span>
                <span className="mx-2">•</span>
                <span className="flex items-center">
                  <FaClock className="mr-1" /> {readTime}
                </span>
              </div>
              <h3 className="font-space font-bold text-xl mb-2 text-slate-800 dark:text-white group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                {title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4 flex-1">
                {excerpt}
              </p>
              <div className="flex items-center text-primary dark:text-primary-light font-medium mt-auto">
                <span>Read More</span>
                <FaArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </article>
        </a>
      </Link>
    </motion.div>
  );
};

export default BlogCard;
