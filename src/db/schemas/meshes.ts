import {
  text,
  timestamp,
  integer,
  pgTable,
  boolean,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { scenes } from "./scenes";

export const meshes = pgTable("meshes", {
  id: text("id").notNull().primaryKey().unique(),
  name: text("name").$type<"cube" | "plane" | "sphere">().notNull(),
  positionX: integer("position_x").default(0).notNull(),
  positionY: integer("position_y").default(0).notNull(),
  positionZ: integer("position_z").default(0).notNull(),
  rotationX: integer("rotation_x").default(0).notNull(),
  rotationY: integer("rotation_y").default(0).notNull(),
  rotationZ: integer("rotation_z").default(0).notNull(),
  scaleX: integer("scale_x").default(0).notNull(),
  scaleY: integer("scale_y").default(0).notNull(),
  scaleZ: integer("scale_z").default(0).notNull(),
  viewable: boolean("viewable").default(true),
  castShadow: boolean("cast_shadow").default(false),
  recieveShadow: boolean("receive_shadow").default(false),
  fromScene: text("from_scene").references(() => scenes.id),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const meshesRelations = relations(meshes, ({ one }) => ({
  scene: one(scenes, {
    fields: [meshes.fromScene],
    references: [scenes.id],
  }),
}));
