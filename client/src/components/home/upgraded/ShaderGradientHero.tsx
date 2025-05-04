import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import TypewriterText from '../../ui/TypewriterText';
import { fadeIn, slideUp } from '@/lib/framerAnimations';

const ShaderGradientHero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number, y: number }>({ x: 0.5, y: 0.5 });
  
  // Primary WebGL effect without mouse dependency
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl');
    
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const { clientWidth, clientHeight } = canvas.parentElement as HTMLElement;
      canvas.width = clientWidth;
      canvas.height = clientHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: 1.0 - (e.clientY - rect.top) / rect.height // Invert Y for WebGL
      };
    };
    
    const handleMouseLeave = () => {
      mouseRef.current = { x: 0.5, y: 0.5 };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    // Vertex shader source
    const vertexShaderSource = `
      attribute vec4 a_position;
      attribute vec2 a_texCoord;
      
      varying vec2 v_texCoord;
      
      void main() {
        gl_Position = a_position;
        v_texCoord = a_texCoord;
      }
    `;
    
    // Fragment shader source - simulating a waterPlane effect with grain
    const fragmentShaderSource = `
      precision highp float;
      
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse; // Mouse position
      varying vec2 v_texCoord;
      
      // Your specified colors
      vec3 color1 = vec3(0.016, 0.035, 0.153); // #040927
      vec3 color2 = vec3(0.761, 0.161, 0.22);  // #c22938
      vec3 color3 = vec3(0.882, 0.435, 0.137); // #e16f23
      
      // Noise functions
      // Hash function
      float hash(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }
      
      // 2D Noise for water movement
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        
        vec2 u = f * f * (3.0 - 2.0 * f);
        
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }
      
      // Fractal Brownian Motion
      float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;
        float frequency = 2.0;
        
        for (int i = 0; i < 6; i++) {
          value += amplitude * noise(p * frequency);
          amplitude *= 0.5;
          frequency *= 2.0;
        }
        
        return value;
      }
      
      // WaterPlane simulation
      vec3 waterPlane(vec2 uv, float time, vec2 mouse) {
        // Speed parameters
        float uSpeed = 0.4; // From your params
        
        // Strength parameters
        float uStrength = 2.0; // From your params
        float uDensity = 2.0;  // From your params
        
        // Create water waves effect - this continues regardless of mouse position
        vec2 baseMovement = vec2(
          fbm(uv + time * uSpeed * 0.2),
          fbm(uv + vec2(1.0) + time * uSpeed * 0.2)
        ) * uStrength;
        
        // Calculate distance from mouse position - strongly localized effect
        float mouseDist = distance(uv, mouse);
        float mouseInfluence = 1.0 - smoothstep(0.0, 0.15, mouseDist); // Small radius
        
        // Only add mouse effects to the base movement if mouse is close enough
        vec2 movement = baseMovement;
        
        if (mouseInfluence > 0.01) {
          // Create mouse interaction - push water away from cursor
          vec2 mouseDisplacement = normalize(uv - mouse) * mouseInfluence * 0.1;
          
          // Add vortex effect around mouse
          float angle = atan(uv.y - mouse.y, uv.x - mouse.x);
          float vortexStrength = mouseInfluence * 0.05;
          vec2 vortexEffect = vec2(
            cos(angle) * vortexStrength,
            sin(angle) * vortexStrength
          );
          
          // Add localized mouse effects to the base movement
          movement += mouseDisplacement + vortexEffect;
        }
        
        vec2 distortedUV = uv + movement;
        
        // Create complex pattern for mixing colors
        float pattern1 = fbm(distortedUV * uDensity);
        float pattern2 = fbm(distortedUV * uDensity + vec2(pattern1) + time * 0.1);
        float pattern3 = fbm(distortedUV * uDensity * 0.5 + vec2(pattern2));
        
        // Mix colors based on patterns
        vec3 color = mix(color1, color2, pattern1);
        color = mix(color, color3, pattern2);
        
        // Add vignette
        float vignette = 1.0 - smoothstep(0.3, 1.0, length(uv - 0.5) * 1.2);
        color = mix(color * 0.6, color, vignette);
        
        // Add grain effect
        float grain = hash(uv * 250.0 + time) * 0.1;
        color = mix(color, vec3(grain), 0.1);
        
        // Add reflection simulation
        float reflection = 0.3; // From your params
        float fresnel = pow(1.0 - abs(dot(vec3(0.0, 0.0, 1.0), vec3(0.0, 0.0, 1.0))), 4.0) * reflection;
        color = mix(color, vec3(1.0), fresnel * pattern3 * 0.2);
        
        return color;
      }
      
      void main() {
        // Get normalized coordinates
        vec2 uv = v_texCoord;
        
        // Apply waterplane effect with mouse interaction
        vec3 color = waterPlane(uv, u_time, u_mouse);
        
        gl_FragColor = vec4(color, 1.0);
      }
    `;
    
    // Compile shader
    const compileShader = (source: string, type: number) => {
      const shader = gl.createShader(type);
      if (!shader) {
        console.error('Failed to create shader');
        return null;
      }
      
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      
      return shader;
    };
    
    // Create program
    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
    
    if (!vertexShader || !fragmentShader) {
      return;
    }
    
    const program = gl.createProgram();
    if (!program) {
      console.error('Failed to create WebGL program');
      return;
    }
    
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program));
      return;
    }
    
    gl.useProgram(program);
    
    // Create a quad to fill the canvas
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    
    const positions = [
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
       1.0,  1.0
    ];
    
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    
    // Set up texture coordinates
    const texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    
    const texCoords = [
      0.0, 0.0,
      1.0, 0.0,
      0.0, 1.0,
      1.0, 1.0
    ];
    
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoords), gl.STATIC_DRAW);
    
    // Set up attribute pointers
    // Position attribute
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
    
    // Texture coordinate attribute
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    const texCoordAttributeLocation = gl.getAttribLocation(program, 'a_texCoord');
    gl.enableVertexAttribArray(texCoordAttributeLocation);
    gl.vertexAttribPointer(texCoordAttributeLocation, 2, gl.FLOAT, false, 0, 0);
    
    // Get the uniform locations
    const timeUniformLocation = gl.getUniformLocation(program, 'u_time');
    const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');
    const mouseUniformLocation = gl.getUniformLocation(program, 'u_mouse');
    
    // Set resolution uniform
    gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);
    
    // Animation loop
    let animationFrameId: number;
    let startTime = Date.now();
    
    const render = () => {
      const currentTime = (Date.now() - startTime) / 1000; // Convert to seconds
      gl.uniform1f(timeUniformLocation, currentTime);
      gl.uniform2f(mouseUniformLocation, mouseRef.current.x, mouseRef.current.y);
      
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    render();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
      gl.deleteBuffer(texCoordBuffer);
    };
  }, []); // No dependencies to ensure animation continues no matter what
  
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Custom WebGL Gradient Background */}
      <div className="absolute inset-0 z-0">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full"
        />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/2 mb-10 md:mb-0"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <motion.p 
              className="text-primary-light font-mono mb-3 text-white"
              variants={slideUp}
            >
              Hello, I'm
            </motion.p>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-space font-bold mb-4 text-white"
              variants={slideUp}
            >
              Lochlann O'Higgins
            </motion.h1>
            
            <div className="h-12 mb-6">
              <TypewriterText
                texts={[
                  'Website Specialist & Developer',
                  'WordPress Expert',
                  'SEO Optimizer',
                  'UI/UX Enthusiast',
                  'Full Stack Developer in Training'
                ]}
                className="text-xl md:text-2xl font-space text-white/80"
              />
            </div>
            
            <motion.p 
              className="text-white/80 mb-8 max-w-lg"
              variants={slideUp}
            >
              I design and build websites that tell stories. With experience in WordPress development
              and a passion for creating smooth, intuitive user experiences.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              variants={slideUp}
            >
              <Link to="/portfolio" className="px-6 py-3 rounded-full backdrop-blur-sm bg-white/10 hover:bg-white/20 text-white font-medium shadow-lg transition-all border border-white/20">
                View My Work
              </Link>
              <Link to="/about" className="px-6 py-3 rounded-full backdrop-blur-sm border border-white/30 text-white font-medium hover:bg-white/10 transition-all">
                About Me
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 flex justify-center"
            initial="initial"
            animate="animate"
            variants={fadeIn}
            custom={0.5}
          >
            <div className="relative w-64 h-64 md:w-96 md:h-96">
              <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-md blur-2xl"></div>
              <img 
                src="https://res.cloudinary.com/dpw2txejq/image/upload/v1744655473/loch_qcgqjw.png"
                alt="Lochlann O'Higgins" 
                className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full border-4 border-white/20 shadow-xl z-10 relative"
              />
              <motion.div 
                className="absolute -bottom-4 -right-4 backdrop-blur-sm bg-white/10 p-3 rounded-xl shadow-lg border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <span className="text-white font-mono font-bold">5+ Years</span>
                <span className="block text-white/80 text-sm">Web Development</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ShaderGradientHero;
