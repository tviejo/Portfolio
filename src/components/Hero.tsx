import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import DynamicBackground from "./ui/dynamic-background";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "@/lib/translations";

const Hero = () => {
  const { language } = useLanguage();
  const t = translations[language].hero;

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden pt-20">
      <DynamicBackground type="particles" density={30} />
      
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90 z-0" />
      
      <div className="max-w-6xl mx-auto text-center z-10 relative mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 blur-[100px] rounded-full opacity-50" />
            <div className="relative rounded-full w-48 h-48 md:w-64 md:h-64 mx-auto overflow-hidden border-4 border-primary/30 shadow-2xl shadow-primary/20">
              <motion.img 
                src="/images/thomas.jpg" 
                alt="Thomas Viejo"
                className="w-full h-full object-cover"
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-4xl font-medium text-primary mb-4"
          >
            {t.greeting}
          </motion.h2>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"
          >
            {t.title}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-2xl md:text-3xl text-muted-foreground mb-8"
          >
            {t.location}
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            {t.description}
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-6 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Button 
              size="lg" 
              className="group relative overflow-hidden bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all px-8 py-6 text-lg"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <span className="relative flex items-center">
                {t.getInTouch}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="group border-primary/20 hover:bg-primary/10 flex gap-2 items-center backdrop-blur-sm px-8 py-6 text-lg"
              onClick={() => {
                const projectsSection = document.getElementById('projects');
                if (projectsSection) {
                  projectsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              {t.viewProjects}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-6 mt-12"
          >
            <Button
              variant="ghost"
              size="lg"
              asChild
              className="group hover:bg-primary/10 px-6 py-4"
            >
              <a href="mailto:tviejo12@gmail.com" className="flex items-center">
                <Mail className="mr-2 h-5 w-5" /> 
                <span>Email</span>
              </a>
            </Button>
            
            <Button
              variant="ghost"
              size="lg"
              asChild
              className="group hover:bg-primary/10 px-6 py-4"
            >
              <a href="https://github.com/tviejo" target="_blank" rel="noopener noreferrer" className="flex items-center">
                <Github className="mr-2 h-5 w-5" /> 
                <span>GitHub</span>
              </a>
            </Button>
            
            <Button
              variant="ghost"
              size="lg"
              asChild
              className="group hover:bg-primary/10 px-6 py-4"
            >
              <a
                href="https://www.linkedin.com/in/thomas-viejo-9a213b195/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <Linkedin className="mr-2 h-5 w-5" /> 
                <span>LinkedIn</span>
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
