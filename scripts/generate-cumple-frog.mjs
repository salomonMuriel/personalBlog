// One-off: turn a local photo into a 16-bit pixel-art PNG with transparent
// background via OpenAI gpt-image-1.5 edits, using the same BASE_PROMPT_SINGLE
// we use for user RSVP selfies, plus an optional extra style direction.
//
// Usage:
//   node scripts/generate-cumple-frog.mjs              # default: frog.webp -> frog.png
//   node scripts/generate-cumple-frog.mjs --source=~/Downloads/Salo.jpg \
//        --out=public/cumple-35/salo.png \
//        --extra="Depict them as a D&D Artificer ..."

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { homedir } from "node:os";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const BASE_PROMPT_SINGLE = `Transform this photo into a 16-bit SNES/NES era pixel art portrait.
Tight limited palette (8-12 vibrant colors), strong 1px black outlines, chunky
pixels, mild retro dithering. Preserve the person's face, hair color, skin tone,
and outfit silhouette but render them as a retro video game character.
Square framing, subject centered, flat or simple background.`;

const TRANSPARENT_NOTE = `\n\nRender the image with a fully TRANSPARENT background (no backdrop, no sky, no platform). Only the subject should be visible; everything around it must be transparent.`;

function arg(name, fallback) {
  const hit = process.argv.find(a => a.startsWith(`--${name}=`));
  if (!hit) return fallback;
  return hit.slice(name.length + 3);
}

const sourceArg = arg("source", "~/Downloads/frog.webp").replace(
  /^~(?=\/|$)/,
  homedir()
);
const outArg = arg("out", "public/cumple-35/frog.png");
const extraArg = arg("extra", "");

const prompt = BASE_PROMPT_SINGLE + (extraArg ? `\n\n${extraArg}` : "") + TRANSPARENT_NOTE;

function getApiKey() {
  if (process.env.OPENAI_API_KEY) return process.env.OPENAI_API_KEY;
  const envPath = resolve(root, ".env");
  try {
    const txt = readFileSync(envPath, "utf8");
    const m = txt.match(/^OPENAI_API_KEY=(.+)$/m);
    if (m) return m[1].trim().replace(/^['"]|['"]$/g, "");
  } catch {}
  return "";
}

const apiKey = getApiKey();
if (!apiKey) {
  console.error("OPENAI_API_KEY not set (env or .env)");
  process.exit(1);
}

const srcPath = resolve(sourceArg);
console.log("Reading", srcPath);
const srcBuf = readFileSync(srcPath);

const sourcePng = await sharp(srcBuf)
  .rotate()
  .resize(1024, 1024, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();

console.log("Calling OpenAI edits (gpt-image-1.5)...");
const form = new FormData();
form.append("model", "gpt-image-1.5");
form.append("prompt", prompt);
form.append("n", "1");
form.append("size", "1024x1024");
form.append("background", "transparent");
form.append(
  "image",
  new Blob([new Uint8Array(sourcePng)], { type: "image/png" }),
  "source.png"
);

const res = await fetch("https://api.openai.com/v1/images/edits", {
  method: "POST",
  headers: { Authorization: `Bearer ${apiKey}` },
  body: form,
});

const json = await res.json();
if (!res.ok) {
  console.error("OpenAI error:", JSON.stringify(json, null, 2));
  process.exit(1);
}
const b64 = json?.data?.[0]?.b64_json;
if (!b64) {
  console.error("Empty response:", JSON.stringify(json, null, 2));
  process.exit(1);
}

const outPath = resolve(root, outArg);
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, Buffer.from(b64, "base64"));
console.log("Wrote", outPath);
