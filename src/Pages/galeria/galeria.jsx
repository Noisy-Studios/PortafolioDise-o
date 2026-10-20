import React, { useState } from "react";
import { Link } from "react-router";
import { Sparkles, Image as ImageIcon, Eye, ArrowLeft, Filter } from "lucide-react";
import { gamesCatalog } from "../../data/portfolioData";
import GameDetailModal from "../../components/GameDetailModal";

export function Galeria() {
  const [selectedGame, setSelectedGame] = useState(null);

  const galleryItems = [
    {
      title: "Ciberciudad Neón - Vista Panorámica",
      game: "CyberPhantom",
      category: "Environment Concept",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Combate contra el Titán Mecánico",
      game: "Aetheria",
      category: "In-Game Screenshot",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Mazmorra Procedural de Cristal",
      game: "Neon Horizon",
      category: "Level Design",
      image: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Anomalía Espacial - Sector Alfa",
      game: "Void Walker",
      category: "VFX & Shaders",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Diseño de Sprites y Animación Retro",
      game: "Rune Blade",
      category: "Pixel Art",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Pista Anti-Gravedad en la Estratosfera",
      game: "Kinetic Drift",
      category: "Work In Progress",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80"
    }
  ];

  return (
    <div className="min-h-screen text-slate-100 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <ImageIcon className="w-3.5 h-3.5" /> ARTE & CAPTURAS IN-GAME
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-heading">
            Galería Visual
          </h1>
          <p className="text-gray-400 text-base max-w-2xl">
            Explora capturas en alta resolución, concept art y modelos 3D creados por nuestro equipo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              className="group rounded-2xl bg-[#0f1322] border border-white/10 hover:border-purple-500/50 overflow-hidden shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative aspect-[16/10] bg-gray-900 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-mono bg-black/60 text-cyan-300 border border-cyan-500/30 backdrop-blur-xs">
                  {item.category}
                </span>
                <span className="absolute bottom-3 left-3 text-xs font-mono text-purple-300 font-bold">
                  {item.game}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-white text-sm font-heading group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>

      <GameDetailModal
        isOpen={!!selectedGame}
        onClose={() => setSelectedGame(null)}
        game={selectedGame}
      />
    </div>
  );
}

export default Galeria;
