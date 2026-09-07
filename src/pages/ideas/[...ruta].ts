import type { APIRoute } from "astro";
import { retirada } from "@utils/gone";

// El árbol viejo de /es/ murió con el cambio de idioma raíz: el español
// ahora se sirve desde /. Lo que tenía enlaces entrantes se redirige en
// `vercel.json`, que corre antes que esta función; el resto cae acá.
export const prerender = false;
export const GET: APIRoute = () => retirada("es");
