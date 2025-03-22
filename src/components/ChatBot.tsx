import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import { Bot, Send, User, Loader2, Sparkles, X, BrainCircuit } from "lucide-react";
import SectionAnimation from "./ui/section-animation";
import { standardStyles } from "@/lib/theme-config";
import { ModernGrid } from "./ui/background-effects";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  id?: string;
}

interface ChatBotProps {
  onClose?: () => void;
}

const ChatBot = ({ onClose }: ChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: 'Hi there! I\'m an AI assistant. Ask me anything about this portfolio or skills!'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [typingEffect, setTypingEffect] = useState(false);
  const [currentResponse, setCurrentResponse] = useState("");
  const [fullResponse, setFullResponse] = useState("");

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, currentResponse]);

  // Typing effect
  useEffect(() => {
    if (typingEffect && fullResponse) {
      let i = 0;
      const typing = setInterval(() => {
        setCurrentResponse(fullResponse.substring(0, i));
        i++;
        if (i > fullResponse.length) {
          clearInterval(typing);
          setTypingEffect(false);
          
          // Add the completed message to the messages array
          setMessages(prev => [...prev.slice(0, -1), { 
            role: 'assistant', 
            content: fullResponse
          }]);
          setFullResponse("");
          setCurrentResponse("");
        }
      }, 20);
      
      return () => clearInterval(typing);
    }
  }, [typingEffect, fullResponse]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput('');
    setIsLoading(true);
    
    // Simulate API call - replace with your actual API integration
    setTimeout(() => {
      const response = `Thanks for your message! This is a demo response. In the real implementation, this would be connected to an AI service.`;
      setFullResponse(response);
      setIsLoading(false);
      setTypingEffect(true);
      
      // Add a placeholder for the assistant's response
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "..." // This will be replaced when typing finishes
      }]);
    }, 1000);
  };

  // Determine if this is being rendered as a modal or a section
  const isModal = onClose !== undefined;

  // If it's a modal, render a compact version
  if (isModal) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 10 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <Card className="w-80 sm:w-96 shadow-xl border-primary/10 overflow-hidden backdrop-blur-sm bg-background/95">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 py-3 px-4 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Bot className="h-5 w-5 text-primary" />
                <motion.span 
                  className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-green-500"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </div>
              <CardTitle className="text-base">AI Assistant</CardTitle>
              <Sparkles className="h-3 w-3 text-yellow-500 animate-pulse" />
            </div>
            {onClose && (
              <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </CardHeader>
          
          <CardContent className="p-3 h-[300px] overflow-y-auto bg-gradient-to-b from-secondary/5 to-background/20">
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {messages.map((message, i) => (
                  <motion.div
                    layout
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`
                      p-2 rounded-lg max-w-[80%] text-sm
                      ${message.role === 'user' 
                        ? 'bg-primary text-primary-foreground rounded-tr-none' 
                        : 'bg-secondary/30 backdrop-blur-sm rounded-tl-none'}
                    `}>
                      <p>
                        {i === messages.length - 1 && message.role === 'assistant' && typingEffect 
                          ? currentResponse || "..." 
                          : message.content}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-secondary/30 backdrop-blur-sm p-2 rounded-lg rounded-tl-none max-w-[80%] text-sm">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-3 w-3 animate-spin text-primary" />
                      <span className="text-xs">AI is thinking...</span>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          
          <CardFooter className="p-2 border-t bg-background/80 backdrop-blur-md">
            <form onSubmit={handleSubmit} className="w-full flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 h-8 text-sm bg-transparent border-primary/20 focus-visible:ring-primary/30"
                disabled={isLoading || typingEffect}
              />
              <Button 
                type="submit" 
                size="sm" 
                disabled={isLoading || !input.trim() || typingEffect}
                className="bg-primary/90 hover:bg-primary transition-colors"
              >
                <Send className="h-3 w-3" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      </motion.div>
    );
  }

  // For the section version (non-modal), render the original full-sized component with enhancements
  if (!isModal) {
    return (
      <SectionAnimation
        variants={{
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 }
        }}
        id="chatbot-section"
        className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      >
        {/* Modern grid background */}
        <ModernGrid />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
            >
              <BrainCircuit className="h-4 w-4" />
              <span>Powered by AI</span>
            </motion.div>
            
            <motion.h2 
              className={standardStyles.sectionTitle}
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Chat with My AI Assistant
            </motion.h2>
            
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '5rem' }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6 rounded-full"
            />
            
            <motion.p 
              className="text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Have questions about my experience, projects, or skills? My AI assistant can help answer them in real-time!
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Card className="w-full max-w-2xl mx-auto shadow-xl border-primary/10 overflow-hidden bg-background/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <span>AI Assistant</span>
                      <Sparkles className="h-4 w-4 text-yellow-500 ml-1 animate-pulse" />
                    </CardTitle>
                    <CardDescription>
                      Ask me anything about this portfolio
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-4 h-[350px] overflow-y-auto bg-gradient-to-b from-background/50 to-secondary/5">
                <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {messages.map((message, i) => (
                      <motion.div
                        layout
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        {message.role === 'assistant' && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2 }}
                            className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2 self-end"
                          >
                            <Bot className="h-4 w-4 text-primary" />
                          </motion.div>
                        )}
                        
                        <div className={`
                          p-3 rounded-lg max-w-[80%] 
                          ${message.role === 'user' 
                            ? 'bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-tr-none shadow-lg' 
                            : 'bg-secondary/30 backdrop-blur-sm rounded-tl-none shadow'}
                        `}>
                          <div className="flex items-center gap-2 mb-1">
                            {message.role === 'user' && (
                              <>
                                <User className="h-4 w-4" />
                                <span className="text-xs font-medium">You</span>
                              </>
                            )}
                          </div>
                          <p>
                            {i === messages.length - 1 && message.role === 'assistant' && typingEffect 
                              ? currentResponse || "..." 
                              : message.content}
                          </p>
                        </div>
                        
                        {message.role === 'user' && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2 }}
                            className="h-8 w-8 rounded-full bg-primary flex items-center justify-center ml-2 self-end"
                          >
                            <User className="h-4 w-4 text-primary-foreground" />
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {isLoading && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start items-end gap-2"
                    >
                      <motion.div 
                        className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        <Bot className="h-4 w-4 text-primary" />
                      </motion.div>
                      
                      <div className="bg-secondary/30 backdrop-blur-sm p-3 rounded-lg rounded-tl-none max-w-[80%]">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            <motion.span
                              className="h-2 w-2 rounded-full bg-primary"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                            />
                            <motion.span
                              className="h-2 w-2 rounded-full bg-primary"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                            />
                            <motion.span
                              className="h-2 w-2 rounded-full bg-primary"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>
              
              <CardFooter className="p-3 border-t bg-background/60 backdrop-blur-md">
                <form onSubmit={handleSubmit} className="w-full flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything..."
                    className="flex-1 bg-secondary/10 border-primary/20 focus-visible:ring-primary/30"
                    disabled={isLoading || typingEffect}
                  />
                  <Button 
                    type="submit" 
                    disabled={isLoading || !input.trim() || typingEffect}
                    className="bg-primary hover:bg-primary/90 transition-colors group"
                  >
                    <Send className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </SectionAnimation>
    );
  }

  // ...existing code...
};

export default ChatBot;
