import { UnitInventory } from "@/types";

interface InlineUnitProps {
  unit: UnitInventory;
  className?: string;
}

//this component renders a single level of units (numerator or denominator), separated by dots
export default function InlineUnit({ unit, className }: InlineUnitProps) {
  const units = Object.values(unit);
  if (units.length === 0) return null;

  return (
    <>
      {units.map((u, index) => (
        <span key={u.unitMetadata.id}>
          <span className={className}>
            {u.unitMetadata.name || ""}
            {Math.abs(u.count) > 1 && (
              <sup className="ml-0.5">{Math.abs(u.count)}</sup>
            )}
            {index < units.length - 1 && <span className="mx-0.5">·</span>}
          </span>
        </span>
      ))}
    </>
  );
}
