import { ReactNode } from 'react';

export interface SectionAnimationProps {
  children: ReactNode;
  className?: string;
  variants?: any;
  id?: string; // Adding id prop to fix the errors
}

export interface ParticleProps {
  id?: string;
}
