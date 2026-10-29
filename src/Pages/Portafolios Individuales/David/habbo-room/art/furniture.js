/*
 * Muebles en pixel art. Cada objeto define capas ("base" y opcionalmente "front", la parte
 * que tapa al personaje cuando está sentado) y una animación opcional por cuadro.
 */
import { BAYER4, hash, rgb, shade } from "../engine/pixel";
import { P, pal } from "../engine/iso";

const K = {
  ink: rgb("#15101f"),
  ink2: rgb("#120c22"),
  screen: rgb("#0b1030"),
  red: rgb("#ff4d6d"),
  cyan: rgb("#3de0ff"),
  yellow: rgb("#ffd43b"),
  pink: rgb("#ff6fd8"),
  green: rgb("#7dff7a"),
  white: rgb("#f4f1ff"),
  silver: rgb("#c9cfe0"),
  leafHi: rgb("#8be89a"),
  leaf: rgb("#4cc06a"),
  leafMid: rgb("#2f9a52"),
  leafDark: rgb("#1f6e3d"),
  vein: rgb("#b5f5bd"),
};
const RAINBOW = ["#ff4d6d", "#ff9f43", "#ffd43b", "#7dff7a", "#3de0ff", "#7c5cff", "#ff6fd8"].map((c) => rgb(c));

/* ------------------------------ Planta monstera ------------------------------ */

function drawMonstera(g) {
  g.box(0.27, 0.27, 0.46, 0.46, 0, 15, pal("#7357d9"));
  g.faceV(0.73, 0.27, 0.73, 9, 11, rgb("#f2c14e"));
  g.faceU(0.73, 0.27, 0.73, 9, 11, rgb("#c99a2e"));
  g.top(15, 0.32, 0.32, 0.68, 0.68, rgb("#3a2418"));
  const [cx, cy] = P(0.5, 0.5, 15);
  const leaves = [
    [-13, -18, 9, 5, -0.5],
    [13, -21, 9, 5, 0.6],
    [-2, -33, 8, 5, -1.45],
    [7, -12, 8, 4, 0.25],
    [-15, -6, 8, 4, -0.15],
    [15, -5, 7, 4, 0.1],
    [4, -38, 6, 4, 1.25],
  ];
  for (const [dx, dy] of leaves) g.buf.line(cx, cy, cx + dx * 0.75, cy + dy * 0.75, K.leafDark);
  leaves.forEach(([dx, dy, rx, ry, ang], k) => {
    g.buf.ellipseRot(cx + dx, cy + dy, rx, ry, ang, (x, y, lx, ly) => {
      if (Math.abs(ly) < 0.15 && lx > -0.85) return K.vein;
      if (Math.abs(ly) > 0.48 && Math.abs(ly) < 0.7 && ((lx * 3 + 3) % 1) < 0.3 && lx > -0.6) return -1;
      const light = -ly * 0.7 - lx * 0.2 + (k % 2 ? 0.12 : 0);
      if (light > 0.45) return K.leafHi;
      if (light > -0.1) return K.leaf;
      return light > -0.5 ? K.leafMid : K.leafDark;
    });
  });
}

/* ------------------------------ Máquina arcade ------------------------------ */

function drawArcade(g) {
  const body = pal("#5a35c9");
  g.box(2.08, 0.1, 0.84, 0.76, 0, 34, body);
  g.faceV(0.86, 2.28, 2.72, 6, 26, rgb("#2a1a4a"));
  g.faceV(0.86, 2.35, 2.46, 15, 22, rgb("#ff9a3c"));
  g.faceV(0.86, 2.54, 2.65, 15, 22, rgb("#ff9a3c"));
  g.faceV(0.86, 2.38, 2.43, 16, 21, rgb("#3a1a0a"));
  g.faceV(0.86, 2.57, 2.62, 16, 21, rgb("#3a1a0a"));

  g.box(2.08, 0.1, 0.84, 0.56, 34, 46, body);
  g.box(2.06, 0.62, 0.88, 0.34, 30, 8, pal("#2a2046"));

  const button = (u, v, c) => {
    const [x, y] = P(u, v, 38);
    g.buf.rect(Math.round(x) - 1, Math.round(y) - 1, 3, 2, c);
    g.buf.set(Math.round(x) - 1, Math.round(y) - 1, shade(c, 0.5));
  };
  button(2.28, 0.86, K.red);
  button(2.4, 0.92, K.cyan);
  button(2.52, 0.86, K.yellow);
  button(2.4, 0.78, K.green);
  const [jx, jy] = P(2.74, 0.8, 38);
  g.buf.rect(Math.round(jx), Math.round(jy) - 6, 1, 6, K.ink);
  g.buf.rect(Math.round(jx) - 1, Math.round(jy) - 9, 3, 3, K.red);
  g.buf.set(Math.round(jx) - 1, Math.round(jy) - 9, shade(K.red, 0.6));

  g.faceV(0.66, 2.13, 2.87, 43, 78, K.ink2);
  g.faceV(0.66, 2.19, 2.81, 46, 75, K.screen);

  // Marquesina con letrero "8BIT"
  g.box(2.04, 0.1, 0.92, 0.66, 80, 13, body);
  const mask = textMaskLocal("8BIT");
  g.bitmapV(0.76, 2.06, 81, 21, 11, (i, j) => {
    if (i === 0 || j === 0 || i === 20 || j === 10) return rgb("#a3166a");
    const mi = i - 3;
    const mj = j - 3;
    if (mask(mi, mj)) return rgb("#fff1f9");
    if (mask(mi - 1, mj - 1)) return rgb("#a3166a");
    return j < 5 ? rgb("#ff6fbf") : rgb("#ff3d9e");
  });

  // Arte lateral: rayo y franjas
  g.bitmapU(2.92, 0.86, 3, 18, 76, (i, j) => {
    if ((i + j) % 16 < 2 && j > 34) return rgb("#7c5cff");
    const bx = i - 9;
    const by = j - 14;
    if (by >= 0 && by < 16 && Math.abs(bx + (by < 8 ? by * 0.4 - 2 : (by - 8) * 0.4 - 3)) < 1.6) return K.yellow;
    if (j < 4) return rgb("#3de0ff");
    return 0;
  });

  // Molduras de neón
  g.line([2.92, 0.86, 1], [2.92, 0.86, 33], K.cyan);
  g.line([2.92, 0.66, 35], [2.92, 0.66, 79], K.cyan);
  g.line([2.08, 0.86, 34], [2.92, 0.86, 34], K.pink);
}

