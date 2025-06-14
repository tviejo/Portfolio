export const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      experience: "Experience",
      projects: "Projects",
      education: "Education",
      contact: "Contact"
    },
    hero: {
      greeting: "Hi, I'm Thomas Viejo",
      title: "Software Developer & Automation Specialist",
      location: "Paris, France",
      description: "Passionate about creating innovative solutions and automating complex processes.",
      getInTouch: "Get in Touch",
      viewProjects: "View Projects"
    },
    about: {
      title: "About Me",
      description1: "I'm a passionate software developer and automation specialist with experience in various technologies and industries. My journey has taken me from developing Windows applications to managing automation projects and exploring entrepreneurial ventures.",
      description2: "Currently at 42 Paris, I am expanding my expertise with an Intership at GTT as a Software Development Engineer Intern. My diverse background in electrical engineering, industrial computing, and software development allows me to approach problems from multiple angles.",
      skills: "Technical Skills",
      skillCategories: {
        coreLanguages: "Core Languages",
        toolsPlatforms: "Tools & Platforms",
        technicalExpertise: "Technical Expertise",
        leadership: "Leadership",
        emergingTech: "Emerging Tech"
      }
    },
    experience: {
      title: "Experience",
      current: "Current",
      previous: "Previous",
      skills: "Skills & Technologies",
      responsibilities: "Key Responsibilities",
      experiences: {
        vermr: {
          title: "Co-founder and CEO",
          company: "VermR",
          location: "Paris, France",
          period: "September 2024 - Present",
          description: "Leading a startup focused on enhancing access to art through AI-powered curation.",
          highlights: [
            "Developing AI-based art curation algorithms",
            "Managing multidisciplinary team and strategic growth",
            "Presenting at major startup events"
          ]
        },
        gtt: {
          title: "Software Development Engineer Intern",
          company: "GTT",
          location: "Saint-Rémy-lès-Chevreuse, France",
          period: "February 2025 - August 2025",
          description: "Contributed to software development projects for maritime LNG containment systems.",
          highlights: [
            "Developed a Python application for automatic nesting of panels for on-shore ammonia storage tanks (50–100 m diameter), featuring a PyQt GUI",
            "Implemented advanced geometric algorithms with NumPy and designed an SQL-backed parts management system",
            "Automated BOM and drawing generation via VBA for SolidWorks, plus Python scripts for FreeCAD and ezdxf",
            "Created optimized placement routines for complex-geometry panels and membranes, with automatic export of deliverables for manufacturers and site teams",
            "Collaborated with design and production engineers to formalize business rules and technical requirements"
          ]
        },
        astec: {
          title: "Automation Technician",
          company: "ASTEC",
          location: "Quebec, Canada",
          period: "May 2022 - January 2023",
          description: "Built and tested industrial machinery for concrete production.",
          highlights: [
            "Created electrical schematics and assembly plans",
            "Managed production and quality control",
            "Supervised assembly teams"
          ]
        },
        formule: {
          title: "Lead of External Relationships",
          company: "Formule ETS Montréal",
          location: "Montreal, Canada",
          period: "September 2021 - September 2023",
          description: "Led team communications and managed strategic partnerships.",
          highlights: [
            "Achieved 4th place worldwide in Formula Student 2023",
            "Secured partnerships with Tesla and Bombardier",
            "Organized large-scale events with Red Bull"
          ]
        },
        univerza: {
          title: "Software Developer Intern",
          company: "Univerza v Mariboru",
          location: "Maribor, Slovenia",
          period: "April 2021 - July 2021",
          description: "Developed Windows Forms applications for IoT energy monitoring.",
          highlights: [
            "Implemented real-time energy monitoring",
            "Improved energy management systems",
            "Reduced costs through battery optimization"
          ]
        }
      }
    },
    projects: {
      title: "Projects",
      viewProject: "View Project",
      viewCode: "View Code",
      technologies: "Technologies",
      description: "Description",
      projects: {
        cub3d: {
          title: "Cub3D - 3D Game Engine",
          description: "Developed a 3D game engine using C and MiniLibX, featuring raycasting, texture mapping, and sprite rendering.",
          tags: ["C", "Graphics", "Game Development"]
        },
        webserv: {
          title: "Webserv - HTTP Server",
          description: "Built a custom HTTP web server in C++ with CGI processing and comprehensive error management.",
          tags: ["C++", "Networking", "System Programming"]
        },
        iot: {
          title: "IoT Energy Monitor",
          description: "Created a Windows Forms application for real-time energy consumption monitoring of IoT devices.",
          tags: ["C#", "IoT", "Windows Forms"]
        },
        ai: {
          title: "AI & Security Projects",
          description: "Participated in DGSE and OpenAI hackathons, focusing on cybersecurity and AI solutions.",
          tags: ["AI", "Security", "Hackathon"]
        }
      }
    },
    education: {
      title: "Education",
      current: "Current",
      previous: "Previous",
      degree: "Degree",
      field: "Field of Study",
      location: "Location",
      date: "Date",
      entries: {
        "42": {
          school: "42 Paris",
          degree: "Architect in Digital Technology",
          period: "May 2024 - Present",
          description: "Legal and strategic perspectives of digital technology, with a focus on startup creation."
        },
        "saclay": {
          school: "Université Paris-Saclay",
          degree: "Master 2 LEAD (Law, Entrepreneurship & Digital) Certificate",
          period: "September 2024 - December 2024",
          description: "Specialized in the legal, entrepreneurial, and digital aspects of technology-driven businesses. Key coursework included business law, intellectual property, digital transformation strategy, and startup management."
        },
        "ets": {
          school: "École de Technologie Supérieure de Montréal",
          degree: "Bachelor's in Automated Production (Incomplete)",
          period: "September 2021 - September 2023",
          description: "Focused on automated production systems, including electronic circuit design, and microcontroller programming. Developed practical skills in project management, quality control, industrial process automation, and technical leadership."
        },
        "iut": {
          school: "IUT Paul Sabatier",
          degree: "DUT in Electrical Engineering and Industrial Computing",
          period: "September 2019 - June 2021",
          description: "Learned core engineering principles, including digital electronics, power systems, industrial control systems, and embedded system programming. Projects involved designing and building real-world automation prototypes."
        },
        "lycee": {
          school: "Lycée Bourdelle",
          degree: "Baccalauréat Scientifique (High School Diploma in Science)",
          period: "Graduated June 2019"
        },
        "mexico": {
          school: "Liceo Franco-Mexicano",
          degree: "Premiere S (Scientific Track)",
          period: "September 2017 - June 2018",
          description: "Completed foundational coursework in science and mathematics in an international environment while living in Mexico City, Mexico. Gained multicultural experience and improved my Spanish."
        }
      } as EducationEntries
    },
    contact: {
      title: "Contact Me",
      getInTouch: "Get in Touch",
      name: "Your Name",
      namePlaceholder: "Enter your name",
      email: "Your Email",
      emailPlaceholder: "Enter your email address",
      message: "Your Message",
      messagePlaceholder: "Write your message here...",
      send: "Send Message",
      sending: "Sending...",
      success: "Message sent successfully!",
      error: "Failed to send message. Please try again.",
      messageSent: "Thank you for reaching out. I'll get back to you soon.",
      sendAnotherMessage: "Send Another Message",
      emailAddress: "tviejo12@gmail.com",
      location: "Paris, France",
      phone: "(+33) 6 24 43 33 21"
    },
    chat: {
      title: "Have questions?",
      description: "Try my AI assistant to learn more about my skills and experience!",
      startChat: "Start Chat",
      closeChat: "Close Chat",
      chatButton: "Chat with AI Assistant",
      welcome: {
        title: "Welcome to AI Assistant",
        description: "I can help you learn more about this portfolio, skills, and experience. What would you like to know?",
        placeholder: "Ask me anything..."
      },
      assistant: {
        title: "AI Assistant",
        description: "Ask me anything about this portfolio",
        thinking: "AI is thinking..."
      },
      poweredBy: "Powered by AI",
      chatTitle: "Chat with My AI Assistant",
      chatDescription: "Have questions about my experience, projects, or skills? My AI assistant can help answer them in real-time!"
    },
    links: {
      subtitle: "Software Developer & Automation Specialist",
      website: "Visit Website",
      downloadCV: "Download CV",
      email: "Email Me",
      phone: "Call Me",
      saveContact: "Save Contact Info"
    },
    error404: {
      title: "Page Not Found",
      description: "Oops! The page you're looking for can't be found.",
      goHome: "Go Home",
      contactSupport: "Contact Support",
      location: "Paris, France"
    }
  },
  fr: {
    nav: {
      home: "Accueil",
      about: "À propos",
      experience: "Expérience",
      projects: "Projets",
      education: "Formation",
      contact: "Contact"
    },
    hero: {
      greeting: "Bonjour, je suis Thomas Viejo",
      title: "Développeur Logiciel & Spécialiste en Automatisation",
      location: "Paris, France",
      description: "Passionné par la création de solutions innovantes et l'automatisation de processus complexes.",
      getInTouch: "Me Contacter",
      viewProjects: "Voir les Projets"
    },
    about: {
      title: "À propos de moi",
      description1: "Je suis un développeur passionné et spécialiste en automatisation avec une expérience dans diverses technologies et industries. Mon parcours m'a mené du développement d'applications Windows à la gestion de projets d'automatisation et à l'exploration d'initiatives entrepreneuriales.",
      description2: "Actuellement à 42 Paris, j'élargis mes compétences avec un stage à GTT en tant que Développeur Logiciel. Ma formation diversifiée en génie électrique, informatique industrielle et développement logiciel me permet d'aborder les problèmes sous différents angles.",
      skills: "Compétences Techniques",
      skillCategories: {
        coreLanguages: "Langages",
        toolsPlatforms: "Outils & Plateformes",
        technicalExpertise: "Expertise Technique",
        leadership: "Leadership",
        emergingTech: "Technologies Émergentes"
      }
    },
    experience: {
      title: "Expérience",
      current: "Actuel",
      previous: "Précédent",
      skills: "Compétences & Technologies",
      responsibilities: "Responsabilités Clés",
      experiences: {
        vermr: {
          title: "Co-fondateur et CEO",
          company: "VermR",
          location: "Paris, France",
          period: "Septembre 2024 - Présent",
          description: "Dirige une startup axée sur l'amélioration de l'accès à l'art grâce à la curation basée sur l'IA.",
          highlights: [
            "Développement d'algorithmes de curation d'art basés sur l'IA",
            "Gestion d'une équipe multidisciplinaire et croissance stratégique",
            "Présentation lors d'événements majeurs de startups"
          ]
        },
        gtt: {
          title: "Stagiaire Ingénieur Développement Logiciel",
          company: "GTT",
          location: "Saint-Rémy-lès-Chevreuse, France",
          period: "Février 2025 - Août 2025",
          description: "Contribution à des projets de développement logiciel pour les systèmes de confinement GNL maritime.",
          highlights: [
            "Développement d'un logiciel Python de calepinage automatique de panneaux pour réservoirs terrestres d'ammoniac (50–100 m de diamètre) avec interface PyQt",
            "Mise en œuvre de calculs géométriques avancés avec NumPy et gestion des pièces via une base SQL",
            "Automatisation de la nomenclature et des plans via VBA pour SolidWorks et scripts Python pour FreeCAD et ezdxf",
            "Création d'algorithmes d'optimisation du placement de membranes et panneaux aux géométries complexes, avec export automatique des livrables",
            "Participation à la formalisation des règles métier avec les ingénieurs conception et production"
          ]
        },
        astec: {
          title: "Technicien en Automatisation",
          company: "ASTEC",
          location: "Québec, Canada",
          period: "Mai 2022 - Janvier 2023",
          description: "Construction et test de machines industrielles pour la production de béton.",
          highlights: [
            "Création de schémas électriques et plans d'assemblage",
            "Gestion de la production et contrôle qualité",
            "Supervision des équipes d'assemblage"
          ]
        },
        formule: {
          title: "Responsable des Relations Externes",
          company: "Formule ETS Montréal",
          location: "Montréal, Canada",
          period: "Septembre 2021 - Septembre 2023",
          description: "Dirige les communications d'équipe et gère les partenariats stratégiques.",
          highlights: [
            "4ème place mondiale au Formula Student 2023",
            "Partenariats avec Tesla et Bombardier",
            "Organisation d'événements à grande échelle avec Red Bull"
          ]
        },
        univerza: {
          title: "Stagiaire Développeur Logiciel",
          company: "Univerza v Mariboru",
          location: "Maribor, Slovénie",
          period: "Avril 2021 - Juillet 2021",
          description: "Développement d'applications Windows Forms pour la surveillance énergétique IoT.",
          highlights: [
            "Implémentation de la surveillance énergétique en temps réel",
            "Amélioration des systèmes de gestion de l'énergie",
            "Réduction des coûts par optimisation des batteries"
          ]
        }
      }
    },
    projects: {
      title: "Projets",
      viewProject: "Voir le Projet",
      viewCode: "Voir le Code",
      technologies: "Technologies",
      description: "Description",
      projects: {
        cub3d: {
          title: "Cub3D - Moteur de Jeu 3D",
          description: "Développement d'un moteur de jeu 3D en C avec MiniLibX, incluant le raycasting, le mapping de textures et le rendu de sprites.",
          tags: ["C", "Graphisme", "Développement de Jeux"]
        },
        webserv: {
          title: "Webserv - Serveur HTTP",
          description: "Création d'un serveur web HTTP personnalisé en C++ avec traitement CGI et gestion complète des erreurs.",
          tags: ["C++", "Réseaux", "Programmation Système"]
        },
        iot: {
          title: "Moniteur d'Énergie IoT",
          description: "Création d'une application Windows Forms pour la surveillance en temps réel de la consommation énergétique des appareils IoT.",
          tags: ["C#", "IoT", "Windows Forms"]
        },
        ai: {
          title: "Projets IA & Sécurité",
          description: "Participation aux hackathons DGSE et OpenAI, axés sur la cybersécurité et les solutions d'IA.",
          tags: ["IA", "Sécurité", "Hackathon"]
        }
      }
    },
    education: {
      title: "Formation",
      current: "Actuel",
      previous: "Précédent",
      degree: "Diplôme",
      field: "Domaine d'Étude",
      location: "Lieu",
      date: "Date",
      entries: {
        "42": {
          school: "42 Paris",
          degree: "Architecte en Technologie du Numérique",
          period: "Mai 2024 - Présent",
          description: "Perspectives juridiques et stratégiques du numérique, avec un focus sur la création de startup."
        },
        "saclay": {
          school: "Université Paris-Saclay",
          degree: "Certificat Master 2 LEAD (Droit, Entrepreneuriat & Digital)",
          period: "Septembre 2024 - Décembre 2024",
          description: "Spécialisation dans les aspects juridiques, entrepreneuriaux et numériques des entreprises technologiques. Cours principaux : droit des affaires, propriété intellectuelle, stratégie de transformation digitale et gestion de startups."
        },
        "ets": {
          school: "École de Technologie Supérieure de Montréal",
          degree: "Baccalauréat en Production Automatisée (Incomplet)",
          period: "Septembre 2021 - Septembre 2023",
          description: "Concentration sur les systèmes de production automatisée, incluant la conception de circuits électroniques et la programmation de microcontrôleurs. Développement de compétences pratiques en gestion de projet, contrôle qualité, automatisation des processus industriels et leadership technique."
        },
        "iut": {
          school: "IUT Paul Sabatier",
          degree: "DUT en Génie Électrique et Informatique Industrielle",
          period: "Septembre 2019 - Juin 2021",
          description: "Apprentissage des principes fondamentaux de l'ingénierie, incluant l'électronique numérique, les systèmes d'alimentation, les systèmes de contrôle industriel et la programmation de systèmes embarqués."
        },
        "lycee": {
          school: "Lycée Bourdelle",
          degree: "Baccalauréat Scientifique",
          period: "Diplômé en Juin 2019"
        },
        "mexico": {
          school: "Liceo Franco-Mexicano",
          degree: "Première S (Filière Scientifique)",
          period: "Septembre 2017 - Juin 2018",
          description: "Cours fondamentaux en sciences et mathématiques dans un environnement international à Mexico. Acquisition d'une expérience multiculturelle et amélioration de mon espagnol."
        }
      } as EducationEntries
    },
    contact: {
      title: "Me Contacter",
      getInTouch: "Prendre Contact",
      name: "Votre Nom",
      namePlaceholder: "Entrez votre nom",
      email: "Votre Email",
      emailPlaceholder: "Entrez votre adresse email",
      message: "Votre Message",
      messagePlaceholder: "Écrivez votre message ici...",
      send: "Envoyer",
      sending: "Envoi en cours...",
      success: "Message envoyé avec succès !",
      error: "Échec de l'envoi du message. Veuillez réessayer.",
      messageSent: "Merci de m'avoir contacté. Je vous répondrai bientôt.",
      sendAnotherMessage: "Envoyer un autre message",
      emailAddress: "tviejo12@gmail.com",
      location: "Paris, France",
      phone: "(+33) 6 24 43 33 21"
    },
    chat: {
      title: "Des questions ?",
      description: "Essayez mon assistant IA pour en savoir plus sur mes compétences et mon expérience !",
      startChat: "Démarrer le chat",
      closeChat: "Fermer le chat",
      chatButton: "Discuter avec l'assistant IA",
      welcome: {
        title: "Bienvenue sur l'assistant IA",
        description: "Je peux vous aider à en savoir plus sur ce portfolio, mes compétences et mon expérience. Que souhaitez-vous savoir ?",
        placeholder: "Posez-moi une question..."
      },
      assistant: {
        title: "Assistant IA",
        description: "Posez-moi une question sur ce portfolio",
        thinking: "L'IA réfléchit..."
      },
      poweredBy: "Propulsé par l'IA",
      chatTitle: "Discutez avec mon assistant IA",
      chatDescription: "Vous avez des questions sur mon expérience, mes projets ou mes compétences ? Mon assistant IA peut vous aider à y répondre en temps réel !"
    },
    links: {
      subtitle: "Développeur Logiciel & Spécialiste en Automatisation",
      website: "Visiter le Site",
      downloadCV: "Télécharger CV",
      email: "M'envoyer un Email",
      phone: "M'appeler",
      saveContact: "Sauvegarder Contact"
    },
    error404: {
      title: "Page Non Trouvée",
      description: "Oups ! La page que vous recherchez n'existe pas.",
      goHome: "Retour à l'Accueil",
      contactSupport: "Contacter le Support",
      location: "Paris, France"
    }
  }
} as const;


type EducationEntry = {
  school: string;
  degree: string;
  period: string;
  description?: string;
};

type EducationEntries = {
  [key: string]: EducationEntry;
};

declare module "@/lib/translations" {
  interface EducationSection {
    entries: EducationEntries;
  }
}