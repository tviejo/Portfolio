import { motion } from 'framer-motion';

interface Link {
  label: string;
  url: string;
}

function Links() {
  const links: Link[] = [
    { label: "My Website", url: "https://www.thomas-viejo.fr" },
    { label: "My CV", url: "https://www.thomasviejo.fr/cv" },
    { label: "Email", url: "mailto:tviejo12@gmail.com" },
    { label: "Phone Number", url: "tel:+33624433321" },
    { label: "My Father's Art Website", url: "https://www.philippeviejo.com" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <motion.img
        src="/images/thomas.jpg"
        alt="Thomas Viejo"
        className="w-32 h-32 rounded-full mb-6 object-cover border-4 border-primary shadow-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      />

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80"
      >
        Useful Links
      </motion.h1>

      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-6"
      >
        {links.map((link, index) => (
          <motion.li
            key={index}
            className="text-xl font-medium text-foreground hover:underline transition-transform hover:scale-105"
          >
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}

export default Links;
