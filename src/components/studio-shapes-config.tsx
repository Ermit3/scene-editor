"use client";

import { cn } from "@/lib/utils";
import styles from "@/styles";
import { Icons } from "./icons";
import { deleteMesh } from "@/db";
import { useSceneState } from "./studio-provider";
import useDidMountEffect from "@/hooks/useDidMountEffect";
import { useState } from "react";
import { ShapeType, ShapesConfigProps } from "@/types";

const ShapesConfig: React.FC<ShapesConfigProps> = ({ activeShape }) => {
  const { shapes, setShapes } = useSceneState();
  const [updatedShapes, setUpdatedShapes] = useState<ShapeType[] | undefined>();

  useDidMountEffect(() => {
    if (updatedShapes) {
      setShapes(updatedShapes);
    }
  }, [updatedShapes]);

  const onclick = () => {
    deleteMesh(activeShape.id).then(() => {
      const _updatedShapes = shapes.filter(
        (shape: ShapeType) => shape.id !== activeShape.id
      );
      setUpdatedShapes(_updatedShapes);
    });
  };
  return (
    <div
      className={cn(
        `absolute w-64 h-96 top-[40%] right-8 ${styles.studioToolsBg} text-black dark:text-white rounded-md select-none`,
        {
          "animate-in duration-500 slide-in-from-right fade-in": activeShape.id,
          "collapse animate-out duration-200 slide-out-from-left fade-out":
            !activeShape.id,
        }
      )}
    >
      <div className="flex flex-col">
        <div className="flex flex-row justify-between p-2.5">
          <div>{activeShape.id}</div>
          <div onClick={onclick}>
            <Icons.trash className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShapesConfig;
