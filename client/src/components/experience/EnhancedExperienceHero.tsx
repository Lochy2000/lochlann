import { motion } from 'framer-motion';
import { FaBriefcase, FaDownload, FaRocket, FaCode, FaUsers, FaTrophy } from 'react-icons/fa';
import GradientButton from '@/components/ui/GradientButton';

const EnhancedExperienceHero = () => {
  const achievements = [
    { icon: FaCode, label: "Projects Delivered", value: "15+" },
    { icon: FaUsers, label: "Teams Led", value: "3" },
    { icon: FaTrophy, label: "Years Experience", value: "3+" },
  ];

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-transparent overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Hero Title with Enhanced Styling */}
          <motion.div
            className="flex items-center justify-center mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500/20 to-blue-500/20 flex items-center justify-center border border-green-500/30">
              <FaBriefcase className="text-3xl text-green-400" />
            </div>
          </motion.div>

          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-white">Professional </span>
            <span className="text-gradient bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Journey
            </span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p 
            className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            From web development and design to coaching and marketing, 
            <span className="text-green-400 font-medium"> explore my career path</span> and 
            the skills I've developed along the way
          </motion.p>

          {/* Achievement Stats */}
          <motion.div
            className="flex flex-wrap justify-center gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="bg-slate-800/50 border border-green-500/30 hover:border-green-400/60 px-6 py-4 rounded-xl min-w-[140px] backdrop-blur-sm transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 10px 30px rgba(34, 197, 94, 0.2)'
                }}
              >
                <achievement.icon className="text-green-400 text-2xl mb-2 mx-auto" />
                <div className="text-2xl font-bold text-white mb-1">{achievement.value}</div>
                <div className="text-sm text-slate-400">{achievement.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.a 
              href="mailto:lochlannohiggins@gmail.com?subject=CV%20Request&body=Hi%20Lochlann,%0A%0AI'd%20like%20to%20request%20a%20copy%20of%20your%20current%20CV.%0A%0AThanks!"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <GradientButton className="px-8 py-4 flex items-center gap-3 text-lg font-medium">
                <FaDownload className="text-xl" />
                Request CV
              </GradientButton>
            </motion.a>

            <motion.button
              onClick={() => {
                document.getElementById('timeline-section')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
              className="px-8 py-4 rounded-full border-2 border-green-500/30 text-white hover:bg-green-500/10 hover:border-green-400/60 transition-all duration-300 flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaRocket className="text-lg" />
              Explore Journey
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Simple Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <div
            className="text-white/60 text-center cursor-pointer"
            onClick={() => {
              document.getElementById('timeline-section')?.scrollIntoView({ 
                behavior: 'smooth' 
              });
            }}
          >
            <div className="text-sm mb-2">Scroll to explore</div>
            <div className="w-1 h-8 bg-gradient-to-b from-green-400 to-transparent rounded-full mx-auto opacity-60" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedExperienceHero;
