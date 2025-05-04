import { Helmet } from 'react-helmet';
import EnhancedTimeline from '@/components/experience/EnhancedTimeline';
import { Link } from 'react-router-dom';
import SectionTitle from '@/components/ui/SectionTitle';
import GradientButton from '@/components/ui/GradientButton';
import { motion } from 'framer-motion';
import { FaFilePdf, FaBriefcase, FaDownload } from 'react-icons/fa';

const Experience = () => {
  return (
    <>
      <Helmet>
        <title>Experience | Lochlann O'Higgins</title>
        <meta name="description" content="Professional experience and work history of Lochlann O'Higgins in web development, design, sport coaching, and digital marketing." />
      </Helmet>
      
      <div className="mt-16">
        <div className="py-16 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-6">
                <FaBriefcase className="text-primary-light text-3xl" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Professional Journey</h1>
              
              <p className="mb-8 max-w-2xl mx-auto text-slate-300">
                From web development and design to coaching and marketing, explore my career path and the skills I've developed along the way.
              </p>
              
              <Link to="/resume" target="_blank" className="inline-block">
                <GradientButton className="px-6 py-3 flex items-center gap-2">
                  <FaDownload />
                  Download Full CV
                </GradientButton>
              </Link>
            </motion.div>
          </div>
        </div>
        
        <EnhancedTimeline />
        
        <div className="py-16 bg-white dark:bg-dark">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-2xl font-space font-bold mb-6 text-slate-800 dark:text-white">Interested in working together?</h3>
            <p className="mb-8 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            <Link to="/contact">
              <GradientButton>Get In Touch</GradientButton>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Experience;
