import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AboutSection from '@/components/about/AboutSection';
import SectionTitle from '@/components/ui/SectionTitle';
import EducationCard from '@/components/education/EducationCard';
import CertificationCard from '@/components/education/CertificationCard';
import HolisticSection from '@/components/about/HolisticSection';
import { education, certifications } from '@/data/education';

const About = () => {
  const [animatedWords, setAnimatedWords] = useState<string[]>([
    'Developer', 'Coach', 'Athlete', 'Creator', 'Innovator'
  ]);
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % animatedWords.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [animatedWords]);

  return (
    <>
      <Helmet>
        <title>About | Lochlann O'Higgins</title>
        <meta name="description" content="Learn about Lochlann O'Higgins - developer, coach, and sports enthusiast bringing energy and adaptability to every challenge." />
      </Helmet>
      
      <div className="mt-16">
        <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              I'm a{' '}
              <motion.span
                key={currentWord}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-gradient inline-block min-w-[200px]"
              >
                {animatedWords[currentWord]}
              </motion.span>
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Building impactful tech and uplifting communities through sport and innovation.
            </p>
          </div>
        </section>
        
        <AboutSection />
        
        <section className="py-20 bg-slate-50 dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <SectionTitle
              title={<>My <span className="text-gradient">Passions</span></>}
              subtitle="Explore the different aspects of my professional and personal journey."
            />
            
            <HolisticSection />
          </div>
        </section>
        
        <section className="py-20 gradient-bg dark:bg-darker">
          <div className="container mx-auto px-4">
            <SectionTitle
              title={<>Education & <span className="text-gradient">Certifications</span></>}
              subtitle="My academic background and professional development."
              light
            />
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Education Column */}
              <div>
                <h3 className="text-2xl font-space font-bold mb-6 text-white flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998a12.078 12.078 0 01.665-6.479L12 14z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998a12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                  </svg>
                  Education
                </h3>
                
                <div className="space-y-6">
                  {education.map((item, index) => (
                    <EducationCard
                      key={index}
                      title={item.title}
                      institution={item.institution}
                      period={item.period}
                      description={item.description}
                    />
                  ))}
                </div>
              </div>
              
              {/* Certifications Column */}
              <div>
                <h3 className="text-2xl font-space font-bold mb-6 text-white flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Certifications
                </h3>
                
                <div className="space-y-6">
                  {certifications.map((cert, index) => (
                    <CertificationCard
                      key={index}
                      title={cert.title}
                      issuer={cert.issuer}
                      date={cert.date}
                      skills={cert.skills}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        <section className="py-20 bg-light dark:bg-dark">
          <div className="container mx-auto px-4">
            <SectionTitle
              title={<>Life <span className="text-gradient">Beyond Code</span></>}
              subtitle="When I'm not building digital experiences, here's where you might find me."
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-10">
              <motion.div 
                className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-white">Underwater Explorer</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  PADI-licensed free diver and scuba enthusiast, exploring the underwater world up to 15 meters deep. I find both peace and adventure beneath the waves.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-white">Elite Athlete</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  From marathon running to wheelchair rugby with the Harlequins, sports is a core part of my identity. I've trained with elite teams including GB Paratriathlon and England's wheelchair rugby.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-white">Global Citizen</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Having lived in multiple countries, I bring a unique global perspective to my work. This international mindset helps me create inclusive solutions that resonate across cultural boundaries.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-slate-50 dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <SectionTitle
              title={<>My <span className="text-gradient">Journey</span></>}
              subtitle="A timeline of key moments that have shaped my path."
            />
            
            <div className="max-w-3xl mx-auto mt-16 relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary/80 to-secondary/80"></div>
              
              {/* Timeline Items */}
              <div className="space-y-24">
                <motion.div 
                  className="relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-primary border-4 border-white dark:border-slate-900"></div>
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 md:pr-8 pb-8 md:pb-0 md:text-right">
                      <h3 className="text-2xl font-bold mb-2 text-slate-800 dark:text-white">2023</h3>
                      <h4 className="text-xl font-medium text-primary mb-2">First Class Honours</h4>
                      <p className="text-slate-600 dark:text-slate-300">
                        Graduated from St Mary's University with a First Class Honours in Sport Science, while serving as Table Tennis President and coach.
                      </p>
                    </div>
                    <div className="md:w-1/2 md:pl-8 md:text-left">
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-primary border-4 border-white dark:border-slate-900"></div>
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 md:pr-8 md:text-right">
                    </div>
                    <div className="md:w-1/2 md:pl-8 pb-8 md:pb-0 md:text-left">
                      <h3 className="text-2xl font-bold mb-2 text-slate-800 dark:text-white">2024</h3>
                      <h4 className="text-xl font-medium text-primary mb-2">EasyWeb Launch</h4>
                      <p className="text-slate-600 dark:text-slate-300">
                        Co-founded EasyWeb, a web design studio supporting startups and small businesses with modern, responsive, and SEO-optimized websites.
                      </p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-primary border-4 border-white dark:border-slate-900"></div>
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 md:pr-8 pb-8 md:pb-0 md:text-right">
                      <h3 className="text-2xl font-bold mb-2 text-slate-800 dark:text-white">2024</h3>
                      <h4 className="text-xl font-medium text-primary mb-2">Full Stack Journey</h4>
                      <p className="text-slate-600 dark:text-slate-300">
                        Began my journey to become a Full Stack Developer at Code Institute, building on my existing web design skills to create comprehensive digital solutions.
                      </p>
                    </div>
                    <div className="md:w-1/2 md:pl-8 md:text-left">
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-primary border-4 border-white dark:border-slate-900"></div>
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 md:pr-8 md:text-right">
                    </div>
                    <div className="md:w-1/2 md:pl-8 pb-8 md:pb-0 md:text-left">
                      <h3 className="text-2xl font-bold mb-2 text-slate-800 dark:text-white">2025</h3>
                      <h4 className="text-xl font-medium text-primary mb-2">Hackathon Success</h4>
                      <p className="text-slate-600 dark:text-slate-300">
                        Won my second hackathon, building on a growing reputation for innovative solutions and technical expertise in rapid development environments.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
