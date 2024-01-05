import useSetMesh from "@/hooks/useSetMesh";
import { randomNumber } from "@/lib/utils";
import { SceneIdParamsType, ShapeSelectorProps, ShapeType } from "@/types";
import { useParams } from "next/navigation";
import { FC } from "react";
import { Vector3, Euler } from "three";
import { useSceneState } from "./studio-provider";

const ShapeSelector: FC<ShapeSelectorProps> = ({ type }) => {
  const { sceneId } = useParams<SceneIdParamsType>();
  const { setShapes } = useSceneState();
  const newMesh = useSetMesh(type, sceneId);

  const onClickShape = () => {
    newMesh.then((result) => {
      return setShapes((prevList: ShapeType[]) => [
        ...prevList,
        {
          id: result[0].id,
          type: result[0].type,
          scale: new Vector3(1, 1, 1),
          coordinate: {
            position: new Vector3(
              0 * randomNumber(-1, 1),
              0 * randomNumber(-1, 1),
              0 * randomNumber(-1, 1)
            ),
            rotation: new Euler(0, 0, 0),
          },
          visible: true,
          shadow: { receive: false, cast: false },
        },
      ]);
    });
  };

  return (
    <div className="text-center h-20 w-20 grayscale">
      <img
        src={`/shapes/${type}.png`}
        alt={`${type} forme`}
        onClick={() => onClickShape()}
      />
    </div>
  );
};

export default ShapeSelector;