function textMaskLocal(text) {
  const font = {
    8: ["XXX", "X.X", "XXX", "X.X", "XXX"],
    B: ["XX.", "X.X", "XX.", "X.X", "XX."],
    I: ["XXX", ".X.", ".X.", ".X.", "XXX"],
    T: ["XXX", ".X.", ".X.", ".X.", ".X."],
  };
  const glyphs = [...text].map((ch) => font[ch]);
  return (i, j) => {
    if (j < 0 || j > 4 || i < 0) return false;
    const k = Math.floor(i / 4);
    const gx = i % 4;
    if (k >= glyphs.length || gx === 3) return false;
    return glyphs[k][j][gx] === "X";
  };
}

function animArcade(g, t) {
  const W = 15;
  const H = 29;
  const shipX = 6 + Math.round(Math.sin(t * 1.7) * 4);
  const alienOff = Math.floor(t * 2) % 4;
  const legs = Math.floor(t * 4) % 2;
  const bulletY = 22 - Math.floor((t * 30) % 20);
  g.bitmapV(0.66, 2.19, 46, W, H, (i, j) => {
    if (j === 1 && i >= 1 && i <= 7) return hash(i, Math.floor(t * 2), 5) < 0.75 ? K.yellow : K.screen;
    for (let k = 0; k < 3; k += 1) {
      const ax = i - (1 + k * 4 + alienOff);
      const ay = j - (5 + (k % 2) * 4);
      if (ax >= 0 && ax <= 2 && ay >= 0 && ay <= 2) {
        const pattern = ay === 0 ? ax !== 1 : ay === 1 ? true : legs ? ax !== 1 : ax === 1;
        if (pattern) return k === 1 ? K.pink : K.green;
      }
    }
    if (j >= 24 && j <= 26) {
      const sx = i - shipX;
      if ((j === 24 && sx === 1) || (j === 25 && sx >= 0 && sx <= 2) || (j === 26 && (sx === 0 || sx === 2))) return K.cyan;
    }
    if (i === shipX + 1 && j === bulletY) return K.yellow;
    if (hash(i, (((j - Math.floor(t * 12)) % 64) + 64) % 64, 21) < 0.05) return rgb("#6d6db8");
    return j % 2 ? K.screen : rgb("#0d1338");
  });
}

/* ------------------------------ Escritorio gamer ------------------------------ */

const MUG = [4.1, 0.6];

function drawDesk(g) {
  const metal = pal("#1f1a33");
  g.box(4.05, 0.1, 0.08, 0.8, 0, 30, metal);
  g.box(5.87, 0.1, 0.08, 0.8, 0, 30, metal);
  g.faceV(0.4, 4.13, 5.87, 22, 28, rgb("#1a1530"));
  g.box(4.03, 0.08, 1.94, 0.84, 30, 4, pal("#2b2345"));

  // Torre del PC con panel de vidrio
  g.box(5.48, 0.12, 0.42, 0.52, 34, 36, pal("#1b1730"));
  g.faceU(5.9, 0.17, 0.6, 38, 66, rgb("#0d0a1a"));
  for (let z = 40; z < 66; z += 3) g.line([5.52, 0.64, z], [5.85, 0.64, z], rgb("#2c2648"));
  g.px(5.6, 0.64, 67, K.cyan);

  // Monitor ultrawide
  g.box(4.62, 0.2, 0.12, 0.08, 34, 12, metal);
  g.box(4.48, 0.16, 0.4, 0.24, 34, 2, metal, { bevel: false });
  g.box(4.12, 0.2, 1.2, 0.07, 44, 28, pal("#1a1628"));
  g.faceV(0.27, 4.16, 5.28, 47, 69, rgb("#0b1324"));

  // Teclado, mousepad, mouse
  g.box(4.3, 0.5, 0.66, 0.18, 34, 2, pal("#1c1830"));
  g.top(34, 5.0, 0.48, 5.42, 0.86, rgb("#4b2f8f"));
  g.line([5.0, 0.86, 34], [5.42, 0.86, 34], rgb("#7c5cff"));
  g.box(5.16, 0.6, 0.1, 0.14, 34, 3, pal("#2b2540"));

  // Taza
  g.box(MUG[0], MUG[1], 0.15, 0.15, 34, 9, pal("#ff8fc8"));
  g.top(43, MUG[0] + 0.02, MUG[1] + 0.02, MUG[0] + 0.13, MUG[1] + 0.13, rgb("#5a3220"));
  const [hx, hy] = P(MUG[0] + 0.15, MUG[1] + 0.1, 39);
  g.buf.rect(Math.round(hx) + 1, Math.round(hy) - 3, 1, 4, rgb("#d9609c"));
  g.buf.set(Math.round(hx), Math.round(hy) - 3, rgb("#d9609c"));

  // Suculenta
  g.box(4.18, 0.2, 0.12, 0.12, 34, 5, pal("#f5f0e8"));
  const [sx, sy] = P(4.24, 0.26, 39);
  g.buf.ellipse(sx, sy - 2, 3.5, 2.6, (x, y) => (y < sy - 2 ? K.leafHi : K.leaf));
}

