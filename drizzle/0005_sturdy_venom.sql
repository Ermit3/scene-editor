ALTER TABLE "meshes" RENAME COLUMN "from_scene" TO "scene_id";--> statement-breakpoint
ALTER TABLE "meshes" DROP CONSTRAINT "meshes_from_scene_scenes_id_fk";
--> statement-breakpoint
ALTER TABLE "meshes" ALTER COLUMN "position_x" SET DATA TYPE numeric;--> statement-breakpoint
ALTER TABLE "meshes" ALTER COLUMN "position_x" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "meshes" ALTER COLUMN "position_y" SET DATA TYPE numeric;--> statement-breakpoint
ALTER TABLE "meshes" ALTER COLUMN "position_y" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "meshes" ALTER COLUMN "position_z" SET DATA TYPE numeric;--> statement-breakpoint
ALTER TABLE "meshes" ALTER COLUMN "position_z" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "meshes" ALTER COLUMN "rotation_x" SET DATA TYPE numeric;--> statement-breakpoint
ALTER TABLE "meshes" ALTER COLUMN "rotation_x" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "meshes" ALTER COLUMN "rotation_y" SET DATA TYPE numeric;--> statement-breakpoint
ALTER TABLE "meshes" ALTER COLUMN "rotation_y" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "meshes" ALTER COLUMN "rotation_z" SET DATA TYPE numeric;--> statement-breakpoint
ALTER TABLE "meshes" ALTER COLUMN "rotation_z" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "meshes" ALTER COLUMN "scale_x" SET DATA TYPE numeric;--> statement-breakpoint
ALTER TABLE "meshes" ALTER COLUMN "scale_x" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "meshes" ALTER COLUMN "scale_y" SET DATA TYPE numeric;--> statement-breakpoint
ALTER TABLE "meshes" ALTER COLUMN "scale_y" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "meshes" ALTER COLUMN "scale_z" SET DATA TYPE numeric;--> statement-breakpoint
ALTER TABLE "meshes" ALTER COLUMN "scale_z" DROP DEFAULT;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "meshes" ADD CONSTRAINT "meshes_scene_id_scenes_id_fk" FOREIGN KEY ("scene_id") REFERENCES "scenes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
