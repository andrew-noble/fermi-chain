import clsx from "clsx";

interface InlineUnitProps {
  units: { name: string; exponent: number }[];
  className?: string;
}

//this component renders a single level of units (numerator or denominator), separated by dots
export default function InlineUnit({ units, className }: InlineUnitProps) {
  return (
    <>
      {units.map((unit, index) => (
        <span key={index}>
          <span className={clsx("whitespace-nowrap", className)}>
            {unit.name}
            {unit.exponent > 1 && <sup className="ml-0.5">{unit.exponent}</sup>}
          </span>
          {index < units.length - 1 && (
            <span className="mx-1 text-gray-400">·</span>
          )}
        </span>
      ))}
    </>
  );
}
