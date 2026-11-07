// Timeline of the T2 title sequence, in ms at normal speed. heroes/t2/Montaje.astro plays it.
// Eje y rises through the mask and leaves upward; eje x pushes in from the right and leaves to
// the left. Orden sets the stagger: letra (left to right), reves, centro, palabra or todo.
type Eje = "x" | "y";
type Orden = "letra" | "reves" | "centro" | "palabra" | "todo";
type Curva = "expo" | "quint";

interface Entrada {
  eje: Eje;
  orden: Orden;
  paso: number;
  dur: number;
  curva: Curva;
}
interface Salida {
  eje: Eje;
  orden: Orden;
  paso: number;
  dur: number;
}
interface Toma {
  // ms until the next phrase starts.
  tras: number;
  // How much earlier than that this one starts leaving.
  antes: number;
  entra: Entrada;
  sale: Salida;
}

// An exit starts about 0.9 of its length before the next entry, so a glyph has mostly left
// before the next one rises into the same place. Each step is shorter: the cutting speeds up.
const tomas: Toma[] = [
  {
    tras: 1400,
    antes: 200,
    entra: { eje: "y", orden: "letra", paso: 10, dur: 700, curva: "expo" },
    sale: { eje: "y", orden: "letra", paso: 8, dur: 220 },
  },
  {
    tras: 840,
    antes: 190,
    entra: { eje: "y", orden: "palabra", paso: 55, dur: 540, curva: "quint" },
    sale: { eje: "y", orden: "palabra", paso: 30, dur: 210 },
  },
  // The sideways cut: the next phrase enters only once this one has gone, at the same speed.
  {
    tras: 760,
    antes: 320,
    entra: { eje: "y", orden: "centro", paso: 10, dur: 500, curva: "expo" },
    sale: { eje: "x", orden: "palabra", paso: 16, dur: 240 },
  },
  {
    tras: 600,
    antes: 170,
    entra: { eje: "x", orden: "palabra", paso: 10, dur: 460, curva: "quint" },
    sale: { eje: "y", orden: "reves", paso: 6, dur: 200 },
  },
  {
    tras: 540,
    antes: 170,
    entra: { eje: "y", orden: "reves", paso: 6, dur: 420, curva: "expo" },
    sale: { eje: "y", orden: "todo", paso: 0, dur: 190 },
  },
  {
    tras: 440,
    antes: 180,
    entra: { eje: "y", orden: "todo", paso: 0, dur: 400, curva: "expo" },
    sale: { eje: "y", orden: "letra", paso: 6, dur: 200 },
  },
];

export const montajeT2 = {
  // Out curves for entries, in curves for exits.
  curvas: {
    expo: "cubic-bezier(0.16, 1, 0.3, 1)",
    quint: "cubic-bezier(0.22, 1, 0.36, 1)",
    cubic: "cubic-bezier(0.33, 1, 0.68, 1)",
    inQuart: "cubic-bezier(0.5, 0, 0.75, 0)",
    inQuint: "cubic-bezier(0.64, 0, 0.78, 0)",
    inCubic: "cubic-bezier(0.32, 0, 0.67, 0)",
    inExpo: "cubic-bezier(0.7, 0, 0.84, 0)",
  },
  // The first phrase starts this long after the fonts are ready.
  primera: 60,
  // A sideways exit travels this share of the phrase's width.
  empuje: 0.3,
  tomas,
  pago: {
    entra: {
      eje: "y",
      orden: "letra",
      paso: 24,
      dur: 760,
      curva: "quint",
    } satisfies Entrada,
    // The bar fires this long after the resting words start rising; the fill trails it.
    raya: 700,
    rayaDur: 640,
    relleno: 50,
    // On a replay: the solid words leave, the bar retracts, then the first phrase starts.
    salida: { eje: "y", orden: "letra", paso: 12, dur: 260 } satisfies Salida,
    retiro: 240,
    primera: 200,
  },
};
