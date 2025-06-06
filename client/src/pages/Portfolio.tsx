import { Helmet } from 'react-helmet';
import SectionTitle from '@/components/ui/SectionTitle';
import PortfolioCard from '@/components/portfolio/PortfolioCard';
import { portfolioProjects } from '@/data/portfolio';
import { motion } from 'framer-motion';
import { staggerContainer } from '@/lib/framerAnimations';
import { Link } from 'react-router-dom';

interface PortfolioProps {
  showAll?: boolean;
}

const Portfolio: React.FC<PortfolioProps> = ({ showAll = true }) => {
  const displayedProjects = showAll ? portfolioProjects : portfolioProjects.slice(0, 4);

  return (
    <>
      {showAll && (
        <Helmet>
          <title>Portfolio | Lochlann O'Higgins</title>
          <meta name="description" content="Portfolio showcasing Lochlann O'Higgins' web development and design projects using various technologies." />
        </Helmet>
      )}
      
      <section id="portfolio" className={`py-12 sm:py-16 md:py-20 gradient-bg dark:bg-darker section-mobile-spacing ${showAll ? 'mt-16' : ''}`}>
        <div className="container mx-auto px-4">
          <SectionTitle
            title={<>My <span className="text-gradient">Portfolio</span></>}
            subtitle="A showcase of my recent web development and design projects."
            light
          />
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mobile-grid-single"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.1 }}
          >
            {displayedProjects.map((project, index) => (
              <PortfolioCard
                key={index}
                title={project.title}
                shortTitle={project.shortTitle}
                image={project.image}
                description={project.description}
                technologies={project.technologies}
                demoLink={project.demoLink}
                githubLink={project.githubLink}
              />
            ))}
          </motion.div>
          
          {!showAll && (
            <div className="text-center mt-8 sm:mt-12">
              <Link to="/portfolio" className="px-6 sm:px-8 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium hover:bg-white/20 transition-all glow-effect inline-flex items-center text-sm sm:text-base">
                <span>View All Projects</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Portfolio;
