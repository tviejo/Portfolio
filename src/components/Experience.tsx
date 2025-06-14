import { Building2, Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { EnhancedCard } from './ui/enhanced-card';
import SectionAnimation from './ui/section-animation';
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "@/lib/translations";

const Experience = () => {
  const { language } = useLanguage();
  const t = translations[language].experience;

  const experiences = [
    t.experiences.gtt,
    t.experiences.vermr,
    t.experiences.astec,
    t.experiences.formule,
    t.experiences.univerza
  ];

  return (
    <SectionAnimation
      id="experience"
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
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
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
                      <Building2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{exp.title}</h3>
                      <div className="flex items-center text-sm text-foreground/70">
                        <span className="font-medium">{exp.company}</span>
                        <span className="mx-2">•</span>
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-foreground/70 bg-primary/5 px-3 py-1.5 rounded-full text-xs mb-4 inline-block">
                    <Calendar className="w-3 h-3 mr-2" />
                    {exp.period}
                  </div>
                  
                  <p className="text-foreground/80 mb-4 text-sm">{exp.description}</p>
                  
                  <ul className="space-y-2">
                    {exp.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start group/item">
                        <div className="bg-primary/10 rounded-full p-1 mt-0.5 mr-2 group-hover/item:bg-primary/20 transition-colors">
                          <ArrowRight className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-sm">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </EnhancedCard>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionAnimation>
  );
};

export default Experience;