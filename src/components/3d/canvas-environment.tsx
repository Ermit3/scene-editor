import { Environment, OrbitControls } from "@react-three/drei";
import Cursor from "./cursor";
import CanvasGrid from "./grid";
import CanvasLight from "./light";
import CanvasGizmoHelper from "./gizmo-helper";
import CanvasMeshes from "./canvas-meshes";

export const CanvaEnvironment = () => {
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
};

export default CanvaEnvironment;
