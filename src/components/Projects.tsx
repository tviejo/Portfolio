import { motion } from "framer-motion";
import { Gamepad, Server, Code, Lightbulb } from 'lucide-react';
import { EnhancedCard } from "./ui/enhanced-card";
import SectionAnimation from "./ui/section-animation";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "@/lib/translations";

const Projects = () => {
  const { language } = useLanguage();
  const t = translations[language].projects;

  const projects = [
    {
      ...t.projects.cub3d,
      icon: Gamepad
    },
    {
      ...t.projects.webserv,
      icon: Server
    },
    {
      ...t.projects.iot,
      icon: Code
    },
    {
      ...t.projects.ai,
      icon: Lightbulb
    }
  ];

  return (
    <SectionAnimation
      id="projects"
      className="py-16 relative overflow-hidden"
      variants={{
        initial: { opacity: 0 },
        animate: { opacity: 1 },
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
        
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <EnhancedCard 
                className="h-full group hover:shadow-lg transition-all"
                hover3d={index === 0}
                gradient={index === 0}
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <project.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                  </div>
                  
                  <p className="text-foreground/80 text-sm mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs rounded-full bg-primary/5 text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </EnhancedCard>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionAnimation>
  );
};

export default Projects;