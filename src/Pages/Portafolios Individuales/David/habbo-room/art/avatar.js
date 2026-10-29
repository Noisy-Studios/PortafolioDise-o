/*
 * Personaje pixel art en 8 direcciones (como la hoja de referencia isométrica).
 * Se dibujan 5 vistas únicas — S, SE, E, NE y N — y SW, W y NW son espejos.
 * Cada vista tiene pose de pie, 2 cuadros de caminata y, para SE/NE, pose sentada.
 */
import { Buf, addOutline, rgb } from "../engine/pixel";

const C = {
  out: rgb("#1d1226"),
  y1: rgb("#ffd43b"),
  y2: rgb("#f2b11a"),
  y3: rgb("#c4840f"),
  yh: rgb("#fff1a1"),
  o1: rgb("#ff8f33"),
  o2: rgb("#e5661c"),
  o3: rgb("#a9440f"),
  oh: rgb("#ffbf7a"),
  ew: rgb("#ffffff"),
  ei: rgb("#3b7be0"),
  ep: rgb("#1b1e3a"),
  sk: rgb("#f7cba5"),
  sk2: rgb("#dc9f78"),
  r1: rgb("#e8423f"),
  r2: rgb("#bf2b37"),
  r3: rgb("#8e1c2f"),
  rh: rgb("#ff7a6b"),
  em: rgb("#ffd84a"),
  p1: rgb("#962437"),
  p2: rgb("#6c172a"),
  belt: rgb("#2c1020"),
  buckle: rgb("#e6e9f0"),
  ch: rgb("#eef3f8"),
  ch2: rgb("#9aa4b5"),
  f1: rgb("#4a2a1e"),
  f2: rgb("#2e1912"),
  fh: rgb("#7a4a36"),
  sole: rgb("#efe6dc"),
};

const OFF_X = 1;
const OFF_Y = 2;
export const AVATAR_W = 26;
export const AVATAR_H = 50;
export const AVATAR_ANCHOR_X = 13;

function drawer() {
  const b = new Buf(AVATAR_W, AVATAR_H);
  const s = (x, y, c) => b.set(x + OFF_X, y + OFF_Y, typeof c === "function" ? c(x, y) : c);
  const r = (x, y, w, h, c) => {
    for (let j = 0; j < h; j += 1) for (let i = 0; i < w; i += 1) s(x + i, y + j, c);
  };
  const e = (cx, cy, rx, ry, c) => {
    for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y += 1) {
      for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x += 1) {
        const dx = (x + 0.5 - cx) / rx;
        const dy = (y + 0.5 - cy) / ry;
        if (dx * dx + dy * dy <= 1) s(x, y, c);
      }
    }
  };
  return { b, s, r, e };
}

function drawHead(d, view, dy) {
  const cx = view === "e" ? 11.5 : 12;
  const cy = 9.6 + dy;
  const rx = 8.7;
  const ry = 8.3;
  const headShade = (x, y) => {
    const nx = (x + 0.5 - cx) / rx;
    const ny = (y + 0.5 - cy) / ry;
    const light = -nx * 0.6 - ny * 0.8;
    if (light > 0.62) return C.yh;
    if (light < -0.5) return C.y3;
    if (light < -0.08) return C.y2;
    return C.y1;
  };
  const beak = (centerY) => (x, y) => (y + 0.5 < centerY ? C.o1 : C.o2);

  // De espaldas hacia la derecha solo asoma la punta del pico detrás de la cabeza.
  if (view === "ne") d.e(21, 12.8 + dy, 2.6, 1.9, beak(12.8 + dy));

  d.e(cx, cy, rx, ry, headShade);
  d.s(12, dy, C.y1);
  d.s(13, dy, C.y1);
  d.s(13, dy - 1, C.y2);
  d.s(14, dy - 1, C.y2);

  const eye = (x, y, w, lookRight) => {
    d.r(x, y + dy, w, 4, C.ew);
    const ix = lookRight ? x + w - 2 : x;
    d.r(ix, y + 2 + dy, 2, 2, C.ei);
    d.s(lookRight ? x + w - 1 : x, y + 2 + dy, C.ep);
  };

  if (view === "s") {
    eye(7, 6, 3, true);
    eye(14, 6, 3, false);
    d.e(12, 13.6 + dy, 4.8, 2.5, beak(13.6 + dy));
    for (let x = 9; x <= 14; x += 1) d.s(x, 14 + dy, C.o3);
    d.s(10, 12 + dy, C.o2);
    d.s(13, 12 + dy, C.o2);
    d.s(10, 11 + dy, C.oh);
  } else if (view === "se") {
    eye(8, 6, 2, true);
    eye(13, 6, 3, true);
    d.e(16.6, 13.4 + dy, 5, 2.4, beak(13.4 + dy));
    for (let x = 13; x <= 20; x += 1) d.s(x, 14 + dy, C.o3);
    d.s(18, 12 + dy, C.o2);
    d.s(14, 12 + dy, C.oh);
  } else if (view === "e") {
    eye(14, 6, 2, true);
    d.e(19.2, 13 + dy, 4.7, 2.2, beak(13 + dy));
    for (let x = 16; x <= 23; x += 1) d.s(x, 13 + dy, C.o3);
    d.s(21, 12 + dy, C.o2);
    d.s(17, 12 + dy, C.oh);
  }
}

