"use client";

import { cn } from "@/lib/utils";
import styles from "@/styles";
import { Icons } from "./icons";
import { deleteMesh, updateMesh } from "@/db";
import { useSceneState } from "./studio-provider";
import useDidMountEffect from "@/hooks/useDidMountEffect";
import { useState } from "react";
import { ShapeType, ShapesConfigProps, XYZType } from "@/types";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import CoordinateConfig from "./studio-shapes-config-coordinate";

const ShapesConfig: React.FC<ShapesConfigProps> = ({ activeShape }) => {
  const { shapes, setShapes } = useSceneState();
  const [updatedShapes, setUpdatedShapes] = useState<ShapeType[] | undefined>();

  useDidMountEffect(() => {
    if (updatedShapes) {
      console.log(updatedShapes);
      console.log(shapes);
      setShapes(updatedShapes);
    }
  }, [updatedShapes]);

  const onClickTrash = () => {
    deleteMesh(activeShape.id).then(() => {
      const _updatedShapes = shapes.filter(
        (shape: ShapeType) => shape.id !== activeShape.id
      );

      // setShapes(
      //   shapes.filter((shape: ShapeType) => shape.id !== activeShape.id)
      // );

      // const _updatedShapes = shapes.map((shape: ShapeType) => {
      //   if (shape.id === activeShape.id) {
      //     return { ...shape, visible: false };
      //   } else {
      //     return shape;
      //   }
      // });
      setUpdatedShapes(_updatedShapes);
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, target: string) => {
    updateMesh({
      id: activeShape.id,
      position: {
        x: target === "x" ? e.target.value : activeShape.coordinate.position.x,
        y: target === "y" ? e.target.value : activeShape.coordinate.position.y,
        z: target === "z" ? e.target.value : activeShape.coordinate.position.z,
      },
      rotation: {
        x: activeShape.coordinate.rotation.x,
        y: activeShape.coordinate.rotation.y,
        z: activeShape.coordinate.rotation.z,
      },
      scale: {
        x: activeShape.scale.x,
        y: activeShape.scale.y,
        z: activeShape.scale.z,
      },
      visible: activeShape.visible,
      shadow: {
        cast: activeShape.shadow.cast,
        receive: activeShape.shadow.receive,
      },
    }).then(() => {
      setUpdatedShapes(
        shapes.map((shape: ShapeType) => {
          if (shape.id === activeShape.id) {
            return {
              ...shape,
              coordinate: {
                ...shape.coordinate,
                position: {
                  x:
                    target === "x"
                      ? e.target.value
                      : shape.coordinate.position.x,
                  y:
                    target === "y"
                      ? e.target.value
                      : shape.coordinate.position.y,
                  z:
                    target === "z"
                      ? e.target.value
                      : shape.coordinate.position.z,
                },
              },
            };
          } else {
            return shape;
          }
        })
      );
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
          <div onClick={onClickTrash}>
            <Icons.trash className="w-4 h-4" />
          </div>
        </div>
        <ScrollArea className="w-full h-80 rounded-md p-2">
          <div className="flex flex-col gap-4">
            <CoordinateConfig
              type="position"
              className="flex flex-col py-1.5 px-2.5 gap-2.5"
              onChange={onChange}
            />

            <CoordinateConfig
              type="rotation"
              className="flex flex-col py-1.5 px-2.5 gap-2.5"
              onChange={onChange}
            />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default ShapesConfig;
