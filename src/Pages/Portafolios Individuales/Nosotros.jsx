import React, { useState } from "react";
import { Link } from "react-router";
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
  Send 
} from "lucide-react";
import { teamMembers, studioValues, studioInfo } from "../../data/portfolioData";
import TeamMemberModal from "../../components/TeamMemberModal";

export function Nosotros() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [careerModalOpen, setCareerModalOpen] = useState(false);

  return (
    <div className="min-h-screen text-slate-100 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">

        {/* =====================================================================
            1. HERO & SOMOS (Wireframe 3)
        ===================================================================== */}
        <section className="space-y-6 pt-6">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-6 bg-cyan-400 rounded-full" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
              SOMOS
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-heading tracking-tight">
            Noisy Studios <span className="text-purple-400">//</span> PixelRift
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-gray-300 text-base sm:text-lg leading-relaxed">
            <div className="lg:col-span-6 space-y-4">
              <p>
                Somos un colectivo apasionado de desarrolladores, artistas técnicos y diseñadores narrativos que creen firmemente que los videojuegos son la forma de arte definitiva de nuestra era.
              </p>
              <p>
                Nacimos en aulas universitarias y Game Jams de fin de semana, con el propósito firme de demostrar que los estudios pequeños y enfocados pueden crear obras de enorme impacto emocional, innovación en mecánicas y pulido artesanal.
              </p>
            </div>
            <div className="lg:col-span-6 space-y-4">
              <p>
                En cada línea de código en C#, cada modelo esculpido en Blender y cada interfaz diseñada, buscamos que el jugador experimente esa chispa irrepetible de asombro que nos enamoró de este medio en primer lugar.
              </p>
              <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 text-purple-200 text-sm font-mono flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shrink-0" />
                <span>Base de operaciones: Medellín, Colombia • Trabajo Remoto Global</span>
              </div>
            </div>
          </div>

          {/* Cinematic Studio Showcase Banner (Wireframe 3 angular / widescreen box) */}
          <div className="relative rounded-3xl overflow-hidden aspect-[21/9] sm:aspect-[24/9] border border-white/10 shadow-2xl mt-8 bg-gray-900 group">
            <img
              src="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1600&q=80"
              alt="Studio workspace"
              className="w-full h-full object-cover filter brightness-75 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080a0f] via-transparent to-black/30" />
            <div className="absolute bottom-6 left-6 sm:left-10 text-left">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest block mb-1">
                ESPACIO CREATIVO
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
            {/* Left Image matching wireframe */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-900 border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80"
                alt="Game jam and milestones"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 font-mono text-xs text-purple-300">
                DESDE 2022 // RECONOCIMIENTO INDIE
              </div>
            </div>

            {/* Right Story Text matching wireframe */}
            <div className="lg:col-span-7 space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
              <p>
                Todo comenzó en una maratón de desarrollo de 48 horas en 2022. Con apenas un par de computadoras portátiles, termos de café y la convicción de crear un juego con una física inusual, logramos el primer lugar de la categoría técnica en nuestra primera Game Jam.
              </p>
              <p>
                Aquella chispa inicial nos motivó a formalizar el estudio bajo la visión de <strong>PixelRift / Noisy Studios</strong>. En lugar de perseguir gráficos hiperrealistas que demandan presupuestos millonarios, nos concentramos en lo que verdaderamente hace memorable a un videojuego: respuesta impecable a los controles, atmósfera cautivante y mecánicas genuinamente divertidas.
              </p>
              <p>
                Hoy, con más de 120,000 jugadores en nuestras distintas plataformas y una comunidad en constante crecimiento, continuamos expandiendo el catálogo sin perder nuestra esencia artesanal.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================================
            3. EL EQUIPO (Wireframe 3 - 3 Circular Avatars & "Sobre mí" buttons)
        ===================================================================== */}
        <section className="space-y-8" id="equipo">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <span className="w-1.5 h-6 bg-cyan-400 rounded-full" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
                TALENTO HUMANO
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
              El equipo
            </h2>
            <p className="text-gray-400 text-sm mt-1 max-w-xl">
              Conoce a los creadores detrás de la programación, el arte 3D y la experiencia de usuario.
            </p>
          </div>

          {/* 3 Circular Avatar Cards matching Wireframe 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="group rounded-3xl bg-[#0f1322] border border-white/10 hover:border-purple-500/50 p-8 flex flex-col items-center text-center transition-all duration-300 shadow-xl hover:-translate-y-2 relative"
              >
                {/* Circular Avatar matching wireframe circle */}
                <div className="relative mb-6">
                  <div className="w-32 h-32 rounded-full overflow-hidden p-1 bg-gradient-to-tr from-purple-600 via-indigo-500 to-cyan-400 shadow-xl group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-[#0f1322]" title="En activo" />
                </div>

                {/* Member Info */}
                <h3 className="text-xl font-bold text-white font-heading group-hover:text-cyan-300 transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs font-mono text-purple-400 font-semibold mt-1 mb-3 uppercase tracking-wider">
                  {member.role}
                </p>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6 line-clamp-3">
                  {member.bio}
                </p>

                {/* Purple button "Sobre mí" matching wireframe */}
                <button
                  type="button"
                  onClick={() => setSelectedMember(member)}
                  className="mt-auto px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 active:scale-95 text-white font-semibold text-xs flex items-center gap-1.5 shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
                >
                  Sobre mí <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
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
                {/* Circular Icon Placeholder matching wireframe */}
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
            ¿Quieres ser parte de nuestro equipo?
          </h2>
          <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Siempre estamos buscando programadores de shaders, artistas de píxeles y diseñadores de niveles que compartan nuestra obsesión por los videojuegos.
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
              Vacantes & Colaboraciones
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
              Envía tu portafolio o reel a <strong className="text-cyan-400">hola@pixelrift.dev</strong> con el asunto [Oportunidad 2025].
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
