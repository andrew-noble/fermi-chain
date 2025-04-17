import { Panel } from "@/components/ui/Panel";
import { Unit } from "@/types";
import UnitSelector from "@/components/unit-selection/UnitSelector";

interface DimensionBoxProps {
  dimension: string;
  units: Unit[];
  onAddNumerator: (unit: Unit) => void;
  onAddDenominator: (unit: Unit) => void;
}

export default function DimensionBox({
  dimension,
  units,
  onAddNumerator,
  onAddDenominator,
}: DimensionBoxProps) {
  return (
    <Panel className="bg-gray-50 dark:bg-gray-950">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            {dimension}
          </h3>
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
        </div>
        <div className="flex flex-wrap gap-2">
          {units.map((unit) => (
            <UnitSelector
              key={unit.id}
              dimension={dimension}
              unit={unit}
              onAddNumerator={onAddNumerator}
              onAddDenominator={onAddDenominator}
            />
          ))}
        </div>
      </div>
    </Panel>
  );
}
