import Link from "next/link";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { FC } from "react";
import { getMeshesByScene } from "@/db";
import { useSignal } from "signals-react-safe";
import { SceneType } from "@/types";

// const getMeshes = (id: string) => {
//   return getMeshesByScene(id).then((meshes) => {
//     return meshes.length;
//   });
// };

export const SceneCard = ({ scene }: { scene: SceneType }) => {
  // const meshCount = useSignal(getMeshes(scene.id));
  return (
    <Card className="flex flex-col h-56 transition duration-300 ease-in-out hover:bg-slate-800">
      <CardContent className="flex-1 self-center py-3">
        <Link
          href={`/studio/${scene.id}`}
          className="font-semibold hover:underline"
        >
          {scene.name}
        </Link>
      </CardContent>
      <CardFooter className="flex self-center">
        {/* <p>Meshes : {meshCount.value}</p> */}
      </CardFooter>
    </Card>
  );
};

export default SceneCard;
