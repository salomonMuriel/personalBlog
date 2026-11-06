import {
  boolean,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const respuestasCuestionario = pgTable("respuestas_cuestionario", {
  id: uuid("id").primaryKey().defaultRandom(),
  creado: timestamp("creado", { withTimezone: true }).notNull().defaultNow(),
  idioma: text("idioma").notNull(),
  version: text("version").notNull(),
  encaje: text("encaje").notNull(),
  nombre: text("nombre").notNull(),
  empresa: text("empresa").notNull(),
  whatsapp: text("whatsapp").notNull(),
  correo: text("correo"),
  mensaje: text("mensaje"),
  sector: text("sector").notNull(),
  sectorOtro: text("sector_otro"),
  tamano: text("tamano").notNull(),
  donde: text("donde").array().notNull(),
  excels: text("excels").notNull(),
  duele: text("duele").array().notNull(),
  horas: text("horas").notNull(),
  cuando: text("cuando").notNull(),
  decide: text("decide").notNull(),
  origen: jsonb("origen").notNull().default({}),
  correoEnviado: boolean("correo_enviado").notNull().default(false),
});

export type NuevaRespuesta = typeof respuestasCuestionario.$inferInsert;
