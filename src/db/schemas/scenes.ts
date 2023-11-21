import { serial, text, timestamp, pgTable } from "drizzle-orm/pg-core";
import { users } from "./users";

import { relations } from "drizzle-orm";
import { meshes } from "./meshes";

export const scenes = pgTable("scenes", {
  id: text("id").notNull().primaryKey().unique(),
  name: text("name"),
  owner: text("user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const scenesRelations = relations(scenes, ({ many }) => ({
  // user: one(users, {
  //   fields: [scenes.owner],
  //   references: [users.id],
  // }),
  meshes: many(meshes),
}));
