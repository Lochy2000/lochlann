import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import TypewriterText from '../ui/TypewriterText';
import ParticleBackground from './ParticleBackground';
import { fadeIn, slideUp } from '@/lib/framerAnimations';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden gradient-bg dark:bg-darker">
      <ParticleBackground />
      
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/2 mb-10 md:mb-0"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <motion.p 
              className="text-primary-light dark:text-primary-light font-mono mb-3"
              variants={slideUp}
            >
              Hello, I'm
            </motion.p>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-space font-bold mb-4 text-gradient"
              variants={slideUp}
            >
              Lochlann O'Higgins
            </motion.h1>
            
            <div className="h-12 mb-6">
              <TypewriterText
                texts={[
                  'Website Specialist & Developer',
                  'WordPress Expert',
                  'SEO Optimizer',
                  'UI/UX Enthusiast'
                ]}
                className="text-xl md:text-2xl font-space text-slate-600 dark:text-slate-300"
              />
            </div>
            
            <motion.p 
              className="text-slate-600 dark:text-slate-300 mb-8 max-w-lg"
              variants={slideUp}
            >
              I design and build websites that tell stories. With experience in WordPress development and a passion for creating smooth, intuitive user experiences.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              variants={slideUp}
            >
              <Link to="/portfolio" className="px-6 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-medium hover:shadow-lg transition-all glow-effect">
                View My Work
              </Link>
              <Link to="/contact" className="px-6 py-3 rounded-full border-2 border-primary dark:border-primary-light text-primary dark:text-primary-light font-medium hover:bg-primary/10 transition-all">
                Get In Touch
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 flex justify-center"
            initial="initial"
            animate="animate"
            variants={fadeIn}
            custom={0.5}
          >
            <div className="relative w-64 h-64 md:w-96 md:h-96 animate-float">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 blur-2xl"></div>
              <img 
                src="https://res.cloudinary.com/dpw2txejq/image/upload/v1744655473/loch_qcgqjw.png"
                alt="Lochlann O'Higgins" 
                className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-2xl border-4 border-white dark:border-slate-700 shadow-xl z-10 relative"
              />
              <motion.div 
                className="absolute -bottom-4 -right-4 bg-light dark:bg-darker p-3 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <span className="text-gradient font-mono font-bold">5+ Years</span>
                <span className="block text-slate-600 dark:text-slate-400 text-sm">Web Development</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
