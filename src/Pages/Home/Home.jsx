import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Play, 
  ExternalLink, 
  Sparkles, 
  Gamepad2, 
  Code2, 
  ArrowRight, 
  Layers, 
  Check, 
  ShieldCheck, 
  Flame, 
  Zap, 
  ChevronRight 
} from "lucide-react";
import { 
  featuredGame, 
  techStack, 
  gamesCatalog, 
  studioInfo 
} from "../../data/portfolioData";
import TechIcon from "../../components/TechIcon";
import ContactSection from "../../components/ContactSection";
import PlayableGameModal from "../../components/PlayableGameModal";

export function Home() {
  const [selectedPlayableGame, setSelectedPlayableGame] = useState(null);

  const handleOpenPlayable = (game) => {
    setSelectedPlayableGame(game || featuredGame);
  };

  return (
    <div className="min-h-screen text-slate-100 pt-20">
      
      {/* =========================================================================
          HERO SECTION (Wireframe 1 - Top large banner & subtitle)
      ========================================================================= */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden border-b border-white/5 py-16 md:py-24">
        {/* Cinematic Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={featuredGame.coverImage}
            alt="Hero Background"
            className="w-full h-full object-cover object-center opacity-20 filter brightness-75 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080a0f]/85 via-[#080a0f]/90 to-[#080a0f]" />
          <div className="absolute inset-0 bg-radial-gradient from-purple-900/20 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Ambient Glow Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          {/* Studio Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/50 border border-purple-500/30 text-purple-300 text-xs font-mono font-medium backdrop-blur-md shadow-lg shadow-purple-950/40">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>NOISY STUDIOS // EQUIPO INDIE UNIVERSITARIO</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-heading leading-tight md:leading-[1.1]">
            Forjando mundos donde cada <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">píxel respira</span> emoción.
          </h1>

          {/* Subtitle / Quote centered matching Wireframe 1 */}
          <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-gray-300 font-normal leading-relaxed">
            {studioInfo.tagline} Proyectos interactivos desarrollados en Unity y optimizados para disfrutarse directamente en el navegador.
          </p>

          {/* CTA Buttons - "Ver trailer oficial" REMOVED per instruction */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/juegos"
              className="px-8 py-4 rounded-xl text-white font-bold text-base bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 active:scale-95 transition-all shadow-xl shadow-purple-600/30 hover:shadow-purple-600/50 border border-purple-400/30 flex items-center gap-2 cursor-pointer"
            >
              <Gamepad2 className="w-5 h-5" /> Explorar Juegos
            </Link>
            <button
              onClick={() => handleOpenPlayable(featuredGame)}
              className="px-7 py-4 rounded-xl text-white font-semibold text-base bg-[#121627]/90 hover:bg-[#1a2038] border border-cyan-500/40 hover:border-cyan-400 transition-all flex items-center gap-2 backdrop-blur-sm cursor-pointer shadow-lg shadow-cyan-950/30"
            >
              <Play className="w-4 h-4 fill-cyan-400 text-cyan-400" /> Jugar Galactic Decree
            </button>
          </div>

          {/* Live Studio Stats Bar: +100 in both descargas and jugadores, 3 juegos universitarios */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-white/10">
            <div className="p-4 rounded-xl bg-[#101424]/40 border border-white/5 backdrop-blur-xs">
              <div className="text-2xl md:text-3xl font-extrabold text-white font-mono">3</div>
              <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-mono">Juegos Creados</div>
            </div>
            <div className="p-4 rounded-xl bg-[#101424]/40 border border-white/5 backdrop-blur-xs">
              <div className="text-2xl md:text-3xl font-extrabold text-cyan-400 font-mono">+100</div>
              <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-mono">Descargas</div>
            </div>
            <div className="p-4 rounded-xl bg-[#101424]/40 border border-white/5 backdrop-blur-xs">
              <div className="text-2xl md:text-3xl font-extrabold text-purple-400 font-mono">+100</div>
              <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-mono">Jugadores</div>
            </div>
            <div className="p-4 rounded-xl bg-[#101424]/40 border border-white/5 backdrop-blur-xs">
              <div className="text-2xl md:text-3xl font-extrabold text-pink-400 font-mono">100%</div>
              <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-mono">Pasión Indie</div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION: JUEGO DESTACADO (Wireframe 1 - Galactic Decree, single image, playable)
      ========================================================================= */}
      <section className="py-20 md:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-6 bg-purple-500 rounded-full" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-purple-400">
                PROYECTO INSIGNIA
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white font-heading">
              Juego destacado
            </h2>
          </div>

          {/* Featured Game Card - Click opens playable version directly! */}
          <div 
            onClick={() => handleOpenPlayable(featuredGame)}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0d111d] border border-cyan-500/30 rounded-3xl p-6 md:p-10 shadow-2xl shadow-cyan-950/20 relative overflow-hidden group cursor-pointer hover:border-cyan-400/60 transition-all duration-300"
          >
            {/* Top ambient glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Left Column: Game Image Showcase - Single Image: GalacticDecree */}
            <div className="lg:col-span-7 relative rounded-2xl overflow-hidden aspect-[16/10] bg-[#14192b] border border-white/10 shadow-xl group/img">
              <img
                src={featuredGame.coverImage}
                alt={featuredGame.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

              {/* Play Overlay Button */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity backdrop-blur-xs">
                <div className="w-20 h-20 rounded-full bg-cyan-500 text-black flex items-center justify-center shadow-xl shadow-cyan-500/50 hover:scale-110 transition-transform font-bold">
                  <Play className="w-8 h-8 ml-1 fill-black" />
                </div>
              </div>

              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
                  ★ JUGAR AHORA EN NAVEGADOR
                </span>
              </div>
            </div>

            {/* Right Column: Game Details */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-heading tracking-tight group-hover:text-cyan-300 transition-colors">
                  {featuredGame.title}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-cyan-400 uppercase tracking-wider mt-2">
                  {featuredGame.category}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {featuredGame.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-md text-xs font-mono font-semibold bg-[#1a2035] text-purple-300 border border-purple-500/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Description quote */}
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed italic border-l-2 border-cyan-500/50 pl-4">
                "{featuredGame.quote}"
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenPlayable(featuredGame);
                  }}
                  className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 active:scale-95 text-black font-bold text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/30 transition-all cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-black" /> Jugar en el Navegador
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION: TECNOLOGÍA & HERRAMIENTAS (Wireframe 1 - 10 Tools Grid)
      ========================================================================= */}
      <section className="py-20 md:py-28 relative bg-[#06080d] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-12 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <span className="w-1.5 h-6 bg-cyan-400 rounded-full" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
                STACK TECNOLÓGICO
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white font-heading">
              Tecnología & Herramientas
            </h2>
            <p className="mt-2 text-gray-400 text-sm md:text-base max-w-xl">
              Nuestra base técnica y artesanal para construir experiencias fluidas y optimizadas para WebGL.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {techStack.map((tech, idx) => (
              <div
                key={idx}
                className="group p-5 rounded-2xl bg-[#0f1322] border border-white/10 hover:border-purple-500/50 hover:bg-[#141a2e] transition-all duration-300 flex flex-col items-center text-center shadow-lg hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#182035] group-hover:bg-purple-600/20 text-gray-300 group-hover:text-purple-300 flex items-center justify-center mb-4 transition-colors border border-white/5 group-hover:border-purple-500/40">
                  <TechIcon name={tech.iconKey} className="w-7 h-7" />
                </div>

                <h3 className="font-bold text-white text-base font-heading group-hover:text-cyan-300 transition-colors">
                  {tech.name}
                </h3>

                <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 mt-1 font-semibold">
                  {tech.role}
                </span>

                <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                  {tech.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION: CATÁLOGO DE JUEGOS (Wireframe 1 - Strictly the 3 real games!)
      ========================================================================= */}
      <section className="py-20 md:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-6 bg-pink-500 rounded-full" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-pink-400">
                  CATÁLOGO OFICIAL (3 JUEGOS)
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white font-heading">
                Nuestros 3 Juegos
              </h2>
            </div>
            <Link
              to="/juegos"
              className="text-sm font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1.5 group"
            >
              Ver página de juegos <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* 3 Game Cards Grid - Click opens playable version */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {gamesCatalog.map((game) => (
              <div
                key={game.id}
                onClick={() => handleOpenPlayable(game)}
                className="group rounded-3xl bg-[#0f1322] border border-white/10 hover:border-cyan-500/50 overflow-hidden transition-all duration-300 shadow-xl hover:-translate-y-2 cursor-pointer flex flex-col"
              >
                {/* Image Frame with original image */}
                <div className="relative aspect-[16/10] bg-gray-900 overflow-hidden">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1322] via-transparent to-black/30" />
                  
                  {/* Year Tag */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-black/60 text-cyan-300 border border-cyan-500/30 backdrop-blur-sm">
                      {game.year}
                    </span>
                  </div>

                  {/* Playable badge */}
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 flex items-center gap-1">
                      <Play className="w-3 h-3 fill-cyan-400" /> JUGABLE
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-bold text-white text-xl font-heading group-hover:text-cyan-300 transition-colors">
                      {game.title}
                    </h3>
                    <p className="text-xs text-gray-300 leading-relaxed mt-2 line-clamp-2">
                      {game.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {game.badges.map((b, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-950/50 text-purple-300 border border-purple-500/20"
                      >
                        {b}
                      </span>
                    ))}
                  </div>

                  {/* Action */}
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-cyan-400">
                      {game.rating}
                    </span>
                    <button
                      type="button"
                      className="text-xs font-semibold text-white bg-purple-600/30 group-hover:bg-purple-600 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
                    >
                      Jugar ahora <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION: NUESTRA MISIÓN BANNER (Wireframe 1)
      ========================================================================= */}
      <section className="py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-r from-[#11172a] via-[#151c33] to-[#101426] border border-cyan-500/30 p-6 md:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-5 shadow-xl relative overflow-hidden">
            <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-cyan-400 to-purple-600" />

            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 text-cyan-400">
              <Code2 className="w-6 h-6" />
            </div>

            <div className="space-y-2 text-center sm:text-left">
              <h3 className="text-lg md:text-xl font-bold text-white font-heading">
                Nuestra Misión
              </h3>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed max-w-4xl font-normal">
                {studioInfo.mission}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION: CONTACTO (Wireframe 1)
      ========================================================================= */}
      <ContactSection showHeader={true} />

      {/* Playable WebGL Game Modal */}
      <PlayableGameModal
        isOpen={!!selectedPlayableGame}
        onClose={() => setSelectedPlayableGame(null)}
        game={selectedPlayableGame}
      />

    </div>
  );
}

export default Home;
