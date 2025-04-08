import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { fadeIn, slideUp } from '@/lib/framerAnimations';
import { experiences } from '@/data/experience';
import { education } from '@/data/education';
import { skills } from '@/data/skills';
import { FaDownload, FaUser, FaBriefcase, FaGraduationCap, FaCode, FaTrophy } from 'react-icons/fa';
import { achievements } from '@/data/achievements';

const Resume = () => {
  const handleDownloadCV = () => {
    // In a real implementation, this would download a PDF file
    alert("In a real implementation, this would download the CV as a PDF");
  };

  return (
    <>
      <Helmet>
        <title>Resume | Lochlann O'Higgins</title>
        <meta name="description" content="Professional resume of Lochlann O'Higgins - Web Developer and Designer with experience in WordPress, React, and more." />
      </Helmet>
      
      <div className="mt-16 py-16 bg-light dark:bg-dark">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-xl overflow-hidden"
            variants={fadeIn}
            initial="initial"
            animate="animate"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-secondary p-8 text-white">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-space font-bold">Lochlann O'Higgins</h1>
                  <p className="text-xl mt-2 font-light">Website Specialist & Developer</p>
                </div>
                <button 
                  onClick={handleDownloadCV}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg flex items-center gap-2 backdrop-blur-sm transition-colors"
                >
                  <FaDownload /> Download CV
                </button>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-8">
              {/* Personal Info */}
              <motion.section 
                className="mb-10"
                variants={slideUp}
                custom={0}
              >
                <h2 className="text-2xl font-space font-bold mb-4 text-slate-800 dark:text-white flex items-center">
                  <FaUser className="mr-2 text-primary" /> Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-slate-600 dark:text-slate-300">
                      <strong className="text-slate-800 dark:text-white">Email:</strong> Lochlann_oht@hotmail.com
                    </p>
                    <p className="text-slate-600 dark:text-slate-300">
                      <strong className="text-slate-800 dark:text-white">Phone:</strong> (+44) 07469707973
                    </p>
                    <p className="text-slate-600 dark:text-slate-300">
                      <strong className="text-slate-800 dark:text-white">Age:</strong> 23
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-600 dark:text-slate-300">
                      <strong className="text-slate-800 dark:text-white">Languages:</strong> English (Native), Danish (Native)
                    </p>
                    <p className="text-slate-600 dark:text-slate-300">
                      <strong className="text-slate-800 dark:text-white">LinkedIn:</strong> Lochlann O'Higgins
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-slate-600 dark:text-slate-300">
                    Growing up I spent a lot of time moving countries and never settling down anywhere. I see myself as an inclusive person who is always eager to learn more while having a strong focus and drive. Passionate about many things and enjoy staying active with various hobbies. I try to have a positive impact on my environment and enjoy seeing others do well and achieve their goals in life.
                  </p>
                </div>
              </motion.section>
              
              {/* Experience */}
              <motion.section 
                className="mb-10"
                variants={slideUp}
                custom={1}
              >
                <h2 className="text-2xl font-space font-bold mb-4 text-slate-800 dark:text-white flex items-center">
                  <FaBriefcase className="mr-2 text-primary" /> Professional Experience
                </h2>
                <div className="space-y-6">
                  {experiences.map((exp, index) => (
                    <div key={index} className="border-l-2 border-primary pl-4 ml-2">
                      <div className="relative">
                        <div className="absolute -left-[22px] top-1.5 w-4 h-4 rounded-full bg-primary"></div>
                        <h3 className="text-lg font-space font-bold text-slate-800 dark:text-white">{exp.title}</h3>
                        <p className="text-primary dark:text-primary-light">{exp.company} | {exp.date}</p>
                        <p className="mt-2 text-slate-600 dark:text-slate-300">{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
              
              {/* Education */}
              <motion.section 
                className="mb-10"
                variants={slideUp}
                custom={2}
              >
                <h2 className="text-2xl font-space font-bold mb-4 text-slate-800 dark:text-white flex items-center">
                  <FaGraduationCap className="mr-2 text-primary" /> Education
                </h2>
                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <div key={index} className="border-l-2 border-primary pl-4 ml-2">
                      <div className="relative">
                        <div className="absolute -left-[22px] top-1.5 w-4 h-4 rounded-full bg-primary"></div>
                        <h3 className="text-lg font-space font-bold text-slate-800 dark:text-white">{edu.title}</h3>
                        <p className="text-primary dark:text-primary-light">{edu.institution} | {edu.period}</p>
                        <p className="mt-2 text-slate-600 dark:text-slate-300">{edu.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
              
              {/* Skills */}
              <motion.section 
                className="mb-10"
                variants={slideUp}
                custom={3}
              >
                <h2 className="text-2xl font-space font-bold mb-4 text-slate-800 dark:text-white flex items-center">
                  <FaCode className="mr-2 text-primary" /> Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.section>
              
              {/* Achievements */}
              <motion.section
                variants={slideUp}
                custom={4}
              >
                <h2 className="text-2xl font-space font-bold mb-4 text-slate-800 dark:text-white flex items-center">
                  <FaTrophy className="mr-2 text-primary" /> Achievements
                </h2>
                <ul className="space-y-2">
                  {achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <span className="font-bold text-slate-800 dark:text-white">{achievement.title}:</span>{' '}
                        <span className="text-slate-600 dark:text-slate-300">{achievement.description}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.section>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Resume;
