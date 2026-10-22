import React, { useEffect } from "react";
import { X } from "lucide-react";

export function PlayMiniGameModal({ prototype, isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const baseUrl = import.meta.env.BASE_URL || "/";
  
  // Si el prototipo trae un id específico (como "Milgatitos" o "GalacticDecree"), lo usa.
  // De lo contrario, usa "Milgatitos" como opción por defecto.
  const gameFolder = prototype?.id || "Milgatitos";
  const gameUrl = `${baseUrl}Builds/${gameFolder}/index.html`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl h-[85vh] bg-[#080a0f] border border-purple-500/30 rounded-2xl overflow-hidden shadow-2xl shadow-purple-950/60 flex flex-col text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header del Modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#121627]">
          <div>
            <span className="text-xs font-mono text-cyan-400 block uppercase tracking-wider">
              {prototype?.event || "VERSIÓN DEMO EN VIVO"} // BUILD WEBGL
            </span>
            <h3 className="font-bold text-lg text-white font-heading">
              {prototype?.title || "Demostración Jugable"}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-white text-xs font-mono font-bold transition-colors cursor-pointer flex items-center gap-1.5 border border-red-500/30"
            aria-label="Cerrar juego"
          >
            <X className="w-4 h-4" /> Cerrar [ESC]
          </button>
        </div>

        {/* Visor del Juego en Vivo (Iframe WebGL) */}
        <div className="flex-1 w-full h-full bg-black relative">
          <iframe
            src={gameUrl}
            title={prototype?.title || "Juego WebGL"}
            className="w-full h-full border-0"
            allow="autoplay; fullscreen; gamepad; clipboard-read; clipboard-write"
          />
        </div>

        {/* Footer del Modal */}
        <div className="px-6 py-3 bg-[#121627] border-t border-white/10 flex items-center justify-between text-xs text-gray-400 font-mono">
          <span>Usa los controles del juego dentro de la pantalla</span>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white transition-colors cursor-pointer"
          >
            Volver al catálogo
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlayMiniGameModal;