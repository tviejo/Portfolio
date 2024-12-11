import { Github, Linkedin, Mail, MapPin, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

const Hero = () => {

  return (
    <div className="min-h-screen relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/95 to-background" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="flex flex-col items-center justify-center space-y-8">
          {/* Profile Image */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-32 h-32 rounded-full border-4 border-primary/20 p-1"
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/80 to-primary/20" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60">
              {'Hello, I\'m Thomas Viejo'}
            </h1>
            <p className="text-xl sm:text-2xl text-foreground/80 mb-8 max-w-2xl mx-auto">
              {'Software Developer & Tech Enthusiast'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button
              variant="default"
              size="lg"
              asChild
              className="bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-opacity"
            >
              <a href="mailto:tviejo12@gmail.com">
                <Mail className="mr-2" /> Contact Me
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="hover:scale-105 transition-transform"
            >
              <a href="https://github.com/tviejo" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2" /> GitHub
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="hover:scale-105 transition-transform"
            >
              <a
                href="https://www.linkedin.com/in/thomas-viejo-9a213b195/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="mr-2" /> LinkedIn
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex items-center text-foreground/60 mt-4"
          >
            <MapPin className="w-4 h-4 mr-2" /> {'Paris, France'}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute bottom-8"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown className="w-6 h-6 text-foreground/60" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;