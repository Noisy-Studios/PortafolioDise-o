/*
 * Paredes, piso y decoración fija de la habitación (se hornea una sola vez en un buffer).
 * Devuelve las posiciones de luces/estrellas/neón que se animan cada cuadro.
 */
import { BAYER4, hash, mix, rgb, shade, textMask } from "../engine/pixel";
import { COLS, OX, OY, P, ROWS, WALL_H, painter, pal, screenToFloor } from "../engine/iso";

const K = {
  plasterL: rgb("#3f3168"),
  plasterR: rgb("#30265a"),
  wainL: rgb("#2c2150"),
  wainR: rgb("#231a43"),
  rail: rgb("#5b4a99"),
  railHi: rgb("#8571cf"),
  base: rgb("#170e2b"),
  cap: rgb("#5d4c93"),
  capEdge: rgb("#8a78cc"),
  endL: rgb("#21183a"),
  endR: rgb("#1a1230"),
  seam: rgb("#3d2117"),
  joint: rgb("#4a281b"),
  floorEdgeL: rgb("#4a2a1d"),
  floorEdgeR: rgb("#36190f"),
  wood: [rgb("#7c4731"), rgb("#86503a"), rgb("#74422e"), rgb("#8b5640")],
  ivy: [rgb("#1d5c36"), rgb("#2f8a4a"), rgb("#3fae5d"), rgb("#6fd47c")],
  wire: rgb("#2a1a3a"),
  frame: rgb("#cdb8ff"),
  frameDark: rgb("#8f78d6"),
  sky: [rgb("#14123a"), rgb("#251a58"), rgb("#43287a"), rgb("#6e3489")],
  moon: rgb("#fff2c2"),
  building: rgb("#1a1035"),
  windowLit: rgb("#ffd27a"),
  neonPink: rgb("#ff8ad8"),
  neonPinkGlow: rgb("#a8358f"),
  neonCyan: rgb("#8ffcff"),
  neonCyanGlow: rgb("#2a8fa8"),
};

const fract = (n) => n - Math.floor(n);

function wallColor(side, along, z, x, y) {
  const plaster = side === "L" ? K.plasterL : K.plasterR;
  const wain = side === "L" ? K.wainL : K.wainR;
  if (z < 3) return K.base;
  if (z < 30) {
    const f = fract(along * 2) * 12;
    if (f < 1) return shade(wain, -0.35);
    if (f < 2) return shade(wain, 0.12);
    if (z >= 27) return shade(wain, -0.18);
    if (z < 6) return shade(wain, -0.1);
    return hash(x, y, 3) < 0.05 ? shade(wain, 0.07) : wain;
  }
  if (z < 31) return K.railHi;
  if (z < 34) return K.rail;
  if (z < 35) return shade(plaster, -0.3);
  let c = plaster;
  const n = hash(x, y, 7);
  if (n < 0.05) c = shade(plaster, -0.12);
  else if (n > 0.965) c = shade(plaster, 0.09);
  // Más oscuro cerca del techo, con tramado
  const top = (z - (WALL_H - 26)) / 26;
  if (top > 0 && BAYER4[((y & 3) << 2) + (x & 3)] < top * 0.8) c = shade(c, -0.14);
  return c;
}

function floorColor(x, y) {
  const [u, v] = screenToFloor(x + 0.5, y + 0.5);
  const row = Math.floor(v * 3);
  const fv = v * 3 - row;
  const along = (u + hash(row, 0, 11) * 2) / 2;
  const plank = Math.floor(along);
  const fu = along - plank;
  let c = K.wood[Math.floor(hash(row, plank, 5) * K.wood.length)];
  if (fv * 8 < 1) return K.seam;
  if (fv * 8 < 2) c = shade(c, 0.13);
  if (fu * 96 < 1.4) return K.joint;
  if (fv > 0.55 && fv < 0.64 && hash(Math.floor(u * 5), row, 9) < 0.45) c = shade(c, -0.12);
  if (hash(x, y, 13) < 0.035) c = shade(c, -0.09);
  return c;
}

