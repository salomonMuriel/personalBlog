import { Resend } from "resend";
import { EMAIL_FROM, EMAIL_FROM_NAME, RESEND_API_KEY } from "astro:env/server";
import { CONTACTO } from "@config";
import { es as copia } from "@data/cuestionario/es";
import type { Encaje } from "@data/cuestionario/opciones";
import type { Envio } from "@utils/cuestionario-esquema";
import { horasAlAnio } from "@utils/encaje";

const ENCAJE: Record<Encaje, string> = {
  si: "Encaja",
  temprano: "Muy temprano (mentoría)",
  explorando: "Explorando",
};

const escapar = (s: string) =>
  s.replace(
    /[&<>"']/g,
    c =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ] ?? c
  );

// Colombian mobiles are typed without the country code more often than not.
export function enlaceWhatsapp(numero: string): string {
  const digitos = numero.replace(/\D/g, "");
  const completo =
    digitos.length === 10 && digitos.startsWith("3") ? `57${digitos}` : digitos;
  return `https://wa.me/${completo}`;
}

function filas(envio: Envio): [string, string][] {
  const { respuestas: r, contacto: c } = envio;
  const p = copia.preguntas;
  const anio = horasAlAnio(r.horas);
  return [
    ["Nombre", c.nombre],
    ["Empresa", c.empresa],
    ["WhatsApp", c.whatsapp],
    ["Correo", c.correo || "—"],
    [
      "Sector",
      r.sector === "otra" && r.sectorOtro
        ? `Otra: ${r.sectorOtro}`
        : p.sector.opciones[r.sector],
    ],
    ["Personas", p.tamano.opciones[r.tamano]],
    [
      "Dónde vive la información",
      r.donde.map(d => p.donde.opciones[d]).join(", "),
    ],
    ["Excel en la operación", p.excels.opciones[r.excels]],
    ["Lo que más pesa", r.duele.map(d => p.duele.opciones[d]).join(" · ")],
    [
      "Horas a la semana",
      `${p.horas.opciones[r.horas]}${anio ? ` (${anio[1] === null ? `más de ${anio[0]}` : `${anio[0]} a ${anio[1]}`} al año)` : ""}`,
    ],
    ["Para cuándo", p.cuando.opciones[r.cuando]],
    ["Quién decide", p.decide.opciones[r.decide]],
    ["Mensaje", c.mensaje || "—"],
    ["Idioma · versión", `${envio.idioma} · ${envio.version}`],
    ["Página", envio.origen.pagina || "—"],
    ["Referrer", envio.origen.referrer || "—"],
    [
      "UTM",
      Object.entries(envio.origen.utm ?? {})
        .map(([k, v]) => `${k}=${v}`)
        .join(" · ") || "—",
    ],
  ];
}

function html(envio: Envio, encaje: Encaje): string {
  const wa = enlaceWhatsapp(envio.contacto.whatsapp);
  const tabla = filas(envio)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#6b6a65;vertical-align:top;white-space:nowrap">${escapar(k)}</td><td style="padding:6px 0">${escapar(v)}</td></tr>`
    )
    .join("");
  return `<div style="font-family:system-ui,sans-serif;font-size:15px;color:#16171a">
<p style="font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#a32a1c;margin:0 0 6px">${ENCAJE[encaje]}</p>
<h1 style="font-size:22px;margin:0 0 16px">${escapar(envio.contacto.nombre)} · ${escapar(envio.contacto.empresa)}</h1>
<p style="margin:0 0 18px"><a href="${wa}" style="color:#a32a1c;font-weight:700">Escribirle por WhatsApp</a></p>
<table style="border-collapse:collapse">${tabla}</table>
</div>`;
}

function textoPlano(envio: Envio, encaje: Encaje): string {
  const lineas = filas(envio).map(([k, v]) => `${k}: ${v}`);
  return [
    ENCAJE[encaje],
    enlaceWhatsapp(envio.contacto.whatsapp),
    "",
    ...lineas,
  ].join("\n");
}

export async function enviarCorreoCuestionario(
  envio: Envio,
  encaje: Encaje
): Promise<boolean> {
  if (!RESEND_API_KEY || !EMAIL_FROM) {
    console.error("cuestionario: Resend is not configured, email skipped");
    return false;
  }
  const resend = new Resend(RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: `${EMAIL_FROM_NAME ?? "salomonmuriel.com"} <${EMAIL_FROM}>`,
    to: CONTACTO.correo,
    replyTo: envio.contacto.correo || undefined,
    subject: `${ENCAJE[encaje]} · ${envio.contacto.empresa} (${copia.preguntas.tamano.opciones[envio.respuestas.tamano]} personas)`,
    html: html(envio, encaje),
    text: textoPlano(envio, encaje),
  });
  if (error) {
    console.error("cuestionario: Resend error", error);
    return false;
  }
  return true;
}
