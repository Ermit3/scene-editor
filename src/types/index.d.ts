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

//
interface SceneInterface {
  id: string;
  name: string;
  owner: any;
  createdAt: string;
  updatedAt: string;
}
