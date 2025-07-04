import { Helmet } from 'react-helmet';
import EnhancedTimeline from '@/components/experience/EnhancedTimeline';
import TechBackground from '@/components/ui/TechBackground';
import { Link } from 'react-router-dom';
import GradientButton from '@/components/ui/GradientButton';
import { motion } from 'framer-motion';
import { FaBriefcase, FaDownload, FaRocket, FaCode, FaUsers, FaTrophy, FaGithub } from 'react-icons/fa';

const Experience = () => {
  const achievements = [
    { icon: FaCode, label: "Projects Delivered", value: "15+" },
    { icon: FaUsers, label: "Teams Led", value: "3" },
    { icon: FaTrophy, label: "Years Experience", value: "3+" },
  ];

  return (
    <>
      <Helmet>
        <title>Experience | Lochlann O'Higgins</title>
        <meta name="description" content="Professional experience and work history of Lochlann O'Higgins in web development, design, sport coaching, and digital marketing." />
      </Helmet>
      
      <div className="mt-16 relative bg-slate-950 min-h-screen">
        {/* Tech Background covering entire page */}
        <div className="fixed inset-0 z-0">
          <TechBackground variant="experience" intensity="subtle" />
        </div>
        
        {/* GitHub-inspired sci-fi hero section matching Portfolio */}
        <section className="pt-20 pb-16 relative overflow-hidden z-20">
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <FaBriefcase className="text-4xl text-green-400" />
                <span className="text-slate-400 text-xl">×</span>
                <FaCode className="text-4xl text-blue-400" />
                <span className="text-slate-400 text-xl">×</span>
                <FaRocket className="text-4xl text-purple-400" />
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Professional <span className="text-gradient bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Journey</span>
              </h1>
              
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                From web development and design to coaching and marketing, explore my career path
                and the skills I've developed along the way.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700">
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <span className="text-slate-300 text-sm">Available for new opportunities</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700">
                  <FaGithub className="text-slate-400" />
                  <a 
                    href="https://github.com/Lochy2000" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-green-400 hover:text-green-300 transition-colors text-sm"
                  >
                    @Lochy2000
                  </a>
                </div>
              </div>
              
              {/* Tech stats matching Portfolio style */}
              <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    className="p-4 rounded-lg bg-slate-800/30 border border-green-500/30 hover:border-cyan-400/60 backdrop-blur-sm relative overflow-hidden group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    whileHover={{ 
                      scale: 1.05, 
                      backgroundColor: 'rgba(34, 197, 94, 0.1)',
                      boxShadow: '0 10px 30px rgba(34, 197, 94, 0.3)'
                    }}
                  >
                    {/* Glowing border on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-cyan-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative z-10">
                      <div className="text-2xl mb-1">
                        <achievement.icon className="text-cyan-400 mx-auto" />
                      </div>
                      <div className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">{achievement.value}</div>
                      <div className="text-sm text-slate-400 group-hover:text-green-300 transition-colors">{achievement.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
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
          </div>
        </section>
        
        {/* Timeline Section with Portfolio-style background */}
        <section className="py-12 sm:py-16 md:py-20 section-mobile-spacing relative overflow-hidden z-10">
          <div id="timeline-section" className="relative z-20">
            <EnhancedTimeline />
          </div>
        </section>
        
        <section className="py-16 relative">
          <div className="container mx-auto px-4 text-center relative z-10">
            <h3 className="text-2xl font-space font-bold mb-6 text-white">Interested in working together?</h3>
            <p className="mb-8 text-slate-300 max-w-2xl mx-auto">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            <Link to="/contact">
              <GradientButton>Get In Touch</GradientButton>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default Experience;