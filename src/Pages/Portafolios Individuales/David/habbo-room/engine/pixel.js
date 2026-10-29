/* Utilidades de pixel art: colores, buffers, sprites con contorno y luz con tramado. */

export const BAYER4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);
export const ERASE = -1;

export function rgb(hex, alpha = 255) {
  const n = parseInt(hex.slice(1), 16);
  return ((alpha << 24) | ((n & 255) << 16) | (n & 0xff00) | ((n >> 16) & 255)) >>> 0;
}

const clamp = (v) => (v < 0 ? 0 : v > 255 ? 255 : Math.round(v));
export const chR = (c) => c & 255;
export const chG = (c) => (c >>> 8) & 255;
export const chB = (c) => (c >>> 16) & 255;
export const chA = (c) => c >>> 24;

export function pack(r, g, b, a = 255) {
  return ((clamp(a) << 24) | (clamp(b) << 16) | (clamp(g) << 8) | clamp(r)) >>> 0;
}

export function mix(c1, c2, t) {
  return pack(
    chR(c1) + (chR(c2) - chR(c1)) * t,
    chG(c1) + (chG(c2) - chG(c1)) * t,
    chB(c1) + (chB(c2) - chB(c1)) * t,
    chA(c1),
  );
}

// Sombras hacia violeta oscuro y luces hacia crema: el "hue shift" típico del pixel art.
const SHADE_DARK = rgb("#1b0f30");
const SHADE_LIGHT = rgb("#fff4dc");
export function shade(c, amt) {
  const color = typeof c === "string" ? rgb(c) : c;
  return amt >= 0 ? mix(color, SHADE_LIGHT, amt) : mix(color, SHADE_DARK, -amt);
}

export function hash(x, y, seed = 0) {
  let h = (Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263) + Math.imul(seed | 0, 1442695041)) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

export class Buf {
  constructor(w, h, data) {
    this.w = w;
    this.h = h;
    this.d = data ?? new Uint32Array(w * h);
  }

  clear() {
    this.d.fill(0);
  }

  get(x, y) {
    x = Math.floor(x);
    y = Math.floor(y);
    if (x < 0 || y < 0 || x >= this.w || y >= this.h) return 0;
    return this.d[y * this.w + x];
  }

  set(x, y, c) {
    if (!c) return;
    x = Math.floor(x);
    y = Math.floor(y);
    if (x < 0 || y < 0 || x >= this.w || y >= this.h) return;
    const i = y * this.w + x;
    if (c === ERASE) {
      this.d[i] = 0;
      return;
    }
    const a = c >>> 24;
    if (a === 255 || !this.d[i]) this.d[i] = c;
    else this.d[i] = mix(this.d[i], c | 0xff000000, a / 255);
  }

  paint(x, y, fill) {
    this.set(x, y, typeof fill === "function" ? fill(x, y) : fill);
  }

  rect(x, y, w, h, fill) {
    for (let j = 0; j < h; j += 1) for (let i = 0; i < w; i += 1) this.paint(x + i, y + j, fill);
  }

  line(x0, y0, x1, y1, fill) {
    x0 = Math.round(x0);
    y0 = Math.round(y0);
    x1 = Math.round(x1);
    y1 = Math.round(y1);
    const dx = Math.abs(x1 - x0);
    const sx = x0 < x1 ? 1 : -1;
    const dy = -Math.abs(y1 - y0);
    const sy = y0 < y1 ? 1 : -1;
    let err = dx + dy;
    for (;;) {
      this.paint(x0, y0, fill);
      if (x0 === x1 && y0 === y1) break;
      const e2 = 2 * err;
      if (e2 >= dy) {
        err += dy;
        x0 += sx;
      }
      if (e2 <= dx) {
        err += dx;
        y0 += sy;
      }
    }
  }

