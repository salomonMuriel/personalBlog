# CLAUDE.md

Guía para Claude Code (claude.ai/code) al trabajar en este repositorio.

## Qué es este sitio

La práctica personal de consultoría de Salomón Muriel: **le construye
software a la medida a empresas colombianas tradicionales** que facturan
menos de USD 2M al año y cuya operación es *chinomática* —parece
automatizada, pero hay alguien haciéndola a mano—.

Seis páginas de contenido casi estático, dos islas de interactividad en JS
plano, y un objetivo único: que el visitante escriba por WhatsApp.

El rebuild descrito en `REBUILD-PLAN.md` **ya está hecho**. Ese documento
queda como registro de decisiones; este archivo describe el estado actual.

## Restricciones duras — no violar

- **Ningún precio, en ninguna forma**, y ningún comentario sobre no mostrar
  precios. Silencio sobre plata.
- **No hay blog**, ni feed de posts, ni grilla de artículos. Lo que escribe
  va a LinkedIn.
- **Español primero**, en español colombiano natural, **y siempre en
  tuteo**. Salomón nunca ustedea: `direction-36.html` está escrito de usted
  y el sitio se apartó de eso a propósito. Si toma copia de ahí, pásela a tú
  antes de publicarla. El inglés es secundario y es traducción.
- **Ningún testimonio inventado.** Los tres de `direction-36.html` eran
  marcador de posición y nunca se publicaron. La sección `Testimonios`
  sencillamente no se renderiza mientras la colección esté vacía.
- **Ignia** no aparece en el hero de la portada. Sí en la lista de lo
  construido, en la explicación de capacidad y en las preguntas; y en
  `/charlas`, donde las charlas se declaran mercadeo de la consultoría, la
  mentoría e Ignia.
- La palabra **«chinomático» nunca se explica ni se atribuye**: la página se
  la enseña al lector con la entrada de diccionario del hero.
- **La mentoría no compite con el Action Lab de Ignia.** `/mentoria` tiene
  una sección dedicada que manda para allá a quien busque cohorte.

## Comandos

```bash
npm run dev              # servidor de desarrollo (--host)
npm run build            # astro build
npm run build:quiet      # build silencioso
npm run preview          # previsualizar el build
npm run lint             # eslint
npm run format           # prettier
npm run sync             # sincronizar tipos de colecciones

npm run check:redirects  # el mapa de cutover (200 / 301 / 410 / 404)
node scripts/shots.mjs   # capturas a 375 y 1440 px + detector de desborde
```

`check:redirects` sin argumento corre contra `localhost:4321` y salta los
301, que los sirve `vercel.json` y sólo existen en Vercel. Con una URL de
deploy como argumento los verifica todos.

## Stack

Astro 6 + Tailwind 4 + Keystatic, desplegado en Vercel.

`output: "server"` existe **sólo** para que `/keystatic` se renderice bajo
demanda. Toda página de contenido lleva `export const prerender = true`, así
que el sitio público sigue siendo estático. Las rutas 410 son las otras
funciones dinámicas.

React y `@astrojs/react` están instalados **únicamente** porque el admin de
Keystatic es React. Ninguna página del sitio usa una isla.

## Mapa de rutas

| Español | Inglés | Componente |
|---|---|---|
| `/` | `/en/` | `components/home/Landing.astro` |
| `/mentoria/` | `/en/mentoring/` | `components/paginas/Mentoria.astro` |
| `/charlas/` | `/en/talks/` | `components/paginas/Charlas.astro` |
| `/sobre-mi/` | `/en/about/` | `components/paginas/SobreMi.astro` |
| `/ahora/` | `/en/now/` | `components/paginas/Ahora.astro` |

El mapa vive en `src/i18n/ui.ts` (`routes`). Las rutas **no** son paralelas
—`/mentoria/` ↔ `/en/mentoring/`—, así que ese objeto es la única fuente de
verdad para la navegación, el hreflang del `<head>` y el del sitemap
(`astro.config.ts` lo usa en `serialize`). Si agrega una página, agréguela
ahí primero.

## Dónde está la copia

- **`src/data/landing.ts`** — toda la portada, en `es` y `en`. El español es
  el de `design-directions/direction-36.html`, palabra por palabra: está
  aprobado por el cliente y no se reescribe.
