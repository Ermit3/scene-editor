import { nanoid } from "nanoid";

import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { desc, eq } from "drizzle-orm";

import * as usersSchema from "./schemas/users";
import * as scenesSchema from "./schemas/scenes";
import * as meshesSchema from "./schemas/meshes";

import { users } from "./schemas/users";
import { scenes } from "./schemas/scenes";
import { meshes } from "./schemas/meshes";

import dotenv from "dotenv";
import { EmailInterface, IdInterface, SetUserInterface } from "@/types";

dotenv.config({ path: "./.env.local" });

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

export const setScene = async (name: string) => {
  return db.insert(scenes).values({ id: nanoid(), name }).returning();
};

export const deleteScene = async (id: string) => {
  return await db.delete(scenes).where(eq(scenes.id, id)).returning();
};

// CRUD MESHES
export const getMeshesByScene = async (id: string) => {
  return await db.select().from(meshes).where(eq(meshes.sceneId, id));
};

export const setMesh = async ({
  type,
  sceneId,
}: {
  type: "cube" | "plane" | "sphere";
  sceneId: string;
}) => {
  return await db
    .insert(meshes)
    .values({
      id: nanoid(),
      type,
      positionX: "0",
      positionY: "0",
      positionZ: "0",
      rotationX: "0",
      rotationY: "0",
      rotationZ: "0",
      scaleX: "1",
      scaleY: "1",
      scaleZ: "1",
      sceneId,
    })
    .returning();
};

export const updateMesh = async ({
  id,
  scale,
  position,
  rotation,
  shadow,
  visible,
}: any) => {
  return await db
    .update(meshes)
    .set({
      positionX: position.x,
      positionY: position.y,
      positionZ: position.z,
      rotationX: rotation.x,
      rotationY: rotation.y,
      rotationZ: rotation.z,
      scaleX: scale.x,
      scaleY: scale.y,
      scaleZ: scale.z,
      visible,
      castShadow: shadow.cast,
      recieveShadow: shadow.receive,
      updatedAt: new Date(),
    })
    .where(eq(meshes.id, id))
    .returning();
};

export const deleteMesh = async (id: string) => {
  return await db.delete(meshes).where(eq(meshes.id, id)).returning();
};
