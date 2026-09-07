/**
 * Captura las páginas a 375 y 1440 px y avisa si alguna se desborda a lo
 * ancho. Uso:  node scripts/shots.mjs [baseUrl] [carpetaSalida]
 * Necesita el sitio corriendo (npm run dev o npm run preview).
 */
import puppeteer from "puppeteer";
import { mkdirSync } from "fs";

const base = process.argv[2] ?? "http://localhost:4321";
const out = process.argv[3] ?? "/tmp/shots";
const rutas = process.env.RUTAS
  ? process.env.RUTAS.split(",")
  : [
      "/",
      "/mentoria/",
      "/charlas/",
      "/sobre-mi/",
      "/ahora/",
      "/en/",
      "/en/mentoring/",
      "/en/talks/",
      "/en/about/",
      "/en/now/",
      "/404",
    ];

const anchos = [
  { w: 375, h: 812, nombre: "movil" },
  { w: 1440, h: 900, nombre: "escritorio" },
];

mkdirSync(out, { recursive: true });

const navegador = await puppeteer.launch({ headless: "new" });
let fallas = 0;

for (const { w, h, nombre } of anchos) {
  const pagina = await navegador.newPage();
  await pagina.setViewport({ width: w, height: h, deviceScaleFactor: 1 });

  for (const ruta of rutas) {
    const url = base + ruta;
    const res = await pagina.goto(url, {
      waitUntil: "networkidle0",
      timeout: 45000,
    });
    const estado = res?.status();

    // Deja terminar las entradas escalonadas antes de fotografiar.
    await pagina.evaluate(async () => {
      window.scrollTo(0, document.body.scrollHeight);
      await new Promise(r => setTimeout(r, 400));
      window.scrollTo(0, 0);
      await new Promise(r => setTimeout(r, 300));
    });

    const desborde = await pagina.evaluate(() => {
      const d = document.documentElement;
      const sobra = d.scrollWidth - d.clientWidth;
      if (sobra <= 1) return null;
      const culpables = [];
      for (const el of document.querySelectorAll("body *")) {
        const r = el.getBoundingClientRect();
        if (r.width === 0) continue;
        if (r.right > d.clientWidth + 1 || r.left < -1) {
          culpables.push(
            `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 60)} → ${Math.round(r.left)}..${Math.round(r.right)}`
          );
        }
        if (culpables.length > 6) break;
      }
      return { sobra, culpables };
    });

    const archivo = `${out}/${nombre}${ruta.replace(/\//g, "_") || "_home"}.png`;
    await pagina.screenshot({ path: archivo, fullPage: true });

    const marca = desborde ? "DESBORDA" : "ok";
    if (desborde) fallas++;
    console.log(
      `${marca.padEnd(9)} ${String(estado).padEnd(4)} ${nombre.padEnd(11)} ${ruta}`
    );
    if (desborde) {
      console.log(`          sobran ${desborde.sobra}px:`);
      for (const c of desborde.culpables) console.log(`            ${c}`);
    }
  }
  await pagina.close();
}

await navegador.close();
console.log(
  fallas === 0 ? "\nSin desbordes." : `\n${fallas} páginas se desbordan.`
);
process.exit(fallas === 0 ? 0 : 1);
