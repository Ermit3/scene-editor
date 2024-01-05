import { notFound } from "next/navigation";

import { getSceneById } from "@/db";
import { EditorSidebar } from "@/components/studio-sidebar";

import EditorCanva from "@/components/studio-canva";
import Toolbar from "@/components/studio-toolbar";
import StudioProvider from "@/components/studio-provider";
import { EditorPageProps } from "@/types";

export default async function EditorPage({ params }: EditorPageProps) {
  const scene = await getSceneById(params.sceneId);
  if (scene.length === 0) notFound();

  return (
    <main className="flex flex-row absolute w-full max-w-screen h-full overflow-hidden">
      <StudioProvider>
        <section className="flex-1">
          <Toolbar />
          <EditorCanva />
        </section>
        <EditorSidebar />
      </StudioProvider>
    </main>
  );
}
