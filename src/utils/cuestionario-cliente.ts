import type { CopiaCuestionario } from "@data/cuestionario/tipos";
import type { Contacto, Respuestas } from "@data/cuestionario/opciones";

// Same key Layout.astro writes the first visit's UTMs under.
const LLAVE_ORIGEN = "sm_origen";

export type Origen = {
  pagina: string;
  referrer?: string;
  utm?: Record<string, string>;
};

export function leerOrigen(): Origen {
  let utm: Record<string, string> | undefined;
  try {
    const raw = sessionStorage.getItem(LLAVE_ORIGEN);
    if (raw) utm = JSON.parse(raw);
  } catch {
    utm = undefined;
  }
  return {
    pagina: location.pathname,
    referrer: document.referrer || undefined,
    utm,
  };
}

const minusculaInicial = (t: string) => t.charAt(0).toLowerCase() + t.slice(1);

export function mensajeWhatsapp(
  copia: CopiaCuestionario,
  r: Partial<Respuestas>,
  c: Partial<Contacto>,
  origen?: Origen
): string {
  const p = copia.preguntas;
  const w = copia.wa;
  const lineas = [w.encabezado];

  const empresa = [
    c.empresa,
    r.sector &&
      (r.sector === "otra" && r.sectorOtro
        ? r.sectorOtro
        : p.sector.opciones[r.sector]),
    r.tamano && `${p.tamano.opciones[r.tamano]} ${w.personas}`,
  ].filter(Boolean);
  if (empresa.length) lineas.push(`${w.empresa}: ${empresa.join(", ")}`);

  if (r.duele?.length) {
    lineas.push(
      `${w.pesa}: ${r.duele.map(d => minusculaInicial(p.duele.opciones[d])).join("; ")}`
    );
  }
  if (r.excels) lineas.push(`${w.excels}: ${p.excels.opciones[r.excels]}`);
  if (r.cuando) lineas.push(`${w.cuando}: ${p.cuando.opciones[r.cuando]}`);

  const utm = origen?.utm;
  const etiqueta = utm
    ? [utm.utm_source, utm.utm_campaign].filter(Boolean).join(" / ")
    : "";
  if (etiqueta) lineas.push(`${w.procedencia}: ${etiqueta}`);

  if (c.nombre) lineas.push("", c.nombre);
  return lineas.join("\n");
}
