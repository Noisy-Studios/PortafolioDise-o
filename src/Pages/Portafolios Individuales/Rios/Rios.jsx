import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Gamepad2, 
  Code2, 
  Cpu, 
  Smartphone, 
  GitBranch, 
  Trophy, 
  GraduationCap, 
  Languages, 
  Terminal, 
  ArrowRight, 
  CheckCircle2,
  MapPin,
  Calendar,
  ExternalLink,
  Download,
  X,
  Briefcase,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Wrench,
  Play
} from "lucide-react";
import { teamMembers } from "../../../data/portfolioData";

// Importación de imágenes desde assets
import milGatitosImg from "../../../assets/MilGatitos.jpeg";
import tesseraImg from "../../../assets/Tessera.jpeg";
import strandedImg from "../../../assets/stranded.jpeg";
import riosFoto from "../../../assets/rios foto.jpg";

export function Rios() {
  const member = teamMembers.find((person) => person.id === "rios") ?? teamMembers[2];
  
  // Estados interactivos
  const [activeTab, setActiveTab] = useState("gameplay");
  const [activePipelineStep, setActivePipelineStep] = useState(2); // Por defecto Development
  const [selectedProject, setSelectedProject] = useState(null);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [isPlayingMuseo, setIsPlayingMuseo] = useState(false);

  // Orden de pestañas para el carrusel 3D
  const tabKeys = ["gameplay", "ai", "mobile", "tools"];
  const currentIndex = tabKeys.indexOf(activeTab);

  const handleNextTab = () => {
    const nextIndex = (currentIndex + 1) % tabKeys.length;
    setActiveTab(tabKeys[nextIndex]);
  };

  const handlePrevTab = () => {
    const prevIndex = (currentIndex - 1 + tabKeys.length) % tabKeys.length;
    setActiveTab(tabKeys[prevIndex]);
  };

  // Función para copiar correo
  const handleCopyEmail = () => {
    navigator.clipboard.writeText("juandavidriossanchez11@gmail.com");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2500);
  };

  // Mapeo de íconos específicos por categoría
  const getTabIcon = (key, className = "w-6 h-6") => {
    switch (key) {
      case "gameplay":
        return <Gamepad2 className={className} />;
      case "ai":
        return <Cpu className={className} />;
      case "mobile":
        return <Smartphone className={className} />;
      case "tools":
        return <Wrench className={className} />;
      default:
        return <Gamepad2 className={className} />;
    }
  };

  // Datos dinámicos para el Dashboard central de habilidades
  const dashboardData = {
    gameplay: {
      title: "GAMEPLAY & SYSTEMS",
      subtitle: "Unity Game Engine & C# Architecture",
      tag: "CORE SYSTEMS",
      stats: [
        { label: "Game Systems", value: 90 },
        { label: "2D / 3D Development", value: 85 },
        { label: "AI & Behavior Trees", value: 75 },
        { label: "Performance & Optimization", value: 70 },
      ],
      skillsBreakdown: [
        { name: "Player Mechanics", level: 95 },
        { name: "UI / UX", level: 80 },
        { name: "Level Design", level: 75 },
        { name: "Systems Design", level: 70 },
        { name: "Balancing", level: 60 },
      ],
      description: "Desarrollo de sistemas lógicos limpios en C#, arquitectura orientada a componentes y game loops fluidos en Unity."
    },
    ai: {
      title: "AI BEHAVIORS & LOGIC",
      subtitle: "Finite State Machines & Pathfinding",
      tag: "INTELLIGENCE",
      stats: [
        { label: "Behavior Trees", value: 88 },
        { label: "NavMesh Pathfinding", value: 85 },
        { label: "State Machines", value: 90 },
        { label: "Sensor Systems", value: 80 },
      ],
      skillsBreakdown: [
        { name: "Monster AI (Stranded)", level: 90 },
        { name: "Patrol & Vision Cones", level: 85 },
        { name: "Decision Making", level: 80 },
        { name: "Dynamic Reactions", level: 75 },
        { name: "Performance Scaling", level: 70 },
      ],
      description: "Implementación de inteligencias artificiales con patrones de conducta dinámicos para enemigos y entidades autónomas."
    },
    mobile: {
      title: "MOBILE & WEBGL BUILDS",
      subtitle: "Multiplatform Optimization & Touch Input",
      tag: "MULTIPLATFORM",
      stats: [
        { label: "Android SDK / APK", value: 92 },
        { label: "WebGL Builds", value: 95 },
        { label: "Touch Controls", value: 88 },
        { label: "Memory Footprint", value: 82 },
      ],
      skillsBreakdown: [
        { name: "Roguelike Mechanics (Yahtzee)", level: 95 },
        { name: "UI Scaling & Resolution", level: 90 },
        { name: "Asset Bundles", level: 80 },
        { name: "Input Handling", level: 85 },
        { name: "Build Pipeline", level: 88 },
      ],
      description: "Adaptación de experiencias táctiles para dispositivos móviles Android y compilaciones web ultrarrápidas."
    },
    tools: {
      title: "TOOLS & COLLABORATION",
      subtitle: "Git, Scrum & Pipeline Management",
      tag: "WORKFLOW",
      stats: [
        { label: "Git & GitHub", value: 90 },
        { label: "Scrum / Agile", value: 85 },
        { label: "Autodesk Maya / Python", value: 75 },
        { label: "Adobe Premiere", value: 80 },
      ],
      skillsBreakdown: [
        { name: "Version Control", level: 92 },
        { name: "Team Workflow", level: 88 },
        { name: "Scripting Tools", level: 80 },
        { name: "Documentation", level: 85 },
        { name: "Debugging", level: 90 },
      ],
      description: "Gestión de código colaborativo, control de versiones robusto y flujos de trabajo eficientes en equipo."
    }
  };

  // 5 Etapas del Pipeline de Desarrollo
  const pipelineStages = [
    {
      id: 0,
      title: "1. CONCEPT",
      subtitle: "Ideas & Prototypes",
      desc: "Core mechanics ideation, conceptual paper design, and rapid prototyping in Unity to validate core game fun and loop viability."
    },
    {
      id: 1,
      title: "2. DESIGN",
      subtitle: "Mechanics & Systems",
      desc: "C# gameplay systems design, class architecture structuring, flowcharts configuration, and UI/UX user experience layout."
    },
    {
      id: 2,
      title: "3. DEVELOPMENT",
      subtitle: "Programming & Integration",
      desc: "Unity script implementation, AI behavior programming, physics tuning, 3D asset integration, and persistence save systems."
    },
    {
      id: 3,
      title: "4. TESTING",
      subtitle: "Iterative Polish & Balance",
      desc: "Heavy reliance on iterative testing: the design, development, and testing loop repeats continuously throughout development to refine mechanics, eliminate bugs, and polish visual/audio feedback."
    },
    {
      id: 4,
      title: "5. RELEASE",
      subtitle: "Publish & Support",
      desc: "Packaging and target platform optimization (Steam, Android, and WebGL), build preparation, and post-launch player support."
    }
  ];

  // Tarjetas de proyectos
  const featuredProjects = [
    {
      id: "1000-kittens",
      title: "1.000 KITTENS",
      subtitle: "Lead Gameplay Programmer",
      image: milGatitosImg,
      description: "Responsable de la programación completa de físicas 2D en Unity, controladores de movimiento del personaje y gestión de instancias simultáneas optimizadas para Steam.",
      tech: ["Unity Engine", "C# Physics", "Input Management", "Desktop Build"],
      platform: "Steam & WebGL",
      link: "/juegos"
    },
    {
      id: "stranded",
      title: "STRANDED",
      subtitle: "AI & Systems Developer",
      image: strandedImg,
      description: "Encargado de programar la inteligencia artificial de los monstruos mediante árboles de comportamiento, sistemas de visión/audición y mecánicas de terror atmosférico en 3D.",
      tech: ["Unity 3D", "Behavior Trees", "Raycasting", "Audio Triggers"],
      platform: "Steam (En Desarrollo)",
      link: "/juegos"
    },
    {
      id: "yahtzee-roguelike",
      title: "YAHTZEE ROGUELIKE",
      subtitle: "Mobile Gameplay Developer",
      image: tesseraImg,
      description: "Diseño y desarrollo en C# de la lógica de tirada de dados, sistema de cartas modificadoras tipo roguelike y adaptación de la interfaz táctil para dispositivos móviles Android.",
      tech: ["Unity Mobile", "Android SDK", "DOTween UI", "State Machine"],
      platform: "Android / WebGL",
      link: "/juegos"
    }
  ];

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black pt-28 md:pt-36 pb-20">
      
      {/* Contenedor Principal HUD */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6">

        {/* SECCIÓN 1: PERFIL */}
        <section id="perfil" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 bg-[#0c1021] border border-cyan-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-xl bg-[#141b34] border-2 border-cyan-500/40 overflow-hidden shrink-0 shadow-lg relative group">
                <img
                  src={riosFoto}
                  alt="Juan David Ríos"
                  className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/40 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-black/70 text-cyan-300 font-mono text-[9px] border border-cyan-500/30">
                  DEV // 04
                </span>
              </div>

              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
                    JUAN DAVID RÍOS
                  </h1>
                  <span className="text-cyan-400">⚡</span>
                </div>

                <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-gray-400">
                  <span className="flex items-center gap-1 text-cyan-300">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" /> Medellín, Colombia
                  </span>
                  <span className="flex items-center gap-1 text-purple-300">
                    <Calendar className="w-3.5 h-3.5 text-purple-400" /> Born: 2004-11-26
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed pt-2">
                  Unity Developer with 4+ years of experience developing games with C#. Experienced in gameplay systems, AI behaviors, and mobile and desktop game development. Published multiple games on Steam and developed mobile games for Android.
                </p>
              </div>
            </div>

            <div className="pt-5 mt-5 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-xs">
              <div className="p-2 rounded-lg bg-[#121932] border border-white/5 flex items-center gap-2 text-cyan-300">
                <Gamepad2 className="w-4 h-4 text-cyan-400" /> Unity Engine
              </div>
              <div className="p-2 rounded-lg bg-[#121932] border border-white/5 flex items-center gap-2 text-purple-300">
                <Code2 className="w-4 h-4 text-purple-400" /> Gameplay Programming
              </div>
              <div className="p-2 rounded-lg bg-[#121932] border border-white/5 flex items-center gap-2 text-pink-300">
                <Cpu className="w-4 h-4 text-pink-400" /> AI Behaviors
              </div>
              <div className="p-2 rounded-lg bg-[#121932] border border-white/5 flex items-center gap-2 text-amber-300">
                <Smartphone className="w-4 h-4 text-amber-400" /> Mobile (Android)
              </div>
              <div className="p-2 rounded-lg bg-[#121932] border border-white/5 flex items-center gap-2 text-emerald-300">
                <GitBranch className="w-4 h-4 text-emerald-400" /> Git & GitHub
              </div>
              <div className="p-2 rounded-lg bg-[#121932] border border-white/5 flex items-center gap-2 text-sky-300">
                <Terminal className="w-4 h-4 text-sky-400" /> Scrum
              </div>
            </div>
          </div>

          <div id="experiencia" className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#0c1021] border border-cyan-500/30 rounded-2xl p-5 shadow-xl flex flex-col justify-between space-y-4">
              <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                <Briefcase className="w-5 h-5 text-cyan-400" />
                <h2 className="font-bold text-sm tracking-widest text-white font-mono uppercase">EXPERIENCE</h2>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div>
                  <div className="font-bold text-cyan-300">Indie Game Developer, Noisy Studios</div>
                  <div className="text-[11px] text-gray-400">2026 - Present</div>
                  <ul className="list-disc list-inside text-gray-300 mt-1 space-y-1 text-[11px]">
                    <li>2D platformer (1.000 Kittens) - Unity - Steam</li>
                    <li>3D horror (Stranded) - AI behaviors - Steam</li>
                    <li>Mobile Yahtzee roguelike - Android</li>
                  </ul>
                </div>

                <div>
                  <div className="font-bold text-amber-300">Game Jams (3+ Participations)</div>
                  <div className="text-[11px] text-gray-400">Multidisciplinary teams under tight deadlines</div>
                </div>
              </div>
            </div>

            <div className="space-y-6 flex flex-col justify-between">
              <div className="bg-[#0c1021] border border-cyan-500/30 rounded-2xl p-5 shadow-xl space-y-3">
                <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                  <Trophy className="w-5 h-5 text-amber-400" />
                  <h2 className="font-bold text-sm tracking-widest text-white font-mono uppercase">AWARDS</h2>
                </div>
                <ul className="space-y-2 font-mono text-xs text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Best Video Game – Expo 2026-1
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Best Team – Expo 2026-1
                  </li>
                </ul>
              </div>

              <div className="bg-[#0c1021] border border-cyan-500/30 rounded-2xl p-5 shadow-xl space-y-2">
                <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                  <GraduationCap className="w-5 h-5 text-purple-400" />
                  <h2 className="font-bold text-sm tracking-widest text-white font-mono uppercase">EDUCATION</h2>
                </div>
                <div className="font-mono text-xs space-y-1">
                  <div className="font-bold text-white">B.S. in Entertainment Digital Engineering</div>
                  <div className="text-cyan-300">Universidad Pontificia Bolivariana</div>
                  <div className="text-gray-400 text-[11px]">Expected Graduation: 2028</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BANNER GRANDE PARA JUGAR EL MUSEO WEBGL DESDE ITCH.IO */}
        <section id="museo-webgl" className="bg-gradient-to-r from-cyan-950/50 via-[#0c1021] to-purple-950/50 border-2 border-cyan-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="space-y-3 text-left flex-1">
              <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 font-bold uppercase tracking-widest">
                <Gamepad2 className="w-4 h-4 text-cyan-400 animate-pulse" /> // ITCH.IO WEBGL EMBED
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                MUSEO RIOS // UNITY EXPERIENCE
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-2xl">
                Explora el museo interactivo en 3D desarrollado en Unity WebGL. Sumérgete en la galería virtual y recorre los proyectos de Juan David Ríos directamente en tu navegador sin errores de audio.
              </p>
            </div>

            <div className="shrink-0">
              {!isPlayingMuseo ? (
                <button
                  onClick={() => setIsPlayingMuseo(true)}
                  className="px-8 py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-sm font-mono tracking-wider flex items-center gap-3 transition-all cursor-pointer shadow-xl shadow-cyan-500/30 hover:scale-105"
                >
                  <Play className="w-5 h-5 fill-black" /> JUGAR MUSEO AHORA
                </button>
              ) : (
                <button
                  onClick={() => setIsPlayingMuseo(false)}
                  className="px-6 py-3 rounded-2xl bg-rose-500/20 hover:bg-rose-500/40 text-rose-300 border border-rose-500/40 font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-2"
                >
                  <X className="w-4 h-4" /> CERRAR REPRODUCTOR
                </button>
              )}
            </div>
          </div>

          {/* REPRODUCTOR IFRAME DE ITCH.IO */}
          {isPlayingMuseo && (
            <div className="mt-6 pt-6 border-t border-cyan-500/30 animate-in fade-in duration-300">
              <div className="relative w-full aspect-[16/9] bg-black rounded-2xl overflow-hidden border border-cyan-500/50 shadow-2xl flex items-center justify-center">
                <iframe
                  src="https://itch.io/embed-upload/20106332?color=333333"
                  title="Museo Rios Itch.io Embed"
                  className="w-full h-full border-0"
                  allowFullScreen
                />
              </div>
              <div className="flex items-center justify-between mt-3 font-mono text-[11px] text-gray-400 px-2">
                <span>Estado: <strong className="text-emerald-400">Transmitiendo desde Itch.io (Servidor WebGL Optimizado)</strong></span>
                <span>Haz clic dentro de la pantalla para activar el audio y los controles</span>
              </div>
            </div>
          )}
        </section>

        {/* SECCIÓN 2: DASHBOARD CON CARRUSEL 3D EN CAPAS (COVERFLOW REAL) */}
        <section id="skills" className="bg-[#0c1021] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            
            {/* Columna Izquierda: Pestañas de Navegación Rápida */}
            <div className="lg:w-1/4 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block mb-1">
                  // INTERACTIVE DASHBOARD
                </span>
                <h2 className="text-xl font-extrabold text-white font-heading">
                  TECHNICAL SKILLS & PROFICIENCY
                </h2>
              </div>

              <div className="flex flex-col gap-2 font-mono text-xs">
                {[
                  { id: "gameplay", label: "Gameplay", icon: <Gamepad2 className="w-4 h-4" /> },
                  { id: "ai", label: "AI", icon: <Cpu className="w-4 h-4" /> },
                  { id: "mobile", label: "Mobile", icon: <Smartphone className="w-4 h-4" /> },
                  { id: "tools", label: "Tools", icon: <Wrench className="w-4 h-4" /> },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`p-3.5 rounded-xl border transition-all duration-300 flex items-center gap-3 cursor-pointer ${
                      activeTab === tab.id
                        ? "bg-cyan-500 text-black font-bold border-cyan-400 shadow-lg shadow-cyan-500/30 scale-[1.02]"
                        : "bg-[#121932] text-gray-300 border-white/5 hover:border-cyan-500/30 hover:text-white"
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/5 font-mono text-[11px] text-gray-400">
                <span className="text-cyan-400 font-bold block mb-1">BUILDING INTERACTIVE WORLDS</span>
                Unity 2022.3 • C# • Clean Architecture
              </div>
            </div>

            {/* Centro del Dashboard: Carrusel en Capas Superpuestas (Coverflow) */}
            <div className="lg:w-2/4 bg-[#070b18] border border-cyan-500/20 rounded-2xl p-6 flex flex-col justify-between relative shadow-inner">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-xs">
                <span className="text-cyan-400 font-bold">{dashboardData[activeTab].title}</span>
                <span className="text-gray-400">{dashboardData[activeTab].subtitle}</span>
              </div>

              {/* CONTENEDOR 3D RELATIVO CON CAPAS SOLAPADAS */}
              <div className="py-12 flex items-center justify-center relative min-h-[320px] overflow-hidden">
                
                {/* Botón Anterior */}
                <button 
                  onClick={handlePrevTab}
                  className="absolute left-2 z-40 p-2.5 rounded-full bg-[#0c1021]/90 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/40 transition-all cursor-pointer shadow-xl backdrop-blur-sm active:scale-90"
                  title="Anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* ESCENARIO DE TARJETAS SOLAPADAS */}
                <div className="relative w-full max-w-sm h-52 flex items-center justify-center">
                  
                  {/* 1. TARJETA IZQUIERDA (Atrás, solapada por la central) */}
                  {(() => {
                    const prevKey = tabKeys[(currentIndex - 1 + tabKeys.length) % tabKeys.length];
                    return (
                      <div 
                        onClick={() => setActiveTab(prevKey)}
                        className="absolute left-2 sm:left-4 z-10 w-40 sm:w-48 h-44 rounded-2xl bg-[#0c1021]/90 border border-cyan-500/30 flex flex-col items-center justify-center p-4 opacity-60 hover:opacity-90 hover:scale-105 transition-all duration-500 cursor-pointer shadow-xl transform -translate-x-4 scale-90 backdrop-blur-md"
                      >
                        <div className="w-10 h-10 rounded-full bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-2">
                          {getTabIcon(prevKey, "w-5 h-5")}
                        </div>
                        <span className="text-[11px] font-mono text-gray-300 uppercase tracking-wider text-center truncate w-full font-bold">
                          {prevKey}
                        </span>
                        <span className="text-[9px] font-mono text-gray-400 truncate w-full text-center mt-1">
                          {dashboardData[prevKey].subtitle}
                        </span>
                      </div>
                    );
                  })()}

                  {/* 2. TARJETA DERECHA (Atrás, solapada por la central) */}
                  {(() => {
                    const nextKey = tabKeys[(currentIndex + 1) % tabKeys.length];
                    return (
                      <div 
                        onClick={() => setActiveTab(nextKey)}
                        className="absolute right-2 sm:right-4 z-10 w-40 sm:w-48 h-44 rounded-2xl bg-[#0c1021]/90 border border-cyan-500/30 flex flex-col items-center justify-center p-4 opacity-60 hover:opacity-90 hover:scale-105 transition-all duration-500 cursor-pointer shadow-xl transform translate-x-4 scale-90 backdrop-blur-md"
                      >
                        <div className="w-10 h-10 rounded-full bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-2">
                          {getTabIcon(nextKey, "w-5 h-5")}
                        </div>
                        <span className="text-[11px] font-mono text-gray-300 uppercase tracking-wider text-center truncate w-full font-bold">
                          {nextKey}
                        </span>
                        <span className="text-[9px] font-mono text-gray-400 truncate w-full text-center mt-1">
                          {dashboardData[nextKey].subtitle}
                        </span>
                      </div>
                    );
                  })()}

                  {/* 3. TARJETA CENTRAL (Al frente absolute, tapando perfectamente a las de atrás) */}
                  <div className="absolute z-30 w-56 sm:w-64 bg-gradient-to-b from-[#0c1021] to-[#121b34] border-2 border-cyan-400 rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-2xl shadow-cyan-500/60 transition-all duration-500 scale-100">
                    <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-cyan-950/90 border-2 border-cyan-400 flex items-center justify-center shadow-inner shadow-cyan-400/50 mb-3 relative">
                      <div className="absolute inset-0 rounded-full border border-cyan-300/40 animate-pulse" />
                      <div className="text-cyan-300">
                        {getTabIcon(activeTab, "w-9 h-9")}
                      </div>
                    </div>
                    <h3 className="text-white font-bold font-heading text-sm sm:text-base uppercase tracking-wider">
                      {activeTab}
                    </h3>
                    <span className="text-[9px] font-mono text-cyan-300 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-500/40 mt-2 shadow-sm">
                      ACTIVE NODE
                    </span>
                  </div>

                </div>

                {/* Botón Siguiente */}
                <button 
                  onClick={handleNextTab}
                  className="absolute right-2 z-40 p-2.5 rounded-full bg-[#0c1021]/90 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/40 transition-all cursor-pointer shadow-xl backdrop-blur-sm active:scale-90"
                  title="Siguiente"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

              </div>

              {/* Barras de Métricas */}
              <div className="w-full grid grid-cols-2 gap-4 mt-2 font-mono text-xs">
                {dashboardData[activeTab].stats.map((stat, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#121932] border border-white/5 space-y-1">
                    <div className="flex justify-between text-gray-300 text-[11px]">
                      <span>{stat.label}</span>
                      <span className="text-cyan-400 font-bold">{stat.value}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-black/60 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-700" 
                        style={{ width: `${stat.value}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="font-mono text-xs text-gray-300 italic border-t border-white/10 pt-3 mt-4">
                "{dashboardData[activeTab].description}"
              </div>
            </div>

            {/* Columna Derecha: Key Metrics & Gameplay Skills */}
            <div className="lg:w-1/4 flex flex-col justify-between space-y-6">
              <div className="bg-[#070b18] border border-cyan-500/20 rounded-2xl p-4 space-y-3 font-mono">
                <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest border-b border-white/10 pb-2">
                  KEY METRICS
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center text-gray-300">
                    <span>Games Published</span>
                    <span className="font-bold text-white">4+</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-300">
                    <span>Platforms</span>
                    <span className="text-[10px] text-cyan-300">Steam, Android, Web</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-300">
                    <span>Years Experience</span>
                    <span className="font-bold text-white">4+</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-300">
                    <span>Team Projects</span>
                    <span className="font-bold text-white">3+</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#070b18] border border-cyan-500/20 rounded-2xl p-4 space-y-3 font-mono">
                <h3 className="text-xs font-bold text-purple-400 uppercase tracking-widest border-b border-white/10 pb-2">
                  GAMEPLAY SKILLS
                </h3>
                <div className="space-y-2.5 text-xs">
                  {dashboardData[activeTab].skillsBreakdown.map((skill, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-[11px] text-gray-300">
                        <span>{skill.name}</span>
                        <span className="text-cyan-400 font-bold">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-black/60 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full transition-all duration-700" 
                          style={{ width: `${skill.level}%` }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SECCIÓN 3: DEVELOPMENT PIPELINE */}
        <section id="pipeline" className="bg-[#0c1021] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block mb-1">
                // WORKFLOW & METHODOLOGY
              </span>
              <h2 className="text-2xl font-extrabold text-white font-heading">
                DEVELOPMENT PIPELINE
              </h2>
            </div>
            <p className="text-xs font-mono text-gray-400 max-w-md">
              Select any pipeline stage to inspect the associated development tasks and workflow methodology.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {pipelineStages.map((stage) => (
              <div
                key={stage.id}
                onClick={() => setActivePipelineStep(stage.id)}
                className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 ${
                  activePipelineStep === stage.id
                    ? "bg-cyan-950/40 border-cyan-400 shadow-lg shadow-cyan-500/20 scale-105"
                    : "bg-[#121932]/60 border-white/5 hover:border-cyan-500/30 hover:bg-[#121932]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-xs font-bold px-2.5 py-1 rounded ${activePipelineStep === stage.id ? "bg-cyan-500 text-black" : "bg-black/50 text-cyan-400"}`}>
                    0{stage.id + 1}
                  </span>
                  <ArrowRight className={`w-4 h-4 ${activePipelineStep === stage.id ? "text-cyan-400 translate-x-1" : "text-gray-600"} transition-transform`} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base font-heading mb-1">
                    {stage.title}
                  </h3>
                  <p className="text-[11px] font-mono text-cyan-300/80">
                    {stage.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-2xl bg-[#070b18] border border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
            <div className="space-y-1">
              <span className="text-cyan-400 font-bold uppercase tracking-wider block">
                Selected Stage: {pipelineStages[activePipelineStep].title} — {pipelineStages[activePipelineStep].subtitle}
              </span>
              <p className="text-gray-300 text-sm">
                {pipelineStages[activePipelineStep].desc}
              </p>
            </div>
            <div className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 shrink-0 font-bold">
              STATUS: ACTIVE
            </div>
          </div>
        </section>

        {/* SECCIÓN 4: FEATURED PROJECTS */}
        <section id="proyectos" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest block mb-1">
                // MY ROLES & CONTRIBUTIONS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                FEATURED PROJECTS & ROLES
              </h2>
            </div>
            <Link
              to="/juegos"
              className="font-mono text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
            >
              PLAY ALL GAMES <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group bg-[#0c1021] border border-cyan-500/30 hover:border-cyan-400 rounded-3xl overflow-hidden transition-all duration-300 shadow-xl hover:-translate-y-2 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-900">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c1021] via-transparent to-black/30" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-black/70 text-cyan-300 border border-cyan-500/30 backdrop-blur-sm">
                      {project.platform}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider block">
                      {project.subtitle}
                    </span>
                    <h3 className="font-bold text-white text-xl font-heading group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-gray-300 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 space-y-4">
                  <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                    {project.tech.map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-white/5 text-cyan-300 border border-white/5">
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="w-full py-2.5 rounded-xl bg-cyan-500/20 group-hover:bg-cyan-500 text-cyan-300 group-hover:text-black font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors border border-cyan-500/30 cursor-pointer"
                  >
                    <span>Ver Detalles del Rol</span> <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECCIÓN 5: CONTACTO */}
        <section id="contacto" className="bg-gradient-to-r from-purple-950/40 via-[#0c1021] to-cyan-950/40 border border-cyan-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl text-center space-y-6">
          <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block">
            // GET IN TOUCH
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
            ¿Listo para colaborar en tu próximo proyecto?
          </h2>
          <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Disponible para oportunidades en desarrollo de videojuegos, programación de gameplay en Unity y consultoría técnica.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={handleCopyEmail}
              className={`px-8 py-4 rounded-xl font-bold text-sm shadow-xl transition-all cursor-pointer flex items-center gap-2 ${
                emailCopied 
                  ? "bg-emerald-500 text-black shadow-emerald-500/30" 
                  : "bg-cyan-500 hover:bg-cyan-400 text-black shadow-cyan-500/30"
              }`}
            >
              {emailCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{emailCopied ? "¡Email copiado!" : "Contactar por Email"}</span>
            </button>
            <button
              onClick={() => setDownloadModalOpen(true)}
              className="px-8 py-4 rounded-xl bg-[#121932] hover:bg-[#1a2342] text-white font-bold text-sm border border-cyan-500/40 transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-cyan-950/30"
            >
              <Download className="w-4 h-4 text-cyan-400" /> Descargar CV Oficial
            </button>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-cyan-500/20 bg-[#05070e] py-8 text-center font-mono text-xs text-gray-400 mt-16">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>Juan David Ríos Sánchez • Noisy Studios © 2026</div>
          <div className="flex items-center gap-4">
            <Link to="/juegos" className="hover:text-cyan-400 transition-colors">Juegos</Link>
            <Link to="/Nosotros" className="hover:text-cyan-400 transition-colors">Nosotros</Link>
            <Link to="/contactanos" className="hover:text-cyan-400 transition-colors">Contacto</Link>
          </div>
        </div>
      </footer>

      {/* MODAL DE FICHA TÉCNICA */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="relative w-full max-w-2xl bg-[#0c1021] border border-cyan-500/50 rounded-3xl overflow-hidden shadow-2xl shadow-cyan-950/80 flex flex-col text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/9] bg-gray-900">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c1021] via-transparent to-transparent" />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/70 hover:bg-rose-500/30 text-white transition-colors cursor-pointer border border-white/20"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                  {selectedProject.subtitle} • {selectedProject.platform}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading">
                  {selectedProject.title}
                </h3>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed">
                {selectedProject.description}
              </p>

              <div className="space-y-2">
                <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block">
                  Responsabilidades Técnicas & Herramientas:
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((t, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-lg bg-cyan-950/40 text-cyan-300 font-mono text-xs border border-cyan-500/30">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <Link
                  to="/juegos"
                  onClick={() => setSelectedProject(null)}
                  className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-cyan-500/30"
                >
                  <span>Ir a Jugar Versión WebGL</span> <ExternalLink className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-mono text-xs transition-colors cursor-pointer"
                >
                  Cerrar Detalles
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE DESCARGA DE CV */}
      {downloadModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setDownloadModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-md bg-[#0c1021] border border-cyan-500/50 rounded-3xl p-6 sm:p-8 space-y-5 text-left shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-xl font-bold text-white font-heading flex items-center gap-2">
                <Download className="w-5 h-5 text-cyan-400" /> Descargar CV Oficial
              </h3>
              <button
                onClick={() => setDownloadModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-gray-300 font-mono leading-relaxed">
              Selecciona el formato de currículum actualizado de <strong className="text-cyan-400">Juan David Ríos Sánchez</strong> (Unity Developer & C# Specialist):
            </p>

            <div className="space-y-3 font-mono text-xs">
              <a
                href="#download-pdf"
                onClick={(e) => {
                  e.preventDefault();
                  alert("¡Descarga de CV en formato PDF iniciada con éxito!");
                  setDownloadModalOpen(false);
                }}
                className="w-full p-3.5 rounded-xl bg-[#121932] hover:bg-cyan-500 hover:text-black text-cyan-300 border border-cyan-500/30 flex items-center justify-between transition-all cursor-pointer font-bold"
              >
                <span>Curriculum_JuanDavidRios_2026.pdf</span>
                <Download className="w-4 h-4" />
              </a>

              <a
                href="#download-docx"
                onClick={(e) => {
                  e.preventDefault();
                  alert("¡Descarga de CV en formato Word iniciada con éxito!");
                  setDownloadModalOpen(false);
                }}
                className="w-full p-3.5 rounded-xl bg-[#121932] hover:bg-purple-600 hover:text-white text-purple-300 border border-cyan-500/30 flex items-center justify-between transition-all cursor-pointer font-bold"
              >
                <span>Curriculum_JuanDavidRios_2026.docx</span>
                <Download className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-2 text-[10px] font-mono text-gray-400 text-center">
              Actualizado a la fecha actual (Octubre 2026) • Universidad Pontificia Bolivariana.
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Rios;