import { Environment, OrbitControls } from "@react-three/drei";
import Cursor from "./cursor";
import CanvaGrid from "./grid";
import CanvaLight from "./light";
import CanvaGizmoHelper from "./gizmoHelper";

export default function CanvaEnvironment() {
  return (
    <>
      <CanvaLight />
      <CanvaGrid />

      <Cursor />

      <OrbitControls makeDefault />
      <Environment preset="city" />
      <CanvaGizmoHelper />
    </>
  );
}
