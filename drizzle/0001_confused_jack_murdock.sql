CREATE TABLE IF NOT EXISTS "meshes" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"position_x" integer DEFAULT 0 NOT NULL,
	"position_y" integer DEFAULT 0 NOT NULL,
	"position_z" integer DEFAULT 0 NOT NULL,
	"rotation_x" integer DEFAULT 0 NOT NULL,
	"rotation_y" integer DEFAULT 0 NOT NULL,
	"rotation_z" integer DEFAULT 0 NOT NULL,
	"scale_x" integer DEFAULT 0 NOT NULL,
	"scale_y" integer DEFAULT 0 NOT NULL,
	"scale_z" integer DEFAULT 0 NOT NULL,
	"viewable" boolean DEFAULT true,
	"cast_shadow" boolean DEFAULT false,
	"receive_shadow" boolean DEFAULT false,
	"from_scene" text,
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "meshes_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "scenes" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"user_id" text,
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "scenes_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "users" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "meshes" ADD CONSTRAINT "meshes_from_scene_scenes_id_fk" FOREIGN KEY ("from_scene") REFERENCES "scenes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "scenes" ADD CONSTRAINT "scenes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_id_unique" UNIQUE("id");