/* ------------------------------ Alfombras ------------------------------ */

const RUG = { u0: 0.9, v0: 1.6, u1: 3.15, v1: 4.4 };
const RUG_C = {
  edge: rgb("#1c1236"),
  teal: rgb("#2aa5b5"),
  cream: rgb("#f4d9b0"),
  purple: rgb("#6b45d6"),
  field: rgb("#3b2a7c"),
  pink: rgb("#ff6fa8"),
  orange: rgb("#ffb347"),
};

function rugColor(x, y) {
  const [u, v] = screenToFloor(x + 0.5, y + 0.5);
  const edge = Math.min(u - RUG.u0, RUG.u1 - u, v - RUG.v0, RUG.v1 - v);
  if (edge < 0.045) return RUG_C.edge;
  if (edge < 0.13) return hash(Math.floor((u + v) * 8), 1, 4) < 0.5 && Math.floor((u - v) * 10) % 2 === 0 ? RUG_C.cream : RUG_C.teal;
  if (edge < 0.17) return RUG_C.cream;
  if (edge < 0.28) return Math.floor((u + v) * 10) % 2 === 0 ? RUG_C.purple : shade(RUG_C.purple, 0.12);
  const fu = fract((u - RUG.u0) * 2.2);
  const fv = fract((v - RUG.v0) * 2.2);
  const dd = Math.abs(fu - 0.5) + Math.abs(fv - 0.5);
  if (dd < 0.13) return RUG_C.orange;
  if (dd < 0.25) return RUG_C.pink;
  if (dd > 0.47) return RUG_C.teal;
  return hash(x, y, 2) < 0.06 ? shade(RUG_C.field, 0.1) : RUG_C.field;
}

function drawRugs(g) {
  g.poly([[RUG.u0, RUG.v0, 0], [RUG.u1, RUG.v0, 0], [RUG.u1, RUG.v1, 0], [RUG.u0, RUG.v1, 0]], rugColor);
  for (let u = RUG.u0 + 0.04; u < RUG.u1 - 0.02; u += 1 / 12) {
    g.line([u, RUG.v0, 0], [u, RUG.v0 - 0.1, 0], RUG_C.cream);
    g.line([u, RUG.v1, 0], [u, RUG.v1 + 0.1, 0], RUG_C.cream);
  }

  // Alfombra peluda redonda bajo el puff
  const [cx, cy] = P(7.5, 4.5, 0);
  g.buf.ellipse(cx, cy, 36, 18, (x, y, dx, dy) => {
    const d = Math.sqrt(dx * dx + dy * dy);
    if (d > 0.9 && hash(x, y, 31) < (d - 0.9) * 8) return 0;
    if (d > 0.84) return rgb("#e4a6c8");
    return hash(x, y, 17) < 0.18 ? rgb("#ffe0f0") : rgb("#f7c6e0");
  });

  // Tapete de la puerta
  g.poly([[0.06, 6.45, 0], [0.8, 6.45, 0], [0.8, 7.55, 0], [0.06, 7.55, 0]], (x, y) => {
    const [u, v] = screenToFloor(x + 0.5, y + 0.5);
    const edge = Math.min(u - 0.06, 0.8 - u, v - 6.45, 7.55 - v);
    if (edge < 0.05) return rgb("#6b4a2b");
    return (Math.floor(u * 16) + Math.floor(v * 16)) % 2 === 0 ? rgb("#b0824f") : rgb("#c9975d");
  });
  const heart = ["X.X", "XXX", ".X."];
  const [hx, hy] = P(0.43, 7, 0);
  heart.forEach((row, j) => [...row].forEach((ch, i) => ch === "X" && g.buf.rect(Math.round(hx) - 3 + i * 2, Math.round(hy) - 3 + j * 2, 2, 2, rgb("#ff5f8f"))));
}

