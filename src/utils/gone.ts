import { SITE } from "@config";
import { routes } from "@i18n/ui";

/**
 * HTTP 410 para todo lo que se retiró: el blog, los tags, los feeds, las
 * páginas de ideas/recursos/stack y el árbol viejo de /es/.
 *
 * 410 y no 301 a propósito: Google trata un redirect masivo hacia una
 * página que no tiene nada que ver como «soft 404» y lo deja indexado
 * meses. El 410 lo saca del índice mucho más rápido, que es justo lo que
 * queremos antes de relanzar. Las excepciones con enlaces entrantes de
 * verdad van con 301 en `vercel.json`.
 */

function pagina(lang: "es" | "en") {
  const es = lang === "es";
  const titulo = es ? "Esta página se retiró" : "This page was retired";
  const texto = es
    ? "El blog de este sitio se retiró. Lo que escribo hoy lo publico en LinkedIn."
    : "This site's blog was retired. What I write now goes on LinkedIn.";
  const enlaces = es
    ? ([
        [routes.home.es, "Consultoría"],
        [routes.mentoria.es, "Mentoría"],
        [routes.charlas.es, "Charlas"],
        [routes.sobreMi.es, "Sobre mí"],
        [routes.ahora.es, "Ahora"],
      ] as const)
    : ([
        [routes.home.en, "Consulting"],
        [routes.mentoria.en, "Mentoring"],
        [routes.charlas.en, "Talks"],
        [routes.sobreMi.en, "About"],
        [routes.ahora.en, "Now"],
      ] as const);

  return `<!doctype html>
<html lang="${es ? "es-CO" : "en"}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${titulo} — Salomón Muriel</title>
<style>
  :root{ color-scheme:light }
  body{ margin:0; background:#F2F1ED; color:#16171A; font:17px/1.55 "Helvetica Neue",Arial,sans-serif; }
  .h{ margin-inline:auto; max-width:1320px; padding:clamp(2rem,6vw,4rem) clamp(1.25rem,4vw,3.5rem); }
  .r{ border-top:2.5px solid #16171A; padding-top:.75rem; font:11px/1 ui-monospace,SFMono-Regular,Menlo,monospace;
      letter-spacing:.2em; text-transform:uppercase; font-weight:600; }
  h1{ margin:2rem 0 0; font-size:clamp(2rem,6vw,3.6rem); line-height:1.02; letter-spacing:-.03em; max-width:16ch; }
  p{ margin:1.25rem 0 0; max-width:52ch; color:#65665F; }
  ul{ margin:2.5rem 0 0; padding:0; list-style:none; max-width:34rem; border-top:1px solid #CFCDC4; }
  a{ display:flex; gap:1rem; align-items:center; padding:.9rem 0; border-bottom:1px solid #CFCDC4;
     color:#16171A; text-decoration:none; font-weight:700; }
  a:hover{ background:#E9E8E2 }
  a span{ font:10.5px/1 ui-monospace,SFMono-Regular,Menlo,monospace; letter-spacing:.16em; color:#65665F; width:1.75rem; }
  .b{ margin-top:2rem; font:10.5px/1.9 ui-monospace,SFMono-Regular,Menlo,monospace;
      letter-spacing:.13em; text-transform:uppercase; color:#65665F; }
</style>
</head>
<body>
<div class="h">
  <div class="r">HTTP 410 · ${es ? "Retirada" : "Gone"}</div>
  <h1>${titulo}</h1>
  <p>${texto}</p>
  <ul>
    ${enlaces
      .map(
        ([href, t], i) =>
          `<li><a href="${href}"><span>${String(i + 1).padStart(2, "0")}</span>${t}</a></li>`
      )
      .join("\n    ")}
  </ul>
  <p class="b">${SITE.website.replace("https://", "")} · Bogotá</p>
</div>
</body>
</html>
`;
}

const cuerpos = { es: pagina("es"), en: pagina("en") };

/** Respuesta 410 lista para devolver desde un endpoint de Astro. */
export function retirada(lang: "es" | "en" = "es") {
  return new Response(cuerpos[lang], {
    status: 410,
    statusText: "Gone",
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      // Sin caché larga: si mañana se reusa la URL, no queda pegada.
      "Cache-Control": "public, max-age=0, s-maxage=3600",
      "X-Robots-Tag": "noindex",
    },
  });
}
