// Static + decorative layers of the room: sky, floating-island underside, oak floor,
// translucent walls, glowing runes and the welcome sign.
import { CW, COLS } from "./iso";
import { drawText, textWidth } from "./pixelFont";

export const LW = 400;      // logical canvas size (pixels of the pixel-art grid)
export const LH = 392;
export const OX = 200;      // screen position of the back corner of the floor
export const OY = 118;
export const WALL_H = 100;
export const HALF = (COLS * CW) / 2; // 192: half of the floor diagonal

export const mulberry32 = (a) => () => {
  a |= 0; a = (a + 0x6d2b79f5) | 0;
  let t = Math.imul(a ^ (a >>> 15), 1 | a);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

export const makeCanvas = (w, h) => {
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  const g = c.getContext("2d");
  g.imageSmoothingEnabled = false;
  return c;
};

const lerp = (a, b, t) => a + (b - a) * t;
const hex = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
export const mix = (a, b, t) => {
  const A = hex(a), B = hex(b);
  return `rgb(${Math.round(lerp(A[0], B[0], t))},${Math.round(lerp(A[1], B[1], t))},${Math.round(lerp(A[2], B[2], t))})`;
};

// 1px wide pixel line (Bresenham)
export function pixelLine(g, x0, y0, x1, y1, color) {
  x0 = Math.round(x0); y0 = Math.round(y0); x1 = Math.round(x1); y1 = Math.round(y1);
  const dx = Math.abs(x1 - x0), dy = -Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
  let err = dx + dy;
  g.fillStyle = color;
  for (;;) {
    g.fillRect(x0, y0, 1, 1);
    if (x0 === x1 && y0 === y1) break;
    const e2 = 2 * err;
    if (e2 >= dy) { err += dy; x0 += sx; }
    if (e2 <= dx) { err += dx; y0 += sy; }
  }
}

// ----------------------------------------------------------------------------- sky
export function makeSkyAssets() {
  const rng = mulberry32(11);
  const stars = [];
  for (let i = 0; i < 90; i++) {
    stars.push({ x: Math.floor(rng() * LW), y: Math.floor(rng() * (LH - 90)), p: rng() * 6.28, s: rng() < 0.12 ? 2 : 1, c: rng() < 0.3 ? "#ffd8f2" : rng() < 0.5 ? "#bff6ff" : "#ffffff" });
  }
  // crescent moon, pre-rendered
  const moon = makeCanvas(48, 48); const m = moon.getContext("2d");
  m.fillStyle = "rgba(255,240,200,0.12)"; m.beginPath(); m.arc(24, 24, 23, 0, 6.3); m.fill();
  m.fillStyle = "rgba(255,240,200,0.18)"; m.beginPath(); m.arc(24, 24, 19, 0, 6.3); m.fill();
  m.fillStyle = "#fff1c4"; m.beginPath(); m.arc(24, 24, 14, 0, 6.3); m.fill();
  m.globalCompositeOperation = "destination-out"; m.beginPath(); m.arc(30, 20, 12, 0, 6.3); m.fill();
  m.globalCompositeOperation = "source-over";
  // pixel clouds for the "day" mode
  const cloud = makeCanvas(64, 22); const c = cloud.getContext("2d");
  c.fillStyle = "#ffffff";
  [[8, 10, 12, 8], [20, 5, 14, 12], [34, 6, 14, 12], [46, 10, 12, 8], [14, 12, 40, 8]].forEach(([x, y, w, h]) => { c.beginPath(); c.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, 6.3); c.fill(); });
  const sky = { stars, moon, cloud };
  return sky;
}

