import { BaseFactor } from "@/types";
import { splitUnitInventory } from "@/helpers/unitManagement";
import SciNotationDisplay from "@/components/SciNotationDisplay";
import InlineUnit from "@/components/factor/InlineUnit";
import MultiplicationSign from "../MultiplicationSign";

interface FactorDisplayProps {
  factor: BaseFactor;
  className?: string;
  showMultiplicationSign?: boolean;
}

export default function FactorDisplay({
  factor,
  className = "text-xl",
  showMultiplicationSign = false,
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
          <InlineUnit unit={numerators} className={className} />
        </div>
        {Object.keys(denominators).length > 0 && (
          <>
            <div className="col-span-3 border-t border-gray-200 dark:border-gray-800 my-1" />
            <div className="flex gap-2">
              <SciNotationDisplay
                value={factor.denominatorValue}
                className={className}
              />
              <InlineUnit unit={denominators} className={className} />
            </div>
          </>
        )}
      </div>
      {showMultiplicationSign && <MultiplicationSign className="text-3xl" />}
    </div>
  );
}
