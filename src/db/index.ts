import { nanoid } from "nanoid";

import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { desc, eq } from "drizzle-orm";

import * as usersSchema from "./schemas/users";
import * as scenesSchema from "./schemas/scenes";
import * as meshesSchema from "./schemas/meshes";

import { users } from "./schemas/users";
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
export const getUser = async ({ email }: EmailInterface) => {
  return await db.select().from(users).where(eq(users.email, email));
};

export const getUserById = async ({ id }: IdInterface) => {
  return await db.select().from(users).where(eq(users.id, id));
};

export const setUser = async ({ email, password, role }: SetUserInterface) => {
  return db
    .insert(users)
    .values({ id: nanoid(), email, password, role })
    .returning();
};

export const updateUser = async ({ id }: IdInterface) => {
  return db
    .update(users)
    .set({ updatedAt: new Date() })
    .where(eq(users.id, id))
    .returning();
};

export const deleteUser = async ({ id }: IdInterface) => {
  return await db.delete(users).where(eq(users.id, id)).returning();
};

// CRUD SCENE
export const getAllScenes = async () => {
  return await db.select().from(scenes).orderBy(desc(scenes.name));
};

export const getSceneById = async (id: string) => {
  return await db.select().from(scenes).where(eq(scenes.id, id));
};

export const setScene = async ({ name }: { name: string }) => {
  return db.insert(scenes).values({ id: nanoid(), name }).returning();
};

export const deleteScene = async ({ id }: IdInterface) => {
  return await db.delete(scenes).where(eq(scenes.id, id)).returning();
};
