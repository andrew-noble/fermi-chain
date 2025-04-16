import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/Panel";
import { Unit } from "@/types";

interface FermiChainPanelProps {
  netUserUnits: Record<string, { count: number; unitMetadata: Unit }>;
  netUserOom: { value: number };
  onReset: () => void;
}

export default function FermiChainPanel({
  netUserUnits,
  netUserOom,
  onReset,
}: FermiChainPanelProps) {
  return (
    <Panel>
      <h2 className="text-lg font-bold">Current Game State:</h2>
      <p>
        Your (cancelled) units:{" "}
        {Object.entries(netUserUnits).map(([id, { count, unitMetadata }]) => (
          <span key={id}>
            {unitMetadata.name} (
            {count > 0
              ? "numerator x" + count
              : "denominator x" + Math.abs(count)}
            )
          </span>
        ))}
      </p>
      <p>Your Answer: {netUserOom.value}</p>
      <Button onClick={onReset}>Reset</Button>
    </Panel>
  );
}
