import { createHmac, timingSafeEqual } from "node:crypto";

function getSecret(): string {
  const s =
    process.env.MASCOT_TOKEN_SECRET ??
    (import.meta as unknown as { env?: Record<string, string> }).env
      ?.MASCOT_TOKEN_SECRET;
  if (!s) {
    // Dev fallback — harmless since no real guests can hit dev. Production
    // must set MASCOT_TOKEN_SECRET in Vercel env.
    return "cumple-35-local-dev-fallback";
  }
  return s;
}

const TTL_MS = 10 * 60 * 1000; // 10 minutes

export function signMascotToken(id: number): string {
  const exp = Date.now() + TTL_MS;
  const payload = `${id}.${exp}`;
  const sig = createHmac("sha256", getSecret()).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export function verifyMascotToken(token: string, expectedId: number): boolean {
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [idStr, expStr, sig] = parts;
  const id = Number(idStr);
  const exp = Number(expStr);
  if (!Number.isInteger(id) || !Number.isFinite(exp)) return false;
  if (id !== expectedId) return false;
  if (Date.now() > exp) return false;
  const expected = createHmac("sha256", getSecret())
    .update(`${id}.${exp}`)
    .digest("hex");
  try {
    return timingSafeEqual(
      Buffer.from(sig, "hex"),
      Buffer.from(expected, "hex")
    );
  } catch {
    return false;
  }
}
