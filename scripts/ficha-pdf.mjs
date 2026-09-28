/**
 * Genera los PDF de la ficha de perfil (ES y EN) en public/prensa/ y avisa
 * si alguna hoja se desborda del A4. Uso:  node scripts/ficha-pdf.mjs [baseUrl]
 * Necesita el sitio corriendo (npm run dev o npm run preview).
 */
import puppeteer from "puppeteer";

const base = process.argv[2] ?? "http://localhost:4321";
const fichas = [
  { ruta: "/ficha/", salida: "public/prensa/salomon-muriel-ficha.pdf" },
  { ruta: "/en/brief/", salida: "public/prensa/salomon-muriel-brief.pdf" },
];

const browser = await puppeteer.launch();
let desbordes = 0;

for (const { ruta, salida } of fichas) {
  const page = await browser.newPage();
  await page.goto(base + ruta, { waitUntil: "networkidle0" });
  await page.emulateMediaType("print");
  await page.evaluate(() => document.fonts.ready);

  const hojas = await page.$$eval(".pliego", nodos =>
    nodos.map(n => n.scrollHeight - n.clientHeight)
  );
  hojas.forEach((sobra, i) => {
    if (sobra > 1) {
      desbordes++;
      console.error(`✗ ${ruta} hoja ${i + 1}: se desborda ${sobra}px`);
    }
  });

  await page.pdf({
    path: salida,
    preferCSSPageSize: true,
    printBackground: true,
  });
  console.log(`✓ ${salida} (${hojas.length} hojas)`);
  await page.close();
}

await browser.close();
process.exit(desbordes ? 1 : 0);