/* ------------------------------ Ventanas ------------------------------ */

function windowArt(w, h, seed, stars) {
  const r = w / 2;
  const glassTop = 2;
  const cells = [];
  for (let j = 0; j < h; j += 1) {
    const row = [];
    for (let i = 0; i < w; i += 1) {
      const px = i + 0.5;
      const py = j + 0.5;
      const inArch = (shrink) =>
        py >= r ? px >= shrink && px <= w - shrink && py <= h - shrink : (px - r) ** 2 + (py - r) ** 2 <= (r - shrink) ** 2;
      if (!inArch(0)) {
        row.push(0);
        continue;
      }
      if (!inArch(glassTop)) {
        row.push(px > w - 3 || py > h - 3 ? K.frameDark : K.frame);
        continue;
      }
      if (Math.abs(px - r) < 0.75 || Math.abs(py - (r + 5)) < 0.75) {
        row.push(K.frame);
        continue;
      }
      // Cielo nocturno con tramado
      const level = (j / (h - 1)) * (K.sky.length - 1);
      const idx = Math.min(K.sky.length - 1, Math.floor(level + BAYER4[((j & 3) << 2) + (i & 3)] - 0.25));
      let c = K.sky[Math.max(0, idx)];
      // Luna
      const mx = w * 0.32;
      const my = h * 0.24;
      const inMoon = (px - mx) ** 2 + (py - my) ** 2 <= 12.5;
      const inBite = (px - mx - 1.6) ** 2 + (py - my + 1) ** 2 <= 10;
      if (inMoon && !inBite) c = K.moon;
      // Edificios con ventanitas encendidas
      const bh = 5 + Math.floor(hash(Math.floor(i / 4), seed, 6) * 9);
      if (j >= h - 2 - bh) {
        c = K.building;
        if (i % 2 === 1 && j % 3 === 0 && hash(i, j, seed) < 0.35) c = K.windowLit;
      } else if (!inMoon && hash(i, j, seed + 40) < 0.025) {
        c = rgb("#d9ccff");
        stars.push([i, j]);
      }
      row.push(c);
    }
    cells.push(row);
  }
  return (i, j) => cells[j][i];
}

/* ------------------------------ Hiedra y luces ------------------------------ */

function leaf(buf, x, y, k) {
  const [dark, mid, light, hi] = K.ivy;
  const shape = k % 3 === 0 ? [".X.", "XXX", ".X."] : k % 3 === 1 ? ["XX.", "XXX", ".XX"] : [".XX", "XXX", "XX."];
  shape.forEach((row, j) =>
    [...row].forEach((ch, i) => {
      if (ch !== "X") return;
      const c = i + j <= 1 ? hi : i + j >= 3 ? dark : k % 2 ? mid : light;
      buf.set(x + i - 1, y + j - 1, c);
    }),
  );
}

function drawIvy(g) {
  const walls = [
    { len: ROWS, at: (a, dz) => P(0, a, WALL_H - dz), seed: 1 },
    { len: COLS, at: (a, dz) => P(a, 0, WALL_H - dz), seed: 2 },
  ];
  for (const wall of walls) {
    for (let a = 0.05; a < wall.len; a += 1 / 10) {
      const n = hash(Math.floor(a * 10), wall.seed, 21);
      if (n < 0.3) continue;
      const [x, y] = wall.at(a, Math.floor(n * 5) - 1);
      leaf(g.buf, Math.round(x), Math.round(y), Math.floor(n * 9));
      // Algunas enredaderas cuelgan por la pared
      if (n > 0.84) {
        const len = 12 + Math.floor(hash(Math.floor(a * 10), wall.seed, 22) * 30);
        for (let dz = 2; dz < len; dz += 1) {
          const [vx, vy] = wall.at(a, dz);
          const sway = Math.round(Math.sin(dz * 0.35 + a * 3));
          g.buf.set(Math.round(vx) + sway, Math.round(vy), K.ivy[0]);
          if (dz % 5 === 0) leaf(g.buf, Math.round(vx) + sway + (dz % 10 === 0 ? 2 : -2), Math.round(vy), dz);
        }
      }
    }
  }
}

