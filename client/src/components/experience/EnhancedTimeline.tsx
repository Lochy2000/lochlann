import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { experiences, educationTimeline, certifications, milestones } from '@/data/experience';
import { IconType } from 'react-icons';
import { FaGraduationCap, FaCertificate, FaTrophy, FaArrowDown, FaBriefcase } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import GradientButton from '@/components/ui/GradientButton';
import EnhancedTimelineItem from './EnhancedTimelineItem';

// Custom hook for smooth scrolling
const useSmoothScroll = () => {
  const scrollToElement = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return { scrollToElement };
};

interface MilestoneProps {
  year: string;
  title: string;
  description: string;
  isLeft?: boolean;
}

const Milestone: React.FC<MilestoneProps> = ({ year, title, description, isLeft = true }) => {
  return (
    <motion.div 
      className="relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-green-400 border-4 border-slate-900"></div>
      <div className="flex flex-col md:flex-row items-center">
        <div className={`md:w-1/2 ${isLeft ? 'md:pr-8 md:text-right' : 'md:order-2'} pb-8 md:pb-0`}>
          {isLeft ? (
            <>
              <h3 className="text-2xl font-bold mb-2 text-white">{year}</h3>
              <h4 className="text-xl font-medium text-green-400 mb-2">{title}</h4>
              <p className="text-slate-300">
                {description}
              </p>
            </>
          ) : (
            <div></div>
          )}
        </div>
        <div className={`md:w-1/2 ${isLeft ? '' : 'md:pr-8 md:text-right'} md:pl-8`}>
          {!isLeft ? (
            <>
              <h3 className="text-2xl font-bold mb-2 text-white">{year}</h3>
              <h4 className="text-xl font-medium text-green-400 mb-2">{title}</h4>
              <p className="text-slate-300">
                {description}
              </p>
            </>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

interface TimelineSectionHeaderProps {
  title: string;
  icon: IconType;
  description: string;
}

const TimelineSectionHeader: React.FC<TimelineSectionHeaderProps> = ({ 
  title, 
  icon: Icon, 
  description 
}) => {
  return (
    <motion.div 
      className="py-8 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 mb-4">
        <Icon className="text-green-400 text-2xl" />
      </div>
      <h2 className="text-3xl font-bold mb-3 text-white">{title}</h2>
      <p className="max-w-2xl mx-auto text-slate-300">
        {description}
      </p>
    </motion.div>
  );
};

const EnhancedTimeline = () => {
  const { scrollToElement } = useSmoothScroll();
  const sectionsRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("experience");

  const handleNavClick = (section: string) => {
    setActiveSection(section);
    scrollToElement(section);
  };

  return (
    <div ref={sectionsRef}>
      {/* Navigation Menu */}
      <div className="sticky top-20 z-30 bg-slate-900/80 backdrop-blur-md py-4 border-b border-slate-700">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-2 overflow-x-auto pb-2">
            <button
              onClick={() => handleNavClick("experience")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeSection === "experience"
                  ? "bg-green-500 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-green-500/30 hover:border-green-400/60"
              }`}
            >
              Work Experience
            </button>
            <button
              onClick={() => handleNavClick("education")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeSection === "education"
                  ? "bg-green-500 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-green-500/30 hover:border-green-400/60"
              }`}
            >
              Education
            </button>
            <button
              onClick={() => handleNavClick("certifications")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeSection === "certifications"
                  ? "bg-green-500 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-green-500/30 hover:border-green-400/60"
              }`}
            >
              Certifications
            </button>
            <button
              onClick={() => handleNavClick("milestones")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeSection === "milestones"
                  ? "bg-green-500 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-green-500/30 hover:border-green-400/60"
              }`}
            >
              Key Milestones
            </button>
          </div>
        </div>
      </div>

      {/* Call to action button */}
      <div className="text-center py-6">
        <a href="mailto:lochlannohiggins@gmail.com?subject=CV%20Request&body=Hi%20Lochlann,%0A%0AI'd%20like%20to%20request%20a%20copy%20of%20your%20current%20CV.%0A%0AThanks!" target="_blank">
          <GradientButton className="px-6 py-3 font-medium">
            Request CV
          </GradientButton>
        </a>
      </div>

      {/* Scroll down indicator */}
      <motion.div 
        className="flex justify-center mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.6, 
          repeat: Infinity, 
          repeatType: "reverse" 
        }}
      >
        <div className="text-center text-slate-500 dark:text-slate-400">
          <p>Scroll to explore my journey</p>
          <FaArrowDown className="mx-auto mt-2" />
        </div>
      </motion.div>

      {/* Work Experience Section */}
      <section id="experience" className="pt-10 pb-20 relative">
        {/* Subtle overlay to dim background slightly */}
        <div className="absolute inset-0 bg-slate-950/30 backdrop-blur-sm"></div>
        
        <div className="relative z-10">
          <TimelineSectionHeader 
            title="Professional Experience" 
            icon={FaBriefcase}
            description="My career journey through various roles in web development, design, and digital marketing."
          />
        </div>
        
        <div className="container mx-auto px-4 mt-8 relative z-10">
          <div className="relative mt-12">
            {experiences.map((exp, index) => (
              <EnhancedTimelineItem
                key={index}
                position={index}
                date={exp.date}
                title={exp.title}
                company={exp.company}
                description={exp.description}
                skills={exp.skills}
                keyPoints={exp.keyPoints}
                icon={exp.icon}
                iconColor={exp.iconColor}
                isAlternate={index % 2 !== 0}
                location={exp.location}
                ongoing={exp.ongoing}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="pt-10 pb-20 relative">
        {/* Subtle overlay to dim background slightly */}
        <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"></div>
        
        <div className="relative z-10">
          <TimelineSectionHeader 
            title="Education" 
            icon={FaGraduationCap}
            description="My academic journey and the qualifications I've gained along the way."
          />
        </div>
        
        <div className="container mx-auto px-4 mt-8 relative z-10">
          <div className="relative mt-12">
            {educationTimeline.map((edu, index) => (
              <EnhancedTimelineItem
                key={index}
                position={index}
                date={edu.date}
                title={edu.title}
                company={edu.institution}
                description={edu.description}
                skills={edu.skills}
                icon={FaGraduationCap}
                iconColor="primary"
                isAlternate={index % 2 !== 0}
                achievement={edu.achievement}
                ongoing={edu.ongoing}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="pt-10 pb-20 relative">
        {/* Subtle overlay to dim background slightly */}
        <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-sm"></div>
        
        <div className="relative z-10">
          <TimelineSectionHeader 
            title="Certifications" 
            icon={FaCertificate}
            description="Professional certifications and qualifications that enhance my skills."
          />
        </div>
        
        <div className="container mx-auto px-4 mt-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                className="group bg-slate-900/90 backdrop-blur-sm rounded-xl overflow-hidden border border-green-500/30 hover:border-cyan-400/60 transition-all duration-300 shadow-lg hover:shadow-green-500/20 relative p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  y: -2,
                  boxShadow: '0 10px 30px rgba(34, 197, 94, 0.3)'
                }}
              >
                {/* Glowing border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-cyan-400/10 to-green-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="flex items-start gap-4 relative z-10">
                  <div className="bg-green-500/10 p-3 rounded-lg">
                    <FaCertificate className="text-green-400 text-xl" />
                  </div>
                  <div>
                    <div className="text-sm text-green-400 mb-1">{cert.date}</div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{cert.title}</h3>
                    <p className="text-slate-400 text-sm mb-3">{cert.issuer}</p>
                    <p className="text-slate-300">{cert.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Milestones Section */}
      <section id="milestones" className="pt-10 pb-20 relative">
        {/* Subtle overlay to dim background slightly */}
        <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"></div>
        
        <div className="relative z-10">
          <TimelineSectionHeader 
            title="Key Milestones" 
            icon={FaTrophy}
            description="Significant moments and achievements that have shaped my path."
          />
        </div>
        
        <div className="container mx-auto px-4 mt-8 relative z-10">
          <div className="max-w-3xl mx-auto mt-16 relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-green-400/80 to-cyan-400/80"></div>
            
            {/* Timeline Items */}
            <div className="space-y-24">
              {milestones.map((milestone, index) => (
                <Milestone
                  key={index}
                  year={milestone.year}
                  title={milestone.title}
                  description={milestone.description}
                  isLeft={index % 2 === 0}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EnhancedTimeline;