- **`src/data/mentoria.ts`**, **`src/data/charlas.ts`** — igual, por página.
- **`src/data/preguntas.ts`** — las ocho preguntas de la portada. Vive
  aparte porque la página también las necesita para el JSON-LD `FAQPage`.
- **`src/i18n/ui.ts`** — navegación, pie y contacto.

Los componentes de `src/components/` sólo ponen estructura. Si va a cambiar
texto, cámbielo en `src/data/`.

## Contenido editable (Keystatic)

`/keystatic` edita los mismos MDX/MD que lee Astro. No hay base de datos ni
una segunda copia del contenido.

- En dev escribe archivos directamente. En producción abre un commit en
  GitHub (variables en `.env.example`).
- **`keystatic.config.ts` y `src/content.config.ts` tienen que coincidir.**
  Un campo que no cuadre con el Zod rompe el build al siguiente deploy.
- No ponga campos de fecha en `columns:` de una colección — el listado de
  Keystatic revienta al renderizarlos.

Colecciones y singletons:

| En Keystatic | En disco |
|---|---|
| Ahora (ES/EN) | `src/content/now/{es,en}/*.mdx` |
| Charlas (ES/EN) | `src/content/talks/{es,en}/*.md` |
| Testimonios (ES/EN) | `src/content/testimonios/{es,en}/*.md` (vacío a propósito) |
| Sobre mí (ES/EN) | `src/content/pages/about-{es,en}.mdx` |
| Cupos y capacidad | `src/content/settings/cupos.json` |

`cupos.json` es lo que mueve los contadores «2 de 4» de la portada y «3 de
5» de mentoría, la fecha de actualización y —cuando se llena— el botón, que
se reemplaza por un aviso. Se lee desde `src/utils/cupos.ts`.

El MDX de `/ahora` y `/sobre-mi` referencia imágenes de `/public`, no de
`src/assets`, para que el editor de Keystatic las pueda mostrar y guardar
sin romperlas. `src/utils/rehype-imagenes.ts` les pone `loading="lazy"` y el
`width`/`height` real leído del archivo, que es lo que mantiene el CLS en 0.

## Sistema de diseño

`design-directions/direction-36.html` es la fuente visual. Los tokens viven
en el bloque `@theme` de `src/styles/base.css`; las utilidades a mano
—`.grano`, `.rayas`, `.pintado`, `.subraya`, `.casilla`, `.reng`,
`.perfora`, `.cinta`/`.riel`, `.rv`, `.cable`, `.tog`, `.barra`— también.
Esas clases *son* el diseño; no las reemplace por utilidades sueltas.

- Colores: `papel` `papel2` `campo` `tinta` `panel` `gris` `linea` `linea2`
  `rojo` `rojo2` `rojo3`, más las cinco superficies del panel oscuro
  (`panelborde`, `panelnota`, `paneltxt`, …).
- Fuentes: `font-arch` (Archivo variable, **eje wdth** — por eso se importa
  `wdth.css` y no `index.css`), `font-slab` (Alfa Slab One), `font-mono`
  (IBM Plex Mono), `font-pen` (Caveat).
- `@utility hoja` es el ancho de página + su margen, repetido en cada
  sección.

Dos cuidados al escribir plantillas:

1. **Espacios en blanco.** En Astro un salto de línea dentro de un `<a>` o
   entre expresiones se vuelve un espacio: subrayados que se comen el
   espacio siguiente, comas separadas del texto. Donde tres trozos van
   pegados, use `set:html` (ya está hecho en `Danos`, `Montado`, `Contacto`,
   `Cupos`).
2. **El tablero de cajitas** (`TableroCajitas.astro`) dibuja los cables
   midiendo `offsetLeft/offsetTop` de cada caja. Los `id`, el orden y los
   `data-a`/`data-b`/`data-r` son un contrato con el script. Portado tal
   cual de direction-36: no redibujar la geometría.

## Las dos islas interactivas

Ambas en JS plano dentro de su `.astro`. Sin React, sin framework de islas.

- **Chinómetro** (`components/home/Chinometro.astro`): diez casillas → un
  puntaje de 0 a 100, aguja y arco SVG, y un mensaje de WhatsApp ya escrito
  con lo que el visitante marcó. No pide correo ni guarda nada.
