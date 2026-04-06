#!/usr/bin/env node

/**
 * Syncs LinkedIn posts to blog posts in both English and Spanish.
 *
 * Environment variables:
 *   APIFY_API_TOKEN    – Apify API token
 *   OPENROUTER_API_KEY – OpenRouter API key (for translation / metadata)
 *
 * Usage:
 *   node scripts/sync-linkedin.mjs                                  # sync new posts since last run
 *   node scripts/sync-linkedin.mjs --backfill FILE                  # import from a JSON file (Apify output)
 *   node scripts/sync-linkedin.mjs --backfill FILE --no-translate   # import without translating (reuses original content for both langs)
 *   node scripts/sync-linkedin.mjs --backfill FILE --download-images-only  # only download images, no post creation
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import https from "node:https";
import http from "node:http";
import { generateAndSaveOgImage } from "./generate-og-images.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load .env file if present (Node 22 has --env-file but this works without flags)
const envPath = path.resolve(__dirname, "..", ".env");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf-8").split("\n")) {
    const match = line.match(/^\s*([^#=]+?)\s*=\s*(.*)\s*$/);
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2];
  }
}
const ROOT = path.resolve(__dirname, "..");
const BLOG_EN = path.join(ROOT, "src/content/blog/en");
const BLOG_ES = path.join(ROOT, "src/content/blog/es");
const ASSETS_DIR = path.join(ROOT, "src/assets/posts/blog/linkedin");
const STATE_FILE = path.join(__dirname, ".linkedin-sync-state.json");

const LINKEDIN_PROFILE_URL = "https://www.linkedin.com/in/smuriel/";
const APIFY_ACTOR_ID = "A3cAPGpwBEG8RJwse";

// ── Helpers ──────────────────────────────────────────────

function loadState() {
  if (fs.existsSync(STATE_FILE)) {
    return JSON.parse(fs.readFileSync(STATE_FILE, "utf-8"));
  }
  return { syncedPostIds: [] };
}

function saveState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2) + "\n");
}

/** Fetch JSON via https (no deps needed). */
function fetchJSON(url, options = {}) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith("https") ? https : http;
    const req = mod.request(url, { method: options.method || "GET", headers: options.headers || {} }, res => {
      let body = "";
      res.on("data", chunk => (body += chunk));
      res.on("end", () => {
        if (res.statusCode >= 400) {
          reject(new Error(`HTTP ${res.statusCode}: ${body.slice(0, 500)}`));
        } else {
          resolve(JSON.parse(body));
        }
      });
    });
    req.on("error", reject);
    if (options.body) req.write(options.body);
    req.end();
  });
}

/** Download a file to disk. Returns the local filename or null on failure. */
function downloadFile(url, destDir, filename) {
  return new Promise(resolve => {
    const mod = url.startsWith("https") ? https : http;
    const destPath = path.join(destDir, filename);
    const file = fs.createWriteStream(destPath);
    mod
      .get(url, res => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          // follow redirect
          downloadFile(res.headers.location, destDir, filename).then(resolve);
          return;
        }
        if (res.statusCode >= 400) {
          file.close();
          fs.unlinkSync(destPath);
          console.warn(`  ⚠ Failed to download image: ${url} (${res.statusCode})`);
          resolve(null);
          return;
        }
        res.pipe(file);
        file.on("finish", () => {
          file.close();
          resolve(filename);
        });
      })
      .on("error", err => {
        console.warn(`  ⚠ Download error: ${err.message}`);
        resolve(null);
      });
  });
}

/** Get the next directory number prefix for blog posts. */
function getNextDirNumber(blogDir) {
  if (!fs.existsSync(blogDir)) return 10;
  const entries = fs.readdirSync(blogDir);
  let max = 9; // existing posts go up to 009 (excluding 999)
  for (const entry of entries) {
    const match = entry.match(/^(\d+)-/);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num < 900 && num > max) max = num; // skip 999 which is a special post
    }
  }
  return max + 1;
}

