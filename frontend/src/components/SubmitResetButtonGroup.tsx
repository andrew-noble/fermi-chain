import { Hook } from "@/types/hookTypes";
import { Button } from "./ui/button";

interface SubmitResetButtonGroupProps {
  hook: Hook;
  onSubmit: () => void;
}

export default function SubmitResetButtonGroup({
  hook,
  onSubmit,
}: SubmitResetButtonGroupProps) {
  return (
    <>
      <Button
        className="bg-primary hover:bg-primary/80"
        disabled={hook.state.factors.length === 0}
        onClick={onSubmit}
      >
        Submit
      </Button>
      <Button
        variant="outline"
        disabled={hook.state.factors.length === 0}
        onClick={() => {
          hook.actions.reset();
        }}
      >
        Start Over
      </Button>
    </>
  );
}
