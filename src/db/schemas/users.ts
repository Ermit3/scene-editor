import { scenes } from "./scenes";
import { serial, text, timestamp, pgTable } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: text("id").notNull().primaryKey().unique(),
  email: text("email").notNull().unique(),
  password: text("password"),
  role: text("role").$type<"admin" | "customer">(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  scenes: many(scenes),
}));
