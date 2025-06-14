import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import { Bot, Send, User, Loader2, Sparkles, X, BrainCircuit, StopCircle } from "lucide-react";
import SectionAnimation from "./ui/section-animation";
import { standardStyles } from "@/lib/theme-config";
import { ModernGrid } from "./ui/background-effects";
import ReactMarkdown from 'react-markdown';
import { useLanguage } from "@/contexts/language-context";
import { translations } from "@/lib/translations";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  id?: string;
}

interface ChatBotProps {
  onClose?: () => void;
}

const ChatBot = ({ onClose }: ChatBotProps) => {
  const { language } = useLanguage();
  const t = translations[language].chat;
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [typingEffect, setTypingEffect] = useState(false);
  const [currentResponse, setCurrentResponse] = useState("");
  const [fullResponse, setFullResponse] = useState("");
  const [hasStartedChat, setHasStartedChat] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Update welcome message when language changes
  useEffect(() => {
    if (!hasStartedChat) {
      setMessages([{ 
        role: 'assistant', 
        content: t.welcome.description
      }]);
    }
  }, [language, t.welcome.description, hasStartedChat]);

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
      }, 3);
      
      return () => clearInterval(typing);
    }
  }, [typingEffect, fullResponse]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    if (!hasStartedChat) {
      setHasStartedChat(true);
    }
    
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput('');
    setIsLoading(true);
    setIsStreaming(true);
    
    // Create new AbortController for this request
    abortControllerRef.current = new AbortController();
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: input }]
        }),
        signal: abortControllerRef.current.signal
      });

      if (!response.ok) {
        throw new Error('Failed to get response from AI');
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader available');

      let accumulatedResponse = '';
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = new TextDecoder().decode(value);
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') {
              setIsStreaming(false);
              setIsLoading(false);
              setMessages(prev => [...prev.slice(0, -1), { 
                role: 'assistant', 
                content: accumulatedResponse
              }]);
              return;
            }
            
            try {
              const parsed = JSON.parse(data);
              const content = parsed.content;
              if (content) {
                accumulatedResponse += content;
                setCurrentResponse(accumulatedResponse);
              }
            } catch (e) {
              console.error('Error parsing chunk:', e);
            }
          }
        }
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log('Request was aborted');
        setMessages(prev => [...prev.slice(0, -1), { 
          role: 'assistant', 
          content: currentResponse || "Response interrupted."
        }]);
      } else {
        console.error('Error:', error);
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: "I apologize, but I'm having trouble connecting right now. Please try again later."
        }]);
      }
    } finally {
      setIsStreaming(false);
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleInterrupt = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsStreaming(false);
      setIsLoading(false);
    }
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
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
      >
        <Card className="w-full max-w-2xl h-[80vh] shadow-xl border-primary/10 overflow-hidden backdrop-blur-sm bg-background/95 flex flex-col">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 py-3 px-4 flex flex-row items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Bot className="h-5 w-5 text-primary" />
                <motion.span 
                  className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-green-500"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </div>
              <CardTitle className="text-base">{t.assistant.title}</CardTitle>
              <Sparkles className="h-3 w-3 text-yellow-500 animate-pulse" />
            </div>
            {onClose && (
              <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </CardHeader>
          
          <CardContent className={`p-3 flex-1 overflow-y-auto bg-gradient-to-b from-secondary/5 to-background/20 ${hasStartedChat ? '' : 'flex items-center justify-center'}`}>
            {!hasStartedChat ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-md mx-auto"
              >
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Bot className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t.welcome.title}</h3>
                <p className="text-muted-foreground mb-6">
                  {t.welcome.description}
                </p>
                <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
                  <div className="flex gap-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={t.welcome.placeholder}
                      className="flex-1 bg-secondary/10 border-primary/20 focus-visible:ring-primary/30"
                      disabled={isLoading || typingEffect}
                    />
                    <Button 
                      type="submit" 
                      disabled={isLoading || !input.trim() || typingEffect}
                      className="bg-primary/90 hover:bg-primary transition-colors"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <div className="space-y-3 pb-4">
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
                        p-3 rounded-lg max-w-[85%] text-sm
                        ${message.role === 'user' 
                          ? 'bg-primary text-primary-foreground rounded-tr-none' 
                          : 'bg-secondary/30 backdrop-blur-sm rounded-tl-none'}
                      `}>
                        {message.role === 'assistant' ? (
                          <div className="prose prose-sm dark:prose-invert max-w-none">
                            <ReactMarkdown>
                              {i === messages.length - 1 && typingEffect 
                                ? currentResponse || "..." 
                                : message.content}
                            </ReactMarkdown>
                          </div>
                        ) : (
                          <p>
                            {message.content}
                          </p>
                        )}
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
                        <span className="text-xs">{t.assistant.thinking}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            )}
          </CardContent>
          
          {hasStartedChat && (
            <CardFooter className="p-2 border-t bg-background/80 backdrop-blur-md shrink-0">
              <form onSubmit={handleSubmit} className="w-full flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t.welcome.placeholder}
                  className="flex-1 h-8 text-sm bg-transparent border-primary/20 focus-visible:ring-primary/30"
                  disabled={isLoading || typingEffect}
                />
                {isStreaming ? (
                  <Button 
                    type="button"
                    onClick={handleInterrupt}
                    className="bg-destructive hover:bg-destructive/90 transition-colors"
                  >
                    <StopCircle className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button 
                    type="submit" 
                    disabled={isLoading || !input.trim() || typingEffect}
                    className="bg-primary hover:bg-primary/90 transition-colors group"
                  >
                    <Send className="h-3 w-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Button>
                )}
              </form>
            </CardFooter>
          )}
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
        className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden min-h-screen"
      >
        {/* Modern grid background */}
        <ModernGrid />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
            >
              <BrainCircuit className="h-4 w-4" />
              <span>{t.poweredBy}</span>
            </motion.div>
            
            <motion.h2 
              className={standardStyles.sectionTitle}
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              {t.chatTitle}
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
              {t.chatDescription}
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
            className="h-[70vh]"
          >
            <Card className="w-full h-full shadow-xl border-primary/10 overflow-hidden bg-background/80 backdrop-blur-sm flex flex-col">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-sm shrink-0">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <span>{t.assistant.title}</span>
                      <Sparkles className="h-4 w-4 text-yellow-500 ml-1 animate-pulse" />
                    </CardTitle>
                    <CardDescription>
                      {t.assistant.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className={`p-4 flex-1 overflow-y-auto bg-gradient-to-b from-background/50 to-secondary/5 ${hasStartedChat ? '' : 'flex items-center justify-center'}`}>
                {!hasStartedChat ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-md mx-auto"
                  >
                    <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                      <Bot className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-3">{t.welcome.title}</h3>
                    <p className="text-muted-foreground mb-8 text-lg">
                      {t.welcome.description}
                    </p>
                    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
                      <div className="flex gap-2">
                        <Input
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          placeholder={t.welcome.placeholder}
                          className="flex-1 bg-secondary/10 border-primary/20 focus-visible:ring-primary/30"
                          disabled={isLoading || typingEffect}
                        />
                        <Button 
                          type="submit" 
                          disabled={isLoading || !input.trim() || typingEffect}
                          className="bg-primary/90 hover:bg-primary transition-colors"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </form>
                  </motion.div>
                ) : (
                  <div className="space-y-4 pb-4">
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
                            p-3 rounded-lg max-w-[85%] 
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
                            {message.role === 'assistant' ? (
                              <div className="prose prose-sm dark:prose-invert max-w-none">
                                <ReactMarkdown>
                                  {i === messages.length - 1 && typingEffect 
                                    ? currentResponse || "..." 
                                    : message.content}
                                </ReactMarkdown>
                              </div>
                            ) : (
                              <p>{message.content}</p>
                            )}
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
                )}
              </CardContent>
              
              {hasStartedChat && (
                <CardFooter className="p-3 border-t bg-background/60 backdrop-blur-md shrink-0">
                  <form onSubmit={handleSubmit} className="w-full flex gap-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={t.welcome.placeholder}
                      className="flex-1 bg-secondary/10 border-primary/20 focus-visible:ring-primary/30"
                      disabled={isLoading || typingEffect}
                    />
                    {isStreaming ? (
                      <Button 
                        type="button"
                        onClick={handleInterrupt}
                        className="bg-destructive hover:bg-destructive/90 transition-colors"
                      >
                        <StopCircle className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button 
                        type="submit" 
                        disabled={isLoading || !input.trim() || typingEffect}
                        className="bg-primary hover:bg-primary/90 transition-colors group"
                      >
                        <Send className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </Button>
                    )}
                  </form>
                </CardFooter>
              )}
            </Card>
          </motion.div>
        </div>
      </SectionAnimation>
    );
  }
};

export default ChatBot;