function animDesk(g, t) {
  // Código que se desplaza en el monitor
  const palette = [rgb("#7ee787"), rgb("#79c0ff"), rgb("#ff7b72"), rgb("#d2a8ff"), rgb("#ffd43b")];
  const scroll = Math.floor(t * 1.6);
  g.bitmapV(0.27, 4.17, 48, 26, 21, (i, j) => {
    if (i >= 19) {
      if (i === 19) return rgb("#1d2a44");
      const bar = i - 20;
      const height = 4 + Math.round((Math.sin(t * 2 + bar) + 1) * 6);
      return 20 - j < height && bar % 2 === 0 ? (bar === 2 ? K.pink : K.cyan) : rgb("#0b1324");
    }
    if (j % 2 === 1) return rgb("#0b1324");
    const line = Math.floor(j / 2) + scroll;
    const indent = Math.floor(hash(line, 1, 4) * 4);
    const len = 4 + Math.floor(hash(line, 2, 4) * 12);
    if (i < indent || i >= indent + len) {
      if (j === 20 && i === indent + len + 1 && Math.floor(t * 2) % 2 === 0) return K.white;
      return rgb("#0b1324");
    }
    if (hash(line, i, 5) < 0.14) return rgb("#0b1324");
    return palette[Math.floor(hash(line, Math.floor((i - indent) / 4), 6) * palette.length)];
  });

  // Teclado RGB
  g.top(36, 4.32, 0.52, 4.94, 0.66, (x, y) => {
    if ((x + y) % 2 === 1) return rgb("#120e1e");
    return RAINBOW[(Math.floor(x / 3 + t * 6) % RAINBOW.length + RAINBOW.length) % RAINBOW.length];
  });

  // Tira LED del escritorio
  g.line([4.03, 0.92, 31], [5.97, 0.92, 31], (x) => RAINBOW[(Math.floor(x / 4 - t * 5) % RAINBOW.length + RAINBOW.length) % RAINBOW.length]);

  // Ventiladores RGB
  const ringColor = RAINBOW[Math.floor(t * 1.5) % RAINBOW.length];
  [61, 51, 41].forEach((z, k) => {
    const [fx, fy] = P(5.9, 0.38, z);
    g.buf.ellipse(fx, fy, 4.2, 3.6, (x, y, dx, dy) => {
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d > 0.75) return ringColor;
      const angle = Math.atan2(dy, dx) + t * (5 + k);
      return Math.floor((angle / Math.PI) * 3) % 2 === 0 ? rgb("#3a3358") : rgb("#221d38");
    });
  });

  // Vapor del café
  const [mx, my] = P(MUG[0] + 0.07, MUG[1] + 0.07, 44);
  for (let k = 0; k < 3; k += 1) {
    const phase = (t * 0.7 + k / 3) % 1;
    if (phase > 0.75) continue;
    g.buf.set(Math.round(mx + Math.sin((t + k) * 3)), Math.round(my - phase * 12), rgb("#e8e4ff"));
  }
  // LED del mouse
  g.px(5.21, 0.74, 37, RAINBOW[Math.floor(t * 2) % RAINBOW.length]);
}

/* ------------------------------ Silla gamer ------------------------------ */

function drawChairBase(g) {
  const [cx, cy] = P(4.5, 1.48, 3);
  for (let k = 0; k < 5; k += 1) {
    const a = (k / 5) * Math.PI * 2 + 0.3;
    const ex = cx + Math.cos(a) * 11;
    const ey = cy + Math.sin(a) * 5.5;
    g.buf.line(cx, cy, ex, ey, rgb("#2a2440"));
    g.buf.rect(Math.round(ex) - 1, Math.round(ey), 2, 2, K.ink);
  }
  g.box(4.47, 1.45, 0.06, 0.06, 3, 10, pal("#3a3550"));
  g.box(4.2, 1.2, 0.6, 0.56, 12, 4, { ...pal("#2a2040"), top: rgb("#7c5cff"), hl: rgb("#a58bff") });
  g.line([4.3, 1.48, 16], [4.72, 1.48, 16], rgb("#6247e0"));
  g.box(4.2, 1.3, 0.05, 0.05, 16, 6, pal("#1d1830"));
  g.box(4.17, 1.24, 0.08, 0.42, 22, 3, pal("#3b2f66"));
}

function drawChairFront(g) {
  g.box(4.76, 1.3, 0.05, 0.05, 16, 6, pal("#1d1830"));
  g.box(4.75, 1.24, 0.08, 0.42, 22, 3, pal("#3b2f66"));
  g.box(4.22, 1.74, 0.56, 0.12, 14, 24, pal("#1f1832"));
  g.box(4.18, 1.74, 0.12, 0.12, 30, 9, pal("#1f1832"));
  g.box(4.7, 1.74, 0.12, 0.12, 30, 9, pal("#1f1832"));
  g.faceV(1.86, 4.3, 4.37, 17, 36, rgb("#7c5cff"));
  g.faceV(1.86, 4.63, 4.7, 17, 36, rgb("#7c5cff"));
  g.bitmapV(1.86, 4.42, 26, 5, 5, (i, j) => (Math.abs(i - 2) + Math.abs(j - 2) <= 2 ? (i + j === 2 ? rgb("#ffd1f3") : K.pink) : 0));
}

/* ------------------------------ Estantería ------------------------------ */

const BOOKS = ["#ff6fa8", "#3de0ff", "#ffd43b", "#a58bff", "#5fd18b", "#ff9f43", "#f4f1ff"].map((c) => rgb(c));