function drawFairyLights(g, bulbs) {
  const strands = [
    { anchors: [0.2, 2.1, 4.1, 6.1, 7.9], at: (a, z) => P(0, a, z) },
    { anchors: [0.2, 2.2, 4.2, 6.2, 8.2, 9.9], at: (a, z) => P(a, 0, z) },
  ];
  let k = 0;
  for (const strand of strands) {
    for (let s = 0; s + 1 < strand.anchors.length; s += 1) {
      const a0 = strand.anchors[s];
      const a1 = strand.anchors[s + 1];
      const zAt = (a) => {
        const f = (a - a0) / (a1 - a0);
        return WALL_H - 9 - 12 * 4 * f * (1 - f);
      };
      for (let a = a0; a <= a1; a += 1 / 48) {
        const [x, y] = strand.at(a, zAt(a));
        g.buf.set(Math.round(x), Math.round(y), K.wire);
      }
      for (let a = a0 + 0.17; a < a1 - 0.08; a += 0.34) {
        const [x, y] = strand.at(a, zAt(a) - 2);
        bulbs.push({ x: Math.round(x), y: Math.round(y), k: (k += 1) });
      }
    }
  }
}

/* ------------------------------ Letreros de neón ------------------------------ */

function neonBitmap(text, core, glow) {
  const { w, h, mask } = textMask(text, 2);
  const W = w + 4;
  const H = h + 4;
  const at = (i, j) => (i >= 0 && j >= 0 && i < w && j < h ? mask[j][i] : false);
  return {
    w: W,
    h: H,
    fn: (i, j) => {
      const mi = i - 2;
      const mj = j - 2;
      if (at(mi, mj)) return (mi + mj) % 4 === 0 ? rgb("#ffffff") : core;
      for (let dy = -2; dy <= 2; dy += 1) {
        for (let dx = -2; dx <= 2; dx += 1) {
          if (at(mi + dx, mj + dy)) return Math.abs(dx) + Math.abs(dy) <= 2 && BAYER4[((j & 3) << 2) + (i & 3)] < 0.7 ? glow : 0;
        }
      }
      return 0;
    },
  };
}

/* ------------------------------ Cuadros ------------------------------ */

function framedArt(w, h, inner) {
  return (i, j) => {
    if (i === 0 || j === 0 || i === w - 1 || j === h - 1) return rgb("#1b1428");
    if (i === 1 || j === 1) return rgb("#efe6ff");
    if (i === w - 2 || j === h - 2) return rgb("#b9a8e6");
    return inner(i - 2, j - 2, w - 4, h - 4);
  };
}

const spacePoster = (i, j, w, h) => {
  const sky = j < h / 2 ? rgb("#2a1a5e") : rgb("#3f2580");
  if (hash(i, j, 77) < 0.05) return rgb("#fff6c8");
  const dx = i - w * 0.55;
  const dy = j - h * 0.38;
  if (dx * dx + dy * dy < 22) return dx + dy < -1 ? rgb("#ffb46b") : rgb("#ff7a59");
  if (Math.abs(dy - dx * 0.35) < 0.8 && Math.abs(dx) < 8) return rgb("#ffe08a");
  // cohete
  if (i >= 3 && i <= 5 && j >= h - 12 && j <= h - 5) return i === 4 ? rgb("#ffffff") : rgb("#d9d4ff");
  if (j === h - 13 && i === 4) return rgb("#ff5f8f");
  if (j >= h - 4 && j <= h - 3 && i >= 3 && i <= 5) return hash(i, j, 3) < 0.5 ? rgb("#ffd43b") : rgb("#ff8a3d");
  return sky;
};

