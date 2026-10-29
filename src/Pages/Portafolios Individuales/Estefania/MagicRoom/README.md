# MagicRoom — habitación isométrica mágica (pixel art)

Habitación con piso de roble, paredes casi transparentes, letrero de bienvenida y una bruja
que camina por clic en 8 direcciones. Todo se dibuja en un `<canvas>` (sin dependencias extra).

## Instalación
1. Copia esta carpeta a `src/components/MagicRoom/`.
2. Usa el componente:

```jsx
import MagicRoom from "../../../components/MagicRoom";

<MagicRoom name="Estefania" />
```

Props (todas opcionales): `name`, `title` (por defecto `BIENVENIDOS`), `subtitle`, `maxScale` (3),
`showHint` (true), `debug` (muestra la grilla/celdas bloqueadas y expone `window.__magicRoom`).

Next.js (app router): agrega `"use client"` como primera línea de `MagicRoom.jsx`.

## Qué se puede hacer
- Clic en el piso: la bruja camina (A* sobre una grilla 12x12, 8 direcciones).
- Linternas kasuga y de papel: encender / apagar (iluminan el piso).
- Caldero: camina hasta él y prepara una poción; el frasco se llena. Clic en el frasco: la bebe y camina más rápido unos segundos.
- Torii: alterna noche / día.
- Hongo gigante: cambia de estación. Zorros: despiertan espíritus. Estanque: ondas y un pez saltarín.
- Cojines: camina y se sienta (clic otra vez, o en el piso, para levantarse). Sentarse en el círculo mágico lo enciende.
- Clic en la bruja o en el letrero: pequeñas reacciones. No hay objetos con información personal.

## Dónde cambiar cosas
- `roomConfig.js`: `OBJECTS` (qué hay y en qué celda `[columna, fila]`), `SPAWN`, y el registro de sprites.
  La celda `[0,0]` es la esquina del fondo; la columna crece hacia abajo-derecha y la fila hacia abajo-izquierda.
- `engine/RoomEngine.js`: comportamiento (interacciones en `activate`), luces y partículas.
- `engine/scenery.js`: cielo, isla flotante, paredes, runas y letrero.
- `assets/`: los PNG. `witch.png` es una hoja de 8 columnas x 8 filas (frames de 48x64).
  Filas: S, SE, E, NE, N, NO, O, SO. Columnas: 0 reposo, 1 parpadeo, 2-5 caminar, 6 sentada, 7 sentada parpadeando.

## Créditos de los assets
Piso, linternas, caldero, torii, estanque, zorros, hongo, iris, menta, frascos y puente: pack entregado.
`witch.png` y `cushion.png` se dibujaron para esta habitación con el estilo del pack (el pack no traía avatar ni asiento).
