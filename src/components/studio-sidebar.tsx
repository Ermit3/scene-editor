"use client";

import { useContext, useEffect } from "react";
import { useSceneState } from "./studio-provider";
import styles from "@/styles";
import { cn } from "@/lib/utils";

export function EditorSidebar() {
  const { currentTool } = useSceneState();

  return (
    <div
      className={cn(
        `absolute w-52 inset-y-0 ${styles.studioToolsBg} text-black dark:text-white rounded-md`,
        {
          "-right-0 animate-in duration-500 slide-in-from-right fade-in":
            currentTool,
          "-right-52 animate-out duration-200 slide-out-from-left fade-out":
            !currentTool,
        }
      )}
    >
      {currentTool}
    </div>
  );
}
