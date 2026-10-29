import { useEffect, useRef, useState } from "react";
import { RoomEngine } from "./engine/RoomEngine";
import { loadSprites } from "./engine/loadSprites";
import { LW, LH } from "./engine/scenery";
import { SPRITES, OBJECTS, SPAWN } from "./roomConfig";

/**
 * Habitación isométrica mágica (pixel art) con una bruja que camina por clic.
 *
 * Props
 *  - name:      nombre que aparece en el letrero ("HABITACIÓN DE {name}")
 *  - title:     texto grande del letrero (por defecto "BIENVENIDOS")
 *  - subtitle:  sobrescribe el texto pequeño del letrero
 *  - maxScale:  ampliación máxima en píxeles CSS (por defecto 3)
 *  - showHint:  muestra la línea de ayuda debajo (por defecto true)
 *  - debug:     dibuja la grilla/celdas bloqueadas y expone window.__magicRoom
 */
export default function MagicRoom({ name = "", title = "BIENVENIDOS", subtitle, maxScale = 3, showHint = true, debug = false, className, style }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const [error, setError] = useState(null);
  const [ready, setReady] = useState(false);

  const signSubtitle = subtitle ?? (name ? `HABITACIÓN DE ${name}` : "HABITACIÓN MÁGICA");

  useEffect(() => {
    let disposed = false;
    let engine = null;
    let resizeObs = null, io = null;
    const reduced = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    loadSprites(SPRITES)
      .then(({ images, sprites }) => {
        if (disposed) return;
        engine = new RoomEngine(canvasRef.current, { images, sprites, objects: OBJECTS, spawn: SPAWN, title, subtitle: signSubtitle, reducedMotion: !!reduced, debug });
        engineRef.current = engine;
        if (debug) window.__magicRoom = engine;

        const fit = () => {
          const wrap = wrapRef.current, canvas = canvasRef.current;
          if (!wrap || !canvas) return;
          const dpr = window.devicePixelRatio || 1;
          const cssW = wrap.clientWidth || LW;
          // Integer scaling keeps every pixel the same size. On dense screens (phones, retina) a
          // fractional scale is invisible, so there we let the room fill the available width.
          const r = Math.min((cssW * dpr) / LW, maxScale * dpr);
          let k, cssWidth;
          if (dpr >= 2 && r >= 2.2) { k = Math.ceil(r); cssWidth = (r * LW) / dpr; }
          else { k = Math.max(1, Math.floor(r)); cssWidth = (LW * k) / dpr; }
          engine.setScale(k);
          canvas.style.width = `${cssWidth}px`;
        };
        fit();
        resizeObs = new ResizeObserver(fit);
        resizeObs.observe(wrapRef.current);

        // only animate while it is on screen and the tab is visible
        let visible = true;
        const sync = () => (visible && !document.hidden ? engine.start() : engine.stop());
        io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; sync(); }, { threshold: 0.01 });
        io.observe(wrapRef.current);
        document.addEventListener("visibilitychange", sync);
        engine._cleanupVis = () => document.removeEventListener("visibilitychange", sync);
        setReady(true);
        sync();
      })
      .catch((e) => { if (!disposed) setError(e.message); });

    return () => {
      disposed = true;
      resizeObs?.disconnect(); io?.disconnect();
      if (engine) { engine.stop(); engine._cleanupVis?.(); }
      if (debug && window.__magicRoom === engine) delete window.__magicRoom;
      engineRef.current = null;
    };
    // the sign texture is built once, so title/name changes remount the room
  }, [title, signSubtitle, maxScale, debug]);

  const e = () => engineRef.current;
  return (
    <div ref={wrapRef} className={className} style={{ width: "100%", ...style }}>
      <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", background: "linear-gradient(180deg,#120d2e,#2d1c52)", boxShadow: "0 18px 50px rgba(30,10,70,.45), inset 0 0 0 1px rgba(255,214,240,.18)", display: "flex", justifyContent: "center", lineHeight: 0, minHeight: ready ? 0 : 280 }}>
        <canvas
          ref={canvasRef}
          width={LW}
          height={LH}
          role="img"
          aria-label="Habitación isométrica mágica con una bruja. Haz clic en el suelo para caminar y toca las linternas, el caldero, el torii o los cojines para interactuar."
          style={{ display: "block", maxWidth: "100%", height: "auto", imageRendering: "pixelated", touchAction: "manipulation", cursor: "default" }}
          onClick={(ev) => e()?.handleClick(ev.clientX, ev.clientY)}
          onPointerMove={(ev) => e()?.handleMove(ev.clientX, ev.clientY, ev.pointerType === "touch")}
          onPointerLeave={() => e()?.handleLeave()}
        />
        {!ready && !error && <span style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", color: "#ffd0ee", font: "600 14px system-ui, sans-serif" }}>Preparando la magia…</span>}
        {error && <span style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", padding: 16, textAlign: "center", color: "#ffd0ee", font: "600 14px system-ui, sans-serif", lineHeight: 1.4 }}>{error}</span>}
      </div>
      {showHint && (
        <p style={{ margin: "12px 0 0", textAlign: "center", fontSize: 13, opacity: 0.7 }}>
          Haz clic en el suelo para caminar · toca las linternas, el caldero, el torii, el hongo y los cojines
        </p>
      )}
    </div>
  );
}
