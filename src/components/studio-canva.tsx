"use client";

import { Canvas } from "@react-three/fiber";
import CanvasEnvironment from "./3d/canvasEnvironment";
import { useSceneState } from "./studio-provider";
import { currentShape } from "./3d/shapes";

export default function EditorCanva() {
  const { setCurrentTool } = useSceneState();
  const onPointerMissed = () => {
    currentShape.value = [];
    setCurrentTool(null);
  };
  return (
    <Canvas
      camera={{ fov: 75, near: 0.001, far: 100, position: [1, 1, 2] }}
      onPointerMissed={onPointerMissed}
    >
      <CanvasEnvironment />
    </Canvas>
  );
}
