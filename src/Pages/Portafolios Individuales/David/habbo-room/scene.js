/* Composición de la escena: fondo horneado + muebles ordenados por profundidad + personaje. */
import { animateShell, drawRoomShell } from "./art/roomShell";
import { ROOM_OBJECTS } from "./art/furniture";
import { avatarFrame } from "./art/avatar";
import { Buf, applyLights, blit, extractSprite, mix, rgb, ringSprite } from "./engine/pixel";
import { CANVAS_H, CANVAS_W, COLS, P, ROWS, WALL_H, painter } from "./engine/iso";

export { CANVAS_W, CANVAS_H };

const OUTLINE = rgb("#160d24");
const HOVER = rgb("#8ffcff");
const SHADOW = rgb("#1b0f30");
const CURSOR = rgb("#ffe680");

const light = (u, v, z, rx, ry, c, s) => {
  const [x, y] = P(u, v, z);
  return { x, y, rx, ry, c, s };
};

export const LIGHTS = [
  light(5, 4, 0, 160, 80, [36, 20, 8], 0.6),
  light(1.6, 1.2, 0, 46, 20, [36, 54, 120], 0.6),
  light(0, 1.2, 74, 30, 42, [26, 36, 90], 0.4),
  light(2.5, 0.95, 4, 36, 14, [120, 40, 140], 0.75),
  light(2.5, 0.7, 58, 30, 40, [80, 26, 100], 0.5),
  light(4.7, 0.25, 58, 54, 34, [24, 84, 136], 0.55),
  light(0.3, 3, 52, 58, 42, [116, 46, 150], 0.55),
  light(1.6, 3, 0, 52, 22, [80, 30, 110], 0.5),
  light(9.5, 0.5, 62, 36, 32, [150, 50, 110], 0.5),
  light(8, 0, 104, 42, 22, [30, 140, 160], 0.55),
  light(0, 2.9, 92, 42, 18, [150, 50, 130], 0.55),
  light(8.6, 0.32, 96, 30, 22, [120, 100, 50], 0.5),
  ...[1, 3, 5, 7].map((a) => light(0, a, WALL_H - 14, 26, 16, [110, 72, 28], 0.45)),
  ...[1, 3, 5, 7, 9].map((a) => light(a, 0, WALL_H - 14, 26, 16, [110, 72, 28], 0.45)),
];

export function buildScene() {
  const bg = new Buf(CANVAS_W, CANVAS_H);
  const shell = drawRoomShell(bg);
  applyLights(bg.d, bg.w, bg.h, LIGHTS);

  const scratch = new Buf(CANVAS_W, CANVAS_H);
  const objects = ROOM_OBJECTS.map((def) => {
    const sprites = {};
    const rings = {};
    for (const [name, draw] of Object.entries(def.layers)) {
      scratch.clear();
      draw(painter(scratch));
      const sprite = extractSprite(scratch, OUTLINE);
      applyLights(sprite.data, sprite.w, sprite.h, LIGHTS, sprite.x, sprite.y, OUTLINE);
      sprites[name] = sprite;
      rings[name] = ringSprite(sprite, HOVER);
    }
    const depth = Math.max(...def.tiles.map(([x, y]) => x + y));
    const interactive = Boolean(def.stop || def.seats || def.easter);
    return { ...def, sprites, rings, depth, interactive };
  }).sort((a, b) => a.depth - b.depth);

  return { bg, shell, objects };
}

function drawShadow(frame, x, y) {
  for (let j = -4; j <= 4; j += 1) {
    for (let i = -10; i <= 10; i += 1) {
      if ((i / 10.5) ** 2 + (j / 4.5) ** 2 > 1) continue;
      const px = x + i;
      const py = y + j;
      if (px < 0 || py < 0 || px >= frame.w || py >= frame.h) continue;
      const k = py * frame.w + px;
      frame.d[k] = mix(frame.d[k], SHADOW, (px + py) % 2 === 0 ? 0.5 : 0.32);
    }
  }
}

function drawTileCursor(frame, [tx, ty]) {
  const g = painter(frame);
  const corners = [[tx, ty, 0], [tx + 1, ty, 0], [tx + 1, ty + 1, 0], [tx, ty + 1, 0]];
  for (let k = 0; k < 4; k += 1) g.line(corners[k], corners[(k + 1) % 4], CURSOR);
  const inner = [[tx + 0.15, ty + 0.15, 0], [tx + 0.85, ty + 0.15, 0], [tx + 0.85, ty + 0.85, 0], [tx + 0.15, ty + 0.85, 0]];
  for (let k = 0; k < 4; k += 1) g.line(inner[k], inner[(k + 1) % 4], (x, y) => ((x + y) % 2 ? mix(frame.get(x, y), CURSOR, 0.45) : 0));
}

function drawSparkle(frame, x, y, size) {
  const c = rgb("#fff6c8");
  frame.set(x, y, c);
  for (let k = 1; k <= size; k += 1) {
    frame.set(x - k, y, c);
    frame.set(x + k, y, c);
    frame.set(x, y - k, c);
    frame.set(x, y + k, c);
  }
}

/**
 * view = {
 *   avatar: { x, y (píxeles en pantalla, ancla), depth, dir, pose, frame, seatObjectId },
 *   hoverId, hoverTile, catLoveAge, ambient
 * }
 */
export function renderFrame(scene, frame, t, view) {
  frame.d.set(scene.bg.d);
  const g = painter(frame);
  animateShell(frame, scene.shell, view.ambient ? t : 0);
  if (view.hoverTile) drawTileCursor(frame, view.hoverTile);

  const { avatar } = view;
  const look = avatarFrame(avatar.dir, avatar.pose, avatar.frame);
  let avatarDrawn = false;
  let pending = null;

  const drawAvatar = () => {
    if (avatar.pose !== "sit") drawShadow(frame, avatar.x, avatar.y);
    blit(frame, look.sprite, avatar.x - look.ax, avatar.y - look.ay, look.flip);
    avatarDrawn = true;
    if (pending) {
      blit(frame, pending.sprites.front);
      if (view.hoverId === pending.id) blit(frame, pending.rings.front);
    }
  };

  for (const o of scene.objects) {
    if (!avatarDrawn && o.depth > avatar.depth) drawAvatar();
    blit(frame, o.sprites.base);
    if (o.animate) {
      o.animate(g, view.ambient ? t : 0, { loveAge: o.easter === "cat" ? view.catLoveAge : null });
    }
    if (view.hoverId === o.id) blit(frame, o.rings.base);
    if (o.sprites.front) {
      if (avatar.seatObjectId === o.id && !avatarDrawn) pending = o;
      else {
        blit(frame, o.sprites.front);
        if (view.hoverId === o.id) blit(frame, o.rings.front);
      }
    }
  }
  if (!avatarDrawn) drawAvatar();

  // Destellos que invitan a interactuar con los objetos importantes
  if (view.ambient) {
    scene.objects.forEach((o, k) => {
      if (!(o.stop || o.easter) || view.hoverId === o.id) return;
      const phase = (t * 0.55 + k * 0.37) % 1;
      if (phase > 0.16) return;
      const [x, y] = P(...o.labelAt);
      drawSparkle(frame, Math.round(x) + 8, Math.round(y) + 4, phase < 0.05 || phase > 0.11 ? 1 : 2);
    });
  }
  return look;
}

export const ROOM_BOUNDS = { cols: COLS, rows: ROWS };
