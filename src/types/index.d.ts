import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

interface IdInterface {
  id: string;
}

interface EmailInterface {
  email: string;
}

interface SetUserInterface {
  email: string;
  password: string;
  role: "admin" | "customer";
}

// STUDIO
interface SceneInterface {
  id: string;
  name: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

interface EditorPageProps {
  params: { sceneId: string };
}

interface SceneStateType {
  currentTool: string | null;
  setCurrentTool: (tool: string | null) => void;
  shapes: any;
  setShapes: any;
  currentShape: any | null;
  setCurrentShape: (shape: any | null) => void;
}

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
  x: any;
  y: any;
  z: any;
};

interface SceneIdParamsType extends Params {
  sceneId: string;
}
