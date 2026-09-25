import type { APIRoute } from "astro";
import { retirada } from "@utils/gone";

// Lo que tiene enlaces entrantes lo redirige `vercel.json` antes de llegar acá.
export const prerender = false;
export const GET: APIRoute = () => retirada("es");
