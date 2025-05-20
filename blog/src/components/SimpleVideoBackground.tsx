import React, { useEffect, useRef } from 'react';

interface SimpleVideoBackgroundProps {
  videoSrc: string;
  overlayOpacity?: number;
}

const SimpleVideoBackground: React.FC<SimpleVideoBackgroundProps> = ({ 
  videoSrc, 
  overlayOpacity = 0.7 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Initial load and play
    const playVideo = async () => {
      try {
        // For mobile browsers that block autoplay
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
          await playPromise;
          console.log('Video playing successfully');
        }
      } catch (error) {
        console.error('Failed to play video:', error);
        
        // Add click event to play on user interaction
        document.addEventListener('click', () => {
          video.play().catch(e => console.error('Still cannot play:', e));
        }, { once: true });
      }
    };

    playVideo();

    // Set up scroll-based playback rate
    const handleScroll = () => {
      if (!video) return;
      
      // Get scroll direction
      const scrollY = window.scrollY;
      const scrollDelta = scrollY - (window._lastScrollY || 0);
      window._lastScrollY = scrollY;
      
      // Adjust playback rate based on scroll direction
      if (Math.abs(scrollDelta) > 5) {
        // Scrolling down - play forward
        if (scrollDelta > 0) {
          video.playbackRate = 1;
          if (video.paused) video.play().catch(() => {});
        } 
        // Scrolling up - play backward (not supported in standard HTML5 video)
        // Instead, we'll rewind by decreasing currentTime
        else {
          // Simulate backward playback by moving current time back
          video.currentTime = Math.max(0, video.currentTime - 0.1);
        }
      } else {
        // Not scrolling - pause
        video.playbackRate = 0;
      }
    };

    // Add scroll listener with passive flag for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [videoSrc]);

  return (
    <div className="video-background fixed inset-0 w-full h-full overflow-hidden" style={{ zIndex: -1 }}>
      <video
        ref={videoRef}
        className="absolute w-full h-full object-cover"
        src={videoSrc}
        muted
        loop
        playsInline
        autoPlay
      />
      <div 
        className="absolute inset-0 bg-black" 
        style={{ opacity: overlayOpacity }}
      />
    </div>
  );
};

// Add this declaration to avoid TypeScript errors
declare global {
  interface Window {
    _lastScrollY: number;
  }
}

export default SimpleVideoBackground;