import { Hook } from "@/types";
import { Button } from "@/components/ui/button";

interface ResetButtonProps {
  hook: Hook;
}

export default function ResetButton({ hook }: ResetButtonProps) {
  if (hook.state.mode === "INIT") return null;

  return (
    <Button
      variant="outline"
      onClick={() => {
        hook.actions.reset();
      }}
    >
      Start Over
    </Button>
  );
}
