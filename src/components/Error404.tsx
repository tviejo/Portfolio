import { Mail, MapPin, Home} from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '@/lib/translations';

const Error404 = () => {
  const { language } = useLanguage();
  const t = translations[language].error404 || {
    title: "Page Not Found",
    description: "Oops! The page you're looking for can't be found.",
    goHome: "Go Home",
    contactSupport: "Contact Support",
    location: "Paris, France"
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/95 to-background" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col items-center justify-center space-y-8">
          {/* 404 Message */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration: 0.5 
            }}
            className="text-center"
          >
            <h1 className="text-8xl sm:text-9xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60">
              404
            </h1>
            <p className="text-xl sm:text-2xl text-foreground/80 mb-8 max-w-2xl mx-auto">
              {t.description}
            </p>
          </motion.div>

          {/* Navigation Buttons */}
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
              className="bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-all hover:scale-105"
            >
              <a href="/" className="flex flex-row items-center justify-center text-white">
                <Home className="mr-2 h-5 w-5" />
                {t.goHome}
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="hover:scale-105 transition-all border-primary/20 hover:border-primary/40"
            >
              <a href="mailto:tviejo12@gmail.com" className="flex flex-row items-center justify-center text-white">
                <Mail className="mr-2 h-5 w-5" />
                {t.contactSupport}
              </a>
            </Button>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex items-center text-foreground/60 mt-4"
          >
            <MapPin className="w-4 h-4 mr-2" />
            {t.location}
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="w-24 h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20 rounded-full" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Error404;
