import { Hook } from "@/types";
import { useState } from "react";
import SubmitResetButtonGroup from "./SubmitResetButtonGroup";
import ResultsDialog from "./ResultsDialog";

interface ResultsSectionProps {
  show: boolean;
  hook: Hook;
  className?: string;
}

export default function ResultsSection({
  show,
  hook,
  className = "",
}: ResultsSectionProps) {
  if (!show) return null;

  const [isResultsDialogOpen, setIsResultsDialogOpen] = useState(false);

  return (
    <div className={className}>
      <SubmitResetButtonGroup
        hook={hook}
        onSubmit={() => setIsResultsDialogOpen(true)}
      />
      <ResultsDialog
        open={isResultsDialogOpen}
        onOpenChange={setIsResultsDialogOpen}
        hook={hook}
      />
    </div>
  );
}
