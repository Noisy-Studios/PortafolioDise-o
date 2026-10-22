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
  ChevronRight,
  User
} from "lucide-react";
import { teamMembers, studioValues, studioInfo } from "../../data/portfolioData";

export function Nosotros() {
  const [careerModalOpen, setCareerModalOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen text-slate-100 pt-32 md:pt-24 pb-20 bg-[#080a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">

        {/* =====================================================================
            1. HERO & SOMOS (Wireframe 3 - Noisy Studios)
        ===================================================================== */}
        <section className="space-y-6 pt-2 md:pt-6">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-6 bg-cyan-400 rounded-full" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
              SOMOS
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-heading tracking-tight">
              Noisy Studios
            </h1>
            <p className="text-sm font-mono text-purple-400 uppercase tracking-widest font-semibold">
              ESTUDIO INDIE DE VIDEOJUEGOS // EQUIPO FUNDADOR UNIVERSITARIO
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-gray-300 text-base sm:text-lg leading-relaxed">
            <div className="lg:col-span-6 space-y-4">
              <p>
                <strong>Noisy Studios</strong> es un estudio independiente de videojuegos formado por estudiantes universitarios y liderado por sus tres dueños: <strong>David Saldarriaga</strong>, <strong>Estefania Aristizabal</strong> y <strong>Juan David Rios</strong>.
              </p>
              <p>
                Creemos que los videojuegos son el medio interactivo definitivo. Diseñamos, programamos y pulimos nuestros proyectos con el objetivo de brindar experiencias accesibles y divertidas directamente desde el navegador web.
              </p>
            </div>
            <div className="lg:col-span-6 space-y-4">
              <p>
                Actualmente contamos con <strong>3 títulos publicados</strong>: <em>Galactic Decree</em>, <em>Mil Gatitos</em> y <em>Tessera</em>, todos desarrollados en Unity y optimizados mediante compilaciones WebGL para una experiencia inmediata.
              </p>
              <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/30 text-purple-200 text-sm font-mono flex items-center gap-3 shadow-lg">
                <Crown className="w-5 h-5 text-amber-400 shrink-0" />
                <span>3 Proyectos Activos • Dirección Creativa y Técnica por sus fundadores.</span>
              </div>
            </div>
          </div>

          {/* Cinematic Studio Showcase Banner */}
          <div className="relative rounded-3xl overflow-hidden aspect-[21/9] sm:aspect-[24/9] border border-white/10 shadow-2xl mt-8 bg-gray-900 group">
            <img
              src="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1600&q=80"
              alt="Noisy Studios Creative Lab"
              className="w-full h-full object-cover filter brightness-75 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080a0f] via-transparent to-black/30" />
            <div className="absolute bottom-6 left-6 sm:left-10 text-left">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest block mb-1">
                ESPACIO CREATIVO // NOISY STUDIOS
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
                alt="Historia de Noisy Studios"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 font-mono text-xs text-cyan-300">
                PROYECTOS UNIVERSITARIOS // NOISY STUDIOS
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
              <p>
                <strong>Noisy Studios</strong> nació en el entorno universitario de la mano de <strong>David Saldarriaga</strong>, <strong>Estefania Aristizabal</strong> y <strong>Juan David Rios</strong>, unidos por la curiosidad de entender cómo se crean los videojuegos desde sus cimientos.
              </p>
              <p>
                Lo que comenzó como ejercicios académicos y pruebas técnicas en Unity dio vida a nuestros primeros 3 títulos: la estrategia galáctica de <em>Galactic Decree</em>, las divertidas físicas de <em>Mil Gatitos</em> y los rompecabezas de perspectiva en <em>Tessera</em>.
              </p>
              <p>
                Cada uno de nosotros asume un área clave: arquitectura de código, narrativa y diseño de interfaz, y modelado artístico 3D.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================================
            3. LOS DUEÑOS & EL EQUIPO FUNDADOR (Wireframe 3 - Placeholders & "Mi espacio")
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
              Conoce a los tres líderes y propietarios de Noisy Studios. Haz clic en "Sobre mí" para conocer el perfil y trabajo de cada uno.
            </p>
          </div>

          {/* 3 Circular Avatar Cards matching Wireframe 3 - With PLACEHOLDERS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => {
              const targetUrl = member.socials?.portfolio || `/Nosotros/${member.id}`;

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

                  {/* Circular Avatar Placeholder - EMPTY IMAGE AS REQUESTED */}
                  <Link
                    to={targetUrl}
                    className="relative mb-6 mt-2 block group/avatar cursor-pointer"
                    title={`Ver perfil de ${member.name}`}
                  >
                    <div className="w-32 h-32 rounded-full bg-[#161c30] border-2 border-purple-500/40 flex items-center justify-center text-gray-500 shadow-xl group-hover:border-cyan-400 group-hover:scale-105 transition-all duration-300">
                      <User className="w-14 h-14 text-purple-400/50 group-hover:text-cyan-400/70 transition-colors" />
                    </div>
                    <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-[#0f1322]" title="Activo" />
                  </Link>

                  {/* Member Info */}
                  <Link to={targetUrl} className="group-hover:text-cyan-300 transition-colors">
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
                      {member.name}
                    </h3>
                  </Link>

                  <p className="text-xs font-mono text-purple-400 font-semibold mt-1 mb-3 uppercase tracking-wider">
                    {member.ownerBadge || "Dueño & Co-Fundador"}
                  </p>
                  <p className="text-xs text-gray-400 font-mono mb-4">
                    {member.role.split("•")[1] || member.role}
                  </p>

                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6 line-clamp-3">
                    {member.bio}
                  </p>

                  {/* Buttons per requirement:
                      1. "Sobre mí" navigates to the portfolio destination (where Ficha previously went).
                      2. "Mi espacio" button is without functionality (no redirect, no action).
                  */}
                  <div className="mt-auto w-full flex flex-col sm:flex-row gap-2">
                    <Link
                      to={targetUrl}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 active:scale-95 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
                    >
                      Sobre mí <ChevronRight className="w-3.5 h-3.5" />
                    </Link>

                    {/* Button renamed to "Mi espacio" without functionality */}
                    <button
                      type="button"
                      disabled
                      aria-disabled="true"
                      onClick={(e) => e.preventDefault()}
                      className="px-4 py-2.5 rounded-xl bg-white/5 text-gray-500 font-mono text-xs border border-white/5 cursor-default select-none opacity-60"
                      title="Mi espacio (próximamente)"
                    >
                      Mi espacio
                    </button>
                  </div>
                </div>
              );
            })}
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
            ¿Quieres colaborar con Noisy Studios?
          </h2>
          <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Siempre estamos abiertos a colaborar con otros estudiantes apasionados por el desarrollo de videojuegos, arte 3D y sonido.
          </p>

          <div className="pt-2">
            <button
              onClick={() => setCareerModalOpen(true)}
              className="px-8 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 active:scale-95 text-white font-bold text-sm shadow-xl shadow-purple-600/30 transition-all cursor-pointer inline-flex items-center gap-2"
            >
              Contactar para colaboraciones <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

      </div>

      {/* Career / Colaboración Modal */}
      {careerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#0f1320] border border-purple-500/30 rounded-2xl p-6 sm:p-8 space-y-5 text-left">
            <h3 className="text-2xl font-bold text-white font-heading">
              Colaboraciones // Noisy Studios
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              ¿Eres estudiante o apasionado por los videojuegos y te gustaría sumarte a futuros proyectos?
            </p>
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
                <span className="text-white font-bold">Composición de Audio & SFX</span>
                <span className="text-cyan-400">Colaboración</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
                <span className="text-white font-bold">Playtesting & Feedback</span>
                <span className="text-purple-300">Comunidad</span>
              </div>
            </div>
            <p className="text-xs text-gray-400">
              Escríbenos directamente a <strong className="text-cyan-400">hola@noisystudios.dev</strong>.
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
