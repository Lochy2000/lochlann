import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

interface MobileAboutLayoutProps {
  isMobile: boolean;
  children: React.ReactNode;
}

interface Achievement {
  title: string;
  description: string;
  icon: string;
  category: 'tech' | 'sports' | 'diving';
}

interface ContentModal {
  isOpen: boolean;
  title: string;
  content: string;
}

const MobileAboutLayout: React.FC<MobileAboutLayoutProps> = ({ isMobile, children }) => {
  const [modal, setModal] = useState<ContentModal>({ isOpen: false, title: '', content: '' });
  const [activeSection, setActiveSection] = useState('story');

  const achievements: Achievement[] = [
    { title: '2x Hackathon Winner', description: 'Won 2 out of 7 hackathons', icon: '🏆', category: 'tech' },
    { title: 'Marathon Runner', description: 'Completed 2 London Marathons', icon: '🏃', category: 'sports' },
    { title: 'Elite Coach', description: 'Level 2 certified coach', icon: '⚽', category: 'sports' },
    { title: 'Web Studio Founder', description: 'Founded easywebs.uk', icon: '💻', category: 'tech' },
    { title: 'PADI Diver', description: 'Licensed scuba diver', icon: '🤿', category: 'diving' },
    { title: 'Paralympic Training', description: 'Trained with GB Paratriathlon', icon: '🥇', category: 'sports' }
  ];

  const passions = [
    { title: 'Technology', icon: '💻', color: '#3b82f6', description: 'Full-stack development, hackathons, and web design' },
    { title: 'Sports Coaching', icon: '⚽', color: '#10b981', description: 'Table tennis and wheelchair rugby coaching' },
    { title: 'Endurance', icon: '🏃', color: '#f59e0b', description: 'Marathon running and athletic training' },
    { title: 'Underwater', icon: '🤿', color: '#06b6d4', description: 'Scuba diving and marine exploration' }
  ];

  const openModal = (title: string, content: string) => {
    setModal({ isOpen: true, title, content });
  };

  const closeModal = () => {
    setModal({ isOpen: false, title: '', content: '' });
  };

  if (!isMobile) {
    return <>{children}</>;
  }

  return (
    <div className="mobile-about-layout">
      {/* Condensed Hero */}
      <section className="pt-20 pb-8 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold mb-3">About Me</h1>
          <p className="text-sm opacity-90">Developer • Coach • Sports Enthusiast</p>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <section className="py-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4">
          <div className="flex justify-between text-center">
            <div>
              <div className="text-lg font-bold text-primary">7</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Hackathons</div>
            </div>
            <div>
              <div className="text-lg font-bold text-primary">2</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Marathons</div>
            </div>
            <div>
              <div className="text-lg font-bold text-primary">Level 2</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Coach</div>
            </div>
            <div>
              <div className="text-lg font-bold text-primary">PADI</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Certified</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Tabs */}
      <section className="py-3 bg-white dark:bg-slate-900 sticky top-16 z-30 border-b border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
            {['story', 'achievements', 'passions', 'education'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeSection === section
                    ? 'bg-primary text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Content Sections */}
      <div className="min-h-screen">
        <AnimatePresence mode="wait">
          {activeSection === 'story' && (
            <motion.section
              key="story"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="py-6"
            >
              <div className="container mx-auto px-4 space-y-4">
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  I'm a developer and coach with a passion for building impactful tech and uplifting communities through sport.
                </p>
                
                <div className="space-y-3">
                  <button 
                    onClick={() => openModal('Technology Journey', 'My development journey includes creating and launching easywebs.uk—my web design studio helping small businesses establish their digital presence. I focus on responsive design, SEO optimization, and user experience across every project.')}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-left hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-slate-800 dark:text-white">Technology Journey</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">7 hackathons, 2 wins, web studio founder</p>
                      </div>
                      <div className="text-slate-400 dark:text-slate-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                    <div className="text-xs text-primary mt-2 opacity-75">Tap to read more</div>
                  </button>
                  
                  <button 
                    onClick={() => openModal('Athletic Background', 'Sports has always been a foundational part of my identity. I currently play for the Harlequins Wheelchair Rugby Team and hold Level 2 coaching certifications in both wheelchair rugby and table tennis.')}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-left hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-slate-800 dark:text-white">Athletic Background</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Marathon runner, elite coach, Paralympic training</p>
                      </div>
                      <div className="text-slate-400 dark:text-slate-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                    <div className="text-xs text-primary mt-2 opacity-75">Tap to read more</div>
                  </button>

                  <button 
                    onClick={() => openModal('Global Perspective', 'My international upbringing has shaped how I approach problems and collaborate with diverse teams. This global mindset helps me create inclusive, accessible solutions.')}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-left hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-slate-800 dark:text-white">Global Perspective</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">International experience, diverse collaboration</p>
                      </div>
                      <div className="text-slate-400 dark:text-slate-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                    <div className="text-xs text-primary mt-2 opacity-75">Tap to read more</div>
                  </button>
                </div>
              </div>
            </motion.section>
          )}

          {activeSection === 'achievements' && (
            <motion.section
              key="achievements"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="py-6"
            >
              <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-medium text-slate-800 dark:text-white">My Achievements</h3>
                  <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                    <span>Scroll to explore</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                <div className="overflow-x-auto scrollbar-hide">
                  <div className="flex space-x-3 pb-4" style={{ width: 'max-content' }}>
                    {achievements.map((achievement, index) => (
                      <div
                        key={index}
                        className="flex-shrink-0 w-48 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow"
                      >
                        <div className="text-2xl mb-2">{achievement.icon}</div>
                        <h4 className="font-medium text-slate-800 dark:text-white text-sm mb-1">{achievement.title}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{achievement.description}</p>
                        <div className="mt-2 px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-xs text-center">
                          {achievement.category.charAt(0).toUpperCase() + achievement.category.slice(1)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {activeSection === 'passions' && (
            <motion.section
              key="passions"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="py-6"
            >
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 gap-3">
                  {passions.map((passion, index) => (
                    <div
                      key={index}
                      className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                      style={{ borderLeft: `4px solid ${passion.color}` }}
                    >
                      <div className="text-2xl mb-2">{passion.icon}</div>
                      <h4 className="font-medium text-slate-800 dark:text-white text-sm mb-1">{passion.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{passion.description}</p>
                      <div className="mt-2 flex items-center text-xs" style={{ color: passion.color }}>
                        <span>Explore more</span>
                        <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          )}

          {activeSection === 'education' && (
            <motion.section
              key="education"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="py-6"
            >
              <div className="container mx-auto px-4 space-y-4">
                <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <h4 className="font-medium text-slate-800 dark:text-white mb-2">Education</h4>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium">Sport Science (1st Class Honors)</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">University Degree</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Full Stack Development</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Code Institute</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <h4 className="font-medium text-slate-800 dark:text-white mb-2">Certifications</h4>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium">Level 2 Table Tennis Coach</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Coaching Certification</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Level 2 Wheelchair Rugby Coach</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Coaching Certification</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">PADI Scuba Diving</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Diving License</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      {/* Modal */}
      {modal.isOpen && createPortal(
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              maxWidth: '90%',
              maxHeight: '80%',
              overflow: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">{modal.title}</h3>
              <button
                onClick={closeModal}
                className="p-1 rounded-full hover:bg-slate-100"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-sm leading-relaxed text-slate-600">{modal.content}</p>
          </motion.div>
        </motion.div>,
        document.body
      )}
    </div>
  );
};

export default MobileAboutLayout;