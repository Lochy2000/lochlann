import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const shapes = [
  {
    id: 'code',
    svg: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 18L22 12L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 6L2 12L8 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: 'Developer',
    color: 'text-blue-500'
  },
  {
    id: 'sport',
    svg: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: 'Coach',
    color: 'text-green-500'
  },
  {
    id: 'globe',
    svg: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: 'Global Citizen',
    color: 'text-purple-500'
  },
  {
    id: 'water',
    svg: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 18C4.79086 18 3 16.2091 3 14C3 11.7909 4.79086 10 7 10C7 7.23858 9.23858 5 12 5C14.7614 5 17 7.23858 17 10C19.2091 10 21 11.7909 21 14C21 16.2091 19.2091 18 17 18H7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: 'Diver',
    color: 'text-cyan-500'
  },
];

const AnimatedProfile = () => {
  const [activeShape, setActiveShape] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveShape((prev) => (prev + 1) % shapes.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex flex-col items-center">
      <motion.div 
        className="w-64 h-64 rounded-full bg-slate-100 dark:bg-slate-800 border-4 border-white dark:border-slate-700 shadow-lg flex items-center justify-center p-12 mb-6 relative overflow-hidden"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            className={`w-32 h-32 ${shapes[activeShape].color}`}
            key={activeShape}
            initial={{ rotate: -30, opacity: 0, scale: 0.8 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 30, opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            {shapes[activeShape].svg}
          </motion.div>
        </div>
      </motion.div>
      
      <motion.div
        className="text-center"
        key={`text-${activeShape}`}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className={`text-2xl font-bold mb-1 ${shapes[activeShape].color}`}>
          {shapes[activeShape].label}
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          {activeShape === 0 && "Building modern web solutions"}
          {activeShape === 1 && "Uplifting communities through sport"}
          {activeShape === 2 && "Bringing diverse perspectives to my work"}
          {activeShape === 3 && "Exploring depths beyond the surface"}
        </p>
      </motion.div>
      
      <div className="flex mt-6 space-x-2">
        {shapes.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === activeShape 
                ? 'bg-primary'
                : 'bg-slate-300 dark:bg-slate-600'
            }`}
            onClick={() => setActiveShape(index)}
            aria-label={`View ${shapes[index].label} profile`}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedProfile;
