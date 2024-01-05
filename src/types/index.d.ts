import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

type IdInterface = {
  id: string;
};

type EmailInterface = {
  email: string;
};

type SetUserInterface = {
  email: string;
  password: string;
  role: "admin" | "customer";
};

type SceneType = {
  id: string;
  name: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
};

// STUDIO
type SceneInterface = {
  id: string;
  name: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
};

type EditorPageProps = {
  params: { sceneId: string };
};

type SceneStateType = {
  currentTool: string | null;
  setCurrentTool: (tool: string | null) => void;
  shapes: any;
  setShapes: any;
  currentShape: any | null;
  setCurrentShape: (shape: any | null) => void;
};

type ShapeProps = {
  id: string;
  type: string;
  scale: Vector3;
  position: Vector3;
  rotation: Euler;
  visible: boolean;
  castShadow: boolean;
  receiveShadow: boolean;
};

type ShapeType = {
  id: string;
  type: string;
  scale: Vector3;
  coordinate: {
    position: Vector3;
    rotation: Euler;
  };
  visible: boolean;
  shadow: {
    receive: boolean;
    cast: boolean;
  };
};

type ShapeDbType = {
  id: string;
  type: string;
  positionX: number;
  positionY: number;
  positionZ: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  scaleX: number;
  scaleY: number;
  scaleZ: number;
  visible: boolean;
  castShadow: boolean;
  recieveShadow: boolean;
};

type ShapesConfigProps = {
  activeShape: ShapeType;
};

type XYZType = {
  x: number;
  y: number;
  z: number;
};

interface SceneIdParamsType extends Params {
  sceneId: string;
}

type ShapeSelectorProps = {
  type: "cube" | "plane" | "sphere";
};

type ToolProps = {
  name: string;
  icon: string;
};

type IconComponents = {
  [key: string]: React.ReactNode;
};
