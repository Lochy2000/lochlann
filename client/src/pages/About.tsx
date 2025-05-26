import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AboutSection from '@/components/about/AboutSection';
import SectionTitle from '@/components/ui/SectionTitle';
import EducationCard from '@/components/education/EducationCard';
import CertificationCard from '@/components/education/CertificationCard';
import HolisticSection from '@/components/about/HolisticSection';
import MobileAboutLayout from '@/components/about/MobileAboutLayout';
import { education, certifications } from '@/data/education';

const About = () => {
  const [animatedWords, setAnimatedWords] = useState<string[]>([
    'Developer', 'Coach', 'Athlete', 'Creator', 'Innovator'
  ]);
  const [currentWord, setCurrentWord] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % animatedWords.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [animatedWords]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Desktop layout (original)
  const desktopLayout = (
    <div className="mt-16">
      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-slate-900 to-slate-800 text-white about-hero-mobile">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight about-title-mobile">
            I'm a{' '}
            <motion.span
              key={currentWord}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-gradient inline-block min-w-[150px] sm:min-w-[200px]"
            >
              {animatedWords[currentWord]}
            </motion.span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto about-subtitle-mobile">
            Building impactful tech and uplifting communities through sport and innovation.
          </p>
        </div>
      </section>
      
      <AboutSection />
      
      <section className="py-12 sm:py-16 md:py-20 bg-slate-50 dark:bg-slate-900 section-mobile-spacing">
        <div className="container mx-auto px-4">
          <SectionTitle
            title={<>My <span className="text-gradient">Passions</span></>}
            subtitle="Explore the different aspects of my professional and personal journey."
          />
          
          <HolisticSection />
        </div>
      </section>
      
      <section className="py-12 sm:py-16 md:py-20 gradient-bg dark:bg-darker section-mobile-spacing">
        <div className="container mx-auto px-4">
          <SectionTitle
            title={<>Education & <span className="text-gradient">Certifications</span></>}
            subtitle="My academic background and professional development."
            light
          />
          
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto mobile-grid-single"
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
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
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
    </div>
  );

  return (
    <>
      <Helmet>
        <title>About | Lochlann O'Higgins</title>
        <meta name="description" content="Learn about Lochlann O'Higgins - developer, coach, and sports enthusiast bringing energy and adaptability to every challenge." />
      </Helmet>
      
      <MobileAboutLayout isMobile={isMobile}>
        {desktopLayout}
      </MobileAboutLayout>
    </>
  );
};

export default About;