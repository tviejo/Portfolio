import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/language-context';
import { motion, AnimatePresence } from 'framer-motion';
import { Analytics } from "@vercel/analytics/react";
import Layout from './components/Layout';
import Error404 from './components/Error404';
import Links from './components/Links';
import CV from './components/Cv';
import { fadeIn } from './lib/animations';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import DocumentHead from './components/DocumentHead';
import MetaTags from './components/MetaTags';

// Modern, streamlined homepage layout
const HomePage = () => (
  <div className="relative">
    <Hero />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
      <About />
      <Experience />
      <Projects />
      <Education />
      <Contact />
    </div>
  </div>
);

function App() {
  // Add smooth scroll behavior and reset scroll position
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0); // Explicitly scroll to top on page load
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <DocumentHead />
        <MetaTags />
        <AnimatePresence mode="wait">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeIn}
            className="min-h-screen bg-background text-foreground antialiased"
          >
            <Analytics />
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
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
