import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/Panel";
import { Unit } from "@/types";

interface UnitSelectionPanelProps {
  units: Unit[];
  onAddNumerator: (unit: Unit) => void;
  onAddDenominator: (unit: Unit) => void;
}

export default function UnitSelectionPanel({
  units,
  onAddNumerator,
  onAddDenominator,
}: UnitSelectionPanelProps) {
  return (
    <Panel>
      <h2 className="text-lg font-bold">Unit Toolbox</h2>
      {units.map((unit) => (
        <div key={unit.id}>
          <h3>{unit.name}</h3>
          <p className="text-sm text-gray-500">{unit.dimension}</p>
          <Button onClick={() => onAddNumerator(unit)}>Add Numerator</Button>
          <Button onClick={() => onAddDenominator(unit)}>
            Add Denominator
          </Button>
        </div>
      ))}
    </Panel>
  );
}