/** Build post content with all inline links resolved to markdown. */
function buildPostContent(post) {
  let content = post.content || "";
  const attrs = post.contentAttributes || [];

  // Sort attributes by start position descending so replacements don't shift indices
  const sorted = [...attrs].sort((a, b) => b.start - a.start);

  for (const attr of sorted) {
    const mentionText = content.slice(attr.start, attr.start + attr.length);
    let replacement = null;

    if (attr.type === "PROFILE_MENTION" && attr.profile) {
      const profileUrl = `https://www.linkedin.com/in/${attr.profile.publicIdentifier}`;
      replacement = `[${mentionText}](${profileUrl})`;
    } else if (attr.type === "COMPANY_NAME" && attr.company) {
      replacement = `[${mentionText}](${attr.company.linkedinUrl})`;
    } else if (attr.type === "TEXT_LINK") {
      const url = attr.textLink || attr.hyperlink;
      if (url) replacement = `[${mentionText}](${url})`;
    }

    if (replacement) {
      content = content.slice(0, attr.start) + replacement + content.slice(attr.start + attr.length);
    }
  }

  return content;
}

/** Build a metadata summary of attached media for the LLM prompt. */
function buildMediaContext(post) {
  const parts = [];

  if (post.postImages?.length) {
    parts.push(`[${post.postImages.length} image(s) attached]`);
  }
  if (post.article) {
    const a = post.article;
    parts.push(`[Linked article: "${a.title || "Untitled"}"${a.link ? ` — ${a.link}` : ""}${a.subtitle ? ` (${a.subtitle})` : ""}]`);
  }
  if (post.postVideo) {
    parts.push(`[Video attached]`);
  }
  if (post.document) {
    parts.push(`[Document carousel: "${post.document.title || "Untitled"}"]`);
  }

  return parts.length ? "\n\n" + parts.join("\n") : "";
}

/** Detect language - simple heuristic based on common Spanish words. */
function detectLanguage(text) {
  const spanishIndicators = [
    /\bque\b/i, /\bcómo\b/i, /\bpara\b/i, /\bestá\b/i, /\bcon\b/i,
    /\bpor\b/i, /\buna?\b/i, /\bdel?\b/i, /\blos?\b/i, /\blas?\b/i,
    /\besta\b/i, /\bson\b/i, /\bhay\b/i, /\bmás\b/i, /\bpero\b/i,
    /\bcuando\b/i, /\btambién\b/i, /\bpuede\b/i, /\btodo\b/i, /\bsobre\b/i,
    /\bnuestro\b/i, /\bcada\b/i, /\baquí\b/i, /\bsiempre\b/i, /\bvamos\b/i,
  ];
  let spanishCount = 0;
  for (const re of spanishIndicators) {
    if (re.test(text)) spanishCount++;
  }
  return spanishCount >= 4 ? "es" : "en";
}

/** Call LLM via OpenRouter with retry logic. Returns parsed JSON. */
async function callLLM(systemPrompt, userPrompt, retries = 3) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("OPENROUTER_API_KEY environment variable is required");

  const body = JSON.stringify({
    model: "anthropic/claude-sonnet-4",
    max_completion_tokens: 4096,
    temperature: 0.3,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await new Promise((resolve, reject) => {
        const req = https.request(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
              "HTTP-Referer": "https://www.salomonmuriel.com",
              "X-Title": "Salomon Muriel Blog - LinkedIn Sync",
            },
          },
          response => {
            let data = "";
            response.on("data", chunk => (data += chunk));
            response.on("end", () => {
              if (response.statusCode === 429 || response.statusCode >= 500) {
                reject(new Error(`RETRYABLE: HTTP ${response.statusCode}: ${data.slice(0, 300)}`));
              } else if (response.statusCode >= 400) {
                reject(new Error(`OpenRouter API error ${response.statusCode}: ${data.slice(0, 500)}`));
              } else {
                resolve(JSON.parse(data));
              }
            });
          }
        );
        req.on("error", reject);
        req.write(body);
        req.end();
      });

      const content = res.choices?.[0]?.message?.content;
      if (!content) throw new Error("Empty response from OpenRouter");
      return JSON.parse(content);
    } catch (err) {
      const isRetryable = err.message.startsWith("RETRYABLE") || err.code === "ECONNRESET";
      if (isRetryable && attempt < retries) {
        const delay = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s
        console.warn(`  Retry ${attempt}/${retries} after ${delay}ms: ${err.message}`);
        await new Promise(r => setTimeout(r, delay));
        continue;
      }
      throw err;
    }
  }
}

