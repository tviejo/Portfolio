import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { Button } from './ui/button';

const FloatingChatButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  // Only show button after scrolling down a bit
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 300) {
        setIsVisible(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Initial animation after 2 seconds
    const timeout = setTimeout(() => {
      setIsVisible(true);
      setHasAnimated(true);
    }, 2000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeout);
    };
  }, []);
  
  const handleClick = () => {
    const chatbotSection = document.getElementById('chatbot-section');
    if (chatbotSection) {
      chatbotSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed bottom-6 right-6 z-50"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ 
            opacity: 1, 
            scale: hasAnimated ? [1, 1.1, 1] : 1, 
            y: 0 
          }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ 
            duration: 0.5,
            scale: { duration: 0.3, repeat: hasAnimated ? 2 : 0, repeatType: 'reverse' }
          }}
        >
          <Button 
            onClick={handleClick}
            size="lg"
            className="rounded-full h-14 w-14 shadow-lg bg-primary hover:bg-primary/90 group"
          >
            <MessageSquare className="h-6 w-6 text-primary-foreground group-hover:scale-110 transition-transform" />
          </Button>
          
          {hasAnimated && !sessionStorage.getItem('chatButtonClicked') && (
            <motion.div 
              className="absolute -top-10 right-0 bg-background border border-border px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-sm">Try the AI assistant!</p>
              <div className="absolute -bottom-1 right-5 w-2 h-2 bg-background border-r border-b border-border rotate-45"></div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingChatButton;
