import type { APIRoute } from "astro";
import { eq } from "drizzle-orm";
import { db } from "@db/client";
import { respuestasCuestionario } from "@db/schema";
import { esquemaEnvio } from "@utils/cuestionario-esquema";
import { calcularEncaje } from "@utils/encaje";
import { enviarCorreoCuestionario } from "@utils/correo-cuestionario";

export const prerender = false;

// Nobody reads eight questions and fills a form in under this.
const MS_MINIMO = 4000;

const json = (cuerpo: unknown, status = 200) =>
  new Response(JSON.stringify(cuerpo), {
    status,
    headers: { "content-type": "application/json" },
  });

export const POST: APIRoute = async ({ request }) => {
  let cuerpo: unknown;
  try {
    cuerpo = await request.json();
  } catch {
    return json({ ok: false, error: "json" }, 400);
  }

  const resultado = esquemaEnvio.safeParse(cuerpo);
  if (!resultado.success) {
    return json({ ok: false, error: "validacion" }, 400);
  }
  const envio = resultado.data;
  const encaje = calcularEncaje(envio.respuestas);

  // Bots get the same answer as people, so they learn nothing.
  if (envio.web || envio.msLlenado < MS_MINIMO) {
    return json({ ok: true, encaje });
  }

  const { respuestas: r, contacto: c } = envio;
  let id: string;
  try {
    const [fila] = await db
      .insert(respuestasCuestionario)
      .values({
        idioma: envio.idioma,
        version: envio.version,
        encaje,
        nombre: c.nombre,
        empresa: c.empresa,
        whatsapp: c.whatsapp,
        correo: c.correo || null,
        mensaje: c.mensaje || null,
        sector: r.sector,
        sectorOtro: r.sectorOtro || null,
        tamano: r.tamano,
        donde: r.donde,
        excels: r.excels,
        duele: r.duele,
        horas: r.horas,
        cuando: r.cuando,
        decide: r.decide,
        origen: envio.origen,
      })
      .returning({ id: respuestasCuestionario.id });
    id = fila.id;
  } catch (error) {
    console.error("cuestionario: insert failed", error);
    const enviado = await enviarCorreoCuestionario(envio, encaje);
    return enviado
      ? json({ ok: true, encaje })
      : json({ ok: false, error: "guardar" }, 500);
  }

  const enviado = await enviarCorreoCuestionario(envio, encaje);
  if (enviado) {
    await db
      .update(respuestasCuestionario)
      .set({ correoEnviado: true })
      .where(eq(respuestasCuestionario.id, id))
      .catch(error => console.error("cuestionario: flag update failed", error));
  }

  return json({ ok: true, encaje });
};
