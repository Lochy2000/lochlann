import { motion } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaGithub, FaPhone } from 'react-icons/fa';
import { fadeIn, staggerContainer } from '@/lib/framerAnimations';
import AnimatedGrid from './AnimatedGrid';

const ContactLinks = () => {
  const contactMethods = [
    { 
      icon: <FaEnvelope className="text-2xl" />,
      label: 'Email',
      value: 'lochlann_oht@hotmail.com',
      link: 'mailto:lochlann_oht@hotmail.com'
    },
    { 
      icon: <FaPhone className="text-2xl" />,
      label: 'Phone',
      value: '(+44) 07469 707973',
      link: 'tel:+4407469707973'
    },
    { 
      icon: <FaLinkedin className="text-2xl" />,
      label: 'LinkedIn',
      value: 'linkedin.com/in/lochlann-ohiggins-developer',
      link: 'https://www.linkedin.com/in/lochlann-ohiggins-developer/'
    },
    { 
      icon: <FaGithub className="text-2xl" />,
      label: 'GitHub',
      value: 'GitHub',
      link: '#'
    }
  ];

  return (
    <section className="py-16 bg-slate-100 dark:bg-slate-800 relative">
      {/* Animated Grid Background */}
      <AnimatedGrid 
        opacity={0.15} 
        angle={45} 
        spacing={25} 
        lineWidth={1} 
        animationSpeed={2.5}
        lineColor1="#040927"
        lineColor2="#c22938"
        lineColor3="#e16f23"
      />
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-8"
            variants={fadeIn}
          >
            Get in <span className="text-primary">Touch</span>
          </motion.h2>

          <motion.p 
            className="text-lg mb-10 text-slate-700 dark:text-slate-300"
            variants={fadeIn}
            custom={0.2}
          >
            Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contactMethods.map((method, index) => (
              <motion.a
                key={index}
                href={method.link}
                target={method.link.startsWith('http') ? '_blank' : '_self'}
                rel="noreferrer"
                className="flex items-center gap-4 p-6 rounded-xl bg-white dark:bg-slate-700 shadow-lg hover:shadow-xl transition-all group"
                variants={fadeIn}
                custom={0.4 + (index * 0.1)}
              >
                <div className="w-12 h-12 rounded-full bg-primary-light/10 dark:bg-primary-light/20 flex items-center justify-center text-primary dark:text-primary-light group-hover:bg-primary-light group-hover:text-white transition-all">
                  {method.icon}
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{method.label}</p>
                  <p className="font-medium text-slate-800 dark:text-white">{method.value}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactLinks;
