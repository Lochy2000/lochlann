import { Helmet } from 'react-helmet';
import SectionTitle from '@/components/ui/SectionTitle';
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';

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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
