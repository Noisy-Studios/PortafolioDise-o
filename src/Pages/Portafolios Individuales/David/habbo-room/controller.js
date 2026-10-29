/*
 * Estado del personaje y lógica de juego (sin React): caminar por pasos interpolados,
 * sentarse al llegar a un asiento, interactuar con objetos y moverse con teclado.
 */
import { ROOM_OBJECTS } from "./art/furniture";
import { P, screenToFloor } from "./engine/iso";
import { hitSprite } from "./engine/pixel";
import { DIR_DELTA, dirFromDelta, findPath, isWalkable, seatAt } from "./navigation";

export const STEP_MS = 300;

const MOVE_KEYS = {
  arrowup: [0, -1],
  w: [0, -1],
  arrowdown: [0, 1],
  s: [0, 1],
  arrowleft: [-1, 0],
  a: [-1, 0],
  arrowright: [1, 0],
  d: [1, 0],
};
// Vector en pantalla → dirección isométrica
const SCREEN_DIR = { "0,-1": "n", "1,-1": "ne", "1,0": "e", "1,1": "se", "0,1": "s", "-1,1": "sw", "-1,0": "w", "-1,-1": "nw" };

export const isMoveKey = (key) => key in MOVE_KEYS;

export function createController(getScene) {
  const game = {
    x: 1,
    y: 6,
    from: [1, 6],
    to: [1, 6],
    moving: false,
    stepStart: 0,
    path: [],
    dir: "se",
    seat: null,
    goalSeat: null,
    onArrive: null,
  };
  const input = { keys: new Set(), hoverId: null, hoverTile: null, catLoveAt: null };
  const bridge = { say: () => {}, onStop: () => {}, stops: [] };

  function arrive() {
    const seat = game.goalSeat;
    if (seat && seat.tile[0] === game.x && seat.tile[1] === game.y) {
      game.seat = seat;
      game.dir = seat.dir;
    }
    game.goalSeat = null;
    const callback = game.onArrive;
    game.onArrive = null;
    callback?.();
  }

  function startStep(now) {
    const next = game.path.shift();
    game.from = [game.x, game.y];
    game.to = next;
    game.dir = dirFromDelta(next[0] - game.x, next[1] - game.y) ?? game.dir;
    game.stepStart = now;
    game.moving = true;
    game.seat = null;
  }

  function walkTo(target, { seat = null, onArrive = null } = {}) {
    const start = game.moving ? game.to : [game.x, game.y];
    const path = findPath(start, target);
    if (!path) return false;
    game.goalSeat = seat;
    game.onArrive = onArrive;
    game.path = path;
    if (!game.moving) {
      if (path.length === 0) arrive();
      else startStep(performance.now());
    }
    return true;
  }

  function seatOf(objectId, index = 0) {
    const object = ROOM_OBJECTS.find((item) => item.id === objectId);
    return { ...object.seats[index], objectId };
  }

  function handleObject(object, point) {
    const unreachable = () => bridge.say("Uy, no puedo llegar hasta ahí.");
    if (object.stop) {
      const stop = bridge.stops.find((item) => item.id === object.stop);
      const done = () => {
        if (!stop) return;
        bridge.onStop(stop.id);
        bridge.say(stop.bubble);
      };
      if (object.action.seatOf) {
        const seat = seatOf(object.action.seatOf, object.action.seat);
        if (!walkTo(seat.tile, { seat, onArrive: done })) unreachable();
      } else if (
        !walkTo(object.action.stand, {
          onArrive: () => {
            game.dir = object.action.face;
            done();
          },
        })
      ) {
        unreachable();
      }
      return;
    }
    if (object.seats) {
      let index = 0;
      if (point && object.seats.length > 1) {
        let best = Infinity;
        object.seats.forEach((seat, k) => {
          const [sx, sy] = P(seat.tile[0] + 0.5, seat.tile[1] + 0.5, seat.z);
          const dist = (sx - point[0]) ** 2 + (sy - point[1]) ** 2;
          if (dist < best) {
            best = dist;
            index = k;
          }
        });
      }
      const seat = seatOf(object.id, index);
      if (!walkTo(seat.tile, { seat })) unreachable();
      return;
    }
    if (object.easter === "cat") {
      walkTo(object.action.stand, {
        onArrive: () => {
          game.dir = object.action.face;
          input.catLoveAt = performance.now();
          bridge.say("Bit ronronea: es el QA oficial del estudio.");
        },
      });
    }
  }

  function clickTile([tx, ty]) {
    const seat = seatAt(tx, ty);
    walkTo([tx, ty], { seat });
  }

  // Tecla E / Enter: usar lo que tiene enfrente, o levantarse si está sentado.
  function interact() {
    if (game.moving) return;
    if (game.seat) {
      game.seat = null;
      return;
    }
    const [dx, dy] = DIR_DELTA[game.dir];
    const tx = game.x + dx;
    const ty = game.y + dy;
    const object = ROOM_OBJECTS.find((item) => item.tiles.some(([x, y]) => x === tx && y === ty));
    if (!object) return;
    if (object.stop || object.easter) handleObject(object);
    else if (object.seats) clickTile([tx, ty]);
  }

  function keyboardStep() {
    let sx = 0;
    let sy = 0;
    input.keys.forEach((key) => {
      sx += MOVE_KEYS[key][0];
      sy += MOVE_KEYS[key][1];
    });
    sx = Math.sign(sx);
    sy = Math.sign(sy);
    if (!sx && !sy) return;
    const dir = SCREEN_DIR[`${sx},${sy}`];
    const [dx, dy] = DIR_DELTA[dir];
    const tx = game.x + dx;
    const ty = game.y + dy;
    const seat = seatAt(tx, ty);
    const diagonalOk = !(dx && dy) || (isWalkable(game.x + dx, game.y) && isWalkable(game.x, game.y + dy));
    if (diagonalOk && (isWalkable(tx, ty) || seat)) {
      walkTo([tx, ty], { seat });
    } else {
      game.seat = null;
      game.dir = dir;
    }
  }

  function update(now) {
    while (game.moving && now - game.stepStart >= STEP_MS) {
      game.x = game.to[0];
      game.y = game.to[1];
      if (game.path.length) startStep(Math.max(game.stepStart + STEP_MS, now - STEP_MS));
      else {
        game.moving = false;
        arrive();
      }
    }
    if (!game.moving && input.keys.size) keyboardStep();
  }

  function view(now, ambient) {
    const progress = game.moving ? Math.min(1, (now - game.stepStart) / STEP_MS) : 0;
    const fx = game.moving ? game.from[0] + (game.to[0] - game.from[0]) * progress : game.x;
    const fy = game.moving ? game.from[1] + (game.to[1] - game.from[1]) * progress : game.y;
    const [x, y] = P(fx + 0.5, fy + 0.5, game.seat ? game.seat.z : 0);
    const depthTile = game.moving ? (progress < 0.5 ? game.from : game.to) : [game.x, game.y];
    const pose = game.seat ? "sit" : game.moving ? "walk" : "stand";
    return {
      avatar: {
        x: Math.round(x),
        y: Math.round(y),
        depth: depthTile[0] + depthTile[1] + 0.5,
        dir: game.dir,
        pose,
        frame: game.moving ? (Math.floor((now - game.stepStart) / (STEP_MS / 2)) % 2) + 1 : 0,
        seatObjectId: game.seat?.objectId ?? null,
      },
      hoverId: input.hoverId,
      hoverTile: input.hoverTile,
      catLoveAge: input.catLoveAt === null ? null : (now - input.catLoveAt) / 1000,
      ambient,
    };
  }

  function pick(x, y) {
    const scene = getScene();
    for (let i = scene.objects.length - 1; i >= 0; i -= 1) {
      const object = scene.objects[i];
      if (hitSprite(object.sprites.front, x, y) || hitSprite(object.sprites.base, x, y)) {
        return object.interactive ? { object } : { decor: object };
      }
    }
    const [u, v] = screenToFloor(x, y);
    const tx = Math.floor(u);
    const ty = Math.floor(v);
    if (isWalkable(tx, ty) || seatAt(tx, ty)) return { tile: [tx, ty] };
    return null;
  }

  return { game, input, bridge, walkTo, handleObject, clickTile, interact, update, view, pick };
}
