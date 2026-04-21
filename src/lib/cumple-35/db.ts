import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq, desc, sql, inArray } from "drizzle-orm";
import { rsvps, type RsvpInsert } from "./schema";

export { rsvps } from "./schema";
export type { RsvpInsert, RsvpRow } from "./schema";

function getDb() {
  const url =
    import.meta.env.NEON_DATABASE_URL ?? process.env.NEON_DATABASE_URL;
  if (!url) throw new Error("NEON_DATABASE_URL is not set");
  return drizzle(neon(url));
}

export interface ConfirmedGuest {
  id: number;
  name: string;
  hasSelfie: boolean;
  maybe: boolean;
}

export async function getConfirmed(): Promise<{
  count: number;
  names: string[];
  guests: ConfirmedGuest[];
}> {
  const db = getDb();
  const rows = await db
    .select({
      id: rsvps.id,
      name: rsvps.name,
      attending: rsvps.attending,
      plusOne: rsvps.plusOne,
      selfie: rsvps.selfie,
      createdAt: rsvps.createdAt,
    })
    .from(rsvps)
    .where(inArray(rsvps.attending, ["yes", "maybe"]))
    .orderBy(desc(rsvps.createdAt));

  const count = rows.reduce(
    (acc, r) => (r.attending === "yes" ? acc + 1 + (r.plusOne ? 1 : 0) : acc),
    0
  );
  const names = rows.map(r => r.name.trim());
  const guests: ConfirmedGuest[] = rows.map(r => ({
    id: r.id,
    name: r.name.trim(),
    hasSelfie: !!r.selfie,
    maybe: r.attending === "maybe",
  }));
  return { count, names, guests };
}

export async function insertRsvp(input: RsvpInsert): Promise<number> {
  const db = getDb();
  const [row] = await db
    .insert(rsvps)
    .values(input)
    .returning({ id: rsvps.id });
  return row.id;
}

export async function getSelfie(id: number): Promise<string | null> {
  const db = getDb();
  const rows = await db
    .select({ selfie: rsvps.selfie })
    .from(rsvps)
    .where(eq(rsvps.id, id))
    .limit(1);
  return rows[0]?.selfie ?? null;
}

export async function setSelfieIfMissing(
  id: number,
  dataUrl: string
): Promise<boolean> {
  const db = getDb();
  // Only update if selfie is still NULL and the row is < 15 minutes old.
  // Guards against token reuse and retries overwriting a user-submitted selfie.
  const result = await db
    .update(rsvps)
    .set({ selfie: dataUrl })
    .where(
      sql`${rsvps.id} = ${id} AND ${rsvps.selfie} IS NULL AND ${rsvps.createdAt} > NOW() - INTERVAL '15 minutes'`
    )
    .returning({ id: rsvps.id });
  return result.length > 0;
}

export async function existsRecentFromIpHash(ipHash: string): Promise<boolean> {
  const db = getDb();
  const result = await db
    .select({ id: rsvps.id })
    .from(rsvps)
    .where(
      sql`${rsvps.ipHash} = ${ipHash} AND ${rsvps.createdAt} > NOW() - INTERVAL '1 hour'`
    )
    .limit(1);
  return result.length > 0;
}
