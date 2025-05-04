import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { experiences, educationTimeline, certifications, milestones } from '@/data/experience';
import { IconType } from 'react-icons';
import { FaGraduationCap, FaCertificate, FaTrophy, FaArrowDown, FaBriefcase } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import GradientButton from '@/components/ui/GradientButton';

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

interface TimelineEntryProps {
  date: string;
  title: string;
  organization: string;
  description: string;
  skills: string[];
  keyPoints?: string[];
  icon?: IconType;
  iconColor?: string;
  isAlternate?: boolean;
  achievement?: string;
  ongoing?: boolean;
}

const TimelineEntry: React.FC<TimelineEntryProps> = ({
  date,
  title,
  organization,
  description,
  skills,
  keyPoints,
  icon: Icon,
  iconColor = 'primary',
  isAlternate = false,
  achievement,
  ongoing,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const colorMap: Record<string, string> = {
    primary: 'text-primary',
    blue: 'text-blue-500',
    green: 'text-green-500',
    purple: 'text-purple-500',
    red: 'text-red-500',
    yellow: 'text-yellow-500',
    cyan: 'text-cyan-500',
    pink: 'text-pink-500',
    indigo: 'text-indigo-500',
    gray: 'text-gray-500',
  };

  const bgColorMap: Record<string, string> = {
    primary: 'bg-primary/10',
    blue: 'bg-blue-500/10',
    green: 'bg-green-500/10',
    purple: 'bg-purple-500/10',
    red: 'bg-red-500/10',
    yellow: 'bg-yellow-500/10',
    cyan: 'bg-cyan-500/10',
    pink: 'bg-pink-500/10',
    indigo: 'bg-indigo-500/10',
    gray: 'bg-gray-500/10',
  };

  const iconClass = colorMap[iconColor] || 'text-primary';
  const bgClass = bgColorMap[iconColor] || 'bg-primary/10';

  return (
    <motion.div
      className={`relative flex flex-col md:flex-row gap-4 pb-16 ${
        isAlternate ? 'md:flex-row-reverse text-right' : 'text-left'
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
    >
      {/* Timeline line and dot */}
      <div className="absolute top-0 bottom-0 left-[19px] md:left-1/2 md:transform md:-translate-x-1/2 w-1 bg-gradient-to-b from-primary/80 to-secondary/50"></div>
      <div className={`absolute top-0 left-[15px] md:left-1/2 md:transform md:-translate-x-1/2 w-9 h-9 rounded-full border-4 border-white dark:border-slate-900 flex items-center justify-center ${bgClass}`}>
        {Icon && <Icon className={`text-lg ${iconClass}`} />}
      </div>

      {/* Content - Time/Title section */}
      <div className={`md:w-1/2 ${isAlternate ? 'md:pr-12' : 'md:pl-12'} pt-2`}>
        <div className="hidden md:block">
          <div className={`text-sm font-mono ${ongoing ? 'text-green-500' : 'text-primary'}`}>
            {date} {ongoing && '(Ongoing)'}
          </div>
          {achievement && (
            <div className="inline-block px-2 py-1 rounded bg-primary/20 text-xs text-primary mt-1 mb-2">
              {achievement}
            </div>
          )}
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">{title}</h3>
          <p className="text-slate-500 dark:text-slate-400">{organization}</p>
        </div>
      </div>

      {/* Content - Description section */}
      <div className={`md:w-1/2 ${isAlternate ? 'md:pl-12' : 'md:pr-12'} pt-2 ml-10 md:ml-0`}>
        <div className="md:hidden mb-3">
          <div className={`text-sm font-mono ${ongoing ? 'text-green-500' : 'text-primary'}`}>
            {date} {ongoing && '(Ongoing)'}
          </div>
          {achievement && (
            <div className="inline-block px-2 py-1 rounded bg-primary/20 text-xs text-primary mt-1 mb-2">
              {achievement}
            </div>
          )}
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">{title}</h3>
          <p className="text-slate-500 dark:text-slate-400">{organization}</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700 hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-300">
          <p className="text-slate-600 dark:text-slate-300">
            {description}
          </p>

          {/* Key Points (expandable) */}
          {keyPoints && keyPoints.length > 0 && (
            <div className="mt-4">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-primary hover:text-primary-dark transition-colors flex items-center text-sm font-medium"
              >
                {isExpanded ? 'Hide Details' : 'Show Key Responsibilities'}
                <span className="ml-1 transform transition-transform duration-300 inline-block">
                  {isExpanded ? '▲' : '▼'}
                </span>
              </button>

              {isExpanded && (
                <motion.ul
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 space-y-2 pl-5 list-disc text-slate-600 dark:text-slate-300"
                >
                  {keyPoints.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </motion.ul>
              )}
            </div>
          )}

          {/* Skills */}
          <div className="mt-4 flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 rounded-full bg-primary/10 text-primary-dark dark:text-primary-light text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
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
      <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-primary border-4 border-white dark:border-slate-900"></div>
      <div className="flex flex-col md:flex-row items-center">
        <div className={`md:w-1/2 ${isLeft ? 'md:pr-8 md:text-right' : 'md:order-2'} pb-8 md:pb-0`}>
          {isLeft ? (
            <>
              <h3 className="text-2xl font-bold mb-2 text-slate-800 dark:text-white">{year}</h3>
              <h4 className="text-xl font-medium text-primary mb-2">{title}</h4>
              <p className="text-slate-600 dark:text-slate-300">
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
              <h3 className="text-2xl font-bold mb-2 text-slate-800 dark:text-white">{year}</h3>
              <h4 className="text-xl font-medium text-primary mb-2">{title}</h4>
              <p className="text-slate-600 dark:text-slate-300">
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
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
        <Icon className="text-primary text-2xl" />
      </div>
      <h2 className="text-3xl font-bold mb-3 text-slate-800 dark:text-white">{title}</h2>
      <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-300">
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
      <div className="sticky top-20 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md py-4 border-b border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-2 overflow-x-auto pb-2">
            <button
              onClick={() => handleNavClick("experience")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeSection === "experience"
                  ? "bg-primary text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              Work Experience
            </button>
            <button
              onClick={() => handleNavClick("education")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeSection === "education"
                  ? "bg-primary text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              Education
            </button>
            <button
              onClick={() => handleNavClick("certifications")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeSection === "certifications"
                  ? "bg-primary text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              Certifications
            </button>
            <button
              onClick={() => handleNavClick("milestones")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeSection === "milestones"
                  ? "bg-primary text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              Key Milestones
            </button>
          </div>
        </div>
      </div>

      {/* Call to action button */}
      <div className="text-center py-6">
        <Link to="/download/cv" target="_blank">
          <GradientButton className="px-6 py-3 font-medium">
            Download Full CV
          </GradientButton>
        </Link>
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
      <section id="experience" className="pt-10 pb-20">
        <TimelineSectionHeader 
          title="Professional Experience" 
          icon={FaBriefcase}
          description="My career journey through various roles in web development, design, and digital marketing."
        />
        
        <div className="container mx-auto px-4 mt-8">
          <div className="relative mt-12">
            {experiences.map((exp, index) => (
              <TimelineEntry
                key={index}
                date={exp.date}
                title={exp.title}
                organization={exp.company}
                description={exp.description}
                skills={exp.skills}
                keyPoints={exp.keyPoints}
                icon={exp.icon}
                iconColor={exp.iconColor}
                isAlternate={index % 2 !== 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="pt-10 pb-20 bg-slate-50 dark:bg-slate-900">
        <TimelineSectionHeader 
          title="Education" 
          icon={FaGraduationCap}
          description="My academic journey and the qualifications I've gained along the way."
        />
        
        <div className="container mx-auto px-4 mt-8">
          <div className="relative mt-12">
            {educationTimeline.map((edu, index) => (
              <TimelineEntry
                key={index}
                date={edu.date}
                title={edu.title}
                organization={edu.institution}
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
      <section id="certifications" className="pt-10 pb-20">
        <TimelineSectionHeader 
          title="Certifications" 
          icon={FaCertificate}
          description="Professional certifications and qualifications that enhance my skills."
        />
        
        <div className="container mx-auto px-4 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <FaCertificate className="text-primary text-xl" />
                  </div>
                  <div>
                    <div className="text-sm text-primary mb-1">{cert.date}</div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{cert.title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-3">{cert.issuer}</p>
                    <p className="text-slate-600 dark:text-slate-300">{cert.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Milestones Section */}
      <section id="milestones" className="pt-10 pb-20 bg-slate-50 dark:bg-slate-900">
        <TimelineSectionHeader 
          title="Key Milestones" 
          icon={FaTrophy}
          description="Significant moments and achievements that have shaped my path."
        />
        
        <div className="container mx-auto px-4 mt-8">
          <div className="max-w-3xl mx-auto mt-16 relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary/80 to-secondary/80"></div>
            
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
