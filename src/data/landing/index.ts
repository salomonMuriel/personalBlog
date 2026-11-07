import type { Lang } from "@i18n/ui";
import { es } from "./es";
import { en } from "./en";

export type { Columna, Falla, Ilustracion, Nodo, Sistema } from "./tipos";
export type Copia = typeof es;

export const landing = { es, en } as const;

export function copia(lang: Lang): Copia {
  return (lang === "en" ? en : es) as unknown as Copia;
}
