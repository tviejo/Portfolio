import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { EnhancedCard } from './ui/enhanced-card';
import { Briefcase, Code, Wrench, Rocket, Crown, Terminal, LucideIcon } from 'lucide-react';
import { standardStyles } from '@/lib/theme-config';
import SectionAnimation from './ui/section-animation';
import DynamicBackground from './ui/dynamic-background';

type SkillCategory = {
  icon: LucideIcon;
  name: string;
  skills: string[];
  primary?: boolean;
};

const skillCategories: SkillCategory[] = [
  {
    icon: Code,
    name: "Programming Languages",
    skills: ['C/C++/C#', 'JavaScript/TypeScript', 'VHDL', 'Grafcet', 'Ladder'],
    primary: true
  },
  {
    icon: Wrench,
    name: "Development Tools",
    skills: ['Docker', 'Git', 'UNIX Systems', 'Visual Studio', 'VS Code'],
  },
  {
    icon: Terminal,
    name: "Technical Skills",
    skills: ['Electronic Circuit Design', 'Microcontroller Programming', 'FPGA Programming', 'Embedded Systems', 'System Programming'],
  },
  {
    icon: Crown,
    name: "Leadership",
    skills: ['Project Management', 'Team Leadership', 'Technical Documentation', 'Startup Development', 'Business Strategy'],
  },
  {
    icon: Rocket,
    name: "Emerging Tech",
    skills: ['AI & Machine Learning', 'Networking & Security', 'IoT Development', 'Cloud Services'],
  },
];

const About = () => {
  const { /* ref, inView */ } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <SectionAnimation
      className="py-20 relative overflow-hidden"
      variants={{
        initial: { opacity: 0 },
        animate: { opacity: 1 }
      }}
    >
      {/* Dynamic grid background */}
      <DynamicBackground type="grid" />
      
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/50 via-background/70 to-background/50" />
      <div className="absolute left-0 top-20 h-80 w-80 rounded-full bg-primary/5 blur-3xl -z-5" />
      <div className="absolute right-0 bottom-20 h-80 w-80 rounded-full bg-accent/5 blur-3xl -z-5" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
          >
            <Briefcase className="w-4 h-4" />
            <span>Professional Profile</span>
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={standardStyles.sectionTitle}
          >
            About Me
          </motion.h2>
          
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '5rem' }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={standardStyles.sectionDivider}
          />
        </div>
        
        <div className="grid md:grid-cols-5 gap-8">
          {/* Left column - Profile */}
          <motion.div 
            className="md:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <EnhancedCard className="h-full" hover3d>
              <div className="p-6 h-full flex flex-col">
                <div className="flex justify-center mb-8">
                </div>
                
                <h3 className="text-xl font-semibold mb-4">Background</h3>
                
                <div className="space-y-4 text-foreground/80">
                  <p className="leading-relaxed">
                    I am a passionate and versatile software developer with expertise in programming languages such as C, C++, C#, JavaScript, VHDL, and Grafcet, complemented by strong project management skills.
                  </p>
                  
                  <motion.div 
                    className="relative h-px bg-primary/20 my-6"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  />
                  
                  <p className="leading-relaxed">
                    My international experience in IoT, automation, web development, and systems, along with entrepreneurial ventures like VermR, enable me to excel in complex and innovative environments.
                  </p>
                  
                  <p className="leading-relaxed">
                    Currently, I am advancing my expertise at 42 Paris while pursuing a certificate in the Master 2 LEAD (Law, Entrepreneurship, And Digital) at Université Paris-Saclay.
                  </p>
                </div>
              </div>
            </EnhancedCard>
          </motion.div>
          
          {/* Right column - Skills */}
          <motion.div 
            className="md:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-6">
              {skillCategories.map((category, idx) => (
                <motion.div 
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                >
                  <EnhancedCard gradient={category.primary}>
                    <div className="p-5">
                      <div className="flex items-center mb-4">
                        <div className="rounded-full bg-primary/10 p-3 mr-3">
                          <category.icon className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold">{category.name}</h3>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill) => (
                          <motion.div
                            key={skill}
                            className="px-3 py-1.5 rounded-full bg-primary/5 text-sm hover:bg-primary/20 transition-colors duration-300 cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {skill}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </EnhancedCard>
                </motion.div>
              ))}
              
              {/* Bottom highlight box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <EnhancedCard className="backdrop-blur-sm border border-primary/20" glare>
                  <div className="p-5 text-center">
                    <blockquote className="italic text-foreground/80">
                      "My diverse background allows me to approach problems from both technical and strategic perspectives, ensuring the delivery of high-quality solutions tailored to each project's unique needs."
                    </blockquote>
                  </div>
                </EnhancedCard>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionAnimation>
  );
};

export default About;