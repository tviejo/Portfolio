import { motion } from 'framer-motion';

export const ModernGrid = ({ className = "" }: { className?: string }) => (
  <div className={`absolute inset-0 -z-10 ${className}`}>
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
    <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/60 to-background/80" />
  </div>
);

export const GlassMorphismEffect = ({ className = "" }: { className?: string }) => (
  <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
    <div className="absolute left-[10%] top-[5%] h-72 w-72 rounded-full bg-primary/5 blur-[80px]" />
    <div className="absolute right-[15%] bottom-[10%] h-80 w-80 rounded-full bg-accent/5 blur-[100px]" />
    <div className="absolute left-[40%] top-[30%] h-64 w-64 rounded-full bg-blue-500/5 blur-[80px]" />
  </div>
);

export const CircleGrid = ({ className = "" }: { className?: string }) => {
  const circles = Array(20).fill(0).map(() => ({
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2
  }));

  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
      {circles.map((circle, i) => (
        <motion.div 
          key={i}
          className="absolute rounded-full bg-accent/10"
          style={{ width: circle.size, height: circle.size }}
          initial={{ x: `${circle.x}%`, y: `${circle.y}%`, opacity: 0.2 }}
          animate={{ 
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 4 + Math.random() * 4,
            delay: circle.delay,
            ease: "easeInOut" 
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/70 to-background" />
    </div>
  );
};

export const NeumorphicBackground = ({ className = "" }: { className?: string }) => (
  <div className={`absolute inset-0 -z-10 ${className}`}>
    <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[size:20px_20px]" />
    <div className="absolute inset-0 bg-gradient-to-b from-background/30 to-background/95" />
  </div>
);

export const WavyBackground = ({ className = "" }: { className?: string }) => (
  <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
    <svg
      className="absolute bottom-0 left-0 right-0 w-full transform-gpu"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
    >
      <path
        fill="rgba(8, 145, 178, 0.05)" /* Teal color with low opacity */
        fillOpacity="1"
        d="M0,224L48,213.3C96,203,192,181,288,154.7C384,128,480,96,576,90.7C672,85,768,107,864,128C960,149,1056,171,1152,165.3C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      ></path>
    </svg>
  </div>
);
