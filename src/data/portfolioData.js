export const studioInfo = {
  name: "PixelRift Studios",
  tagline: "Forjando mundos donde cada píxel respira emoción.",
  mission: "Demostrar que los pequeños estudios independientes pueden crear experiencias mecánicas profundas y memorables mediante un desarrollo ágil y pulido artesanal.",
  email: "hola@pixelrift.dev",
  pressEmail: "press@pixelrift.dev",
  supportEmail: "soporte@pixelrift.dev",
  discordUrl: "https://discord.com",
  twitterUrl: "https://twitter.com",
  youtubeUrl: "https://youtube.com",
  githubUrl: "https://github.com/Juandavid1612"
};

export const featuredGame = {
  id: "GalacticDecree",
  title: "Galactic Decree",
  category: "Roguelike / Gestión",
  coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
  bannerImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1600&q=80",
  quote: "Un roguelike de gestión de recursos donde cada decreto cuenta para mantener con vida a tu reino espacial.",
  steamUrl: "https://store.steampowered.com",
  tags: ["Roguelike", "Gestión", "Estrategia"]
};

// 1. EN DESARROLLO (Mil Gatitos y Tessera)
export const gamesInProgress = [
  {
    id: "Milgatitos",
    title: "Mil Gatitos",
    genre: "Plataformero",
    progress: 65,
    statusText: "EN PRODUCCIÓN ACTIVA",
    phase: "Diseño de Niveles & Animación 2D",
    desc: "Aventura de plataformas adorable donde debes rescatar a mil felinos perdidos en mundos oníricos.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "Tessera",
    title: "Tessera: Ancient Rome",
    genre: "Estrategia",
    progress: 40,
    statusText: "FASE DE PLAYTESTING",
    phase: "Balance de Mecánicas y UI",
    desc: "Juego de dados tipo Yahtzee por turnos ambientado en la antigua Roma con cartas modificadoras y apuestas.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80"
  }
];

