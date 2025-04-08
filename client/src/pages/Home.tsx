import Hero from '@/components/home/Hero';
import AboutSection from '@/components/about/AboutSection';
import Timeline from '@/components/experience/Timeline';
import Portfolio from './Portfolio';
import Blog from './Blog';
import Contact from './Contact';
import { Helmet } from 'react-helmet';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Lochlann O'Higgins | Website Specialist & Developer</title>
        <meta name="description" content="Personal portfolio of Lochlann O'Higgins - Website Specialist and Developer with expertise in WordPress and modern web technologies." />
      </Helmet>
      
      <div>
        <Hero />
        <AboutSection />
        <Timeline />
        <Portfolio showAll={false} />
        <Blog showAll={false} />
        <Contact />
      </div>
    </>
  );
};

export default Home;
