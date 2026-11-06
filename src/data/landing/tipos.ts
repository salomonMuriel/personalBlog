export type Ilustracion =
  | "torre-excel"
  | "chat-pedidos"
  | "tabla-piedra"
  | "una-cajita"
  | "llaves";

export type Falla = {
  n: string;
  titulo: string;
  texto: string;
  nota: string;
  imagen: Ilustracion;
  alt: string;
};

export type Nodo = { titulo: string; sub: string };

export type Columna = { t: string; d: string };

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
