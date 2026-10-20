import React, { useEffect, useRef, useState } from "react";
import { X, Play, RotateCcw, Volume2, VolumeX, Trophy } from "lucide-react";

export function PlayMiniGameModal({ prototype, isOpen, onClose }) {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const animationFrameId = useRef(null);

  // Simple Web Audio Sound Generator
  const playBeep = (freq, type = "sine", duration = 0.08) => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio not permitted or supported
    }
  };

  useEffect(() => {
    if (!isOpen) {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      setGameStarted(false);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let player = {
      x: canvas.width / 2,
      y: canvas.height - 40,
      width: 24,
      height: 24,
      speed: 6,
      color: "#00f5d4"
    };

    let particles = [];
    let obstacles = [];
    let localScore = 0;
    let isAlive = true;
    let spawnTimer = 0;
    let keys = {};

    const handleKeyDown = (e) => {
      keys[e.key] = true;
      if (e.key === "Escape") onClose();
    };

    const handleKeyUp = (e) => {
      keys[e.key] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    const spawnObstacle = () => {
      const size = Math.random() * 20 + 15;
      obstacles.push({
        x: Math.random() * (canvas.width - size),
        y: -size,
        size,
        speed: Math.random() * 2.5 + 2.5 + Math.min(localScore * 0.05, 5),
        color: Math.random() > 0.5 ? "#8b5cf6" : "#ec4899"
      });
    };

    const loop = () => {
      ctx.fillStyle = "#0a0d16";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Cyber grid background
      ctx.strokeStyle = "rgba(139, 92, 246, 0.1)";
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      if (isAlive) {
        // Player input
        if (keys["ArrowLeft"] || keys["a"] || keys["A"]) player.x -= player.speed;
        if (keys["ArrowRight"] || keys["d"] || keys["D"]) player.x += player.speed;

        // Boundaries
        player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));

        // Draw Player with glow
        ctx.save();
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#00f5d4";
        ctx.fillStyle = "#00f5d4";
        ctx.fillRect(player.x, player.y, player.width, player.height);
        // Core
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(player.x + 6, player.y + 6, 12, 12);
        ctx.restore();

        // Spawn obstacles
        spawnTimer++;
        if (spawnTimer % 35 === 0) {
          spawnObstacle();
        }

        // Update obstacles
        for (let i = obstacles.length - 1; i >= 0; i--) {
          const obs = obstacles[i];
          obs.y += obs.speed;

          ctx.save();
          ctx.shadowBlur = 10;
          ctx.shadowColor = obs.color;
          ctx.fillStyle = obs.color;
          ctx.fillRect(obs.x, obs.y, obs.size, obs.size);
          ctx.restore();

          // Collision detection
          if (
            player.x < obs.x + obs.size &&
            player.x + player.width > obs.x &&
            player.y < obs.y + obs.size &&
            player.y + player.height > obs.y
          ) {
            isAlive = false;
            setGameOver(true);
            playBeep(120, "sawtooth", 0.3);
          }

          // Off screen
          if (obs.y > canvas.height) {
            obstacles.splice(i, 1);
            localScore += 10;
            setScore(localScore);
            setHighScore((prev) => Math.max(prev, localScore));
            if (localScore % 50 === 0) {
              playBeep(440 + localScore * 2, "sine", 0.08);
            }
          }
        }
      }

      animationFrameId.current = requestAnimationFrame(loop);
    };

    if (gameStarted) {
      animationFrameId.current = requestAnimationFrame(loop);
    } else {
      // Draw idle preview
      ctx.fillStyle = "#0a0d16";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#a78bfa";
      ctx.font = "16px 'Space Grotesk', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Presiona 'Iniciar Prototipo' para jugar", canvas.width / 2, canvas.height / 2);
    }

    return () => {
      cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isOpen, gameStarted, isMuted]);

  const restartGame = () => {
    setScore(0);
    setGameOver(false);
    setGameStarted(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-[#0f1320] border border-cyan-500/30 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-950/40 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#14192b]/80">
          <div>
            <span className="text-xs font-mono text-cyan-400 block">GAME JAM PROTOTYPE // BROWSER LIVE</span>
            <h3 className="font-bold text-lg text-white font-heading">
              {prototype?.title || "Prototipo Interactivo"}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"
              title={isMuted ? "Activar audio" : "Silenciar"}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 text-cyan-400" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Score Board */}
        <div className="flex items-center justify-between px-6 py-2.5 bg-[#0a0d16] border-b border-white/5 font-mono text-xs">
          <span className="text-gray-400">
            PUNTAJE: <strong className="text-cyan-400 text-sm">{score}</strong>
          </span>
          <span className="text-gray-400 flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-amber-400" /> RÉCORD: <strong className="text-amber-300 text-sm">{highScore}</strong>
          </span>
          <span className="text-gray-400">CONTROLES: <strong className="text-purple-300">← / → ó A / D</strong></span>
        </div>

        {/* Canvas Area */}
        <div className="relative flex justify-center bg-black p-4">
          <canvas
            ref={canvasRef}
            width={480}
            height={320}
            className="rounded-xl border border-white/10 w-full max-w-[480px] h-[320px] bg-[#0a0d16] shadow-inner"
          />

          {!gameStarted && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-xs p-6 text-center">
              <h4 className="text-xl font-bold text-white mb-2 font-heading">¿Listo para probar el prototipo?</h4>
              <p className="text-sm text-gray-300 max-w-xs mb-5">
                Esquiva los proyectiles energéticos que caen usando las flechas de tu teclado.
              </p>
              <button
                onClick={() => setGameStarted(true)}
                className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/30 transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-black" /> Iniciar Prototipo
              </button>
            </div>
          )}

          {gameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/75 backdrop-blur-xs p-6 text-center">
              <h4 className="text-2xl font-bold text-rose-400 mb-1 font-heading">¡Sistema Colapsado!</h4>
              <p className="text-sm text-gray-300 mb-2">Puntaje alcanzado: <strong className="text-cyan-300 font-mono text-base">{score}</strong></p>
              <button
                onClick={restartGame}
                className="mt-3 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-purple-600/40 transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" /> Reintentar
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#14192b]/60 flex items-center justify-between text-xs text-gray-400">
          <span>{prototype?.event || "Global Game Jam"} • Prototipo WebGL / Canvas</span>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white font-medium"
          >
            Volver a Prototipos
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlayMiniGameModal;
