import { Panel } from "@/components/ui/Panel";

interface ResultsPanelProps {
  show: boolean;
  isCorrectOom: boolean;
  isCorrectUnits: boolean;
}

export default function ResultsPanel({
  show,
  isCorrectOom,
  isCorrectUnits,
}: ResultsPanelProps) {
  if (!show) return null;
  return (
    <Panel>
      <h2 className="text-lg font-bold">Results</h2>
      <p>{isCorrectOom ? "Correct OOM!" : "Incorrect OOM!"}</p>
      <p>{isCorrectUnits ? "Correct Units!" : "Incorrect Units!"}</p>
    </Panel>
  );
}
