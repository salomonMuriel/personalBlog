import type { Sistema } from "@data/landing";

export type Forma = "ventana" | "celular" | "recorte";

// x, y, w: % of the collage box. region: [x, y, width, height] of the screen
// in CSS px (captures are @2x, so 1440x900 or 390x844). A ventana or celular
// without region shows the whole screen from the top.
export type Pieza = {
  archivo: string;
  forma: Forma;
  x: number;
  y: number;
  w: number;
  z?: number;
  region?: [number, number, number, number];
};

// Width over height of the collage box at every size.
export const PROPORCION = 1.1;

// prettier-ignore
export const composiciones: Record<Sistema["clave"], Pieza[]> = {
  aura: [
    { archivo: "aura-hoy-1440", forma: "ventana", x: 0, y: 0, w: 70, z: 1 },
    { archivo: "aura-hoy-1440", forma: "recorte", x: 53, y: 9, w: 33, z: 3, region: [1129, 238, 279, 240] },
    { archivo: "aura-movimientos-1440", forma: "recorte", x: 0, y: 53.1, w: 31, z: 2, region: [582, 196, 278, 382] },
    { archivo: "aura-ficha-1440", forma: "recorte", x: 34, y: 58, w: 38, z: 2, region: [105, 315, 330, 270] },
    { archivo: "aura-whatsapp-390", forma: "celular", x: 76, y: 47.2, w: 24, z: 3 },
  ],
  guiacolegio: [
    { archivo: "guiacolegio-tablero-1440", forma: "ventana", x: 24, y: 0, w: 76, z: 1 },
    { archivo: "guiacolegio-analitica-1440", forma: "recorte", x: 0, y: 30, w: 46, z: 3, region: [850, 400, 565, 275] },
    { archivo: "guiacolegio-hoy-1440", forma: "recorte", x: 0, y: 63.5, w: 62, z: 2, region: [262, 455, 560, 300] },
    { archivo: "guiacolegio-hoy-1440", forma: "recorte", x: 66, y: 63.8, w: 34, z: 3, region: [1108, 455, 300, 290] },
  ],
  visible: [
    { archivo: "visible-portal-390", forma: "recorte", x: 0, y: 0, w: 45.5, z: 1, region: [24, 22, 340, 679] },
    { archivo: "visible-portal-390", forma: "recorte", x: 50, y: 2, w: 50, z: 2, region: [50, 75, 289, 80] },
    { archivo: "visible-portal-390", forma: "recorte", x: 50, y: 41, w: 50, z: 2, region: [50, 218, 289, 93] },
    { archivo: "visible-portal-390", forma: "recorte", x: 50, y: 83.4, w: 50, z: 2, region: [50, 493, 289, 87] },
  ],
  colegio: [
    { archivo: "consto-revisar-1440", forma: "ventana", x: 0, y: 0, w: 72, z: 1 },
    { archivo: "consto-coordinacion-1440", forma: "recorte", x: 56, y: 6, w: 44, z: 3, region: [262, 238, 500, 225] },
    { archivo: "consto-revisar-1440", forma: "recorte", x: 0, y: 63.5, w: 70, z: 2, region: [362, 480, 718, 340] },
    { archivo: "memoplan-semana-390", forma: "celular", x: 76, y: 47.2, w: 24, z: 3 },
  ],
  ignia: [
    { archivo: "ignia-crm-oportunidades-1440", forma: "ventana", x: 0, y: 0, w: 70, z: 1 },
    { archivo: "ignia-diagnostico-pregunta-1440", forma: "recorte", x: 58, y: 6, w: 42, z: 3, region: [415, 220, 610, 420] },
    { archivo: "ignia-crm-automatizaciones-1440", forma: "recorte", x: 56, y: 50, w: 44, z: 2, region: [257, 144, 575, 230] },
    { archivo: "ignia-crm-persona-1440", forma: "recorte", x: 0, y: 67.4, w: 44, z: 2, region: [258, 196, 490, 330] },
    { archivo: "ignia-crm-hoy-1440", forma: "recorte", x: 46, y: 84.5, w: 54, z: 3, region: [257, 128, 460, 120] },
  ],
  entrehilos: [],
};