export function drawSky(g, sky, nightT, t) {
  const top = mix("#b8a2ee", "#110c2b", nightT), bot = mix("#ffd4e8", "#2d1c52", nightT);
  const grad = g.createLinearGradient(0, 0, 0, LH);
  grad.addColorStop(0, top); grad.addColorStop(1, bot);
  g.fillStyle = grad; g.fillRect(0, 0, LW, LH);
  // nebula blobs
  g.globalAlpha = 0.18 * nightT;
  [[90, 210, 90, "#7a3fb5"], [330, 130, 80, "#c04d9a"], [300, 300, 100, "#2f5db3"]].forEach(([x, y, r, col]) => {
    const rg = g.createRadialGradient(x, y, 0, x, y, r);
    rg.addColorStop(0, col); rg.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = rg; g.fillRect(x - r, y - r, r * 2, r * 2);
  });
  g.globalAlpha = 1;
  if (nightT > 0.02) {
    for (const s of sky.stars) {
      const tw = 0.55 + 0.45 * Math.sin(t * 1.6 + s.p);
      g.globalAlpha = nightT * tw;
      g.fillStyle = s.c;
      g.fillRect(s.x, s.y, s.s, s.s);
      if (s.s === 2) { g.fillRect(s.x - 1, s.y, 1, 1); g.fillRect(s.x + 2, s.y, 1, 1); g.fillRect(s.x, s.y - 1, 1, 1); g.fillRect(s.x, s.y + 2, 1, 1); }
    }
    g.globalAlpha = nightT; g.drawImage(sky.moon, 40, 22);
    g.globalAlpha = 1;
  }
  if (nightT < 0.98) {
    g.globalAlpha = (1 - nightT) * 0.85;
    g.drawImage(sky.cloud, Math.round(((t * 4) % (LW + 80)) - 64), 36);
    g.drawImage(sky.cloud, Math.round(((t * 2.5 + 200) % (LW + 80)) - 64), 90);
    g.globalAlpha = 1;
  }
}

// ----------------------------------------------------------------------------- floating island
export function makeIsland() {
  const cv = makeCanvas(LW, LH); const g = cv.getContext("2d");
  const rng = mulberry32(5);
  const slab = 5;
  const topEdge = (x) => (x <= 0 ? OY + HALF / 2 + slab + (x + HALF) * 0.5 : OY + HALF + slab - x * 0.5);
  // bottom silhouette: a cone with jagged stalactites
  const bottom = {};
  for (let x = -HALF; x <= HALF; x++) {
    const u = 1 - Math.abs(x) / HALF;
    let y = OY + HALF / 2 + slab + 150 * Math.pow(u, 0.85);
    const tooth = ((x + 400) % 13) / 13;
    y -= (tooth < 0.5 ? tooth : 1 - tooth) * 14 * Math.min(1, u * 3);
    bottom[x] = Math.max(y, topEdge(x) + 2);
  }
  // a few long stalactites
  [[-70, 22], [-18, 30], [34, 24], [82, 14], [-120, 12]].forEach(([cx, len]) => {
    for (let x = cx - 5; x <= cx + 5; x++) { if (bottom[x] === undefined) continue; bottom[x] += Math.max(0, len - Math.abs(x - cx) * (len / 5)) * 0.9; }
  });
  for (let x = -HALF; x <= HALF; x++) {
    const x0 = Math.round(OX + x), yt = Math.round(topEdge(x)), yb = Math.round(bottom[x]);
    const left = x < 0;
    for (let y = yt; y <= yb; y++) {
      const d = (y - yt) / Math.max(1, yb - yt);
      let col = left ? mix("#6a5590", "#2c2144", Math.min(1, d * 1.1)) : mix("#4c3c72", "#1f1733", Math.min(1, d * 1.1));
      if ((y + (left ? x : -x)) % 11 === 0 && d > 0.12) col = left ? "#3c2f5a" : "#2b2145"; // strata
      g.fillStyle = col; g.fillRect(x0, y, 1, 1);
    }
  }
  // rim light along the slab and a darker front edge between the two faces
  for (let x = -HALF; x <= HALF; x++) { g.fillStyle = "rgba(190,160,255,0.35)"; g.fillRect(Math.round(OX + x), Math.round(topEdge(x)), 1, 1); }
  g.fillStyle = "rgba(10,6,24,0.55)"; g.fillRect(OX, Math.round(topEdge(0)), 1, Math.round(bottom[0] - topEdge(0)));
  // speckles / cracks
  for (let i = 0; i < 70; i++) {
    const x = Math.floor(-HALF + rng() * 2 * HALF);
    const y = topEdge(x) + 4 + rng() * (bottom[x] - topEdge(x) - 6);
    if (y < topEdge(x) + 3 || y > bottom[x] - 2) continue;
    g.fillStyle = rng() < 0.5 ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.22)";
    g.fillRect(Math.round(OX + x), Math.round(y), rng() < 0.4 ? 2 : 1, 1);
  }
  // outline of the whole silhouette
  const id = g.getImageData(0, 0, LW, LH); const d = id.data;
  const solid = (x, y) => x >= 0 && y >= 0 && x < LW && y < LH && d[(y * LW + x) * 4 + 3] > 0;
  const out = [];
  for (let y = 0; y < LH; y++) for (let x = 0; x < LW; x++) {
    if (!solid(x, y) && (solid(x + 1, y) || solid(x - 1, y) || solid(x, y + 1) || solid(x, y - 1))) out.push([x, y]);
  }
  g.fillStyle = "#17121f"; out.forEach(([x, y]) => g.fillRect(x, y, 1, 1));
  // little glowing crystals clinging to the rock
  const crystals = [[-96, 0.55, "#7ff3ff"], [58, 0.5, "#ff9ad8"], [-22, 0.7, "#7ff3ff"], [112, 0.35, "#c9a6ff"]];
  const cry = [];
  crystals.forEach(([x, f, col]) => {
    const y = topEdge(x) + (bottom[x] - topEdge(x)) * f;
    const px = Math.round(OX + x), py = Math.round(y);
    g.fillStyle = "#17121f"; g.fillRect(px - 2, py - 7, 5, 9);
    g.fillStyle = col; g.fillRect(px - 1, py - 6, 3, 7); g.fillRect(px, py - 7, 1, 1);
    g.fillStyle = "#ffffff"; g.fillRect(px - 1, py - 5, 1, 3);
    cry.push({ x: px, y: py - 3, col });
  });
  return { canvas: cv, crystals: cry, bottomY: (x) => bottom[Math.max(-HALF, Math.min(HALF, x))] };
}

