import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/Panel";
import { GameState } from "@/types";
import FactorDisplay from "@/components/display/FactorDisplay";

interface FermiChainPanelProps {
  show: boolean;
  state: GameState;
  onReset: () => void;
}

export default function FermiChainPanel({
  show,
  state,
  onReset,
}: FermiChainPanelProps) {
  if (!show) return null;

  return (
    <Panel header={"Fermi Chain"}>
      <div className="flex flex-wrap gap-2 items-center">
        {state.userFactors.map((factor, index) => (
          <>
            {index > 0 && (
              <span className="text-gray-500 dark:text-gray-400">×</span>
            )}
            <FactorDisplay key={factor.id} factor={factor} />
          </>
        ))}
      </div>
      <div className="flex justify-end">
        <Button onClick={onReset} size="sm">
          Reset
        </Button>
      </div>
    </Panel>
  );
}
