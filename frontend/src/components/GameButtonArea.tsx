import { Hook } from "@/types";
import { useState } from "react";
import SubmitResetButtonGroup from "@/components/SubmitResetButtonGroup";
import ResultsDialog from "@/components/ResultsDialog";

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
    <div className={`flex flex-col gap-4 ${className}`}>
      <SubmitResetButtonGroup
        hook={hook}
        onSubmit={() => {
          hook.actions.submitFactor();
          setShowResults(true);
        }}
      />
      <ResultsDialog
        open={showResults}
        onOpenChange={setShowResults}
        hook={hook}
      />
    </div>
  );
}
