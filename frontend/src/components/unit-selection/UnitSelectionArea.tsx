import { Panel } from "@/components/ui/Panel";
import { Unit } from "@/types";
import DimensionBox from "@/components/unit-selection/DimensionBox";

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

  const uniqueDimensions = [...new Set(units.map((unit) => unit.dimension))];

  return (
    <Panel
      header={
        <div className="flex items-center gap-2">
          <h2 className="text-base md:text-lg font-semibold">Unit Toolbox</h2>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {uniqueDimensions.map((dim) => (
          <DimensionBox
            key={dim}
            dimension={dim}
            units={units.filter((unit) => unit.dimension === dim)}
            onAddNumerator={onAddNumerator}
            onAddDenominator={onAddDenominator}
          />
        ))}
      </div>
    </Panel>
  );
}
