import type { APIRoute } from "astro";
import { generateOgImageForSite } from "@utils/generateOgImages";

export const GET: APIRoute = async () => {
  try {
    return new Response(await generateOgImageForSite(), {
      headers: { "Content-Type": "image/png" },
    });
  } catch {
    return new Response(null, { status: 500 });
  }
};
