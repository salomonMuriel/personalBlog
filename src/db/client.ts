import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { DATABASE_URL } from "astro:env/server";
import * as schema from "./schema";

export const db = drizzle(neon(DATABASE_URL), { schema });
