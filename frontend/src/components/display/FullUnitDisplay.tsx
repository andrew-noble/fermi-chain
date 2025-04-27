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
  className = "text-xl",
  numIsPlural = true,
  denIsPlural = true,
}: FullUnitDisplayProps) {
  const [numerators, denominators] = splitUnitInventory(unit);

  return (
    <div className={`flex gap-1 whitespace-nowrap font-bold ${className}`}>
      <SingleUnitDisplay
        unit={numerators}
        className={className}
        isPlural={numIsPlural}
      />
      {Object.keys(denominators).length > 0 && (
        <>
          <span className="text-gray-400">/</span>
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
