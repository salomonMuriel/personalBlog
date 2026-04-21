import {
  serial,
  varchar,
  text,
  boolean,
  timestamp,
  index,
  pgSchema,
} from "drizzle-orm/pg-core";

export const cumpleSchema = pgSchema("cumple-35");

export const attendingEnum = cumpleSchema.enum("attending_enum", [
  "yes",
  "no",
  "maybe",
]);

export const rsvps = cumpleSchema.table(
  "rsvps",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 60 }).notNull(),
    attending: attendingEnum("attending").notNull(),
    plusOne: boolean("plus_one").notNull().default(false),
    message: text("message"),
    selfie: text("selfie"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    ipHash: varchar("ip_hash", { length: 64 }),
  },
  table => ({
    attendingCreatedIdx: index("rsvps_attending_created_idx").on(
      table.attending,
      table.createdAt
    ),
    ipHashIdx: index("rsvps_ip_hash_idx").on(table.ipHash),
  })
);

export type RsvpInsert = typeof rsvps.$inferInsert;
export type RsvpRow = typeof rsvps.$inferSelect;
