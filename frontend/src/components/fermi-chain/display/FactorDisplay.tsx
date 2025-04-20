import { Factor } from "@/types";
import { Button } from "@/components/ui/button";
import { InlineOom } from "./InlineOom";
import { InlineUnit } from "./InlineUnit";
import MultiplicationSign from "./MultiplicationSign";
import { getUnitStrings } from "@/helpers/unitManagement";
import { Pencil, Trash2 } from "lucide-react";

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
  const { numerators, denominators } = getUnitStrings(factor.units);

  return (
    <div className="flex flex-col items-center w-48 gap-1 p-4 rounded-lg shadow-sm">
      <div className="flex flex-row items-center justify-center w-full">
        <div className="flex flex-col items-center gap-1 w-full">
          {/* Numerator Row */}
          <div className="flex items-center gap-1 w-full">
            <div className="flex items-center gap-1 flex-1">
              <InlineOom oom={factor.numeratorOom} className="text-sm" />
              <InlineUnit units={numerators} className="text-sm" />
            </div>
          </div>

          {/* Divider line */}
          <div className="w-full border-t border-gray-200 dark:border-gray-800 my-1" />

          {/* Denominator Row */}
          <div className="flex items-center gap-1 w-full">
            <div className="flex items-center gap-1 flex-1">
              <InlineOom oom={factor.denominatorOom} className="text-sm" />
              <InlineUnit units={denominators} className="text-sm" />
            </div>
          </div>
        </div>
        <MultiplicationSign className="text-3xl mx-1" />
      </div>

      <div className="flex flex-row gap-1">
        <Button variant="outline" size="sm" onClick={onEdit} className="p-1">
          <Pencil className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={onRemove} className="p-1">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
