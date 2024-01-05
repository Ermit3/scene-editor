import { AddScene } from "@/components/scene-create-button";
import { SceneCard } from "@/components/scene-card";
import { SceneInterface } from "@/types";

async function getData() {
  try {
    const response = await fetch("https://127.0.0.1:3000/api/scenes", {
      // No cache
      next: { revalidate: 0 },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export default async function Home() {
  const scenes = await getData();

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="grid grid-cols-4 gap-4">
        {scenes?.length ? (
          <>
            {scenes.map((scene: SceneInterface, k: number) => (
              <SceneCard key={k} scene={scene} />
            ))}
          </>
        ) : (
          <></>
        )}
        <AddScene />
      </div>
    </main>
  );
}
