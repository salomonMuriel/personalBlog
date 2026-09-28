import type { Lang } from "@i18n/ui";
import { es, type CopiaFicha } from "./es";
import { en } from "./en";

export type { CopiaFicha, Empresa, Frente } from "./es";

export const rutasFicha = { es: "/ficha/", en: "/en/brief/" } as const;

export const pdfFicha = {
  es: "/prensa/salomon-muriel-ficha.pdf",
  en: "/prensa/salomon-muriel-brief.pdf",
} as const;

export function copiaFicha(lang: Lang): CopiaFicha {
  return lang === "en" ? en : es;
}
