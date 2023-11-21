ALTER TABLE "meshes" RENAME COLUMN "name" TO "type";--> statement-breakpoint
ALTER TABLE "meshes" RENAME COLUMN "viewable" TO "visible";--> statement-breakpoint
ALTER TABLE "meshes" ALTER COLUMN "scale_x" SET DEFAULT 1;--> statement-breakpoint
ALTER TABLE "meshes" ALTER COLUMN "scale_y" SET DEFAULT 1;--> statement-breakpoint
ALTER TABLE "meshes" ALTER COLUMN "scale_z" SET DEFAULT 1;