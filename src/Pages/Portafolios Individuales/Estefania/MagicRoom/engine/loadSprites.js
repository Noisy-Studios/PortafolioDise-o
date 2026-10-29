// Loads every sprite and derives: opaque bounding box, default anchor and a 1-bit hit mask.
export async function loadSprites(defs) {
  const loaded = await Promise.all(
    Object.entries(defs).map(
      ([key, d]) =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve([key, img, d]);
          img.onerror = () => reject(new Error(`MagicRoom: no se pudo cargar "${key}" (${d.src})`));
          img.src = d.src;
        })
    )
  );
  const images = {};
  const sprites = {};
  const probe = document.createElement("canvas");
  const pg = probe.getContext("2d", { willReadFrequently: true });
  for (const [key, img, d] of loaded) {
    images[key] = img;
    const w = img.naturalWidth, h = img.naturalHeight;
    probe.width = w; probe.height = h;
    pg.clearRect(0, 0, w, h);
    pg.drawImage(img, 0, 0);
    const data = pg.getImageData(0, 0, w, h).data;
    const fw = d.frames ? d.frames.w : w, fh = d.frames ? d.frames.h : h;
    const mask = new Uint8Array(w * h);
    // hit mask: the first frame only, or the whole sheet when the sprite picks its frame at runtime
    const mw = d.fullMask ? w : fw, mh = d.fullMask ? h : fh;
    let x0 = fw, y0 = fh, x1 = 0, y1 = 0;
    for (let y = 0; y < mh; y++) for (let x = 0; x < mw; x++) {
      if (data[(y * w + x) * 4 + 3] > 24) {
        mask[y * w + x] = 1;
        if (x < fw && y < fh) { if (x < x0) x0 = x; if (y < y0) y0 = y; if (x + 1 > x1) x1 = x + 1; if (y + 1 > y1) y1 = y + 1; }
      }
    }
    if (x1 <= x0) { x0 = 0; y0 = 0; x1 = fw; y1 = fh; }
    sprites[key] = {
      w, h, frames: d.frames ?? null, mask, bbox: [x0, y0, x1, y1],
      ax: d.ax ?? (x0 + x1) / 2,
      ay: d.ay ?? y1 - 4,
      outline: null,
    };
  }
  return { images, sprites };
}
