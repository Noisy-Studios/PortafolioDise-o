/* Caminabilidad, asientos y búsqueda de caminos (A* en 8 direcciones, como en Habbo). */
import { ROOM_OBJECTS } from "./art/furniture";
import { COLS, ROWS } from "./engine/iso";

const key = (x, y) => `${x},${y}`;

export const SEAT_AT = new Map();
const BLOCKED = new Set();
for (const object of ROOM_OBJECTS) {
  object.seats?.forEach((seat) => SEAT_AT.set(key(...seat.tile), { ...seat, objectId: object.id }));
}
for (const object of ROOM_OBJECTS) {
  object.tiles.forEach(([x, y]) => {
    if (!SEAT_AT.has(key(x, y))) BLOCKED.add(key(x, y));
  });
}

/** Los asientos solo se pisan si son el destino final (al llegar, el personaje se sienta). */
export function isWalkable(x, y, asGoal = false) {
  if (x < 0 || y < 0 || x >= COLS || y >= ROWS) return false;
  if (SEAT_AT.has(key(x, y))) return asGoal;
  return !BLOCKED.has(key(x, y));
}

export function seatAt(x, y) {
  return SEAT_AT.get(key(x, y)) ?? null;
}

export const DIR_DELTA = {
  se: [1, 0],
  nw: [-1, 0],
  sw: [0, 1],
  ne: [0, -1],
  s: [1, 1],
  n: [-1, -1],
  e: [1, -1],
  w: [-1, 1],
};

export function dirFromDelta(dx, dy) {
  const sx = Math.sign(dx);
  const sy = Math.sign(dy);
  return Object.keys(DIR_DELTA).find((dir) => DIR_DELTA[dir][0] === sx && DIR_DELTA[dir][1] === sy) ?? null;
}

const STEPS = Object.values(DIR_DELTA);
const octile = (ax, ay, bx, by) => {
  const dx = Math.abs(ax - bx);
  const dy = Math.abs(ay - by);
  return Math.max(dx, dy) + 0.42 * Math.min(dx, dy);
};

export function findPath(from, to) {
  const [tx, ty] = to;
  if (!isWalkable(tx, ty, true)) return null;
  const start = key(...from);
  const goal = key(tx, ty);
  if (start === goal) return [];

  const open = [{ x: from[0], y: from[1], g: 0, f: octile(from[0], from[1], tx, ty) }];
  const best = new Map([[start, 0]]);
  const came = new Map();
  while (open.length) {
    let bi = 0;
    for (let i = 1; i < open.length; i += 1) if (open[i].f < open[bi].f) bi = i;
    const current = open.splice(bi, 1)[0];
    const ck = key(current.x, current.y);
    if (ck === goal) break;
    for (const [dx, dy] of STEPS) {
      const nx = current.x + dx;
      const ny = current.y + dy;
      const isGoal = nx === tx && ny === ty;
      if (!isWalkable(nx, ny, isGoal)) continue;
      // Sin cortar esquinas en diagonal
      if (dx && dy && (!isWalkable(current.x + dx, current.y) || !isWalkable(current.x, current.y + dy))) continue;
      const g = current.g + (dx && dy ? 1.42 : 1);
      const nk = key(nx, ny);
      if (g < (best.get(nk) ?? Infinity)) {
        best.set(nk, g);
        came.set(nk, ck);
        open.push({ x: nx, y: ny, g, f: g + octile(nx, ny, tx, ty) });
      }
    }
  }
  if (!came.has(goal)) return null;
  const path = [];
  let k = goal;
  while (k !== start) {
    const [x, y] = k.split(",").map(Number);
    path.unshift([x, y]);
    k = came.get(k);
  }
  return path;
}
