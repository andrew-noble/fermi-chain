import { Hook } from "@/types";
import { useState } from "react";
import { Button } from "@/components/display/ui/button";
import ResultsDialog from "@/components/features/ResultsDialog";

interface GameButtonAreaProps {
  hook: Hook;
  className?: string;
}

export default function GameButtonArea({
  hook,
  className = "",
}: GameButtonAreaProps) {
  const [showResults, setShowResults] = useState(false);

  return (
    <div className={`flex gap-2 sm:gap-4 ${className}`}>
      <Button
        className="bg-primary hover:bg-primary/80"
        disabled={hook.state.factors.length === 0}
        onClick={() => {
          hook.actions.submitFactor();
          setShowResults(true);
        }}
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
      <ResultsDialog
        open={showResults}
        onOpenChange={setShowResults}
        hook={hook}
      />
    </div>
  );
}
