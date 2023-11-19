"use client";

import { Canvas } from "@react-three/fiber";
import CanvaEnvironment from "./3d/canvaEnvironment";

export default function EditorCanva() {
  return (
    <Canvas camera={{ fov: 75, near: 0.001, far: 100, position: [1, 1, 2] }}>
      <CanvaEnvironment />
    </Canvas>
  );
}
