import React from "react";
import { Link } from "react-router";
import { 
  Sparkles, 
  Palette, 
  BookOpen, 
  ArrowLeft, 
  ExternalLink, 
  Layers, 
  Compass, 
  HeartHandshake 
} from "lucide-react";
import { teamMembers } from "../../../data/portfolioData";

export function Estefa() {
  const data = teamMembers.find((m) => m.id === "estefania") || teamMembers[2];

  const narrativeWorks = [
    {
      title: "Biblia de Universo y Lore: Aetheria",
      category: "Worldbuilding & Mitos",
      desc: "Documento de 140 páginas que establece la cosmología, las facciones políticas y los dialectos sintéticos de las ruinas."
    },
    {
      title: "Sistema de Diálogos Ramificados & HUD No-Invasivo",
      category: "UI / UX & Narrativa Interactiva",
      desc: "Diseño de un sistema de elecciones con consecuencias éticas reales y una interfaz limpia que respeta la inmersión del jugador."
    },
    {
      title: "Diseño de Iconografía y Tipografías Retro-Futuristas",
      category: "Diseño Gráfico & Pixel UI",
      desc: "Creación de un set de más de 80 glifos diegéticos que los jugadores deben traducir para acceder a áreas secretas."
    }
  ];

  return (
    <div className="min-h-screen text-slate-100 pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Back Link */}
        <Link
          to="/Nosotros"
          className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 font-mono transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Volver al equipo de Noisy Studios
        </Link>

        {/* Profile Header */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0f1322] border border-pink-500/30 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-pink-600/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 relative z-10">
            <div className="w-36 h-36 rounded-2xl overflow-hidden p-1 bg-gradient-to-tr from-pink-500 to-purple-600 shrink-0 shadow-xl">
              <img
                src={data.avatar}
                alt={data.name}
                className="w-full h-full rounded-xl object-cover"
              />
            </div>

            <div className="space-y-4 text-center sm:text-left flex-1">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-950/40 border border-pink-500/30 text-pink-300 text-xs font-mono mb-2">
                  <BookOpen className="w-3.5 h-3.5" /> NARRATIVE DESIGN & GAMING UI/UX
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-heading">
                  {data.name}
                </h1>
                <p className="text-base sm:text-lg text-pink-400 font-mono font-medium mt-1">
                  {data.role}
                </p>
              </div>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                {data.bio}
              </p>

              <div className="flex flex-wrap gap-2 pt-2 justify-center sm:justify-start">
                {data.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg text-xs font-mono bg-[#182035] text-gray-200 border border-white/10"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Narrative & UI Systems */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white font-heading flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-pink-400" /> Trabajos Narrativos & Arquitectura de Interfaz
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {narrativeWorks.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0f1322] border border-white/10 hover:border-pink-500/40 transition-all space-y-3 shadow-lg"
              >
                <span className="text-[10px] font-mono font-bold text-pink-400 uppercase tracking-wider block">
                  {item.category}
                </span>
                <h3 className="text-lg font-bold text-white font-heading">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

export default Estefa;
