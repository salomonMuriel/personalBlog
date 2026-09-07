import datos from "../content/settings/cupos.json";
import type { Lang } from "@i18n/ui";

export type Cupos = {
  consultoriasOcupadas: number;
  consultoriasTotal: number;
  mentoriasOcupadas: number;
  mentoriasTotal: number;
  actualizado: string;
};

/**
 * Los contadores de capacidad. Los edita Keystatic (singleton `cupos`),
 * así que la página no necesita un commit a mano cuando se llena un cupo.
 */
export const cupos = datos as Cupos;

export const consultoriasLibres = Math.max(
  0,
  cupos.consultoriasTotal - cupos.consultoriasOcupadas
);
export const mentoriasLibres = Math.max(
  0,
  cupos.mentoriasTotal - cupos.mentoriasOcupadas
);

/** "6 de septiembre de 2026" / "6 September 2026". */
export function fechaLarga(iso: string, lang: Lang): string {
  const [a, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat(lang === "es" ? "es-CO" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(a, (m ?? 1) - 1, d ?? 1)));
}
