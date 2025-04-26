import UnitSelector from "@/components/UnitSelector";

interface UnitSelectionAreaProps {
  unitIds: string[];
  onAddNumerator: (unitId: string) => void;
  onAddDenominator: (unitId: string) => void;
}

export default function UnitSelectionArea({
  unitIds,
  onAddNumerator,
  onAddDenominator,
}: UnitSelectionAreaProps) {
  return unitIds.map((unitId) => (
    <UnitSelector
      key={unitId}
      unitId={unitId}
      onAddNumerator={onAddNumerator}
      onAddDenominator={onAddDenominator}
    />
  ));
}
