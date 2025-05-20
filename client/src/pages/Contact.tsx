import { Helmet } from 'react-helmet';
import SectionTitle from '@/components/ui/SectionTitle';
import ContactInfo from '@/components/contact/ContactInfo';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact | Lochlann O'Higgins</title>
        <meta name="description" content="Get in touch with Lochlann O'Higgins for web development projects, consulting, or collaboration opportunities." />
      </Helmet>
      
      <section id="contact" className={`py-20 gradient-bg dark:bg-darker ${window.location.pathname === '/contact' ? 'mt-16' : ''}`}>
        <div className="container mx-auto px-4">
          <SectionTitle
            title={<>Get In <span className="text-gradient">Touch</span></>}
            subtitle="Have a project in mind or want to collaborate? I'd love to hear from you!"
            light
          />
          
          <div className="max-w-3xl mx-auto">
            <motion.div 
              className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-primary/30 transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="font-space font-bold text-2xl mb-6 text-white">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <FaEnvelope className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Email</h4>
                    <a href="mailto:lochlannohiggins@gmail.com" className="text-slate-300 hover:text-primary transition-colors">
                      lochlannohiggins@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <FaLinkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">LinkedIn</h4>
                    <a 
                      href="https://www.linkedin.com/in/lochlann-o-higgins/" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-slate-300 hover:text-primary transition-colors"
                    >
                      linkedin.com/in/lochlann-o-higgins
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <FaGithub className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">GitHub</h4>
                    <a 
                      href="https://github.com/Lochy2000" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-slate-300 hover:text-primary transition-colors"
                    >
                      github.com/Lochy2000
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-white/10 rounded-lg text-center">
                <p className="text-white">I'm currently available for freelance work and open to new opportunities!</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
