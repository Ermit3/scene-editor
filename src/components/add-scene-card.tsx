import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Icons } from "./icons";

export function AddScene() {
  return (
    <Card className="flex flex-col">
      <CardContent className="flex-1 items-center justify-between">
        <Icons.add className="h-10 w-10" />
      </CardContent>
      <CardFooter className="flex self-center">
        <h2>ADD SCENE</h2>
      </CardFooter>
    </Card>
  );
}
