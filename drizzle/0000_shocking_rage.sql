CREATE TYPE "public"."attending_enum" AS ENUM('yes', 'no', 'maybe');--> statement-breakpoint
CREATE TABLE "rsvps" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(60) NOT NULL,
	"attending" "attending_enum" NOT NULL,
	"plus_one" boolean DEFAULT false NOT NULL,
	"message" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"ip_hash" varchar(64)
);
--> statement-breakpoint
CREATE INDEX "rsvps_attending_created_idx" ON "rsvps" USING btree ("attending","created_at");--> statement-breakpoint
CREATE INDEX "rsvps_ip_hash_idx" ON "rsvps" USING btree ("ip_hash");