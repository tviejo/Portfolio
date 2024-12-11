import { ThemeProvider } from './contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
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
        <Layout />
        </motion.div>
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default App;