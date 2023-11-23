import { cn } from "@/lib/utils";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useState } from "react";
import { Icons } from "./icons";
import { Input } from "./ui/input";
import { useSceneState } from "./studio-provider";
import { currentShape } from "./3d/shapes";
import { ShapeType } from "@/types";

interface ComponentsBarProps {
  hover: {
    hovered: boolean;
    setHovered: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

const ComponentsBar: React.FC<ComponentsBarProps> = ({ hover }) => {
  const { shapes } = useSceneState();
  const { hovered, setHovered } = hover;
  return (
    <div
      className={cn(`m-2.5 w-full h-full flex flex-col select-none`, {
        "animate-in duration-500 fade-in": hovered,
        "animate-out duration-1000 fade-out": !hovered,
      })}
    >
      <div className="flex flex-row justify-between">
        <div className="h-8 self-center">Added Components</div>
        <div
          className="w-8 h-8 self-center cursor-pointer"
          onClick={() => {
            setHovered(false);
          }}
        >
          <Icons.close />
        </div>
      </div>
      <div>
        <Input type="text" placeholder="Search Component..." />
      </div>
      <div className="w-full h-fit mt-2">
        <ScrollArea className="w-full h-48 rounded-md p-2">
          <div className="flex flex-row gap-1">
            <div className="w-4 h-4 self-center">
              <Icons.arrowRight className="w-4 h-4 self-center" />
            </div>
            <div className="flex flex-row gap-0.5">
              <div className="w-4 h-4 self-center">
                <Icons.globe className="w-4 h-4 self-center" />
              </div>
              <div className="h-4 text-sm">
                <span className="h-4">Components</span>
              </div>
            </div>
          </div>
          <div className="w-full">
            {shapes.map((shape: ShapeType, k: number) => {
              return (
                <div
                  key={shape.id}
                  className="flex flex-row w-full gap-1 mt-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md p-1 cursor-pointer"
                  onClick={() => {
                    currentShape.value = shape;
                  }}
                >
                  <div className="w-4 h-4 self-center">
                    <Icons.chevronRight className="w-4 h-4 self-center" />
                  </div>
                  <div className="flex flex-row gap-0.5">
                    <div className="w-4 h-4 self-center">
                      <Icons.box className="w-4 h-4 self-center" />
                    </div>
                    <div className="h-4 text-sm">
                      <span className="h-4">Box {k}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default ComponentsBar;
