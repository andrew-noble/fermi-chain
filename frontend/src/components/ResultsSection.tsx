import { Hook } from "@/types";
import { useState } from "react";
import SubmitResetButtonGroup from "@/components/SubmitResetButtonGroup";
import ResultsDialog from "@/components/ResultsDialog";

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
      <div className="flex gap-2">
        <SubmitResetButtonGroup
          hook={hook}
          onSubmit={() => setIsResultsDialogOpen(true)}
        />
      </div>
      <ResultsDialog
        open={isResultsDialogOpen}
        onOpenChange={setIsResultsDialogOpen}
        hook={hook}
      />
    </div>
  );
}
