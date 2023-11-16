import { AddScene } from "@/components/add-scene-card";
import { CardSkeleton } from "@/components/card-skeleton";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="grid grid-cols-4 gap-4">
        <CardSkeleton />
        <CardSkeleton />
        <AddScene />
      </div>
    </main>
  );
}
