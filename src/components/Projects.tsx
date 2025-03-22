import { motion } from "framer-motion";
import { Globe, Gamepad, Server, Code, Lightbulb } from 'lucide-react';
import { EnhancedCard } from "./ui/enhanced-card";
import SectionAnimation from "./ui/section-animation";
import { standardStyles } from "@/lib/theme-config";
import DynamicBackground from "./ui/dynamic-background";

const projects = [
  {
    title: 'Documenting a Journey from Argentina to Alaska',
    description: 'Traveled across the Americas in a motorhome, capturing cultural stories and breathtaking landscapes through photography and videography.',
    icon: Globe,
  },
  {
    title: 'Cub3D - 3D Game Engine Development',
    description: 'Developed a 3D game engine using C and the MiniLibX graphics library. Implemented raycasting, texture mapping, sprite rendering, and player navigation for a fully interactive 3D experience.',
    icon: Gamepad,
  },
  {
    title: 'Webserv - Custom Web Server',
    description: 'Created a custom HTTP web server in C++. Implemented CGI processing, and error management.',
    icon: Server,
  },
  {
    title: 'C# Multimeter Application',
    description: 'Designed and developed a Windows Forms application in C# to measure real-time energy consumption of IoT satellite transmitters during an internship in Slovenia.',
    icon: Code,
  },
  {
    title: 'Hackathons - DGSE and OpenAI',
    description: 'Participated in hackathons organized by the DGSE and OpenAI, gaining experience in cybersecurity, AI, and cutting-edge technological solutions.',
    icon: Lightbulb,
  },
];

const Projects = () => {
  return (
    <SectionAnimation
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      variants={{
        initial: { opacity: 0 },
        animate: { opacity: 1 },
      }}
    >
      {/* Dynamic gradient background */}
      <DynamicBackground type="gradient" />
      
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute right-1/3 top-1/3 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute left-1/4 bottom-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Code className="h-4 w-4" />
            <span>Portfolio</span>
          </div>
          <h2 className={standardStyles.sectionTitle}>Notable Projects</h2>
          <div className={standardStyles.sectionDivider}></div>
        </motion.div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <EnhancedCard 
                className="h-full group hover:shadow-lg transition-all" 
                glare
              >
                <div className="p-6">
                  <div className="flex items-center mb-5">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <project.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">{project.title}</h3>
                  </div>
                  
                  <p className="text-foreground/80 leading-relaxed">{project.description}</p>
                  
                  <div className="absolute bottom-0 right-0 w-24 h-24 opacity-5 -translate-y-1/2 translate-x-1/2">
                    <project.icon className="w-full h-full" />
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