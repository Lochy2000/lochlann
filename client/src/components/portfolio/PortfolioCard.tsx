import { motion } from 'framer-motion';
import { FaLink, FaGithub } from 'react-icons/fa';

interface PortfolioCardProps {
  title: string;
  shortTitle?: string;
  image: string;
  description: string;
  technologies: string[];
  demoLink?: string;
  githubLink?: string;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({
  title,
  shortTitle,
  image,
  description,
  technologies,
  demoLink,
  githubLink
}) => {
  return (
    <motion.div 
      className="group bg-slate-900/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-xl overflow-hidden border border-purple-500/30 hover:border-cyan-400/60 transition-all duration-300 shadow-lg hover:shadow-purple-500/20 relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        y: -5,
        boxShadow: '0 20px 40px rgba(139, 92, 246, 0.3), 0 0 20px rgba(6, 182, 212, 0.2)'
      }}
    >
      {/* Glowing border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-cyan-400/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Animated glow on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent rounded-xl"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      <div className="relative h-56 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Tech grid overlay */}
        <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.4) 1px, transparent 0)',
          backgroundSize: '20px 20px'
        }} />
      </div>
      <div className="p-6 relative z-10">
        <h3 className="font-space font-bold text-xl mb-2 text-white group-hover:text-cyan-400 transition-all duration-300">{title}</h3>
        <p className="text-slate-300 mb-4 leading-relaxed">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <span key={index} className="px-3 py-1 rounded-md bg-purple-900/30 text-purple-200 border border-purple-500/40 text-xs font-medium hover:border-cyan-400/60 hover:text-cyan-300 transition-all duration-300">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex space-x-4">
          {demoLink && (
            <a 
              href={demoLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm flex items-center font-medium group/link"
            >
              <div className="w-2 h-2 rounded-full bg-cyan-400 mr-2 group-hover/link:animate-pulse"></div>
              <FaLink className="text-lg mr-1" /> Live Demo
            </a>
          )}
          
          {githubLink && (
            <a 
              href={githubLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-colors text-sm flex items-center font-medium group/link"
            >
              <div className="w-2 h-2 rounded-full bg-purple-400 mr-2 group-hover/link:animate-pulse"></div>
              <FaGithub className="text-lg mr-1" /> GitHub
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioCard;
