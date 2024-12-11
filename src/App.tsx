import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import { fadeIn } from './lib/animations';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AnimatePresence>
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeIn}
            className="min-h-screen bg-background text-foreground"
          >
            <Layout />
          </motion.div>
        </AnimatePresence>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;