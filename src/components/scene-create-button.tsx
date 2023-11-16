"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Icons } from "./icons";

import { customAlphabet } from "nanoid/non-secure";
import { generate } from "@/lib/name-generator";
import { useRouter } from "next/navigation";
import { useState } from "react";

const nanoid = customAlphabet("1234567890abcdef", 10);

export function AddScene() {
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

    // This forces a cache invalidation.
    router.refresh();

    router.push(`/editor/${scene.id}`);
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
}
