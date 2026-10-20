// Data for PixelRift / Noisy Studios Gaming Portfolio

export const studioInfo = {
  name: "PIXELRIFT",
  studioAlt: "Noisy Studios",
  tagline: "Forjando experiencias interactivas memorables con pasión indie, arte minucioso y tecnología de vanguardia.",
  description: "Estudio independiente enfocado en mecánicas de juego profundas, dirección de arte inmersiva y narrativas que conectan emocionalmente con los jugadores.",
  mission: "Creemos que los videojuegos son el arte más completo de nuestra era. PixelRift nació para demostrar que equipos pequeños pueden crear experiencias que compiten en innovación y emoción con cualquier gran estudio. Cada proyecto es una obsesión colectiva.",
  email: "hola@pixelrift.dev",
  pressEmail: "press@pixelrift.dev",
  supportEmail: "support@pixelrift.dev",
  discordUrl: "https://discord.gg/pixelrift",
  twitterUrl: "https://x.com/pixelrift_dev",
  youtubeUrl: "https://youtube.com/@pixelrift",
  steamUrl: "https://store.steampowered.com",
  githubUrl: "https://github.com",
};

export const featuredGame = {
  id: "aetheria-echoes",
  title: "Aetheria: Echoes of the Void",
  category: "Acción - ACCION/AVENTURA - ACCION 2D",
  genre: "Metroidvania / Cyberpunk",
  year: "2025",
  rating: "98% Positivas",
  tags: ["2024", "Steam", "Indie", "Retro"],
  bannerImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80",
  coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=800&q=80"
  ],
  quote: "Una odisea hiper-estilizada a través de ruinas biocibernéticas. Combina combate fluido y acrobático con un sistema de magia sintética adaptativa y pixel art de vanguardia.",
  description: "Despierta como un guardián cibernético en las profundidades de un mundo colapsado. Domina armas cinéticas, desentraña misterios arcanos y enfrenta jefes colosales en una experiencia audiovisual electrizante.",
  price: "$19.99 USD",
  discount: "-15%",
  steamUrl: "https://store.steampowered.com",
  trailerEmbed: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1",
};

export const techStack = [
  {
    name: "Unity",
    role: "MOTOR",
    desc: "Motor principal para prototipado ágil y sistemas de física 2D/3D.",
    color: "from-blue-500/20 to-indigo-500/10",
    border: "group-hover:border-blue-500/50",
    iconKey: "unity"
  },
  {
    name: "Unreal Engine",
    role: "MOTOR",
    desc: "Pipeline de renderizado de alta fidelidad e iluminación Nanite/Lumen.",
    color: "from-slate-500/20 to-zinc-500/10",
    border: "group-hover:border-cyan-400/50",
    iconKey: "unreal"
  },
  {
    name: "C#",
    role: "LENGUAJE",
    desc: "Lógica de jugabilidad robusta, arquitectura ECS y comportamientos de IA.",
    color: "from-purple-500/20 to-violet-500/10",
    border: "group-hover:border-purple-500/50",
    iconKey: "csharp"
  },
  {
    name: "C++ & Utilería",
    role: "UTILIDAD",
    desc: "Herramientas internas de build, optimización de memoria y scripts nativos.",
    color: "from-cyan-500/20 to-blue-500/10",
    border: "group-hover:border-cyan-500/50",
    iconKey: "tools"
  },
  {
    name: "Blender",
    role: "ARTE 3D",
    desc: "Modelado low-poly, texturizado estilizado y animación de personajes.",
    color: "from-orange-500/20 to-amber-500/10",
    border: "group-hover:border-orange-500/50",
    iconKey: "blender"
  },
  {
    name: "Aseprite",
    role: "PIXEL ART",
    desc: "Diseño de sprites cuadro por cuadro, paletas retro y animaciones fluidas.",
    color: "from-yellow-500/20 to-orange-500/10",
    border: "group-hover:border-yellow-500/50",
    iconKey: "aseprite"
  },
  {
    name: "FMOD",
    role: "AUDIO",
    desc: "Banda sonora reactiva, paisajismo acústico espacial y efectos de impacto.",
    color: "from-red-500/20 to-rose-500/10",
    border: "group-hover:border-red-500/50",
    iconKey: "fmod"
  },
  {
    name: "Git",
    role: "CONTROL",
    desc: "Flujo colaborativo GitFlow, gestión de versiones y LFS para assets pesados.",
    color: "from-rose-500/20 to-pink-500/10",
    border: "group-hover:border-rose-500/50",
    iconKey: "git"
  },
  {
    name: "Shader Graph",
    role: "SHADERS",
    desc: "Efectos visuales volumétricos, distorsiones retro y shaders de agua/cristal.",
    color: "from-emerald-500/20 to-teal-500/10",
    border: "group-hover:border-emerald-500/50",
    iconKey: "shader"
  },
  {
    name: "Steam SDK",
    role: "PLATAFORMA",
    desc: "Logros, guardado en la nube Steam Cloud, leaderboards y multijugador.",
    color: "from-sky-500/20 to-blue-500/10",
    border: "group-hover:border-sky-500/50",
    iconKey: "steam"
  }
];

