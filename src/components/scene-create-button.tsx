"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Icons } from "./icons";

import { generate } from "@/lib/name-generator";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const AddScene = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onClick() {
    setIsLoading(true);

    const response = await fetch("/api/scenes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: generate({ words: 5 }).spaced,
      }),
    });

    setIsLoading(false);

    const scene = await response.json();

    router.refresh();

    router.push(`/studio/${scene.id}`);
  }

  return (
    <Card
      className="flex flex-col max-h-56 transition duration-300 ease-in-out hover:bg-slate-800 cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="flex-1 self-center">
        <Icons.add className="h-40 w-40 opacity-95" />
      </CardContent>
      <CardFooter className="flex self-center">
        <h2>ADD SCENE</h2>
      </CardFooter>
    </Card>
  );
};
