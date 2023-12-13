import { updateMesh } from "@/db";
import { Box, Outlines, PivotControls, Sphere, Torus } from "@react-three/drei";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Euler, Matrix4, Quaternion, Vector3 } from "three";
import { useSceneState } from "../studio-provider";
import { signal } from "signals-react-safe";
import { ShapeProps, ShapeType, XYZType } from "@/types";

export let currentShape = signal<ShapeType | []>([]);

export const Shape: React.FC<ShapeProps> = ({ id, type, ...props }) => {
  const { position, rotation, scale, visible, castShadow, receiveShadow } = {
    ...props,
  };
  const { shapes } = useSceneState();

  const shapeRef = useRef<any>();
  const [isMounted, setIsMounted] = useState(true);
  const [active, setActive] = useState(false);

  const [_position, setPosition] = useState<XYZType>({
    x: parseFloat(position.x),
    y: parseFloat(position.y),
    z: parseFloat(position.z),
  });
  const [_rotation, setRotation] = useState<XYZType>({
    x: rotation.x,
    y: rotation.y,
    z: rotation.z,
  });

  const onClick = (e: any): void => {
    e.stopPropagation();
    currentShape.value = shapes.filter(
      (shape: ShapeType) => shape.id === id
    )[0];
    setActive(!active);
  };

  useEffect(() => {
    return () => {
      setIsMounted(false);
    };
  }, []);

  const getMeshComponent = () => {
    const material = <meshStandardMaterial color="grey" />;
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
            {/* {outline} */}
          </Box>
        );
      case "sphere":
        return (
          <Sphere ref={shapeRef} onClick={onClick} scale={[0.15]} {...props}>
            {material}
            {/* {outline} */}
          </Sphere>
        );
      case "plane":
        return "<Icons.upload />";
      case "torus":
        return (
          <Torus ref={shapeRef} onClick={onClick} scale={[0.15]} {...props}>
            {material}
            {/* {outline} */}
          </Torus>
        );
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
        x: _position.x + updatedPosition.x,
        y: _position.y + updatedPosition.y,
        z: _position.z + updatedPosition.z,
      });
      setRotation(updatedRotation);
    },
    [position, rotation]
  );

  const onDragEnd = async () => {
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
