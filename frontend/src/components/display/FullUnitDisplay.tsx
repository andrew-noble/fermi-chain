import { UnitInventory } from "@/types";
import { splitUnitInventory } from "@/helpers/unitManagement";
import SingleUnitDisplay from "@/components/display/SingleUnitDisplay";

interface FullUnitDisplayProps {
  unit: UnitInventory;
  className?: string;
  numIsPlural?: boolean;
  denIsPlural?: boolean;
}

export default function FullUnitDisplay({
  unit,
  className = "",
  numIsPlural = true,
  denIsPlural = false,
}: FullUnitDisplayProps) {
  const [numerators, denominators] = splitUnitInventory(unit);

  const BASE_UNIT_STYLES = "text-sm italic font-normal text-gray-500";

  return (
    <div className={`flex gap-1 whitespace-nowrap font-bold ${className}`}>
      <SingleUnitDisplay
        unit={numerators}
        className={className}
        isPlural={numIsPlural}
      />
      {Object.keys(denominators).length > 0 && (
        <>
          <span className={`${BASE_UNIT_STYLES} ${className}`}>/</span>
          <SingleUnitDisplay
            unit={denominators}
            className={className}
            isPlural={denIsPlural}
          />
        </>
      )}
    </div>
  );
}
