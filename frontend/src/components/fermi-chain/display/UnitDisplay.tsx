import { UnitInventory } from "@/types";
import { getUnitStrings } from "@/helpers/unitManagement";
import { InlineUnit } from "./InlineUnit";

interface UnitDisplayProps {
  unitInventory: UnitInventory;
  className?: string;
}

export default function UnitDisplay({
  unitInventory,
  className,
}: UnitDisplayProps) {
  const { numerators, denominators } = getUnitStrings(unitInventory);

  return (
    <div
      className={`flex flex-col items-center w-32 md:w-40 lg:w-48 ${className}`}
    >
      <div className="min-h-[1.5em] flex items-center justify-center">
        <InlineUnit units={numerators} />
      </div>
      <div className="w-full border-t border-gray-200 dark:border-gray-800 my-2" />
      <div className="min-h-[1.5em] flex items-center justify-center">
        <InlineUnit units={denominators} />
      </div>
    </div>
  );
}
