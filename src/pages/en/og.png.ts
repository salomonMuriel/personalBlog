import type { APIRoute } from "astro";
import { generateOgImageForSite } from "@utils/generateOgImages";

export const prerender = true;

export const GET: APIRoute = async () =>
  new Response(new Uint8Array(await generateOgImageForSite("en")), {
    headers: { "Content-Type": "image/png" },
  });