const slimePoster = (i, j, w, h) => {
  const bg = (i + j) % 6 < 3 ? rgb("#1f6f7a") : rgb("#1a5f69");
  const cx = w / 2;
  const dx = (i + 0.5 - cx) / 6;
  const dy = (j + 0.5 - (h - 9)) / 6.5;
  if (j > h - 3) return bg;
  if (dx * dx + dy * dy <= 1 || (j >= h - 9 && j <= h - 4 && Math.abs(dx) <= 1)) {
    if ((j === h - 11 || j === h - 10) && (i === Math.round(cx) - 3 || i === Math.round(cx) + 2)) return rgb("#1b1e3a");
    if (j === h - 7 && Math.abs(i - cx + 0.5) < 2) return rgb("#1b1e3a");
    if (dx < -0.3 && dy < -0.3) return rgb("#c8ff9a");
    return dx + dy > 0.6 ? rgb("#4fc35a") : rgb("#7de86b");
  }
  if (j < 6 && hash(i, j, 12) < 0.12) return rgb("#8ff1ff");
  return bg;
};

function pegboard(w, h) {
  return (i, j) => {
    if (i === 0 || j === 0 || i === w - 1 || j === h - 1) return rgb("#3e3170");
    // auriculares
    const hx = i - 9;
    const hy = j - 13;
    const ring = Math.sqrt(hx * hx + (hy * 1.2) ** 2);
    if (hy <= 1 && ring > 5 && ring < 7.2) return rgb("#ff7eb6");
    if (hy >= 0 && hy <= 5 && (Math.abs(hx + 6) <= 1 || Math.abs(hx - 6) <= 1)) return hy === 0 ? rgb("#ffb3d6") : rgb("#d94b8f");
    // control
    const cx = i - 27;
    const cy = j - 14;
    if (cy >= -3 && cy <= 3 && cx >= -7 && cx <= 7 && !(Math.abs(cy) === 3 && Math.abs(cx) >= 6)) {
      if (cy >= 1 && Math.abs(cx) <= 2) return rgb("#2b2840");
      if (cx === -4 && cy === -1) return rgb("#e7e3ff");
      if ((cx === -5 || cx === -3) && cy === -1) return rgb("#e7e3ff");
      if (cx === -4 && (cy === -2 || cy === 0)) return rgb("#e7e3ff");
      if (cx === 4 && cy === -2) return rgb("#ff5f8f");
      if (cx === 5 && cy === -1) return rgb("#3de0ff");
      if (cx === 3 && cy === -1) return rgb("#ffd43b");
      if (cx === 4 && cy === 0) return rgb("#7dff7a");
      return cy < -1 ? rgb("#58547a") : rgb("#423e60");
    }
    // repisa con nota adhesiva
    if (j === h - 7 && i >= w - 13 && i <= w - 3) return rgb("#8a6a4a");
    if (i >= w - 12 && i <= w - 7 && j >= h - 14 && j <= h - 8) return j === h - 14 ? rgb("#ffe36b") : rgb("#ffd43b");
    if (i >= w - 5 && i <= w - 3 && j >= h - 11 && j <= h - 8) return j === h - 11 ? rgb("#7de86b") : rgb("#e98d55");
    if (i % 3 === 1 && j % 3 === 1) return rgb("#1a1230");
    return rgb("#2a2147");
  };
}

