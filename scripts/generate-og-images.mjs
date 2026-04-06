#!/usr/bin/env node

/**
 * Pre-generates OG images for all blog posts and saves them to public/posts/.
 *
 * Run once after adding new posts (or after changing the OG template) to populate
 * the disk cache. Subsequent builds will serve these directly, bypassing Satori/Resvg.
 *
 * Usage:
 *   node scripts/generate-og-images.mjs          # generate only missing images
 *   node scripts/generate-og-images.mjs --force  # regenerate all images
 *
 * Can also be imported as a module:
 *   import { generateAndSaveOgImage } from "./generate-og-images.mjs";
 */

import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "fs";
import { join, resolve } from "path";
import { fileURLToPath } from "url";
import { slug as slugger } from "github-slugger";

const __dirname = resolve(fileURLToPath(import.meta.url), "..");
const ROOT = resolve(__dirname, "..");

const FONT_REGULAR = readFileSync(
  join(ROOT, "src/assets/fonts/og/dm-sans-400.woff")
);
const FONT_BOLD = readFileSync(
  join(ROOT, "src/assets/fonts/og/syne-700.woff")
);

let authorPhoto = "";
try {
  const buf = readFileSync(join(ROOT, "public/salomon.jpg"));
  authorPhoto = `data:image/jpeg;base64,${buf.toString("base64")}`;
} catch {
  // renders without photo if missing
}

const SITE_TITLE = "Salomón Muriel";

const SATORI_OPTIONS = {
  width: 1200,
  height: 630,
  embedFont: true,
  fonts: [
    { name: "DM Sans", data: FONT_REGULAR, weight: 400, style: "normal" },
    { name: "Syne", data: FONT_BOLD, weight: 700, style: "normal" },
  ],
};

/** Build the OG image element tree (matches src/utils/og-templates/post.tsx). */
function makeOgTemplate(title) {
  const cleanTitle = title
    .normalize("NFC")
    .replace(/[\u200B\u200C\u200D\uFEFF\u00AD]/g, "");

  const photoEl = authorPhoto
    ? {
        type: "div",
        props: {
          style: {
            width: 160,
            height: 160,
            borderRadius: "50%",
            overflow: "hidden",
            display: "flex",
            flexShrink: 0,
          },
          children: [
            {
              type: "img",
              props: {
                src: authorPhoto,
                alt: "Salomon",
                width: 160,
                height: 160,
                style: { objectFit: "cover" },
              },
            },
          ],
        },
      }
    : null;

  return {
    type: "div",
    props: {
      style: {
        background: "#ffffff",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "DM Sans",
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              border: "4px solid #cc2b2b",
              background: "#ffffff",
              borderRadius: "4px",
              boxShadow: "8px 8px 0px #cc2b2b",
              display: "flex",
              justifyContent: "center",
              margin: "2.5rem",
              width: "88%",
              height: "80%",
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "28px 32px",
                    width: "100%",
                    height: "100%",
                    color: "#111110",
                    boxSizing: "border-box",
                  },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          display: "flex",
                          flexGrow: 1,
                          overflow: "hidden",
                          alignItems: "flex-start",
                        },
                        children: [
                          {
                            type: "p",
                            props: {
                              style: {
                                fontFamily: "Syne",
                                fontSize: 56,
                                fontWeight: 700,
                                lineClamp: 4,
                                lineHeight: 1.2,
                                wordBreak: "break-word",
                                margin: 0,
                              },
                              children: cleanTitle,
                            },
                          },
                        ],
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexShrink: 0,
                          paddingTop: "16px",
                        },
                        children: [
                          {
                            type: "span",
                            props: {
                              style: {
                                fontFamily: "Syne",
                                fontWeight: 700,
                                fontSize: 28,
                                color: "#cc2b2b",
                                letterSpacing: "0.02em",
                              },
                              children: SITE_TITLE,
                            },
                          },
                          ...(photoEl ? [photoEl] : []),
                        ],
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  };
}

/**
 * Generate an OG PNG for the given title and save it to public/posts/[slug].png.
 * Skips if the file already exists unless force=true.
 * Returns the output path, or null if skipped.
 */
export async function generateAndSaveOgImage(title, { force = false } = {}) {
  const slug = slugger(title);
  const cacheDir = join(ROOT, "public/posts");
  const cachePath = join(cacheDir, `${slug}.png`);

  if (!force && existsSync(cachePath)) return null;

  const svg = await satori(makeOgTemplate(title), SATORI_OPTIONS);
  const resvg = new Resvg(svg);
  const png = resvg.render().asPng();

  mkdirSync(cacheDir, { recursive: true });
  writeFileSync(cachePath, png);
  return cachePath;
}

// ── CLI mode ─────────────────────────────────────────────

if (import.meta.url === `file://${process.argv[1]}`) {
  const force = process.argv.includes("--force");

  const BLOG_EN = join(ROOT, "src/content/blog/en");
  const BLOG_ES = join(ROOT, "src/content/blog/es");

  /** Parse the title field from an MDX/MD frontmatter block. */
  function parseTitleFromFrontmatter(content) {
    const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!fmMatch) return null;
    const yaml = fmMatch[1];
    // Matches: title: "value" (with optional escaped quotes) or title: bare value
    const quoted = yaml.match(/^title:\s*"((?:[^"\\]|\\.)*)"/m);
    if (quoted) return quoted[1].replace(/\\"/g, '"');
    const bare = yaml.match(/^title:\s*(.+)$/m);
    return bare ? bare[1].trim() : null;
  }

  /** Collect all (slug → title) pairs from a content directory, deduplicating by slug. */
  function collectPosts(dir, slugMap) {
    if (!existsSync(dir)) return;
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const postDir = join(dir, entry.name);
      for (const file of readdirSync(postDir)) {
        if (!file.endsWith(".md") && !file.endsWith(".mdx")) continue;
        const content = readFileSync(join(postDir, file), "utf-8");
        const title = parseTitleFromFrontmatter(content);
        if (!title) continue;
        const slug = slugger(title);
        if (!slugMap.has(slug)) slugMap.set(slug, title);
        break; // one file per dir
      }
    }
  }

  async function main() {
    // Mirror the endpoint's logic: en posts first, then es (first-seen slug wins)
    const slugToTitle = new Map();
    collectPosts(BLOG_EN, slugToTitle);
    collectPosts(BLOG_ES, slugToTitle);

    const total = slugToTitle.size;
    console.log(`Found ${total} unique post slugs. Generating OG images...`);

    let generated = 0;
    let skipped = 0;
    let failed = 0;

    for (const [slug, title] of slugToTitle) {
      const cachePath = join(ROOT, "public/posts", `${slug}.png`);
      if (!force && existsSync(cachePath)) {
        skipped++;
        continue;
      }
      try {
        await generateAndSaveOgImage(title, { force });
        generated++;
        if (generated % 10 === 0) {
          process.stdout.write(`  ${generated + skipped}/${total}\r`);
        }
      } catch (err) {
        console.error(`  Failed [${slug}]: ${err.message}`);
        failed++;
      }
    }

    console.log(
      `\nDone: ${generated} generated, ${skipped} skipped, ${failed} failed.`
    );
  }

  main().catch(err => {
    console.error("Fatal:", err.message);
    process.exit(1);
  });
}
