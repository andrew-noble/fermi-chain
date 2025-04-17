import { Unit } from "@/types";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

interface UnitSelectorProps {
  dimension: string;
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
        <p className="text-sm font-medium pr-2">{unit.name}</p>
        <div className="flex flex-col gap-0.5 shrink-0">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onAddNumerator(unit)}
            className="h-5 w-5 p-0 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-base leading-none"
          >
            +
          </Button>
          <div className="w-full border border-gray-200 dark:border-gray-800"></div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onAddDenominator(unit)}
            className="h-5 w-5 p-0 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-base leading-none"
          >
            +
          </Button>
        </div>
      </div>
    </Card>
  );
}
