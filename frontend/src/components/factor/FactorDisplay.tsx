import { BaseFactor } from "@/types";
import { splitUnitInventory } from "@/helpers/unitManagement";
import SciNotationDisplay from "@/components/SciNotationDisplay";
import InlineUnit from "@/components/factor/InlineUnit";

interface FactorDisplayProps {
  factor: BaseFactor;
  className?: string;
  textStyles?: string;
}

export default function FactorDisplay({
  factor,
  className = "",
  textStyles = "text-sm",
}: FactorDisplayProps) {
  const [numerators, denominators] = splitUnitInventory(factor.unit);

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex gap-2">
        <SciNotationDisplay
          value={factor.numeratorValue}
          className={textStyles}
        />
        <InlineUnit unit={numerators} className={textStyles} />
      </div>
      <div className="col-span-3 border-t border-gray-200 dark:border-gray-800 my-1" />
      <div className="flex gap-2">
        <SciNotationDisplay
          value={factor.denominatorValue}
          className={textStyles}
        />
        <InlineUnit unit={denominators} className={textStyles} />
      </div>
    </div>
  );
}
