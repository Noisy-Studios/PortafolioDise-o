import React from "react";
import { Link } from "react-router-dom";
import { 
  Palette, 
  Box, 
  Sparkles, 
  ArrowLeft, 
  ExternalLink, 
  Eye, 
  Layers, 
  SunMedium 
} from "lucide-react";
import { teamMembers } from "../../../data/portfolioData";

export function Rios() {
  const data = teamMembers.find((m) => m.id === "rios") || teamMembers[1];

  const artGallery = [
    {
      title: "Ruinas Ciberpunk - Sector 09",
      type: "Environment 3D / Blender",
      image: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=700&q=80",
      desc: "Modelado modular de estructuras metálicas oxidadas con iluminación volumétrica nocturna."
    },
    {
      title: "Cripta Mecánica Ancestral",
      type: "Level Design / Iluminación",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=700&q=80",
      desc: "Composición de escenarios subterráneos con fuentes de luz emisivas de color turquesa y violeta."
    },
    {
      title: "Estación Espacial Void",
      type: "Hard Surface Modeling",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=700&q=80",
      desc: "Assets modulares optimizados para baja latencia en consolas con texturas en 2K."
    }
  ];

  return (
    <div className="min-h-screen text-slate-100 pt-36 md:pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Back Link */}
        <Link
          to="/Nosotros"
          className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 font-mono transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Volver al equipo de NoisyStudios
        </Link>

        {/* Profile Header */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0f1322] border border-purple-500/30 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 relative z-10">
            <div className="w-36 h-36 rounded-2xl overflow-hidden p-1 bg-gradient-to-tr from-cyan-400 to-indigo-600 shrink-0 shadow-xl">
              <img
                src={data.avatar}
                alt={data.name}
                className="w-full h-full rounded-xl object-cover"
              />
            </div>

            <div className="space-y-4 text-center sm:text-left flex-1">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-2">
                  <Box className="w-3.5 h-3.5" /> 3D ART & ENVIRONMENT DIRECTION
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-heading">
                  {data.name}
                </h1>
                <p className="text-base sm:text-lg text-cyan-400 font-mono font-medium mt-1">
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

        {/* Art & Environment Showcase */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white font-heading flex items-center gap-2">
            <Palette className="w-6 h-6 text-cyan-400" /> Galería de Dirección Artística & Entornos
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {artGallery.map((item, idx) => (
              <div
                key={idx}
                className="group rounded-2xl bg-[#0f1322] border border-white/10 hover:border-cyan-500/40 overflow-hidden transition-all shadow-lg flex flex-col"
              >
                <div className="relative aspect-[4/3] bg-gray-900 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1322] via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-mono px-2 py-0.5 rounded bg-black/70 text-cyan-300 border border-cyan-500/30">
                    {item.type}
                  </span>
                </div>
                <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-white text-base font-heading">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

export default Rios;