// ── Translation prompt ───────────────────────────────────

const SYSTEM_PROMPT = `You are a bilingual content adapter for Salomón Muriel's personal blog (salomonmuriel.com). Salomón is a Colombian serial entrepreneur who writes about tech, entrepreneurship, leadership, education, parenting, and AI.

Your job: take a LinkedIn post and produce a JSON object with both a Colombian Spanish version and an English version.

## Translation guidelines

**Colombian Spanish (es):**
- Use natural Colombian Spanish — "tú" form, colloquial where the original is colloquial.
- Use expressions natural to Colombia (e.g., "bacano", "parcero", "chimba", "marica" as filler, "de una", "qué nota") ONLY if the original already uses them. Do not add slang the author didn't use.
- If the original IS in Spanish, keep it essentially unchanged — only light cleanup for blog readability (paragraph breaks, formatting). Do NOT rephrase or "improve" the author's words.

**English (en):**
- Natural, conversational American English.
- Preserve the author's voice: direct, passionate, sometimes irreverent.
- Adapt cultural references so English readers get the intent (add brief context in parentheses if needed, e.g., "parcero (Colombian slang for buddy)").
- If the original IS in English, keep it essentially unchanged — only light cleanup for blog readability.

## Key rules
- PRESERVE the author's intent, humor, and personality above all. The translation should feel like Salomón wrote it in that language, not like it was machine-translated.
- Keep ALL markdown links exactly as they appear (e.g., [Name](url)).
- Keep emojis that add personality.
- Do NOT add content that wasn't in the original. Do NOT remove opinions or strong statements.
- Use markdown formatting: paragraph breaks, **bold**, *italic*, lists where appropriate.
- The content fields should NOT include a title or LinkedIn link — those go in frontmatter.

## Output format
Respond with a single JSON object (no markdown fences, no commentary):
{
  "slug": "english-url-slug-max-8-words",
  "title_es": "Título del post en español",
  "title_en": "Post title in English",
  "description_es": "1-2 oraciones de resumen en español",
  "description_en": "1-2 sentence summary in English",
  "tags": ["linkedin", "other-relevant-tags"],
  "content_es": "Full post body in Colombian Spanish with markdown formatting",
  "content_en": "Full post body in English with markdown formatting"
}

Tags must be lowercase. Always include "linkedin". Pick 2-4 more from: entrepreneurship, tech, leadership, education, parenting, ai, startups, innovation, culture, books, personal, colombia, business, productivity, hiring, consulting, balance.`;

const SYSTEM_PROMPT_METADATA_ONLY = `You are a content assistant for Salomón Muriel's personal blog (salomonmuriel.com). Salomón is a Colombian serial entrepreneur.

Your job: take a LinkedIn post and produce ONLY metadata for it — a slug, title, description, and tags. You do NOT need to translate or rewrite the content.

## Output format
Respond with a single JSON object (no markdown fences, no commentary):
{
  "slug": "english-url-slug-max-8-words",
  "title_es": "Título del post en español (compelling, captures the essence)",
  "title_en": "Post title in English",
  "description_es": "1-2 oraciones de resumen en español",
  "description_en": "1-2 sentence summary in English",
  "tags": ["linkedin", "other-relevant-tags"]
}

Tags must be lowercase. Always include "linkedin". Pick 2-4 more from: entrepreneurship, tech, leadership, education, parenting, ai, startups, innovation, culture, books, personal, colombia, business, productivity, hiring, consulting, balance.`;

/** Generate metadata and translation for a post using Claude via OpenRouter. */
async function generatePostMetadata(postContent, mediaContext, detectedLang, skipTranslation = false) {
  const systemPrompt = skipTranslation ? SYSTEM_PROMPT_METADATA_ONLY : SYSTEM_PROMPT;
  const userPrompt = `${skipTranslation ? "Generate metadata for" : "Convert"} this LinkedIn post${skipTranslation ? "" : " to a bilingual blog post"}. The original language is ${detectedLang === "es" ? "Colombian Spanish" : "English"}.

--- POST CONTENT ---
${postContent}${mediaContext}
--- END POST CONTENT ---`;

  return await callLLM(systemPrompt, userPrompt);
}

