import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme && storedTheme !== theme) {
      toggleTheme();
    } else if (!storedTheme) {
      localStorage.setItem('theme', 'dark');
    }
  }, [theme, toggleTheme]);

  const handleToggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    toggleTheme();
  };

  const menuItems = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Education', href: '#education' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full bg-background/80 backdrop-blur-sm z-50 border-b shadow-lg"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="#" className="text-2xl font-bold tracking-wide">
            Thomas Viejo
          </a>

          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ))}

            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggleTheme}
              className={`hover:bg-primary/5 p-1 rounded-full ${theme === 'light' ? 'text-white' : ''}`}
            >
              {theme === 'light' ? (
                <Sun className="h-5 w-5 text-white" />
              ) : (
                <Moon className="h-5 w-5 text-blue-500" />
              )}
            </Button>
          </div>

          <div className="md:hidden flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggleTheme}
              className={`hover:bg-primary/5 p-1 rounded-full ${theme === 'light' ? 'text-white' : ''}`}
            >
              {theme === 'light' ? (
                <Sun className="h-5 w-5 text-white" />
              ) : (
                <Moon className="h-5 w-5 text-blue-500" />
              )}
            </Button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`text-foreground/80 hover:text-foreground transition-colors focus:outline-none text-xl ${theme === 'light' ? 'text-white' : ''}`}
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-16 left-0 w-full bg-background shadow-lg border-t"
          >
            <div className="px-4 pt-2 pb-3 space-y-1 sm:px-6">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block px-3 py-2 text-foreground/80 hover:text-foreground transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
