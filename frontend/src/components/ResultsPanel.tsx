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
    <div className="bg-orange-400 p-4 rounded-lg m-3">
      <h2 className="text-lg font-bold">Win?</h2>
      <p>{isCorrectOom ? "Correct OOM!" : "Incorrect OOM!"}</p>
      <p>{isCorrectUnits ? "Correct Units!" : "Incorrect Units!"}</p>
    </div>
  );
}
