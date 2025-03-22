import { motion } from "framer-motion";
import { useEffect } from "react";
import { Button } from "./ui/button";
import { ArrowRight, MessageSquare, Github, Linkedin, Mail, MapPin, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { standardStyles } from "@/lib/theme-config";
import DynamicBackground from "./ui/dynamic-background";

const Hero = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
  }, []);
  
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Dynamic background with particles */}
      <DynamicBackground type="particles" density={30} />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90 z-0" />
      
      <div className="max-w-4xl mx-auto text-center z-10 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="rounded-full w-32 h-32 mx-auto mb-8 overflow-hidden border-4 border-primary/20 shadow-lg shadow-primary/10"
        >
          <img 
            src="/images/thomas.jpg" 
            alt="Thomas Viejo"
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        <motion.h1 
          className={standardStyles.heroHeading}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Hello, I'm Thomas Viejo
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative inline-block"
        >
          <span className="absolute top-0 left-0 w-full h-full bg-primary/5 rounded-lg blur-xl"></span>
          <p className="relative mt-6 text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto px-6 py-2 rounded-lg">
            Software Developer & Tech Enthusiast
          </p>
        </motion.div>
        
        <motion.div 
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <Button 
            size="lg" 
            className="group relative overflow-hidden"
            onClick={() => navigate("/contact")}
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-accent opacity-70 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center">
              Get in Touch
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Button>
          
          <Button 
            size="lg" 
            variant="outline"
            className="group border-primary/20 hover:bg-primary/10 flex gap-2 items-center backdrop-blur-sm"
            onClick={() => {
              const chatbotSection = document.getElementById('chatbot-section');
              if (chatbotSection) {
                chatbotSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <MessageSquare className="h-5 w-5 text-primary animate-pulse" />
            <span className="relative">Try My AI Assistant</span>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mt-10"
        >
          <Button
            variant="default"
            size="lg"
            asChild
            className="relative group overflow-hidden bg-primary hover:bg-primary"
          >
            <a href="mailto:tviejo12@gmail.com" className="flex items-center">
              <span className="absolute inset-0 w-0 bg-white/20 transition-all duration-300 ease-out group-hover:w-full"></span>
              <Mail className="mr-2" /> 
              <span className="relative">Contact Me</span>
            </a>
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            asChild
            className="group overflow-hidden backdrop-blur-sm border-primary/20"
          >
            <a href="https://github.com/tviejo" target="_blank" rel="noopener noreferrer" className="flex items-center">
              <span className="absolute inset-0 w-0 bg-primary/10 transition-all duration-300 ease-out group-hover:w-full"></span>
              <Github className="mr-2 transition-transform group-hover:scale-110" /> 
              <span className="relative">GitHub</span>
            </a>
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            asChild
            className="group overflow-hidden backdrop-blur-sm border-primary/20"
          >
            <a
              href="https://www.linkedin.com/in/thomas-viejo-9a213b195/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <span className="absolute inset-0 w-0 bg-primary/10 transition-all duration-300 ease-out group-hover:w-full"></span>
              <Linkedin className="mr-2 transition-transform group-hover:scale-110" /> 
              <span className="relative">LinkedIn</span>
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex items-center justify-center text-foreground/60 mt-8"
        >
          <MapPin className="w-4 h-4 mr-2" /> Paris, France
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex items-center justify-center text-foreground/60 mt-8"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="bg-primary/10 backdrop-blur-md rounded-full p-2"
          >
            <ChevronDown className="w-6 h-6 text-primary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
