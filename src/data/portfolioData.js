// Data for Noisy Studios Gaming Portfolio
import galacticDecreeImg from "../assets/GalacticDecree.jpeg";
import milGatitosImg from "../assets/MilGatitos.jpeg";
import tesseraImg from "../assets/Tessera.jpeg";
import davidPhoto from "../assets/Foto David (2).jpeg";

export const studioInfo = {
  name: "Noisy Studios",
  studioAlt: "Noisy Studios",
  tagline: "Forjando experiencias interactivas memorables con pasión indie, arte minucioso y tecnología de vanguardia.",
  description: "Estudio independiente formado por estudiantes universitarios (David Saldarriaga, Estefania Aristizabal y Juan David Rios), enfocado en mecánicas de juego profundas, dirección de arte inmersiva y narrativas que conectan emocionalmente con los jugadores.",
  mission: "Creemos que los videojuegos son el arte más completo de nuestra era. Noisy Studios nació para demostrar que equipos pequeños y enfocados pueden crear experiencias que compiten en innovación y emoción. Cada proyecto es una obsesión colectiva.",
  email: "hola@noisystudios.dev",
  pressEmail: "press@noisystudios.dev",
  supportEmail: "support@noisystudios.dev",
  discordUrl: "https://discord.gg/noisystudios",
  twitterUrl: "https://x.com/noisystudios_dev",
  youtubeUrl: "https://youtube.com/@noisystudios",
  steamUrl: "https://store.steampowered.com",
  githubUrl: "https://github.com",
};

// 1. Featured Game: Galactic Decree (only single image, playable in browser)
export const featuredGame = {
  id: "galactic-decree",
  title: "Galactic Decree",
  category: "Estrategia - COMBATE ESPACIAL - UNITY 3D",
  genre: "Estrategia & Simulación Espacial",
  year: "2024",
  rating: "+100 Jugadores",
  tags: ["2024", "Unity WebGL", "Estrategia", "Playable"],
  coverImage: galacticDecreeImg,
  image: galacticDecreeImg,
  bannerImage: galacticDecreeImg,
  buildPath: "Builds/GalacticDecree/index.html",
  quote: "Una odisea táctica donde el mando estelar exige decisiones estratégicas rápidas para preservar el orden cósmico.",
  description: "Toma el mando en un conflicto estelar táctico. Toma decisiones que alteran el equilibrio diplomático y militar de la galaxia en esta experiencia desarrollada en Unity por estudiantes de Noisy Studios.",
  price: "Gratis en Navegador",
  isPlayable: true
};

// 2. The 3 real games of Noisy Studios
export const gamesCatalog = [
  {
    id: "galactic-decree",
    title: "Galactic Decree",
    year: "2024",
    price: "Gratis WebGL",
    image: galacticDecreeImg,
    coverImage: galacticDecreeImg,
    buildPath: "Builds/GalacticDecree/index.html",
    badges: ["PC WebGL", "Playable", "Proyecto Universitario"],
    description: "Estrategia y combate espacial donde el jugador toma decisiones críticas que alteran el equilibrio galáctico.",
    tags: ["Estrategia", "Espacial", "Unity 3D"],
    rating: "+100 Jugadores",
    isPlayable: true
  },
  {
    id: "mil-gatitos",
    title: "Mil Gatitos",
    year: "2024",
    price: "Gratis WebGL",
    image: milGatitosImg,
    coverImage: milGatitosImg,
    buildPath: "Builds/Milgatitos/index.html",
    badges: ["PC WebGL", "Playable", "Proyecto Universitario"],
    description: "Experiencia interactiva y dinámica con cientos de gatitos simultáneos en pantalla con físicas lúdicas.",
    tags: ["Aventura", "Casual", "Unity"],
    rating: "+100 Descargas",
    isPlayable: true
  },
  {
    id: "tessera",
    title: "Tessera",
    year: "2024",
    price: "Gratis WebGL",
    image: tesseraImg,
    coverImage: tesseraImg,
    buildPath: "Builds/Tessera/index.html",
    badges: ["PC WebGL", "Playable", "Proyecto Universitario"],
    description: "Puzzles y mecánicas espaciales basadas en geometría, perspectiva y resolución lógica de laberintos.",
    tags: ["Puzzle", "Geometría", "Unity"],
    rating: "+100 Partidas",
    isPlayable: true
  }
];

