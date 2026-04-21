import type { APIRoute } from "astro";
import { createHash } from "node:crypto";
import {
  insertRsvp,
  existsRecentFromIpHash,
  getConfirmed,
} from "../../../lib/cumple-35/db";
import { validateRsvp } from "../../../lib/cumple-35/validation";
import { signMascotToken } from "../../../lib/cumple-35/mascot-token";

export const prerender = false;

function getIp(request: Request, clientAddress: string): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return clientAddress || "unknown";
}

function hashIp(ip: string, name: string): string {
  return createHash("sha256")
    .update(`${ip}::${name.toLowerCase().trim()}`)
    .digest("hex");
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "JSON inválido" }, 400);
  }

  const v = validateRsvp(body);
  if (!v.ok || !v.value) return json({ ok: false, error: v.error }, 400);

  const ip = getIp(request, clientAddress);
  const ipHash = hashIp(ip, v.value.name);

  try {
    if (await existsRecentFromIpHash(ipHash)) {
      const confirmed = await getConfirmed();
      return json({ ok: true, deduped: true, ...confirmed });
    }

    // Synchronous: just persist the row. If the user didn't attach a selfie,
    // the mascot gets generated out-of-band via /api/cumple-35/mascot so the
    // RSVP write is never gated on OpenAI latency or Vercel function timeouts.
    const id = await insertRsvp({
      name: v.value.name,
      attending: v.value.attending,
      plusOne: v.value.plusOne,
      message: v.value.message,
      selfie: v.value.selfie,
      ipHash,
    });

    const confirmed = await getConfirmed();
    const needsMascot = !v.value.selfie && v.value.attending === "yes";
    return json({
      ok: true,
      id,
      needsMascot,
      mascotToken: needsMascot ? signMascotToken(id) : undefined,
      ...confirmed,
    });
  } catch (err) {
    console.error("rsvp insert failed", err);
    return json({ ok: false, error: "Error del servidor" }, 500);
  }
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
