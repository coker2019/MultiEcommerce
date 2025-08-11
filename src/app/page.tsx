import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  return (
    <div className=" flex flex-col gap-y-4 p-4">
      <div>
        <Input placeholder="i be input"></Input>
      </div>

      <div>
        <Button variant="elevated">i am a button</Button>
      </div>

      <div>
        <Progress value={50}></Progress>
      </div>
      <div>
        <Textarea placeholder="i m a textarea"></Textarea>
      </div>
      <div>
        <Checkbox></Checkbox>
      </div>
    </div>
  );
}
