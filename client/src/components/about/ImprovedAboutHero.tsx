import { motion } from 'framer-motion';
import { FaCode, FaRunning, FaWater, FaUser, FaRocket } from 'react-icons/fa';

const ImprovedAboutHero = () => {
  const quickStats = [
    { label: "Years Coding", value: "3+", icon: FaCode },
    { label: "Marathons", value: "2", icon: FaRunning },
    { label: "Dive Depth", value: "30m", icon: FaWater },
  ];

  return (
    <section className="pt-20 pb-16 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <FaUser className="text-4xl text-primary" />
            <span className="text-slate-400 text-xl">×</span>
            <FaCode className="text-4xl text-secondary" />
            <span className="text-slate-400 text-xl">×</span>
            <FaRocket className="text-4xl text-cyan-400" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Developer, Coach & <span className="text-gradient bg-gradient-to-r from-primary via-secondary to-cyan-400 bg-clip-text text-transparent">Ocean Explorer</span>
          </h1>
          
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Building impactful tech while exploring life above and below the surface.
            Each experience shapes my approach to problem-solving and innovation.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700">
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <span className="text-slate-300 text-sm">Currently Available</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700">
              <FaCode className="text-slate-400" />
              <span className="text-slate-300 text-sm">Full-Stack Developer</span>
            </div>
          </div>
          
          {/* Tech stats matching Portfolio style */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            {quickStats.map((stat, index) => (
              <motion.div
                key={index}
                className="p-4 rounded-lg bg-slate-800/30 border border-blue-500/30 hover:border-cyan-400/60 backdrop-blur-sm relative overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)'
                }}
              >
                {/* Glowing border on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="text-2xl mb-1">
                    <stat.icon className="text-cyan-400 mx-auto" />
                  </div>
                  <div className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">{stat.value}</div>
                  <div className="text-sm text-slate-400 group-hover:text-blue-300 transition-colors">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>


    </section>
  );
};

export default ImprovedAboutHero;