function doorArt(w, h) {
  return (i, j) => {
    if (i < 2 || i > w - 3 || j < 2) return i > w - 3 ? rgb("#1a1129") : rgb("#3a2848");
    const panelA = i >= 5 && i <= w - 6 && j >= 6 && j <= 30;
    const panelB = i >= 5 && i <= w - 6 && j >= 36 && j <= h - 6;
    let c = rgb("#2b5c7a");
    if (panelA || panelB) {
      const edgeTop = j === 6 || j === 36;
      const edgeLeft = i === 5;
      c = edgeTop || edgeLeft ? rgb("#1d4258") : rgb("#336b8c");
    }
    if (i > w - 6 && i <= w - 3) c = rgb("#245069");
    // pomo
    if (i >= 6 && i <= 7 && j >= 34 && j <= 35) return rgb("#ffd43b");
    // cartel "no molestar" colgando del pomo
    if (i >= 4 && i <= 10 && j >= 38 && j <= 45) {
      if (j === 38 || i === 4 || i === 10 || j === 45) return rgb("#7c2d5a");
      if (j >= 40 && j <= 43 && i >= 6 && i <= 8) return rgb("#ff5f8f");
      return rgb("#ffe9f4");
    }
    // sticker estrella
    const sx = i - (w - 11);
    const sy = j - 16;
    if ((Math.abs(sx) <= 2 && sy === 0) || (Math.abs(sy) <= 2 && sx === 0) || (Math.abs(sx) === 1 && Math.abs(sy) === 1)) return rgb("#ffd43b");
    return c;
  };
}

/* ------------------------------ Ensamblaje ------------------------------ */

