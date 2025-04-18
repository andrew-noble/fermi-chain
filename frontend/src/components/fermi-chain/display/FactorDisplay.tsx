import { Factor } from "@/types";
import { Button } from "@/components/ui/button";
import UnitDisplay from "@/components/fermi-chain/display/UnitDisplay";
import OomDisplay from "@/components/fermi-chain/display/OomDisplay";

interface FactorDisplayProps {
  factor: Factor;
  onEdit: () => void;
}

export default function FactorDisplay({ factor, onEdit }: FactorDisplayProps) {
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
      </div>

      <Button variant="outline" size="sm" onClick={onEdit}>
        Edit
      </Button>
    </div>
  );
}
