import { motion } from "framer-motion";
import { GraduationCap, Calendar } from 'lucide-react';
import { EnhancedCard } from "./ui/enhanced-card";
import SectionAnimation from "./ui/section-animation";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "@/lib/translations";

const educationKeys = ["42", "saclay", "ets", "iut", "lycee", "mexico"] as const;

const Education = () => {
  const { language } = useLanguage();
  const t = translations[language].education;

  return (
    <SectionAnimation
      id="education"
      className="py-16 relative overflow-hidden"
      variants={{
        initial: { opacity: 0 },
        animate: { opacity: 1 }
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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

        <div className="grid gap-6">
          {educationKeys.map((key, index) => {
            const edu = t.entries[key];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <EnhancedCard 
                  className="group hover:shadow-lg transition-all"
                  hover3d={index === 0}
                  gradient={index === 0}
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                        <GraduationCap className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{edu.school}</h3>
                        <div className="flex items-center text-sm text-foreground/70">
                          <span className="font-medium">{edu.degree}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-foreground/70 bg-primary/5 px-3 py-1.5 rounded-full text-xs mb-4 inline-block">
                      <Calendar className="w-3 h-3 mr-2" />
                      {edu.period}
                    </div>
                    
                    {edu.description && (
                      <p className="text-foreground/80 text-sm">{edu.description}</p>
                    )}
                  </div>
                </EnhancedCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionAnimation>
  );
};

export default Education;