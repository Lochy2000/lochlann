import Hero from '@/components/home/Hero';
import AboutMe from '@/components/home/AboutMe';
import Timeline from '@/components/experience/Timeline';
import Portfolio from './Portfolio';
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
        <AboutMe />
        <Timeline />
        <Portfolio showAll={false} />
        <Contact />
      </div>
    </>
  );
};

export default Home;
