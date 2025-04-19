import { Panel } from "@/components/ui/Panel";
import { Unit } from "@/types";
import UnitSelector from "@/components/unit-selection/UnitSelector";

interface UnitSelectionPanelProps {
  show: boolean;
  units: Unit[];
  onAddNumerator: (unit: Unit) => void;
  onAddDenominator: (unit: Unit) => void;
}

export default function UnitSelectionPanel({
  show,
  units,
  onAddNumerator,
  onAddDenominator,
}: UnitSelectionPanelProps) {
  if (!show) return null;

  return (
    <Panel
      header={
        <div className="flex items-center gap-2">
          <h2 className="text-base md:text-lg font-semibold">Unit Toolbox</h2>
        </div>
      }
    >
      <div className="flex flex-wrap gap-2">
        {units.map((unit) => (
          <UnitSelector
            key={unit.id}
            unit={unit}
            onAddNumerator={onAddNumerator}
            onAddDenominator={onAddDenominator}
          />
        ))}
      </div>
    </Panel>
  );
}
