import { Helmet } from 'react-helmet';
import SectionTitle from '@/components/ui/SectionTitle';
import PortfolioCard from '@/components/portfolio/PortfolioCard';
import { portfolioProjects } from '@/data/portfolio';
import { motion } from 'framer-motion';
import { staggerContainer } from '@/lib/framerAnimations';
import { Link } from 'react-router-dom';
import { FaGithub, FaCode, FaRocket } from 'react-icons/fa';

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
      
      {/* GitHub-inspired sci-fi hero section */}
      {showAll && (
        <section className="pt-20 pb-16 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
          {/* Enhanced animated background grid */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(59,130,246,0.4) 1px, transparent 0)',
              backgroundSize: '30px 30px'
            }} />
          </div>
          
          {/* Matrix-style code rain effect */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={`rain-${i}`}
                className="absolute w-0.5 bg-gradient-to-b from-transparent via-green-400/60 to-transparent"
                style={{
                  left: `${i * 7}%`,
                  height: '100px',
                }}
                animate={{
                  y: [-100, 800],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "linear"
                }}
              />
            ))}
          </div>
          
          {/* Enhanced floating orbs */}
          <div className="absolute inset-0">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${80 + i * 20}px`,
                  height: `${80 + i * 20}px`,
                  background: `radial-gradient(circle, rgba(${i % 2 === 0 ? '139, 92, 246' : '6, 182, 212'}, 0.2), rgba(${i % 2 === 0 ? '139, 92, 246' : '6, 182, 212'}, 0.05))`,
                  left: `${15 + i * 20}%`,
                  top: `${10 + i * 15}%`,
                  filter: 'blur(1px)',
                }}
                animate={{
                  y: [-30, 30, -30],
                  x: [-20, 20, -20],
                  opacity: [0.3, 0.7, 0.3],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 6 + i,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
            
            {/* Pulsing tech rings */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`ring-${i}`}
                className="absolute border-2 border-purple-500/20 rounded-full"
                style={{
                  width: `${200 + i * 100}px`,
                  height: `${200 + i * 100}px`,
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.5, 0.2],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <FaGithub className="text-4xl text-primary" />
                <span className="text-slate-400 text-xl">×</span>
                <FaCode className="text-4xl text-secondary" />
                <span className="text-slate-400 text-xl">×</span>
                <FaRocket className="text-4xl text-cyan-400" />
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                My <span className="text-gradient bg-gradient-to-r from-primary via-secondary to-cyan-400 bg-clip-text text-transparent">Code</span> Repository
              </h1>
              
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Explore my collection of open-source projects, experiments, and production applications.
                Each repository tells a story of problem-solving and continuous learning.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700">
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <span className="text-slate-300 text-sm">{portfolioProjects.length} Active Repositories</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700">
                  <FaGithub className="text-slate-400" />
                  <a 
                    href="https://github.com/Lochy2000" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-light transition-colors text-sm"
                  >
                    @Lochy2000
                  </a>
                </div>
              </div>
              
              {/* Tech stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                {[
                  { label: 'Languages', value: '8+', icon: '💻' },
                  { label: 'Frameworks', value: '12+', icon: '⚡' },
                  { label: 'Projects', value: portfolioProjects.length, icon: '🚀' },
                  { label: 'Commits', value: '500+', icon: '📊' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="p-4 rounded-lg bg-slate-800/30 border border-purple-500/30 hover:border-cyan-400/60 backdrop-blur-sm relative overflow-hidden group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    whileHover={{ 
                      scale: 1.05, 
                      backgroundColor: 'rgba(139, 92, 246, 0.1)',
                      boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)'
                    }}
                  >
                    {/* Glowing border on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative z-10">
                      <div className="text-2xl mb-1">{stat.icon}</div>
                      <div className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">{stat.value}</div>
                      <div className="text-sm text-slate-400 group-hover:text-purple-300 transition-colors">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}
      
      <section className={`py-12 sm:py-16 md:py-20 bg-slate-950 section-mobile-spacing ${!showAll ? 'mt-16' : ''} relative overflow-hidden`}>
        {/* Tech background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(139, 92, 246, 0.6) 2px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        {/* Additional matrix-style lines */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px),
              linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }} />
        </div>
        
        {/* Floating tech elements */}
        <div className="absolute inset-0 z-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-32 bg-gradient-to-b from-transparent via-purple-500/40 to-transparent"
              style={{
                left: `${5 + i * 12}%`,
                top: `${Math.random() * 80}%`,
              }}
              animate={{
                scaleY: [0, 1, 0],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
          
          {/* Horizontal scanning lines */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`h-${i}`}
              className="absolute h-0.5 w-full bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
              style={{
                top: `${20 + i * 20}%`,
              }}
              animate={{
                scaleX: [0, 1, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>
        <div className="container mx-auto px-4 relative z-20">
          {!showAll && (
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Featured <span className="text-gradient bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">Projects</span>
              </h2>
              <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                A showcase of my recent web development and design projects.
              </p>
            </div>
          )}
          
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
              <Link 
                to="/portfolio" 
                className="px-6 sm:px-8 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl inline-flex items-center text-sm sm:text-base"
              >
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
