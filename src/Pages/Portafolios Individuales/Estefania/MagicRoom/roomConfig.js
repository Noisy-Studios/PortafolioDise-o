// -----------------------------------------------------------------------------
// Sprites + layout of the magical room.
// All PNGs come from the provided asset pack (oak floor, lanterns, cauldron, torii,
// koi pond, fox statues, mushroom, iris, mint, flasks, bridge) except `witch.png`
// (8-direction avatar) and `cushion.png`, which were drawn to match that pack.
// -----------------------------------------------------------------------------
import oakFloor from "./assets/oak_floor.png";
import witch from "./assets/witch.png";
import cushion from "./assets/cushion.png";
import cushionShadow from "./assets/cushion_shadow.png";
import kasugaOff from "./assets/kasuga_off.png";
import kasugaOn from "./assets/kasuga_on.png";
import kasugaShadow from "./assets/kasuga_shadow.png";
import paperOff from "./assets/paper_lantern_off.png";
import paperOn from "./assets/paper_lantern_on.png";
import paperShadow from "./assets/paper_lantern_shadow.png";
import cauldronIdle from "./assets/cauldron_idle.png";
import cauldron0 from "./assets/cauldron_brew_0.png";
import cauldron1 from "./assets/cauldron_brew_1.png";
import cauldron2 from "./assets/cauldron_brew_2.png";
import cauldron3 from "./assets/cauldron_brew_3.png";
import cauldronShadow from "./assets/cauldron_shadow.png";
import flaskEmpty from "./assets/flask_empty.png";
import flaskTonic from "./assets/flask_tonic.png";
import foxes from "./assets/fox_statues.png";
import foxesShadow from "./assets/fox_statues_shadow.png";
import koi from "./assets/koi_pond.png";
import koiShadow from "./assets/koi_pond_shadow.png";
import mint from "./assets/potted_mint.png";
import mintShadow from "./assets/potted_mint_shadow.png";
import toriiDay from "./assets/torii_day.png";
import toriiNight from "./assets/torii_night.png";
import toriiShadow from "./assets/torii_shadow.png";
import toriiDayF from "./assets/torii_day_flip.png";
import toriiNightF from "./assets/torii_night_flip.png";
import toriiShadowF from "./assets/torii_shadow_flip.png";
import bridge from "./assets/arched_bridge.png";
import bridgeShadow from "./assets/arched_bridge_shadow.png";
import irisWind from "./assets/iris_wind.png";
import irisShadow from "./assets/iris_shadow.png";
import mushSpring from "./assets/mushroom_spring.png";
import mushSummer from "./assets/mushroom_summer.png";
import mushAutumn from "./assets/mushroom_autumn.png";
import mushWinter from "./assets/mushroom_winter.png";
import mushShadow from "./assets/mushroom_shadow.png";

// Vite/CRA give a string, Next gives { src }.
const url = (m) => (m && typeof m === "object" ? m.src ?? m.default : m);

/**
 * key -> { src, ax?, ay?, frames? }
 * ax/ay = pixel of the image that sits on the centre of the object's footprint.
 * When omitted: ax = middle of the opaque area, ay = bottom of the opaque area - 4.
 */
export const SPRITES = {
  floor: { src: url(oakFloor) },
  witch: { src: url(witch), ax: 24, ay: 58, frames: { w: 48, h: 64, n: 8 }, fullMask: true },
  cushion: { src: url(cushion), ax: 18, ay: 14 },
  cushionShadow: { src: url(cushionShadow), ax: 18, ay: 14 },
  kasugaOff: { src: url(kasugaOff) },
  kasugaOn: { src: url(kasugaOn) },
  kasugaShadow: { src: url(kasugaShadow) },
  paperOff: { src: url(paperOff) },
  paperOn: { src: url(paperOn) },
  paperShadow: { src: url(paperShadow) },
  cauldronIdle: { src: url(cauldronIdle) },
  cauldron0: { src: url(cauldron0) },
  cauldron1: { src: url(cauldron1) },
  cauldron2: { src: url(cauldron2) },
  cauldron3: { src: url(cauldron3) },
  cauldronShadow: { src: url(cauldronShadow) },
  flaskEmpty: { src: url(flaskEmpty) },
  flaskTonic: { src: url(flaskTonic) },
  foxes: { src: url(foxes) },
  foxesShadow: { src: url(foxesShadow) },
  koi: { src: url(koi) },
  koiShadow: { src: url(koiShadow) },
  mint: { src: url(mint) },
  mintShadow: { src: url(mintShadow) },
  toriiDay: { src: url(toriiDay) },
  toriiNight: { src: url(toriiNight) },
  toriiShadow: { src: url(toriiShadow) },
  toriiDayF: { src: url(toriiDayF) },
  toriiNightF: { src: url(toriiNightF) },
  toriiShadowF: { src: url(toriiShadowF) },
  bridge: { src: url(bridge) },
  bridgeShadow: { src: url(bridgeShadow) },
  irisWind: { src: url(irisWind), frames: { w: 50, h: 48, n: 8 } },
  irisShadow: { src: url(irisShadow) },
  mushSpring: { src: url(mushSpring) },
  mushSummer: { src: url(mushSummer) },
  mushAutumn: { src: url(mushAutumn) },
  mushWinter: { src: url(mushWinter) },
  mushShadow: { src: url(mushShadow) },
};

/**
 * Layout. Grid is 12x12 cells (3x3 oak tiles). c grows to the lower-right of the screen,
 * r to the lower-left; (0,0) is the back corner where the two translucent walls meet.
 * cell: [c, r] of the top-left cell of the footprint, size: [w, h] in cells.
 * block: optional list of [dc, dr] cells (relative to `cell`) that actually block walking.
 */
export const OBJECTS = [
  { id: "pond", kind: "pond", cell: [8, 2], size: [2, 2] },
  { id: "cauldron", kind: "cauldron", cell: [1, 3], size: [2, 2] },
  { id: "flask", kind: "flask", cell: [4, 5], size: [1, 1] },
  // the gate is mirrored so its two pillars run along the left wall; the opening faces the moon window
  { id: "torii", kind: "torii", cell: [1, 5], size: [1, 4], block: [[0, 0], [0, 3]] },
  { id: "foxes", kind: "foxes", cell: [5, 4], size: [3, 1], block: [[0, 0], [2, 0]] },
  { id: "mushroom", kind: "mushroom", cell: [4, 11], size: [1, 1] },
  { id: "lampA", kind: "kasuga", cell: [4, 9], size: [1, 1], on: true },
  { id: "lampB", kind: "kasuga", cell: [6, 1], size: [1, 1], on: false },
  { id: "lampC", kind: "kasuga", cell: [10, 9], size: [1, 1], on: true },
  { id: "lanternA", kind: "paper", cell: [3, 6], size: [1, 1], on: false },
  { id: "lanternB", kind: "paper", cell: [10, 7], size: [1, 1], on: true },
  { id: "lanternC", kind: "paper", cell: [8, 10], size: [1, 1], on: false },
  { id: "mint", kind: "mint", cell: [9, 10], size: [1, 1] },
  { id: "irisA", kind: "iris", cell: [2, 11], size: [1, 1] },
  { id: "irisB", kind: "iris", cell: [3, 0], size: [1, 1] },
  { id: "irisC", kind: "iris", cell: [11, 6], size: [1, 1] },
  { id: "seatA", kind: "cushion", cell: [6, 6], size: [1, 1], face: "SE" },
  { id: "seatB", kind: "cushion", cell: [8, 5], size: [1, 1], face: "NE" },
];

export const SPAWN = [6, 10];