  // Relleno por scanline con regla de centro de píxel (sin antialias).
  poly(points, fill) {
    let minY = Infinity;
    let maxY = -Infinity;
    for (const [, y] of points) {
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    }
    const y0 = Math.max(0, Math.ceil(minY - 0.5));
    const y1 = Math.min(this.h - 1, Math.floor(maxY - 0.5));
    const xs = [];
    for (let y = y0; y <= y1; y += 1) {
      const sy = y + 0.5;
      xs.length = 0;
      for (let i = 0; i < points.length; i += 1) {
        const [ax, ay] = points[i];
        const [bx, by] = points[(i + 1) % points.length];
        if ((ay <= sy && by > sy) || (by <= sy && ay > sy)) xs.push(ax + ((sy - ay) / (by - ay)) * (bx - ax));
      }
      xs.sort((a, b) => a - b);
      for (let k = 0; k + 1 < xs.length; k += 2) {
        const xa = Math.ceil(xs[k] - 0.5);
        const xb = Math.floor(xs[k + 1] - 0.5);
        for (let x = xa; x <= xb; x += 1) this.paint(x, y, fill);
      }
    }
  }

  ellipse(cx, cy, rx, ry, fill) {
    for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y += 1) {
      for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x += 1) {
        const dx = (x + 0.5 - cx) / rx;
        const dy = (y + 0.5 - cy) / ry;
        if (dx * dx + dy * dy <= 1) this.set(x, y, typeof fill === "function" ? fill(x, y, dx, dy) : fill);
      }
    }
  }

  ellipseRot(cx, cy, rx, ry, angle, fill) {
    const r = Math.max(rx, ry);
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    for (let y = Math.floor(cy - r); y <= Math.ceil(cy + r); y += 1) {
      for (let x = Math.floor(cx - r); x <= Math.ceil(cx + r); x += 1) {
        const dx = x + 0.5 - cx;
        const dy = y + 0.5 - cy;
        const lx = (dx * cos + dy * sin) / rx;
        const ly = (-dx * sin + dy * cos) / ry;
        if (lx * lx + ly * ly <= 1) this.set(x, y, typeof fill === "function" ? fill(x, y, lx, ly) : fill);
      }
    }
  }
}

export function addOutline(data, w, h, color) {
  const src = data.slice();
  for (let y = 0; y < h; y += 1) {
    for (let x = 0; x < w; x += 1) {
      if (src[y * w + x]) continue;
      if (
        (x > 0 && src[y * w + x - 1]) ||
        (x < w - 1 && src[y * w + x + 1]) ||
        (y > 0 && src[(y - 1) * w + x]) ||
        (y < h - 1 && src[(y + 1) * w + x])
      ) {
        data[y * w + x] = color;
      }
    }
  }
}

// Recorta el contenido de un buffer a un sprite y le añade contorno de 1 px.
export function extractSprite(buf, outline = 0) {
  const { w, h, d } = buf;
  let x0 = w;
  let y0 = h;
  let x1 = -1;
  let y1 = -1;
  for (let y = 0; y < h; y += 1) {
    for (let x = 0; x < w; x += 1) {
      if (!d[y * w + x]) continue;
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;
    }
  }
  if (x1 < 0) return null;
  const pad = outline ? 1 : 0;
  const sw = x1 - x0 + 1 + pad * 2;
  const sh = y1 - y0 + 1 + pad * 2;
  const data = new Uint32Array(sw * sh);
  for (let y = y0; y <= y1; y += 1) {
    for (let x = x0; x <= x1; x += 1) data[(y - y0 + pad) * sw + (x - x0 + pad)] = d[y * w + x];
  }
  if (outline) addOutline(data, sw, sh, outline);
  return { x: x0 - pad, y: y0 - pad, w: sw, h: sh, data };
}

// Anillo de selección alrededor de un sprite (para el hover, estilo Habbo).
export function ringSprite(sprite, color) {
  const w = sprite.w + 2;
  const h = sprite.h + 2;
  const data = new Uint32Array(w * h);
  const at = (x, y) => (x < 0 || y < 0 || x >= sprite.w || y >= sprite.h ? 0 : sprite.data[y * sprite.w + x]);
  for (let y = 0; y < h; y += 1) {
    for (let x = 0; x < w; x += 1) {
      const sx = x - 1;
      const sy = y - 1;
      if (at(sx, sy)) continue;
      if (at(sx - 1, sy) || at(sx + 1, sy) || at(sx, sy - 1) || at(sx, sy + 1)) data[y * w + x] = color;
    }
  }
  return { x: sprite.x - 1, y: sprite.y - 1, w, h, data };
}

