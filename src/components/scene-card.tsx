import Link from "next/link";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export function SceneCard({ scene }: any) {
  return (
    <Card className="flex flex-col h-56 transition duration-300 ease-in-out hover:bg-slate-800">
      <CardContent className="flex-1 self-center">
        <Link
          href={`/editor/${scene.id}`}
          className="font-semibold hover:underline"
        >
          {scene.name}
        </Link>
      </CardContent>
      <CardFooter className="flex self-center">
        <p>Meshes : 0</p>
      </CardFooter>
    </Card>
  );
}
