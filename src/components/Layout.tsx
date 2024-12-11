import { useState } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Experience from './Experience';
import Education from './Education';
import Projects from './Projects';
import Contact from './Contact';
import ChatBot from './ChatBot';
import { Button } from './ui/button';
import { MessageCircle } from 'lucide-react';

const Layout = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Education />
        <Projects />
        <Contact />
      </main>

      {/* Floating Chat Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsChatOpen(!isChatOpen)}
          size="lg"
          className="rounded-full shadow-lg"
        >
          <MessageCircle className="mr-2" />
          Chat with AI Assistant
        </Button>
      </div>

      {/* Chat Modal */}
      {isChatOpen && (
        <div className="fixed bottom-20 right-4 z-50">
          <ChatBot onClose={() => setIsChatOpen(false)} />
        </div>
      )}
    </>
  );
};

export default Layout;