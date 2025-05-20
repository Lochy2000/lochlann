import React, { useEffect, useRef } from 'react';

interface ParallaxBackgroundProps {
  videoSrc: string;
  overlayOpacity?: number;
}

const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({ 
  videoSrc, 
  overlayOpacity = 0.6
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set up simple parallax effect
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      if (scrollPosition > 0) {
        // Calculate position - moving up as user scrolls down
        const yPos = scrollPosition * -0.2;
        video.style.transform = `translateY(${yPos}px)`;
      } else {
        video.style.transform = 'translateY(0)';
      }
    };

    // Initial setup
    video.addEventListener('loadeddata', () => {
      console.log('Video loaded successfully');
      video.play().catch(err => console.error('Video play error:', err));
    });

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden" style={{ zIndex: -1 }}>
      {/* Video Container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
        />
        <div 
          className="absolute inset-0 bg-black" 
          style={{ opacity: overlayOpacity }}
        />
      </div>
    </div>
  );
};

export default ParallaxBackground;