function shelfInterior(i, j) {
  const W = 42;
  const boards = [27, 54];
  if (boards.some((b) => j >= b && j <= b + 2)) return j === boards.find((b) => j >= b) ? rgb("#6a529a") : rgb("#4d3874");
  if (i === 20 || i === 21) return i === 20 ? rgb("#4d3874") : rgb("#3a2a5c");
  const comp = j < 27 ? 0 : j < 54 ? 1 : 2;
  const left = i < 20;
  const top = comp === 0 ? 0 : comp === 1 ? 30 : 57;
  const bottom = comp === 0 ? 26 : comp === 1 ? 53 : 81;
  const li = left ? i : i - 22;
  const lj = j - top;
  const fromBottom = bottom - j;
  let c = lj < 2 ? rgb("#120b22") : rgb("#1a1230");
  if (lj === 0 && comp > 0) c = rgb("#ff8ad8");

  // Libros / manga
  if ((comp === 0 && left) || (comp === 2 && left) || (comp === 1 && !left && li > 12)) {
    let x = 1;
    let k = comp * 11;
    while (x < 19) {
      const w = 2 + Math.floor(hash(k, comp, 3) * 2);
      const hgt = 12 + Math.floor(hash(k, comp, 4) * 10);
      if (li >= x && li < x + w && fromBottom < hgt) {
        const col = BOOKS[k % BOOKS.length];
        if (fromBottom === hgt - 3) return shade(col, 0.4);
        return li === x ? shade(col, 0.15) : li === x + w - 1 ? shade(col, -0.25) : col;
      }
      x += w + (hash(k, comp, 7) < 0.2 ? 2 : 0);
      k += 1;
      if (comp === 1 && x > 6) break;
    }
  }
  // Trofeo
  if (comp === 0 && !left) {
    const tx = li - 5;
    if (fromBottom <= 1 && tx >= -2 && tx <= 2) return rgb("#c99a2e");
    if (fromBottom >= 2 && fromBottom <= 4 && tx >= -1 && tx <= 1) return rgb("#e8b938");
    if (fromBottom >= 5 && fromBottom <= 10 && Math.abs(tx) <= 3 - (fromBottom > 8 ? 0 : 0)) {
      if (Math.abs(tx) === 3 && fromBottom < 8) return 0;
      return tx < 0 ? rgb("#ffe36b") : rgb("#ffd43b");
    }
    // Gato de la suerte
    const cx = li - 14;
    if (fromBottom <= 9 && cx >= -3 && cx <= 3) {
      if (fromBottom === 6 && cx === 2) return rgb("#ff4d6d");
      if (fromBottom === 7 && (cx === -1 || cx === 1)) return rgb("#1b1e3a");
      if (fromBottom >= 9 && Math.abs(cx) === 2) return rgb("#ffffff");
      if (fromBottom === 4) return rgb("#ff4d6d");
      return fromBottom > 8 && Math.abs(cx) < 2 ? 0 : rgb("#ffffff");
    }
    if (fromBottom >= 9 && fromBottom <= 12 && li - 14 === 4) return rgb("#ffffff");
  }
  // Figuras: slime y robot
  if (comp === 1 && left) {
    const sx = li - 5;
    if (fromBottom < 7 && Math.abs(sx) <= 4 - (fromBottom > 4 ? fromBottom - 4 : 0)) {
      if (fromBottom === 4 && (sx === -2 || sx === 1)) return rgb("#1b1e3a");
      return sx < 0 && fromBottom > 3 ? rgb("#a3f58f") : rgb("#5fd16b");
    }
    const rx = li - 14;
    if (fromBottom < 12 && rx >= -2 && rx <= 2) {
      if (fromBottom === 11 && rx === 0) return K.red;
      if (fromBottom === 8 && rx >= -1 && rx <= 1) return K.cyan;
      if (fromBottom < 3 && rx === 0) return 0;
      return rx < 0 ? rgb("#d6dbe8") : rgb("#9aa4b5");
    }
  }
  // Consola retro y cartuchos
  if (comp === 1 && !left && li <= 12) {
    if (fromBottom < 5 && li >= 1 && li <= 11) {
      if (fromBottom === 2 && (li === 8 || li === 10)) return K.pink;
      if (fromBottom === 2 && li === 3) return rgb("#3a3358");
      return fromBottom === 4 ? rgb("#ffffff") : rgb("#d9d4ee");
    }
    if (fromBottom >= 5 && fromBottom < 11 && li >= 3 && li <= 9 && li % 3 !== 2) return BOOKS[li % BOOKS.length];
  }
  // Cajas de juegos apiladas
  if (comp === 2 && !left) {
    const level = Math.floor(fromBottom / 4);
    if (level < 3 && li >= 1 + level && li <= 16 - level) {
      const col = BOOKS[(level + 2) % BOOKS.length];
      if (fromBottom % 4 === 3) return rgb("#1a1230");
      return li === 3 + level ? K.white : col;
    }
  }
  return c;
}

function drawShelf(g) {
  g.box(7.06, 0.08, 1.88, 0.5, 0, 88, pal("#3a2758"));
  g.bitmapV(0.58, 7.12, 3, 42, 82, shelfInterior);
  // Planta en la parte de arriba con hojas cayendo por el frente
  g.box(7.14, 0.16, 0.2, 0.2, 88, 8, pal("#f2ecff"));
  const [px, py] = P(7.24, 0.26, 96);
  for (let k = 0; k < 8; k += 1) g.buf.ellipse(px - 6 + k * 1.6, py - 2 - (k % 3), 1.6, 1.4, k % 2 ? K.leaf : K.leafHi);
  for (let dz = 0; dz < 34; dz += 1) {
    const [vx, vy] = P(7.3, 0.6, 94 - dz);
    const sway = Math.round(Math.sin(dz * 0.4) * 1.2);
    g.buf.set(Math.round(vx) + sway, Math.round(vy), K.leafMid);
    if (dz % 4 === 1) g.buf.rect(Math.round(vx) + sway + (dz % 8 === 1 ? 1 : -2), Math.round(vy), 2, 2, dz % 8 === 1 ? K.leaf : K.leafHi);
  }
  // Lámpara de luna
  g.box(8.52, 0.24, 0.16, 0.16, 88, 2, pal("#3a3550"));
  const [mx, my] = P(8.6, 0.32, 96);
  g.buf.ellipse(mx, my, 5, 5, (x, y) => {
    if ((x === Math.round(mx) - 2 && y === Math.round(my) - 1) || (x === Math.round(mx) + 1 && y === Math.round(my) + 2)) return rgb("#e3cf8d");
    return x + y < mx + my - 2 ? rgb("#fff8dc") : rgb("#ffe9a8");
  });
}

/* ------------------------------ Nevera retro + lámpara de lava ------------------------------ */

function drawFridge(g) {
  const fr = pal("#cbb8ff");
  g.box(9.08, 0.1, 0.84, 0.8, 0, 46, fr);
  g.line([9.08, 0.9, 32], [9.92, 0.9, 32], shade(fr.left, -0.3));
  g.line([9.92, 0.1, 32], [9.92, 0.9, 32], shade(fr.right, -0.3));
  g.faceV(0.9, 9.76, 9.81, 34, 43, rgb("#8e7ad0"));
  g.faceV(0.9, 9.76, 9.81, 16, 29, rgb("#8e7ad0"));
  g.box(9.1, 0.12, 0.06, 0.06, -2, 2, pal("#3a3550"));
  // Stickers
  g.bitmapV(0.9, 9.16, 7, 13, 22, (i, j) => {
    const heart = ["XX.XX", "XXXXX", ".XXX.", "..X.."];
    if (j < 4 && i < 5 && heart[j][i] === "X") return rgb("#ff5f8f");
    const sx = i - 9;
    const sy = j - 8;
    if ((Math.abs(sx) <= 2 && sy === 0) || (Math.abs(sy) <= 2 && sx === 0)) return K.yellow;
    if (j >= 15 && j <= 19 && i >= 2 && i <= 9) {
      if (j === 17 && (i === 4 || i === 7)) return rgb("#1b1e3a");
      return rgb("#3de0ff");
    }
    return 0;
  });
  // Base y tapa de la lámpara de lava
  g.box(9.42, 0.42, 0.16, 0.16, 46, 5, pal("#3a3550"));
  const [lx, ly] = P(9.5, 0.5, 63);
  g.buf.ellipse(lx, ly, 4.2, 10.5, (x) => (x < lx - 2 ? rgb("#9b4ac0") : rgb("#6c2a8f")));
  g.box(9.45, 0.45, 0.1, 0.1, 73, 3, pal("#3a3550"));
}

