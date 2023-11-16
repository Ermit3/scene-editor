"use client";

import { Canvas } from "@react-three/fiber";
import CanvaEnvironment from "./3d/canvaEnvironment";

export default function EditorCanva() {
  return (
    <Canvas>
      <CanvaEnvironment />
    </Canvas>
  );
}
