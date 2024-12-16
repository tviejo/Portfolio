import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card } from './ui/card';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const skills = [
  'C/C++/C#',
  'Javascript/Typescript',
  'VHDL',
  'Grafcet',
  'Ladder',
  'Docker',
  'Electronic Circuit Design',
  'Microcontroller Programming',
  'FPGA Programming',
  'Embedded Systems Development',
  'System Programming (Unix/Linux)',
  'Project Management',
  'Team Leadership',
  'Startup Development',
  'Business Strategy',
  'Technical Documentation',
  'AI & Machine Learning Concepts',
  'Networking & Security Fundamentals',
];


const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="py-20 relative bg-muted/50">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/50 to-background" />

      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="initial"
        animate={inView ? "animate" : "initial"}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60"
        >
          About Me
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
        <motion.div variants={fadeInUp}>
          <Card className="p-6 h-full bg-card/50 backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-4">Background</h3>
            <p className="text-foreground/80 mb-4">
              I am a passionate and versatile software developer with expertise in programming languages such as C, C++, C#, JavaScript, VHDL, and Grafcet, complemented by strong project management skills. My international experience in IoT, automation, web development, and systems, along with entrepreneurial ventures like VermR, enable me to excel in complex and innovative environments.
            </p>
            <p className="text-foreground/80 mb-4">
              My dedication to technology and innovation has driven me to undertake challenging projects, enhancing my skills in system programming, networking, and application development.
            </p>
            <p className="text-foreground/80">
              Currently, I am advancing my expertise at 42 Paris while pursuing a certificate in the Master 2 LEAD (Law, Entrepreneurship, And Digital) at Université Paris-Saclay. This diverse background allows me to approach problems from both technical and strategic perspectives, ensuring the delivery of high-quality solutions tailored to each project's unique needs.
            </p>
          </Card>
        </motion.div>
        
          <motion.div variants={fadeInUp}>
            <Card className="p-6 h-full bg-card/50 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4">Technical Skills</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    variants={fadeInUp}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-center p-2 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors text-center text-sm"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;