function animLava(g, t) {
  const [lx, ly] = P(9.5, 0.5, 63);
  for (let k = 0; k < 3; k += 1) {
    const by = ly + Math.sin(t * 0.6 + k * 2.1) * 6;
    const bx = lx + (k - 1) * 1.2;
    g.buf.ellipse(bx, by, 2 - (k === 2 ? 0.6 : 0), 2.4, (x, y) => {
      const dx = (x + 0.5 - lx) / 3.4;
      const dy = (y + 0.5 - ly) / 9.5;
      if (dx * dx + dy * dy > 1) return 0;
      return y < by ? rgb("#ffb3d9") : rgb("#ff6fb5");
    });
  }
}

/* ------------------------------ Planta de serpiente ------------------------------ */

function drawSnakePlant(g) {
  g.box(9.3, 2.3, 0.4, 0.4, 0, 13, pal("#efe7d8"));
  g.faceV(2.7, 9.3, 9.7, 5, 7, rgb("#2aa5b5"));
  g.faceU(9.7, 2.3, 2.7, 5, 7, rgb("#1f7d8a"));
  const [cx, cy] = P(9.5, 2.5, 13);
  [[-4, 28, -5], [0, 38, 1], [4, 27, 6], [-1, 22, -2], [3, 19, 3]].forEach(([dx, hgt, tilt], k) => {
    const pts = [[cx + dx - 2.5, cy], [cx + dx + 2.5, cy], [cx + dx + tilt, cy - hgt]];
    g.buf.poly(pts, (x, y) => ((y + k) % 5 === 0 ? rgb("#2f7a3e") : (y + k) % 5 === 1 ? rgb("#9bd36b") : rgb("#4c9a52")));
    g.buf.line(pts[0][0], pts[0][1], pts[2][0], pts[2][1], rgb("#e3d36b"));
  });
}

/* ------------------------------ TV + mueble ------------------------------ */

function drawTV(g) {
  const cons = pal("#2c2140");
  g.box(0.06, 2.05, 0.64, 1.9, 0, 22, cons);
  g.faceU(0.7, 2.14, 2.95, 4, 18, rgb("#140d24"));
  g.faceU(0.7, 3.05, 3.86, 4, 18, rgb("#140d24"));
  // Consola en un cubículo y juegos en el otro
  g.bitmapU(0.705, 3.84, 5, 19, 12, (i, j) => {
    if (j >= 5 && j <= 10 && i >= 2 && i <= 16) {
      if (j === 5) return rgb("#ffffff");
      if (j === 8 && i >= 4 && i <= 14) return rgb("#7c5cff");
      if (j === 7 && i === 15) return K.cyan;
      return rgb("#dcd6f2");
    }
    return 0;
  });
  g.bitmapU(0.705, 2.93, 5, 19, 12, (i, j) => {
    if (i % 3 === 2 || i < 1 || i > 17) return 0;
    const hgt = 9 + Math.floor(hash(Math.floor(i / 3), 4, 2) * 3);
    return 12 - j <= hgt ? BOOKS[Math.floor(i / 3) % BOOKS.length] : 0;
  });
  g.line([0.7, 2.06, 1], [0.7, 3.94, 1], rgb("#a855f7"));

  // Encima del mueble
  g.box(0.18, 3.28, 0.34, 0.46, 22, 5, pal("#efeaff"));
  g.line([0.52, 3.3, 24], [0.52, 3.72, 24], rgb("#7c5cff"));
  g.box(0.2, 2.2, 0.16, 0.16, 22, 6, pal("#ff8fc8"));
  const [sx, sy] = P(0.28, 2.28, 28);
  g.buf.ellipse(sx, sy - 2, 3.4, 2.6, (x, y) => (y < sy - 2 ? K.leafHi : K.leaf));
  const [cx, cy] = P(0.42, 2.72, 22);
  g.buf.rect(Math.round(cx) - 4, Math.round(cy) - 2, 9, 3, rgb("#2a2638"));
  g.buf.set(Math.round(cx) - 2, Math.round(cy) - 2, K.white);
  g.buf.set(Math.round(cx) + 2, Math.round(cy) - 2, K.red);
  g.buf.set(Math.round(cx) + 3, Math.round(cy) - 1, K.cyan);

  // Pantalla colgada
  g.box(0.03, 2.08, 0.1, 1.84, 30, 52, pal("#16121f"));
  g.faceU(0.13, 2.12, 3.88, 32, 80, rgb("#0a0814"));
  g.box(0.05, 2.55, 0.12, 0.9, 26, 3, pal("#1d1a26"));
}

const TV_W = 41;
const TV_H = 46;
const tvCells = new Uint32Array(TV_W * TV_H);
const SYNTH_SKY = ["#1a0b3a", "#2c0f52", "#4f1468", "#87207a", "#c2368f"].map((c) => rgb(c));

