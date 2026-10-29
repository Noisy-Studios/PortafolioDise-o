import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ROOM_OBJECTS } from "./art/furniture";
import { avatarPortrait } from "./art/avatar";
import { P } from "./engine/iso";
import { Buf } from "./engine/pixel";
import { CANVAS_H, CANVAS_W, buildScene, renderFrame } from "./scene";
import { createController, isMoveKey } from "./controller";

let sharedScene = null;
const getScene = () => {
  if (!sharedScene) sharedScene = buildScene();
  return sharedScene;
};

const toPercent = ([x, y]) => ({ left: `${(x / CANVAS_W) * 100}%`, top: `${(y / CANVAS_H) * 100}%` });

/**
 * Habitación isométrica estilo Habbo en pixel art.
 * - Clic en el piso para caminar (8 direcciones), clic en sillas/sofá/puff para sentarse.
 * - Los objetos con `stop` (arcade, escritorio, TV, buzón) disparan `onStop(id)`.
 * - Teclado: flechas o WASD para caminar, E/Enter para usar o levantarse.
 */
export default function HabboRoom({ name = "David", stops = [], onStop }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const bubbleRef = useRef(null);
  const [controller] = useState(() => createController(getScene));
  const [scale, setScale] = useState(1);
  const [hover, setHover] = useState(null);
  const [bubble, setBubble] = useState({ id: 1, text: "¡Hola! Pasa, estás en mi estudio." });

  const reducedMotion = useMemo(
    () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  const say = useCallback((text) => setBubble((current) => ({ id: current.id + 1, text })), []);

  useEffect(() => {
    controller.bridge.say = say;
    controller.bridge.onStop = onStop ?? (() => {});
    controller.bridge.stops = stops;
  });

  useEffect(() => {
    if (!bubble.text) return undefined;
    const timer = setTimeout(() => setBubble((current) => (current.id === bubble.id ? { ...current, text: null } : current)), 4500);
    return () => clearTimeout(timer);
  }, [bubble.id, bubble.text]);

  // Escala entera cuando cabe (píxeles nítidos); si no, se ajusta al ancho disponible.
  useEffect(() => {
    const element = wrapRef.current;
    if (!element || typeof ResizeObserver === "undefined") return undefined;
    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      setScale(width >= CANVAS_W * 2 ? Math.floor(width / CANVAS_W) : width / CANVAS_W);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Bucle de juego a ~30 fps (se pausa fuera de pantalla).
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return undefined;
    const scene = getScene();
    const image = ctx.createImageData(CANVAS_W, CANVAS_H);
    const frame = new Buf(CANVAS_W, CANVAS_H, new Uint32Array(image.data.buffer));
    let raf = 0;
    let last = 0;
    let visible = true;
    const observer =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
          })
        : null;
    observer?.observe(canvas);

    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      if (!visible || now - last < 33) return;
      last = now;
      controller.update(now);
      const view = controller.view(now, !reducedMotion);
      renderFrame(scene, frame, now / 1000, view);
      ctx.putImageData(image, 0, 0);
      const bubbleEl = bubbleRef.current;
      if (bubbleEl) {
        const headOffset = view.avatar.pose === "sit" ? 36 : 42;
        const pos = toPercent([view.avatar.x, view.avatar.y - headOffset]);
        bubbleEl.style.left = pos.left;
        bubbleEl.style.top = pos.top;
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
    };
  }, [controller, reducedMotion]);

  const toCanvas = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return [((event.clientX - rect.left) / rect.width) * CANVAS_W, ((event.clientY - rect.top) / rect.height) * CANVAS_H];
  };

  const labelFor = (object) => {
    if (object.stop) {
      const stop = stops.find((item) => item.id === object.stop);
      return { title: stop?.label ?? object.id, hint: "Clic para usar", Icon: stop?.Icon };
    }
    if (object.seats) return { title: object.label, hint: "Clic para sentarte" };
    return { title: object.label, hint: "Clic para acariciar" };
  };

  const showHover = (object) => {
    controller.input.hoverId = object?.id ?? null;
    setHover((current) => {
      if ((current?.id ?? null) === (object?.id ?? null)) return current;
      return object ? { id: object.id, at: P(...object.labelAt), ...labelFor(object) } : null;
    });
  };

  const handlePointerMove = (event) => {
    const [x, y] = toCanvas(event);
    const hit = controller.pick(x, y);
    controller.input.hoverTile = hit?.tile ?? null;
    showHover(hit?.object ?? null);
    event.currentTarget.style.cursor = hit?.object || hit?.tile ? "pointer" : "default";
  };

  const handlePointerLeave = () => {
    controller.input.hoverTile = null;
    showHover(null);
  };

  const handleClick = (event) => {
    const [x, y] = toCanvas(event);
    const hit = controller.pick(x, y);
    if (hit?.object) controller.handleObject(hit.object, [x, y]);
    else if (hit?.tile) controller.clickTile(hit.tile);
  };

  const handleKeyDown = (event) => {
    const key = event.key.toLowerCase();
    if (isMoveKey(key)) {
      event.preventDefault();
      controller.input.keys.add(key);
      return;
    }
    if ((key === "e" || key === "enter" || key === " ") && event.target === event.currentTarget) {
      event.preventDefault();
      controller.interact();
    }
  };

  const handleKeyUp = (event) => controller.input.keys.delete(event.key.toLowerCase());

  const interactiveObjects = ROOM_OBJECTS.filter((object) => object.stop || object.seats || object.easter);

  return (
    <div ref={wrapRef} className="w-full">
      <div
        className="relative mx-auto outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
        style={{ width: CANVAS_W * scale, height: CANVAS_H * scale }}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onBlur={() => controller.input.keys.clear()}
        aria-label="Habitación interactiva. Flechas o WASD para caminar; E o Enter para usar el objeto que tengas enfrente o levantarte."
      >
        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          className="block h-full w-full select-none"
          style={{ imageRendering: "pixelated" }}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          onClick={handleClick}
          aria-hidden="true"
        />

        {bubble.text && (
          <div ref={bubbleRef} key={bubble.id} className="pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-full">
            <div className="relative w-max max-w-[220px] rounded-[6px] border-2 border-black bg-white px-2.5 py-1 font-mono text-[11px] leading-snug text-black shadow-[0_3px_0_rgba(0,0,0,0.35)]">
              <span className="font-bold">{name}:</span> {bubble.text}
              <span className="absolute left-1/2 top-full -translate-x-1/2 border-x-[6px] border-t-[7px] border-x-transparent border-t-black" />
            </div>
          </div>
        )}

        {hover && (
          <div
            className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full"
            style={toPercent(hover.at)}
          >
            <div className="flex items-center gap-1.5 whitespace-nowrap rounded-[4px] border-2 border-black bg-[#1b1f2a] px-2 py-1 font-mono text-[11px] font-bold text-white shadow-[0_3px_0_rgba(0,0,0,0.45)]">
              {hover.Icon && <hover.Icon className="h-3.5 w-3.5 text-cyan-300" />}
              {hover.title}
              <span className="font-normal text-gray-400">· {hover.hint}</span>
            </div>
          </div>
        )}

        {/* Acceso por teclado / lector de pantalla a los objetos del canvas */}
        <div
          style={{
            position: "absolute",
            width: 1,
            height: 1,
            padding: 0,
            margin: -1,
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            whiteSpace: "nowrap",
            border: 0,
          }}
        >
          {interactiveObjects.map((object) => (
            <button
              key={object.id}
              type="button"
              onClick={() => controller.handleObject(object)}
              onFocus={() => showHover(object)}
              onBlur={() => showHover(null)}
            >
              {labelFor(object).title}: {labelFor(object).hint}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Retrato pixel art del personaje (para el panel de diálogo). */
export function AvatarPortrait({ className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;
    const { w, h, data } = avatarPortrait();
    const image = ctx.createImageData(w, h);
    new Uint32Array(image.data.buffer).set(data);
    ctx.putImageData(image, 0, 0);
  }, []);
  return (
    <canvas ref={ref} width={26} height={22} className={className} style={{ imageRendering: "pixelated" }} aria-hidden="true" />
  );
}
