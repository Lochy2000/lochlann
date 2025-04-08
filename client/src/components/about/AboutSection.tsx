import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import SkillBadge from '@/components/ui/SkillBadge';
import AchievementCard from './AchievementCard';
import { skills } from '@/data/skills';
import { achievements } from '@/data/achievements';
import { fadeIn, staggerContainer, slideUp } from '@/lib/framerAnimations';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-light dark:bg-dark">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="About Me"
          subtitle="My journey, experiences, and the skills I've developed along the way."
        />
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={fadeIn}>
            <h3 className="text-2xl font-space font-bold mb-4 text-slate-800 dark:text-white">My Story</h3>
            <p className="mb-4 text-slate-600 dark:text-slate-300">
              Growing up I spent a lot of time moving countries and never settling down anywhere. This experience taught me adaptability and gave me a unique global perspective on both life and work.
            </p>
            <p className="mb-6 text-slate-600 dark:text-slate-300">
              I see myself as an inclusive person who is always eager to learn more while having a strong focus and drive. Passionate about many things and enjoy staying active with various hobbies. I try to have a positive impact on my environment and enjoy seeing others do well and achieve their goals in life.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                <div className="text-2xl text-primary mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h4 className="font-space font-bold text-slate-800 dark:text-white">Languages</h4>
                <p className="text-slate-600 dark:text-slate-300 text-sm">English (Native)<br/>Danish (Native)</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                <div className="text-2xl text-primary mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                  </svg>
                </div>
                <h4 className="font-space font-bold text-slate-800 dark:text-white">Education</h4>
                <p className="text-slate-600 dark:text-slate-300 text-sm">Sport Science (1st Class Honors)<br/>Software Development</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <SkillBadge key={index} name={skill} />
              ))}
            </div>
          </motion.div>
          
          <motion.div variants={slideUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <AchievementCard
                key={index}
                title={achievement.title}
                description={achievement.description}
                icon={achievement.icon}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