function animTV(g, t) {
  const horizon = 27;
  const set = (x, y, c) => {
    x = Math.round(x);
    y = Math.round(y);
    if (x >= 0 && y >= 0 && x < TV_W && y < TV_H) tvCells[y * TV_W + x] = c;
  };
  for (let j = 0; j < TV_H; j += 1) {
    for (let i = 0; i < TV_W; i += 1) {
      let c;
      if (j < horizon) {
        const level = (j / horizon) * (SYNTH_SKY.length - 1);
        c = SYNTH_SKY[Math.min(SYNTH_SKY.length - 1, Math.floor(level + BAYER4[((j & 3) << 2) + (i & 3)] - 0.3))] ?? SYNTH_SKY[0];
        const dx = i - 20;
        const dy = j - 22;
        if (dx * dx + dy * dy < 90 && !(j > 18 && j % 3 === 0)) c = j < 17 ? rgb("#ffd25e") : j < 21 ? rgb("#ff9a5e") : rgb("#ff5e9c");
        if (hash(i, j, 9) < 0.02 && j < 14) c = rgb("#ffffff");
      } else {
        c = rgb("#120a2a");
        const dz = j - horizon + 1;
        const worldX = (i - 20) / dz;
        const depth = 22 / dz;
        if (Math.abs(worldX - Math.round(worldX / 1.6) * 1.6) < 0.09 * (1 + 3 / dz)) c = rgb("#ff4fd8");
        if ((((depth - t * 3.2) % 3) + 3) % 3 < 0.5) c = dz < 4 ? rgb("#8f2a9a") : rgb("#ff4fd8");
      }
      tvCells[j * TV_W + i] = c;
    }
  }
  // Cubo rotando (la parte "WebGL" de la tele)
  const verts = [];
  for (const x of [-1, 1]) for (const y of [-1, 1]) for (const z of [-1, 1]) verts.push([x, y, z]);
  const a = t * 0.9;
  const b = 0.55;
  const proj = verts.map(([x, y, z]) => {
    const x1 = x * Math.cos(a) - z * Math.sin(a);
    const z1 = x * Math.sin(a) + z * Math.cos(a);
    const y1 = y * Math.cos(b) - z1 * Math.sin(b);
    return [20 + x1 * 6.2, 12 + y1 * 6.2];
  });
  const edges = [[0, 1], [0, 2], [0, 4], [1, 3], [1, 5], [2, 3], [2, 6], [3, 7], [4, 5], [4, 6], [5, 7], [6, 7]];
  for (const [p, q] of edges) {
    const [x0, y0] = proj[p];
    const [x1, y1] = proj[q];
    const steps = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)) * 1.5 + 1;
    for (let s = 0; s <= steps; s += 1) set(x0 + ((x1 - x0) * s) / steps, y0 + ((y1 - y0) * s) / steps, rgb("#8ffcff"));
  }
  proj.forEach(([x, y]) => set(x, y, rgb("#ffffff")));
  g.bitmapU(0.135, 3.86, 33, TV_W, TV_H, (i, j) => tvCells[j * TV_W + i]);
}

/* ------------------------------ Mesa de centro ------------------------------ */

function drawTable(g) {
  const legs = pal("#5b3b28");
  [[1.14, 2.12], [1.8, 2.12], [1.14, 3.82], [1.8, 3.82]].forEach(([u, v]) => g.box(u, v, 0.06, 0.06, 0, 10, legs));
  g.box(1.1, 2.08, 0.82, 1.84, 10, 3, pal("#9a6a45"));
  // Caja de pizza
  g.box(1.18, 2.24, 0.56, 0.56, 13, 2, pal("#d9b27c"));
  const [px, py] = P(1.46, 2.52, 15);
  g.buf.ellipse(px, py, 9.5, 4.8, (x, y, dx, dy) => {
    const d = Math.sqrt(dx * dx + dy * dy);
    if (d > 0.8) return rgb("#e09a45");
    if (x === Math.round(px) || y === Math.round(py)) return rgb("#e8b04f");
    if ((x * 7 + y * 13) % 11 === 0) return rgb("#d0443e");
    return rgb("#ffd166");
  });
  // Latas
  g.box(1.3, 3.1, 0.1, 0.1, 13, 7, pal("#8a5cf6"));
  g.top(20, 1.3, 3.1, 1.4, 3.2, K.silver);
  g.box(1.55, 3.38, 0.1, 0.1, 13, 7, pal("#2bc6d6"));
  g.top(20, 1.55, 3.38, 1.65, 3.48, K.silver);
  // Control
  const [cx, cy] = P(1.42, 3.62, 13);
  g.buf.rect(Math.round(cx) - 4, Math.round(cy) - 2, 9, 3, rgb("#2a2638"));
  g.buf.rect(Math.round(cx) - 5, Math.round(cy) - 1, 1, 3, rgb("#2a2638"));
  g.buf.rect(Math.round(cx) + 5, Math.round(cy) - 1, 1, 3, rgb("#2a2638"));
  g.buf.set(Math.round(cx) - 2, Math.round(cy) - 2, K.white);
  g.buf.set(Math.round(cx) + 2, Math.round(cy) - 2, K.red);
  g.buf.set(Math.round(cx) + 3, Math.round(cy) - 1, K.cyan);
}

/* ------------------------------ Sofá ------------------------------ */

const VELVET = pal("#5a3fc0");
const CUSHION = pal("#6e54d9");

function drawSofaBase(g) {
  g.box(2.1, 2.04, 0.84, 1.92, 0, 12, VELVET);
  g.box(2.1, 2.0, 0.84, 0.22, 0, 24, VELVET);
  g.box(2.14, 2.24, 0.6, 0.76, 12, 5, CUSHION);
  g.box(2.14, 3.04, 0.6, 0.74, 12, 5, CUSHION);
  g.box(2.58, 2.3, 0.14, 0.42, 17, 10, pal("#ff7eb6"));
  g.box(2.58, 3.3, 0.14, 0.42, 17, 10, pal("#36c5c5"));
}

const plaid = (x, y) => {
  const band = ((2 * y + x) % 10 + 10) % 10;
  const stripe = ((x % 8) + 8) % 8;
  if (stripe < 2 && band < 2) return rgb("#a8f0ee");
  if (stripe < 2 || band < 2) return rgb("#4fb3bf");
  if (stripe === 4) return rgb("#164552");
  return rgb("#23707f");
};

function drawSofaFront(g) {
  g.box(2.74, 2.0, 0.2, 2.0, 12, 18, VELVET);
  g.faceU(2.95, 2.42, 3.3, 6, 30, plaid);
  g.top(30, 2.74, 2.42, 2.95, 3.3, rgb("#4fb3bf"));
  for (let v = 2.45; v < 3.3; v += 1 / 12) g.line([2.95, v, 6], [2.95, v, 4], rgb("#a8f0ee"));
  g.box(2.1, 3.78, 0.84, 0.22, 0, 24, VELVET);
}

/* ------------------------------ Buzón (contacto) ------------------------------ */

