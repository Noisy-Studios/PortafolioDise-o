import React, { useEffect, useState } from "react";
import { X, ExternalLink, Heart, Sparkles, Check, ShoppingCart, Share2 } from "lucide-react";

export function GameDetailModal({ game, isOpen, onClose }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !game) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl bg-[#0f1320] border border-purple-500/30 rounded-2xl overflow-hidden shadow-2xl shadow-purple-950/60 my-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cover Image with gradient overlay */}
        <div className="relative h-64 md:h-80 w-full overflow-hidden bg-gray-900">
          <img
            src={game.image || game.coverImage || game.bannerImage}
            alt={game.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1320] via-[#0f1320]/40 to-black/30" />
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-sm transition-all border border-white/10"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges on banner */}
          <div className="absolute bottom-4 left-6 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              {game.year || "2024"}
            </span>
            {game.badges && game.badges.map((b, i) => (
              <span key={i} className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white font-heading">
                {game.title}
              </h2>
              <p className="text-sm text-cyan-400 font-mono mt-1">
                {game.category || game.genre || "Acción / Aventura Indie"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-purple-300 font-mono">
                {game.price || "Gratis"}
              </span>
              <button
                onClick={() => setWishlisted(!wishlisted)}
                className={`p-2.5 rounded-xl border transition-all ${
                  wishlisted 
                    ? "bg-rose-500/20 border-rose-500 text-rose-400" 
                    : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
                }`}
                title="Añadir a lista de deseos"
              >
                <Heart className={`w-5 h-5 ${wishlisted ? "fill-rose-500" : ""}`} />
              </button>
              <button
                onClick={handleShare}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-all relative"
                title="Copiar enlace"
              >
                {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Share2 className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <p className="text-gray-300 text-base leading-relaxed">
            {game.description || game.desc || game.quote}
          </p>

          {/* Tags */}
          {game.tags && (
            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Etiquetas & Géneros
              </h4>
              <div className="flex flex-wrap gap-2">
                {game.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-mono text-gray-300 border border-white/5 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Key Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-[#14192a] border border-white/5">
              <span className="text-xs text-gray-400 block font-mono">PLATA DE MOTOR</span>
              <span className="text-sm font-semibold text-white">Unity / C#</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#14192a] border border-white/5">
              <span className="text-xs text-gray-400 block font-mono">ESTADO</span>
              <span className="text-sm font-semibold text-emerald-400">Optimizado PC / Steam Deck</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#14192a] border border-white/5">
              <span className="text-xs text-gray-400 block font-mono">CALIFICACIÓN</span>
              <span className="text-sm font-semibold text-purple-300">{game.rating || "9.4/10"}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
            <a
              href="https://store.steampowered.com"
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-3 px-5 rounded-xl bg-purple-600 hover:bg-purple-500 active:scale-[0.98] text-white font-semibold text-center flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
            >
              <ShoppingCart className="w-5 h-5" /> Adquirir en Steam
            </a>
            <button
              onClick={onClose}
              className="py-3 px-6 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-medium transition-all cursor-pointer"
            >
              Volver al catálogo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameDetailModal;
