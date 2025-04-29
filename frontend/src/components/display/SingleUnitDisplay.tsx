import { UnitInventory } from "@/types";
import { UNITS } from "@/data/units";

interface SingleUnitDisplayProps {
  unit: UnitInventory;
  className?: string;
  isPlural: boolean;
}

//this component renders a single level of units (numerator or denominator), separated by dots
export default function SingleUnitDisplay({
  unit,
  className,
  isPlural,
}: SingleUnitDisplayProps) {
  const unitEntries = Object.entries(unit);
  if (unitEntries.length === 0) return null;

  const BASE_UNIT_STYLES = "text-sm italic font-normal text-gray-500";

  return (
    <>
      {unitEntries.map(([unitId, unitData], index) => {
        const unitInfo = UNITS[unitId];
        //if we have symbol, use that, if not, adjust to plurality
        const displayUnit = unitInfo.symbol
          ? unitInfo.symbol
          : isPlural
          ? unitInfo.displayNamePlural
          : unitInfo.displayName;
        if (!unitInfo) return null;

        return (
          <span key={unitId}>
            <span className={`${className} ${BASE_UNIT_STYLES}`}>
              {displayUnit}
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