export const gamesInProgress = [
  {
    id: "galactic-decree-update",
    title: "Galactic Decree: Expansión de Flota",
    genre: "Estrategia Espacial / Unity",
    progress: 80,
    statusText: "EN DESARROLLO ACTIVO",
    phase: "Balance de Unidades y Nuevas Misiones",
    image: galacticDecreeImg,
    buildPath: "Builds/GalacticDecree/index.html",
    desc: "Ampliación de batallas tácticas y nuevos sistemas de comando estelar.",
    isPlayable: true
  },
  {
    id: "mil-gatitos-update",
    title: "Mil Gatitos: Modo Desafío",
    genre: "Aventura Casual / Físicas",
    progress: 65,
    statusText: "EN DESARROLLO ACTIVO",
    phase: "Nuevas Interacciones y Animaciones",
    image: milGatitosImg,
    buildPath: "Builds/Milgatitos/index.html",
    desc: "Añadiendo modos contra reloj y eventos dinámicos en la simulación.",
    isPlayable: true
  },
  {
    id: "tessera-update",
    title: "Tessera: Nuevos Niveles",
    genre: "Puzzle & Perspectiva / Lógica",
    progress: 50,
    statusText: "EN DESARROLLO ACTIVO",
    phase: "Diseño de Rompecabezas Complejos",
    image: tesseraImg,
    buildPath: "Builds/Tessera/index.html",
    desc: "Incorporación de mecánicas de rotación tridimensional en laberintos.",
    isPlayable: true
  }
];

export const bestSellerGame = {
  title: "Galactic Decree",
  subtitle: "Nuestro proyecto universitario insignia",
  stat1: "+100 Descargas",
  stat2: "+100 Jugadores",
  stat3: "Desarrollado en Unity WebGL",
  description: "Proyecto destacado del estudio desarrollado por el equipo de Noisy Studios, optimizado para ejecutarse de forma fluida directamente en tu navegador.",
  image: galacticDecreeImg,
  buildPath: "Builds/GalacticDecree/index.html",
  isPlayable: true
};

export const gameJamPrototypes = [
  {
    id: "jam-1",
    num: "Juego 1",
    title: "Galactic Decree",
    desc: "Estrategia espacial nacida como prototipo de exploración táctica y mecánicas de mando.",
    tags: ["Estrategia", "Unity WebGL"],
    event: "Proyecto Noisy Studios",
    image: galacticDecreeImg,
    buildPath: "Builds/GalacticDecree/index.html",
    demoPlayable: true
  },
  {
    id: "jam-2",
    num: "Juego 2",
    title: "Mil Gatitos",
    desc: "Simulación dinámica de físicas y cientos de entidades en pantalla.",
    tags: ["Físicas", "Casual"],
    event: "Proyecto Noisy Studios",
    image: milGatitosImg,
    buildPath: "Builds/Milgatitos/index.html",
    demoPlayable: true
  },
  {
    id: "jam-3",
    num: "Juego 3",
    title: "Tessera",
    desc: "Rompecabezas geométrico de perspectiva espacial y resolución lógica.",
    tags: ["Puzzle", "Geometría"],
    event: "Proyecto Noisy Studios",
    image: tesseraImg,
    buildPath: "Builds/Tessera/index.html",
    demoPlayable: true
  }
];

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
    desc: "Pipeline de renderizado e iluminación avanzada para proyectos experimentales.",
    color: "from-slate-500/20 to-zinc-500/10",
    border: "group-hover:border-cyan-400/50",
    iconKey: "unreal"
  },
  {
    name: "C#",
    role: "LENGUAJE",
    desc: "Lógica de jugabilidad robusta, arquitectura ECS y comportamientos.",
    color: "from-purple-500/20 to-violet-500/10",
    border: "group-hover:border-purple-500/50",
    iconKey: "csharp"
  },
  {
    name: "C++ & Utilería",
    role: "UTILIDAD",
    desc: "Herramientas de optimización de memoria y scripts de desarrollo.",
    color: "from-cyan-500/20 to-blue-500/10",
    border: "group-hover:border-cyan-500/50",
    iconKey: "tools"
  },
  {
    name: "Blender",
    role: "ARTE 3D",
    desc: "Modelado low-poly, texturizado estilizado y animación de modelos.",
    color: "from-orange-500/20 to-amber-500/10",
    border: "group-hover:border-orange-500/50",
    iconKey: "blender"
  },
  {
    name: "Aseprite",
    role: "PIXEL ART",
    desc: "Diseño de sprites, paletas retro y texturas 2D.",
    color: "from-yellow-500/20 to-orange-500/10",
    border: "group-hover:border-yellow-500/50",
    iconKey: "aseprite"
  },
  {
    name: "FMOD",
    role: "AUDIO",
    desc: "Banda sonora reactiva y paisajismo sonoro.",
    color: "from-red-500/20 to-rose-500/10",
    border: "group-hover:border-red-500/50",
    iconKey: "fmod"
  },
  {
    name: "Git",
    role: "CONTROL",
    desc: "Gestión colaborativa de código y control de versiones del equipo.",
    color: "from-rose-500/20 to-pink-500/10",
    border: "group-hover:border-rose-500/50",
    iconKey: "git"
  },
  {
    name: "Shader Graph",
    role: "SHADERS",
    desc: "Efectos visuales de iluminación y materiales en tiempo real.",
    color: "from-emerald-500/20 to-teal-500/10",
    border: "group-hover:border-emerald-500/50",
    iconKey: "shader"
  },
  {
    name: "Steam & WebGL",
    role: "PLATAFORMA",
    desc: "Compilación optimizada WebGL para ejecución inmediata en navegadores.",
    color: "from-sky-500/20 to-blue-500/10",
    border: "group-hover:border-sky-500/50",
    iconKey: "steam"
  }
];

