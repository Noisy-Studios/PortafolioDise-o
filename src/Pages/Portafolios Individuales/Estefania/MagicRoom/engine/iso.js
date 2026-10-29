// Isometric helpers. Grid cells are 32x16 px diamonds (a 2:1 projection, the same
// ratio as the oak floor tiles: one 130x65 tile = a 4x4 block of cells).
export const CW = 32;
export const CH = 16;
export const COLS = 12;
export const ROWS = 12;

// grid coords (fractional allowed, cell centre = c + .5) -> screen offset from the grid origin
export const gridToScreen = (gx, gy) => ({ x: ((gx - gy) * CW) / 2, y: ((gx + gy) * CH) / 2 });
export const screenToGrid = (x, y) => ({
  gx: (x / (CW / 2) + y / (CH / 2)) / 2,
  gy: (y / (CH / 2) - x / (CW / 2)) / 2,
});

// The eight directions in the order of the sprite sheet rows.
export const DIRS = ["S", "SE", "E", "NE", "N", "NW", "W", "SW"];
// Grid-step (dc, dr) -> direction name. +c walks to the lower-right on screen, +r to the lower-left.
export const STEP_DIR = {
  "1,1": "S", "1,0": "SE", "1,-1": "E", "0,-1": "NE",
  "-1,-1": "N", "-1,0": "NW", "-1,1": "W", "0,1": "SW",
};
const SECTORS = ["SE", "S", "SW", "W", "NW", "N", "NE", "E"]; // each 45deg in grid space, starting at +c

export function dirFromVector(dgx, dgy) {
  const a = Math.atan2(dgy, dgx); // grid-space angle
  const idx = ((Math.round(a / (Math.PI / 4)) % 8) + 8) % 8;
  return SECTORS[idx];
}
export const dirRow = (name) => DIRS.indexOf(name);
