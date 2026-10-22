import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Gamepad2, 
  Play, 
  ExternalLink, 
  Sparkles, 
  Search, 
  ChevronRight, 
  Trophy, 
  Flame, 
  ArrowRight
} from "lucide-react";
import { 
  featuredGame, 
  gamesCatalog, 
  gamesInProgress, 
  bestSellerGame, 
  gameJamPrototypes 
} from "../../data/portfolioData";
import TrailerModal from "../../components/TrailerModal";
import GameDetailModal from "../../components/GameDetailModal";
import PlayMiniGameModal from "../../components/PlayMiniGameModal";

export function Juegos() {
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [activeJamPrototype, setActiveJamPrototype] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Categorías actualizadas: Todos los juegos, Plataformero, Estrategia, Roguelike
  const filterCategories = [
    { id: "all", label: "Todos los juegos" },
    { id: "Plataformero", label: "Plataformero" },
    { id: "Estrategia", label: "Estrategia" },
    { id: "Roguelike", label: "Roguelike" },
  ];

  const filteredGames = gamesCatalog.filter((game) => {
    const matchesFilter =
      activeFilter === "all" ||
      game.category?.toLowerCase() === activeFilter.toLowerCase() ||
      game.tags?.some((t) => t.toLowerCase() === activeFilter.toLowerCase());

    const matchesSearch =
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen text-slate-100 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">

        {/* 1. PAGE HEADER */}
        <section className="text-center md:text-left space-y-4 pt-6 border-b border-white/10 pb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold">
            <Gamepad2 className="w-4 h-4 text-cyan-400" />
            <span>CATÁLOGO Y EXPERIMENTOS</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-heading tracking-tight">
            Juegos
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-3xl leading-relaxed">
            Descubre nuestro catálogo de lanzamientos comerciales, títulos en producción activa y prototipos de Game Jams.
          </p>
        </section>

        {/* 2. JUEGO DESTACADO */}
        <section className="space-y-8">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-6 bg-purple-500 rounded-full" />
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
              Juego destacado
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0d111d] border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl shadow-purple-950/20 relative overflow-hidden group">
            <div className="lg:col-span-7 relative rounded-2xl overflow-hidden aspect-[16/10] bg-[#14192b] border border-white/10 shadow-xl group/img">
              <img
                src={featuredGame.coverImage}
                alt={featuredGame.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

              <button
                onClick={() => setSelectedTrailer({
                  title: featuredGame.title,
                  url: null
                })}
                className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity backdrop-blur-xs cursor-pointer"
                aria-label="Ver Tráiler"
              >
                <div className="w-20 h-20 rounded-full bg-purple-600/90 text-white flex items-center justify-center shadow-xl shadow-purple-600/50 hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 ml-1 fill-white" />
                </div>
              </button>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
                  {featuredGame.title}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-cyan-400 uppercase tracking-wider mt-2">
                  {featuredGame.category}
                </p>
              </div>

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

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed italic border-l-2 border-purple-500/50 pl-4">
                "{featuredGame.quote}"
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setActiveJamPrototype(gameJamPrototypes[0])}
                  className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
                >
                  Probar Prototipo WebGL <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 3. EN DESARROLLO (Solo Mil Gatitos y Tessera) */}
        <section className="space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-6 bg-cyan-400 rounded-full" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
                WORK IN PROGRESS
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
              En desarrollo
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Transparencia total: proyectos en producción activa con porcentaje estimado de avance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {gamesInProgress.map((game) => (
              <div
                key={game.id}
                className="group rounded-2xl bg-[#0f1322] border border-white/10 hover:border-cyan-500/40 p-5 space-y-4 transition-all duration-300 shadow-xl hover:-translate-y-1"
              >
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-gray-900 border border-white/5">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1322] via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 text-cyan-300 border border-cyan-500/30 backdrop-blur-xs">
                    {game.genre}
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-white text-lg font-heading">
                      {game.title}
                    </h3>
                    <span className="text-xs font-mono font-extrabold text-cyan-400">
                      {game.progress}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 line-clamp-2">
                    {game.desc}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden p-[1px]">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-1000"
                      style={{ width: `${game.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-gray-400">
                    <span>{game.statusText}</span>
                    <span className="text-purple-300">{game.phase}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. TODOS NUESTROS JUEGOS */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
                Todos nuestros juegos
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Filtra o busca en nuestra colección completa de lanzamientos
              </p>
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por título..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#121627] border border-white/10 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {filterCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  activeFilter === cat.id
                    ? "bg-purple-600 text-white font-semibold shadow-md shadow-purple-600/30"
                    : "bg-[#121627] text-gray-400 hover:text-white border border-white/5"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.map((game) => (
              <div
                key={game.id}
                onClick={() => setSelectedGame(game)}
                className="group rounded-2xl bg-[#0f1322] border border-white/10 hover:border-purple-500/50 overflow-hidden transition-all duration-300 shadow-xl hover:-translate-y-1.5 cursor-pointer flex flex-col"
              >
                <div className="relative aspect-[4/3] bg-gray-900 overflow-hidden">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1322] via-transparent to-black/30" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-black/60 text-cyan-300 border border-cyan-500/30 backdrop-blur-sm">
                      {game.year}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-bold text-white text-lg font-heading group-hover:text-purple-300 transition-colors line-clamp-1">
                      {game.title}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-2 mt-1">
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

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                    <span className="text-base font-bold font-mono text-cyan-400">
                      {game.price}
                    </span>
                    <span className="text-xs text-gray-400 group-hover:text-white flex items-center gap-1 font-medium">
                      Ver Ficha <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. JUEGO MÁS ESPERADO (Mil Gatitos) */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-400" />
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
              Juego más esperado
            </h2>
          </div>

          <div className="relative rounded-3xl overflow-hidden bg-[#0d101c] border border-amber-500/30 shadow-2xl p-8 md:p-12">
            <div className="absolute inset-0 z-0">
              <img
                src={bestSellerGame.image}
                alt={bestSellerGame.title}
                className="w-full h-full object-cover opacity-20 filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0d101c] via-[#0d101c]/90 to-transparent" />
            </div>

            <div className="relative z-10 max-w-2xl space-y-6">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 inline-flex items-center gap-1.5">
                <Flame className="w-4 h-4 fill-amber-400" /> PRÓXIMO LANZAMIENTO
              </span>

              <h3 className="text-3xl sm:text-5xl font-extrabold text-white font-heading">
                {bestSellerGame.title}
              </h3>

              <p className="text-gray-300 text-base leading-relaxed">
                {bestSellerGame.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 font-mono text-sm text-cyan-300 font-bold">
                  ✓ {bestSellerGame.stat1}
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 font-mono text-sm text-purple-300 font-bold">
                  ★ {bestSellerGame.stat2}
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setSelectedGame(gamesCatalog[0])}
                  className="px-8 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 active:scale-95 text-white font-bold text-sm shadow-xl shadow-purple-600/30 transition-all cursor-pointer flex items-center gap-2"
                >
                  Conoce más <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 6. PROTOTIPOS / GAME JAM (Solo Masquerade Dance) */}
        <section className="space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-6 bg-purple-500 rounded-full" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-purple-400">
                LABORATORIO EXPERIMENTAL
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
              Prototipos / Game Jam
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Juegos conceptuales creados en maratones de 48 a 72 horas. ¡Puedes probarlos en vivo!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gameJamPrototypes.map((proto) => (
              <div
                key={proto.id}
                onClick={() => setActiveJamPrototype(proto)}
                className="group p-6 rounded-2xl bg-[#0f1322] border border-white/10 hover:border-cyan-500/50 hover:bg-[#141a2e] transition-all duration-300 flex flex-col justify-between shadow-xl cursor-pointer hover:-translate-y-1"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-cyan-400">
                      {proto.num}
                    </span>
                    <span className="text-[10px] font-mono text-gray-400">
                      {proto.event}
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-lg font-heading group-hover:text-cyan-300 transition-colors">
                    {proto.title}
                  </h3>

                  <p className="text-xs text-gray-300 leading-relaxed">
                    {proto.desc}
                  </p>
                </div>

                <div className="pt-6 space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {proto.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950/40 text-cyan-300 border border-cyan-500/20"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="w-full py-2.5 px-3 rounded-xl bg-purple-600/30 group-hover:bg-purple-600 text-purple-200 group-hover:text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors border border-purple-500/40"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" /> Probar Build WebGL
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. BOTTOM CTA */}
        <section className="text-center pt-8 border-t border-white/10">
          <Link
            to="/Nosotros"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 active:scale-95 text-white font-bold text-base shadow-xl shadow-purple-600/30 transition-all cursor-pointer"
          >
            Conoce al estudio <ArrowRight className="w-5 h-5" />
          </Link>
        </section>

      </div>

      {/* Modals */}
      <TrailerModal
        isOpen={!!selectedTrailer}
        onClose={() => setSelectedTrailer(null)}
        title={selectedTrailer?.title}
        videoUrl={selectedTrailer?.url}
      />

      <GameDetailModal
        isOpen={!!selectedGame}
        onClose={() => setSelectedGame(null)}
        game={selectedGame}
      />

      <PlayMiniGameModal
        isOpen={!!activeJamPrototype}
        onClose={() => setActiveJamPrototype(null)}
        prototype={activeJamPrototype}
      />

    </div>
  );
}

export default Juegos;