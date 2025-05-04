import { motion } from 'framer-motion';
import TimelineItem from './TimelineItem';
import SectionTitle from '@/components/ui/SectionTitle';
import { experiences } from '@/data/experience';
import { staggerContainer } from '@/lib/framerAnimations';
import { Link } from 'react-router-dom';
import { FaDownload } from 'react-icons/fa';

const Timeline = () => {
  return (
    <section id="experience" className="py-20 gradient-bg dark:bg-darker">
      <div className="container mx-auto px-4">
        <SectionTitle
          title={<>Professional <span className="text-gradient">Experience</span></>}
          subtitle="My professional journey and the skills I've developed along the way."
          light
        />
        
        <motion.div 
          className="max-w-4xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="relative timeline-container pl-10 md:pl-0">
            {experiences.map((experience, index) => (
              <TimelineItem
                key={index}
                position={index}
                date={experience.date}
                title={experience.title}
                company={experience.company}
                description={experience.description}
                skills={experience.skills}
              />
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/resume" className="inline-flex items-center text-primary-light hover:text-primary-dark dark:hover:text-white transition-colors">
              <span>View Full Resume</span>
              <FaDownload className="ml-2" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Timeline;
