import type { APIRoute } from "astro";
import {
  callGenerate,
  composeDefaultMascotPrompt,
} from "../../../lib/cumple-35/openai";
import { setSelfieIfMissing } from "../../../lib/cumple-35/db";
import { verifyMascotToken } from "../../../lib/cumple-35/mascot-token";

export const prerender = false;
// OpenAI image gen can take 10-20s; give the function enough headroom on
// Vercel. Ignored on Hobby tier (capped at 10s there) — consider Pro.
export const maxDuration = 60;

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export const POST: APIRoute = async ({ request }) => {
  let body: { id?: number; mascotToken?: string; plusOne?: boolean };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return json({ ok: false, error: "JSON inválido" }, 400);
  }

  const id = Number(body.id);
  const token = String(body.mascotToken ?? "");
  const plusOne = body.plusOne === true;

  if (!Number.isInteger(id) || id <= 0) {
    return json({ ok: false, error: "id inválido" }, 400);
  }
  if (!verifyMascotToken(token, id)) {
    return json({ ok: false, error: "Token inválido o expirado" }, 403);
  }

  const result = await callGenerate(composeDefaultMascotPrompt(plusOne));
  if (!result.ok) {
    // Swallow errors — the RSVP is already saved. Return ok:false for
    // diagnostics but avoid surfacing as a failure to the user.
    return json({ ok: false, error: result.error }, 502);
  }

  const updated = await setSelfieIfMissing(id, result.dataUrl);
  return json({ ok: true, updated, dataUrl: result.dataUrl });
};
