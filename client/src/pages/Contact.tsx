import { Helmet } from 'react-helmet';
import SectionTitle from '@/components/ui/SectionTitle';
import ContactInfo from '@/components/contact/ContactInfo';
import TechBackground from '@/components/ui/TechBackground';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact | Lochlann O'Higgins</title>
        <meta name="description" content="Get in touch with Lochlann O'Higgins for web development projects, consulting, or collaboration opportunities." />
      </Helmet>
      
      <section className="py-20 bg-slate-950 mt-16 min-h-screen relative">
        {/* Tech Background */}
        <TechBackground variant="contact" intensity="subtle" />
        
        <div className="container mx-auto px-4 relative z-10">
          <SectionTitle
            title={<>Get In <span className="text-gradient">Touch</span></>}
            subtitle="Have a project in mind or want to collaborate? I'd love to hear from you!"
            light
          />
          
          <div className="max-w-3xl mx-auto">
            <motion.div 
              className="bg-slate-900/80 backdrop-blur-sm p-8 rounded-xl border border-orange-500/30 hover:border-orange-400/60 transition-all duration-300 shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="font-space font-bold text-2xl mb-6 text-white">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400">
                    <FaEnvelope className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Email</h4>
                    <a href="mailto:lochlannohiggins@gmail.com" className="text-slate-300 hover:text-orange-400 transition-colors">
                      lochlannohiggins@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <FaLinkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">LinkedIn</h4>
                    <a href="https://linkedin.com/in/lochlann-o-higgins" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-blue-400 transition-colors">
                      Connect with me professionally
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                    <FaGithub className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">GitHub</h4>
                    <a href="https://github.com/Lochy2000" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-purple-400 transition-colors">
                      Check out my code
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-slate-700">
                <p className="text-slate-300 text-center">
                  Whether you have a project in mind, want to collaborate, or just want to say hello, 
                  I'm always excited to connect with fellow developers and creators.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
