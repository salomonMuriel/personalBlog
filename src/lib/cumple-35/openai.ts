import sharp from "sharp";

const BASE_PROMPT_SINGLE = `Transform this photo into a 16-bit SNES/NES era pixel art portrait.
Tight limited palette (8-12 vibrant colors), strong 1px black outlines, chunky
pixels, mild retro dithering. Preserve the person's face, hair color, skin tone,
and outfit silhouette but render them as a retro video game character.
Square framing, subject centered, flat or simple background.`;

const BASE_PROMPT_MULTI = `Transform this photo into a 16-bit SNES/NES era pixel art GROUP portrait.
The source photo contains TWO people. Render BOTH of them, side by side in the same frame,
each as a retro video game character. Preserve each person's face, hair color, skin tone,
and outfit silhouette. Tight limited palette (8-12 vibrant colors), strong 1px black outlines,
chunky pixels, mild retro dithering. Square framing, both subjects centered and clearly visible,
flat or simple background.`;

const BASE_MASCOT_PROMPT_SINGLE = `Create a cute, friendly, gender-neutral mascot creature in 16-bit SNES/NES era pixel art style.
Make it a whimsical monster, critter, or animal (never a human person), rendered as a retro video game sprite.
Tight limited palette (8-12 vibrant colors), strong 1px black outlines, chunky pixels, mild retro dithering.
Square framing, subject centered, flat or simple background, wholesome and approachable.`;

const BASE_MASCOT_PROMPT_PAIR = `Create a PAIR of cute, friendly, gender-neutral mascot creatures in 16-bit SNES/NES era pixel art style —
TWO creatures side by side, both clearly visible in the same frame, friendly with each other.
Make them whimsical monsters, critters, or animals (never human people), rendered as retro video game sprites.
Tight limited palette (8-12 vibrant colors), strong 1px black outlines, chunky pixels, mild retro dithering.
Square framing, both subjects centered, flat or simple background, wholesome and approachable.`;

// Back-compat export used elsewhere if any; defaults to single.
export const BASE_PROMPT = BASE_PROMPT_SINGLE;

export const FRANCHISES: Record<string, string> = {
  "chrono-trigger":
    "Style it inspired by Chrono Trigger (SNES): round-eyed anime JRPG sprite, vivid saturated colors, smooth cel shading, friendly adventurer vibe.",
  "final-fantasy-6":
    "Style it inspired by Final Fantasy VI (SNES): chibi RPG battle-sprite proportions, ornate flowing outfit detail, muted jewel-tone palette.",
  earthbound:
    "Style it inspired by EarthBound / Mother 2 (SNES): quirky cartoon overworld sprite, flat colors, whimsical expression.",
  "secret-of-mana":
    "Style it inspired by Secret of Mana (SNES): bright fantasy JRPG sprite, soft shading, slightly chibi proportions.",
  "super-mario-world":
    "Style it inspired by Super Mario World (SNES): bold cartoon platformer sprite, playful proportions, saturated primaries.",
  "zelda-link-past":
    "Style it inspired by The Legend of Zelda: A Link to the Past (SNES): top-down adventurer sprite, green-tunic-hero palette energy, crisp outlines.",
  "street-fighter-2":
    "Style it inspired by Street Fighter II (SNES/Arcade): muscular fighting-game portrait, dramatic high-contrast shading, bold pose.",
  "mega-man-x":
    "Style it inspired by Mega Man X (SNES): sleek armored hero sprite, metallic highlights, vibrant blue/red accents.",
  "donkey-kong-country":
    "Style it inspired by Donkey Kong Country (SNES): pre-rendered CG-look sprite, rich shading, jungle adventurer vibe.",
  "super-metroid":
    "Style it inspired by Super Metroid (SNES): dark sci-fi armored-suit sprite, moody palette, lonely-planet atmosphere.",
  "kirby-super-star":
    "Style it inspired by Kirby Super Star (SNES): round cute pastel-colored sprite, cheerful simple shapes.",
  "castlevania-4":
    "Style it inspired by Super Castlevania IV (SNES): gothic horror hero sprite, whip in hand, moonlit palette.",
  "pokemon-trainer":
    "Style it inspired by Pokémon Red/Blue trainer card art: bold outlined anime portrait, game-boy-era palette energy.",
  "golden-axe":
    "Style it inspired by Golden Axe (Genesis/Arcade): barbarian fantasy warrior sprite, fur and bronze, dramatic pose.",
  "sonic-classic":
    "Style it inspired by Sonic the Hedgehog (Genesis): bright spiky attitude-era sprite, bold cyan and red palette.",
};

export const DND_CLASSES: Record<string, string> = {
  fighter:
    "Depict them as a D&D Fighter: plate armor, sword and shield, stoic hero pose.",
  wizard:
    "Depict them as a D&D Wizard: flowing robes, arcane focus, spellbook, wise expression.",
  rogue:
    "Depict them as a D&D Rogue: dark hooded cloak, twin daggers, sly grin.",
  cleric:
    "Depict them as a D&D Cleric: holy symbol, mace, divine glowing aura.",
  paladin:
    "Depict them as a D&D Paladin: gleaming plate armor, glowing greatsword, righteous stance.",
  ranger:
    "Depict them as a D&D Ranger: leather armor, longbow, woodland cloak.",
  bard: "Depict them as a D&D Bard: flashy outfit, lute, charismatic smirk.",
  barbarian:
    "Depict them as a D&D Barbarian: fur and leather, greataxe, primal war paint.",
  druid:
    "Depict them as a D&D Druid: nature robes, wooden staff, leaves and vines motif.",
  monk: "Depict them as a D&D Monk: simple robes, martial-arts stance, serene focus.",
  sorcerer:
    "Depict them as a D&D Sorcerer: wild-magic aura, arcane symbols, draconic hint.",
  warlock:
    "Depict them as a D&D Warlock: eldritch robes, otherworldly patron energy, glowing eyes.",
};

