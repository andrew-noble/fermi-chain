import { BaseFactor } from "@/types";
import { splitUnitInventory } from "@/helpers/unitManagement";
import SciNotationDisplay from "@/components/display/SciNotationDisplay";
import SingleUnitDisplay from "@/components/display/SingleUnitDisplay";
import MultiplicationSign from "@/components/display/ui/MultiplicationSign";

interface FactorDisplayProps {
  factor: BaseFactor;
  className?: string;
  showMultiplicationSign?: boolean;
  numIsPlural?: boolean;
  denIsPlural?: boolean;
}

export default function FactorDisplay({
  factor,
  className = "text-xl",
  showMultiplicationSign = false,
  numIsPlural = true,
  denIsPlural = true,
}: FactorDisplayProps) {
  const [numerators, denominators] = splitUnitInventory(factor.unit);

  return (
    <div className="flex gap-2 items-center min-h-[5rem]">
      <div className={`flex flex-col ${className}`}>
        <div className="flex gap-2">
          <SciNotationDisplay
            value={factor.numeratorValue}
            className={className}
          />
          <SingleUnitDisplay
            unit={numerators}
            className={className}
            isPlural={numIsPlural}
          />
        </div>
        {Object.keys(denominators).length > 0 && (
          <>
            <div className="col-span-3 border-t border-gray-200 dark:border-gray-800 my-1" />
            <div className="flex gap-2">
              <SciNotationDisplay
                value={factor.denominatorValue}
                className={className}
              />
              <SingleUnitDisplay
                unit={denominators}
                className={className}
                isPlural={denIsPlural}
              />
            </div>
          </>
        )}
      </div>
      {showMultiplicationSign && <MultiplicationSign className="text-3xl" />}
    </div>
  );
}
