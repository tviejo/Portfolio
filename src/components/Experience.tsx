import { Building2, Calendar, ArrowRight } from 'lucide-react';
import { Card } from './ui/card';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const experiences = [
  {
    title: 'Co-founder and CEO',
    company: 'VermR',
    location: 'Paris, France',
    period: 'September 2024 - Present',
    description: 'Leading a startup focused on enhancing access to art through AI-powered curation.',
    highlights: [
      'Developing and implementing AI-based art curation algorithms',
      'Managing a multidisciplinary team and driving strategic growth',
      'Presenting the company at major startup events such as HEC Startup Launchpad',
    ],
  },
  {
    title: 'Automation Technician',
    company: 'ASTEC',
    location: 'Saint-Bruno-de-Montarville, Quebec, Canada',
    period: 'May 2022 - January 2023',
    description: 'Built and tested industrial machinery for concrete production.',
    highlights: [
      'Created detailed electrical schematics, wiring diagrams, and assembly plans',
      'Managed production schedules, supplier relations, and quality control',
      'Supervised cabling and on-site assembly teams',
    ],
  },
  {
    title: 'Lead of External Relationships',
    company: 'Formule ETS Montréal',
    location: 'Montreal, Canada',
    period: 'September 2021 - September 2023',
    description: 'Led team communications and managed strategic partnerships.',
    highlights: [
      'Participated in Formula SAE and Formula Student competitions in North America and Europe',
      'Achieved 4th place worldwide out of 600 teams in 2023',
      'Secured partnerships with major companies like Tesla, Bombardier, and Multimatic',
      'Organized large-scale events including collaborations with Red Bull',
    ],
  },
  {
    title: 'Software Developer Intern (C#)',
    company: 'Univerza v Mariboru',
    location: 'Maribor, Slovenia',
    period: 'April 2021 - July 2021',
    description: 'Developed Windows Forms applications for energy consumption measurement of IoT devices.',
    highlights: [
      'Enabled the real-time monitoring of energy consumption for satellite transmitters',
      'Improved the efficiency of energy management systems',
      'Lowered energy costs by using battery instead of solar panels',
    ],
  },
  {
    title: 'Camera Operator',
    company: 'Courtiseurs Productions',
    location: 'Montauban, France',
    period: 'June 2018 - August 2021',
    description: 'Handled camera operations for various film and video projects.',
    highlights: [
      'Operated professional camera equipment',
      'Edited and produced promotional videos for local businesses',
    ],
  },
  {
    title: 'Art Salesman',
    company: 'Philippe Viejo Art',
    location: 'Global (Remote)',
    period: '2021 - Present',
    description: 'Managed art sales for exhibitions and online platforms.',
    highlights: [
      'Sold artworks at international art fairs and online',
      'Coordinated logistics and marketing for art exhibitions',
    ],
  },
];


const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="experience" className="py-20 relative">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background to-background/50" />

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
          Work Experience
        </motion.h2>

        <div className="grid gap-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow bg-card/50 backdrop-blur-sm">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h3 className="text-xl font-semibold">{exp.title}</h3>
                  <div className="flex items-center text-foreground/70">
                    <Calendar className="w-4 h-4 mr-2" />
                    {exp.period}
                  </div>
                </div>

                <div className="flex items-center text-foreground/70 mb-4">
                  <Building2 className="w-4 h-4 mr-2" />
                  {exp.company} • {exp.location}
                </div>

                <p className="text-foreground/80 mb-4">{exp.description}</p>

                <ul className="space-y-2">
                  {exp.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start">
                      <ArrowRight className="w-4 h-4 mr-2 mt-1 text-primary" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;