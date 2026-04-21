import type { APIRoute } from "astro";
import {
  composeEditPrompt,
  normalizeSourcePng,
  callEdit,
} from "../../../lib/cumple-35/openai";

export const prerender = false;

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export const POST: APIRoute = async ({ request }) => {
  let incoming: FormData;
  try {
    incoming = await request.formData();
  } catch {
    return json({ ok: false, error: "Form inválido" }, 400);
  }

  const raw = incoming.get("image");
  if (!(raw instanceof File) || raw.size === 0) {
    return json({ ok: false, error: "Falta la imagen" }, 400);
  }
  if (raw.size > 8 * 1024 * 1024) {
    return json({ ok: false, error: "Imagen muy grande (máx 8MB)" }, 413);
  }

  const style = String(incoming.get("style") ?? "");
  const multiple = String(incoming.get("multiple") ?? "") === "true";
  const prompt = composeEditPrompt(style, multiple);

  let sourcePng: Buffer;
  try {
    sourcePng = await normalizeSourcePng(raw);
  } catch {
    return json({ ok: false, error: "No pude leer la imagen" }, 400);
  }

  const result = await callEdit(sourcePng, prompt);
  if (!result.ok) return json(result, 502);
  return json({ ok: true, dataUrl: result.dataUrl });
};
