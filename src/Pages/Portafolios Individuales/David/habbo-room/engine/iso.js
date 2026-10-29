/* Proyección isométrica 2:1 (baldosas de 48×24) y ayudas para dibujar cajas y caras en píxeles. */
import { rgb, shade } from "./pixel";

export const COLS = 10; // eje u: hacia abajo-derecha
export const ROWS = 8; // eje v: hacia abajo-izquierda
export const WALL_H = 120;
export const OX = 204;
export const OY = 140;
export const CANVAS_W = 456;
export const CANVAS_H = 368;

export const P = (u, v, z = 0) => [OX + (u - v) * 24, OY + (u + v) * 12 - z];

export function screenToFloor(x, y) {
  const dx = x - OX;
  const dy = y - OY;
  return [(dx / 24 + dy / 12) / 2, (dy / 12 - dx / 24) / 2];
}

export function pal(color, { top = 0.16, right = -0.24 } = {}) {
  const base = typeof color === "number" ? color : rgb(color);
  return {
    left: base,
    top: shade(base, top),
    right: shade(base, right),
    hl: shade(base, top + 0.26),
    edge: shade(base, 0.1),
    dark: shade(base, -0.5),
  };
}

export function painter(buf) {
  const api = {
    buf,
    at: P,
    poly(points3, fill) {
      buf.poly(points3.map(([u, v, z]) => P(u, v, z)), fill);
    },
    faceV(v, u1, u2, z1, z2, fill) {
      api.poly([[u1, v, z1], [u2, v, z1], [u2, v, z2], [u1, v, z2]], fill);
    },
    faceU(u, v1, v2, z1, z2, fill) {
      api.poly([[u, v1, z1], [u, v2, z1], [u, v2, z2], [u, v1, z2]], fill);
    },
    top(z, u1, v1, u2, v2, fill) {
      api.poly([[u1, v1, z], [u2, v1, z], [u2, v2, z], [u1, v2, z]], fill);
    },
    line(a, b, fill) {
      const [x0, y0] = P(...a);
      const [x1, y1] = P(...b);
      buf.line(x0, y0, x1, y1, fill);
    },
    px(u, v, z, c) {
      const [x, y] = P(u, v, z);
      buf.set(Math.round(x), Math.round(y), c);
    },
    box(u, v, du, dv, z, h, p, { bevel = true } = {}) {
      const u1 = u + du;
      const v1 = v + dv;
      const z1 = z + h;
      api.faceV(v1, u, u1, z, z1, p.left);
      api.faceU(u1, v, v1, z, z1, p.right);
      api.top(z1, u, v, u1, v1, p.top);
      if (bevel && h >= 3 && du * 24 >= 3 && dv * 24 >= 3) {
        api.line([u, v1, z1], [u1, v1, z1], p.hl);
        api.line([u1, v, z1], [u1, v1, z1], p.hl);
        api.line([u1, v1, z], [u1, v1, z1], p.edge);
      }
    },
    // Mapa de bits sobre el plano v = const (pared derecha / caras frontales izquierdas).
    // i crece hacia la derecha en pantalla, j crece hacia abajo.
    mapV(v, u0, z0, h, i, j) {
      const [bx, by] = P(u0, v, z0);
      return [Math.round(bx + i), Math.round(by + i / 2 - (h - 1 - j))];
    },
    bitmapV(v, u0, z0, w, h, fn) {
      for (let j = 0; j < h; j += 1) {
        for (let i = 0; i < w; i += 1) {
          const c = fn(i, j);
          if (!c) continue;
          const [x, y] = api.mapV(v, u0, z0, h, i, j);
          buf.set(x, y, c);
        }
      }
    },
    // Mapa de bits sobre el plano u = const (pared izquierda / caras frontales derechas).
    // i = 0 corresponde a v1 (el borde izquierdo en pantalla).
    mapU(u, v1, z0, h, i, j) {
      const [bx, by] = P(u, v1, z0);
      return [Math.round(bx + i), Math.round(by - i / 2 - (h - 1 - j))];
    },
    bitmapU(u, v1, z0, w, h, fn) {
      for (let j = 0; j < h; j += 1) {
        for (let i = 0; i < w; i += 1) {
          const c = fn(i, j);
          if (!c) continue;
          const [x, y] = api.mapU(u, v1, z0, h, i, j);
          buf.set(x, y, c);
        }
      }
    },
  };
  return api;
}
