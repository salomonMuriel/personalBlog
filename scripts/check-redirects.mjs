/**
 * Verifica el mapa de cutover: qué debe dar 200, qué 301 y a dónde, y qué
 * debe dar 410.
 *
 *   node scripts/check-redirects.mjs                   # contra dev (localhost:4321)
 *   node scripts/check-redirects.mjs https://…         # contra el deploy
 *   node scripts/check-redirects.mjs https://… --vercel-curl
 *
 * Los 301 los sirve `vercel.json`, que sólo corre en Vercel: contra el
 * servidor de desarrollo esas filas se saltan y se avisa.
 *
 * `--vercel-curl` enruta cada petición por `vercel curl`, que se salta la
 * protección de despliegue. Es la única manera de revisar un preview con
 * Vercel Authentication prendida, donde si no todo devuelve 302 al SSO.
 */

import { execFile } from "node:child_process";
import { promisify } from "node:util";

const ejecutar = promisify(execFile);

const base = (process.argv[2] ?? "http://localhost:4321").replace(/\/$/, "");
const esLocal = /localhost|127\.0\.0\.1/.test(base);
const porVercel = process.argv.includes("--vercel-curl");

/** [ruta, esperado, destino?] — `esperado` es 200 | 301 | 404 | 410 */
const casos = [
  // ── las seis páginas vivas ─────────────────────────────────────────
  ["/", 200],
  ["/mentoria/", 200],
  ["/charlas/", 200],
  ["/sobre-mi/", 200],
  ["/ahora/", 200],
  ["/en/", 200],
  ["/en/mentoring/", 200],
  ["/en/talks/", 200],
  ["/en/about/", 200],
  ["/en/now/", 200],

  // ── infraestructura ────────────────────────────────────────────────
  ["/robots.txt", 200],
  ["/llms.txt", 200],
  ["/og.png", 200],
  ["/en/og.png", 200],
  // El sitemap sólo lo genera `astro build`; en dev no existe.
  ["/sitemap-index.xml", esLocal ? 404 : 200],
  ["/sitemap-removed.xml", 200],
  ["/keystatic", 200],

  // ── el blog: 410, no 301 ───────────────────────────────────────────
  ["/es/posts/001-sense-of-wonder/", 410],
  ["/en/posts/001-sense-of-wonder/", 410],
  ["/es/posts/", 410],
  ["/en/posts/", 410],
  ["/posts/algo/", 410],
  ["/es/tags/", 410],
  ["/en/tags/", 410],
  ["/es/tags/ia/", 410],
  ["/en/tags/ai/", 410],
  ["/tags/ia/", 410],
  ["/rss.xml", 410],
  ["/en/rss.xml", 410],
  ["/es/rss.xml", 410],

  // ── secciones retiradas ────────────────────────────────────────────
  ["/es/search/", 410],
  ["/en/search", 410],
  ["/es/ideas/", 410],
  ["/en/ideas/", 410],
  ["/es/resources/", 410],
  ["/en/resources", 410],
  ["/es/uses/", 410],
  ["/en/uses", 410],
  ["/experimentos/cumple-35/", 410],

  // ── 301 de páginas que sí siguen existiendo (los sirve vercel.json) ─
  ["/es/", 301, "/"],
  ["/about/", 301, "/sobre-mi/"],
  ["/es/about/", 301, "/sobre-mi/"],
  ["/now/", 301, "/ahora/"],
  ["/es/now/", 301, "/ahora/"],
  ["/es/talks/", 301, "/charlas/"],
  ["/es/talks/confnodo/", 301, "/charlas/"],
  ["/en/talks/confnodo/", 301, "/en/talks/"],
  ["/companies/", 301, "/"],
  ["/es/companies/", 301, "/"],
  ["/en/companies/", 301, "/en/"],
  ["/es/before/", 301, "/ahora/"],
  ["/en/before/", 301, "/en/now/"],
  // Con `:slug*` estas cuatro se caían al 410: el patrón no captura la
  // barra final. Quedan como caso de prueba para que no vuelva a pasar.
  ["/es/before/2024-04-23/", 301, "/ahora/"],
  ["/en/before/2024-04-23/", 301, "/en/now/"],
  ["/es/talks/makers-mindset-entrepreneurship/", 301, "/charlas/"],
  ["/en/talks/makers-mindset-entrepreneurship/", 301, "/en/talks/"],

  // ── lo que de verdad no existe sigue siendo 404 ────────────────────
  ["/una-ruta-que-nunca-existio/", 404],
  ["/en/una-ruta-que-nunca-existio/", 404],
];

/** Devuelve { estado, ubicacion } sin seguir la redirección. */
async function pedir(ruta) {
  if (!porVercel) {
    const res = await fetch(base + ruta, { redirect: "manual" });
    return { estado: res.status, ubicacion: res.headers.get("location") };
  }
  const { stdout } = await ejecutar(
    "npx",
    [
      "vercel",
      "curl",
      base + ruta,
      "--yes",
      "--",
      "-s",
      "-o",
      "/dev/null",
      "-w",
      "%{http_code} %{redirect_url}",
    ],
    { maxBuffer: 1024 * 1024 }
  );
  const linea = stdout.trim().split("\n").pop() ?? "";
  const [codigo, destino] = linea.split(" ");
  return { estado: Number(codigo), ubicacion: destino || null };
}

let fallas = 0;
let saltados = 0;

for (const [ruta, esperado, destino] of casos) {
  if (esperado === 301 && esLocal) {
    saltados++;
    continue;
  }
  let estado, ubicacion;
  try {
    ({ estado, ubicacion } = await pedir(ruta));
  } catch (err) {
    console.log(`FALLA   ${ruta} — no respondió (${err.message})`);
    fallas++;
    continue;
  }

  // Vercel emite 308 para `"permanent": true`; para SEO vale lo mismo.
  const ok =
    esperado === 301
      ? (estado === 301 || estado === 308) &&
        (ubicacion ?? "").replace(base, "") === destino
      : estado === esperado;

  if (ok) {
    console.log(`ok      ${String(estado).padEnd(3)} ${ruta}`);
  } else {
    console.log(
      `FALLA   ${String(estado).padEnd(3)} ${ruta} — esperaba ${esperado}${
        destino ? ` → ${destino}` : ""
      }${ubicacion ? ` (fue a ${ubicacion})` : ""}`
    );
    fallas++;
  }
}

if (saltados) {
  console.log(
    `\n${saltados} redirecciones 301 saltadas: las sirve vercel.json y no corren en local.` +
      `\nCórralo otra vez contra el deploy:  node scripts/check-redirects.mjs https://www.salomonmuriel.com`
  );
}
console.log(fallas === 0 ? "\nTodo en orden." : `\n${fallas} fallas.`);
process.exit(fallas === 0 ? 0 : 1);
