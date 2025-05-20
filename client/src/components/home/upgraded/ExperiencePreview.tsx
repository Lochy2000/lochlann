import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { fadeIn, staggerContainer } from '@/lib/framerAnimations';
import { experiences } from '@/data/experience';
import AnimatedDotGrid from './AnimatedGrid';

const ExperiencePreview = () => {
  // Get only the most recent 3 experiences
  const recentExperiences = experiences.slice(0, 3);
  
  return (
    <section className="py-16 bg-white dark:bg-slate-900 relative">
      {/* Animated Grid Background */}
      <AnimatedDotGrid
          dotColor="#ffb997"      // peachy color
          dotRadius={1.5}
          spacing={35}
          animationSpeed={0.3}
          opacityBase={0.1}
          opacityWave={0.2}
        />
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-5xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="flex flex-wrap items-center justify-between mb-10">
            <motion.div variants={fadeIn}>
              <h2 className="text-3xl md:text-4xl font-bold">
                Recent <span className="text-primary">Experience</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                Highlights from my professional journey
              </p>
            </motion.div>
            
            <motion.div 
              variants={fadeIn}
              custom={0.2}
            >
              <Link 
                to="/experience" 
                className="inline-flex items-center gap-2 text-primary dark:text-primary-light hover:underline"
              >
                View Full Experience
                <FaArrowRight />
              </Link>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentExperiences.map((experience, index) => (
              <motion.div
                key={index}
                className="rounded-xl bg-slate-50 dark:bg-slate-800 shadow-md p-6 border-l-4 border-primary"
                variants={fadeIn}
                custom={0.4 + (index * 0.1)}
              >
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  {experience.date}
                </span>
                <h3 className="text-xl font-bold mt-2 mb-1">
                  {experience.title}
                </h3>
                <p className="text-primary dark:text-primary-light font-medium mb-3">
                  {experience.company}
                </p>
                <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-3">
                  {experience.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {experience.skills.slice(0, 3).map((skill, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded-md text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                  {experience.skills.length > 3 && (
                    <span className="px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded-md text-xs font-medium">
                      +{experience.skills.length - 3} more
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperiencePreview;
