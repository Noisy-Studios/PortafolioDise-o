import { COLS, ROWS, gridToScreen, screenToGrid, STEP_DIR, dirFromVector, dirRow } from "./iso";
import { findPath, nearestFree, pathLength } from "./pathfinding";
import { drawText, textWidth } from "./pixelFont";
import {
  LW, LH, OX, OY, makeCanvas, makeSkyAssets, drawSky, makeIsland, makeFloor, makeWalls,
  makeRunes, drawRunes, makeMoonWindow, shearBlit, makeSignTexture, SIGN_W, SIGN_H, wallPoint, pixelLine, mulberry32,
} from "./scenery";

const WITCH = { w: 48, h: 64, idle: 0, blink: 1, walk: 2, sit: 6, sitBlink: 7 };
const SIGN_S = 21;     // distance along the right wall where the sign starts
const SIGN_LIFT = 38;  // height of the bottom of the sign above the floor

const COLORS = {
  gold: ["#fff3b0", "#ffd56a", "#ffb347"],
  pink: ["#ffd0ee", "#ff9ad8", "#ff6fc2"],
  cyan: ["#d8fbff", "#7ff3ff", "#38c8e8"],
  violet: ["#e5d2ff", "#c9a6ff", "#9a6be0"],
  green: ["#d8ffd0", "#9af08a", "#58c860"],
  warm: ["#fff3b0", "#ffe08a", "#ffc25a"],
};

export class RoomEngine {
  constructor(canvas, { images, sprites, objects, spawn, title, subtitle, reducedMotion = false, debug = false }) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.images = images;
    this.sprites = sprites;           // key -> meta (w,h,ax,ay,bbox,mask)
    this.reduced = reducedMotion;
    this.debug = debug;
    this.k = 1;
    this.time = 0;
    this.night = true;
    this.nightT = 1;
    this.hover = null;
    this.hoverCell = null;
    this.pointer = { x: -1, y: -1, inside: false, touch: false };
    this.particles = [];
    this.bubble = null;
    this.season = 0;
    this.signPulse = 0;
    this.circleGlow = 0;
    this.rafId = 0;
    this.running = false;
    this.last = 0;

    // static layers
    this.sky = makeSkyAssets();
    this.island = makeIsland();
    this.floor = makeFloor(images.floor);
    this.walls = makeWalls();
    this.runes = makeRunes();
    this.moonWindow = makeMoonWindow();
    this.sign = makeSignTexture(title, subtitle);
    this.dark = makeCanvas(LW, LH);
    this.rng = mulberry32(1234);

    // objects
    this.objects = objects.map((o, i) => ({
      ...o, idx: i,
      gx: o.cell[0] + o.size[0] / 2, gy: o.cell[1] + o.size[1] / 2,
      on: !!o.on, wiggle: 0, phase: this.rng() * 10, glowT: 0, tonic: false, brew: null,
    }));
    this.byId = Object.fromEntries(this.objects.map((o) => [o.id, o]));
    this.blocked = new Uint8Array(COLS * ROWS);
    for (const o of this.objects) {
      if (o.kind === "flask" || o.kind === "cushion") continue;
      const cells = o.block ?? Array.from({ length: o.size[0] * o.size[1] }, (_, n) => [n % o.size[0], (n / o.size[0]) | 0]);
      for (const [dc, dr] of cells) this.blocked[(o.cell[1] + dr) * COLS + (o.cell[0] + dc)] = 1;
    }
    this.fireflies = Array.from({ length: reducedMotion ? 0 : 18 }, () => ({
      x: OX + (this.rng() - 0.5) * 360, y: OY + 20 + this.rng() * 200, a: this.rng() * 6.28, sp: 6 + this.rng() * 10, p: this.rng() * 6.28,
    }));

