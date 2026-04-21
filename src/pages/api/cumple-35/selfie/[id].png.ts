import type { APIRoute } from "astro";
import { getSelfie } from "../../../../lib/cumple-35/db";

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return new Response(null, { status: 404 });
  }

  try {
    const selfie = await getSelfie(id);
    if (!selfie || !selfie.startsWith("data:image/")) {
      return new Response(null, { status: 404 });
    }
    const m = selfie.match(/^data:(image\/[^;]+);base64,(.+)$/);
    if (!m) return new Response(null, { status: 404 });
    const bytes = Buffer.from(m[2], "base64");
    return new Response(bytes, {
      status: 200,
      headers: {
        "Content-Type": m[1],
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (err) {
    console.error("selfie fetch failed", err);
    return new Response(null, { status: 500 });
  }
};
