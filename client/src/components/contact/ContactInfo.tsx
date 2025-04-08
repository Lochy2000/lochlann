import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub } from 'react-icons/fa';
import { slideUp, staggerContainer } from '@/lib/framerAnimations';

const ContactInfo = () => {
  const contactItems = [
    {
      icon: FaEnvelope,
      title: 'Email',
      value: 'Lochlann_oht@hotmail.com',
      href: 'mailto:Lochlann_oht@hotmail.com'
    },
    {
      icon: FaPhone,
      title: 'Phone',
      value: '(+44) 07469707973',
      href: 'tel:+447469707973'
    },
    {
      icon: FaLinkedin,
      title: 'LinkedIn',
      value: 'linkedin.com/in/lochlann-ohiggins',
      href: 'https://linkedin.com/in/lochlann-ohiggins'
    },
    {
      icon: FaGithub,
      title: 'GitHub',
      value: 'github.com/lochlannohiggins',
      href: 'https://github.com/lochlannohiggins'
    }
  ];

  const services = [
    'Website Development',
    'WordPress Customization',
    'SEO Optimization',
    'Freelance Consulting'
  ];

  return (
    <motion.div 
      className="flex flex-col justify-between h-full"
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
    >
      <div>
        <motion.h3 
          className="font-space font-bold text-2xl mb-6 text-white"
          variants={slideUp}
        >
          Connect With Me
        </motion.h3>
        
        <div className="space-y-6">
          {contactItems.map((item, index) => (
            <motion.div 
              key={index}
              className="flex items-start space-x-4"
              variants={slideUp}
            >
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary-light">
                <item.icon />
              </div>
              <div>
                <h4 className="font-space font-medium text-white">{item.title}</h4>
                <a 
                  href={item.href} 
                  target={item.title === 'Email' || item.title === 'Phone' ? undefined : '_blank'} 
                  rel={item.title === 'Email' || item.title === 'Phone' ? undefined : 'noopener noreferrer'}
                  className="text-slate-300 hover:text-primary-light transition-colors"
                >
                  {item.value}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <motion.div 
        className="mt-12 bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10"
        variants={slideUp}
        custom={1}
      >
        <h4 className="font-space font-bold text-xl mb-4 text-white">Available For</h4>
        <ul className="space-y-3">
          {services.map((service, index) => (
            <li key={index} className="flex items-center text-slate-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-light mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {service}
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default ContactInfo;
