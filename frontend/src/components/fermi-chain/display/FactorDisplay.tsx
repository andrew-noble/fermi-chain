import { Factor } from "@/types";
import { Button } from "@/components/ui/button";
import UnitDisplay from "@/components/fermi-chain/display/UnitDisplay";
import OomDisplay from "@/components/fermi-chain/display/OomDisplay";
import MultiplicationSign from "./MultiplicationSign";
interface FactorDisplayProps {
  factor: Factor;
  onEdit: () => void;
  onRemove: () => void;
}

export default function FactorDisplay({
  factor,
  onEdit,
  onRemove,
}: FactorDisplayProps) {
  return (
    <div className="flex flex-col items-center min-w-[200px] gap-2">
      <div className="flex flex-row items-center gap-4">
        {/* OOM's stacked on the left */}
        <OomDisplay
          numeratorOom={factor.numeratorOom}
          denominatorOom={factor.denominatorOom}
        />

        {/* Units on the right */}
        <UnitDisplay unitInventory={factor.units} />
        <MultiplicationSign />
      </div>
      <Button variant="outline" size="sm" onClick={onEdit}>
        Edit
      </Button>
      <Button variant="outline" size="sm" onClick={onRemove}>
        Delete
      </Button>
    </div>
  );
}
