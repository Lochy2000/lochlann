import React, { useEffect, useRef, useState } from 'react';

interface ParallaxVideoProps {
  videoSrc: string;
  overlayOpacity?: number;
}

const ParallaxVideo: React.FC<ParallaxVideoProps> = ({ 
  videoSrc, 
  overlayOpacity = 0.6
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [videoHeight, setVideoHeight] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Get video dimensions once it's loaded
    const handleVideoLoad = () => {
      console.log('Video loaded successfully');
      // Start the video playing
      video.play().catch(err => console.error('Video play error:', err));
      
      // Use natural dimensions to calculate aspect ratio
      const videoRatio = video.videoWidth / video.videoHeight;
      
      // Calculate height needed to maintain aspect ratio while covering width
      const containerWidth = window.innerWidth;
      const heightNeeded = containerWidth / videoRatio;
      
      // Set expanded size to ensure full coverage during parallax
      setVideoHeight(Math.max(heightNeeded, window.innerHeight * 1.5));
      console.log(`Video size set: ${containerWidth}x${heightNeeded}, ratio: ${videoRatio}`);
    };

    // Set up video loading events
    video.addEventListener('loadedmetadata', handleVideoLoad);

    // Set up parallax effect - video scrolls up as user scrolls down
    const handleScroll = () => {
      if (!video || !containerRef.current) return;
      
      const scrollPosition = window.scrollY;
      // Negative value makes the video scroll up as page scrolls down
      // Adjust speed as needed (0.3 = 30% of scroll speed)
      const translateY = scrollPosition * -0.3;
      
      // Apply transformation to container to prevent overflow clipping
      containerRef.current.style.transform = `translateY(${translateY}px)`;
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Handle window resize
    const handleResize = () => {
      if (!video) return;
      
      // Recalculate video size on window resize
      const videoRatio = video.videoWidth / video.videoHeight;
      const containerWidth = window.innerWidth;
      const heightNeeded = containerWidth / videoRatio;
      
      setVideoHeight(Math.max(heightNeeded, window.innerHeight * 1.5));
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      video.removeEventListener('loadedmetadata', handleVideoLoad);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden" style={{ zIndex: -1 }}>
      {/* This container ensures proper overflow without clipping during parallax */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* This is the actual moving element for parallax */}
        <div 
          ref={containerRef} 
          className="absolute inset-0 w-full"
          style={{ height: videoHeight || '150vh' }}
        >
          <video
            ref={videoRef}
            className="absolute top-0 left-0 w-full h-full object-cover"
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
        {/* Overlay for better text contrast */}
        <div 
          className="absolute inset-0 bg-black" 
          style={{ opacity: overlayOpacity }}
        />
      </div>
    </div>
  );
};

export default ParallaxVideo;