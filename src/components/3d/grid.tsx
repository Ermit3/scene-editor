import { Grid } from "@react-three/drei";
import { DoubleSide } from "three";

export default function CanvaGrid() {
  return (
    <Grid
      position={[0, -0.001, 0]}
      args={[10.5, 10.5]}
      fadeDistance={25}
      cellThickness={0.65}
      cellSize={0.5}
      sectionThickness={1.1}
      sectionSize={2}
      cellColor={"#6f6f6f"}
      sectionColor={"#9d4b4b"}
      infiniteGrid={true}
      side={DoubleSide}
    />
  );
}
