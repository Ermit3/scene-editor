import {
  text,
  timestamp,
  integer,
  pgTable,
  boolean,
  decimal,
  numeric,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { scenes } from "./scenes";

export const meshes = pgTable("meshes", {
  id: text("id").notNull().primaryKey().unique(),
  type: text("type").$type<"cube" | "plane" | "sphere">().notNull(),
  positionX: decimal("position_x").notNull(),
  positionY: decimal("position_y").notNull(),
  positionZ: decimal("position_z").notNull(),
  rotationX: decimal("rotation_x").notNull(),
  rotationY: decimal("rotation_y").notNull(),
  rotationZ: decimal("rotation_z").notNull(),
  scaleX: decimal("scale_x").notNull(),
  scaleY: decimal("scale_y").notNull(),
  scaleZ: decimal("scale_z").notNull(),
  visible: boolean("visible").default(true),
  castShadow: boolean("cast_shadow").default(false),
  recieveShadow: boolean("receive_shadow").default(false),
  sceneId: text("scene_id").references(() => scenes.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const meshesRelations = relations(meshes, ({ one }) => ({
  scene: one(scenes, {
    fields: [meshes.sceneId],
    references: [scenes.id],
  }),
}));
