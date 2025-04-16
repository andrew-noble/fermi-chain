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
    <Panel>
      <h2 className="text-lg font-bold">Current Fermi Chain:</h2>
      {state.userFactors.map((factor) => (
        <FactorDisplay key={factor.id} factor={factor} />
      ))}
      <Button onClick={onReset}>Reset</Button>
    </Panel>
  );
}
