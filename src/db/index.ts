import { users } from "./schemas/users";
import { nanoid } from "nanoid";

import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";

import * as usersSchema from "./schemas/users";
import * as scenesSchema from "./schemas/scenes";
import * as meshesSchema from "./schemas/meshes";

import { scenes } from "./schemas/scenes";

neonConfig.fetchConnectionCache = true;

const sql = neon(process.env.PGDATABASE_URL!);
export const db = drizzle(sql, {
  schema: {
    ...usersSchema,
    ...scenesSchema,
    ...meshesSchema,
  },
});

// CRUD USER
export const getUser = async (email: string) => {
  return await db.select().from(users).where(eq(users.email, email));
};

export const getUserById = async (id: string) => {
  return await db.select().from(users).where(eq(users.id, id));
};

export const setUser = async (email: string, role: "admin" | "customer") => {
  return db.insert(users).values({ id: nanoid(), email, role }).returning();
};

export const updateUser = async (id: string) => {
  return db
    .update(users)
    .set({ updatedAt: new Date() })
    .where(eq(users.id, id))
    .returning();
};

export const deleteUser = async (id: string) => {
  return await db.delete(users).where(eq(users.id, id)).returning();
};

// CRUD SCENE
export const getAllScenes = async () => {
  return await db.select().from(scenes);
};

export const getOneScene = async (id: string) => {
  return await db.select().from(scenes).where(eq(scenes.id, id));
};

export const setScene = async (name: string) => {
  return db.insert(scenes).values({ id: nanoid(), name }).returning();
};

export const deleteScene = async (id: string) => {
  return await db.delete(scenes).where(eq(scenes.id, id)).returning();
};
