import type { Encaje, Respuestas } from "@data/cuestionario/opciones";

export function calcularEncaje(
  r: Pick<Respuestas, "tamano" | "cuando">
): Encaje {
  if (r.tamano === "1-4") return "temprano";
  if (r.cuando === "explorando") return "explorando";
  return "si";
}

const HORAS_SEMANA: Partial<
  Record<Respuestas["horas"], [number, number | null]>
> = {
  "menos-5": [1, 5],
  "5-20": [5, 20],
  "20-40": [20, 40],
  "40+": [40, null],
};

// 48 working weeks: a conservative year, so the figure never sounds inflated.
const SEMANAS_AL_ANIO = 48;

export function horasAlAnio(
  horas: Respuestas["horas"]
): [number, number | null] | null {
  const rango = HORAS_SEMANA[horas];
  if (!rango) return null;
  const [desde, hasta] = rango;
  return [
    desde * SEMANAS_AL_ANIO,
    hasta === null ? null : hasta * SEMANAS_AL_ANIO,
  ];
}
