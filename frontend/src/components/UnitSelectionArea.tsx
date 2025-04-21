import UnitSelector from "@/components/UnitSelector";
import { Unit } from "@/types";
import { useIsMobile } from "@/hooks/useIsMobile";

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
  const isMobile = useIsMobile();

  if (!show) return null;

  return (
    <div
      className={`flex gap-2 ${
        isMobile
          ? "flex-nowrap overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory"
          : "flex-wrap"
      }`}
    >
      {units.map((unit) => (
        <UnitSelector
          key={unit.id}
          unit={unit}
          onAddNumerator={onAddNumerator}
          onAddDenominator={onAddDenominator}
        />
      ))}
    </div>
  );
}
