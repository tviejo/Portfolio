import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { Button } from './ui/button';
import { MessageCircle, X, Sparkles } from 'lucide-react';
import ChatBot from './ChatBot';
import { AnimatePresence, motion } from 'framer-motion';
import DynamicBackground from './ui/dynamic-background';
import { useLanguage } from '@/contexts/language-context';
import { translations } from '@/lib/translations';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { language } = useLanguage();
  const t = translations[language].chat;
  
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [_hasScrolled, setHasScrolled] = useState(false);
  const [showChatTip, setShowChatTip] = useState(false);

  // Add scroll detection and automatic chat tip
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setHasScrolled(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Show chat tip after 5 seconds if user hasn't engaged
    const tipTimeout = setTimeout(() => {
      if (!sessionStorage.getItem('chatTipShown')) {
        setShowChatTip(true);
        sessionStorage.setItem('chatTipShown', 'true');
      }
    }, 5000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(tipTimeout);
    };
  }, []);

  // Hide tip and open chat
  const handleOpenChat = () => {
    setShowChatTip(false);
    setIsChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Dynamic background that changes with theme */}
      <DynamicBackground type="gradient" />
      
      <main>{children}</main>

      {/* Floating Chat Button */}
      <AnimatePresence>
        {showChatTip && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-24 right-4 max-w-xs bg-background/90 backdrop-blur-md p-4 rounded-lg shadow-lg z-50 border border-primary/10"
          >
            <Button 
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => setShowChatTip(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <MessageCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-sm mb-1">{t.title}</h4>
                <p className="text-xs text-muted-foreground mb-3">
                  {t.description}
                </p>
                <Button 
                  size="sm" 
                  className="w-full text-xs bg-primary hover:bg-primary/90"
                  onClick={handleOpenChat}
                >
                  {t.startChat}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="fixed bottom-4 right-4 z-50"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          onClick={() => setIsChatOpen(!isChatOpen)}
          size="lg"
          className={`
            rounded-full shadow-lg group relative overflow-hidden
            ${isChatOpen ? 'bg-background border-primary/20' : 'bg-primary hover:bg-primary/90'}
          `}
        >
          {/* Animated background for the button */}
          {!isChatOpen && (
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-primary/80 to-accent/80"
              animate={{ 
                x: ['-100%', '100%'], 
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 3,
                ease: "linear" 
              }}
            />
          )}
          
          <motion.span 
            className="relative flex items-center gap-2"
            initial={false}
            animate={isChatOpen ? { x: 0 } : { x: 0 }}
          >
            {isChatOpen ? (
              <>
                <X className="mr-2 group-hover:rotate-90 transition-transform text-foreground" />
                <span className="text-foreground">{t.closeChat}</span>
              </>
            ) : (
              <>
                <MessageCircle className="mr-2 text-primary-foreground" />
                <span className="text-primary-foreground">{t.chatButton}</span>
                <Sparkles className="h-3 w-3 text-primary-foreground/70 animate-pulse" />
              </>
            )}
          </motion.span>
        </Button>
      </motion.div>

      {/* Chat Modal with AnimatePresence for smooth transitions */}
      <AnimatePresence>
        {isChatOpen && (
          <div className="fixed bottom-20 right-4 z-50">
            <ChatBot onClose={() => setIsChatOpen(false)} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Layout;