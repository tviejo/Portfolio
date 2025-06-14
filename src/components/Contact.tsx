import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { EnhancedCard } from "./ui/enhanced-card";
import SectionAnimation from "./ui/section-animation";
import { 
  Mail, 
  Send, 
  MapPin, 
  Phone, 
  Linkedin,
  Github, 
  CheckCircle,
  Loader2
} from "lucide-react";
import { NeumorphicBackground } from "./ui/background-effects";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "@/lib/translations";

const Contact = () => {
  const { language } = useLanguage();
  const t = translations[language].contact;

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("https://formspree.io/f/mnnqywyk", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formState)
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi du message.");
      }

      setIsSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
    } catch (err) {
      setError("Erreur lors de l'envoi du message.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <SectionAnimation
      id="contact"
      className="py-16 relative overflow-hidden"
      variants={{
        initial: { opacity: 0 },
        animate: { opacity: 1 },
      }}
    >
      {/* Modern neumorphic background */}
      <NeumorphicBackground />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
        
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <EnhancedCard gradient className="overflow-hidden">
              {isSubmitted ? (
                <div className="p-6 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </motion.div>
                  <h3 className="text-lg font-bold mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    {t.messageSent}
                  </p>
                  <Button 
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    size="sm"
                  >
                    {t.sendAnotherMessage}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        {t.name}
                      </label>
                      <Input
                        id="name"
                        name="name"
                        placeholder={t.namePlaceholder}
                        required
                        value={formState.name}
                        onChange={handleChange}
                        className="bg-secondary/10 border-primary/10"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        {t.email}
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder={t.emailPlaceholder}
                        required
                        value={formState.email}
                        onChange={handleChange}
                        className="bg-secondary/10 border-primary/10"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        {t.message}
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder={t.messagePlaceholder}
                        required
                        rows={4}
                        value={formState.message}
                        onChange={handleChange}
                        className="bg-secondary/10 border-primary/10"
                      />
                    </div>
                  </div>
                  
                  {error && (
                    <div className="bg-destructive/10 text-destructive p-3 rounded-md mt-4 text-sm">
                      {error}
                    </div>
                  )}
                  
                  <Button
                    type="submit"
                    className="w-full mt-4"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t.sending}
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        {t.send}
                      </>
                    )}
                  </Button>
                </form>
              )}
            </EnhancedCard>
          </motion.div>
          
          {/* Contact Info */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <EnhancedCard>
                <div className="p-6 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Mail className="h-4 w-4 text-primary" />
                    </div>
                    <a 
                      href="mailto:tviejo12@gmail.com" 
                      className="text-primary hover:underline text-sm"
                    >
                      {t.emailAddress}
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-muted-foreground text-sm">{t.location}</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Phone className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-muted-foreground text-sm">{t.phone}</p>
                  </div>
                </div>
              </EnhancedCard>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <EnhancedCard>
                <div className="p-6">
                  <div className="flex justify-center gap-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      asChild
                      className="hover:bg-primary/10"
                    >
                      <a href="https://github.com/tviejo" target="_blank" rel="noopener noreferrer">
                        <Github className="h-5 w-5" />
                      </a>
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      asChild
                      className="hover:bg-primary/10"
                    >
                      <a
                        href="https://www.linkedin.com/in/thomas-viejo-9a213b195/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    </Button>
                  </div>
                </div>
              </EnhancedCard>
            </motion.div>
          </div>
        </div>
      </div>
    </SectionAnimation>
  );
};

export default Contact;
