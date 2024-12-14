import { motion } from 'framer-motion';

function CV() {
  const pdfUrl = "/documents/Thomas-Viejo-CV.pdf";
  const websiteUrl = "https://www.thomas-viejo.fr";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative">
      <motion.a
        href={websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-4 right-8 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold text-lg rounded-full shadow-lg hover:from-blue-500 hover:to-blue-300 transition-transform hover:scale-105"
      >
        Visit My Website
      </motion.a>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold mb-8 text-white top-4"
      >
        My CV
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full max-w-6xl h-[85vh] p-4 border-4 border-blue-600 rounded-lg shadow-lg mb-8 bg-white relative z-0"
      >
        <iframe
          src={pdfUrl}
          title="Thomas Viejo CV"
          className="w-full h-full rounded-lg z-100"
        ></iframe>
      </motion.div>
    </div>
  );
}

export default CV;