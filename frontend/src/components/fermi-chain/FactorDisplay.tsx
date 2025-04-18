import { Factor } from "@/types";
import { Button } from "../ui/button";

interface FactorDisplayProps {
  factor: Factor;
  onEdit: () => void;
}

export default function FactorDisplay({ factor, onEdit }: FactorDisplayProps) {
  // Filter and map units for numerator (positive counts)
  const numeratorUnits = Object.entries(factor.units)
    .filter(([_, unitCount]) => unitCount.count > 0)
    .map(([_, unitCount]) => (
      <span key={unitCount.unitMetadata.id} className="whitespace-nowrap">
        {unitCount.unitMetadata.name}
        {unitCount.count > 1 && <sup className="ml-0.5">{unitCount.count}</sup>}
      </span>
    ));

  // Filter and map units for denominator (negative counts)
  const denominatorUnits = Object.entries(factor.units)
    .filter(([_, unitCount]) => unitCount.count < 0)
    .map(([_, unitCount]) => (
      <span key={unitCount.unitMetadata.id} className="whitespace-nowrap">
        {unitCount.unitMetadata.name}
        {unitCount.count < -1 && (
          <sup className="ml-0.5">{Math.abs(unitCount.count)}</sup>
        )}
      </span>
    ));

  return (
    <div className="flex flex-col items-center min-w-[200px]">
      <div className="flex items-center gap-2 w-full">
        <span className="font-mono text-gray-600 dark:text-gray-400">
          {factor.numeratorOom.value.toString()}
        </span>
        <div className="flex flex-wrap">
          {numeratorUnits.length > 0
            ? numeratorUnits.map((unit, index) => (
                <span key={index} className="flex items-center">
                  {unit}
                  {index < numeratorUnits.length - 1 && (
                    <span className="mx-1 text-gray-400">·</span>
                  )}
                </span>
              ))
            : ""}
        </div>
      </div>

      {/* Division Line */}
      <div className="w-full border-t border-gray-200 dark:border-gray-800 my-2" />

      <div className="flex items-center gap-2 w-full">
        <span className="font-mono text-gray-600 dark:text-gray-400">
          {factor.denominatorOom.value.toString()}
        </span>
        <div className="flex flex-wrap">
          {denominatorUnits.length > 0
            ? denominatorUnits.map((unit, index) => (
                <span key={index} className="flex items-center">
                  {unit}
                  {index < denominatorUnits.length - 1 && (
                    <span className="mx-1 text-gray-400">·</span>
                  )}
                </span>
              ))
            : ""}
        </div>
      </div>
      <Button variant="outline" size="sm" onClick={onEdit}>
        Edit
      </Button>
    </div>
  );
}
