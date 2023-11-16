"use client";

import { Circle, Edges, Sphere } from "@react-three/drei";

export default function Cursor() {
  return (
    <group>
      <Circle scale={0.001}>
        <meshBasicMaterial color="#fff" opacity={0} />
        <Edges scale={35} renderOrder={1000} color={"#fff"} />
      </Circle>
      <Circle scale={0.001} rotation={[-Math.PI * 0.5, 0, 0]}>
        <meshBasicMaterial color="#fff" opacity={0} />
        <Edges scale={35} renderOrder={1000} color={"#fff"} />
      </Circle>
    </group>
  );
}
