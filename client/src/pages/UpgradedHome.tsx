import { Helmet } from 'react-helmet';
import ShaderGradientHero from '@/components/home/upgraded/ShaderGradientHero';
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
      
      <div>
        <ShaderGradientHero />
        <ModernAbout />
        <ExperiencePreview />
        <ContactLinks />
      </div>
    </>
  );
};

export default UpgradedHome;
