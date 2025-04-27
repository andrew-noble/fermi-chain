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
    <div className={`flex gap-2 sm:gap-4 ${className}`}>
      <SubmitResetButtonGroup
        hook={hook}
        onSubmit={() => {
          hook.actions.submitFactor(); //make sure whatever is in the editor gets submitted
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
