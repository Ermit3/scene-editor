"use client";

import { Canvas } from "@react-three/fiber";
import CanvasEnvironment from "./3d/canvasEnvironment";
import { useSceneState } from "./studio-provider";

export default function EditorCanva() {
  const { setCurrentTool } = useSceneState();
  return (
    <Canvas
      camera={{ fov: 75, near: 0.001, far: 100, position: [1, 1, 2] }}
      onPointerMissed={() => setCurrentTool(null)}
    >
      <CanvasEnvironment />
    </Canvas>
  );
}