export function drawRoomShell(buf) {
  const g = painter(buf);
  const t = 0.3;
  const anim = { bulbs: [], stars: [], flicker: [] };

  // Paredes
  g.poly([[0, 0, 0], [0, ROWS, 0], [0, ROWS, WALL_H], [0, 0, WALL_H]], (x, y) => {
    const along = (OX - (x + 0.5)) / 24;
    return wallColor("L", along, OY + along * 12 - (y + 0.5), x, y);
  });
  g.poly([[0, 0, 0], [COLS, 0, 0], [COLS, 0, WALL_H], [0, 0, WALL_H]], (x, y) => {
    const along = (x + 0.5 - OX) / 24;
    return wallColor("R", along, OY + along * 12 - (y + 0.5), x, y);
  });
  g.line([0, 0, 0], [0, 0, WALL_H], shade(K.plasterR, -0.35));

  // Grietas sutiles
  const crack = shade(K.plasterL, -0.28);
  [[0, 5.6, 95, 1], [1, 2.6, 104, 2], [1, 9.3, 70, 3], [0, 0.4, 66, 4]].forEach(([wall, a, z, seed]) => {
    let ca = a;
    let cz = z;
    for (let s = 0; s < 6; s += 1) {
      const na = ca + (hash(s, seed, 1) - 0.4) * 0.18;
      const nz = cz - 3 - Math.floor(hash(s, seed, 2) * 4);
      g.line(wall ? [ca, 0, cz] : [0, ca, cz], wall ? [na, 0, nz] : [0, na, nz], crack);
      ca = na;
      cz = nz;
    }
  });

  // Ventanas en arco
  const leftStars = [];
  g.bitmapU(0, 1.78, 46, 29, 54, windowArt(29, 54, 3, leftStars));
  leftStars.forEach(([i, j]) => anim.stars.push(g.mapU(0, 1.78, 46, 54, i, j)));
  const rightStars = [];
  g.bitmapV(0, 6.1, 48, 20, 48, windowArt(20, 48, 8, rightStars));
  rightStars.forEach(([i, j]) => anim.stars.push(g.mapV(0, 6.1, 48, 48, i, j)));
  g.box(0, 0.48, 0.2, 1.36, 42, 4, pal("#9c86e6"));
  g.box(6.02, 0, 0.92, 0.2, 44, 4, pal("#9c86e6"));
  // Cactus en el alféizar
  g.box(6.66, 0.04, 0.14, 0.12, 48, 5, pal("#e98d55"));
  const [kx, ky] = P(6.73, 0.1, 53);
  g.buf.ellipse(kx, ky - 4, 2.6, 4.5, (x) => (x < kx ? rgb("#7de86b") : rgb("#3fae5d")));
  g.buf.set(Math.round(kx), Math.round(ky) - 9, rgb("#ff8ad8"));

  // Puerta
  g.bitmapU(0, 7.65, 0, 32, 74, doorArt(32, 74));

  // Cuadros
  g.bitmapV(0, 3.1, 48, 19, 34, framedArt(19, 34, spacePoster));
  g.bitmapU(0, 4.92, 46, 19, 33, framedArt(19, 33, slimePoster));
  g.bitmapV(0, 4.18, 76, 40, 30, pegboard(40, 30));

  // Repisa sobre el buzón con planta colgante y figurita
  g.box(0, 5.1, 0.24, 0.85, 62, 3, pal("#7a58b8"));
  g.box(0.06, 5.2, 0.12, 0.16, 65, 6, pal("#f2ecff"));
  const [px, py] = P(0.12, 5.28, 71);
  for (let k = 0; k < 7; k += 1) leaf(buf, Math.round(px) - 3 + k, Math.round(py) - 2 + (k % 3), k);
  for (let dz = 0; dz < 18; dz += 1) {
    const [vx, vy] = P(0.2, 5.38, 64 - dz);
    buf.set(Math.round(vx) + Math.round(Math.sin(dz * 0.5)), Math.round(vy), K.ivy[1]);
    if (dz % 4 === 2) leaf(buf, Math.round(vx) + 2, Math.round(vy), dz);
  }
  const [sx, sy] = P(0.12, 5.75, 65);
  buf.ellipse(sx, sy - 3, 3.5, 3, (x, y) => (y < sy - 4 ? rgb("#a3f58f") : rgb("#5fd16b")));
  buf.set(Math.round(sx) - 1, Math.round(sy) - 4, rgb("#1b1e3a"));
  buf.set(Math.round(sx) + 1, Math.round(sy) - 4, rgb("#1b1e3a"));

  // Maceta colgante sobre la nevera
  const [hx, hy] = P(9.55, 0, WALL_H);
  for (let k = 0; k < 26; k += 1) buf.set(Math.round(hx), Math.round(hy) + k, rgb("#d9c7a3"));
  buf.ellipse(hx, hy + 30, 6, 4, (x, y) => (y < hy + 29 ? rgb("#f2ecff") : rgb("#c5b8ea")));
  for (let k = 0; k < 9; k += 1) leaf(buf, Math.round(hx) - 6 + k * 1.5, Math.round(hy) + 25 + (k % 2), k);
  for (const side of [-1, 1]) {
    for (let dz = 0; dz < 22; dz += 1) {
      const vx = Math.round(hx + side * (5 + Math.sin(dz * 0.4) * 1.5));
      buf.set(vx, Math.round(hy) + 32 + dz, K.ivy[1]);
      if (dz % 4 === 1) leaf(buf, vx + side, Math.round(hy) + 32 + dz, dz + side);
    }
  }

  // Neón PLAY (sobre la TV) y GG (sobre la estantería)
  const play = neonBitmap("PLAY", K.neonPink, K.neonPinkGlow);
  g.bitmapU(0, 3.62, 86, play.w, play.h, play.fn);
  const gg = neonBitmap("GG", K.neonCyan, K.neonCyanGlow);
  g.bitmapV(0, 7.62, 95, gg.w, gg.h, gg.fn);
  for (let j = 0; j < gg.h; j += 1) {
    for (let i = Math.floor(gg.w / 2) + 1; i < gg.w; i += 1) {
      if (gg.fn(i, j) === K.neonCyan) anim.flicker.push(g.mapV(0, 7.62, 95, gg.h, i, j));
    }
  }

  // Hiedra y luces colgantes
  drawFairyLights(g, anim.bulbs);
  drawIvy(g);

  // Remate superior y bordes de las paredes
  g.poly([[0, ROWS, WALL_H], [-t, ROWS, WALL_H], [-t, -t, WALL_H], [0, 0, WALL_H]], K.cap);
  g.poly([[0, 0, WALL_H], [-t, -t, WALL_H], [COLS, -t, WALL_H], [COLS, 0, WALL_H]], shade(K.cap, -0.08));
  g.line([0, ROWS, WALL_H], [0, 0, WALL_H], K.capEdge);
  g.line([0, 0, WALL_H], [COLS, 0, WALL_H], K.capEdge);
  g.poly([[-t, ROWS, -10], [0, ROWS, -10], [0, ROWS, WALL_H], [-t, ROWS, WALL_H]], K.endL);
  g.poly([[COLS, -t, -10], [COLS, 0, -10], [COLS, 0, WALL_H], [COLS, -t, WALL_H]], K.endR);
  drawIvyOnCap(g);

  // Piso
  g.poly([[0, 0, 0], [COLS, 0, 0], [COLS, ROWS, 0], [0, ROWS, 0]], floorColor);
  g.poly([[0, ROWS, 0], [COLS, ROWS, 0], [COLS, ROWS, -10], [0, ROWS, -10]], (x, y) =>
    (y + Math.floor(x / 2)) % 5 === 0 ? shade(K.floorEdgeL, -0.2) : K.floorEdgeL,
  );
  g.poly([[COLS, 0, 0], [COLS, ROWS, 0], [COLS, ROWS, -10], [COLS, 0, -10]], K.floorEdgeR);
  g.line([0, ROWS, 0], [COLS, ROWS, 0], rgb("#a06a4a"));
  g.line([COLS, 0, 0], [COLS, ROWS, 0], rgb("#8a5a3e"));
  drawRugs(g);

  return anim;
}

