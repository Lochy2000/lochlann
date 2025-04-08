import { Helmet } from 'react-helmet';
import Timeline from '@/components/experience/Timeline';
import { Link } from 'wouter';
import SectionTitle from '@/components/ui/SectionTitle';
import GradientButton from '@/components/ui/GradientButton';
import { motion } from 'framer-motion';
import { FaFilePdf } from 'react-icons/fa';

const Experience = () => {
  return (
    <>
      <Helmet>
        <title>Experience | Lochlann O'Higgins</title>
        <meta name="description" content="Professional experience and work history of Lochlann O'Higgins in web development, design, and digital marketing." />
      </Helmet>
      
      <div className="mt-16">
        <div className="py-16 bg-light dark:bg-dark">
          <div className="container mx-auto px-4">
            <SectionTitle
              title="Professional Experience"
              subtitle="A chronological overview of my career journey and the skills I've developed along the way."
            />
            
            <motion.div 
              className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="mb-8 text-slate-600 dark:text-slate-300">
                From my current role as a Website Specialist at Parallax Cinematics to my earlier experiences in digital marketing and content creation, each position has contributed to my diverse skill set in web development and design.
              </p>
              
              <Link href="/resume">
                <GradientButton className="px-6 py-3 flex items-center gap-2">
                  <FaFilePdf />
                  Download Full CV
                </GradientButton>
              </Link>
            </motion.div>
          </div>
        </div>
        
        <Timeline />
        
        <div className="py-16 bg-light dark:bg-dark">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-2xl font-space font-bold mb-6 text-slate-800 dark:text-white">Interested in working together?</h3>
            <p className="mb-8 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            <Link href="/contact">
              <GradientButton>Get In Touch</GradientButton>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Experience;
