import { useEffect, useRef, useState } from 'react';

interface AnimatedDotGridProps {
  dotColor?: string;
  dotRadius?: number;
  spacing?: number;
  animationSpeed?: number;
  opacityBase?: number;
  opacityWave?: number;
}

const AnimatedDotGrid = ({
  dotColor = '#ffb997',
  dotRadius = 2,
  spacing = 40,
  animationSpeed = 1,
  opacityBase = 0.15,
  opacityWave = 0.25
}: AnimatedDotGridProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

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

    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 255, g: 255, b: 255 };
    };

    const color = hexToRgb(dotColor);
    let animationFrameId: number;
    let startTime = Date.now();

    const drawDots = () => {
      if (!ctx || !canvas) return;

      const time = (Date.now() - startTime) / 1000;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let y = 0; y < canvas.height; y += spacing) {
        for (let x = 0; x < canvas.width; x += spacing) {
          const dx = x / canvas.width;
          const dy = y / canvas.height;
          const wave = Math.sin((dx + dy + time * animationSpeed) * Math.PI * 2);
          const distanceToMouse = mousePos
            ? Math.hypot(mousePos.x - x, mousePos.y - y)
            : Infinity;
          const hoverBoost = Math.max(0, 1 - distanceToMouse / 100);

          const alpha = opacityBase + wave * opacityWave + hoverBoost * 0.1;

          ctx.beginPath();
          ctx.arc(x, y, dotRadius, 0, 2 * Math.PI);
          ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${Math.min(1, alpha).toFixed(2)})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(drawDots);
    };

    drawDots();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseLeave = () => setMousePos(null);

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [dotColor, dotRadius, spacing, animationSpeed, opacityBase, opacityWave]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-[1] pointer-events-none"
    />
  );
};

export default AnimatedDotGrid;
