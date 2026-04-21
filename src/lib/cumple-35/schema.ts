import {
  pgTable,
  serial,
  varchar,
  text,
  boolean,
  timestamp,
  index,
  pgEnum,
} from "drizzle-orm/pg-core";

export const attendingEnum = pgEnum("attending_enum", ["yes", "no", "maybe"]);

export const rsvps = pgTable(
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
