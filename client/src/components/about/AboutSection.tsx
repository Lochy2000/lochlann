import { motion } from 'framer-motion';
import { useState } from 'react';
import SectionTitle from '@/components/ui/SectionTitle';
import SkillBadge from '@/components/ui/SkillBadge';
import AchievementCard from './AchievementCard';
import ExpandableStorySection from './ExpandableStorySection';
import AnimatedProfile from './AnimatedProfile';
import { skills } from '@/data/skills';
import { achievements } from '@/data/achievements';
import { fadeIn, staggerContainer, slideUp } from '@/lib/framerAnimations';

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  const renderAchievements = () => {
    let filteredAchievements = achievements;
    
    if (activeTab === 'tech') {
      filteredAchievements = achievements.filter(a => 
        ['2x Hackathon Winner', 'Web Studio Founder'].includes(a.title)
      );
    } else if (activeTab === 'sports') {
      filteredAchievements = achievements.filter(a => 
        ['Marathon Runner', 'Elite Coach', 'Paralympic Training', 'Wheelchair Rugby', 'PADI Diver'].includes(a.title)
      );
    }
    
    return (
      <motion.div 
        variants={slideUp} 
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {filteredAchievements.map((achievement, index) => (
          <AchievementCard
            key={index}
            title={achievement.title}
            description={achievement.description}
            icon={achievement.icon}
          />
        ))}
      </motion.div>
    );
  };
  
  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 bg-light dark:bg-dark section-mobile-spacing">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="About Me"
          subtitle="Developer, Coach, and Sports Enthusiast bringing energy and adaptability to every challenge."
        />
        
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start mobile-grid-single"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={fadeIn}>
            <div className="mb-8 hidden md:block">
              <AnimatedProfile />
            </div>
            
            <h3 className="text-2xl font-space font-bold mb-6 text-slate-800 dark:text-white">My Story</h3>
            
            <p className="mb-4 sm:mb-6 text-slate-600 dark:text-slate-300 text-content-mobile">
              I'm a developer and coach with a passion for building impactful tech and uplifting communities through sport and innovation. From leading web projects and winning hackathons to coaching table tennis and wheelchair rugby league, I bring energy and adaptability into everything I do.
            </p>
            
            <ExpandableStorySection 
              title="Technology Journey"
              summary="In tech, I've competed in 7 hackathons (winning 2), built digital platforms for startups, and led UX-forward projects like HerEdge."
              fullContent="My development journey includes creating and launching easywebs.uk—my web design studio helping small businesses establish their digital presence. I focus on responsive design, SEO optimization, and user experience across every project. I'm currently expanding my full-stack capabilities through the Code Institute program, applying my skills to build solutions that solve real-world problems."
            />
            
            <ExpandableStorySection 
              title="Athletic Background"
              summary="I've completed two London Marathons, half-marathons in Belgium and Germany, and trained with elite teams including the GB Paratriathlon squad."
              fullContent="Sports has always been a foundational part of my identity. I currently play for the Harlequins Wheelchair Rugby Team and hold Level 2 coaching certifications in both wheelchair rugby and table tennis. This athletic background has instilled the discipline, teamwork, and resilience that I bring to every professional challenge. When I'm not building or coaching, you'll find me 15m underwater, free diving or scuba diving with my PADI license."
            />
            
            <ExpandableStorySection 
              title="Global Perspective"
              summary="Having lived in multiple countries, I bring a unique global perspective to both my development work and coaching approach."
              fullContent="My international upbringing has shaped how I approach problems and collaborate with diverse teams. This global mindset helps me create inclusive, accessible solutions that resonate across cultural boundaries—whether I'm developing websites or coaching athletes. The adaptability I've gained from embracing different environments gives me a unique edge in both technology and sports."
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8 mt-6 sm:mt-8">
              <motion.div 
                className="p-3 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-primary transition-all duration-300 hover:shadow-md card-mobile-spacing"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="text-2xl text-primary mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h4 className="font-space font-bold text-slate-800 dark:text-white text-sm sm:text-base">Languages</h4>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm">English (Native)<br/>Danish (Native)</p>
              </motion.div>
              <motion.div 
                className="p-3 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-primary transition-all duration-300 hover:shadow-md card-mobile-spacing"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="text-2xl text-primary mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998a12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                  </svg>
                </div>
                <h4 className="font-space font-bold text-slate-800 dark:text-white text-sm sm:text-base">Education</h4>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm">Sport Science (1st Class Honors)<br/>Full Stack Development (Code Institute)</p>
              </motion.div>
            </div>
            
            <h4 className="text-lg sm:text-xl font-space font-bold mb-3 sm:mb-4 text-slate-800 dark:text-white">Skills & Technologies</h4>
            <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
              {skills.map((skill, index) => (
                <SkillBadge key={index} name={skill} />
              ))}
            </div>
          </motion.div>
          
          <div>
            <div className="flex mb-4 sm:mb-6 border-b border-slate-200 dark:border-slate-700 tab-nav-mobile">
              <button
                className={`py-2 px-3 sm:px-4 font-medium transition-colors duration-200 text-sm sm:text-lg ${
                  activeTab === 'all'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-slate-600 dark:text-slate-400 hover:text-primary'
                }`}
                onClick={() => setActiveTab('all')}
              >
                All Achievements
              </button>
              <button
                className={`py-2 px-3 sm:px-4 font-medium transition-colors duration-200 text-sm sm:text-lg ${
                  activeTab === 'tech'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-slate-600 dark:text-slate-400 hover:text-primary'
                }`}
                onClick={() => setActiveTab('tech')}
              >
                Tech
              </button>
              <button
                className={`py-2 px-3 sm:px-4 font-medium transition-colors duration-200 text-sm sm:text-lg ${
                  activeTab === 'sports'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-slate-600 dark:text-slate-400 hover:text-primary'
                }`}
                onClick={() => setActiveTab('sports')}
              >
                Sports
              </button>
            </div>
            
            {renderAchievements()}
            
            <div className="mt-6 sm:mt-8 lg:hidden">
              <AnimatedProfile />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
