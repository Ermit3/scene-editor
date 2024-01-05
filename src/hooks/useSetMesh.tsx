import { setMesh } from "@/db";

async function useSetMesh(type: "cube" | "plane" | "sphere", sceneId: string) {
  const newMesh = await setMesh({ type, sceneId });
  return newMesh;
}

export default useSetMesh;
