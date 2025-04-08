import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  element: HTMLDivElement;
}

const ParticleBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    
    // Create particles
    const particleCount = Math.min(Math.max(containerWidth, containerHeight) / 100, 20);
    const particles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      // Create particle element
      const element = document.createElement('div');
      element.className = 'absolute rounded-full bg-primary/20 dark:bg-secondary/20 animate-float';
      
      // Set random properties
      const size = Math.random() * 4 + 4; // Between 4px and 8px
      const x = Math.random() * containerWidth;
      const y = Math.random() * containerHeight;
      const speedX = (Math.random() - 0.5) * 0.2;
      const speedY = (Math.random() - 0.5) * 0.2;
      
      // Apply styles
      element.style.width = `${size}px`;
      element.style.height = `${size}px`;
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
      element.style.animationDelay = `${Math.random() * 5}s`;
      
      container.appendChild(element);
      
      particles.push({
        x,
        y,
        size,
        speedX,
        speedY,
        element
      });
    }
    
    particlesRef.current = particles;
    
    // Animate particles
    let animationFrameId: number;
    
    const animate = () => {
      particles.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off walls
        if (particle.x < 0 || particle.x > containerWidth) {
          particle.speedX *= -1;
        }
        
        if (particle.y < 0 || particle.y > containerHeight) {
          particle.speedY *= -1;
        }
        
        // Apply position
        particle.element.style.left = `${particle.x}px`;
        particle.element.style.top = `${particle.y}px`;
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      particles.forEach(particle => {
        if (particle.element.parentNode) {
          particle.element.parentNode.removeChild(particle.element);
        }
      });
    };
  }, []);
  
  return (
    <motion.div 
      ref={containerRef}
      className="particles absolute inset-0 overflow-hidden z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  );
};

export default ParticleBackground;
