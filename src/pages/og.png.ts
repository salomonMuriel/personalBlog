import type { APIRoute } from "astro";
import { generateOgImageForSite } from "@utils/generateOgImages";

export const GET: APIRoute = async () => {
  try {
    return new Response(await generateOgImageForSite(), {
      headers: { "Content-Type": "image/png" },
    });
  } catch {
    // Return a 1x1 transparent PNG when OG generation fails (e.g., no network for fonts)
    const pixel = Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
      "base64"
    );
    return new Response(pixel, {
      headers: { "Content-Type": "image/png" },
    });
  }
};