// Hojas que asoman por encima del remate (como la hiedra de la referencia)
function drawIvyOnCap(g) {
  for (let a = 0; a < ROWS; a += 0.12) {
    if (hash(Math.floor(a * 8), 9, 3) < 0.45) continue;
    const [x, y] = P(-0.15, a, WALL_H + 1);
    leaf(g.buf, Math.round(x), Math.round(y), Math.floor(a * 7));
  }
  for (let a = 0; a < COLS; a += 0.12) {
    if (hash(Math.floor(a * 8), 10, 3) < 0.45) continue;
    const [x, y] = P(a, -0.15, WALL_H + 1);
    leaf(g.buf, Math.round(x), Math.round(y), Math.floor(a * 5));
  }
}

/** Animaciones de fondo: titileo de luces, estrellas y parpadeo del neón. */
export function animateShell(buf, anim, t) {
  const warm = [rgb("#ffd27a"), rgb("#ffb86b"), rgb("#ff9ad5"), rgb("#fff1b8")];
  for (const bulb of anim.bulbs) {
    const phase = Math.sin(t * 2.1 + bulb.k * 1.7);
    const color = warm[bulb.k % warm.length];
    const on = phase > -0.35;
    buf.rect(bulb.x, bulb.y, 2, 2, on ? color : shade(color, -0.45));
    if (on && phase > 0.55) {
      buf.set(bulb.x - 1, bulb.y, mix(buf.get(bulb.x - 1, bulb.y), color, 0.45));
      buf.set(bulb.x + 2, bulb.y + 1, mix(buf.get(bulb.x + 2, bulb.y + 1), color, 0.45));
      buf.set(bulb.x, bulb.y - 1, mix(buf.get(bulb.x, bulb.y - 1), color, 0.35));
    }
  }
  anim.stars.forEach(([x, y], k) => {
    if (Math.sin(t * 1.3 + k * 2.3) > 0.6) buf.set(x, y, rgb("#ffffff"));
    else if (Math.sin(t * 1.3 + k * 2.3) < -0.7) buf.set(x, y, K.sky[1]);
  });
  // El segundo "G" parpadea de vez en cuando, como un neón viejo
  const cycle = t % 7.3;
  if ((cycle > 5.1 && cycle < 5.22) || (cycle > 5.35 && cycle < 5.42)) {
    anim.flicker.forEach(([x, y]) => buf.set(x, y, rgb("#2b6f7e")));
  }
}
