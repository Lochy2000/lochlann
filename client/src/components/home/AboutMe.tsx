import React from 'react';

const AboutMe = () => {
  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-semibold text-center mb-8">🚀 About Me</h2>
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2">
          <img src="https://res.cloudinary.com/dpw2txejq/image/upload/v1744655473/activites_l0ffzh.png" alt="Activities" className="rounded-lg shadow-md" />
        </div>
        <div className="md:w-1/2 mt-4 md:mt-0">
          <p className="text-lg">
            I'm a developer and coach with a passion for building impactful tech and uplifting communities through sport and innovation. From leading web projects and winning hackathons to coaching table tennis and wheelchair rugby league, I bring energy and adaptability into everything I do.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;