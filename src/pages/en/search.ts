import type { APIRoute } from "astro";
import { retirada } from "@utils/gone";

export const prerender = false;
export const GET: APIRoute = () => retirada("en");