export function composeEditPrompt(style: string, multiple = false): string {
  const base = multiple ? BASE_PROMPT_MULTI : BASE_PROMPT_SINGLE;
  const suffix = multiple
    ? "\n\nRemember: apply this style to BOTH people in the group portrait."
    : "";
  if (!style || style === "default") return base;
  const [kind, ...rest] = style.split(":");
  const value = rest.join(":").trim();
  if (kind === "franchise" && FRANCHISES[value]) {
    return `${base}\n\n${FRANCHISES[value]}${suffix}`;
  }
  if (kind === "dnd" && DND_CLASSES[value]) {
    return `${base}\n\n${DND_CLASSES[value]}${suffix}`;
  }
  if (kind === "custom" && value.length > 0) {
    const safe = value.slice(0, 200).replace(/[\r\n]+/g, " ");
    return `${base}\n\nStyle direction from user (apply it to the character${multiple ? "s" : ""}): ${safe}${suffix}`;
  }
  return base;
}

function pickRandom<T>(xs: T[]): T {
  return xs[Math.floor(Math.random() * xs.length)];
}

export function composeDefaultMascotPrompt(multiple = false): string {
  const base = multiple ? BASE_MASCOT_PROMPT_PAIR : BASE_MASCOT_PROMPT_SINGLE;
  const franchiseKey = pickRandom(Object.keys(FRANCHISES));
  const franchiseMod = FRANCHISES[franchiseKey].replace(
    "Style it",
    multiple
      ? "Give the creatures a visual style"
      : "Give the creature a visual style"
  );
  return `${base}\n\n${franchiseMod}`;
}

function getApiKey(): string {
  return (
    (import.meta as unknown as { env?: Record<string, string> }).env
      ?.OPENAI_API_KEY ??
    process.env.OPENAI_API_KEY ??
    ""
  );
}

async function shrinkToDataUrl(b64: string): Promise<string> {
  let finalPng: Buffer;
  try {
    finalPng = await sharp(Buffer.from(b64, "base64"))
      .resize(256, 256, { fit: "cover" })
      .png({ compressionLevel: 9 })
      .toBuffer();
  } catch {
    finalPng = Buffer.from(b64, "base64");
  }
  return `data:image/png;base64,${finalPng.toString("base64")}`;
}

export async function callEdit(
  sourcePng: Buffer,
  prompt: string
): Promise<{ ok: true; dataUrl: string } | { ok: false; error: string }> {
  const apiKey = getApiKey();
  if (!apiKey) return { ok: false, error: "OPENAI_API_KEY not set" };

  const form = new FormData();
  form.append("model", "gpt-image-1.5");
  form.append("prompt", prompt);
  form.append("n", "1");
  form.append("size", "1024x1024");
  form.append(
    "image",
    new Blob([new Uint8Array(sourcePng)], { type: "image/png" }),
    "source.png"
  );

  try {
    const res = await fetch("https://api.openai.com/v1/images/edits", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}` },
      body: form,
    });
    const json = (await res.json()) as {
      data?: { b64_json?: string }[];
      error?: { message?: string };
    };
    if (!res.ok) {
      return {
        ok: false,
        error: json?.error?.message || `OpenAI ${res.status}`,
      };
    }
    const b64 = json.data?.[0]?.b64_json;
    if (!b64) return { ok: false, error: "Respuesta vacía" };
    return { ok: true, dataUrl: await shrinkToDataUrl(b64) };
  } catch (err) {
    console.error("openai edit failed", err);
    return { ok: false, error: "OpenAI no respondió" };
  }
}

export async function callGenerate(
  prompt: string
): Promise<{ ok: true; dataUrl: string } | { ok: false; error: string }> {
  const apiKey = getApiKey();
  if (!apiKey) return { ok: false, error: "OPENAI_API_KEY not set" };

  try {
    const res = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-image-1.5",
        prompt,
        n: 1,
        size: "1024x1024",
      }),
    });
    const json = (await res.json()) as {
      data?: { b64_json?: string }[];
      error?: { message?: string };
    };
    if (!res.ok) {
      return {
        ok: false,
        error: json?.error?.message || `OpenAI ${res.status}`,
      };
    }
    const b64 = json.data?.[0]?.b64_json;
    if (!b64) return { ok: false, error: "Respuesta vacía" };
    return { ok: true, dataUrl: await shrinkToDataUrl(b64) };
  } catch (err) {
    console.error("openai generate failed", err);
    return { ok: false, error: "OpenAI no respondió" };
  }
}

export async function normalizeSourcePng(raw: File): Promise<Buffer> {
  return await sharp(Buffer.from(await raw.arrayBuffer()))
    .rotate()
    .resize(1024, 1024, { fit: "cover" })
    .png()
    .toBuffer();
}
