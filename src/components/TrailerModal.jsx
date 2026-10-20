import React, { useEffect } from "react";
import { X, ExternalLink, Play } from "lucide-react";

export function TrailerModal({ isOpen, onClose, title = "Tráiler Oficial", videoUrl }) {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-[#0f1320] border border-purple-500/30 rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/40"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#14192b]/80">
          <div className="flex items-center space-x-3">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
            </span>
            <h3 className="font-bold text-lg text-white font-heading tracking-wide">
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Container */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
          {videoUrl ? (
            <iframe
              src={videoUrl}
              title={title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="relative w-full h-full flex flex-col items-center justify-center text-center p-8 bg-gradient-to-br from-purple-950/40 via-black to-cyan-950/40">
              <div className="w-20 h-20 rounded-full bg-purple-600/30 border border-purple-500/50 flex items-center justify-center mb-4 text-purple-300">
                <Play className="w-10 h-10 ml-1 fill-purple-400" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Tráiler Cinemático In-Game</h4>
              <p className="text-gray-400 max-w-md text-sm mb-6">
                Capturado en tiempo real a 4K 60FPS en motor con efectos de iluminación por trazado de rayos.
              </p>
              <div className="flex gap-3">
                <a 
                  href="https://store.steampowered.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-sm flex items-center gap-2 transition-all shadow-lg shadow-purple-600/40"
                >
                  Ver en Steam <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-[#0a0d16] flex items-center justify-between text-xs text-gray-400">
          <span>PIXELRIFT STUDIOS // MOTOR PROPIO & UNITY ENGINE</span>
          <span className="text-purple-400 font-mono">CALIDAD: 4K ULTRA HD</span>
        </div>
      </div>
    </div>
  );
}

export default TrailerModal;
