import { Environment, OrbitControls } from "@react-three/drei";
import Cursor from "./cursor";
import CanvasGrid from "./grid";
import CanvasLight from "./light";
import CanvasGizmoHelper from "./gizmoHelper";
import CanvasMeshes from "./canvasMeshes";

export default function CanvaEnvironment() {
  return (
    <>
      <CanvasLight />
      <CanvasGrid />
      <Cursor />

      <CanvasMeshes />

      <OrbitControls makeDefault />
      <Environment preset="city" />
      <CanvasGizmoHelper />
    </>
  );
}