// ----------------------------------------------------------------------------- floor
export function makeFloor(tileImg) {
  const cv = makeCanvas(LW, LH); const g = cv.getContext("2d");
  const n = COLS / 4;
  for (let s = 0; s <= 2 * (n - 1); s++) {
    for (let i = 0; i < n; i++) {
      const j = s - i; if (j < 0 || j >= n) continue;
      g.drawImage(tileImg, OX + (i - j) * 64 - 74, OY + (i + j) * 32 - 11);
    }
  }
  return cv;
}

// ----------------------------------------------------------------------------- walls
// Wall helpers: point on the wall at distance s along its base and height h above the floor.
export const wallPoint = (side, s, h) => ({ x: OX + (side === "R" ? s : -s), y: OY + s / 2 - h });

export function makeWalls() {
  const cv = makeCanvas(LW, LH); const g = cv.getContext("2d");
  const wall = (side, tint, edge) => {
    const p = (s, h) => wallPoint(side, s, h);
    const a = p(0, 0), b = p(HALF, 0), c = p(HALF, WALL_H), d = p(0, WALL_H);
    const grad = g.createLinearGradient(0, OY - WALL_H, 0, OY + HALF / 2);
    grad.addColorStop(0, `rgba(${tint},0.05)`); grad.addColorStop(1, `rgba(${tint},0.20)`);
    g.fillStyle = grad;
    g.beginPath(); g.moveTo(a.x, a.y); g.lineTo(b.x, b.y); g.lineTo(c.x, c.y); g.lineTo(d.x, d.y); g.closePath(); g.fill();
    // soft glass streaks
    g.fillStyle = `rgba(255,255,255,0.05)`;
    [[30, 14], [92, 8], [150, 12]].forEach(([s0, w]) => {
      const q1 = p(s0, 4), q2 = p(s0 + w, 4), q3 = p(s0 + w + 22, WALL_H - 6), q4 = p(s0 + 22, WALL_H - 6);
      g.beginPath(); g.moveTo(q1.x, q1.y); g.lineTo(q2.x, q2.y); g.lineTo(q3.x, q3.y); g.lineTo(q4.x, q4.y); g.closePath(); g.fill();
    });
    // mullions
    for (let s = 32; s < HALF; s += 32) { const lo = p(s, 0), hi = p(s, WALL_H); pixelLine(g, lo.x, lo.y, hi.x, hi.y, `rgba(${edge},0.16)`); }
    const r1 = p(0, 34), r2 = p(HALF, 34); pixelLine(g, r1.x, r1.y, r2.x, r2.y, `rgba(${edge},0.10)`);
    // bright frame
    pixelLine(g, d.x, d.y, c.x, c.y, `rgba(${edge},0.65)`);
    pixelLine(g, a.x, a.y, b.x, b.y, `rgba(${edge},0.55)`);
    pixelLine(g, b.x, b.y, c.x, c.y, `rgba(${edge},0.30)`);
  };
  wall("L", "255,180,225", "255,214,240");
  wall("R", "170,200,255", "200,230,255");
  // back corner post
  g.fillStyle = "rgba(235,225,255,0.85)"; g.fillRect(OX, OY - WALL_H, 1, WALL_H + 1);
  g.fillStyle = "rgba(235,225,255,0.4)"; g.fillRect(OX - 1, OY - WALL_H, 1, WALL_H + 1); g.fillRect(OX + 1, OY - WALL_H, 1, WALL_H + 1);
  return cv;
}