/** Create an MDX blog post file. */
function createBlogPost(dir, dirName, fileName, { title, slug, description, tags, pubDatetime, linkedinUrl, content, media }) {
  const postDir = path.join(dir, dirName);
  fs.mkdirSync(postDir, { recursive: true });

  // Build media references
  let mediaMarkdown = "";
  if (media && media.length > 0) {
    const parts = [];
    let imgCount = 0;
    for (const m of media) {
      const relPath = `../../../../assets/posts/blog/linkedin/${m.filename}`;
      if (m.type === "image") {
        imgCount++;
        parts.push(`![Post image ${imgCount}](${relPath})`);
      } else if (m.type === "video") {
        parts.push(`<video controls src="${relPath}" />`);
      } else if (m.type === "document") {
        parts.push(`[${m.title || "Document"}](${relPath})`);
      } else if (m.type === "article-image") {
        const caption = m.link ? `[${m.title || "Article"}](${m.link})` : (m.title || "Article");
        parts.push(`![${m.title || "Article preview"}](${relPath})\n${caption}`);
      }
    }
    if (parts.length) mediaMarkdown = "\n" + parts.join("\n\n") + "\n";
  }

  const linkedinNotice = `> *Originally posted on [LinkedIn](${linkedinUrl})*`;

  const frontmatter = `---
author: Salomón Muriel
pubDatetime: ${pubDatetime}
modDatetime: ${pubDatetime}
title: "${title.replace(/"/g, '\\"')}"
slug: ${slug}
featured: false
draft: false
tags:
${tags.map(t => `  - ${t}`).join("\n")}
description: "${description.replace(/"/g, '\\"')}"
canonicalURL: ${linkedinUrl}
---`;

  const fileContent = `${frontmatter}

${linkedinNotice}

${content}
${mediaMarkdown}`;

  fs.writeFileSync(path.join(postDir, fileName), fileContent);
  console.log(`  Created: ${path.join(dirName, fileName)}`);
}

// ── Apify integration ────────────────────────────────────

async function fetchLinkedInPosts(sinceDate) {
  const token = process.env.APIFY_API_TOKEN;
  if (!token) throw new Error("APIFY_API_TOKEN environment variable is required");

  console.log(`Fetching LinkedIn posts since ${sinceDate || "all time"}...`);

  const input = {
    targetUrls: [LINKEDIN_PROFILE_URL],
    maxPosts: 50,
    includeQuotePosts: true,
    includeReposts: false,
    scrapeComments: false,
    scrapeReactions: false,
    maxComments: 0,
    maxReactions: 0,
    postNestedComments: false,
    postNestedReactions: false,
  };

  if (sinceDate) {
    input.postedLimitDate = sinceDate;
  }

  // Start the actor run
  const runUrl = `https://api.apify.com/v2/acts/${APIFY_ACTOR_ID}/runs?token=${token}`;
  const run = await fetchJSON(runUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  const runId = run.data.id;
  console.log(`Apify run started: ${runId}`);

  // Poll for completion
  let status = run.data.status;
  while (status === "RUNNING" || status === "READY") {
    await new Promise(r => setTimeout(r, 5000));
    const runInfo = await fetchJSON(
      `https://api.apify.com/v2/actor-runs/${runId}?token=${token}`
    );
    status = runInfo.data.status;
    console.log(`  Run status: ${status}`);
  }

  if (status !== "SUCCEEDED") {
    throw new Error(`Apify run failed with status: ${status}`);
  }

  // Fetch results
  const datasetId = run.data.defaultDatasetId;
  const results = await fetchJSON(
    `https://api.apify.com/v2/datasets/${datasetId}/items?token=${token}`
  );

  console.log(`Fetched ${results.length} posts from LinkedIn`);
  return results;
}

// ── Main sync logic ──────────────────────────────────────

async function processPost(post, dirNumber, { skipTranslation = false } = {}) {
  const postId = post.id || post.entityId;
  const linkedinUrl = post.linkedinUrl || post.shareUrl || `https://www.linkedin.com/feed/update/urn:li:activity:${postId}/`;
  const postedAt = post.postedAt?.date || post.postedAt?.timestamp;
  const pubDatetime = postedAt ? new Date(postedAt).toISOString() : new Date().toISOString();

  console.log(`\nProcessing post ${postId} (${pubDatetime})...`);

  // Skip reposts without content
  if (!post.content || post.content.trim().length === 0) {
    console.log("  Skipping: no content (likely a repost)");
    return false;
  }

  // Build content with links resolved
  const processedContent = buildPostContent(post);
  const detectedLang = detectLanguage(post.content);
  console.log(`  Detected language: ${detectedLang}${skipTranslation ? " (no-translate mode)" : ""}`);

  // Download media
  const media = [];
  fs.mkdirSync(ASSETS_DIR, { recursive: true });

  if (post.postImages?.length) {
    for (let i = 0; i < post.postImages.length; i++) {
      const img = post.postImages[i];
      const ext = img.url.includes(".gif") ? "gif" : img.url.includes(".png") ? "png" : "jpg";
      const filename = `li-${postId}-${i}.${ext}`;
      if (!fs.existsSync(path.join(ASSETS_DIR, filename))) {
        console.log(`  Downloading image ${i + 1}/${post.postImages.length}...`);
        const result = await downloadFile(img.url, ASSETS_DIR, filename);
        if (result) media.push({ type: "image", filename });
      } else {
        media.push({ type: "image", filename });
      }
    }
  }

  if (post.postVideo?.videoUrl) {
    const videoFile = `li-${postId}-video.mp4`;
    if (!fs.existsSync(path.join(ASSETS_DIR, videoFile))) {
      console.log(`  Downloading video...`);
      const result = await downloadFile(post.postVideo.videoUrl, ASSETS_DIR, videoFile);
      if (result) media.push({ type: "video", filename: videoFile });
    } else {
      media.push({ type: "video", filename: videoFile });
    }
  }

  if (post.document?.transcribedDocumentUrl) {
    const docFile = `li-${postId}-doc.pdf`;
    if (!fs.existsSync(path.join(ASSETS_DIR, docFile))) {
      console.log(`  Downloading document...`);
      await downloadFile(post.document.transcribedDocumentUrl, ASSETS_DIR, docFile);
    }
    media.push({ type: "document", filename: docFile, title: post.document.title });
  }

  if (post.article?.image?.url) {
    const articleImg = `li-${postId}-article.jpg`;
    if (!fs.existsSync(path.join(ASSETS_DIR, articleImg))) {
      console.log(`  Downloading article image...`);
      await downloadFile(post.article.image.url, ASSETS_DIR, articleImg);
    }
    media.push({ type: "article-image", filename: articleImg, title: post.article.title, link: post.article.link });
  }

  // Generate metadata (and translations unless --no-translate)
  console.log(`  Generating metadata${skipTranslation ? "" : " and translations"}...`);
  const mediaContext = buildMediaContext(post);
  const metadata = await generatePostMetadata(processedContent, mediaContext, detectedLang, skipTranslation);

  // In no-translate mode, use the original content for both languages
  const contentEs = skipTranslation ? processedContent : metadata.content_es;
  const contentEn = skipTranslation ? processedContent : metadata.content_en;

  const dirNum = String(dirNumber).padStart(3, "0");
  const dirName = `${dirNum}-li-${metadata.slug}`;
  const fileName = `${metadata.slug}.mdx`;

  // Create English version
  createBlogPost(BLOG_EN, dirName, fileName, {
    title: metadata.title_en,
    slug: metadata.slug,
    description: metadata.description_en,
    tags: metadata.tags,
    pubDatetime,
    linkedinUrl,
    content: contentEn,
    media,
  });

  // Create Spanish version
  createBlogPost(BLOG_ES, dirName, fileName, {
    title: metadata.title_es,
    slug: metadata.slug,
    description: metadata.description_es,
    tags: metadata.tags,
    pubDatetime,
    linkedinUrl,
    content: contentEs,
    media,
  });

  // Pre-generate OG images so builds don't have to render them via Satori
  console.log(`  Generating OG images...`);
  await generateAndSaveOgImage(metadata.title_en).catch(e =>
    console.warn(`  OG image (en) failed: ${e.message}`)
  );
  if (metadata.title_es !== metadata.title_en) {
    await generateAndSaveOgImage(metadata.title_es).catch(e =>
      console.warn(`  OG image (es) failed: ${e.message}`)
    );
  }

  return true;
}

/** Download a single file if it doesn't already exist. Returns true if downloaded or already existed. */
async function downloadIfMissing(url, filename, stats) {
  const destPath = path.join(ASSETS_DIR, filename);
  if (fs.existsSync(destPath) && fs.statSync(destPath).size > 0) {
    stats.skipped++;
    return true;
  }
  console.log(`  Downloading ${filename}...`);
  const result = await downloadFile(url, ASSETS_DIR, filename);
  if (result) {
    stats.downloaded++;
    return true;
  }
  stats.failed++;
  return false;
}

/** Download all media (images, videos, documents, article images) from posts. */
async function downloadImagesOnly(posts) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
  const stats = { downloaded: 0, skipped: 0, failed: 0 };

  for (const post of posts) {
    const postId = post.id || post.entityId;

    // Post images
    if (post.postImages?.length) {
      for (let i = 0; i < post.postImages.length; i++) {
        const img = post.postImages[i];
        const ext = img.url.includes(".gif") ? "gif" : img.url.includes(".png") ? "png" : "jpg";
        await downloadIfMissing(img.url, `li-${postId}-${i}.${ext}`, stats);
      }
    }

    // Videos
    if (post.postVideo?.videoUrl) {
      await downloadIfMissing(post.postVideo.videoUrl, `li-${postId}-video.mp4`, stats);
      if (post.postVideo.thumbnailUrl) {
        await downloadIfMissing(post.postVideo.thumbnailUrl, `li-${postId}-thumb.jpg`, stats);
      }
    }

    // Documents (PDF carousel)
    if (post.document?.transcribedDocumentUrl) {
      await downloadIfMissing(post.document.transcribedDocumentUrl, `li-${postId}-doc.pdf`, stats);
    }

    // Article preview images
    if (post.article?.image?.url) {
      await downloadIfMissing(post.article.image.url, `li-${postId}-article.jpg`, stats);
    }
  }

  console.log(`\nMedia done: ${stats.downloaded} downloaded, ${stats.skipped} already existed, ${stats.failed} failed.`);
}

