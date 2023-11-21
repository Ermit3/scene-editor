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
}
