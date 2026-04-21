import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq, desc, sql } from "drizzle-orm";
import { rsvps, type RsvpInsert } from "./schema";

export { rsvps } from "./schema";
export type { RsvpInsert, RsvpRow } from "./schema";

function getDb() {
  const url =
    import.meta.env.NEON_DATABASE_URL ?? process.env.NEON_DATABASE_URL;
  if (!url) throw new Error("NEON_DATABASE_URL is not set");
  return drizzle(neon(url));
}

function firstName(full: string): string {
  return full.trim().split(/\s+/)[0];
}

export async function getConfirmed(): Promise<{
  count: number;
  names: string[];
}> {
  const db = getDb();
  const rows = await db
    .select({
      name: rsvps.name,
      plusOne: rsvps.plusOne,
      createdAt: rsvps.createdAt,
    })
    .from(rsvps)
    .where(eq(rsvps.attending, "yes"))
    .orderBy(desc(rsvps.createdAt));

  const count = rows.reduce((acc, r) => acc + 1 + (r.plusOne ? 1 : 0), 0);
  const names = rows.map(r => firstName(r.name));
  return { count, names };
}

export async function insertRsvp(input: RsvpInsert): Promise<void> {
  const db = getDb();
  await db.insert(rsvps).values(input);
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
