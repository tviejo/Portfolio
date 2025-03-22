import { Building2, Calendar, ArrowRight, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import { EnhancedCard } from './ui/enhanced-card';
import { standardStyles } from '@/lib/theme-config';
import SectionAnimation from './ui/section-animation';
import DynamicBackground from './ui/dynamic-background';

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
  return (
    <SectionAnimation
      id="experience"
      className="py-20 relative overflow-hidden"
      variants={{
        initial: { opacity: 0 },
        animate: { opacity: 1 }
      }}
    >
      {/* Modern noise background */}
      <DynamicBackground type="noise" />
      
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute left-0 bottom-0 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
          >
            <Briefcase className="w-4 h-4" />
            <span>Career Journey</span>
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={standardStyles.sectionTitle}
          >
            Work Experience
          </motion.h2>
          
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '5rem' }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={standardStyles.sectionDivider}
          />
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/30 via-accent/20 to-primary/30 -ml-[1px] md:-ml-px hidden sm:block" />
          
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative md:flex items-start mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline dot */}
              <div className="hidden md:block absolute left-1/2 w-5 h-5 rounded-full bg-primary -ml-2.5 -mt-2 z-10" />
              
              {/* Experience Card */}
              <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                <EnhancedCard 
                  className="group hover:shadow-lg transition-all backdrop-blur-sm"
                  hover3d={index === 0}
                  gradient={index === 0}
                  glare={index !== 0}
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                        <Building2 className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{exp.title}</h3>
                        <div className="flex items-center text-sm text-foreground/70">
                          <span className="font-medium">{exp.company}</span>
                          <span className="mx-2">•</span>
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-foreground/70 bg-primary/5 px-3 py-2 rounded-full text-xs mb-4 inline-block">
                      <Calendar className="w-3 h-3 mr-2" />
                      {exp.period}
                    </div>
                    
                    <p className="text-foreground/80 mb-4 leading-relaxed">{exp.description}</p>
                    
                    <ul className="space-y-2">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start group/item">
                          <div className="bg-primary/10 rounded-full p-1 mt-0.5 mr-2 group-hover/item:bg-primary/20 transition-colors">
                            <ArrowRight className="w-3 h-3 text-primary" />
                          </div>
                          <span className="text-sm">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </EnhancedCard>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionAnimation>
  );
};

export default Experience;