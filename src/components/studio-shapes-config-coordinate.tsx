import { FC } from "react";
import { Input } from "./ui/input";

interface CoordinateConfigProps {
  type: string;
  className?: string;
  onChange: (e: any, axis: string) => void;
}

const CoordinateConfig: FC<CoordinateConfigProps> = ({
  type,
  className,
  onChange,
}) => {
  return (
    <div className={className}>
      <div className="">
        <p>{type.charAt(0).toUpperCase() + type.slice(1)}</p>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex self-center">
          <p className="w-2/5 self-center">X</p>
          <Input
            type="number"
            placeholder="0"
            className="bg-gray-700 text-center"
            onChange={(e) => onChange(e, "x")}
          />
        </div>
        <div className="flex self-center">
          <p className="w-2/5 self-center">Y</p>
          <Input
            type="number"
            placeholder="0"
            className="bg-gray-700 text-center"
            onChange={(e) => onChange(e, "y")}
          />
        </div>
        <div className="flex self-center">
          <p className="w-2/5 self-center">Z</p>
          <Input
            type="number"
            placeholder="0"
            className="bg-gray-700 text-center"
            onChange={(e) => onChange(e, "z")}
          />
        </div>
      </div>
    </div>
  );
};

export default CoordinateConfig;
