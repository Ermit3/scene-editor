import { Outlines } from "@react-three/drei";
import { Box } from "lucide-react";
import { FC, useRef, useState } from "react";
import { currentShape } from "./shapes";
import { useSceneState } from "../studio-provider";
import { ShapeType } from "@/types";

interface AddMeshProps {
  id: string;
  type: string;
  material: string;
}

const AddMesh: FC<AddMeshProps> = ({ id, type, material, ...props }) => {
  const shapeRef = useRef<any>();
  const { shapes } = useSceneState();
  const [active, setActive] = useState(false);

  const onClick = () => {
    currentShape.value = shapes.filter(
      (shape: ShapeType) => shape.id === id
    )[0];
    setActive(!active);
  };

  const getMeshComponent = () => {
    const material = <meshBasicMaterial color="grey" />;
    const outline = (
      <Outlines
        thickness={active ? 0.015 : 0}
        color={"orange"}
        screenspace={false}
        opacity={1}
        transparent={true}
        angle={Math.PI}
      />
    );
    switch (type) {
      case "cube":
        return (
          <Box ref={shapeRef} onClick={onClick} {...props}>
            {material}
            {outline}
          </Box>
        );
      case "sphere":
        return "<Icons.boxes />";
      case "plane":
        return "<Icons.upload />";
      case "torus":
        return "<Icons.type />";
      case "cone":
        return "<Icons.playSquare />";
      default:
        return null;
    }
  };
  return <>{getMeshComponent()}</>;
};

export default AddMesh;
