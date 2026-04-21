// Generate the OG image for /experimentos/cumple-35/
// Output: public/cumple-35/og.png (1200x630)
//
// Pulls the frog and beer sprite bodies out of src/components/cumple-35/Sprites.astro
// so the OG art stays in lock-step with on-page sprites.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const spritesSrc = readFileSync(
  resolve(root, "src/components/cumple-35/Sprites.astro"),
  "utf8"
);

function extractSymbolInner(id) {
  const re = new RegExp(
    `<symbol id="${id}"[^>]*>([\\s\\S]*?)<\\/symbol>`,
    "m"
  );
  const m = spritesSrc.match(re);
  if (!m) throw new Error(`symbol #${id} not found`);
  return m[1].replace(/<!--[\s\S]*?-->/g, "").trim();
}

const frogInner = extractSymbolInner("frog"); // 32x32
const beerInner = extractSymbolInner("beer"); // 24x32

// Press Start 2P font (latin) — loaded into resvg so SVG <text> renders.
const pressStartPath = resolve(root, "src/assets/fonts/og/press-start-2p.ttf");

const W = 1200;
const H = 630;

// Palette from CumpleLayout
const C = {
  bgDeep: "#1a0b2e",
  bgMid: "#2a1746",
  bgPanel: "#3d1f5e",
  gold: "#f4c430",
  goldDark: "#c89205",
  goldLight: "#ffe168",
  cream: "#f5e6d3",
  red: "#ff3b3b",
  pink: "#ff6b9d",
  cyan: "#4dd4e7",
  paper: "#fff8e4",
  ink: "#2a2015",
};

// Pixel starfield (deterministic)
function stars(count, seed) {
  let s = seed;
  const rand = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
  const out = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(rand() * W);
    const y = Math.floor(rand() * H);
    const size = rand() < 0.15 ? 3 : rand() < 0.5 ? 2 : 1;
    const bright = rand() < 0.1;
    out.push(
      `<rect x="${x}" y="${y}" width="${size}" height="${size}" fill="${
        bright ? C.goldLight : "#5a3a8a"
      }" opacity="${bright ? 0.9 : 0.55}"/>`
    );
  }
  return out.join("");
}

// Place a 32x32 frog sprite at (x,y) scaled by `scale`
function frogAt(x, y, scale) {
  return `<g transform="translate(${x},${y}) scale(${scale})" shape-rendering="crispEdges">${frogInner}</g>`;
}
// Place a 24x32 beer sprite at (x,y) scaled by `scale`
function beerAt(x, y, scale) {
  return `<g transform="translate(${x},${y}) scale(${scale})" shape-rendering="crispEdges">${beerInner}</g>`;
}

// Chunky pixel text with the SNES-style tri-color shadow used on hero title
function titleText(text, x, y, size) {
  const font = `font-family="Press Start 2P, monospace" font-size="${size}" text-anchor="middle"`;
  const ox = Math.max(2, Math.round(size * 0.04));
  const dx = Math.max(3, Math.round(size * 0.06));
  return `
    <g>
      <text x="${x - ox}" y="${y}" fill="${C.red}" ${font}>${text}</text>
      <text x="${x + ox}" y="${y}" fill="${C.cyan}" ${font}>${text}</text>
      <text x="${x + dx}" y="${y + dx}" fill="${C.goldDark}" ${font}>${text}</text>
      <text x="${x}" y="${y}" fill="${C.gold}" ${font}>${text}</text>
    </g>
  `;
}

function subText(text, x, y, size, color) {
  return `<text x="${x}" y="${y}" fill="${color}" font-family="Press Start 2P, monospace" font-size="${size}" text-anchor="middle">${text}</text>`;
}

// Dashed border frame (chunky pixel border)
function frame() {
  const t = 8;
  return `
    <rect x="${t}" y="${t}" width="${W - t * 2}" height="${H - t * 2}" fill="none" stroke="${C.gold}" stroke-width="6"/>
    <rect x="${t + 10}" y="${t + 10}" width="${W - (t + 10) * 2}" height="${H - (t + 10) * 2}" fill="none" stroke="${C.ink}" stroke-width="2"/>
    <!-- corner pegs -->
    ${[
      [t + 2, t + 2],
      [W - t - 14, t + 2],
      [t + 2, H - t - 14],
      [W - t - 14, H - t - 14],
    ]
      .map(
        ([x, y]) =>
          `<rect x="${x}" y="${y}" width="12" height="12" fill="${C.red}"/><rect x="${x + 2}" y="${y + 2}" width="8" height="8" fill="${C.goldLight}"/>`
      )
      .join("")}
  `;
}

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${C.bgDeep}"/>
      <stop offset="55%" stop-color="${C.bgMid}"/>
      <stop offset="100%" stop-color="${C.bgPanel}"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  ${stars(140, 0xc0ffee)}

  <!-- faint horizon glow behind title -->
  <ellipse cx="${W / 2}" cy="${H * 0.52}" rx="520" ry="90" fill="${C.bgPanel}" opacity="0.7"/>

  ${frame()}

  <!-- eyebrow -->
  ${subText("★ PLAYER 1 READY ★", W / 2, 92, 18, C.cream)}

  <!-- main title -->
  ${titleText("RSVP", W / 2, 210, 96)}
  ${titleText("CUMPLE SALO", W / 2, 330, 56)}

  <!-- divider row of hearts/pixels -->
  <g transform="translate(${W / 2 - 140}, 372)">
    ${[0, 46, 92, 138, 184, 230].map(
      x => `<rect x="${x}" y="0" width="24" height="6" fill="${C.pink}"/>`
    ).join("")}
  </g>

  <!-- subtitle -->
  ${subText("25 ABR · 7PM · LA RANA DORADA", W / 2, 430, 20, C.goldLight)}
  ${subText("&gt; PRESS START &lt;", W / 2, 478, 16, C.cyan)}

  <!-- big gold frog, left -->
  ${frogAt(70, 340, 7)}

  <!-- big beer mug, right (24x32 -> scale 7 = 168x224) -->
  ${beerAt(950, 340, 7)}

  <!-- small floating beers/frogs across top corners -->
  ${beerAt(70, 30, 2.4)}
  ${beerAt(1050, 30, 2.4)}

  <!-- bottom credit strip -->
  <rect x="0" y="${H - 46}" width="${W}" height="46" fill="${C.ink}" opacity="0.75"/>
  ${subText("salomuriel.com/experimentos/cumple-35", W / 2, H - 16, 14, C.goldLight)}
</svg>
`;

const outDir = resolve(root, "public/cumple-35");
mkdirSync(outDir, { recursive: true });

const resvg = new Resvg(svg, {
  font: {
    fontFiles: [pressStartPath],
    loadSystemFonts: true,
    defaultFontFamily: "Press Start 2P",
  },
  fitTo: { mode: "width", value: W },
  shapeRendering: 0, // crisp edges
  textRendering: 1,
  background: C.bgDeep,
});

const png = resvg.render().asPng();
const outPath = resolve(outDir, "og.png");
writeFileSync(outPath, png);
console.log(`Wrote ${outPath} (${png.length} bytes)`);
