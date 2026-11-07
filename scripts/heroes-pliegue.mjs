// Checks that every [data-mide] element of a hero sits fully inside the first screen.
// Usage: node scripts/heroes-pliegue.mjs <base-url> <out-dir> <path> [--todas]
// Required marks: h1, foto, acepcion-1, remate (the last sense), icp, ctas. --todas adds the soft viewports.
import puppeteer from "puppeteer";
import { mkdirSync } from "node:fs";

const [base, out, ruta = "/"] = process.argv.slice(2);
const todas = process.argv.includes("--todas");
mkdirSync(out, { recursive: true });

const OBLIGATORIAS = [
  { nombre: "1920x937", width: 1920, height: 937, mobile: false },
  { nombre: "1440x900", width: 1440, height: 900, mobile: false },
  { nombre: "375x667", width: 375, height: 667, mobile: true },
];
const SUAVES = [
  { nombre: "1366x657", width: 1366, height: 657, mobile: false },
  { nombre: "1024x768", width: 1024, height: 768, mobile: false },
  { nombre: "768x1024", width: 768, height: 1024, mobile: true },
  { nombre: "390x844", width: 390, height: 844, mobile: true },
];
const MARCAS = ["h1", "foto", "acepcion-1", "remate", "icp", "ctas"];

const browser = await puppeteer.launch({ headless: true });
let fallas = 0;

for (const v of [...OBLIGATORIAS, ...(todas ? SUAVES : [])]) {
  const obligatoria = OBLIGATORIAS.includes(v);
  const page = await browser.newPage();
  await page.setViewport({ width: v.width, height: v.height, isMobile: v.mobile, hasTouch: v.mobile, deviceScaleFactor: 1 });
  await page.goto(base + ruta, { waitUntil: "networkidle0" });
  await page.evaluate(() => document.querySelector("astro-dev-toolbar")?.remove());
  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 500));

  const medida = await page.evaluate(marcas => {
    const visible = el => {
      const r = el.getBoundingClientRect();
      const s = getComputedStyle(el);
      return r.width > 0 && r.height > 0 && s.visibility !== "hidden" && s.display !== "none" && Number(s.opacity) > 0.05;
    };
    const filas = marcas.map(m => {
      const el = [...document.querySelectorAll(`[data-mide="${m}"]`)].find(visible);
      if (!el) return { marca: m, ok: false, motivo: "missing or hidden" };
      const r = el.getBoundingClientRect();
      const ok = r.top >= 0 && r.left >= -1 && r.bottom <= innerHeight + 0.5 && r.right <= innerWidth + 1;
      return { marca: m, ok, top: Math.round(r.top), bottom: Math.round(r.bottom), left: Math.round(r.left), right: Math.round(r.right) };
    });
    const desborde = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    return { filas, desborde };
  }, MARCAS);

  const malas = medida.filas.filter(f => !f.ok);
  const estado = malas.length || medida.desborde > 0 ? "FAIL" : "OK";
  if (estado === "FAIL" && obligatoria) fallas++;
  console.log(`${estado}${obligatoria ? "" : " (soft)"} ${v.nombre}  overflow-x=${medida.desborde}px`);
  for (const f of medida.filas)
    console.log(`   ${f.ok ? "ok  " : "FAIL"} ${f.marca.padEnd(11)} ${f.motivo ?? `top ${f.top} bottom ${f.bottom} / ${v.height}  x ${f.left}-${f.right} / ${v.width}`}`);
  await page.screenshot({ path: `${out}/${v.nombre}.png` });
  await page.close();
}

await browser.close();
process.exit(fallas ? 1 : 0);
