import { UnitInventory } from "@/types";
import { UNITS } from "@/data/units";

interface InlineUnitProps {
  unit: UnitInventory;
  className?: string;
}

//this component renders a single level of units (numerator or denominator), separated by dots
export default function InlineUnit({ unit, className }: InlineUnitProps) {
  const unitEntries = Object.entries(unit);
  if (unitEntries.length === 0) return null;

  return (
    <>
      {unitEntries.map(([unitId, unitData], index) => {
        const unitInfo = UNITS[unitId];
        if (!unitInfo) return null;

        return (
          <span key={unitId}>
            <span
              className={`text-gray-400 dark:text-gray-500 text-sm italic font-normal ${className}`}
            >
              {unitInfo.symbol || unitInfo.displayName}
              {unitData?.power && unitData.power > 1 && (
                <sup className="ml-0.5">{unitData.power}</sup>
              )}
              {index < unitEntries.length - 1 && (
                <span className="mx-0.5">·</span>
              )}
            </span>
          </span>
        );
      })}
    </>
  );
}
