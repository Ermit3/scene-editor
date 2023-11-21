import * as z from "zod";

import { getAllScenes, setScene } from "@/db";

const sceneCreateSchema = z.object({
  name: z.string(),
});

export async function GET() {
  try {
    const scenes = await getAllScenes();
    return new Response(JSON.stringify(scenes));
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const body = sceneCreateSchema.parse(json);

    const scene = await setScene(body.name);

    return new Response(JSON.stringify(scene[0]));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