// Runes carved into the glass: random 5x7 glyph shapes that twinkle.
export function makeRunes() {
  const rng = mulberry32(23); const runes = [];
  const make = () => {
    const rows = [];
    for (let j = 0; j < 7; j++) { let row = ""; for (let i = 0; i < 5; i++) row += rng() < 0.38 || (i === 2 && j % 3 === 0) ? "#" : "."; rows.push(row); }
    return rows;
  };
  const cols = ["#ffd0ee", "#bff6ff", "#e5d2ff"];
  for (let i = 0; i < 9; i++) runes.push({ side: "L", s: 14 + rng() * 150, h: 12 + rng() * 70, rows: make(), p: rng() * 6.28, col: cols[i % 3] });
  for (let i = 0; i < 9; i++) {
    const s = 8 + rng() * 170, h = 10 + rng() * 76;
    if (s > 14 && s < 178 && h > 34 && h < 86) continue; // keep the sign area clear
    runes.push({ side: "R", s, h, rows: make(), p: rng() * 6.28, col: cols[(i + 1) % 3] });
  }
  return runes;
}

export function drawRunes(g, runes, t, nightT) {
  for (const r of runes) {
    const a = (0.16 + 0.34 * (0.5 + 0.5 * Math.sin(t * 1.3 + r.p))) * (0.55 + 0.45 * nightT);
    g.globalAlpha = a; g.fillStyle = r.col;
    for (let j = 0; j < r.rows.length; j++) for (let i = 0; i < 5; i++) {
      if (r.rows[j][i] !== "#") continue;
      const s = r.s + i * (r.side === "R" ? 1 : -1);
      const p = wallPoint(r.side, s, r.h - j);
      g.fillRect(Math.round(p.x), Math.round(p.y), 1, 1);
    }
  }
  g.globalAlpha = 1;
}

// round "moon window" on the left wall
export function makeMoonWindow() {
  const S = 46; const cv = makeCanvas(S, S); const g = cv.getContext("2d");
  g.fillStyle = "rgba(10,8,40,0.55)"; g.beginPath(); g.arc(S / 2, S / 2, 20, 0, 6.3); g.fill();
  g.fillStyle = "#fff1c4"; g.beginPath(); g.arc(S / 2, S / 2, 12, 0, 6.3); g.fill();
  g.fillStyle = "rgba(14,10,46,1)"; g.beginPath(); g.arc(S / 2 + 6, S / 2 - 3, 11, 0, 6.3); g.fill();
  const rng = mulberry32(2);
  g.fillStyle = "#ffffff"; for (let i = 0; i < 10; i++) g.fillRect(6 + Math.floor(rng() * 34), 6 + Math.floor(rng() * 34), 1, 1);
  // pixel ring
  const ring = [];
  for (let a = 0; a < 6.283; a += 0.04) ring.push([Math.round(S / 2 + Math.cos(a) * 21), Math.round(S / 2 + Math.sin(a) * 21)]);
  g.fillStyle = "#ffd6f0"; ring.forEach(([x, y]) => g.fillRect(x, y, 1, 1));
  g.fillStyle = "#ffffff"; ring.filter((_, i) => i % 9 === 0).forEach(([x, y]) => g.fillRect(x, y, 1, 1));
  return cv;
}

