import { Card } from "@/components/display/ui/card";
import { Button } from "@/components/display/ui/button";
import { TutorialOverlay } from "@/components/misc/TutorialOverlay";
import { UNITS } from "@/data/units";

interface UnitSelectorProps {
  unitId: string;
  onAddNumerator: (unitId: string) => void;
  onAddDenominator: (unitId: string) => void;
}

export default function UnitSelector({
  unitId,
  onAddNumerator,
  onAddDenominator,
}: UnitSelectorProps) {
  const unit = UNITS[unitId];
  if (!unit) return null;

  return (
    <Card className="p-1.5">
      <div className="flex items-center justify-between min-w-0">
        <p className="text-sm font-medium pr-2">{unit.displayName}</p>
        <div className="flex gap-0.5 shrink-0">
          <TutorialOverlay
            id="tutorial-unit-selection"
            content="Add units to numerator (×) or denominator (÷)"
            position="top"
          >
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onAddNumerator(unitId)}
              className="h-10 w-10 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-sm md:text-base leading-none"
            >
              ×
            </Button>
          </TutorialOverlay>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onAddDenominator(unitId)}
            className="h-10 w-10 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-sm md:text-base leading-none"
          >
            ÷
          </Button>
        </div>
      </div>
    </Card>
  );
}