export function hitSprite(sprite, x, y) {
  if (!sprite) return false;
  const ix = Math.floor(x) - sprite.x;
  const iy = Math.floor(y) - sprite.y;
  if (ix < 0 || iy < 0 || ix >= sprite.w || iy >= sprite.h) return false;
  return sprite.data[iy * sprite.w + ix] !== 0;
}

export function blit(dst, sprite, ox = sprite.x, oy = sprite.y, flip = false) {
  const { w, h, data } = sprite;
  for (let j = 0; j < h; j += 1) {
    const y = oy + j;
    if (y < 0 || y >= dst.h) continue;
    for (let i = 0; i < w; i += 1) {
      const x = ox + i;
      if (x < 0 || x >= dst.w) continue;
      const c = data[j * w + (flip ? w - 1 - i : i)];
      if (!c) continue;
      const k = y * dst.w + x;
      if (c >>> 24 === 255) dst.d[k] = c;
      else dst.d[k] = mix(dst.d[k], c | 0xff000000, (c >>> 24) / 255);
    }
  }
}

// Luz aditiva cuantizada con matriz de Bayer: halos "pixelados" en vez de degradados suaves.
export function applyLights(data, w, h, lights, offX = 0, offY = 0, skip = 0) {
  for (let y = 0; y < h; y += 1) {
    for (let x = 0; x < w; x += 1) {
      const i = y * w + x;
      const c = data[i];
      if (!c || c === skip) continue;
      const ax = x + offX;
      const ay = y + offY;
      const th = BAYER4[((ay & 3) << 2) + (ax & 3)];
      let r = chR(c);
      let g = chG(c);
      let b = chB(c);
      let lit = false;
      for (const light of lights) {
        const dx = (ax - light.x) / light.rx;
        const dy = (ay - light.y) / light.ry;
        const dd = dx * dx + dy * dy;
        if (dd >= 1) continue;
        const q = Math.floor((1 - Math.sqrt(dd)) * light.s * 4 + th) / 4;
        if (q <= 0) continue;
        r += light.c[0] * q;
        g += light.c[1] * q;
        b += light.c[2] * q;
        lit = true;
      }
      if (lit) data[i] = pack(r, g, b, chA(c));
    }
  }
}

// Mini fuente 3x5 para letreros de neón y marquesinas.
export const FONT_3X5 = {
  P: ["XXX", "X.X", "XXX", "X..", "X.."],
  L: ["X..", "X..", "X..", "X..", "XXX"],
  A: [".X.", "X.X", "XXX", "X.X", "X.X"],
  Y: ["X.X", "X.X", ".X.", ".X.", ".X."],
  G: ["XXX", "X..", "X.X", "X.X", "XXX"],
  8: ["XXX", "X.X", "XXX", "X.X", "XXX"],
  B: ["XX.", "X.X", "XX.", "X.X", "XX."],
  I: ["XXX", ".X.", ".X.", ".X.", "XXX"],
  T: ["XXX", ".X.", ".X.", ".X.", ".X."],
  ">": ["X..", "XX.", "XXX", "XX.", "X.."],
  " ": ["...", "...", "...", "...", "..."],
};

// Devuelve una matriz booleana con el texto escalado.
export function textMask(text, scale = 1) {
  const glyphs = [...text].map((ch) => FONT_3X5[ch] ?? FONT_3X5[" "]);
  const w = (glyphs.length * 4 - 1) * scale;
  const h = 5 * scale;
  const mask = Array.from({ length: h }, () => new Array(w).fill(false));
  glyphs.forEach((glyph, k) => {
    glyph.forEach((row, gy) => {
      [...row].forEach((cell, gx) => {
        if (cell !== "X") return;
        for (let sy = 0; sy < scale; sy += 1) {
          for (let sx = 0; sx < scale; sx += 1) mask[gy * scale + sy][(k * 4 + gx) * scale + sx] = true;
        }
      });
    });
  });
  return { w, h, mask };
}
