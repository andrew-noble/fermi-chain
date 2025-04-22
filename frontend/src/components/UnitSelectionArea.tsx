import UnitSelector from "@/components/UnitSelector";
import { Unit } from "@/types";

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

  return units.map((unit) => (
    <UnitSelector
      key={unit.id}
      unit={unit}
      onAddNumerator={onAddNumerator}
      onAddDenominator={onAddDenominator}
    />
  ));
}
