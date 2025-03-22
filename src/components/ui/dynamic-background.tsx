import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

interface DynamicBackgroundProps {
  className?: string;
  type?: 'gradient' | 'particles' | 'grid' | 'noise' | 'waves';
  interactive?: boolean;
  density?: number;
}

export const DynamicBackground: React.FC<DynamicBackgroundProps> = ({ 
  className = "", 
  type = "gradient", 
  interactive = true,
  density = 20
}) => {
  const { theme } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Update mouse position for interactive effects
  useEffect(() => {
    if (!interactive) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };
    
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('resize', updateWindowSize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [interactive]);

  const renderBackground = () => {
    switch (type) {
      case 'particles':
        return <ParticlesBackground density={density} theme={theme} />;
      case 'grid':
        return <GridBackground theme={theme} mousePosition={mousePosition} interactive={interactive} />;
      case 'noise':
        return <NoiseBackground theme={theme} />;
      case 'waves':
        return <WavesBackground theme={theme} />;
      case 'gradient':
      default:
        return <GradientBackground theme={theme} mousePosition={mousePosition} interactive={interactive} />;
    }
  };
  
  return (
    <div ref={containerRef} className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
      {renderBackground()}
    </div>
  );
};

// Gradient background
const GradientBackground = ({ theme, mousePosition, interactive }: { theme: string, mousePosition: {x: number, y: number}, interactive: boolean }) => {
  const lightGradient = [
    'rgba(8, 145, 178, 0.05)', // teal
    'rgba(51, 65, 85, 0.03)'   // slate
  ];
  
  const darkGradient = [
    'rgba(8, 145, 178, 0.1)',  // teal
    'rgba(51, 65, 85, 0.07)'   // slate
  ];
  
  const currentGradient = theme === 'dark' ? darkGradient : lightGradient;
  
  return (
    <>
      <motion.div 
        className="absolute w-full h-full opacity-80"
        style={{
          background: `radial-gradient(circle at ${
            interactive ? `${mousePosition.x}px ${mousePosition.y}px` : '50% 50%'
          }, ${currentGradient[0]} 0%, ${currentGradient[1]} 50%, transparent 70%)`
        }}
        animate={interactive ? {
          x: [0, 5, -5, 0],
          y: [0, -5, 5, 0],
        } : {}}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <div className={`absolute inset-0 bg-${theme === 'dark' ? 'dark' : 'light'}/5`} />
      
      {/* Animated circles */}
      <motion.div
        className="absolute top-1/4 left-1/4 rounded-full blur-3xl"
        style={{ 
          width: '20vw', 
          height: '20vw', 
          backgroundColor: currentGradient[0] 
        }}
        animate={{ 
          x: [0, 50, 0, -50, 0],
          y: [0, -50, 0, 50, 0],
          scale: [1, 1.1, 1, 0.9, 1]
        }}
        transition={{ 
          duration: 25, 
          repeat: Infinity,
          repeatType: 'reverse' 
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-1/4 rounded-full blur-3xl"
        style={{ 
          width: '15vw', 
          height: '15vw', 
          backgroundColor: currentGradient[1] 
        }}
        animate={{ 
          x: [0, -30, 0, 30, 0],
          y: [0, 30, 0, -30, 0],
          scale: [1, 0.9, 1, 1.1, 1]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity,
          repeatType: 'reverse',
          delay: 1
        }}
      />
    </>
  );
};

// Grid background with parallax effect
const GridBackground = ({ theme, mousePosition, interactive }: { theme: string, mousePosition: {x: number, y: number}, interactive: boolean }) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleScroll = () => {
      setOffset({
        x: window.scrollX * 0.05,
        y: window.scrollY * 0.05
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const gridColor = theme === 'dark' ? '#ffffff08' : '#00000008';
  const parallaxX = interactive ? mousePosition.x * 0.01 : 0;
  const parallaxY = interactive ? mousePosition.y * 0.01 : 0;
  
  return (
    <>
      <motion.div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${gridColor} 1px, transparent 1px),
            linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          transform: `translate(${offset.x + parallaxX}px, ${offset.y + parallaxY}px)`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background/90" />
    </>
  );
};

// Animated particles background
const ParticlesBackground = ({ density, theme }: { density: number, theme: string }) => {
  const particles = Array.from({ length: density }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 10
  }));

  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full bg-primary/${theme === 'dark' ? '20' : '10'}`}
          style={{ 
            width: particle.size, 
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`
          }}
          animate={{ 
            y: [0, -20, 0, 20, 0],
            opacity: [0.1, 0.2, 0.1, 0.2, 0.1],
            scale: [1, 1.2, 1, 0.8, 1]
          }}
          transition={{ 
            duration: particle.duration, 
            repeat: Infinity,
            delay: particle.delay 
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background/90" />
    </>
  );
};

// Noise texture background
const NoiseBackground = ({ theme }: { theme: string }) => {
  return (
    <>
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">
        <div className={`absolute inset-0 opacity-[0.03] bg-noise filter-[contrast(300%)] dark:opacity-[0.05] mix-blend-${theme === 'dark' ? 'overlay' : 'multiply'}`} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90" />
      
      {/* Animated light beam effect */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          background: `linear-gradient(45deg, transparent, ${theme === 'dark' ? 'rgba(8, 145, 178, 0.1)' : 'rgba(8, 145, 178, 0.05)'} 50%, transparent 100%)`,
          backgroundSize: '200% 200%'
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
    </>
  );
};

// Wave animation background
const WavesBackground = ({ theme }: { theme: string }) => {
  const waveColor = theme === 'dark' ? 'rgba(8, 145, 178, 0.15)' : 'rgba(8, 145, 178, 0.05)';
  
  return (
    <>
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 md:h-48 lg:h-64 overflow-hidden"
        animate={{}}
      >
        <motion.svg
          className="absolute bottom-0 left-0 right-0 w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <motion.path
            fill={waveColor}
            initial={{ d: "M0,224L48,213.3C96,203,192,181,288,154.7C384,128,480,96,576,90.7C672,85,768,107,864,128C960,149,1056,171,1152,165.3C1248,160,1344,128,1392,112L1440,96L1440,320L0,320Z" }}
            animate={{ 
              d: [
                "M0,224L48,213.3C96,203,192,181,288,154.7C384,128,480,96,576,90.7C672,85,768,107,864,128C960,149,1056,171,1152,165.3C1248,160,1344,128,1392,112L1440,96L1440,320L0,320Z",
                "M0,160L48,181.3C96,203,192,245,288,261.3C384,277,480,267,576,245.3C672,224,768,192,864,170.7C960,149,1056,139,1152,149.3C1248,160,1344,192,1392,208L1440,224L1440,320L0,320Z",
                "M0,224L48,213.3C96,203,192,181,288,154.7C384,128,480,96,576,90.7C672,85,768,107,864,128C960,149,1056,171,1152,165.3C1248,160,1344,128,1392,112L1440,96L1440,320L0,320Z"
              ]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.svg>
        
        {/* Second wave with different timing */}
        <motion.svg
          className="absolute bottom-0 left-0 right-0 w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          style={{ opacity: 0.5 }}
        >
          <motion.path
            fill={waveColor}
            initial={{ d: "M0,128L48,149.3C96,171,192,213,288,229.3C384,245,480,235,576,213.3C672,192,768,160,864,144C960,128,1056,128,1152,138.7C1248,149,1344,171,1392,181.3L1440,192L1440,320L0,320Z" }}
            animate={{ 
              d: [
                "M0,128L48,149.3C96,171,192,213,288,229.3C384,245,480,235,576,213.3C672,192,768,160,864,144C960,128,1056,128,1152,138.7C1248,149,1344,171,1392,181.3L1440,192L1440,320L0,320Z",
                "M0,96L48,101.3C96,107,192,117,288,138.7C384,160,480,192,576,181.3C672,171,768,117,864,101.3C960,85,1056,107,1152,112C1248,117,1344,107,1392,101.3L1440,96L1440,320L0,320Z",
                "M0,128L48,149.3C96,171,192,213,288,229.3C384,245,480,235,576,213.3C672,192,768,160,864,144C960,128,1056,128,1152,138.7C1248,149,1344,171,1392,181.3L1440,192L1440,320L0,320Z"
              ]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </motion.svg>
      </motion.div>
    </>
  );
};

export default DynamicBackground;
const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

