import { deleteMesh, updateMesh } from "@/db";
import { Box, Edges, Outlines, PivotControls } from "@react-three/drei";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Euler, Matrix4, Quaternion, Vector3 } from "three";
import { useSceneState } from "../studio-provider";
import _ from "lodash";

interface ShapeProps {
  id: string;
  type: string;
  scale: Vector3;
  position: Vector3;
  rotation: Euler;
  visible: boolean;
  castShadow: boolean;
  receiveShadow: boolean;
}

export const Shape: React.FC<ShapeProps> = ({ id, type, ...props }) => {
  const { position, rotation, scale, visible, castShadow, receiveShadow } = {
    ...props,
  };
  const { shapes, setShapes } = useSceneState();

  const shapeRef = useRef<any>();
  const [isMounted, setIsMounted] = useState(true);
  const [active, setActive] = useState(false);

  const [_position, setPosition] = useState<any>({
    x: position.x,
    y: position.y,
    z: position.z,
  });
  const [_rotation, setRotation] = useState<any>({
    x: rotation.x,
    y: rotation.y,
    z: rotation.z,
  });

  const onClick = () => {
    setActive(!active);
  };

  useEffect(() => {
    return () => {
      setIsMounted(false);
    };
  }, []);

  const onDoubleClick = async () => {
    deleteMesh(id).then(() => {
      if (isMounted) {
        const updatedShapes = shapes.filter((shape: any) => shape.id !== id);
        setShapes(updatedShapes);
      }
    });
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
          <Box
            ref={shapeRef}
            onClick={onClick}
            onDoubleClick={onDoubleClick}
            {...props}
          >
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

  const onDrag = useCallback(
    (l: Matrix4, dl: Matrix4, w: Matrix4, dw: Matrix4) => {
      const newPosition = new Vector3();
      const newRotation = new Euler();
      const quaternionRotation = new Quaternion();
      w.decompose(newPosition, quaternionRotation, new Vector3());
      newRotation.setFromQuaternion(quaternionRotation);
      const updatedPosition = newPosition;
      const updatedRotation = newRotation;

      setPosition({
        x: parseFloat(_position.x) + updatedPosition.x,
        y: parseFloat(_position.y) + updatedPosition.y,
        z: parseFloat(_position.z) + updatedPosition.z,
      });
      setRotation(updatedRotation);

      console.log("Position:", _position);
      console.log("Rotation:", _rotation);
    },
    [position, rotation]
  );

  const onDragEnd = async () => {
    console.log(_position.x, _position.y, _position.z);
    updateMesh({
      id,
      scale,
      position: _position,
      rotation: _rotation,
      visible,
      shadow: { cast: castShadow, receive: receiveShadow },
    });
  };
  return (
    <>
      {visible && (
        <Suspense fallback={<></>}>
          <PivotControls
            scale={0.75}
            anchor={[-1, -1, -1]}
            depthTest={false}
            onDrag={onDrag}
            onDragEnd={onDragEnd}
            visible={active}
          >
            {getMeshComponent()}
          </PivotControls>
        </Suspense>
      )}
    </>
  );
};
