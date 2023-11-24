import { Circle, Edges } from "@react-three/drei";

export const Cursor = () => {
  return (
    <group>
      <Circle scale={0.001} position={[0, -0.5, 0]}>
        <meshBasicMaterial color="#fff" opacity={0} />
        <Edges scale={35} renderOrder={1000} color={"#fff"} />
      </Circle>
      <Circle
        scale={0.001}
        rotation={[-Math.PI * 0.5, 0, 0]}
        position={[0, -0.5, 0]}
      >
        <meshBasicMaterial color="#fff" opacity={0} />
        <Edges scale={35} renderOrder={1000} color={"#fff"} />
      </Circle>
    </group>
  );
};

export default Cursor;