export function shearBlit(g, tex, x0, y0, slope) {
  for (let i = 0; i < tex.width; i++) g.drawImage(tex, i, 0, 1, tex.height, x0 + i, y0 + Math.round(i * slope), 1, tex.height);
}

// ----------------------------------------------------------------------------- welcome sign
export const SIGN_W = 150;
export const SIGN_H = 44;

export function makeSignTexture(title, subtitle) {
  const cv = makeCanvas(SIGN_W, SIGN_H); const g = cv.getContext("2d");
  const ink = "#2b1a2a";
  g.fillStyle = ink; g.fillRect(0, 0, SIGN_W, SIGN_H);
  g.fillStyle = "#c79a5c"; g.fillRect(1, 1, SIGN_W - 2, SIGN_H - 2);
  // wood grain
  const rng = mulberry32(99);
  for (let y = 2; y < SIGN_H - 2; y++) {
    const tone = (y % 9 === 4) ? "#b2864c" : (y % 9 === 0 ? "#d8b273" : null);
    if (tone) { g.fillStyle = tone; g.fillRect(2, y, SIGN_W - 4, 1); }
  }
  for (let i = 0; i < 40; i++) { g.fillStyle = "#a9793f"; g.fillRect(2 + Math.floor(rng() * (SIGN_W - 8)), 2 + Math.floor(rng() * (SIGN_H - 4)), 2 + Math.floor(rng() * 5), 1); }
  g.fillStyle = "#e9cf97"; g.fillRect(1, 1, SIGN_W - 2, 1);
  g.fillStyle = "#8a5f33"; g.fillRect(1, SIGN_H - 2, SIGN_W - 2, 1);
  // inner frame + gold studs
  g.fillStyle = "#8a5f33"; g.fillRect(4, 4, SIGN_W - 8, 1); g.fillRect(4, SIGN_H - 5, SIGN_W - 8, 1); g.fillRect(4, 4, 1, SIGN_H - 8); g.fillRect(SIGN_W - 5, 4, 1, SIGN_H - 8);
  [[3, 3], [SIGN_W - 6, 3], [3, SIGN_H - 6], [SIGN_W - 6, SIGN_H - 6]].forEach(([x, y]) => { g.fillStyle = ink; g.fillRect(x - 1, y - 1, 5, 5); g.fillStyle = "#f6d97a"; g.fillRect(x, y, 3, 3); g.fillStyle = "#fff6c8"; g.fillRect(x, y, 1, 1); });
  // text
  const put = (col) => (x, y, s) => { g.fillStyle = col; g.fillRect(x, y, s, s); };
  const tw = textWidth(title, 2);
  const tx = Math.round((SIGN_W - tw) / 2), ty = 9;
  drawText(put("#5a2a5e"), title, tx + 1, ty + 2, 2);   // drop shadow
  drawText(put("#fff3fb"), title, tx, ty, 2);
  const maxW = SIGN_W - 24;
  const options = [subtitle, subtitle.replace(/^HABITACI[ÓO]N DE /i, "CUARTO DE "), subtitle.replace(/^(HABITACI[ÓO]N|CUARTO) DE /i, "")];
  let sub = options.find((t) => textWidth(t, 1) <= maxW) ?? options[2];
  if (textWidth(sub, 1) > maxW) sub = sub.split(" ")[0];
  let sw = textWidth(sub, 1);
  const sx = Math.round((SIGN_W - sw) / 2), sy = 28;
  drawText(put("#6b3d22"), sub, sx + 1, sy + 1, 1);
  drawText(put("#3b1f3d"), sub, sx, sy, 1);
  // tiny stars flanking the subtitle
  g.fillStyle = "#f6d97a"; [[sx - 9, sy + 3], [sx + sw + 7, sy + 3]].forEach(([x, y]) => { g.fillRect(x, y, 1, 1); g.fillRect(x - 1, y, 1, 1); g.fillRect(x + 1, y, 1, 1); g.fillRect(x, y - 1, 1, 1); g.fillRect(x, y + 1, 1, 1); });
  return cv;
}
