import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      if (storedTheme !== theme) {
        toggleTheme();
      }
    } else {
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
      className="fixed top-0 w-full bg-background/80 backdrop-blur-sm z-50 border-b"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="#" className="text-2xl font-bold">
              Thomas Viejo
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-8">
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
              size="icon"
              onClick={handleToggleTheme}
              className="hover:bg-primary/10 p-2 rounded-full"
            >
              {theme === 'light' ? (
                <Sun className="h-6 w-6 text-yellow-500" />
              ) : (
                <Moon className="h-6 w-6 text-blue-500" />
              )}
            </Button>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggleTheme}
              className="hover:bg-primary/10 p-2 rounded-full"
            >
              {theme === 'light' ? (
                <Sun className="h-6 w-6 text-yellow-500" />
              ) : (
                <Moon className="h-6 w-6 text-blue-500" />
              )}
            </Button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground/80 hover:text-foreground transition-colors focus:outline-none"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-16 left-0 w-full bg-background"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
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
    </motion.nav>
  );
};

export default Navbar;