// 2. TODOS NUESTROS JUEGOS
export const gamesCatalog = [
  {
    id: "Milgatitos",
    title: "Mil Gatitos",
    category: "Plataformero",
    description: "Plataformero dinámico con físicas fluidas y un centenar de secretos por descubrir.",
    year: "2024",
    price: "$12.99 USD",
    badges: ["PC / WebGL", "En Stock", "Plataformero"],
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    tags: ["Plataformero"]
  },
  {
    id: "Tessera",
    title: "Tessera: Ancient Rome",
    category: "Estrategia",
    description: "Juego de dados por turnos tipo Yahtzee en la antigua Roma con cartas modificadoras y apuestas.",
    year: "2024",
    price: "$9.99 USD",
    badges: ["PC / WebGL", "Estrategia", "Dados"],
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    tags: ["Estrategia"]
  },
  {
    id: "GalacticDecree",
    title: "Galactic Decree",
    category: "Roguelike",
    description: "Roguelike de gestión de recursos donde intentas mantener tu reino con vida la mayor cantidad de tiempo posible.",
    year: "2023",
    price: "$18.50 USD",
    badges: ["PC / WebGL", "Roguelike", "Gestión"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    tags: ["Roguelike"]
  }
];

// 3. JUEGO MÁS ESPERADO (Mil Gatitos)
export const bestSellerGame = {
  id: "Milgatitos",
  title: "Mil Gatitos",
  description: "Nuestra próxima gran apuesta independiente. Un plataformas lleno de carisma, arte dibujado a mano y retos mecánicos memorables que cautivará a toda la comunidad.",
  stat1: "+50,000 Listas de Deseos en Steam",
  stat2: "Lanzamiento Global Q3 2025",
  image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80"
};

// 4. PROTOTIPOS / GAME JAM (Masquerade Dance)
export const gameJamPrototypes = [
  {
    id: "MasqueradeDance",
    num: "Jam 01",
    title: "Masquerade Dance",
    event: "Global Game Jam 2025",
    desc: "Juego de terror y misterio en el que debes investigar e investigar una oscura escena del crimen oculta tras un baile de máscaras.",
    tags: ["Terror", "Investigación", "48h"]
  }
];

export const teamMembers = [
  {
    id: "david",
    name: "Juan David",
    role: "Lead Gameplay & Systems Developer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    bio: "Especialista en programación C# en Unity, físicas personalizadas, árboles de comportamiento de IA y optimización de rendimiento.",
    skills: ["Unity", "C#", "DOTween", "Cinemachine", "URP", "Git"]
  },
  {
    id: "rios",
    name: "Ríos",
    role: "3D Environment & Technical Artist",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    bio: "Apasionado por la dirección artística, modelado hard-surface en Blender, shaders personalizados y post-procesado visual.",
    skills: ["Blender", "Substance Painter", "HLSL Shaders", "Iluminación", "Maya"]
  },
  {
    id: "estefania",
    name: "Estefanía",
    role: "UX/UI Designer & Narrative Lead",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
    bio: "Encargada de la experiencia de usuario, wireframes en Figma, diseño de interfaces adaptables y flujos narrativos con Fungus.",
    skills: ["Figma", "React", "Tailwind CSS", "Fungus", "Diseño UI/UX"]
  }
];

export const studioValues = [
  {
    title: "Jugabilidad Primero",
    desc: "Priorizamos un control ultra responsivo y mecánicas divertidas por encima de cualquier otro apartado."
  },
  {
    title: "Pasión Artesanal",
    desc: "Cada shader, línea de diálogo y píxel es pulido minuciosamente por nuestro equipo independiente."
  },
  {
    title: "Comunidad Activa",
    desc: "Involucramos a los jugadores desde las primeras fases de prototipado mediante playtests abiertos."
  }
];

export const socialChannels = [
  {
    name: "Servidor Discord",
    handle: "@pixelrift-devs",
    desc: "Únete a nuestra comunidad para debatir sobre desarrollo, participar en playtests y hablar con los creadores.",
    badge: "15K+ MIEMBROS",
    url: "https://discord.com",
    actionText: "Unirme al servidor"
  },
  {
    name: "Twitter / X",
    handle: "@PixelRiftGames",
    desc: "GIFs diarios de desarrollo, vistazos al código, arte conceptual y anuncios de lanzamientos.",
    badge: "ACTIVO DIARIO",
    url: "https://twitter.com",
    actionText: "Seguir en Twitter"
  },
  {
    name: "Canal de YouTube",
    handle: "@PixelRiftStudios",
    desc: "Devlogs en profundidad, tutoriales de optimización en Unity y trailers cinemáticos oficiales.",
    badge: "ESTRENOS HD",
    url: "https://youtube.com",
    actionText: "Suscribirme"
  }
];

export const techStack = [
  { name: "Unity 2022.3", role: "Motor Principal", iconKey: "unity", desc: "Plataforma core para el desarrollo de nuestros juegos en PC y WebGL." },
  { name: "C# Scripting", role: "Lógica & Sistemas", iconKey: "csharp", desc: "Programación robusta de mecánicas, interfaces y sistemas de guardado." },
  { name: "React 19", role: "Web & Portafolio", iconKey: "react", desc: "Estructura frontend modular para nuestra web interactiva y portafolios." },
  { name: "Tailwind CSS", role: "Estilos & Diseño", iconKey: "tailwind", desc: "Sistema de diseño adaptable para móvil, tablet y escritorio." },
  { name: "Blender 3D", role: "Modelado & Assets", iconKey: "blender", desc: "Modelado 3D de entornos, personajes y props optimizados." },
  { name: "Autodesk Maya", role: "Rigging & Animación", iconKey: "maya", desc: "Esqueletos y animaciones fluidas para enemigos y protagonistas." },
  { name: "Git & GitHub", role: "Control de Versiones", iconKey: "github", desc: "Gestión colaborativa de código y despliegue continuo." },
  { name: "Figma", role: "Prototipado UI/UX", iconKey: "figma", desc: "Diseño de wireframes en alta fidelidad y flujos de usuario." },
  { name: "Adobe Premiere", role: "Edición Audiovisual", iconKey: "premiere", desc: "Montaje de trailers oficiales y clips promocionales para redes." },
  { name: "DOTween", role: "Animación UI", iconKey: "dotween", desc: "Librería de interpolación fluida para interfaces y menús." }
];