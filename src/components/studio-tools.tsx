"use client";

import { FC, useContext } from "react";
import { useSceneState } from "./studio-provider";
import { Icons } from "./icons";

interface ToolProps {
  name: string;
  icon: string;
}

interface IconComponents {
  [key: string]: React.ReactNode;
}

const Tools: FC<ToolProps> = ({ name, icon }) => {
  const { setCurrentTool } = useSceneState();

  const getIconComponent = (iconName: string) => {
    // Assuming Icons is an object with icon components
    const iconComponents: IconComponents = {
      component: <Icons.component />,
      boxes: <Icons.boxes />,
      upload: <Icons.upload />,
      type: <Icons.type />,
      playSquare: <Icons.playSquare />,
      globe: <Icons.globe />,
      shell: <Icons.shell />,
      theater: <Icons.theater />,
      activity: <Icons.activity />,
    };

    return iconComponents[iconName] || null;
  };

  const onFocus = () => {
    setCurrentTool(null);
    setCurrentTool(name);
  };
  return (
    <a
      href="#"
      className="flex aspect-square h-12 w-12 flex-col items-center justify-center gap-1 rounded-full p-1.5 focus:bg-indigo-50 focus:text-indigo-600 focus:dark:bg-sky-900 focus:dark:text-sky-50 dark:hover:bg-slate-800 hover:bg-gray-100"
      onClick={(e) => e.preventDefault()}
      onFocus={onFocus}
    >
      {getIconComponent(icon)}
    </a>
  );
};

export default Tools;
