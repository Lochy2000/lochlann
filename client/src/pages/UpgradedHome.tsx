import { Helmet } from 'react-helmet';
import ShaderGradientHero from '@/components/home/upgraded/ShaderGradientHero';
import TechBackground from '@/components/ui/TechBackground';
import ModernAbout from '@/components/home/upgraded/ModernAbout';
import ExperiencePreview from '@/components/home/upgraded/ExperiencePreview';
import ContactLinks from '@/components/home/upgraded/ContactLinks';

const UpgradedHome = () => {
  return (
    <>
      <Helmet>
        <title>Lochlann O'Higgins | Website Specialist & Developer</title>
        <meta name="description" content="Personal portfolio of Lochlann O'Higgins - Website Specialist and Developer with expertise in WordPress and modern web technologies." />
      </Helmet>
      
      <div className="relative bg-slate-950 min-h-screen">
        {/* Tech Background */}
        <TechBackground variant="home" intensity="subtle" />
        
        <div className="relative z-10">
          <ShaderGradientHero />
          <ModernAbout />
          <ExperiencePreview />
          <ContactLinks />
        </div>
      </div>
    </>
  );
};

export default UpgradedHome;
