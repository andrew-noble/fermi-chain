import { Unit } from "@/types";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

interface UnitSelectorProps {
  unit: Unit;
  onAddNumerator: (unit: Unit) => void;
  onAddDenominator: (unit: Unit) => void;
}

export default function UnitSelector({
  unit,
  onAddNumerator,
  onAddDenominator,
}: UnitSelectorProps) {
  return (
    <Card className="p-1.5">
      <div className="flex items-center justify-between min-w-0">
        <p className="text-xs md:text-sm font-medium pr-2">{unit.name}</p>
        <div className="flex gap-0.5 shrink-0">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onAddNumerator(unit)}
            className="h-6 md:h-8 w-6 md:w-8 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-sm md:text-base leading-none"
          >
            ×
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onAddDenominator(unit)}
            className="h-6 md:h-8 w-6 md:w-8 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-sm md:text-base leading-none"
          >
            ÷
          </Button>
        </div>
      </div>
    </Card>
  );
}