    // avatar
    const [sc, sr] = spawn;
    this.av = {
      gx: sc + 0.5, gy: sr + 0.5, cell: [sc, sr], to: null, from: null, t: 0, segLen: 1, queue: [],
      dir: "NE", distAcc: 0, after: null, sitting: null, boost: 0, hop: 0, blinkT: 2.5, blink: 0, goal: null, sparkT: 0,
    };
    this.tmp = { rect: null };
  }

  // ------------------------------------------------------------------ lifecycle
  setScale(k) { this.k = k; this.canvas.width = LW * k; this.canvas.height = LH * k; this.ctx = this.canvas.getContext("2d"); }
  start() { if (this.running) return; this.running = true; this.last = performance.now(); const loop = (now) => { if (!this.running) return; this.rafId = requestAnimationFrame(loop); const dt = Math.min(0.05, (now - this.last) / 1000); this.last = now; this.update(dt); this.render(); }; this.rafId = requestAnimationFrame(loop); }
  stop() { this.running = false; cancelAnimationFrame(this.rafId); }
  say(text, dur = 2.4) { this.bubble = { text, t: dur, max: dur }; }

  // ------------------------------------------------------------------ projection
  scr(gx, gy) { const p = gridToScreen(gx, gy); return { x: OX + p.x, y: OY + p.y }; }
  clientToLogical(cx, cy) {
    const r = this.canvas.getBoundingClientRect();
    return { x: ((cx - r.left) / r.width) * LW, y: ((cy - r.top) / r.height) * LH - this.bob() };
  }
  logicalToClient(x, y) {
    const r = this.canvas.getBoundingClientRect();
    return { x: r.left + (x / LW) * r.width, y: r.top + ((y + this.bob()) / LH) * r.height };
  }
  bob() { return this.reduced ? 0 : Math.round(Math.sin(this.time * 0.9) * 1.2); }
  cellClientPoint(c, r) { const p = this.scr(c + 0.5, r + 0.5); return this.logicalToClient(p.x, p.y); }

  // ------------------------------------------------------------------ sprite helpers
  meta(key) { return this.sprites[key]; }
  spriteRect(key, gx, gy, dy = 0) {
    const m = this.sprites[key]; const p = this.scr(gx, gy);
    const fw = m.frames ? m.frames.w : m.w, fh = m.frames ? m.frames.h : m.h;
    return { x: Math.round(p.x - m.ax), y: Math.round(p.y - m.ay + dy), w: fw, h: fh, m };
  }
  drawSprite(key, gx, gy, dy = 0, frame = 0, outline = false) {
    const g = this.ctx; const r = this.spriteRect(key, gx, gy, dy); const img = this.images[key];
    if (outline) { const o = this.outlineOf(key); g.drawImage(o, r.x - 1, r.y - 1); }
    if (r.m.frames) g.drawImage(img, frame * r.m.frames.w, 0, r.m.frames.w, r.m.frames.h, r.x, r.y, r.m.frames.w, r.m.frames.h);
    else g.drawImage(img, r.x, r.y);
  }
  outlineOf(key) {
    const m = this.sprites[key];
    if (m.outline) return m.outline;
    const w = (m.frames ? m.frames.w : m.w), h = m.frames ? m.frames.h : m.h;
    const c = makeCanvas(w + 2, h + 2); const g = c.getContext("2d");
    g.fillStyle = "#fff6b8";
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      if (!m.mask[y * m.w + x]) continue;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= w || ny >= h || !m.mask[ny * m.w + nx]) g.fillRect(x + 1 + dx, y + 1 + dy, 1, 1);
      }
    }
    m.outline = c; return c;
  }

  // ------------------------------------------------------------------ object appearance
  spriteKeyOf(o) {
    switch (o.kind) {
      case "kasuga": return o.on ? "kasugaOn" : "kasugaOff";
      case "paper": return o.on ? "paperOn" : "paperOff";
      case "cauldron": return o.brew ? `cauldron${Math.floor(o.brew.t / 0.16) % 4}` : "cauldronIdle";
      case "flask": return o.tonic ? "flaskTonic" : "flaskEmpty";
      case "foxes": return "foxes";
      case "pond": return "koi";
      case "mint": return "mint";
      case "iris": return "irisWind";
      case "torii": return this.night ? "toriiNightF" : "toriiDayF";
      case "mushroom": return ["mushSpring", "mushSummer", "mushAutumn", "mushWinter"][this.season];
      case "cushion": return "cushion";
      default: return null;
    }
  }
  shadowKeyOf(o) {
    return { kasuga: "kasugaShadow", paper: "paperShadow", cauldron: "cauldronShadow", foxes: "foxesShadow", pond: "koiShadow", mint: "mintShadow", iris: "irisShadow", torii: "toriiShadowF", mushroom: "mushShadow", cushion: "cushionShadow" }[o.kind] ?? null;
  }
  labelOf(o) {
    const sit = this.av.sitting === o;
    switch (o.kind) {
      case "kasuga": case "paper": return o.on ? "APAGAR" : "ENCENDER";
      case "cauldron": return o.brew ? "BURBUJEANDO..." : "PREPARAR POCIÓN";
      case "flask": return o.tonic ? "BEBER" : "FRASCO VACÍO";
      case "foxes": return "LLAMAR ESPÍRITUS";
      case "pond": return "TOCAR EL AGUA";
      case "torii": return this.night ? "AMANECER" : "ANOCHECER";
      case "mushroom": return "CAMBIAR ESTACIÓN";
      case "mint": case "iris": return "TOCAR";
      case "cushion": return sit ? "LEVANTARSE" : "SENTARSE";
      default: return "";
    }
  }
  // screen position of the top-centre of an object (for labels)
  objTop(o) {
    const key = this.spriteKeyOf(o); const r = this.spriteRect(key, o.gx, o.gy);
    let top = r.y + (r.m.bbox ? r.m.bbox[1] : 0);
    if (o.kind === "pond") { const b = this.spriteRect("bridge", o.gx, o.gy, -4); top = Math.min(top, b.y + b.m.bbox[1]); }
    const p = this.scr(o.gx, o.gy);
    return { x: p.x, y: top, bottom: r.y + (r.m.bbox ? r.m.bbox[3] : r.h) };
  }

  // ------------------------------------------------------------------ picking
  hitSprite(key, gx, gy, px, py, dy = 0, tol = 2, ox = 0, oy = 0) {
    const r = this.spriteRect(key, gx, gy, dy); const m = r.m;
    const lx = Math.floor(px - r.x), ly = Math.floor(py - r.y);
    for (let yy = -tol; yy <= tol; yy++) for (let xx = -tol; xx <= tol; xx++) {
      const x = lx + xx, y = ly + yy;
      if (x < 0 || y < 0 || x >= r.w || y >= r.h) continue;
      if (m.mask[(y + oy) * m.w + x + ox]) return true;
    }
    return false;
  }
  // which cell of the witch sheet is on screen right now
  witchFrame() {
    const av = this.av;
    let col;
    if (av.sitting) col = av.blink ? WITCH.sitBlink : WITCH.sit;
    else if (av.to) col = WITCH.walk + (Math.floor(av.distAcc / 7) % 4);
    else col = av.blink ? WITCH.blink : WITCH.idle;
    return { col, row: dirRow(av.dir) };
  }
  pick(px, py) {
    // witch first
    const av = this.av;
    const wf = this.witchFrame();
    if (this.hitSprite("witch", av.gx, av.gy, px, py, this.witchDy(), 1, wf.col * WITCH.w, wf.row * WITCH.h)) return { type: "witch" };
    const list = [...this.objects].sort((a, b) => (b.gx + b.gy) - (a.gx + a.gy) || b.idx - a.idx);
    for (const o of list) {
      const key = this.spriteKeyOf(o);
      if (key && this.hitSprite(key, o.gx, o.gy, px, py, 0, o.kind === "paper" || o.kind === "iris" ? 3 : 1)) return { type: "obj", o };
      if (o.kind === "pond" && this.hitSprite("bridge", o.gx, o.gy, px, py, -4, 1)) return { type: "obj", o };
    }
    // welcome sign
    const s = px - OX;
    if (s >= SIGN_S && s <= SIGN_S + SIGN_W) {
      const top = this.signY(s), bot = top + SIGN_H;
      if (py >= top && py <= bot) return { type: "sign" };
    }
    const { gx, gy } = screenToGrid(px - OX, py - OY);
    const c = Math.floor(gx), r = Math.floor(gy);
    if (c >= 0 && r >= 0 && c < COLS && r < ROWS) return { type: "cell", c, r };
    return null;
  }
  signY(s) { // top of the sign at distance s along the right wall (before bob)
    const bobS = this.reduced ? 0 : Math.round(Math.sin(this.time * 1.4) * 1);
    return OY + s / 2 - SIGN_LIFT - SIGN_H - bobS;
  }

  // ------------------------------------------------------------------ input
  handleMove(cx, cy, touch = false) {
    const p = this.clientToLogical(cx, cy);
    this.pointer = { x: p.x, y: p.y, inside: true, touch };
    this.refreshHover();
  }
  handleLeave() { this.pointer.inside = false; this.hover = null; this.hoverCell = null; this.canvas.style.cursor = "default"; }
  refreshHover() {
    if (!this.pointer.inside) return;
    const h = this.pick(this.pointer.x, this.pointer.y);
    this.hover = h && h.type !== "cell" ? h : null;
    this.hoverCell = h && h.type === "cell" && !this.blocked[h.r * COLS + h.c] ? h : null;
    this.canvas.style.cursor = this.hover || this.hoverCell ? "pointer" : "default";
  }
  handleClick(cx, cy) {
    const p = this.clientToLogical(cx, cy);
    this.pointer = { ...this.pointer, x: p.x, y: p.y, inside: true };
    const h = this.pick(p.x, p.y);
    if (!h) return;
    if (h.type === "cell") return this.goToCell(h.c, h.r);
    if (h.type === "witch") return this.pokeWitch();
    if (h.type === "sign") return this.touchSign();
    return this.activate(h.o);
  }

  // ------------------------------------------------------------------ avatar control
  standUp() { if (this.av.sitting) { this.av.sitting = null; this.av.hop = 0.25; } }
  currentCell() { return this.av.to ? this.av.to : this.av.cell; }
  setPath(path) { // path includes the starting cell
    const av = this.av;
    av.queue = path.slice(1);
    if (!av.to && av.queue.length) this.beginStep();
  }
  beginStep() {
    const av = this.av; const next = av.queue.shift();
    const dc = next[0] - av.cell[0], dr = next[1] - av.cell[1];
    av.dir = STEP_DIR[`${dc},${dr}`] ?? av.dir;
    av.from = [av.gx, av.gy]; av.to = next; av.t = 0;
    const a = gridToScreen(av.gx, av.gy), b = gridToScreen(next[0] + 0.5, next[1] + 0.5);
    av.segLen = Math.max(1, Math.hypot(b.x - a.x, b.y - a.y));
  }
  goToCell(c, r) {
    this.av.after = null;
    this.standUp();
    let [tc, tr] = [c, r];
    if (this.blocked[r * COLS + c]) { const n = nearestFree(COLS, ROWS, this.blocked, c, r); if (!n) return; [tc, tr] = n; }
    const from = this.currentCell();
    const path = findPath(COLS, ROWS, this.blocked, from, [tc, tr]);
    if (!path) { this.say("¡No puedo llegar ahí!"); return; }
    this.av.goal = [tc, tr];
    if (path.length === 1 && !this.av.to) return;
    this.setPath(path);
  }
  // Walk to the closest of several cells, then run `done`.
  walkThen(cells, done, face) {
    this.standUp();
    const from = this.currentCell();
    let best = null, bl = Infinity;
    for (const [c, r] of cells) {
      if (c < 0 || r < 0 || c >= COLS || r >= ROWS || this.blocked[r * COLS + c]) continue;
      const p = findPath(COLS, ROWS, this.blocked, from, [c, r]);
      if (!p) continue;
      const l = pathLength(p);
      if (l < bl) { bl = l; best = p; }
    }
    if (!best) { this.say("¡No puedo llegar ahí!"); return; }
    const goal = best[best.length - 1];
    this.av.goal = goal;
    this.av.after = () => { if (face) this.faceTo(face.gx, face.gy); done(); };
    if (best.length === 1 && !this.av.to) { const f = this.av.after; this.av.after = null; f(); return; }
    this.setPath(best);
  }
  ringAround(o) {
    const out = [];
    for (let dr = -1; dr <= o.size[1]; dr++) for (let dc = -1; dc <= o.size[0]; dc++) {
      if (dc >= 0 && dc < o.size[0] && dr >= 0 && dr < o.size[1]) continue;
      const c = o.cell[0] + dc, r = o.cell[1] + dr;
      if (this.objects.some((q) => (q.kind === "flask" || q.kind === "cushion") && q.cell[0] === c && q.cell[1] === r)) continue; // never park on the potion or a cushion
      out.push([c, r]);
    }
    return out;
  }
  faceTo(gx, gy) {
    const dx = gx - this.av.gx, dy = gy - this.av.gy;
    if (Math.abs(dx) + Math.abs(dy) < 0.05) return;
    if (this.av.sitting) return;
    this.av.dir = dirFromVector(dx, dy);
  }
  hop() { this.av.hop = 0.38; }
  witchDy() {
    const a = this.av; if (a.hop <= 0) return a.sitting ? -2 : 0;
    return -Math.abs(Math.sin((1 - a.hop / 0.38) * Math.PI)) * 5 + (a.sitting ? -2 : 0);
  }
  witchTop() { const p = this.scr(this.av.gx, this.av.gy); return { x: p.x, y: p.y - 52 + this.witchDy() }; }

  // ------------------------------------------------------------------ interactions
  activate(o) {
    switch (o.kind) {
      case "kasuga": case "paper": {
        this.faceTo(o.gx, o.gy); this.hop();
        o.on = !o.on; o.wiggle = 0.25;
        const p = this.scr(o.gx, o.gy);
        this.burst(p.x, p.y - (o.kind === "kasuga" ? 28 : 14), o.on ? 12 : 6, o.on ? COLORS.warm : COLORS.violet, { speed: 22, up: 14 });
        break;
      }
      case "cauldron":
        this.walkThen(this.ringAround(o), () => this.brew(o), o);
        break;
      case "flask":
        if (o.tonic) this.walkThen([o.cell], () => this.drink(o), null);
        else { this.faceTo(o.gx, o.gy); this.say("Está vacío... ¡usa el caldero!"); const c = this.byId.cauldron; if (c) c.wiggle = 0.4; }
        break;
      case "cushion":
        if (this.av.sitting === o) { this.standUp(); break; }
        this.walkThen([o.cell], () => this.sit(o), null);
        break;
      case "torii": {
        this.faceTo(o.gx, o.gy); this.hop();
        this.night = !this.night;
        const p = this.scr(o.gx, o.gy);
        this.burst(p.x, p.y - 60, 22, COLORS.gold, { speed: 30, up: 10 });
        this.say(this.night ? "¡Llegó la noche!" : "¡Buenos días mágicos!");
        break;
      }
      case "mushroom": {
        this.faceTo(o.gx, o.gy); this.hop(); o.wiggle = 0.5;
        this.season = (this.season + 1) % 4;
        const p = this.scr(o.gx, o.gy);
        const cols = [COLORS.pink, COLORS.green, COLORS.warm, COLORS.cyan][this.season];
        this.burst(p.x, p.y - 36, 26, cols, { speed: 30, up: 8, type: this.season === 3 ? "dot" : "leaf" });
        this.say(["¡Primavera!", "¡Verano!", "¡Otoño!", "¡Invierno!"][this.season]);
        break;
      }
      case "foxes": {
        this.faceTo(o.gx, o.gy); this.hop(); o.glowT = 3.2;
        const p = this.scr(o.gx, o.gy);
        for (const sx of [-18, 18]) for (let i = 0; i < 3; i++) this.emit({ type: "flame", x: p.x + sx + (this.rng() - 0.5) * 8, y: p.y - 22 - i * 3, vy: -9 - this.rng() * 5, life: 2.6 + this.rng(), sway: this.rng() * 6 });
        this.say("¡Los espíritus despiertan!");
        break;
      }
      case "pond": {
        this.faceTo(o.gx, o.gy); this.hop(); o.wiggle = 0.3;
        const p = this.scr(o.gx, o.gy);
        for (let i = 0; i < 3; i++) this.emit({ type: "ring", x: p.x + (this.rng() - 0.5) * 24, y: p.y - 4 + (this.rng() - 0.5) * 8, r: 1, vr: 9, life: 1.3 + i * 0.25, delay: i * 0.18 });
        this.emit({ type: "fish", x: p.x - 8 + this.rng() * 16, y: p.y - 6, vx: (this.rng() - 0.5) * 14, vy: -46, life: 1.0 });
        break;
      }
      case "mint": case "iris": {
        this.faceTo(o.gx, o.gy); o.wiggle = 0.45;
        const p = this.scr(o.gx, o.gy);
        this.burst(p.x, p.y - 10, 8, COLORS.green, { speed: 18, up: 8, type: "leaf" });
        break;
      }
      default: break;
    }
  }
  pokeWitch() {
    this.hop();
    const lines = ["¡Hola!", "¡Bienvenidos!", "♪ la la la ♪", "¡Mira la magia!", "♥"];
    this.say(lines[(Math.random() * lines.length) | 0], 1.8);
    const t = this.witchTop();
    this.burst(t.x, t.y + 8, 8, COLORS.pink, { speed: 18, up: 10 });
  }
  touchSign() {
    this.signPulse = 1.2;
    for (let i = 0; i < 24; i++) {
      const s = SIGN_S + 4 + this.rng() * (SIGN_W - 8);
      const y = this.signY(s) + 4 + this.rng() * (SIGN_H - 8);
      this.emit({ type: "star", x: OX + s, y, vx: (this.rng() - 0.5) * 10, vy: -6 - this.rng() * 10, life: 0.9 + this.rng() * 0.8, color: this.pick3(["pink", "cyan", "gold"]) });
    }
  }
  pick3(names) { const k = names[(this.rng() * names.length) | 0]; return COLORS[k]; }
  brew(o) {
    this.hop();
    const flask = this.byId.flask;
    if (flask && flask.tonic) { this.say("¡Ya hay una poción lista!"); }
    o.brew = { t: 0, dur: 3.6 };
    this.say("Burbuja, burbuja...", 2);
  }
  finishBrew(o) {
    o.brew = null;
    const flask = this.byId.flask;
    if (flask) {
      flask.tonic = true; flask.wiggle = 0.5;
      const p = this.scr(flask.gx, flask.gy);
      this.burst(p.x, p.y - 12, 20, COLORS.pink, { speed: 26, up: 14 });
    }
    const p = this.scr(o.gx, o.gy);
    this.burst(p.x, p.y - 30, 14, COLORS.green, { speed: 24, up: 16 });
    this.say("¡Poción lista!");
  }
  drink(o) {
    o.tonic = false; this.av.boost = 7; this.hop();
    const t = this.witchTop();
    this.burst(t.x, t.y + 20, 26, COLORS.cyan, { speed: 34, up: 16 });
    this.say("¡Qué energía!");
  }
  sit(o) {
    const av = this.av;
    av.sitting = o; av.gx = o.gx; av.gy = o.gy; av.cell = [o.cell[0], o.cell[1]]; av.to = null; av.queue = []; av.dir = o.face ?? "SE"; av.sparkT = 0;
    this.hop();
    this.say("Qué paz...", 1.6);
  }

  // ------------------------------------------------------------------ particles
  emit(p) { if (this.particles.length < 500) this.particles.push({ vx: 0, vy: 0, ay: 0, age: 0, color: COLORS.gold, ...p, max: p.life }); }
  burst(x, y, n, colors, { speed = 20, up = 10, type = "star" } = {}) {
    if (this.reduced) n = Math.ceil(n / 3);
    for (let i = 0; i < n; i++) {
      const a = this.rng() * 6.283, s = speed * (0.35 + this.rng() * 0.65);
      this.emit({ type, x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s * 0.6 - up, ay: 28, life: 0.7 + this.rng() * 0.8, color: colors });
    }
  }

  // ------------------------------------------------------------------ update
  update(dt) {
    this.time += dt;
    const av = this.av;
    this.nightT += ((this.night ? 1 : 0) - this.nightT) * Math.min(1, dt * 2.2);
    this.signPulse = Math.max(0, this.signPulse - dt);
    for (const o of this.objects) {
      if (o.wiggle > 0) o.wiggle = Math.max(0, o.wiggle - dt);
      if (o.glowT > 0) o.glowT = Math.max(0, o.glowT - dt);
      if (o.brew) {
        o.brew.t += dt;
        if (!this.reduced || Math.random() < 0.3) {
          if (Math.random() < dt * 14) { const p = this.scr(o.gx, o.gy); this.emit({ type: "bubble", x: p.x + (this.rng() - 0.5) * 18, y: p.y - 26, vx: (this.rng() - 0.5) * 6, vy: -16 - this.rng() * 10, life: 1.1, color: this.pick3(["green", "cyan", "pink"]) }); }
        }
        if (o.brew.t >= o.brew.dur) this.finishBrew(o);
      }
    }
    // ----- avatar
    if (av.hop > 0) av.hop = Math.max(0, av.hop - dt);
    if (av.boost > 0) av.boost = Math.max(0, av.boost - dt);
    av.blinkT -= dt; if (av.blinkT < -0.14) av.blinkT = 2.5 + Math.random() * 3.5;
    av.blink = av.blinkT < 0 ? 1 : 0;
    if (av.sitting) {
      av.sparkT -= dt;
      if (av.sparkT <= 0) { av.sparkT = 1.1; const t = this.witchTop(); this.emit({ type: "star", x: t.x + (this.rng() - 0.5) * 18, y: t.y + 4, vy: -8, life: 1.2, color: COLORS.violet }); }
    } else if (av.to) {
      let remain = (av.boost > 0 ? 84 : 54) * dt;
      while (remain > 0 && av.to) {
        const left = (1 - av.t) * av.segLen;
        if (remain >= left) {
          remain -= left; av.distAcc += left;
          av.gx = av.to[0] + 0.5; av.gy = av.to[1] + 0.5; av.cell = [av.to[0], av.to[1]]; av.to = null; av.t = 0;
          if (av.queue.length) this.beginStep();
        } else {
          av.t += remain / av.segLen; av.distAcc += remain; remain = 0;
          av.gx = av.from[0] + (av.to[0] + 0.5 - av.from[0]) * av.t; av.gy = av.from[1] + (av.to[1] + 0.5 - av.from[1]) * av.t;
        }
      }
      if (!av.to && !av.queue.length) { const f = av.after; av.after = null; av.goal = null; if (f) f(); }
      if (av.boost > 0 && Math.random() < dt * 30) { const p = this.scr(av.gx, av.gy); this.emit({ type: "star", x: p.x + (this.rng() - 0.5) * 8, y: p.y - 2, vy: -6, life: 0.6, color: COLORS.cyan }); }
    }
    // magic circle reacts when the witch stands inside
    const cs = this.byId.seatA;
    const dist = cs ? Math.hypot(av.gx - cs.gx, av.gy - cs.gy) : 9;
    this.circleGlow += ((dist < 1.9 ? 1 : 0) - this.circleGlow) * Math.min(1, dt * 3);
    if (this.circleGlow > 0.5 && !this.reduced && Math.random() < dt * 8) { const p = this.scr(cs.gx + (this.rng() - 0.5) * 3, cs.gy + (this.rng() - 0.5) * 3); this.emit({ type: "star", x: p.x, y: p.y, vy: -12, life: 1.1, color: COLORS.cyan }); }
    // bubble
    if (this.bubble) { this.bubble.t -= dt; if (this.bubble.t <= 0) this.bubble = null; }
    // particles
    for (const p of this.particles) {
      p.age += dt;
      if (p.delay) { p.delay -= dt; p.age = 0; continue; }
      if (p.type === "ring") { p.r += p.vr * dt; }
      else if (p.type === "flame") { p.x += Math.sin(this.time * 3 + p.sway) * 6 * dt; p.y += p.vy * dt; }
      else { p.vy += p.ay * dt; p.x += p.vx * dt; p.y += p.vy * dt; }
      if (p.type === "fish" && p.age >= p.life && !p.landed) { p.landed = true; this.emit({ type: "ring", x: p.x, y: p.y + 6, r: 1, vr: 10, life: 1.0 }); }
    }
    this.particles = this.particles.filter((p) => p.age < p.max);
    // fireflies
    for (const f of this.fireflies) {
      f.a += (Math.sin(this.time * 0.7 + f.p) * 1.6) * dt; f.x += Math.cos(f.a) * f.sp * dt; f.y += Math.sin(f.a) * f.sp * dt * 0.6;
      if (f.x < OX - 190) f.x = OX + 190; if (f.x > OX + 190) f.x = OX - 190; if (f.y < OY - 30) f.y = OY + 190; if (f.y > OY + 230) f.y = OY - 20;
    }
    if (this.pointer.inside) this.refreshHover();
  }

  // ------------------------------------------------------------------ render
  render() {
    const g = this.ctx; const k = this.k;
    g.setTransform(k, 0, 0, k, 0, 0); g.imageSmoothingEnabled = false;
    g.clearRect(0, 0, LW, LH);
    drawSky(g, this.sky, this.nightT, this.time);
    const bob = this.bob();
    g.save(); g.translate(0, bob);
    g.drawImage(this.island.canvas, 0, 0);
    // glowing crystals
    for (const c of this.island.crystals) { g.globalAlpha = (0.25 + 0.2 * Math.sin(this.time * 2 + c.x)) * (0.5 + 0.5 * this.nightT); g.fillStyle = c.col; g.fillRect(c.x - 3, c.y - 3, 7, 7); g.globalAlpha = 1; }
    g.drawImage(this.floor, 0, 0);
    this.drawMagicCircle(g);
    g.drawImage(this.walls, 0, 0);
    drawRunes(g, this.runes, this.time, this.nightT);
    this.drawMoonWindow(g);
    this.drawSign(g);
    this.drawEntities(g);
    this.drawParticles(g);
    this.drawLighting(g);
    this.drawFireflies(g);
    this.drawHoverUI(g);
    if (this.debug) this.drawDebug(g);
    g.restore();
  }

  drawMoonWindow(g) {
    const s0 = 112, h0 = 26; // on the left wall
    const p = wallPoint("L", s0, h0 + 46);
    g.globalAlpha = 0.9; shearBlit(g, this.moonWindow, Math.round(p.x - 46 + 0), Math.round(p.y), -0.5); g.globalAlpha = 1;
  }

  drawSign(g) {
    const pulse = this.signPulse;
    const bobS = this.reduced ? 0 : Math.round(Math.sin(this.time * 1.4));
    const x0 = OX + SIGN_S, y0 = OY + SIGN_S / 2 - SIGN_LIFT - SIGN_H - bobS;
    // glow behind
    g.globalAlpha = (0.16 + 0.12 * Math.sin(this.time * 2) + pulse * 0.35) * (0.5 + 0.5 * this.nightT);
    g.fillStyle = "#ff9ad8";
    for (let i = -2; i < SIGN_W + 2; i += 1) { const y = y0 + Math.round(i * 0.5); g.fillRect(x0 + i, y - 3, 1, SIGN_H + 6); }
    g.globalAlpha = 1;
    shearBlit(g, this.sign, x0, y0, 0.5);
    // floating sparkles around
    if (!this.reduced) for (let i = 0; i < 5; i++) {
      const ph = this.time * 1.2 + i * 1.7; const s = SIGN_S + ((i * 37 + Math.sin(ph) * 6 + 150) % (SIGN_W));
      const y = OY + s / 2 - SIGN_LIFT - SIGN_H * (0.2 + 0.6 * ((Math.sin(ph * 0.9) + 1) / 2)) - bobS;
      g.globalAlpha = 0.5 + 0.5 * Math.sin(ph * 2); g.fillStyle = i % 2 ? "#bff6ff" : "#ffd0ee";
      g.fillRect(Math.round(OX + s), Math.round(y), 1, 1); g.fillRect(Math.round(OX + s) - 1, Math.round(y), 3, 1); g.fillRect(Math.round(OX + s), Math.round(y) - 1, 1, 3);
    }
    g.globalAlpha = 1;
  }

  ellipsePts(g, cx, cy, rx, ry, col, step = 0.03, dash = 0) {
    g.fillStyle = col; let n = 0;
    for (let a = 0; a < 6.2832; a += step) { n++; if (dash && n % dash < dash / 2) continue; g.fillRect(Math.round(cx + Math.cos(a) * rx), Math.round(cy + Math.sin(a) * ry), 1, 1); }
  }
  drawMagicCircle(g) {
    const cs = this.byId.seatA; if (!cs) return;
    const c = this.scr(cs.gx, cs.gy); const R = 2.7; const rx = R * 22.6, ry = R * 11.3;
    const glow = 0.62 + 0.18 * Math.sin(this.time * 1.6) + 0.3 * this.circleGlow;
    const a = Math.min(1, glow * (0.7 + 0.3 * this.nightT));
    g.globalAlpha = a * 0.22; g.fillStyle = "#ff9ad8"; g.beginPath(); g.ellipse(c.x, c.y, rx, ry, 0, 0, 6.3); g.fill();
    g.globalAlpha = a; this.ellipsePts(g, c.x, c.y, rx, ry, "#7ff3ff", 0.02); g.globalAlpha = a * 0.45; this.ellipsePts(g, c.x, c.y + 1, rx, ry, "#38c8e8", 0.02);
    g.globalAlpha = a * 0.8; this.ellipsePts(g, c.x, c.y, rx * 0.82, ry * 0.82, "#ffb8e8", 0.025, 6);
    // rotating rune ticks
    const rot = this.time * 0.35;
    g.globalAlpha = Math.min(1, a * 1.3);
    for (let i = 0; i < 8; i++) {
      const th = rot + (i * Math.PI) / 4;
      const x = c.x + Math.cos(th) * rx * 0.91, y = c.y + Math.sin(th) * ry * 0.91;
      g.fillStyle = i % 2 ? "#ffd0ee" : "#d8fbff"; g.fillRect(Math.round(x) - 1, Math.round(y) - 1, 3, 3);
      g.fillStyle = "#17121f"; g.fillRect(Math.round(x), Math.round(y), 1, 1);
    }
    // inner star
    const pts = []; for (let i = 0; i < 5; i++) { const th = -Math.PI / 2 + this.time * 0.15 + (i * 4 * Math.PI) / 5; pts.push([c.x + Math.cos(th) * rx * 0.62, c.y + Math.sin(th) * ry * 0.62]); }
    g.globalAlpha = a * 0.7;
    for (let i = 0; i < 5; i++) pixelLine(g, pts[i][0], pts[i][1], pts[(i + 1) % 5][0], pts[(i + 1) % 5][1], "#c9a6ff");
    g.globalAlpha = 1;
  }

  entityList() {
    const list = [];
    for (const o of this.objects) {
      if (o.kind === "pond") {
        // the pond lies flat on the floor: draw it under everything, the bridge sorts like a normal object
        list.push({ depth: -100, draw: (g) => this.drawObject(g, o, "ground") });
        list.push({ depth: o.gx + o.gy, draw: (g) => this.drawObject(g, o, "bridge") });
      } else {
        list.push({ depth: o.gx + o.gy + (o.kind === "cushion" ? -0.5 : 0), draw: (g) => this.drawObject(g, o) });
      }
    }
    list.push({ depth: this.av.gx + this.av.gy + 0.0001, draw: (g) => this.drawWitch(g) });
    return list.sort((a, b) => a.depth - b.depth);
  }
  drawEntities(g) { for (const e of this.entityList()) e.draw(g); }

  drawObject(g, o, part = "all") {
    const key = this.spriteKeyOf(o); if (!key) return;
    const sk = this.shadowKeyOf(o);
    const hov = this.hover && this.hover.type === "obj" && this.hover.o === o;
    const wig = o.wiggle > 0 ? Math.round(Math.sin(o.wiggle * 38) * Math.min(1.5, o.wiggle * 6)) : 0;
    const frame = o.kind === "iris" ? Math.floor((this.time * 5 + o.phase) % 8) : 0;
    g.save(); if (wig) g.translate(wig, 0);
    if (o.kind === "pond") {
      if (part === "ground") { this.drawSprite(key, o.gx, o.gy, 0, 0, hov); }
      else { this.drawSprite("bridgeShadow", o.gx, o.gy, -4); this.drawSprite("bridge", o.gx, o.gy, -4, 0, hov); }
    } else {
      if (sk) { const r = this.spriteRect(sk, o.gx, o.gy); if (sk === "mushShadow") g.globalAlpha = 0.3; g.drawImage(this.images[sk], r.x, r.y); g.globalAlpha = 1; }
      this.drawSprite(key, o.gx, o.gy, 0, frame, hov && o.kind !== "iris");
    }
    g.restore();
  }

  drawWitch(g) {
    const av = this.av; const p = this.scr(av.gx, av.gy);
    // soft shadow
    g.globalAlpha = 0.32; g.fillStyle = "#0e141a";
    const sw = av.sitting ? 11 : 8; g.fillRect(Math.round(p.x) - sw, Math.round(p.y) - 1, sw * 2, 3); g.fillRect(Math.round(p.x) - sw + 2, Math.round(p.y) - 2, sw * 2 - 4, 1); g.fillRect(Math.round(p.x) - sw + 2, Math.round(p.y) + 2, sw * 2 - 4, 1);
    g.globalAlpha = 1;
    const { col, row } = this.witchFrame();
    const r = this.spriteRect("witch", av.gx, av.gy, this.witchDy());
    const hov = this.hover && this.hover.type === "witch";
    if (hov) { // simple outline: draw the frame four times in white behind
      g.save(); g.globalAlpha = 0.9;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) g.drawImage(this.tintedWitch(col, row), r.x + dx, r.y + dy);
      g.restore();
    }
    g.drawImage(this.images.witch, col * WITCH.w, row * WITCH.h, WITCH.w, WITCH.h, r.x, r.y, WITCH.w, WITCH.h);
  }
  tintedWitch(col, row) {
    const key = `${col},${row}`; this._tint = this._tint || {};
    if (this._tint[key]) return this._tint[key];
    const c = makeCanvas(WITCH.w, WITCH.h); const g = c.getContext("2d");
    g.drawImage(this.images.witch, col * WITCH.w, row * WITCH.h, WITCH.w, WITCH.h, 0, 0, WITCH.w, WITCH.h);
    g.globalCompositeOperation = "source-in"; g.fillStyle = "#fff6b8"; g.fillRect(0, 0, WITCH.w, WITCH.h);
    this._tint[key] = c; return c;
  }

  drawParticles(g) {
    for (const p of this.particles) {
      if (p.delay > 0) continue;
      const fade = Math.min(1, (p.max - p.age) / 0.35, p.age / 0.05 + 0.2);
      const x = Math.round(p.x), y = Math.round(p.y);
      const col = Array.isArray(p.color) ? p.color[Math.min(p.color.length - 1, Math.floor((p.age / p.max) * p.color.length))] : p.color;
      g.globalAlpha = Math.max(0, fade);
      switch (p.type) {
        case "dot": g.fillStyle = col; g.fillRect(x, y, 1, 1); break;
        case "leaf": g.fillStyle = col; g.fillRect(x, y, 2, 1); g.fillRect(x + 1, y + 1, 1, 1); break;
        case "bubble": g.fillStyle = col; g.fillRect(x, y - 1, 2, 1); g.fillRect(x - 1, y, 1, 2); g.fillRect(x + 2, y, 1, 2); g.fillRect(x, y + 2, 2, 1); g.fillStyle = "#ffffff"; g.fillRect(x, y, 1, 1); break;
        case "flame": { g.fillStyle = "#38c8e8"; g.fillRect(x - 1, y, 3, 3); g.fillRect(x, y - 2, 1, 2); g.fillStyle = "#bff6ff"; g.fillRect(x, y, 1, 2); g.fillStyle = "#fff"; g.fillRect(x, y + 1, 1, 1); break; }
        case "ring": { this.ellipsePts(g, p.x, p.y, p.r * 2, p.r, "#e8fbff", Math.max(0.06, 0.5 / (p.r + 1))); break; }
        case "fish": { g.fillStyle = "#ff9040"; g.fillRect(x - 2, y, 4, 2); g.fillStyle = "#ffe0b0"; g.fillRect(x + 1, y, 1, 1); g.fillStyle = "#ff6a2a"; g.fillRect(x - 3, y - 1, 1, 4); break; }
        default: { // star: little plus sign, white core
          g.fillStyle = col; g.fillRect(x, y - 1, 1, 3); g.fillRect(x - 1, y, 3, 1); g.fillStyle = "#ffffff"; g.fillRect(x, y, 1, 1);
        }
      }
    }
    g.globalAlpha = 1;
  }

  lightsList() {
    const L = [];
    for (const o of this.objects) {
      if ((o.kind === "kasuga" || o.kind === "paper") && o.on) {
        const p = this.scr(o.gx, o.gy); const big = o.kind === "kasuga";
        L.push({ x: p.x, y: p.y, r: big ? 58 : 38, head: { x: p.x, y: p.y - (big ? 30 : 14), r: big ? 12 : 8 }, col: "255,200,110", i: big ? 1 : 0.85 });
      }
      if (o.kind === "cauldron" && o.brew) { const p = this.scr(o.gx, o.gy); L.push({ x: p.x, y: p.y, r: 50, head: { x: p.x, y: p.y - 24, r: 14 }, col: "130,255,190", i: 0.9 }); }
      if (o.kind === "foxes" && o.glowT > 0) { const p = this.scr(o.gx, o.gy); L.push({ x: p.x, y: p.y, r: 54, head: { x: p.x, y: p.y - 24, r: 14 }, col: "120,220,255", i: Math.min(1, o.glowT) }); }
      if (o.kind === "flask" && o.tonic) { const p = this.scr(o.gx, o.gy); L.push({ x: p.x, y: p.y, r: 26, head: { x: p.x, y: p.y - 8, r: 8 }, col: "255,140,220", i: 0.8 }); }
    }
    const a = this.av; const wp = this.scr(a.gx, a.gy);
    L.push({ x: wp.x, y: wp.y, r: 30, head: { x: wp.x - 4, y: wp.y - 40, r: 10 }, col: "127,243,255", i: 0.7 });
    const sc = this.byId.seatA; if (sc) { const p = this.scr(sc.gx, sc.gy); L.push({ x: p.x, y: p.y, r: 54 + this.circleGlow * 20, head: null, col: "180,160,255", i: 0.45 + this.circleGlow * 0.4 }); }
    return L;
  }
  drawLighting(g) {
    const n = this.nightT; if (n < 0.01) { return; }
    const d = this.dark.getContext("2d");
    d.globalCompositeOperation = "source-over"; d.clearRect(0, 0, LW, LH);
    d.fillStyle = `rgba(34,16,92,${0.52 * n})`; d.fillRect(0, 0, LW, LH);
    d.globalCompositeOperation = "destination-out";
    const lights = this.lightsList();
    for (const l of lights) {
      d.save(); d.translate(l.x, l.y); d.scale(1, 0.5);
      const rg = d.createRadialGradient(0, 0, 0, 0, 0, l.r); rg.addColorStop(0, `rgba(0,0,0,${l.i})`); rg.addColorStop(0.55, `rgba(0,0,0,${0.55 * l.i})`); rg.addColorStop(1, "rgba(0,0,0,0)");
      d.fillStyle = rg; d.beginPath(); d.arc(0, 0, l.r, 0, 6.3); d.fill(); d.restore();
      if (l.head) { const h = l.head; const rg2 = d.createRadialGradient(h.x, h.y, 0, h.x, h.y, h.r * 2.4); rg2.addColorStop(0, `rgba(0,0,0,${l.i})`); rg2.addColorStop(1, "rgba(0,0,0,0)"); d.fillStyle = rg2; d.beginPath(); d.arc(h.x, h.y, h.r * 2.4, 0, 6.3); d.fill(); }
    }
    g.drawImage(this.dark, 0, 0);
    // warm additive tint on top
    g.globalCompositeOperation = "lighter";
    for (const l of lights) {
      g.save(); g.translate(l.x, l.y); g.scale(1, 0.5);
      const flick = 0.92 + 0.08 * Math.sin(this.time * 7 + l.x);
      const rg = g.createRadialGradient(0, 0, 0, 0, 0, l.r); rg.addColorStop(0, `rgba(${l.col},${0.26 * l.i * n * flick})`); rg.addColorStop(1, `rgba(${l.col},0)`);
      g.fillStyle = rg; g.beginPath(); g.arc(0, 0, l.r, 0, 6.3); g.fill(); g.restore();
      if (l.head) { const h = l.head; const rg2 = g.createRadialGradient(h.x, h.y, 0, h.x, h.y, h.r * 1.8); rg2.addColorStop(0, `rgba(${l.col},${0.5 * l.i * n * flick})`); rg2.addColorStop(1, `rgba(${l.col},0)`); g.fillStyle = rg2; g.beginPath(); g.arc(h.x, h.y, h.r * 1.8, 0, 6.3); g.fill(); }
    }
    g.globalCompositeOperation = "source-over";
  }
  drawFireflies(g) {
    for (const f of this.fireflies) {
      const tw = 0.5 + 0.5 * Math.sin(this.time * 2.4 + f.p); const a = (0.25 + 0.75 * tw) * (0.25 + 0.75 * this.nightT);
      g.globalAlpha = a * 0.35; g.fillStyle = "#e8ff8a"; g.fillRect(Math.round(f.x) - 1, Math.round(f.y) - 1, 3, 3);
      g.globalAlpha = a; g.fillStyle = "#fffbb0"; g.fillRect(Math.round(f.x), Math.round(f.y), 1, 1);
    }
    g.globalAlpha = 1;
  }

  bubbleBox(g, text, cx, y, { tail = true, dark = false } = {}) {
    const tw = textWidth(text, 1); const w = tw + 9, h = 13;
    let x = Math.round(cx - w / 2); x = Math.max(2, Math.min(LW - w - 2, x));
    const yy = Math.max(2, Math.round(y - h));
    g.fillStyle = "#17121f"; g.fillRect(x + 1, yy, w - 2, h); g.fillRect(x, yy + 1, w, h - 2);
    g.fillStyle = dark ? "#3a2a5a" : "#fff7fd"; g.fillRect(x + 1, yy + 1, w - 2, h - 2); g.fillRect(x + 2, yy, w - 4, 1);
    const put = (col) => (px, py, s) => { g.fillStyle = col; g.fillRect(px, py, s, s); };
    drawText(put(dark ? "#fff0fb" : "#3b1f4d"), text, x + 5, yy + 3, 1);
    if (tail) { const tx = Math.round(Math.max(x + 5, Math.min(x + w - 6, cx))); g.fillStyle = "#17121f"; g.fillRect(tx - 1, yy + h, 4, 1); g.fillRect(tx, yy + h + 1, 2, 1); g.fillStyle = dark ? "#3a2a5a" : "#fff7fd"; g.fillRect(tx, yy + h - 1, 2, 1); g.fillRect(tx, yy + h, 2, 1); }
  }
  drawHoverUI(g) {
    // hovered / target cell
    const diamond = (c, r, col, a) => {
      const p = this.scr(c + 0.5, r + 0.5);
      g.globalAlpha = a;
      pixelLine(g, p.x - 16, p.y, p.x, p.y - 8, col); pixelLine(g, p.x, p.y - 8, p.x + 16, p.y, col); pixelLine(g, p.x + 16, p.y, p.x, p.y + 8, col); pixelLine(g, p.x, p.y + 8, p.x - 16, p.y, col);
      g.globalAlpha = 1;
    };
    if (this.hoverCell && !this.pointer.touch) diamond(this.hoverCell.c, this.hoverCell.r, "#ffd0ee", 0.8);
    const goal = this.av.goal;
    if (goal && (this.av.to || this.av.queue.length)) diamond(goal[0], goal[1], "#bff6ff", 0.55 + 0.4 * Math.sin(this.time * 8));
    // speech bubble above the witch
    if (this.bubble) {
      const t = this.witchTop(); const a = Math.min(1, this.bubble.t / 0.25);
      g.globalAlpha = a; this.bubbleBox(g, this.bubble.text, t.x, t.y - 2); g.globalAlpha = 1;
    }
    // hover label
    if (this.hover && this.hover.type === "obj" && !this.pointer.touch) {
      const o = this.hover.o; const lab = this.labelOf(o);
      if (lab) { const tp = this.objTop(o); this.bubbleBox(g, lab, tp.x, tp.y - 3, { dark: true }); }
    } else if (this.hover && this.hover.type === "sign") { /* no label */ }
  }
  drawDebug(g) {
    for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
      const p = this.scr(c + 0.5, r + 0.5);
      g.fillStyle = this.blocked[r * COLS + c] ? "rgba(255,0,0,0.35)" : "rgba(0,255,0,0.06)";
      g.beginPath(); g.moveTo(p.x - 16, p.y); g.lineTo(p.x, p.y - 8); g.lineTo(p.x + 16, p.y); g.lineTo(p.x, p.y + 8); g.closePath(); g.fill();
    }
    for (const o of this.objects) { const p = this.scr(o.gx, o.gy); g.fillStyle = "#ff0"; g.fillRect(Math.round(p.x) - 1, Math.round(p.y) - 1, 3, 3); }
  }

  // for tests / debugging
  snapshot() {
    const a = this.av;
    return { cell: a.cell, moving: !!a.to, dir: a.dir, sitting: a.sitting ? a.sitting.id : null, night: this.night, boost: a.boost > 0, lamps: Object.fromEntries(this.objects.filter((o) => o.kind === "kasuga" || o.kind === "paper").map((o) => [o.id, o.on])), tonic: !!this.byId.flask?.tonic, brewing: !!this.byId.cauldron?.brew, season: this.season };
  }
}
