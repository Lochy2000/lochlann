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
      className="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-primary/30 transition-all duration-300"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <div className="relative h-56 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div>
            <h4 className="font-space font-bold text-white">{shortTitle || title}</h4>
            <p className="text-slate-300 text-sm">{description.substring(0, 60)}...</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-space font-bold text-xl mb-2 text-white group-hover:text-gradient transition-all">{title}</h3>
        <p className="text-slate-300 mb-4">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <span key={index} className="px-2 py-1 rounded-full bg-primary/20 text-primary-light text-xs">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex space-x-3">
          {demoLink && (
            <a 
              href={demoLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-light hover:text-white transition-colors text-sm flex items-center"
            >
              <FaLink className="text-lg mr-1" /> Live Demo
            </a>
          )}
          
          {githubLink && (
            <a 
              href={githubLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-light hover:text-white transition-colors text-sm flex items-center"
            >
              <FaGithub className="text-lg mr-1" /> GitHub
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioCard;
