import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Users, 
  Sparkles, 
  Heart, 
  Gamepad2, 
  ExternalLink, 
  ArrowRight, 
  CheckCircle2, 
  Briefcase, 
  Code2, 
  Crown, 
  Terminal, 
  Box, 
  Palette, 
  BookOpen, 
  ChevronRight 
} from "lucide-react";
import { teamMembers, studioValues, studioInfo } from "../../data/portfolioData";
import TeamMemberModal from "../../components/TeamMemberModal";

export function Nosotros() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'david' | 'estefania' | 'rios'
  const [careerModalOpen, setCareerModalOpen] = useState(false);
  const location = useLocation();

  // If URL has a hash or subpath, sync active tab
  React.useEffect(() => {
    const path = location.pathname.toLowerCase();
    if (path.includes("david")) setActiveTab("david");
    else if (path.includes("estefania")) setActiveTab("estefania");
    else if (path.includes("rios")) setActiveTab("rios");
  }, [location.pathname]);

  const davidData = teamMembers.find((m) => m.id === "david") || teamMembers[0];
  const estefaData = teamMembers.find((m) => m.id === "estefania") || teamMembers[1];
  const riosData = teamMembers.find((m) => m.id === "rios") || teamMembers[2];

  return (
    <div className="min-h-screen text-slate-100 pt-24 pb-20 bg-[#080a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">

        {/* =====================================================================
            1. HERO & SOMOS (Wireframe 3 - NoisyStudios)
        ===================================================================== */}
        <section className="space-y-6 pt-6">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-6 bg-cyan-400 rounded-full" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
              SOMOS
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-heading tracking-tight">
              NoisyStudios
            </h1>
            <p className="text-sm font-mono text-purple-400 uppercase tracking-widest font-semibold">
              ESTUDIO INDIE DE VIDEOJUEGOS // FUNDADO Y DIRIGIDO POR SUS DUEÑOS
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-gray-300 text-base sm:text-lg leading-relaxed">
            <div className="lg:col-span-6 space-y-4">
              <p>
                <strong>NoisyStudios</strong> es un estudio independiente de desarrollo de videojuegos fundado y liderado por sus tres dueños: <strong>David Saldarriaga</strong>, <strong>Estefania Aristizabal</strong> y <strong>Juan David Rios</strong>.
              </p>
              <p>
                Creemos con fervor que los videojuegos son la forma de arte más completa de nuestra era. Nacimos para demostrar que una visión artística clara, combinada con código meticuloso y diseño centrado en el jugador, puede competir y emocionar a la par de las producciones más ambiciosas del mundo.
              </p>
            </div>
            <div className="lg:col-span-6 space-y-4">
              <p>
                En NoisyStudios cada proyecto nace de una obsesión colectiva por el detalle: desde los algoritmos de física y fluidos, hasta el diseño narrativo de universos originales y el arte tridimensional que transporta a los jugadores a nuevos horizontes.
              </p>
              <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/30 text-purple-200 text-sm font-mono flex items-center gap-3 shadow-lg">
                <Crown className="w-5 h-5 text-amber-400 shrink-0" />
                <span>Dirección Creativa y Técnica a cargo de los 3 socios fundadores.</span>
              </div>
            </div>
          </div>

          {/* Cinematic Studio Showcase Banner (Wireframe 3) */}
          <div className="relative rounded-3xl overflow-hidden aspect-[21/9] sm:aspect-[24/9] border border-white/10 shadow-2xl mt-8 bg-gray-900 group">
            <img
              src="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1600&q=80"
              alt="NoisyStudios Creative Lab"
              className="w-full h-full object-cover filter brightness-75 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080a0f] via-transparent to-black/30" />
            <div className="absolute bottom-6 left-6 sm:left-10 text-left">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest block mb-1">
                ESPACIO CREATIVO // NOISYSTUDIOS
              </span>
              <h3 className="text-xl sm:text-3xl font-bold text-white font-heading">
                Donde las ideas se convierten en mundos jugables
              </h3>
            </div>
          </div>
        </section>

        {/* =====================================================================
            2. NUESTRA HISTORIA (Wireframe 3)
        ===================================================================== */}
        <section className="space-y-8">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-6 bg-purple-500 rounded-full" />
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
              Nuestra historia
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0d111d] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-xl">
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-900 border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80"
                alt="Historia de NoisyStudios"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 font-mono text-xs text-cyan-300">
                FUNDACIÓN & MARATONES // NOISYSTUDIOS
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
              <p>
                La génesis de <strong>NoisyStudios</strong> se remonta al encuentro de <strong>David Saldarriaga</strong>, <strong>Estefania Aristizabal</strong> y <strong>Juan David Rios</strong> en intensas maratones de desarrollo (Game Jams). Con trasfondos complementarios —la ingeniería de sistemas y arquitectura de motores de David, la maestría en narrativa interactiva y diseño de interfaz de Estefania, y la visión plástica y ambiental 3D de Juan David— formaron un núcleo creativo de alto rendimiento.
              </p>
              <p>
                Tras ganar múltiples reconocimientos en Game Jams internacionales, tomaron la decisión de formalizar el estudio bajo el sello <strong>NoisyStudios</strong>, con la meta de producir títulos propios sin ataduras editoriales ni compromisos que diluyan la calidad del juego.
              </p>
              <p>
                Hoy, cada uno de los tres dueños dirige activamente un pilar fundamental del estudio, manteniendo viva la llama de la artesanía digital.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================================
            3. LOS DUEÑOS & EL EQUIPO (Wireframe 3 - 3 Circular Cards)
        ===================================================================== */}
        <section className="space-y-8" id="equipo">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <Crown className="w-5 h-5 text-amber-400" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
                DUEÑOS & CO-FUNDADORES
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
              El equipo fundador
            </h2>
            <p className="text-gray-400 text-sm mt-1 max-w-2xl">
              Conoce a los tres líderes y propietarios detrás de la ingeniería, la narrativa y la dirección de arte en NoisyStudios.
            </p>
          </div>

          {/* Interactive view mode tab switcher */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-[#0f1322] border border-white/10 w-fit">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                activeTab === "all"
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Ver los 3 Dueños
            </button>
            <button
              onClick={() => setActiveTab("david")}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                activeTab === "david"
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              David Saldarriaga (Gameplay)
            </button>
            <button
              onClick={() => setActiveTab("estefania")}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                activeTab === "estefania"
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Estefania Aristizabal (Narrativa)
            </button>
            <button
              onClick={() => setActiveTab("rios")}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                activeTab === "rios"
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Juan David Rios (Arte 3D)
            </button>
          </div>

          {/* 3 Circular Avatar Cards matching Wireframe 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => {
              const isDavid = member.id === "david";
              const isEstefa = member.id === "estefania";
              const isRios = member.id === "rios";

              return (
                <div
                  key={member.id}
                  className="group rounded-3xl bg-[#0f1322] border border-white/10 hover:border-purple-500/50 p-8 flex flex-col items-center text-center transition-all duration-300 shadow-xl hover:-translate-y-2 relative"
                >
                  {/* Owner Crown Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1 shadow-sm">
                      <Crown className="w-3 h-3 text-amber-400" /> DUEÑO
                    </span>
                  </div>

                  {/* Circular Avatar matching wireframe circle */}
                  <div className="relative mb-6 mt-2">
                    <div className="w-32 h-32 rounded-full overflow-hidden p-1 bg-gradient-to-tr from-purple-600 via-indigo-500 to-cyan-400 shadow-xl group-hover:scale-105 transition-transform duration-300">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-[#0f1322]" title="Activo y Disponible" />
                  </div>

                  {/* Member Info */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-heading group-hover:text-cyan-300 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs font-mono text-purple-400 font-semibold mt-1 mb-3 uppercase tracking-wider">
                    {member.ownerBadge || "Dueño & Co-Fundador"}
                  </p>
                  <p className="text-xs text-gray-400 font-mono mb-4">
                    {member.role.split("•")[1] || member.role}
                  </p>

                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6 line-clamp-3">
                    {member.bio}
                  </p>

                  {/* Purple button "Sobre mí" matching wireframe */}
                  <div className="mt-auto w-full flex flex-col sm:flex-row gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedMember(member)}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 active:scale-95 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
                    >
                      Sobre mí <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                    <Link
                      to={member.socials?.portfolio || `/Nosotros/${member.id}`}
                      className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white font-mono text-xs flex items-center justify-center gap-1 border border-white/10 transition-colors"
                    >
                      Ficha <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Selected Profile Preview Tab */}
          {activeTab !== "all" && (
            <div className="p-8 rounded-3xl bg-[#0d101d] border border-cyan-500/30 space-y-6 shadow-2xl animate-in fade-in duration-300">
              {activeTab === "david" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs">
                    <Terminal className="w-4 h-4" /> ÁREA: ARQUITECTURA DE SOFTWARE & GAMEPLAY
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading">
                    David Saldarriaga • Lead Developer
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed max-w-3xl">
                    Encargado de la estabilidad, física kinemática a 120 FPS y la optimización de bajo nivel. Lidera el desarrollo de pipelines en Unity ECS y C#, asegurando que cada título de NoisyStudios tenga una respuesta de control milimétrica.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {davidData.skills.map((s, i) => (
                      <span key={i} className="px-3 py-1 rounded-lg text-xs font-mono bg-purple-950/40 text-purple-300 border border-purple-500/20">
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="pt-2">
                    <Link
                      to="/Nosotros/david"
                      className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:underline"
                    >
                      Ver portafolio técnico completo de David Saldarriaga <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}

              {activeTab === "estefania" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-pink-400 font-mono text-xs">
                    <BookOpen className="w-4 h-4" /> ÁREA: NARRATIVA & EXPERIENCIA DE USUARIO (UI/UX)
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading">
                    Estefania Aristizabal • Narrative Lead & UI/UX
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed max-w-3xl">
                    Diseña los universos temáticos, árboles de diálogo con consecuencias ramificadas e interfaces no invasivas que guían al jugador de forma orgánica. Combina investigación de usabilidad en videojuegos con diseño de pixel art de alta precisión.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {estefaData.skills.map((s, i) => (
                      <span key={i} className="px-3 py-1 rounded-lg text-xs font-mono bg-pink-950/40 text-pink-300 border border-pink-500/20">
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="pt-2">
                    <Link
                      to="/Nosotros/estefania"
                      className="inline-flex items-center gap-2 text-xs font-mono text-pink-400 hover:underline"
                    >
                      Ver portafolio de narrativa y UI/UX de Estefania Aristizabal <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}

              {activeTab === "rios" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs">
                    <Box className="w-4 h-4" /> ÁREA: DIRECCIÓN ARTÍSTICA & ENTORNOS 3D
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading">
                    Juan David Rios • Art Director & 3D Artist
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed max-w-3xl">
                    Creador de la atmósfera visual característica de NoisyStudios. Dirige el modelado 3D en Blender, texturizado estilizado en Substance Painter, composición de escenarios y esquemas de iluminación volumétrica que dotan de alma a cada escenario.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {riosData.skills.map((s, i) => (
                      <span key={i} className="px-3 py-1 rounded-lg text-xs font-mono bg-cyan-950/40 text-cyan-300 border border-cyan-500/20">
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="pt-2">
                    <Link
                      to="/Nosotros/rios"
                      className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:underline"
                    >
                      Ver galería de arte 3D y entornos de Juan David Rios <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        {/* =====================================================================
            4. NUESTROS VALORES (Wireframe 3 - 3 Circular Badges/Cards)
        ===================================================================== */}
        <section className="space-y-8">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <span className="w-1.5 h-6 bg-pink-500 rounded-full" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-pink-400">
                PRINCIPIOS FUNDAMENTALES
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
              Nuestros valores
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {studioValues.map((val, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-[#0f1322] border border-white/10 hover:border-pink-500/40 transition-all duration-300 flex flex-col items-center text-center space-y-4 shadow-xl"
              >
                <div className="w-20 h-20 rounded-full bg-[#182035] border border-pink-500/30 flex items-center justify-center text-pink-400 mb-2 shadow-lg shadow-pink-950/30">
                  {idx === 0 && <Gamepad2 className="w-9 h-9" />}
                  {idx === 1 && <Sparkles className="w-9 h-9" />}
                  {idx === 2 && <Users className="w-9 h-9" />}
                </div>

                <h3 className="text-lg font-bold text-white font-heading">
                  {val.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================================
            5. ¿QUIERES SER PARTE DE NUESTRO EQUIPO? (Wireframe 3)
        ===================================================================== */}
        <section className="text-center p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-purple-950/40 via-[#101426] to-cyan-950/40 border border-purple-500/30 shadow-2xl space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
            ¿Quieres ser parte de NoisyStudios?
          </h2>
          <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Siempre estamos buscando programadores de shaders, artistas de píxeles y diseñadores de niveles que compartan nuestra pasión por los videojuegos.
          </p>

          <div className="pt-2">
            <button
              onClick={() => setCareerModalOpen(true)}
              className="px-8 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 active:scale-95 text-white font-bold text-sm shadow-xl shadow-purple-600/30 transition-all cursor-pointer inline-flex items-center gap-2"
            >
              Ver oportunidades <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

      </div>

      {/* Member Details Modal */}
      <TeamMemberModal
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
        member={selectedMember}
      />

      {/* Career Modal */}
      {careerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#0f1320] border border-purple-500/30 rounded-2xl p-6 sm:p-8 space-y-5 text-left">
            <h3 className="text-2xl font-bold text-white font-heading">
              Vacantes & Colaboraciones // NoisyStudios
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Actualmente tenemos abiertas las siguientes posiciones para proyectos de 2025:
            </p>
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
                <span className="text-white font-bold">Shader & VFX Artist (Unity / HLSL)</span>
                <span className="text-cyan-400">Remoto</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
                <span className="text-white font-bold">Diseñador de Niveles 2D</span>
                <span className="text-purple-300">Freelance</span>
              </div>
            </div>
            <p className="text-xs text-gray-400">
              Envía tu portafolio o reel a <strong className="text-cyan-400">hola@noisystudios.dev</strong> con el asunto [Oportunidad 2025].
            </p>
            <button
              onClick={() => setCareerModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-all"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default Nosotros;
