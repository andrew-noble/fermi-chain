import UnitSelector from "@/components/UnitSelector";
import { Unit } from "@/types";

interface UnitSelectionAreaProps {
  units: Unit[];
  onAddNumerator: (unit: Unit) => void;
  onAddDenominator: (unit: Unit) => void;
}

export default function UnitSelectionArea({
  units,
  onAddNumerator,
  onAddDenominator,
}: UnitSelectionAreaProps) {
  return units.map((unit) => (
    <UnitSelector
      key={unit.id}
      unit={unit}
      onAddNumerator={onAddNumerator}
      onAddDenominator={onAddDenominator}
    />
  ));
}
