import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Error404 from './components/Error404';
import Links from './components/Links';
import CV from './components/Cv';
import { fadeIn } from './lib/animations';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import ChatBot from './components/ChatBot';
import Contact from './components/Contact';
import Education from './components/Education';

// Component that combines all the main page sections
const HomePage = () => (
  <>
    <Hero />
    <About />
    <Experience />
    <Education />
    <Projects />
    <ChatBot />
    <Contact />
  </>
);

function App() {
  // Add smooth scroll behavior
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
  }, []);

  return (
    <ThemeProvider>
      <AnimatePresence>
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="min-h-screen bg-background text-foreground"
        >
          <Router>
            <Routes>
              <Route path="/" element={<Layout><HomePage /></Layout>} />
              <Route path="/links" element={<Links />} />
              <Route path="/cv" element={<CV />} />
              <Route path="*" element={<Error404 />} />
            </Routes>
          </Router>
        </motion.div>
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default App;
