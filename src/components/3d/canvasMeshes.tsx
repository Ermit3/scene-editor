import { Shape } from "./shapes";
import { useSceneState } from "../studio-provider";
import { useParams } from "next/navigation";
import { getMeshesByScene } from "@/db";
import { Vector3, Euler } from "three";
import { useEffect } from "react";

export default function CanvasMeshes() {
  const { sceneId } = useParams<any>();
  const { shapes, setShapes } = useSceneState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getMeshesByScene(sceneId);
        result.forEach(
          ({
            id,
            type,
            positionX,
            positionY,
            positionZ,
            rotationX,
            rotationY,
            rotationZ,
            scaleX,
            scaleY,
            scaleZ,
            visible,
            castShadow,
            recieveShadow,
          }: any) => {
            if (shapes.filter((shape: any) => shape.id === id).length === 0) {
              setShapes((prevList: any) => [
                ...prevList,
                {
                  id,
                  type,
                  scale: new Vector3(scaleX, scaleY, scaleZ),
                  coordinate: {
                    position: new Vector3(positionX, positionY, positionZ),
                    rotation: new Euler(rotationX, rotationY, rotationZ),
                  },
                  visible,
                  shadow: { receive: recieveShadow, cast: castShadow },
                },
              ]);
            }
          }
        );
      } catch (error) {
        console.error("Error fetching meshes:", error);
      }
    };

    fetchData();
  }, [shapes]);

  return (
    <>
      {shapes.map(
        ({ id, type, scale, coordinate, visible, shadow }: any, k: number) => {
          return (
            <Shape
              key={k}
              id={id}
              type={type}
              scale={scale}
              position={coordinate.position}
              rotation={coordinate.rotation}
              visible={visible}
              castShadow={shadow.cast}
              receiveShadow={shadow.receive}
            />
          );
        }
      )}
    </>
  );
}
