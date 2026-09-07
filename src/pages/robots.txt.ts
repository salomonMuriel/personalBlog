import type { APIRoute } from "astro";
import { SITE } from "@config";

export const prerender = true;

// Los rastreadores de modelos de lenguaje entran igual que los buscadores:
// esta página es la única fuente sobre a qué se dedica Salomón.
const agentes = [
  "*",
  "Googlebot",
  "Bingbot",
  "Google-Extended",
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Applebot",
  "Applebot-Extended",
  "Amazonbot",
  "meta-externalagent",
  "Bytespider",
  "cohere-ai",
];

const cuerpo = `${agentes
  .map(a => `User-agent: ${a}\nAllow: /\nDisallow: /keystatic\n`)
  .join("\n")}
Sitemap: ${new URL("sitemap-index.xml", SITE.website).href}
Sitemap: ${new URL("sitemap-removed.xml", SITE.website).href}

# El resumen del sitio para modelos de lenguaje vive en
# ${new URL("llms.txt", SITE.website).href}
# Va como comentario: \`Llms-txt:\` no es una directiva del estándar y los
# validadores la marcan como error.
`;

export const GET: APIRoute = () =>
  new Response(cuerpo, { headers: { "Content-Type": "text/plain" } });