- **Tablero de cajitas** (`components/home/TableroCajitas.astro`): el
  diagrama de HOY vs CONECTADO. Es la sección favorita del cliente.

## Instrumentación

WhatsApp es el canal principal, así que la conversión se mide ahí.

- `Layout.astro` engancha un solo listener de clics y manda a GA4
  `contacto_whatsapp`, `contacto_agenda`, `contacto_correo` y
  `contacto_linkedin`. Cada enlace de contacto lleva `data-origen="…"`, que
  es el que dice desde qué sección salió el clic.
- El evento del chinómetro además lleva `marcadas` y `puntaje`: eso es la
  señal de calificación del lead antes de que empiece la conversación.
- Las UTM de la primera visita se guardan en `sessionStorage` y se pegan al
  final del mensaje de WhatsApp del chinómetro.
- La librería de GA4 (160 kB) se baja en `requestIdleCallback` o al primer
  gesto; el shim de `gtag` queda listo de una vez para no perder eventos.
- Cal.com: un tipo de evento por oferta en `src/config.ts` (`calConsultoria`,
  `calMentoria`, `calCharla`).

## SEO y cutover

- `vercel.json` tiene los 301 de las páginas que sí sobreviven (`/about` →
  `/sobre-mi/`, `/es/*` → raíz, etc.).
- Todo lo retirado devuelve **410**, no 301: un redirect masivo hacia una
  página que no tiene que ver se vuelve *soft 404* y se queda indexado
  meses. Los 410 los sirven las rutas de `src/pages/**/[...ruta].ts` con
  `src/utils/gone.ts`.
- `public/sitemap-removed.xml` lista las ~500 URL retiradas para que Search
  Console las recorra y las saque. **Bórrelo cuando GSC reporte cero.**
- JSON-LD en `src/utils/jsonld.ts`: `ProfilePage` + `Person` en todas,
  `Service` y `FAQPage` en la portada, `BreadcrumbList` en las secundarias.
- `robots.txt` y `llms.txt` se generan (`src/pages/`). `llms.txt` se arma
  del mismo contenido que la página, así que no se desactualiza solo.

No hay paso de post-procesamiento de imágenes: Astro ya emite WebP con
`srcset`, Tailwind 4 quita el CSS muerto y Vercel comprime. Jampack se quitó
porque corría después de que el adaptador ya había copiado los estáticos a
`.vercel/output/static`, así que su trabajo nunca llegaba a producción.

## Despliegue

Vercel está conectado a GitHub y **produce producción desde `main`**. Un push
a `main` despliega el sitio en vivo; una rama abre un preview.

**No use `vercel --prod` desde el CLI.** Deja el sitio nuevo en vivo pero
`main` atrás, y el siguiente push a `main` revierte producción sin avisar.
Para publicar: merge a `main` y push.

El merge del cutover se hizo con `--no-ff` a propósito: `git revert -m 1
ea2d2b0` devuelve el sitio viejo de un comando. Lo que no se revierte es el
índice de Google —los 410 ya salieron—, así que eso es de una sola vía.

Dos cosas del entorno local que cuestan tiempo si no se saben:

- **No corra `astro build` con un `astro dev` vivo.** El build reescribe
  `node_modules/.vite/deps` con otro `configHash` mientras el dev server
  todavía tiene handles de los chunks viejos, y sale
  `TypeError: Cannot read properties of undefined (reading 'call')` en
  `EnvironmentPluginContainer.transform`. El watcher ya ignora `dist/` y
  `.vercel/`, que era la otra mitad del problema.
- **Use `--strictPort`.** Si el 4321 está ocupado, Astro se va callado al
  4322 y usted queda hablándole a un servidor viejo, posiblemente en otro
  modo de Keystatic.

Los preview tienen Deployment Protection: todo devuelve 302 al SSO de
Vercel. Para revisarlos, `check-redirects.mjs` acepta `--vercel-curl`.

## Presupuesto de rendimiento

Lighthouse móvil con compresión: **95+ en las cuatro categorías, en las diez
páginas**. Si baja de 95, lo primero que hay que mirar es el peso de las
imágenes nuevas de `/public` y si algo volvió a bloquear el render.
