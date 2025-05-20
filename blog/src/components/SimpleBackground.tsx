import React, { useEffect, useRef, useState } from 'react';

interface SimpleBackgroundProps {
  videoSrc: string;
  fallbackImageSrc?: string;
  overlayOpacity?: number;
}

const SimpleBackground: React.FC<SimpleBackgroundProps> = ({ 
  videoSrc, 
  fallbackImageSrc = "https://res.cloudinary.com/dpw2txejq/image/upload/v1747742361/lofi-city_y9vdrw.jpg",
  overlayOpacity = 0.6
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Error handling for video
    const handleVideoError = () => {
      console.error("Video failed to load, falling back to image");
      setVideoFailed(true);
    };

    // Listen for errors
    video.addEventListener('error', handleVideoError);
    
    // Try to play the video
    video.play().catch(err => {
      console.error("Video play error:", err);
      setVideoFailed(true);
    });

    return () => {
      video.removeEventListener('error', handleVideoError);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden" style={{ zIndex: -1 }}>
      {/* Background Container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {!videoFailed ? (
          <video
            ref={videoRef}
            className="absolute top-0 left-0 w-full h-full object-cover"
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <img 
            src={fallbackImageSrc}
            alt="Background"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        )}
        <div 
          className="absolute inset-0 bg-black" 
          style={{ opacity: overlayOpacity }}
        />
      </div>
    </div>
  );
};

export default SimpleBackground;