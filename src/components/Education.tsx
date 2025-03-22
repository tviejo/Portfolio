import { motion } from "framer-motion";
import { GraduationCap, Calendar } from 'lucide-react';
import { EnhancedCard } from "./ui/enhanced-card";
import SectionAnimation from "./ui/section-animation";
import { standardStyles } from "@/lib/theme-config";
import DynamicBackground from "./ui/dynamic-background";

const education = [
  {
    school: '42 Paris',
    degree: 'Advanced Software Engineering Program',
    period: 'May 2024 - Present',
    description: 'Currently at level 11.44 in the advanced curriculum. Completed major projects such as webserv, ft_transcendence, and Inception, involving complex system programming, and web development. Skills acquired include C/C++, Unix systems, Docker ...',
  },
  {
    school: 'Université Paris-Saclay',
    degree: 'Certificate in the Master 2 LEAD (Law Entrepreneurship and Digital)',
    period: 'September 2024 - December 2024',
    description: 'Specialized in the legal, entrepreneurial, and digital aspects of technology-driven businesses. Key coursework included business law, intellectual property, digital transformation strategy, and startup management.',
  },
  {
    school: 'École de Technologie Supérieure de Montreal',
    degree: "Bachelor's in Automated Production (Incomplete)",
    period: 'September 2021 - September 2023',
    description: 'Focused on automated production systems, including electronic circuit design, and microcontroller programming. Developed practical skills in project management, quality control, industrial process automation, and technical leadership.',
  },
  {
    school: 'IUT Paul Sabatier',
    degree: 'DUT in Electrical Engineering and Industrial Computing',
    period: 'September 2019 - June 2021',
    description: 'Learned core engineering principles, including digital electronics, power systems, industrial control systems, and embedded system programming. Projects involved designing and building real-world automation prototypes.',
  },
  {
    school: 'Lycée Bourdelle',
    degree: 'Baccalauréat Scientifique (High School Diploma in Science)',
    period: 'Graduated June 2019',
  },
  {
    school: 'Liceo Franco-Mexicano',
    degree: 'Premiere S (Scientific Track)',
    period: 'September 2017 - June 2018',
    description: 'Completed foundational coursework in science and mathematics in an international environment while living in Mexico City, Mexico. Gained multicultural experience and improved my spanish.',
  },
];

const Education = () => {
  return (
    <SectionAnimation
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-muted/30"
      variants={{
        initial: { opacity: 0 },
        animate: { opacity: 1 },
      }}
    >
      {/* Modern waves background */}
      <DynamicBackground type="waves" />
      
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/3 top-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute right-1/3 bottom-1/3 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <GraduationCap className="h-4 w-4" />
            <span>Academic Background</span>
          </div>
          <h2 className={standardStyles.sectionTitle}>Education</h2>
          <div className={standardStyles.sectionDivider}></div>
        </motion.div>
        
        <div className="grid gap-6">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <EnhancedCard 
                className="group p-6 hover:shadow-lg transition-all duration-300"
                gradient={index === 0}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <GraduationCap className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">{edu.school}</h3>
                  </div>
                  <div className="flex items-center text-foreground/70 bg-secondary/30 backdrop-blur-sm px-3 py-1 rounded-full text-xs">
                    <Calendar className="w-3 h-3 mr-2" />
                    {edu.period}
                  </div>
                </div>
                <div className="ml-0 sm:ml-12">
                  <h4 className="text-lg font-medium mb-2 text-primary">{edu.degree}</h4>
                  {edu.description && (
                    <p className="text-foreground/80 leading-relaxed">{edu.description}</p>
                  )}
                </div>
              </EnhancedCard>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionAnimation>
  );
};

export default Education;