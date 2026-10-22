import React, { useEffect, useRef, useState } from "react";
import { X, Maximize, ExternalLink, Gamepad2, RotateCcw } from "lucide-react";

export function PlayableGameModal({ game, isOpen, onClose }) {
  const containerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && !document.fullscreenElement) {
        onClose();
      }
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

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  if (!isOpen || !game) return null;

  // Build full URL for the Unity WebGL build (Itch.io para Tessera / Mil Gatitos, Local para Galactic Decree)
  const baseUrl = import.meta.env.BASE_URL || "/";
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;

  const getGameUrl = (gameObj) => {
    const id = gameObj?.id || gameObj?.title || "";

    if (id === "Tessera" || id.toLowerCase().includes("tessera")) {
      return "https://itch.io/embed-upload/19942661?color=121627";
    }
    if (id === "Milgatitos" || id.toLowerCase().includes("gatitos")) {
      return "https://itch.io/embed-upload/19942717?color=121627";
    }

    // Default: Build local (Galactic Decree, etc.)
    const buildPath = gameObj?.buildPath?.startsWith("/") ? gameObj.buildPath.slice(1) : gameObj?.buildPath;
    return `${normalizedBase}${buildPath}`;
  };

  const gameUrl = getGameUrl(game);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch((err) => {
        console.warn("Fullscreen request error:", err);
      });
    } else {
      document.exitFullscreen?.().catch((err) => {
        console.warn("Exit fullscreen error:", err);
      });
    }
  };

  const handleRestart = () => {
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div
        ref={containerRef}
        className="relative w-full max-w-5xl bg-[#0c0f1a] border border-cyan-500/30 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-950/50 flex flex-col max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10 bg-[#121729]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Gamepad2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base sm:text-lg font-heading tracking-wide flex items-center gap-2">
                {game.title}
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                  PLAYABLE WEBGL
                </span>
              </h3>
              <p className="text-[11px] text-gray-400 font-mono hidden sm:block">
                Noisy Studios • Versión jugable en navegador
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRestart}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
              title="Reiniciar juego"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
              title="Pantalla completa"
            >
              <Maximize className="w-4 h-4" />
            </button>
            <a
              href={gameUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-cyan-300 transition-colors"
              title="Abrir en pestaña nueva"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 transition-colors"
              aria-label="Cerrar juego"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Game Iframe Container */}
        <div className="relative w-full aspect-video bg-black flex-1 min-h-[360px] sm:min-h-[520px]">
          <iframe
            key={iframeKey}
            src={gameUrl}
            title={game.title}
            className="w-full h-full border-0"
            allow="autoplay; fullscreen; gamepad; focus-without-user-activation *"
          />
        </div>

        {/* Footer info */}
        <div className="px-4 sm:px-6 py-2 bg-[#090c14] border-t border-white/5 flex flex-wrap items-center justify-between text-xs text-gray-400 gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[11px]">Motor: Unity WebGL • 60 FPS</span>
          </div>
          <div className="font-mono text-[11px] text-gray-400">
            Controles: Ratón y Teclado • Haz clic dentro del juego para interactuar
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayableGameModal;