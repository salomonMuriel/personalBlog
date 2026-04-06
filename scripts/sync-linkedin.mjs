#!/usr/bin/env node

/**
 * Syncs LinkedIn posts to blog posts in both English and Spanish.
 *
 * Environment variables:
 *   APIFY_API_TOKEN    – Apify API token
 *   ANTHROPIC_API_KEY  – Anthropic API key (for translation / metadata)
 *
 * Usage:
 *   node scripts/sync-linkedin.mjs                  # sync new posts since last run
 *   node scripts/sync-linkedin.mjs --backfill FILE  # import from a JSON file (Apify output)
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import https from "node:https";
import http from "node:http";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
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

/** Build post content with profile mention links resolved. */
function buildPostContent(post) {
  let content = post.content || "";
  const attrs = post.contentAttributes || [];

  // Sort attributes by start position descending so replacements don't shift indices
  const sorted = [...attrs].sort((a, b) => b.start - a.start);

  for (const attr of sorted) {
    if (attr.type === "PROFILE_MENTION" && attr.profile) {
      const mentionText = content.slice(attr.start, attr.start + attr.length);
      const profileUrl = `https://www.linkedin.com/in/${attr.profile.publicIdentifier}`;
      const replacement = `[${mentionText}](${profileUrl})`;
      content = content.slice(0, attr.start) + replacement + content.slice(attr.start + attr.length);
    } else if (attr.type === "HYPERLINK" && attr.hyperlink) {
      const linkText = content.slice(attr.start, attr.start + attr.length);
      const replacement = `[${linkText}](${attr.hyperlink})`;
      content = content.slice(0, attr.start) + replacement + content.slice(attr.start + attr.length);
    }
  }

  return content;
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

/** Call Claude API for translation and metadata generation. */
async function callClaude(prompt) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY environment variable is required");

  const body = JSON.stringify({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
    messages: [{ role: "user", content: prompt }],
  });

  const res = await new Promise((resolve, reject) => {
    const req = https.request(
      "https://api.anthropic.com/v1/messages",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
      },
      response => {
        let data = "";
        response.on("data", chunk => (data += chunk));
        response.on("end", () => {
          if (response.statusCode >= 400) {
            reject(new Error(`Claude API error ${response.statusCode}: ${data.slice(0, 500)}`));
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

  return res.content[0].text;
}

/** Generate metadata and translation for a post using Claude. */
async function generatePostMetadata(postContent, detectedLang, linkedinUrl) {
  const prompt = `You are helping convert a LinkedIn post into a bilingual blog post. The post is written in ${detectedLang === "es" ? "Spanish" : "English"}.

Here is the LinkedIn post content:
---
${postContent}
---

LinkedIn URL: ${linkedinUrl}

Please provide the following as a JSON object (no markdown code fences, just raw JSON):
{
  "slug": "a-url-friendly-slug-for-this-post-in-english (max 8 words, lowercase, hyphens)",
  "title_es": "Spanish title for the blog post (compelling, not just the first line)",
  "title_en": "English title for the blog post",
  "description_es": "1-2 sentence Spanish description/summary",
  "description_en": "1-2 sentence English description/summary",
  "tags": ["tag1", "tag2", "tag3"],
  "content_es": "The full post content in Spanish (if original is Spanish, clean it up slightly for blog format; if English, translate it)",
  "content_en": "The full post content in English (if original is English, clean it up slightly for blog format; if Spanish, translate it)"
}

Important rules:
- Keep the original voice and tone - this is Salomon Muriel's personal blog
- The content should feel natural as a blog post, not like a LinkedIn copy-paste
- Preserve all markdown links that exist in the content
- Keep emojis if they add personality
- Tags should be lowercase, relevant topics (e.g., "entrepreneurship", "tech", "leadership", "education", "parenting", "AI")
- Always include "linkedin" as one of the tags
- The slug should be descriptive and in English
- For content_es and content_en: Do NOT include the title, do NOT include the LinkedIn link (those go in frontmatter). Just the body text.
- Use markdown formatting where appropriate (paragraphs, bold, italic, lists)`;

  const response = await callClaude(prompt);

  // Parse JSON from response, handling potential markdown fences
  let jsonStr = response.trim();
  if (jsonStr.startsWith("```")) {
    jsonStr = jsonStr.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }
  return JSON.parse(jsonStr);
}

/** Create an MDX blog post file. */
function createBlogPost(dir, dirName, fileName, { title, slug, description, tags, pubDatetime, linkedinUrl, content, images }) {
  const postDir = path.join(dir, dirName);
  fs.mkdirSync(postDir, { recursive: true });

  // Build image references
  let imageMarkdown = "";
  if (images && images.length > 0) {
    imageMarkdown = "\n" + images.map((img, i) => {
      const relPath = `../../../../assets/posts/blog/linkedin/${img}`;
      return `![Post image ${i + 1}](${relPath})`;
    }).join("\n\n") + "\n";
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
${imageMarkdown}
${content}
`;

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

async function processPost(post, dirNumber) {
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

  // Skip very short posts (less than 50 chars)
  if (post.content.trim().length < 50) {
    console.log("  Skipping: too short");
    return false;
  }

  // Build content with links resolved
  const processedContent = buildPostContent(post);
  const detectedLang = detectLanguage(post.content);
  console.log(`  Detected language: ${detectedLang}`);

  // Download images
  const images = [];
  fs.mkdirSync(ASSETS_DIR, { recursive: true });

  if (post.postImages && post.postImages.length > 0) {
    for (let i = 0; i < post.postImages.length; i++) {
      const img = post.postImages[i];
      const ext = img.url.includes(".gif") ? "gif" : img.url.includes(".png") ? "png" : "jpg";
      const filename = `li-${postId}-${i}.${ext}`;
      if (!fs.existsSync(path.join(ASSETS_DIR, filename))) {
        console.log(`  Downloading image ${i + 1}/${post.postImages.length}...`);
        const result = await downloadFile(img.url, ASSETS_DIR, filename);
        if (result) images.push(filename);
      } else {
        images.push(filename);
      }
    }
  }

  // Generate metadata and translations via Claude
  console.log("  Generating metadata and translations...");
  const metadata = await generatePostMetadata(processedContent, detectedLang, linkedinUrl);

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
    content: metadata.content_en,
    images,
  });

  // Create Spanish version
  createBlogPost(BLOG_ES, dirName, fileName, {
    title: metadata.title_es,
    slug: metadata.slug,
    description: metadata.description_es,
    tags: metadata.tags,
    pubDatetime,
    linkedinUrl,
    content: metadata.content_es,
    images,
  });

  return true;
}

async function main() {
  const args = process.argv.slice(2);
  const isBackfill = args[0] === "--backfill";
  const backfillFile = isBackfill ? args[1] : null;

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
      const created = await processPost(post, dirNumber);
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
