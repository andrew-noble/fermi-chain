import UnitSelector from "@/components/UnitSelector";
import { Unit } from "@/types";

interface UnitSelectionAreaProps {
  show: boolean;
  units: Unit[];
  onAddNumerator: (unit: Unit) => void;
  onAddDenominator: (unit: Unit) => void;
}

export default function UnitSelectionArea({
  show,
  units,
  onAddNumerator,
  onAddDenominator,
}: UnitSelectionAreaProps) {
  if (!show) return null;

  return units.map((unit) => (
    <UnitSelector
      key={unit.id}
      unit={unit}
      onAddNumerator={onAddNumerator}
      onAddDenominator={onAddDenominator}
    />
  ));
}
