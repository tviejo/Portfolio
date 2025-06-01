import { ReactNode } from "react";
import { motion, MotionProps } from "framer-motion";

interface SectionAnimationProps extends MotionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 }
};

const SectionAnimation = ({ 
  children, 
  className = "",
  delay = 0,
  id,
  ...props 
}: SectionAnimationProps) => {
  return (
    <motion.section
      id={id}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  );
};

export default SectionAnimation;