function drawAvatar(view, pose, frame) {
  const d = drawer();
  const sit = pose === "sit";
  const walking = pose === "walk";
  const dy = sit ? 6 : 0;
  const back = view === "n" || view === "ne";
  const [x0, x1] = view === "e" ? [8, 15] : view === "s" || view === "n" ? [6, 17] : [7, 17];
  const y0 = 18 + dy;
  const y1 = 26 + dy;
  const swing = walking ? (frame === 1 ? 1 : -1) : 0;
  const armLen = sit ? 6 : 8;

  const arm = (x, armSwing, far) => {
    const top = y0 + 1 + armSwing;
    d.r(x, top, 2, 3, far ? C.r2 : C.r1);
    d.r(x, top + 3, 2, armLen - 4, far ? C.sk2 : C.sk);
    d.r(x, top + armLen - 1, 2, 1, C.sk2);
  };
  const leg = (x, w, top, bottom, col) => d.r(x, top, w, bottom - top + 1, col);
  const shoe = (x, w, y, dark, toeRight = true) => {
    d.r(x, y, w, 2, dark ? C.f2 : C.f1);
    d.s(toeRight ? x + w - 2 : x + 1, y, C.fh);
    d.r(x, y + 2, w, 1, C.sole);
  };

  // Brazo del lado lejano (queda detrás del torso)
  if (view === "se" || view === "ne") arm(x0 - 2, -swing, true);

  // Cadera y cinturón
  const hy = 27 + dy;
  d.r(x0, hy, x1 - x0 + 1, 1, C.belt);
  if (view === "s") d.r(11, hy, 2, 1, C.buckle);
  if (view === "se") d.s(14, hy, C.buckle);
  d.r(x0, hy + 1, x1 - x0 + 1, 2, (x) => (x >= x1 - 1 ? C.p2 : C.p1));

  // Piernas
  if (!sit && (view === "s" || view === "n")) {
    const liftL = walking && frame === 1;
    const liftR = walking && frame === 2;
    leg(7, 4, 30, liftL ? 33 : 35, C.p1);
    shoe(6, 5, liftL ? 34 : 36, false, false);
    leg(13, 4, 30, liftR ? 33 : 35, (x) => (x === 16 ? C.p2 : C.p1));
    shoe(13, 5, liftR ? 34 : 36, false, true);
  }
  if (!sit && (view === "se" || view === "ne")) {
    const f = walking ? frame : 0;
    const farX = f === 1 ? 7 : f === 2 ? 9 : 8;
    const farLift = f === 1;
    leg(farX, 4, 30, farLift ? 33 : 35, C.p2);
    shoe(farX, 5, farLift ? 34 : 36, true);
    const nearX = f === 1 ? 13 : f === 2 ? 11 : 12;
    const nearLift = f === 2;
    leg(nearX, 4, 30, nearLift ? 33 : 35, C.p1);
    shoe(nearX, 5, nearLift ? 34 : 36, false);
  }
  if (!sit && view === "e") {
    if (!walking) {
      leg(9, 5, 30, 35, (x) => (x === 9 ? C.p2 : C.p1));
      shoe(9, 7, 36, false);
    } else if (frame === 1) {
      leg(7, 4, 30, 34, C.p2);
      shoe(6, 5, 35, true);
      leg(11, 4, 30, 35, C.p1);
      shoe(11, 6, 36, false);
    } else {
      leg(11, 4, 30, 35, C.p2);
      shoe(11, 6, 36, true);
      leg(7, 4, 30, 34, C.p1);
      shoe(6, 5, 35, false);
    }
  }
  if (sit && view === "se") {
    // Muslos hacia adelante y canillas colgando del asiento
    d.r(10, 35, 6, 2, C.p2);
    d.r(14, 37, 2, 3, C.p2);
    shoe(13, 4, 40, true);
    d.r(12, 34, 7, 3, (x) => (x >= 17 ? C.p2 : C.p1));
    d.r(17, 37, 2, 3, C.p1);
    shoe(16, 5, 40, false);
  }

  // Cadena colgando del bolsillo
  if (!sit && (view === "s" || view === "se")) {
    d.s(16, hy + 1, C.ch);
    d.s(17, hy + 2, C.ch2);
    d.s(17, hy + 3, C.ch);
    d.s(16, hy + 4, C.ch2);
  }

  // Torso
  for (let y = y0; y <= y1; y += 1) {
    for (let x = x0; x <= x1; x += 1) {
      if (y === y0 && (x === x0 || x === x1)) continue;
      let c = x >= x1 - 1 ? C.r2 : x === x0 + 1 && !back ? C.rh : C.r1;
      if (y === y1) c = x >= x1 - 1 ? C.r3 : C.r2;
      d.s(x, y, c);
    }
  }
  if (!back) d.r(view === "s" ? 11 : 13, y0, 2, 1, C.r3);

  // Estampado de corazón
  if (view === "s") {
    [[1, 0], [3, 0], [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [1, 2], [2, 2], [3, 2], [2, 3]].forEach(([i, j]) =>
      d.s(10 + i, y0 + 2 + j, C.em),
    );
  }
  if (view === "se") {
    [[0, 0], [2, 0], [0, 1], [1, 1], [2, 1], [1, 2]].forEach(([i, j]) => d.s(13 + i, y0 + 2 + j, C.em));
  }

  // Brazos visibles
  if (view === "s" || view === "n") {
    arm(x0 - 2, back ? -swing : swing, false);
    arm(x1 + 1, back ? swing : -swing, false);
  }
  if (view === "se" || view === "ne") arm(x1, swing, false);
  if (view === "e") arm(11 + swing, 0, false);

  drawHead(d, view, dy);
  addOutline(d.b.d, AVATAR_W, AVATAR_H, C.out);
  return { x: 0, y: 0, w: AVATAR_W, h: AVATAR_H, data: d.b.d };
}

const VIEWS = ["s", "se", "e", "ne", "n"];
const DIR_VIEW = {
  s: ["s", false],
  se: ["se", false],
  e: ["e", false],
  ne: ["ne", false],
  n: ["n", false],
  sw: ["se", true],
  w: ["e", true],
  nw: ["ne", true],
};

let cache = null;
function sprites() {
  if (cache) return cache;
  cache = {};
  for (const view of VIEWS) {
    cache[`${view}:stand:0`] = drawAvatar(view, "stand", 0);
    cache[`${view}:walk:1`] = drawAvatar(view, "walk", 1);
    cache[`${view}:walk:2`] = drawAvatar(view, "walk", 2);
  }
  cache["se:sit:0"] = drawAvatar("se", "sit", 0);
  cache["ne:sit:0"] = drawAvatar("ne", "sit", 0);
  return cache;
}

/** Devuelve el sprite, si va espejado y el ancla (pies, o asiento si está sentado). */
export function avatarFrame(dir, pose, frame = 0) {
  const [baseView, flip] = DIR_VIEW[dir] ?? DIR_VIEW.se;
  let view = baseView;
  if (pose === "sit" && view !== "se" && view !== "ne") view = view === "n" ? "ne" : "se";
  const key = pose === "sit" ? `${view}:sit:0` : pose === "walk" ? `${view}:walk:${frame}` : `${view}:stand:0`;
  const anchorY = pose === "sit" ? (view === "se" ? 39 : 38) : 41;
  return { sprite: sprites()[key], flip, ax: AVATAR_ANCHOR_X, ay: anchorY };
}

/** Cabeza del personaje de frente, para el retrato del panel de diálogo. */
export function avatarPortrait() {
  const sprite = sprites()["s:stand:0"];
  const h = 22;
  return { w: sprite.w, h, data: sprite.data.slice(0, sprite.w * h) };
}

export const AVATAR_DIRECTIONS = Object.keys(DIR_VIEW);