function drawMailbox(g) {
  g.box(0.42, 5.42, 0.16, 0.16, 0, 30, pal("#7a5236"));
  const mb = pal("#b98cff");
  g.box(0.14, 5.28, 0.74, 0.44, 30, 11, mb);
  g.box(0.14, 5.32, 0.74, 0.36, 41, 3, mb);
  g.box(0.14, 5.39, 0.74, 0.22, 44, 2, mb, { bevel: false });
  g.bitmapU(0.885, 5.7, 31, 10, 14, (i, j) => {
    const corner = j < 3 && (i < 3 - j || i > 6 + j);
    if (corner) return 0;
    if (i === 0 || i === 9 || j === 0 || j === 13) return rgb("#7a4fd0");
    const heart = ["X.X", "XXX", ".X."];
    if (j >= 5 && j <= 7 && i >= 3 && i <= 5 && heart[j - 5][i - 3] === "X") return rgb("#ff5fa2");
    if (j === 11 && i === 7) return K.yellow;
    return rgb("#9d6ff0");
  });
  // Carta asomando
  g.box(0.36, 5.4, 0.2, 0.05, 45, 7, pal("#fffaf0"), { bevel: false });
  g.px(0.46, 5.45, 49, rgb("#ff5fa2"));
  // Bandera levantada
  g.box(0.64, 5.72, 0.03, 0.03, 34, 20, pal("#d6d0e4"));
  g.faceV(5.75, 0.46, 0.66, 47, 54, K.red);
  // Flores en la base
  const [fx, fy] = P(0.5, 5.5, 0);
  [[-6, 1, K.pink], [-3, 3, K.yellow], [5, 2, rgb("#ff9ad5")], [7, 0, K.white]].forEach(([dx, dy, c]) => {
    g.buf.rect(Math.round(fx) + dx, Math.round(fy) + dy - 3, 1, 3, K.leafMid);
    g.buf.rect(Math.round(fx) + dx - 1, Math.round(fy) + dy - 4, 3, 1, c);
    g.buf.set(Math.round(fx) + dx, Math.round(fy) + dy - 5, c);
  });
}

/* ------------------------------ Puff ------------------------------ */

function drawBeanbag(g) {
  const [cx, cy] = P(7.5, 4.5, 0);
  const colors = [rgb("#bff4fb"), rgb("#2bb3c9"), rgb("#1d8fa6"), rgb("#13667a")];
  const shadeF = (ex, ey, rx, ry) => (x, y) => {
    const nx = (x + 0.5 - ex) / rx;
    const ny = (y + 0.5 - ey) / ry;
    const light = -nx * 0.55 - ny * 0.85;
    if (light > 0.55) return colors[0];
    if (light > -0.15) return colors[1];
    return light > -0.6 ? colors[2] : colors[3];
  };
  g.buf.ellipse(cx + 6, cy - 13, 13, 10, shadeF(cx + 6, cy - 13, 13, 10));
  g.buf.ellipse(cx, cy - 6, 19, 9.5, shadeF(cx, cy - 6, 19, 9.5));
  g.buf.ellipse(cx - 2, cy - 9, 9, 3.6, colors[2]);
  g.buf.ellipse(cx - 3, cy - 10, 6, 2, colors[1]);
  // Etiqueta
  g.buf.rect(Math.round(cx) + 10, Math.round(cy) - 6, 3, 2, K.yellow);
}

/* ------------------------------ Caja de madera ------------------------------ */

function drawCrate(g) {
  const wood = pal("#b07a43");
  g.box(8.12, 4.12, 0.76, 0.76, 0, 20, wood);
  [7, 14].forEach((z) => {
    g.line([8.12, 4.88, z], [8.88, 4.88, z], shade(wood.left, -0.35));
    g.line([8.88, 4.12, z], [8.88, 4.88, z], shade(wood.right, -0.35));
  });
  g.faceV(4.88, 8.12, 8.2, 0, 20, shade(wood.left, 0.12));
  g.faceU(8.88, 4.8, 4.88, 0, 20, shade(wood.right, 0.12));
  // Consola portátil
  g.box(8.26, 4.3, 0.34, 0.18, 20, 2, pal("#efeaff"), { bevel: false });
  g.top(22, 8.36, 4.33, 8.5, 4.45, rgb("#3de0ff"));
  g.px(8.3, 4.38, 22, K.red);
  // Lata y cactus
  g.box(8.66, 4.52, 0.1, 0.1, 20, 7, pal("#ff6b6b"));
  g.top(27, 8.66, 4.52, 8.76, 4.62, K.silver);
  g.box(8.3, 4.62, 0.13, 0.13, 20, 5, pal("#f2a65a"));
  const [kx, ky] = P(8.36, 4.68, 25);
  g.buf.ellipse(kx, ky - 3, 2.4, 3.8, (x) => (x < kx ? K.leafHi : K.leaf));
  g.buf.set(Math.round(kx), Math.round(ky) - 7, K.pink);
}

/* ------------------------------ Bit, el gato ------------------------------ */

const CAT_C = { base: rgb("#f29a4a"), dark: rgb("#c96a2b"), stripe: rgb("#b85a22"), hi: rgb("#ffc07a"), belly: rgb("#ffe0b8") };
const catAnchor = () => {
  const [cx, cy] = P(6.5, 6.5, 0);
  return [Math.round(cx) + 1, Math.round(cy) - 9];
};

