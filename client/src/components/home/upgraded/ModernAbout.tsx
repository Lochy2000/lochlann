import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '@/lib/framerAnimations';
import AnimatedGrid from './AnimatedGrid';

const ModernAbout = () => {
  const skills = [
    { name: 'Web Development', icon: '💻', color: 'bg-blue-500' },
    { name: 'WordPress', icon: '🌐', color: 'bg-indigo-500' },
    { name: 'UI/UX Design', icon: '🎨', color: 'bg-purple-500' },
    { name: 'SEO', icon: '📈', color: 'bg-green-500' },
    { name: 'ReactJS', icon: '⚛️', color: 'bg-teal-500' },
    { name: 'Coaching', icon: '🏆', color: 'bg-orange-500' }
  ];

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-900 relative">
      {/* Animated Grid Background */}
      <AnimatedGrid 
        opacity={0.15} 
        angle={60} 
        spacing={25} 
        lineWidth={1} 
        animationSpeed={3}
        lineColor1="#040927"
        lineColor2="#c22938"
        lineColor3="#e16f23"
      />
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-5xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-center"
            variants={fadeIn}
          >
            About <span className="text-primary">Me</span>
          </motion.h2>

          <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
            <motion.div 
              className="md:w-1/2 mb-4 md:mb-0"
              variants={fadeIn}
              custom={0.2}
            >
              <div className="relative rounded-2xl overflow-hidden">
                <img 
                  src="https://res.cloudinary.com/dpw2txejq/image/upload/v1744655473/activites_l0ffzh.png" 
                  alt="Lochlann O'Higgins Activities" 
                  className="w-full h-auto rounded-2xl shadow-md transition-transform hover:scale-105 duration-500"
                />
                <div className="absolute inset-0 "></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <span className="font-mono text-sm text-primary-light">Full Stack Developer in Training</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="md:w-1/2"
              variants={fadeIn}
              custom={0.4}
            >
              <p className="text-lg mb-4 text-slate-700 dark:text-slate-300">
                I'm a developer and coach with a passion for building impactful tech and uplifting communities 
                through sport and innovation. From leading web projects to coaching table tennis, I bring 
                energy and adaptability to everything I do.
              </p>
              <p className="text-lg mb-6 text-slate-700 dark:text-slate-300">
                My dual experience in technology and sport coaching gives me unique insight into creating 
                engaging digital experiences and effective team dynamics.
              </p>

              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <motion.div 
                    key={index}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full ${skill.color} text-white`}
                    variants={fadeIn}
                    custom={0.6 + (index * 0.1)}
                  >
                    <span className="text-xl">{skill.icon}</span>
                    <span className="font-medium">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ModernAbout;
