import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Error404 from './components/Error404';
import Links from './components/Links';
import CV from './components/Cv';
import { fadeIn } from './lib/animations';

function App() {
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
              <Route path="/" element={<Layout />} />
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
