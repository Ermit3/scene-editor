import { pgTable, foreignKey, text, timestamp, integer, boolean, unique } from "drizzle-orm/pg-core"

import { sql } from "drizzle-orm"


export const scenes = pgTable("scenes", {
	id: text("id").primaryKey().notNull(),
	name: text("name"),
	userId: text("user_id").references(() => users.id),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
});

export const meshes = pgTable("meshes", {
	id: text("id").primaryKey().notNull(),
	name: text("name").notNull(),
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
	receiveShadow: boolean("receive_shadow").default(false),
	fromScene: text("from_scene").references(() => scenes.id),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
});

export const users = pgTable("users", {
	id: text("id").primaryKey().notNull(),
	email: text("email"),
	password: text("password"),
	role: text("role"),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		usersIdUnique: unique("users_id_unique").on(table.id),
	}
});