"use client";

import { SceneStateType, ShapeType } from "@/types";
import { createContext, useContext, useState } from "react";

const SceneState = createContext<SceneStateType | undefined>(undefined);

export const useSceneState = () => {
  const context = useContext(SceneState);
  if (!context) {
    throw new Error("useSceneState must be used within a StudioProvider");
  }
  return context;
};

export default function StudioProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentTool, setCurrentTool] = useState<string | null>(null);
  const [currentShape, setCurrentShape] = useState<ShapeType | null>(null);
  const [shapes, setShapes] = useState<ShapeType[]>([]);

  return (
    <SceneState.Provider
      value={{
        currentTool,
        setCurrentTool,
        shapes,
        setShapes,
        currentShape,
        setCurrentShape,
      }}
    >
      {children}
    </SceneState.Provider>
  );
}
