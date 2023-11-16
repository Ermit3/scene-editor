CREATE TABLE IF NOT EXISTS "users" (
	"id" serial NOT NULL,
	"email" text,
	"password" text,
	"role" text,
	"created_at" timestamp,
	"updated_at" timestamp
);