function drawCat(g) {
  const [cx, cy] = P(6.5, 6.5, 0);
  g.buf.ellipse(cx, cy - 3, 17, 8, (x, y) => (y > cy - 1 ? rgb("#5b3bb5") : rgb("#8b5cf6")));
  g.buf.ellipse(cx, cy - 5, 13, 5.5, (x, y) => (x + y < cx + cy - 9 ? rgb("#b79cff") : rgb("#9d7cf7")));
  [[-17, -3], [17, -3]].forEach(([dx, dy]) => g.buf.rect(Math.round(cx + dx) - 1, Math.round(cy + dy), 2, 3, K.yellow));

  const [bx, by] = catAnchor();
  g.buf.ellipse(bx, by, 10, 6, (x, y) => {
    if (y < by - 1 && ((x - bx + 40) % 5 === 0)) return CAT_C.stripe;
    if (x + y < bx + by - 6) return CAT_C.hi;
    return y > by + 2 ? CAT_C.dark : CAT_C.base;
  });
  // Cola envolviendo el cuerpo
  for (let k = 0; k <= 12; k += 1) {
    const a = Math.PI * 0.05 + (k / 12) * Math.PI * 0.85;
    const x = bx + Math.cos(a) * 10;
    const y = by + Math.sin(a) * 6.5;
    g.buf.rect(Math.round(x), Math.round(y), 2, 2, k % 4 === 0 ? CAT_C.stripe : k > 10 ? CAT_C.belly : CAT_C.base);
  }
  // Cabeza
  const hx = bx - 8;
  const hy = by + 1;
  g.buf.ellipse(hx, hy, 5.5, 4.5, (x, y) => (y > hy + 1 && x > hx - 2 && x < hx + 2 ? CAT_C.belly : x + y < hx + hy - 3 ? CAT_C.hi : CAT_C.base));
  [[-4, -4], [-3, -5], [-3, -4], [2, -4], [3, -5], [3, -4]].forEach(([dx, dy]) => g.buf.set(hx + dx, hy + dy, CAT_C.base));
  g.buf.set(hx - 3, hy - 4, rgb("#ff9ab5"));
  g.buf.set(hx + 3, hy - 4, rgb("#ff9ab5"));
  g.buf.rect(Math.round(hx) - 3, Math.round(hy), 2, 1, rgb("#4a2a1e"));
  g.buf.rect(Math.round(hx) + 1, Math.round(hy), 2, 1, rgb("#4a2a1e"));
  g.buf.set(Math.round(hx), Math.round(hy) + 1, rgb("#ff7a9c"));
}

function animCat(g, t, info) {
  const [bx, by] = catAnchor();
  const hx = Math.round(bx - 8);
  const hy = Math.round(by + 1);
  if (info.loveAge !== null && info.loveAge < 2.6) {
    // Despierto: ojos abiertos y corazones subiendo
    g.buf.rect(hx - 3, hy - 1, 2, 2, rgb("#7dff7a"));
    g.buf.rect(hx + 1, hy - 1, 2, 2, rgb("#7dff7a"));
    g.buf.set(hx - 2, hy - 1, rgb("#1b1e3a"));
    g.buf.set(hx + 2, hy - 1, rgb("#1b1e3a"));
    const heart = ["X.X", "XXX", ".X."];
    for (let k = 0; k < 3; k += 1) {
      const phase = info.loveAge * 0.9 - k * 0.3;
      if (phase < 0 || phase > 1.4) continue;
      const x = hx + (k - 1) * 6 + Math.round(Math.sin(phase * 6 + k) * 1.5);
      const y = hy - 8 - Math.round(phase * 18);
      heart.forEach((row, j) => [...row].forEach((ch, i) => ch === "X" && g.buf.set(x + i, y + j, rgb("#ff5f8f"))));
    }
    return;
  }
  // Durmiendo: "z" flotando
  const z = ["XXX", ".X.", "XXX"];
  for (let k = 0; k < 2; k += 1) {
    const phase = (t * 0.45 + k * 0.5) % 1;
    const x = hx - 6 - Math.round(phase * 6);
    const y = hy - 8 - Math.round(phase * 14);
    if (phase > 0.85) continue;
    z.forEach((row, j) => [...row].forEach((ch, i) => ch === "X" && g.buf.set(x + i, y + j, rgb("#e8e4ff"))));
  }
  // Punta de la cola que se mueve
  if (Math.sin(t * 2.4) > 0.6) g.buf.rect(Math.round(bx - 10), Math.round(by + 3), 2, 1, CAT_C.belly);
}

/* ------------------------------ Definición de la habitación ------------------------------ */

export const ROOM_OBJECTS = [
  { id: "plant", tiles: [[0, 0]], layers: { base: drawMonstera } },
  {
    id: "arcade",
    tiles: [[2, 0]],
    stop: "gameplay",
    action: { stand: [2, 1], face: "ne" },
    labelAt: [2.5, 0.5, 98],
    layers: { base: drawArcade },
    animate: animArcade,
  },
  {
    id: "desk",
    tiles: [[4, 0], [5, 0]],
    stop: "systems",
    action: { seatOf: "chair", seat: 0 },
    labelAt: [4.8, 0.3, 80],
    layers: { base: drawDesk },
    animate: animDesk,
  },
  {
    id: "chair",
    tiles: [[4, 1]],
    seats: [{ tile: [4, 1], dir: "ne", z: 16 }],
    label: "Silla gamer",
    labelAt: [4.5, 1.5, 48],
    layers: { base: drawChairBase, front: drawChairFront },
  },
  { id: "shelf", tiles: [[7, 0], [8, 0]], layers: { base: drawShelf } },
  { id: "fridge", tiles: [[9, 0]], layers: { base: drawFridge }, animate: animLava },
  { id: "snake", tiles: [[9, 2]], layers: { base: drawSnakePlant } },
  {
    id: "tv",
    tiles: [[0, 2], [0, 3]],
    stop: "webgl",
    action: { seatOf: "sofa", seat: 1 },
    labelAt: [0.1, 3, 88],
    layers: { base: drawTV },
    animate: animTV,
  },
  { id: "table", tiles: [[1, 2], [1, 3]], layers: { base: drawTable } },
  {
    id: "sofa",
    tiles: [[2, 2], [2, 3]],
    seats: [
      { tile: [2, 2], dir: "nw", z: 17 },
      { tile: [2, 3], dir: "nw", z: 17 },
    ],
    label: "Sofá",
    labelAt: [2.5, 3, 36],
    layers: { base: drawSofaBase, front: drawSofaFront },
  },
  {
    id: "mailbox",
    tiles: [[0, 5]],
    stop: "contact",
    action: { stand: [1, 5], face: "nw" },
    labelAt: [0.5, 5.5, 62],
    layers: { base: drawMailbox },
  },
  {
    id: "beanbag",
    tiles: [[7, 4]],
    seats: [{ tile: [7, 4], dir: "sw", z: 9 }],
    label: "Puff",
    labelAt: [7.5, 4.5, 30],
    layers: { base: drawBeanbag },
  },
  { id: "crate", tiles: [[8, 4]], layers: { base: drawCrate } },
  {
    id: "cat",
    tiles: [[6, 6]],
    easter: "cat",
    label: "Bit, el gato",
    action: { stand: [6, 5], face: "sw" },
    labelAt: [6.5, 6.5, 26],
    layers: { base: drawCat },
    animate: animCat,
  },
];