export const teamMembers = [
  {
    id: "david",
    name: "David Saldarriaga",
    isOwner: true,
    ownerBadge: "Dueño & Co-Fundador",
    role: "Dueño & Co-Fundador • Lead Game Developer & Systems Architect",
    avatar: davidPhoto,
    bio: "Dueño y Co-Fundador de Noisy Studios. Estudiante universitario especializado en arquitectura en C#, programación de físicas en Unity y compilaciones WebGL para navegador.",
    skills: ["C#", "Unity Engine", "Arquitectura ECS", "Físicas 2D/3D", "WebGL Optimization", "Git"],
    quote: "\"El mejor código es aquel que el jugador no nota pero siente en cada movimiento.\"",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      portfolio: "/Nosotros/david"
    }
  },
  {
    id: "estefania",
    name: "Estefania Aristizabal",
    isOwner: true,
    ownerBadge: "Dueña & Co-Fundadora",
    role: "Dueña & Co-Fundadora • Lead Narrative & UI/UX Specialist",
    avatar: "", // Placeholder as requested
    bio: "Dueña y Co-Fundadora de Noisy Studios. Estudiante universitaria enfocada en diseño de interfaces limpias, pixel art e historias que enriquecen los tres juegos del estudio.",
    skills: ["Figma", "UI / UX Gaming", "Narrativa Ramificada", "Aseprite", "Worldbuilding", "Diseño de Sistemas"],
    quote: "\"La interfaz debe ser invisible; la emoción debe ser permanente.\"",
    socials: {
      behance: "https://behance.net",
      linkedin: "https://linkedin.com",
      portfolio: "/Nosotros/estefania"
    }
  },
  {
    id: "rios",
    name: "Juan David Rios",
    isOwner: true,
    ownerBadge: "Dueño & Co-Fundador",
    role: "Dueño & Co-Fundador • Art Director & 3D/Environment Artist",
    avatar: "", // Placeholder as requested
    bio: "Dueño y Co-Fundador de Noisy Studios. Estudiante universitario y creador del arte tridimensional, modelado en Blender e iluminación volumétrica de nuestros proyectos.",
    skills: ["Blender", "Substance Painter", "Level Design", "Shader Graph", "Lighting", "Composición Visual"],
    quote: "\"La iluminación cuenta más de la historia que diez líneas de diálogo.\"",
    socials: {
      artstation: "https://artstation.com",
      twitter: "https://x.com",
      portfolio: "/Nosotros/rios"
    }
  }
];

export const studioValues = [
  {
    title: "Pasión & Jugabilidad Primero",
    desc: "Como equipo universitario, creamos las experiencias que nosotros mismos soñamos con jugar, puliendo la respuesta y el game feel.",
    icon: "gamepad"
  },
  {
    title: "Innovación Técnica en WebGL",
    desc: "Optimizamos cada proyecto para que cualquier jugador pueda disfrutarlo al instante en su navegador sin instalaciones pesadas.",
    icon: "sparkles"
  },
  {
    title: "Desarrollo Colaborativo y Transparente",
    desc: "Compartimos nuestro proceso de aprendizaje y recibimos con entusiasmo las sugerencias de la comunidad universitaria.",
    icon: "users"
  }
];

export const socialChannels = [
  {
    name: "Discord",
    handle: "Comunidad Noisy Studios",
    desc: "Comunidad oficial de Noisy Studios, playtests y feedback directo con los desarrolladores.",
    actionText: "Unirse al Discord",
    badge: "Comunidad Activa",
    url: "https://discord.gg/noisystudios",
    icon: "discord"
  },
  {
    name: "Twitter / X",
    handle: "@noisystudios_dev",
    desc: "Avances rápidos de desarrollo de Galactic Decree, Mil Gatitos y Tessera.",
    actionText: "Seguir en @noisystudios",
    badge: "Actualizaciones",
    url: "https://x.com/noisystudios_dev",
    icon: "twitter"
  },
  {
    name: "YouTube & Twitch",
    handle: "Noisy Studios Oficial",
    desc: "Demostraciones de jugabilidad y devlogs de nuestros proyectos universitarios.",
    actionText: "Suscribirse al canal",
    badge: "Demostraciones",
    url: "https://youtube.com/@noisystudios",
    icon: "youtube"
  }
];