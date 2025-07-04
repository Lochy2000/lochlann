import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AboutSection from '@/components/about/AboutSection';
import SectionTitle from '@/components/ui/SectionTitle';
import EducationCard from '@/components/education/EducationCard';
import CertificationCard from '@/components/education/CertificationCard';
import HolisticSection from '@/components/about/HolisticSection';
import PersonalInterestsSection from '@/components/about/PersonalInterestsSection';
import ImprovedAboutHero from '@/components/about/ImprovedAboutHero';
import TechBackground from '@/components/ui/TechBackground';
import MobileAboutLayout from '@/components/about/MobileAboutLayout';
import { education, certifications } from '@/data/education';

const About = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Desktop layout with new improved components
  const desktopLayout = (
    <div className="mt-16 relative bg-slate-950 min-h-screen">
      {/* Tech Background covering entire page */}
      <div className="fixed inset-0 z-0">
        <TechBackground variant="about" intensity="subtle" />
      </div>
      
      {/* New Improved Hero Section */}
      <div className="relative z-20">
        <ImprovedAboutHero />
      </div>
      
      <section className="py-12 sm:py-16 md:py-20 section-mobile-spacing relative z-10">
        <div className="container mx-auto px-4 relative z-10">
          <SectionTitle
            title={<>My <span className="text-gradient">Passions</span></>}
            subtitle="Explore the different aspects of my professional and personal journey."
          />
          
          <HolisticSection />
        </div>
      </section>
      
      <div className="relative z-10">
        <PersonalInterestsSection />
      </div>
      
      <section className="py-12 sm:py-16 md:py-20 section-mobile-spacing relative z-10">
        <div className="container mx-auto px-4 relative z-10">
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
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
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
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
