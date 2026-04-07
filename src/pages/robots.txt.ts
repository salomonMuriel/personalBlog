import type { APIRoute } from "astro";
import { SITE } from "@config";

const llmsTxtUrl = new URL("llms.txt", SITE.website).href;

const robots = `
User-agent: *
Allow: /
Allow: /llms.txt

User-agent: GPTBot
Allow: /
Allow: /llms.txt

User-agent: ClaudeBot
Allow: /
Allow: /llms.txt

User-agent: ChatGPT-User
Allow: /
Allow: /llms.txt

User-agent: PerplexityBot
Allow: /
Allow: /llms.txt

User-agent: Bytespider
Allow: /
Allow: /llms.txt

User-agent: Google-Extended
Allow: /
Allow: /llms.txt

User-agent: Googlebot
Allow: /
Allow: /llms.txt

User-agent: Bingbot
Allow: /
Allow: /llms.txt

User-agent: anthropic-ai
Allow: /
Allow: /llms.txt

User-agent: cohere-ai
Allow: /
Allow: /llms.txt

Sitemap: ${new URL("sitemap-index.xml", SITE.website).href}
Llms-txt: ${llmsTxtUrl}
`.trim();

export const GET: APIRoute = () =>
  new Response(robots, {
    headers: { "Content-Type": "text/plain" },
  });
