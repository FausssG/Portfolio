export const translations = {
  es: {
    // Login & Loading
    welcome: "BIENVENIDO",
    subtitle: "PORTFOLIO DIGITAL",
    systemVersion: "v2.5.8 | PROTOCOLO SEGURO",
    selectLanguage: "SELECCIONAR IDIOMA",
    enter: "ACCEDER AL SISTEMA",
    authSteps: [
      "INICIANDO SISTEMA...",
      "CARGANDO MÓDULOS...",
      "ESTABLECIENDO CONEXIÓN...",
      "PREPARANDO INTERFAZ...",
      "ACCESO CONCEDIDO"
    ],
    serverActive: "SERVIDOR ACTIVO",
    secureConnection: "CONEXIÓN SEGURA SSL/TLS 256-BIT",

    // Main System
    systemOnline: "SISTEMA ONLINE",
    systemOnlineHint: "¡Este no es el Easter Egg! 😄",
    instructions: "INSTRUCCIONES:",
    instructionsList: [
      "Click en el nodo central para comenzar",
      "Desbloquea nodos visitando los anteriores",
      "Gana XP explorando todas las secciones",
      "Completa el mapa al 100%",
      "🎮 Existe un Easter Egg secreto... ¿Puedes encontrarlo?",
      "💡 Pista: Todo es clickeable, explora el HUD"
    ],
    nodeSystem: {
      progress: "PROGRESO",
      nodes: "Nodos",
      locked: "Bloqueado",
      unlockToastTitle: "Nodo desbloqueado",
      tutorial: "👆 Click en SISTEMA CENTRAL para comenzar tu viaje",
      dragHint: "Arrastra para explorar",
      secretUnlocked: "🎮 HACK DESBLOQUEADO!",
      xpBonus: "BONUS XP",
      secretHint: "✨ Easter Egg!",
      secretLabel: "Nodo secreto descubierto!"
    },

    // Nodes
    nodes: {
      main: { title: "SISTEMA CENTRAL", description: "Núcleo del sistema" },
      about: { title: "PERFIL", description: "Información personal" },
      skills: { title: "HABILIDADES", description: "Stack tecnológico" },
      projects: { title: "PROYECTOS", description: "Portfolio de trabajos" },
      contact: { title: "CONTACTO", description: "Red de comunicación" },
      languages: { title: "IDIOMAS", description: "Certificaciones" },
      cv: { title: "CURRICULUM", description: "Descargar CV" },
      secret: { title: "???", description: "Nodo secreto descubierto!" }
    },

    // Main Content
    name: "Faustino Gnavi",
    role: "Ingeniero en Sistemas | Analista Desarrollador",
    welcomeMessage: "Bienvenido al sistema",
    mainDescription: "Explora mis proyectos, habilidades y experiencia a través de esta interfaz interactiva. Cada nodo representa una sección diferente de mi portfolio profesional.",
    quickAccess: "ACCESO RÁPIDO",
    stats: {
      projects: { label: "PROYECTOS", value: "7+" },
      experience: { label: "AÑOS ESTUDIO", value: "4+" },
      technologies: { label: "TECNOLOGÍAS", value: "20+" },
      gpa: { label: "PROMEDIO", value: "7.5/10" }
    },

    // About
    aboutTitle: "PERFIL DE USUARIO",
    identification: "IDENTIFICACIÓN",
    identificationText: "Estudiante avanzado de Ingeniería en Sistemas de la Información (UTN Rosario, promedio 7.5/10) con perfil full-stack orientado al desarrollo de software y análisis de datos. Experiencia práctica en Python, C#, JavaScript/TypeScript, Angular y NestJS, con sólidos conocimientos en SQL, control de versiones con Git y metodologías ágiles/Scrum.",
    mission: "MISIÓN",
    missionText: "Transformar ideas complejas en soluciones tecnológicas innovadoras que impulsen el crecimiento y mejoren la eficiencia de los sistemas. Apasionado por el aprendizaje continuo y la aplicación de mejores prácticas en desarrollo de software.",
    interpersonalSkillsTitle: "HABILIDADES INTERPERSONALES",
    interpersonalSkillsText: "Trabajo en equipo, resolución de problemas, comunicación eficaz, proactividad, gestión del tiempo, creatividad e innovación, trabajo bajo presión, pensamiento sistémico, responsabilidad y mente abierta.",

    // Skills
    skillsTitle: "HABILIDADES TÉCNICAS",
    skillCategories: [
      { key: "languages", title: "Lenguajes", skills: ["Python", "C#", "JavaScript", "TypeScript", "HTML", "CSS"] },
      { key: "frameworks", title: "Frameworks / Librerías", skills: ["Angular", "NestJS", ".NET Framework"] },
      { key: "databases", title: "Bases de Datos", skills: ["SQL", "MySQL", "Modelado", "Consultas", "Optimización"] },
      { key: "version", title: "Control de Versiones", skills: ["Git", "GitHub"] },
      { key: "data", title: "Datos & IA", skills: ["IBM SPSS Modeler", "IBM SPSS Statistics", "MATLAB", "Análisis Exploratorio de Datos (EDA)"] },
      { key: "simulation", title: "Simulación & Procesos", skills: ["AnyLogic", "Bizagi Modeler"] },
      { key: "design", title: "Diseño & UX", skills: ["Figma", "Axure", "UML"] },
      { key: "iot", title: "IoT / Hardware", skills: ["Arduino"] },
      { key: "methods", title: "Metodologías", skills: ["Scrum", "Metodologías Ágiles", "Gestión de Proyectos", "Gestión de Calidad"] }
    ],

    // Projects
    projectsTitle: "ARCHIVO DE PROYECTOS",
    projectsList: [
      {
        name: "Proyecto Final de Carrera",
        tech: "Flutter + Dart + NextJS + PostgreSQL",
        status: "EN DESARROLLO",
        description: "Proyecto integrador final de la carrera de Ingeniería en Sistemas",
        image: "/assets/projects/proyecto-final.png",
        technologies: ["Flutter", "Dart", "NextJS", "PostgreSQL", "TypeScript"],
        date: "2025 - Presente"
      },
      {
        name: "Sistema de Gestión WPC",
        tech: "UML + Arquitectura",
        status: "COMPLETADO",
        description: "Sistema de gestión 100% funcional con aplicación de mejores prácticas de diseño de software",
        image: "/assets/projects/wpc.png",
        technologies: ["UML", "Arquitectura de Software", "Patrones de Diseño"],
        date: "2023 - 2026"
      },
      {
        name: "Sistema Experto React",
        tech: "React + LLM + IA",
        status: "COMPLETADO",
        description: "Sistema experto para análisis de lesiones deportivas con procesamiento de lenguaje natural",
        image: "/assets/projects/sistema-experto.png",
        technologies: ["React", "LLM", "IA", "NLP"],
        date: "Mar - Oct 2025"
      },
      {
        name: "Ciencia de Datos - Email Marketing",
        tech: "Python + EDA",
        status: "COMPLETADO",
        description: "Análisis y optimización de estrategia de email marketing para lanzamiento de línea de bicicletas",
        image: "/assets/projects/data-science.png",
        technologies: ["Python", "Pandas", "EDA", "Data Analysis"],
        date: "Mar - Jul 2025"
      },
      {
        name: "Simulación - Balanceo de Personal",
        tech: "AnyLogic + Simulación",
        status: "COMPLETADO",
        description: "Optimización de personal en ferretería usando simulación para reducir tiempos de espera y mejorar gestión de stock",
        image: "/assets/projects/simulacion.png",
        technologies: ["AnyLogic", "Simulación", "Optimización"],
        date: "Ago - Dic 2024"
      },
      {
        name: "Data Center - Cableado Estructurado",
        tech: "Infraestructura IT",
        status: "COMPLETADO",
        description: "Diseño y construcción de Data Center para empresa proveedora de seguros con optimización de infraestructura física",
        image: "/assets/projects/datacenter.png",
        technologies: ["Cableado Estructurado", "Redes", "Infraestructura"],
        date: "Mar - Nov 2024"
      },
      {
        name: "Robot Seguidor de Líneas",
        tech: "Arduino + IoT",
        status: "COMPLETADO",
        description: "Sistema autónomo programado en Arduino para seguir trayectos predefinidos con optimización de trayectoria",
        image: "/assets/projects/robot.png",
        technologies: ["Arduino", "C++", "IoT", "Robótica"],
        date: "Mar - Jun 2024"
      },
      {
        name: "Sistema de Gestión Veterinaria",
        tech: "C# + .NET + SQL",
        status: "COMPLETADO",
        description: "Sistema CRUD completo con diseño orientado a objetos y manejo de base de datos relacional",
        image: "/assets/projects/veterinaria.png",
        technologies: ["C#", ".NET Framework", "SQL", "OOP"],
        date: "Mar - Nov 2023"
      }
    ],

    // Languages
    languagesTitle: "CERTIFICACIONES DE IDIOMAS",
    languagesList: [
      {
        language: "Español",
        level: "Nativo",
        flag: "🇪🇸",
        description: "Lengua materna"
      },
      {
        language: "Inglés",
        level: "C1 - Avanzado",
        flag: "🇺🇸",
        description: "First Certificate Cambridge (2020)"
      },
      {
        language: "Alemán",
        level: "A2-B1 - Intermedio",
        flag: "🇩🇪",
        description: "Certificados A1/A2"
      }
    ],

    // CV
    cvTitle: "DESCARGAR CURRICULUM",
    downloadCV: "DESCARGAR CV",
    cvSpanish: "CV en Español",
    cvEnglish: "CV en Inglés",
    cvGerman: "CV en Alemán",
    lastUpdated: "Última actualización",

    // Contact
    contactTitle: "CANAL DE COMUNICACIÓN",
    formLabels: {
      name: "NOMBRE",
      email: "EMAIL",
      message: "MENSAJE",
      submit: "ENVIAR TRANSMISIÓN"
    },
    formPlaceholders: {
      name: "Tu nombre",
      email: "tu@email.com",
      message: "Cuéntame sobre tu proyecto..."
    },
    socialLinks: ["GitHub", "LinkedIn", "Email"],
    contactInfo: {
      email: "faustinognavi@gmail.com",
      phone: "+54 341 3996285",
      location: "Rosario, Santa Fe, Argentina",
      linkedin: "linkedin.com/in/faustino-gnavi"
    },

    // Node content
    nodeContent: {
      downloadFilesHint: "Los archivos se descargarán automáticamente",
      contactDirect: "CONTACTO DIRECTO:",
      sending: "Enviando...",
      sentSuccess: "¡Mensaje enviado exitosamente! 🎉",
      sendError: "Error al enviar el mensaje. Intenta de nuevo.",
      unlockSystem: "Sistema desbloqueado",
      secretThanks: "Gracias por explorar mi portfolio de manera tan completa",
      achievement: "Logro",
      bonusUnlocked: "Bono desbloqueado",
      systemActive: "SISTEMA ACTIVO"
    },

    terminalLoader: {
      sequence: [
        "INICIALIZANDO SISTEMA...",
        "CARGANDO MÓDULOS PRINCIPALES...",
        "ESTABLECIENDO CONEXIÓN NEURAL...",
        "SINCRONIZANDO BASE DE DATOS...",
        "ACTIVANDO INTERFAZ GRÁFICA...",
        "SISTEMA LISTO. BIENVENIDO."
      ],
      progress: "PROGRESO",
      footer: "CONSTRUYENDO EXPERIENCIA INTERACTIVA..."
    }
  },

  en: {
    // Login & Loading
    welcome: "WELCOME",
    subtitle: "DIGITAL PORTFOLIO",
    systemVersion: "v2.5.8 | SECURE PROTOCOL",
    selectLanguage: "SELECT LANGUAGE",
    enter: "ACCESS SYSTEM",
    authSteps: [
      "INITIALIZING SYSTEM...",
      "LOADING MODULES...",
      "ESTABLISHING CONNECTION...",
      "PREPARING INTERFACE...",
      "ACCESS GRANTED"
    ],
    serverActive: "SERVER ACTIVE",
    secureConnection: "SECURE CONNECTION SSL/TLS 256-BIT",

    // Main System
    systemOnline: "SYSTEM ONLINE",
    systemOnlineHint: "This is NOT the Easter Egg! 😄",
    instructions: "INSTRUCTIONS:",
    instructionsList: [
      "Click central node to begin",
      "Unlock nodes by visiting previous ones",
      "Gain XP exploring all sections",
      "Complete the map 100%",
      "🎮 There's a secret Easter Egg... Can you find it?",
      "💡 Hint: Everything is clickable, explore the HUD"
    ],
    nodeSystem: {
      progress: "PROGRESS",
      nodes: "Nodes",
      locked: "Locked",
      unlockToastTitle: "Node unlocked",
      tutorial: "👆 Click CENTRAL SYSTEM to begin your journey",
      dragHint: "Drag to explore",
      secretUnlocked: "🎮 HACK UNLOCKED!",
      xpBonus: "XP BONUS",
      secretHint: "✨ Easter Egg!",
      secretLabel: "Secret node discovered!"
    },

    // Nodes
    nodes: {
      main: { title: "CENTRAL SYSTEM", description: "System core" },
      about: { title: "PROFILE", description: "Personal information" },
      skills: { title: "SKILLS", description: "Tech stack" },
      projects: { title: "PROJECTS", description: "Work portfolio" },
      contact: { title: "CONTACT", description: "Communication network" },
      languages: { title: "LANGUAGES", description: "Certifications" },
      cv: { title: "RESUME", description: "Download CV" },
      secret: { title: "???", description: "Secret node discovered!" }
    },

    // Main Content
    name: "Faustino Gnavi",
    role: "Systems Engineer | Developer Analyst",
    welcomeMessage: "Welcome to the system",
    mainDescription: "Explore my projects, skills and experience through this interactive interface. Each node represents a different section of my professional portfolio.",
    quickAccess: "QUICK ACCESS",
    stats: {
      projects: { label: "PROJECTS", value: "7+" },
      experience: { label: "STUDY YEARS", value: "4+" },
      technologies: { label: "TECHNOLOGIES", value: "20+" },
      gpa: { label: "GPA", value: "7.5/10" }
    },

    // About
    aboutTitle: "USER PROFILE",
    identification: "IDENTIFICATION",
    identificationText: "Advanced student of Information Systems Engineering (UTN Rosario, GPA 7.5/10) with a full-stack profile focused on software development and data analysis. Hands-on experience in Python, C#, JavaScript/TypeScript, Angular and NestJS, with solid knowledge in SQL, version control with Git and Agile/Scrum methodologies.",
    mission: "MISSION",
    missionText: "Transform complex ideas into innovative technological solutions that drive growth and improve system efficiency. Passionate about continuous learning and applying software development best practices.",
    interpersonalSkillsTitle: "INTERPERSONAL SKILLS",
    interpersonalSkillsText: "Teamwork, problem solving, effective communication, proactivity, time management, creativity and innovation, working under pressure, systems thinking, responsibility and an open mind.",

    // Skills
    skillsTitle: "TECHNICAL SKILLS",
    skillCategories: [
      { key: "languages", title: "Languages", skills: ["Python", "C#", "JavaScript", "TypeScript", "HTML", "CSS"] },
      { key: "frameworks", title: "Frameworks / Libraries", skills: ["Angular", "NestJS", ".NET Framework"] },
      { key: "databases", title: "Databases", skills: ["SQL", "MySQL", "Modeling", "Queries", "Optimization"] },
      { key: "version", title: "Version Control", skills: ["Git", "GitHub"] },
      { key: "data", title: "Data & AI", skills: ["IBM SPSS Modeler", "IBM SPSS Statistics", "MATLAB", "Exploratory Data Analysis (EDA)"] },
      { key: "simulation", title: "Simulation & Processes", skills: ["AnyLogic", "Bizagi Modeler"] },
      { key: "design", title: "Design & UX", skills: ["Figma", "Axure", "UML"] },
      { key: "iot", title: "IoT / Hardware", skills: ["Arduino"] },
      { key: "methods", title: "Methodologies", skills: ["Scrum", "Agile Methodologies", "Project Management", "Quality Management"] }
    ],

    // Projects
    projectsTitle: "PROJECTS ARCHIVE",
    projectsList: [
      {
        name: "Final Degree Project",
        tech: "Flutter + Dart + NextJS + PostgreSQL",
        status: "IN DEVELOPMENT",
        description: "Final integrative project for Systems Engineering degree",
        image: "/assets/projects/proyecto-final.png",
        technologies: ["Flutter", "Dart", "NextJS", "PostgreSQL", "TypeScript"],
        date: "2025 - Present"
      },
      {
        name: "WPC Management System",
        tech: "UML + Architecture",
        status: "COMPLETED",
        description: "100% functional management system applying software design best practices",
        image: "/assets/projects/wpc.png",
        technologies: ["UML", "Software Architecture", "Design Patterns"],
        date: "2023 - 2026"
      },
      {
        name: "React Expert System",
        tech: "React + LLM + AI",
        status: "COMPLETED",
        description: "Expert system for sports injury analysis with natural language processing",
        image: "/assets/projects/sistema-experto.png",
        technologies: ["React", "LLM", "AI", "NLP"],
        date: "Mar - Oct 2025"
      },
      {
        name: "Data Science - Email Marketing",
        tech: "Python + EDA",
        status: "COMPLETED",
        description: "Analysis and optimization of email marketing strategy for bicycle line launch",
        image: "/assets/projects/data-science.png",
        technologies: ["Python", "Pandas", "EDA", "Data Analysis"],
        date: "Mar - Jul 2025"
      },
      {
        name: "Simulation - Staff Balancing",
        tech: "AnyLogic + Simulation",
        status: "COMPLETED",
        description: "Hardware store staff optimization using simulation to reduce wait times and improve stock management",
        image: "/assets/projects/simulacion.png",
        technologies: ["AnyLogic", "Simulation", "Optimization"],
        date: "Aug - Dec 2024"
      },
      {
        name: "Data Center - Structured Cabling",
        tech: "IT Infrastructure",
        status: "COMPLETED",
        description: "Design and construction of Data Center for insurance company with physical infrastructure optimization",
        image: "/assets/projects/datacenter.png",
        technologies: ["Structured Cabling", "Networks", "Infrastructure"],
        date: "Mar - Nov 2024"
      },
      {
        name: "Line-Following Robot",
        tech: "Arduino + IoT",
        status: "COMPLETED",
        description: "Autonomous system programmed in Arduino to follow predefined paths with trajectory optimization",
        image: "/assets/projects/robot.png",
        technologies: ["Arduino", "C++", "IoT", "Robotics"],
        date: "Mar - Jun 2024"
      },
      {
        name: "Veterinary Management System",
        tech: "C# + .NET + SQL",
        status: "COMPLETED",
        description: "Complete CRUD system with object-oriented design and relational database management",
        image: "/assets/projects/veterinaria.png",
        technologies: ["C#", ".NET Framework", "SQL", "OOP"],
        date: "Mar - Nov 2023"
      }
    ],

    // Languages
    languagesTitle: "LANGUAGE CERTIFICATIONS",
    languagesList: [
      {
        language: "Spanish",
        level: "Native",
        flag: "🇪🇸",
        description: "Mother tongue"
      },
      {
        language: "English",
        level: "C1 - Advanced",
        flag: "🇺🇸",
        description: "First Certificate Cambridge (2020)"
      },
      {
        language: "German",
        level: "A2-B1 - Intermediate",
        flag: "🇩🇪",
        description: "A1/A2 Certificates"
      }
    ],

    // CV
    cvTitle: "DOWNLOAD RESUME",
    downloadCV: "DOWNLOAD CV",
    cvSpanish: "CV in Spanish",
    cvEnglish: "CV in English",
    cvGerman: "CV in German",
    lastUpdated: "Last updated",

    // Contact
    contactTitle: "COMMUNICATION CHANNEL",
    formLabels: {
      name: "NAME",
      email: "EMAIL",
      message: "MESSAGE",
      submit: "SEND TRANSMISSION"
    },
    formPlaceholders: {
      name: "Your name",
      email: "your@email.com",
      message: "Tell me about your project..."
    },
    socialLinks: ["GitHub", "LinkedIn", "Email"],
    contactInfo: {
      email: "faustinognavi@gmail.com",
      phone: "+54 341 3996285",
      location: "Rosario, Santa Fe, Argentina",
      linkedin: "linkedin.com/in/faustino-gnavi"
    },

    // Node content
    nodeContent: {
      downloadFilesHint: "Files will download automatically",
      contactDirect: "DIRECT CONTACT:",
      sending: "Sending...",
      sentSuccess: "Message sent successfully! 🎉",
      sendError: "Error sending message. Please try again.",
      unlockSystem: "System unlocked",
      secretThanks: "Thank you for exploring my portfolio so thoroughly",
      achievement: "Achievement",
      bonusUnlocked: "Bonus unlocked",
      systemActive: "SYSTEM ACTIVE"
    },

    terminalLoader: {
      sequence: [
        "INITIALIZING SYSTEM...",
        "LOADING MAIN MODULES...",
        "ESTABLISHING NEURAL CONNECTION...",
        "SYNCHRONIZING DATABASE...",
        "ACTIVATING GRAPHICAL INTERFACE...",
        "SYSTEM READY. WELCOME."
      ],
      progress: "PROGRESS",
      footer: "BUILDING INTERACTIVE EXPERIENCE..."
    }
  },

  de: {
    // Login & Loading
    welcome: "WILLKOMMEN",
    subtitle: "DIGITALES PORTFOLIO",
    systemVersion: "v2.5.8 | SICHERES PROTOKOLL",
    selectLanguage: "SPRACHE WÄHLEN",
    enter: "SYSTEM ZUGREIFEN",
    authSteps: [
      "SYSTEM WIRD GESTARTET...",
      "MODULE WERDEN GELADEN...",
      "VERBINDUNG WIRD HERGESTELLT...",
      "SCHNITTSTELLE WIRD VORBEREITET...",
      "ZUGRIFF GEWÄHRT"
    ],
    serverActive: "SERVER AKTIV",
    secureConnection: "SICHERE VERBINDUNG SSL/TLS 256-BIT",

    // Main System
    systemOnline: "SYSTEM ONLINE",
    systemOnlineHint: "Das ist NICHT das Easter Egg! 😄",
    instructions: "ANWEISUNGEN:",
    instructionsList: [
      "Klicken Sie auf den zentralen Knoten, um zu beginnen",
      "Schalten Sie Knoten frei, indem Sie vorherige besuchen",
      "Verdienen Sie XP durch Erkunden aller Bereiche",
      "Schließen Sie die Karte zu 100% ab",
      "🎮 Es gibt ein geheimes Easter Egg... Kannst du es finden?",
      "💡 Tipp: Alles ist anklickbar, erkunde das HUD"
    ],
    nodeSystem: {
      progress: "FORTSCHRITT",
      nodes: "Knoten",
      locked: "Gesperrt",
      unlockToastTitle: "Knoten freigeschaltet",
      tutorial: "👆 Klicken Sie auf ZENTRALSYSTEM, um Ihre Reise zu beginnen",
      dragHint: "Ziehen, um zu erkunden",
      secretUnlocked: "🎮 HACK FREIGESCHALTET!",
      xpBonus: "XP-BONUS",
      secretHint: "✨ Easter Egg!",
      secretLabel: "Geheimer Knoten entdeckt!"
    },

    // Nodes
    nodes: {
      main: { title: "ZENTRALSYSTEM", description: "Systemkern" },
      about: { title: "PROFIL", description: "Persönliche Informationen" },
      skills: { title: "FÄHIGKEITEN", description: "Tech-Stack" },
      projects: { title: "PROJEKTE", description: "Arbeitsportfolio" },
      contact: { title: "KONTAKT", description: "Kommunikationsnetzwerk" },
      languages: { title: "SPRACHEN", description: "Zertifizierungen" },
      cv: { title: "LEBENSLAUF", description: "CV herunterladen" },
      secret: { title: "???", description: "Geheimer Knoten entdeckt!" }
    },

    // Main Content
    name: "Faustino Gnavi",
    role: "Systemingenieur | Entwickler-Analyst",
    welcomeMessage: "Willkommen im System",
    mainDescription: "Erkunden Sie meine Projekte, Fähigkeiten und Erfahrungen durch diese interaktive Oberfläche. Jeder Knoten repräsentiert einen anderen Bereich meines professionellen Portfolios.",
    quickAccess: "SCHNELLZUGRIFF",
    stats: {
      projects: { label: "PROJEKTE", value: "7+" },
      experience: { label: "STUDIENJAHRE", value: "4+" },
      technologies: { label: "TECHNOLOGIEN", value: "20+" },
      gpa: { label: "DURCHSCHNITT", value: "7.5/10" }
    },

    // About
    aboutTitle: "BENUTZERPROFIL",
    identification: "IDENTIFIKATION",
    identificationText: "Fortgeschrittener Student der Informationssystemtechnik (UTN Rosario, Durchschnitt 7.5/10) mit Full-Stack-Profil, das sich auf Softwareentwicklung und Datenanalyse konzentriert. Praktische Erfahrung in Python, C#, JavaScript/TypeScript, Angular und NestJS, mit soliden Kenntnissen in SQL, Versionskontrolle mit Git und Agile/Scrum-Methoden.",
    mission: "MISSION",
    missionText: "Komplexe Ideen in innovative technologische Lösungen umwandeln, die das Wachstum fördern und die Systemeffizienz verbessern. Leidenschaftlich für kontinuierliches Lernen und die Anwendung bewährter Praktiken in der Softwareentwicklung.",
    interpersonalSkillsTitle: "ZWISCHENMENSCHLICHE FÄHIGKEITEN",
    interpersonalSkillsText: "Teamarbeit, Problemlösung, effektive Kommunikation, Proaktivität, Zeitmanagement, Kreativität und Innovation, Arbeiten unter Druck, systemisches Denken, Verantwortungsbewusstsein und Offenheit.",

    // Skills
    skillsTitle: "TECHNISCHE FÄHIGKEITEN",
    skillCategories: [
      { key: "languages", title: "Sprachen", skills: ["Python", "C#", "JavaScript", "TypeScript", "HTML", "CSS"] },
      { key: "frameworks", title: "Frameworks / Bibliotheken", skills: ["Angular", "NestJS", ".NET Framework"] },
      { key: "databases", title: "Datenbanken", skills: ["SQL", "MySQL", "Modellierung", "Abfragen", "Optimierung"] },
      { key: "version", title: "Versionskontrolle", skills: ["Git", "GitHub"] },
      { key: "data", title: "Daten & KI", skills: ["IBM SPSS Modeler", "IBM SPSS Statistics", "MATLAB", "Explorative Datenanalyse (EDA)"] },
      { key: "simulation", title: "Simulation & Prozesse", skills: ["AnyLogic", "Bizagi Modeler"] },
      { key: "design", title: "Design & UX", skills: ["Figma", "Axure", "UML"] },
      { key: "iot", title: "IoT / Hardware", skills: ["Arduino"] },
      { key: "methods", title: "Methoden", skills: ["Scrum", "Agile Methoden", "Projektmanagement", "Qualitätsmanagement"] }
    ],

    // Projects
    projectsTitle: "PROJEKTARCHIV",
    projectsList: [
      {
        name: "Abschlussprojekt",
        tech: "Flutter + Dart + NextJS + PostgreSQL",
        status: "IN ENTWICKLUNG",
        description: "Abschließendes integratives Projekt für den Systemingenieur-Abschluss",
        image: "/assets/projects/proyecto-final.png",
        technologies: ["Flutter", "Dart", "NextJS", "PostgreSQL", "TypeScript"],
        date: "2025 - Heute"
      },
      {
        name: "WPC-Verwaltungssystem",
        tech: "UML + Architektur",
        status: "ABGESCHLOSSEN",
        description: "100% funktionsfähiges Verwaltungssystem mit bewährten Softwaredesign-Praktiken",
        image: "/assets/projects/wpc.png",
        technologies: ["UML", "Software-Architektur", "Entwurfsmuster"],
        date: "2023 - 2026"
      },
      {
        name: "React-Expertensystem",
        tech: "React + LLM + KI",
        status: "ABGESCHLOSSEN",
        description: "Expertensystem zur Analyse von Sportverletzungen mit natürlicher Sprachverarbeitung",
        image: "/assets/projects/sistema-experto.png",
        technologies: ["React", "LLM", "KI", "NLP"],
        date: "Mär - Okt 2025"
      },
      {
        name: "Data Science - E-Mail-Marketing",
        tech: "Python + EDA",
        status: "ABGESCHLOSSEN",
        description: "Analyse und Optimierung der E-Mail-Marketingstrategie für Fahrradlinie-Einführung",
        image: "/assets/projects/data-science.png",
        technologies: ["Python", "Pandas", "EDA", "Datenanalyse"],
        date: "Mär - Jul 2025"
      },
      {
        name: "Simulation - Personalausgleich",
        tech: "AnyLogic + Simulation",
        status: "ABGESCHLOSSEN",
        description: "Personaloptimierung im Baumarkt durch Simulation zur Reduzierung von Wartezeiten und Verbesserung der Bestandsverwaltung",
        image: "/assets/projects/simulacion.png",
        technologies: ["AnyLogic", "Simulation", "Optimierung"],
        date: "Aug - Dez 2024"
      },
      {
        name: "Rechenzentrum - Strukturierte Verkabelung",
        tech: "IT-Infrastruktur",
        status: "ABGESCHLOSSEN",
        description: "Design und Bau eines Rechenzentrums für Versicherungsunternehmen mit Optimierung der physischen Infrastruktur",
        image: "/assets/projects/datacenter.png",
        technologies: ["Strukturierte Verkabelung", "Netzwerke", "Infrastruktur"],
        date: "Mär - Nov 2024"
      },
      {
        name: "Linienfolger-Roboter",
        tech: "Arduino + IoT",
        status: "ABGESCHLOSSEN",
        description: "Autonomes System in Arduino programmiert, um vordefinierte Pfade mit Trajektorienoptimierung zu folgen",
        image: "/assets/projects/robot.png",
        technologies: ["Arduino", "C++", "IoT", "Robotik"],
        date: "Mär - Jun 2024"
      },
      {
        name: "Tierarztverwaltungssystem",
        tech: "C# + .NET + SQL",
        status: "ABGESCHLOSSEN",
        description: "Vollständiges CRUD-System mit objektorientiertem Design und relationaler Datenbankverwaltung",
        image: "/assets/projects/veterinaria.png",
        technologies: ["C#", ".NET Framework", "SQL", "OOP"],
        date: "Mär - Nov 2023"
      }
    ],

    // Languages
    languagesTitle: "SPRACHZERTIFIZIERUNGEN",
    languagesList: [
      {
        language: "Spanisch",
        level: "Muttersprache",
        flag: "🇪🇸",
        description: "Muttersprache"
      },
      {
        language: "Englisch",
        level: "C1 - Fortgeschritten",
        flag: "🇺🇸",
        description: "First Certificate Cambridge (2020)"
      },
      {
        language: "Deutsch",
        level: "A2-B1 - Mittelstufe",
        flag: "🇩🇪",
        description: "A1/A2 Zertifikate"
      }
    ],

    // CV
    cvTitle: "LEBENSLAUF HERUNTERLADEN",
    downloadCV: "CV HERUNTERLADEN",
    cvSpanish: "CV auf Spanisch",
    cvEnglish: "CV auf Englisch",
    cvGerman: "CV auf Deutsch",
    lastUpdated: "Zuletzt aktualisiert",

    // Contact
    contactTitle: "KOMMUNIKATIONSKANAL",
    formLabels: {
      name: "NAME",
      email: "E-MAIL",
      message: "NACHRICHT",
      submit: "ÜBERTRAGUNG SENDEN"
    },
    formPlaceholders: {
      name: "Ihr Name",
      email: "ihre@email.com",
      message: "Erzählen Sie mir von Ihrem Projekt..."
    },
    socialLinks: ["GitHub", "LinkedIn", "E-Mail"],
    contactInfo: {
      email: "faustinognavi@gmail.com",
      phone: "+54 341 3996285",
      location: "Rosario, Santa Fe, Argentinien",
      linkedin: "linkedin.com/in/faustino-gnavi"
    },

    // Node content
    nodeContent: {
      downloadFilesHint: "Dateien werden automatisch heruntergeladen",
      contactDirect: "DIREKTER KONTAKT:",
      sending: "Wird gesendet...",
      sentSuccess: "Nachricht erfolgreich gesendet! 🎉",
      sendError: "Fehler beim Senden der Nachricht. Bitte erneut versuchen.",
      unlockSystem: "System freigeschaltet",
      secretThanks: "Danke, dass Sie mein Portfolio so gründlich erkundet haben",
      achievement: "Erfolg",
      bonusUnlocked: "Bonus freigeschaltet",
      systemActive: "SYSTEM AKTIV"
    },

    terminalLoader: {
      sequence: [
        "SYSTEM WIRD INITIALISIERT...",
        "HAUPTMODULE WERDEN GELADEN...",
        "NEURALE VERBINDUNG WIRD HERGESTELLT...",
        "DATENBANK WIRD SYNCHRONISIERT...",
        "GRAFISCHE OBERFLÄCHE WIRD AKTIVIERT...",
        "SYSTEM BEREIT. WILLKOMMEN."
      ],
      progress: "FORTSCHRITT",
      footer: "INTERAKTIVE ERFAHRUNG WIRD AUFGEBAUT..."
    }
  }
};

export type Language = keyof typeof translations;
