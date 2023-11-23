"use client";

import { FC } from "react";
import { Icons } from "./icons";
import Tools from "./studio-tools";
import { useSceneState } from "./studio-provider";
import styles from "@/styles";
import { toolList } from "@/config/tool-list";
import { cn, randomNumber } from "@/lib/utils";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";
import useSetMesh from "@/hooks/useSetMesh";
import { Euler, Vector3 } from "three";
import { SceneIdParamsType, ShapeType } from "@/types";

const Toolbar: FC = () => {
  const { sceneId } = useParams<SceneIdParamsType>();
  const { currentTool, setCurrentTool, shapes, setShapes } = useSceneState();

  const onClick = () => {
    setCurrentTool(null);
    console.log(sceneId);
  };
  const onClickShape = (type: string) => {
    const newMesh = useSetMesh(type, sceneId);
    newMesh.then((result) => {
      return setShapes((prevList: ShapeType[]) => [
        ...prevList,
        {
          id: result[0].id,
          type: result[0].type,
          scale: new Vector3(1, 1, 1),
          coordinate: {
            position: new Vector3(
              0 * randomNumber(-1, 1),
              0 * randomNumber(-1, 1),
              0 * randomNumber(-1, 1)
            ),
            rotation: new Euler(0, 0, 0),
          },
          visible: true,
          shadow: { receive: false, cast: false },
        },
      ]);
    });
  };

  return (
    <div className={`absolute ${styles.studioToolsBg}`}>
      <nav className="z-30 flex shrink-0 grow-0 justify-around gap-1 border-t border-gray-200 bg-white/50 p-0.5 shadow-lg backdrop-blur-lg dark:border-slate-600/60 dark:bg-slate-800/50 fixed lg:top-[17.5%] focus:top-2/4 focus:-translate-y-2/4 left-6 min-h-[auto] min-w-[34px] flex-col rounded-full border">
        {toolList.map(({ name, icon }, k) => (
          <TooltipProvider key={k}>
            <Tooltip delayDuration={0}>
              <TooltipTrigger>
                <Tools name={name} icon={icon} />
              </TooltipTrigger>
              <TooltipContent
                className={`${styles.studioToolsBg} dark:text-white border border-gray-200`}
                side="right"
              >
                <p>{name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}

        <hr className="dark:border-gray-700/60" />

        <a
          href="/"
          className="flex h-12 w-12 flex-col items-center justify-center gap-1 text-fuchsia-900 dark:text-gray-400"
        >
          <Icons.arrowDownToDot />
        </a>
      </nav>
      <div
        className={cn(
          `z-20 fixed flex h-2/4 w-64 top-[17.5%] left-[5.5rem] rounded-md ${styles.studioToolsBg}`,
          {
            "animate-in duration-200 slide-in-from-left-4 fade-in-75":
              currentTool,
            "collapse animate-out duration-200 slide-out-from-left-4 fade-out-75":
              !currentTool,
          }
        )}
      >
        <div className="px-2.5 w-full">
          <div className="flex flex-row justify-between p-2.5">
            <div className="self-center">
              <p className="select-none">{currentTool}</p>
            </div>
            <div className="self-center" onClick={onClick}>
              <Icons.close />
            </div>
          </div>
          <div className="w-full">
            <Separator />
          </div>
          <div className="grid grid-cols-3 gap-1 justify-center">
            <div className="text-center h-20 w-20 grayscale">
              <img
                src="/shapes/cube.png"
                alt=""
                onClick={() => onClickShape("cube")}
              />
            </div>
            <div className="text-center h-20 w-20 grayscale">
              <img src="/shapes/sphere2.png" alt="" />
            </div>
            <div className="text-center h-20 w-20 grayscale">
              <img src="/shapes/torus2.png" alt="" />
            </div>
            <div className="text-center h-16 w-16 grayscale">
              <img src="/shapes/cone.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