export const gamesCatalog = [
  {
    id: "cyberphantom",
    title: "CyberPhantom: Protocol 0",
    year: "2024",
    price: "$19.99 USD",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=700&q=80",
    badges: ["PC", "En Stock", "Edición de Lujo"],
    description: "Infiltración táctica en una metrópolis controlada por megacorporaciones corrompidas.",
    tags: ["Acción", "Sigilo", "Cyberpunk"],
    rating: "9.2/10"
  },
  {
    id: "runeblade",
    title: "Rune Blade: Legacy",
    year: "2024",
    price: "$14.99 USD",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=700&q=80",
    badges: ["PC", "En Stock", "Edición Estándar"],
    description: "RPG táctico por turnos donde runas ancestrales desatan combos demoledores.",
    tags: ["RPG", "Estrategia", "Fantasía"],
    rating: "8.9/10"
  },
  {
    id: "neon-abyss",
    title: "Neon Horizon: Rebirth",
    year: "2023",
    price: "$18.50 USD",
    image: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=700&q=80",
    badges: ["PC", "En Stock", "Edición de Lujo"],
    description: "Roguelike vertiginoso en mazmorras neón procedurales con armas combinables alocadas.",
    tags: ["Roguelike", "Pixel Art", "Arcade"],
    rating: "9.5/10"
  },
  {
    id: "void-walker",
    title: "Void Walker: Deep Space",
    year: "2023",
    price: "$24.99 USD",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=700&q=80",
    badges: ["PC", "En Stock", "Coleccionista"],
    description: "Sobrevive a bordo de una nave espacial a la deriva mientras una anomalía cuántica la desgasta.",
    tags: ["Terror Sci-Fi", "Supervivencia", "3D"],
    rating: "9.1/10"
  }
];

export const gamesInProgress = [
  {
    id: "kinetic-drift",
    title: "Kinetic Drift",
    genre: "Anti-Gravity Racing / Synthwave",
    progress: 75,
    statusText: "EN PRODUCCIÓN ACTIVA",
    phase: "Beta Testing y Balance de Físicas",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=700&q=80",
    desc: "Carreras anti-gravedad a más de 800 km/h en pistas que serpentean entre rascacielos flotantes."
  },
  {
    id: "chronos-fall",
    title: "Chronos Fall",
    genre: "Action Roguelite / Manipulación Temporal",
    progress: 45,
    statusText: "EN PRODUCCIÓN ACTIVA",
    phase: "Implementación de IA de Jefes & Nivel 4",
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=700&q=80",
    desc: "Rebobina el tiempo 5 segundos para esquivar ataques letales y cooperar con tus propios clones pasados."
  },
  {
    id: "project-nebula",
    title: "Project Nebula",
    genre: "Exploración Cósmica / Narrativa 2D",
    progress: 25,
    statusText: "PRE-PRODUCCIÓN ACTIVA",
    phase: "Prototipado de mecánicas y Concept Art",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=700&q=80",
    desc: "Repara satélites en soledad mientras interceptas transmisiones de civilizaciones olvidadas."
  }
];

export const bestSellerGame = {
  title: "Neon Horizon: Rebirth",
  subtitle: "Nuestro mayor hito indie hasta la fecha",
  stat1: "+85,000 Copias Vendidas",
  stat2: "96% Calificación Positiva en Steam",
  stat3: "Ganador 'Mejor Arte y Música' Indie Showcase",
  description: "Una experiencia frenética alabada por la crítica por su impecable control, banda sonora chiptune-electro y alta rejugabilidad.",
  image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80"
};

