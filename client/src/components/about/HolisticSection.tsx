import { motion } from 'framer-motion';
import { useState } from 'react';
import AnimatedAchievementCard from './AnimatedAchievementCard';
import { FaLaptopCode, FaRunning, FaWater } from 'react-icons/fa';

const HolisticSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = [
    {
      id: 'all',
      name: 'All Passions',
      icon: <span className="flex space-x-1"><FaRunning className="text-green-500" /><FaLaptopCode className="text-blue-500" /><FaWater className="text-cyan-500" /></span>,
      color: 'primary',
    },
    {
      id: 'sport',
      name: 'Sports & Coaching',
      icon: <FaRunning />,
      color: 'green-500',
    },
    {
      id: 'tech',
      name: 'Technology & Development',
      icon: <FaLaptopCode />,
      color: 'blue-500',
    },
    {
      id: 'diving',
      name: 'Underwater Exploration',
      icon: <FaWater />,
      color: 'cyan-500',
    }
  ];
  
  const achievements = [
    // Sports
    {
      category: 'sport',
      title: 'Marathon Achievements',
      description: 'Completed two London Marathons and multiple half-marathons across Europe.',
      detailedDescription: 'My endurance journey includes finishing two London Marathons and completing half-marathons in Belgium and Germany. Each race taught me valuable lessons about resilience, determination, and the power of consistent preparation.',
      icon: FaRunning,
      color: 'green-500'
    },
    {
      category: 'sport',
      title: 'Elite Coaching',
      description: 'Level 2 certified coach in both table tennis and wheelchair rugby.',
      detailedDescription: 'I hold Level 2 coaching certifications in table tennis and wheelchair rugby. As the current Head Table Tennis Coach at St Mary\'s University, I focus on developing inclusive programs that help athletes of all abilities reach their full potential.',
      icon: FaRunning,
      color: 'green-500'
    },
    {
      category: 'sport',
      title: 'Paralympic Training',
      description: 'Trained with GB Paratriathlon squad and England\'s wheelchair rugby team.',
      detailedDescription: 'I\'ve had the privilege of training alongside elite athletes in the GB Paratriathlon development program and England\'s wheelchair rugby team. These experiences have shaped my understanding of high-performance environments and adaptive sports coaching.',
      icon: FaRunning,
      color: 'green-500'
    },
    
    // Tech
    {
      category: 'tech',
      title: 'Hackathon Success',
      description: 'Won 2 out of 7 hackathons, demonstrating rapid problem-solving skills.',
      detailedDescription: 'I\'ve participated in 7 hackathons to date, securing first place in 2 of them. These intense coding competitions have sharpened my ability to quickly understand problems, develop creative solutions, and deliver working prototypes under tight deadlines.',
      icon: FaLaptopCode,
      color: 'blue-500'
    },
    {
      category: 'tech',
      title: 'EasyWeb Studio',
      description: 'Founded web design studio helping small businesses establish their online presence.',
      detailedDescription: 'As co-founder of easywebs.uk, I\'ve built a design studio focused on creating responsive, SEO-optimized websites for startups and small businesses. Notable projects include HerEdge.club and frenticfocus.com, where I applied modern design principles and performance optimization.',
      icon: FaLaptopCode,
      color: 'blue-500'
    },
    {
      category: 'tech',
      title: 'Full Stack Development',
      description: 'Expanding capabilities through Code Institute\'s comprehensive program.',
      detailedDescription: 'I\'m currently enhancing my full stack development skills through Code Institute\'s program, focusing on modern JavaScript frameworks, Python backends, and responsive design patterns. This structured education complements my hands-on experience in web design and development.',
      icon: FaLaptopCode,
      color: 'blue-500'
    },
    
    // Diving
    {
      category: 'diving',
      title: 'PADI Certification',
      description: 'Licensed free diver and scuba diver exploring depths up to 30 meters.',
      detailedDescription: 'Holding a PADI license allows me to explore underwater environments safely. I\'ve developed skills in both free diving and scuba diving, which have opened up an entirely new world of exploration and adventure beneath the surface.',
      icon: FaWater,
      color: 'cyan-500'
    },
    {
      category: 'diving',
      title: 'Marine Conservation',
      description: 'Participated in underwater cleanup initiatives and conservation projects.',
      detailedDescription: 'My passion for underwater exploration has led me to participate in marine conservation efforts, including coastal cleanup initiatives and reef monitoring projects. These experiences have deepened my appreciation for marine ecosystems and the importance of preserving them.',
      icon: FaWater,
      color: 'cyan-500'
    },
    {
      category: 'diving',
      title: 'Underwater Photography',
      description: 'Documenting marine life and underwater landscapes through photography.',
      detailedDescription: 'Combining my technical skills with my love for diving, I\'ve begun documenting marine environments through underwater photography. This creative outlet allows me to share the beauty of underwater worlds with others while developing my visual composition abilities.',
      icon: FaWater,
      color: 'cyan-500'
    }
  ];
  
  const filteredAchievements = activeCategory === 'all' 
    ? achievements 
    : achievements.filter(a => a.category === activeCategory);
  
  return (
    <div className="py-16">
      <div className="flex justify-center mb-12">
        <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-full">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 md:px-6 md:py-3 rounded-full flex items-center gap-2 transition-all duration-300 ${
                activeCategory === category.id
                  ? `bg-${category.color === 'primary' ? 'primary' : category.color.split('-')[0] + '-500'} text-white shadow-lg`
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span className="font-medium hidden md:inline">{category.name}</span>
            </button>
          ))}
        </div>
      </div>
      
      <motion.div
        key={activeCategory}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {filteredAchievements.map((achievement, index) => (
          <AnimatedAchievementCard
            key={`${activeCategory}-${index}`}
            title={achievement.title}
            description={achievement.description}
            detailedDescription={achievement.detailedDescription}
            icon={achievement.icon}
            color={achievement.color}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default HolisticSection;
