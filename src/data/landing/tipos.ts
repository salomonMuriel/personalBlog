export type Falla = {
  n: string;
  quien: string;
  antes: string;
  marcado: string;
  despues: string;
  nota: string;
  manuscrita: boolean;
  giro?: string;
};

export type Renglon = { n: string; t: string; d: string; resaltado: boolean };

export type Sistema = {
  clave:
    | "aura"
    | "guiacolegio"
    | "visible"
    | "colegio"
    | "ignia"
    | "entrehilos";
  sector: string;
  nombre: string;
  que: string;
  reemplazo?: string;
  alt: string;
};
