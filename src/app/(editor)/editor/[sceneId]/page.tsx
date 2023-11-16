import { notFound, redirect } from "next/navigation";

import { getSceneById } from "@/db";
import { EditorSidebar } from "@/components/editor-sidebar";

import { Canvas } from "@react-three/fiber";
import { Grid } from "@react-three/drei";
import EditorCanva from "@/components/editor-canva";

interface EditorPageProps {
  params: { sceneId: string };
}

export default async function EditorPage({ params }: EditorPageProps) {
  const scene = await getSceneById(params.sceneId);

  if (scene.length === 0) {
    notFound();
  }

  return (
    <main className="flex flex-row absolute w-full h-full">
      <section className="flex-1">
        <EditorCanva />
      </section>
      <EditorSidebar />
    </main>
  );
}