async function main() {
  const args = process.argv.slice(2);
  const skipTranslation = args.includes("--no-translate");
  const downloadOnly = args.includes("--download-images-only");
  const backfillIdx = args.indexOf("--backfill");
  const isBackfill = backfillIdx !== -1;
  const backfillFile = isBackfill ? args[backfillIdx + 1] : null;

  const state = loadState();
  let posts;

  if (isBackfill && backfillFile) {
    // Load posts from a local JSON file (previously saved Apify output)
    console.log(`Loading posts from backfill file: ${backfillFile}`);
    const raw = fs.readFileSync(path.resolve(backfillFile), "utf-8");
    posts = JSON.parse(raw);
    console.log(`Loaded ${posts.length} posts from file`);
  } else {
    // Fetch from Apify - get posts from last 2 days to ensure overlap
    const sinceDate = new Date();
    sinceDate.setDate(sinceDate.getDate() - 2);
    const sinceDateStr = sinceDate.toISOString().split("T")[0];
    posts = await fetchLinkedInPosts(sinceDateStr);
  }

  if (downloadOnly) {
    console.log("\nDownloading images only...");
    await downloadImagesOnly(posts);
    return;
  }

  // Filter out already-synced posts
  const newPosts = posts.filter(p => {
    const id = p.id || p.entityId;
    return !state.syncedPostIds.includes(id);
  });

  if (newPosts.length === 0) {
    console.log("\nNo new posts to sync.");
    return;
  }

  console.log(`\nFound ${newPosts.length} new posts to sync.`);

  // Sort by date ascending (oldest first)
  newPosts.sort((a, b) => {
    const dateA = new Date(a.postedAt?.date || a.postedAt?.timestamp || 0);
    const dateB = new Date(b.postedAt?.date || b.postedAt?.timestamp || 0);
    return dateA - dateB;
  });

  let dirNumber = getNextDirNumber(BLOG_EN);

  for (const post of newPosts) {
    const postId = post.id || post.entityId;
    try {
      const created = await processPost(post, dirNumber, { skipTranslation });
      if (created) {
        dirNumber++;
      }
      state.syncedPostIds.push(postId);
      saveState(state);
    } catch (err) {
      console.error(`  Error processing post ${postId}: ${err.message}`);
      // Continue with next post
    }
  }

  console.log("\nSync complete!");
}

main().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
