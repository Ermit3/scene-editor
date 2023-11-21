import { setMesh } from "@/db";

async function useSetMesh(type: string, sceneId: string) {
  const newMesh = await setMesh({ type, sceneId });
  return newMesh;
}

export default useSetMesh;
