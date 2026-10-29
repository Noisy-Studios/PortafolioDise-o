import { CW, CH } from "./iso";

const NEIGHBOURS = [
  [1, 0], [-1, 0], [0, 1], [0, -1],
  [1, 1], [-1, -1], [1, -1], [-1, 1],
];

// distance on screen of one grid step: this is what the eye perceives as "length".
const stepCost = (dc, dr) => Math.hypot(((dc - dr) * CW) / 2, ((dc + dr) * CH) / 2);

export function nearestFree(cols, rows, blocked, c, r) {
  if (c >= 0 && r >= 0 && c < cols && r < rows && !blocked[r * cols + c]) return [c, r];
  let best = null, bd = Infinity;
  for (let rr = 0; rr < rows; rr++) {
    for (let cc = 0; cc < cols; cc++) {
      if (blocked[rr * cols + cc]) continue;
      const d = (cc - c) ** 2 + (rr - r) ** 2;
      if (d < bd) { bd = d; best = [cc, rr]; }
    }
  }
  return best;
}

/** A* over the cell grid with 8 directions and no corner cutting. Returns [[c,r], ...] including start. */
export function findPath(cols, rows, blocked, start, goal) {
  const [sc, sr] = start, [gc, gr] = goal;
  const idx = (c, r) => r * cols + c;
  if (gc < 0 || gr < 0 || gc >= cols || gr >= rows || blocked[idx(gc, gr)]) return null;
  if (sc === gc && sr === gr) return [[sc, sr]];
  const g = new Float32Array(cols * rows).fill(Infinity);
  const prev = new Int32Array(cols * rows).fill(-1);
  const closed = new Uint8Array(cols * rows);
  const open = [idx(sc, sr)];
  g[idx(sc, sr)] = 0;
  const h = (c, r) => stepCost(gc - c, gr - r); // straight-line screen distance: never over-estimates
  const f = new Float32Array(cols * rows).fill(Infinity);
  f[idx(sc, sr)] = h(sc, sr);
  while (open.length) {
    let bi = 0;
    for (let i = 1; i < open.length; i++) if (f[open[i]] < f[open[bi]]) bi = i;
    const cur = open.splice(bi, 1)[0];
    if (closed[cur]) continue;
    closed[cur] = 1;
    const cc = cur % cols, cr = (cur / cols) | 0;
    if (cc === gc && cr === gr) {
      const out = [];
      for (let n = cur; n !== -1; n = prev[n]) out.push([n % cols, (n / cols) | 0]);
      return out.reverse();
    }
    for (const [dc, dr] of NEIGHBOURS) {
      const nc = cc + dc, nr = cr + dr;
      if (nc < 0 || nr < 0 || nc >= cols || nr >= rows) continue;
      const ni = idx(nc, nr);
      if (blocked[ni] || closed[ni]) continue;
      if (dc !== 0 && dr !== 0 && (blocked[idx(cc + dc, cr)] || blocked[idx(cc, cr + dr)])) continue;
      const ng = g[cur] + stepCost(dc, dr);
      if (ng < g[ni]) { g[ni] = ng; prev[ni] = cur; f[ni] = ng + h(nc, nr); open.push(ni); }
    }
  }
  return null;
}

export const pathLength = (path) => {
  let d = 0;
  for (let i = 1; i < path.length; i++) d += stepCost(path[i][0] - path[i - 1][0], path[i][1] - path[i - 1][1]);
  return d;
};
