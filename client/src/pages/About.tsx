import { Helmet } from 'react-helmet';
import AboutSection from '@/components/about/AboutSection';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import EducationCard from '@/components/education/EducationCard';
import CertificationCard from '@/components/education/CertificationCard';
import { education, certifications } from '@/data/education';

const About = () => {
  return (
    <>
      <Helmet>
        <title>About | Lochlann O'Higgins</title>
        <meta name="description" content="Learn about Lochlann O'Higgins - his story, education, skills, and achievements in web development and design." />
      </Helmet>
      
      <div className="mt-16">
        <AboutSection />
        
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
    </>
  );
};

export default About;
