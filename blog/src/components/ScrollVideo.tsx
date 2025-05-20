import React, { useEffect, useRef, useState, useCallback } from 'react';

interface ScrollVideoProps {
  videoSrc: string;
  overlayOpacity?: number; // 0 to 1
}

const ScrollVideo: React.FC<ScrollVideoProps> = ({ 
  videoSrc, 
  overlayOpacity = 0.5 // Default overlay opacity
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Initialize video playback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force video to load and play
    const loadAndPlay = async () => {
      try {
        // Load the video
        video.load();
        
        // Play the video
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('Video playback started successfully');
            })
            .catch(error => {
              console.error('Error playing video:', error);
              // Try again with user interaction
              document.addEventListener('click', () => {
                video.play().catch(e => console.error('Still cannot play:', e));
              }, { once: true });
            });
        }
      } catch (error) {
        console.error('Error loading/playing video:', error);
      }
    };

    loadAndPlay();
  }, [videoSrc]);

  // Calculate the video progress based on scroll position
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Load the video metadata to get duration
    video.addEventListener('loadedmetadata', () => {
      if (video.duration === Infinity) {
        // Sometimes the duration is initially reported as Infinity
        setTimeout(() => {
          const duration = video.duration;
          console.log('Video duration:', duration);
        }, 1000);
      }
    });

    let lastScrollPosition = window.scrollY;
    let scrollDirection = 0; // 0: not scrolling, 1: down, -1: up
    let animationFrame: number | null = null;

    // Handle scroll
    const handleScroll = () => {
      if (animationFrame) return;
      
      animationFrame = requestAnimationFrame(() => {
        const currentScrollPosition = window.scrollY;
        const scrollDifference = currentScrollPosition - lastScrollPosition;
        
        // Determine scroll direction
        if (scrollDifference > 0) {
          scrollDirection = 1; // Scrolling down
        } else if (scrollDifference < 0) {
          scrollDirection = -1; // Scrolling up
        }
        
        if (scrollDifference !== 0) {
          // Calculate how much to move the video playhead
          const videoDuration = video.duration || 1;
          const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
          
          // Map scroll position to video time (0 to duration)
          const scrollPercentage = Math.min(1, Math.max(0, currentScrollPosition / scrollHeight));
          const targetTime = videoDuration * scrollPercentage;
          
          // Set the video's current time
          if (!isNaN(targetTime) && isFinite(targetTime)) {
            video.currentTime = targetTime;
          }
        }
        
        lastScrollPosition = currentScrollPosition;
        animationFrame = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <div className="scroll-video-container fixed top-0 left-0 w-full h-full" style={{ zIndex: -1 }}>
      <video 
        ref={videoRef}
        src={videoSrc}
        muted
        playsInline
        autoPlay
        loop
        preload="auto"
        className="w-full h-full object-cover"
      />
      <div 
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      />
    </div>
  );
};

export default ScrollVideo;