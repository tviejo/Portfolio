import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { EnhancedCard } from './ui/enhanced-card';
import { Code, Wrench, Terminal, Crown, Rocket, LucideIcon } from 'lucide-react';
import SectionAnimation from './ui/section-animation';
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "@/lib/translations";

type SkillCategory = {
  icon: LucideIcon;
  name: string;
  skills: string[];
  primary?: boolean;
};

const About = () => {
  const { language } = useLanguage();
  const t = translations[language].about;

  const { ref } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillCategories: SkillCategory[] = [
    {
      icon: Code,
      name: t.skillCategories.coreLanguages,
      skills: ['C/C++/C#', 'python', 'JavaScript/TypeScript', 'CSS/HTML', 'Grafcet/Ladder', 'VHDL'],
      primary: true
    },
    {
      icon: Wrench,
      name: t.skillCategories.toolsPlatforms,
      skills: [ 'Git', 'VS Code', 'Visual Studio', 'Docker', 'Linux', 'Windows'],
    },
    {
      icon: Terminal,
      name: t.skillCategories.technicalExpertise,
      skills: ['Embedded Systems', 'FPGA Programming', 'System Programming'],
    },
    {
      icon: Crown,
      name: t.skillCategories.leadership,
      skills: ['Project Management', 'Team Leadership', 'Technical Documentation'],
    },
    {
      icon: Rocket,
      name: t.skillCategories.emergingTech,
      skills: ['AI & ML', 'IoT Development', 'Cloud Services'],
    },
  ];

  return (
    <SectionAnimation
      id="about"
      className="py-16 relative overflow-hidden"
      variants={{
        initial: { opacity: 0 },
        animate: { opacity: 1 }
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"
          >
            {t.title}
          </motion.h2>
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
                <h3 className="text-xl font-semibold mb-4">Background</h3>
                
                <div className="space-y-4 text-foreground/80">
                  <p className="leading-relaxed">
                    {t.description1}
                  </p>
                  
                  <motion.div 
                    className="relative h-px bg-primary/20 my-6"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  />
                  
                  <p className="leading-relaxed">
                    {t.description2}
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
            <div className="space-y-4">
              {skillCategories.map((category, idx) => (
                <motion.div 
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                >
                  <EnhancedCard gradient={category.primary}>
                    <div className="p-4">
                      <div className="flex items-center mb-3">
                        <div className="rounded-full bg-primary/10 p-2 mr-3">
                          <category.icon className="w-4 h-4 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold">{category.name}</h3>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill) => (
                          <motion.div
                            key={skill}
                            className="px-3 py-1 rounded-full bg-primary/5 text-sm hover:bg-primary/10 transition-colors duration-300"
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
            </div>
          </motion.div>
        </div>
      </div>
    </SectionAnimation>
  );
};

export default About;