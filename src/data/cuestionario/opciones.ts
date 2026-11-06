// Option ids are the contract between every questionnaire skin and
// /api/cuestionario. Copy lives in es.ts / en.ts, keyed by these ids.
export const OPCIONES = {
  sector: [
    "comercio",
    "manufactura",
    "alimentos",
    "moda",
    "servicios",
    "construccion",
    "educacion",
    "otra",
  ],
  tamano: ["1-4", "5-15", "16-40", "41-100", "100+"],
  donde: ["excel", "whatsapp", "papel", "contable", "crm", "notion", "cabeza"],
  excels: ["0", "1-3", "4-10", "10+", "perdi-la-cuenta"],
  duele: [
    "copiar",
    "excels",
    "preguntar",
    "pedidos",
    "facturas",
    "dueno",
    "persona",
    "software",
    "crecer",
    "piedra",
  ],
  horas: ["menos-5", "5-20", "20-40", "40+", "no-se"],
  cuando: ["ya", "trimestre", "semestre", "explorando"],
  decide: ["yo", "socios", "otro"],
} as const;

export type ClavePregunta = keyof typeof OPCIONES;
export type IdOpcion<K extends ClavePregunta> = (typeof OPCIONES)[K][number];

export const MULTIPLES: Partial<Record<ClavePregunta, number>> = {
  donde: 7,
  duele: 3,
};

export const ORDEN: ClavePregunta[] = [
  "sector",
  "tamano",
  "donde",
  "excels",
  "duele",
  "horas",
  "cuando",
  "decide",
];

export type Respuestas = {
  sector: IdOpcion<"sector">;
  sectorOtro?: string;
  tamano: IdOpcion<"tamano">;
  donde: IdOpcion<"donde">[];
  excels: IdOpcion<"excels">;
  duele: IdOpcion<"duele">[];
  horas: IdOpcion<"horas">;
  cuando: IdOpcion<"cuando">;
  decide: IdOpcion<"decide">;
};

export type Contacto = {
  nombre: string;
  empresa: string;
  whatsapp: string;
  correo?: string;
  mensaje?: string;
};

export type Encaje = "si" | "temprano" | "explorando";
