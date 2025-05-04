import { useEffect, useRef } from 'react';

interface AnimatedGridProps {
  opacity?: number;
  lineColor1?: string;
  lineColor2?: string;
  lineColor3?: string;
  angle?: number;
  spacing?: number;
  lineWidth?: number;
  animationSpeed?: number;
}

const AnimatedGrid = ({
  opacity = 0.2,
  lineColor1 = '#040927',
  lineColor2 = '#c22938',
  lineColor3 = '#e16f23',
  angle = 60,
  spacing = 25,
  lineWidth = 1,
  animationSpeed = 5
}: AnimatedGridProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const setCanvasDimensions = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Convert hex to rgb
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 0, g: 0, b: 0 };
    };
    
    // Parse colors
    const color1 = hexToRgb(lineColor1);
    const color2 = hexToRgb(lineColor2);
    const color3 = hexToRgb(lineColor3);
    
    let animationFrameId: number;
    let startTime = Date.now();
    
    const drawGrid = () => {
      if (!ctx || !canvas) return;
      
      const currentTime = (Date.now() - startTime) / 1000;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calculate the length of the diagonal
      const diagonal = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height);
      
      // Convert angle to radians
      const angleRad = (angle * Math.PI) / 180;
      
      // Calculate normal vector for the lines (perpendicular to angle)
      const normalX = Math.cos(angleRad);
      const normalY = Math.sin(angleRad);
      
      // Calculate how many lines we need
      const numLines = Math.ceil(diagonal / spacing) * 2;
      
      // Calculate starting point (to cover the entire canvas)
      const startOffset = -diagonal * 0.5;
      
      for (let i = 0; i < numLines; i++) {
        // Position along the normal
        const pos = startOffset + i * spacing;
        
        // Calculate endpoints of line
        // Start point
        const startX = pos * normalX - diagonal * normalY;
        const startY = pos * normalY + diagonal * normalX;
        
        // End point
        const endX = pos * normalX + diagonal * normalY;
        const endY = pos * normalY - diagonal * normalX;
        
        // Animate color based on time and position
        const t1 = (Math.sin(currentTime * animationSpeed / 10 + i * 0.1) + 1) * 0.5;
        const t2 = (Math.sin(currentTime * animationSpeed / 15 + i * 0.05 + 2) + 1) * 0.5;
        
        // Mix colors
        const r = Math.floor(color1.r * (1 - t1) + color2.r * t1 * (1 - t2) + color3.r * t1 * t2);
        const g = Math.floor(color1.g * (1 - t1) + color2.g * t1 * (1 - t2) + color3.g * t1 * t2);
        const b = Math.floor(color1.b * (1 - t1) + color2.b * t1 * (1 - t2) + color3.b * t1 * t2);
        
        // Draw line
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      }
      
      animationFrameId = requestAnimationFrame(drawGrid);
    };
    
    drawGrid();
    
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      cancelAnimationFrame(animationFrameId);
    };
  }, [opacity, lineColor1, lineColor2, lineColor3, angle, spacing, lineWidth, animationSpeed]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full"
    />
  );
};

export default AnimatedGrid;
