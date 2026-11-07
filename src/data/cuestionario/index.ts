import type { Lang } from "@i18n/ui";
import { es } from "./es";
import { en } from "./en";
import type { CopiaCuestionario } from "./tipos";

export function copiaCuestionario(lang: Lang): CopiaCuestionario {
  return lang === "en" ? en : es;
}

export type { CopiaCuestionario } from "./tipos";
export * from "./opciones";
