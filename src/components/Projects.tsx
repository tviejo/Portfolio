import { Card } from './ui/card';
import {  Globe, Gamepad, Server, Code} from 'lucide-react';

const projects = [
  {
    title: 'Documenting a Journey from Argentina to Alaska',
    description: 'Traveled across the Americas in a motorhome, capturing cultural stories and breathtaking landscapes through photography and videography.',
    icon: Globe,
  },
  {
    title: 'Cub3D - 3D Game Engine Development',
    description: 'Developed a 3D game engine using C and the MiniLibX graphics library. Implemented raycasting, texture mapping, sprite rendering, and player navigation for a fully interactive 3D experience.',
    icon: Gamepad,
  },
  {
    title: 'Webserv - Custom Web Server',
    description: 'Created a custom HTTP web server in C++. Implemented CGI processing, and error management.',
    icon: Server,
  },
  {
    title: 'C# Multimeter Application',
    description: 'Designed and developed a Windows Forms application in C# to measure real-time energy consumption of IoT satellite transmitters during an internship in Slovenia.',
    icon: Code,
  },
];


const Projects = () => {
  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8">Notable Projects</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center mb-4">
                <project.icon className="w-8 h-8 mr-3" />
                <h3 className="text-xl font-semibold">{project.title}</h3>
              </div>
              <p className="text-foreground/80">{project.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;