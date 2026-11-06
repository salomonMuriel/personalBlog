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
  donde: ["cabeza", "papel", "whatsapp", "excel", "notion", "contable", "crm"],
  excels: ["perdi-la-cuenta", "10+", "4-10", "1-3", "0"],
  duele: [
    "piedra",
    "copiar",
    "excels",
    "persona",
    "dueno",
    "pedidos",
    "preguntar",
    "facturas",
  ],
  horas: ["no-se", "40+", "20-40", "5-20", "menos-5"],
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