export const gameJamPrototypes = [
  {
    id: "jam-1",
    num: "Game 1",
    title: "Resonance: Dark Echoes",
    desc: "Exploración de sonido en cavernas oscuras donde el audio es el único sistema de navegación disponible.",
    tags: ["Exploración", "Audio"],
    event: "Global Game Jam 2024",
    demoPlayable: true
  },
  {
    id: "jam-2",
    num: "Game 2",
    title: "Shift Matrix",
    desc: "Puzzle de física antigravitatoria creado en 48 horas. Rota salas enteras para resolver acertijos mecánicos.",
    tags: ["Puzzle", "Física"],
    event: "Ludum Dare 54",
    demoPlayable: true
  },
  {
    id: "jam-3",
    num: "Game 3",
    title: "Glitch Samurai",
    desc: "Combate de reflejos donde los fotogramas congelados revelan las debilidades del enemigo en tiempo real.",
    tags: ["Acción", "Reflejos"],
    event: "GMTK Game Jam 2023",
    demoPlayable: true
  },
  {
    id: "jam-4",
    num: "Game 4",
    title: "Overload Pulse",
    desc: "Gestión de energía y calor en una estación geotérmica colapsando durante una tormenta iónica.",
    tags: ["Estrategia", "Supervivencia"],
    event: "Indie Spain Jam",
    demoPlayable: true
  }
];

export const teamMembers = [
  {
    id: "david",
    name: "David Saldarriaga",
    role: "Lead Game Developer & Systems Architect",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
    bio: "Especialista en arquitectura de motores en C#, pipelines en Unity/Unreal y optimización de rendimiento a bajo nivel. Obsesionado con que cada input se sienta inmediato y placentero.",
    skills: ["C#", "Unity Engine", "Arquitectura ECS", "Físicas 2D/3D", "Optimización"],
    quote: "\"El mejor código es aquel que el jugador no nota pero siente en cada movimiento.\"",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      portfolio: "/Nosotros/david"
    }
  },
  {
    id: "rios",
    name: "Rios",
    role: "Art Director & 3D/Environment Artist",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
    bio: "Maestro del modelado 3D estilizado, iluminación ambiental y composición visual. Da forma a las atmósferas misteriosas y distópicas que definen la firma visual de PixelRift.",
    skills: ["Blender", "Substance Painter", "Level Design", "Shader Graph", "Lighting"],
    quote: "\"La iluminación cuenta más de la historia que diez líneas de diálogo.\"",
    socials: {
      artstation: "https://artstation.com",
      twitter: "https://x.com",
      portfolio: "/Nosotros/rios"
    }
  },
  {
    id: "estefania",
    name: "Estefania",
    role: "Lead Narrative & UI/UX Specialist",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=500&q=80",
    bio: "Diseñadora de interfaces intuitivas y universos narrativos profundos. Combina diseño centrado en el jugador con pixel art minucioso para crear menús y tramas inolvidables.",
    skills: ["Figma", "UI / UX Gaming", "Narrativa Ramificada", "Aseprite", "Worldbuilding"],
    quote: "\"La interfaz debe ser invisible; la emoción debe ser permanente.\"",
    socials: {
      behance: "https://behance.net",
      linkedin: "https://linkedin.com",
      portfolio: "/Nosotros/estefania"
    }
  }
];

export const studioValues = [
  {
    title: "Pasión & Jugabilidad Primero",
    desc: "No seguimos tendencias vacías. Diseñamos las mecánicas que nosotros mismos soñamos con jugar, puliendo el 'game feel' hasta el milisegundo.",
    icon: "gamepad"
  },
  {
    title: "Innovación Técnica & Visual",
    desc: "Aprovechamos herramientas modernas de shaders, audio procedimental y diseño sistémico para competir al más alto nivel.",
    icon: "sparkles"
  },
  {
    title: "Transparencia con la Comunidad",
    desc: "Compartimos nuestro proceso a través de devlogs abiertos, builds de prueba y comunicación sincera con nuestros jugadores.",
    icon: "users"
  }
];

export const socialChannels = [
  {
    name: "Discord",
    handle: "Comunidad PixelRift",
    desc: "Devlogs exclusivos semanales, feedback directo de versiones alpha y sorteos para testers.",
    actionText: "Unirse al Discord",
    badge: "5,400+ Miembros",
    url: "https://discord.gg",
    icon: "discord"
  },
  {
    name: "Twitter / X",
    handle: "@pixelrift_dev",
    desc: "Actualizaciones rápidas, clips de gameplay, teasers de animación y noticias del estudio.",
    actionText: "Seguir en @pixelrift",
    badge: "12.8K Seguidores",
    url: "https://x.com",
    icon: "twitter"
  },
  {
    name: "YouTube & Twitch",
    handle: "PixelRift Studios",
    desc: "Transmisiones en vivo de desarrollo, tutoriales de shaders y recapitulación de Game Jams.",
    actionText: "Suscribirse al canal",
    badge: "Transmisiones Semanales",
    url: "https://youtube.com",
    icon: "youtube"
  }
];
