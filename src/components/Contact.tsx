import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { EnhancedCard } from "./ui/enhanced-card";
import SectionAnimation from "./ui/section-animation";
import { standardStyles } from "@/lib/theme-config";
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

const Contact = () => {
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
    
    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <SectionAnimation
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      variants={{
        initial: { opacity: 0 },
        animate: { opacity: 1 },
      }}
    >
      {/* Modern neumorphic background */}
      <NeumorphicBackground />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Mail className="h-4 w-4" />
            <span>Get In Touch</span>
          </div>
          <h2 className={standardStyles.sectionTitle}>Contact Me</h2>
          <div className={standardStyles.sectionDivider}></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </motion.div>
        
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
                <div className="p-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle className="h-8 w-8 text-primary" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground mb-6">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                  <Button 
                    onClick={() => setIsSubmitted(false)}
                    className="group"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6">
                  <h3 className="text-xl font-bold mb-6">Send Me a Message</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        required
                        value={formState.name}
                        onChange={handleChange}
                        className="bg-secondary/10 border-primary/10 focus-visible:ring-primary/30"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        className="bg-secondary/10 border-primary/10 focus-visible:ring-primary/30"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1">
                        Your Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Your message here..."
                        required
                        rows={5}
                        value={formState.message}
                        onChange={handleChange}
                        className="bg-secondary/10 border-primary/10 focus-visible:ring-primary/30"
                      />
                    </div>
                  </div>
                  
                  {error && (
                    <div className="bg-destructive/10 text-destructive p-3 rounded-md mb-4 text-sm">
                      {error}
                    </div>
                  )}
                  
                  <Button
                    type="submit"
                    className="w-full group"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </EnhancedCard>
          </motion.div>
          
          {/* Contact Info */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <EnhancedCard className="group hover:shadow-md transition-all">
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="mt-1 bg-primary/10 p-3 rounded-full">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Email</h3>
                      <a 
                        href="mailto:tviejo12@gmail.com" 
                        className="text-primary hover:underline"
                      >
                        tviejo12@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 mb-6">
                    <div className="mt-1 bg-primary/10 p-3 rounded-full">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Location</h3>
                      <p className="text-muted-foreground">Paris, France</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="mt-1 bg-primary/10 p-3 rounded-full">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Phone</h3>
                      <p className="text-muted-foreground">(+33) 1234 56789</p>
                    </div>
                  </div>
                </div>
              </EnhancedCard>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <EnhancedCard>
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-4">Connect With Me</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <motion.a 
                      href="https://github.com/tviejo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-2 p-4 rounded-lg bg-secondary/20 hover:bg-primary/10 transition-colors"
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Github className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-sm">GitHub</span>
                    </motion.a>
                    
                    <motion.a 
                      href="https://www.linkedin.com/in/thomas-viejo-9a213b195/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-2 p-4 rounded-lg bg-secondary/20 hover:bg-primary/10 transition-colors"
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Linkedin className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-sm">LinkedIn</span>
                    </motion.a>
                  </div>
                </div>
              </EnhancedCard>
            </motion.div>
          </div>
        </div>
        
        {/* Add a footer section with copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 text-center text-sm text-muted-foreground"
        >
          <p>© {new Date().getFullYear()} Thomas Viejo. All rights reserved.</p>
        </motion.div>
      </div>
    </SectionAnimation>
  );
};

export default Contact;
