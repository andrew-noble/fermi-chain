import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/Panel";
import { GameState } from "@/types";
import FactorDisplay from "@/components/display/FactorDisplay";

interface FermiChainPanelProps {
  state: GameState;
  onReset: () => void;
}

export default function FermiChainPanel({
  state,
  onReset,
}: FermiChainPanelProps) {
  return (
    <Panel className="p-4">
      <div className="space-y-4">
        <h2 className="text-lg font-bold">Current Fermi Chain:</h2>
        <div className="space-y-2">
          {state.userFactors.map((factor) => (
            <FactorDisplay key={factor.id} factor={factor} />
          ))}
        </div>
        <div className="flex justify-end">
          <Button onClick={onReset} size="sm">
            Reset
          </Button>
        </div>
      </div>
    </Panel>
  );
}
