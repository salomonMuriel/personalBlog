I need to backfill LinkedIn posts as blog posts. Each subagent will generate the metadata and translations directly — no API calls needed.

## Data
- Backfill JSON: `scripts/linkedin-backfill.json` (229 posts from Apify)

## What each agent should do

For each post assigned to it:

1. Skip posts with empty content
2. Resolve contentAttributes into markdown links:
   - PROFILE_MENTION: `[Name](https://linkedin.com/in/{publicIdentifier})`
   - COMPANY_NAME: `[Name](company.linkedinUrl)`
   - TEXT_LINK: `[text](textLink or hyperlink)`
3. Detect the language (most are Spanish — look for common Spanish words like "que", "para", "con", "por", "mas", "pero", etc.)
4. Generate the metadata and translations yourself:
   - `slug`: english URL slug, max 8 words, lowercase with hyphens
   - `title_es`: compelling Spanish title
   - `title_en`: English title
   - `description_es`: 1-2 sentence Spanish summary
   - `description_en`: 1-2 sentence English summary
   - `tags`: always include "linkedin", pick 2-4 more from: entrepreneurship, tech, leadership, education, parenting, ai, startups, innovation, culture, books, personal, colombia, business, productivity, hiring, consulting, balance
   - `content_es`: full post body in Colombian Spanish with markdown formatting
   - `content_en`: full post body in English with markdown formatting
5. Images have already been downloaded to `src/assets/posts/blog/linkedin/li-{postId}-{index}.jpg`. For each post.postImages entry, reference the corresponding local file at the END of the post. Do NOT download images — they are already there.
6. Write MDX files to `src/content/blog/en/{dir}/{slug}.mdx` and `src/content/blog/es/{dir}/{slug}.mdx`

## Translation guidelines

**Colombian Spanish (es):**
- If the original IS in Spanish, keep it essentially unchanged — only light cleanup for blog readability (paragraph breaks, formatting). Do NOT rephrase the author's words.
- Use natural Colombian Spanish, "tu" form. Only use Colombian slang (bacano, parcero, etc.) if the original already uses it.

**English (en):**
- If the original IS in English, keep it essentially unchanged — only light cleanup.
- Natural, conversational American English. Preserve the author's voice: direct, passionate, sometimes irreverent.
- Adapt cultural references so English readers get the intent (brief parenthetical context if needed).

**Key rules:**
- PRESERVE intent, humor, and personality above all
- Keep ALL markdown links exactly as resolved
- Keep emojis that add personality
- Do NOT add or remove content
- The content fields should NOT include the title or LinkedIn link — those go in frontmatter

## Blog post MDX format

The file should have YAML frontmatter then the body. Here is the template (replace curly-brace placeholders):

```
---
author: Salomon Muriel
pubDatetime: {ISO date from post.postedAt.date}
modDatetime: {same as pubDatetime}
title: "{title in respective language}"
slug: {slug}
featured: false
draft: false
tags:
  - linkedin
  - {other tags}
description: "{description in respective language}"
canonicalURL: {post.linkedinUrl}
---
```

After the frontmatter, add a blockquote linking to the original post:

```
> *Originally posted on [LinkedIn]({post.linkedinUrl})*
```

Then the content body in the respective language.

Then at the END, any images referenced like:

```
![Post image 1](../../../../assets/posts/blog/linkedin/li-{postId}-0.jpg)
```

## Directory numbering

Existing blog posts go up to 009 (plus 999 which is special). Assign directories starting from 010 as `{number}-li-{slug}/` where number is zero-padded to 3 digits. I will tell each agent its number range.

## Execution plan

1. Read `scripts/linkedin-backfill.json`
2. Filter out posts with empty content, sort by date ascending
3. Split into ~10 batches of ~23 posts each
4. Launch 10 agents IN PARALLEL — each agent gets its batch of posts (as JSON) and its directory number range (e.g., agent 1: 010-032, agent 2: 033-055, etc.)
5. Each agent processes all its posts, writing the MDX files (images are already downloaded)
6. After ALL agents complete, update `scripts/.linkedin-sync-state.json` with all synced post IDs

## Pre-requisite: download images first

Before running this prompt, images must be downloaded by running:

```
node scripts/sync-linkedin.mjs --backfill scripts/linkedin-backfill.json --download-images-only
```
