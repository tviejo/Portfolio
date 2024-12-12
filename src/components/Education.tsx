import { GraduationCap, Calendar } from 'lucide-react';
import { Card } from './ui/card';

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
    <section id="education" className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8">Education</h2>
        <div className="grid gap-6">
          {education.map((edu, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center mb-2">
                <GraduationCap className="w-6 h-6 mr-2" />
                <h3 className="text-xl font-semibold">{edu.school}</h3>
              </div>
              <div className="flex items-center text-foreground/70 mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                {edu.period}
              </div>
              <h4 className="text-lg font-medium mb-2">{edu.degree}</h4>
              <p className="text-foreground/80">{edu.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;