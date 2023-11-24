"use client";

import { FC, useState } from "react";
import { useSignalEffect } from "signals-react-safe";

import { currentShape } from "./3d/shapes";
import { Icons } from "./icons";
import { cn } from "@/lib/utils";
import styles from "@/styles";
import ComponentsBar from "./studio-components-bar";
import ShapeConfig from "./studio-shapes-config";
import { ShapeType } from "@/types";

export const EditorSidebar: FC = () => {
  const [hovered, setHovered] = useState(false);
  const [activeShape, setActiveShape] = useState<ShapeType | []>(
    currentShape.value
  );

  useSignalEffect(() => {
    setActiveShape(currentShape.value);
  });

  return (
    <>
      <div
        className={cn(
          `absolute flex w-10 h-10 top-12 right-8 ${styles.studioToolsBg} text-black dark:text-white rounded-md`,
          {
            "w-64 lg:h-72 animate-in duration-700 slide-in-from-right": hovered,
            "w-10 h-10 justify-center animate-in duration-700 slide-in-from-right":
              !hovered,
          }
        )}
      >
        {!hovered ? (
          <Icons.layers
            className={cn(`w-6 h-6`, {
              "animate-out duration-1000 fade-out": hovered,
              "self-center animate-in duration-1000 fade-in": !hovered,
            })}
            onClick={() => setHovered(true)}
          />
        ) : (
          <ComponentsBar hover={{ hovered, setHovered }} />
        )}
      </div>
      <ShapeConfig activeShape={activeShape} />
    </>
  );
};
