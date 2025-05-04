import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeIn, slideUp } from '@/lib/framerAnimations';
import { experiences, educationTimeline as education, certifications } from '@/data/experience';
import { skills } from '@/data/skills';
import { FaDownload, FaUser, FaBriefcase, FaGraduationCap, FaCode, FaTrophy, FaCertificate } from 'react-icons/fa';
import { achievements } from '@/data/achievements';

const Resume = () => {
  // URL for the CV download page
  const cvDownloadUrl = '/download/cv';

  return (
    <>
      <Helmet>
        <title>Resume | Lochlann O'Higgins</title>
        <meta name="description" content="Professional resume of Lochlann O'Higgins - Web Developer, Designer, and Coach with experience in WordPress, React, and more." />
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
                <Link 
                  to={cvDownloadUrl}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg flex items-center gap-2 backdrop-blur-sm transition-colors"
                  target="_blank"
                >
                  <FaDownload /> Download CV
                </Link>
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
                      <strong className="text-slate-800 dark:text-white">Website:</strong> easywebs.uk
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
                    I'm a developer and coach with a passion for building impactful tech and uplifting communities through sport and innovation. From leading web projects and winning hackathons to coaching table tennis and wheelchair rugby league, I bring energy and adaptability into everything I do.
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
                  {experiences.slice(0, 5).map((exp, index) => (
                    <div key={index} className="border-l-2 border-primary pl-4 ml-2">
                      <div className="relative">
                        <div className="absolute -left-[22px] top-1.5 w-4 h-4 rounded-full bg-primary"></div>
                        <h3 className="text-lg font-space font-bold text-slate-800 dark:text-white">{exp.title}</h3>
                        <p className="text-primary dark:text-primary-light">{exp.company} | {exp.date}</p>
                        <p className="mt-2 text-slate-600 dark:text-slate-300">{exp.description}</p>
                        
                        <div className="mt-3 flex flex-wrap gap-2">
                          {exp.skills.slice(0, 3).map((skill, skillIndex) => (
                            <span 
                              key={skillIndex} 
                              className="px-2 py-1 rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="text-center">
                    <a
                      href="#experience-timeline"
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = '/experience#experience';
                      }}
                      className="inline-block text-primary hover:text-primary-dark transition-colors text-sm font-medium"
                    >
                      View Full Experience Timeline →
                    
                    </a>
                  </div>
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
                        <p className="text-primary dark:text-primary-light">{edu.institution} | {edu.date}</p>
                        <p className="mt-2 text-slate-600 dark:text-slate-300">{edu.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
              
              {/* Certifications */}
              <motion.section 
                className="mb-10"
                variants={slideUp}
                custom={3}
              >
                <h2 className="text-2xl font-space font-bold mb-4 text-slate-800 dark:text-white flex items-center">
                  <FaCertificate className="mr-2 text-primary" /> Certifications
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {certifications.map((cert, index) => (
                    <div key={index} className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-lg">
                      <h3 className="text-lg font-space font-bold text-slate-800 dark:text-white">{cert.title}</h3>
                      <p className="text-primary dark:text-primary-light text-sm">{cert.issuer} | {cert.date}</p>
                      <p className="mt-2 text-slate-600 dark:text-slate-300 text-sm">{cert.description}</p>
                    </div>
                  ))}
                </div>
              </motion.section>
              
              {/* Skills */}
              <motion.section 
                className="mb-10"
                variants={slideUp}
                custom={4}
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
                custom={5}
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
              
              {/* Download CV button at bottom */}
              <div className="mt-10 text-center">
                <Link 
                  to={cvDownloadUrl}
                  className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  target="_blank"
                >
                  <FaDownload className="mr-2" /> Download Complete CV
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Resume;
