"use client";

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

  return (
    <SceneState.Provider value={{ currentTool, setCurrentTool }}>
      {children}
    </SceneState.Provider>
  );
}
