import { Factor } from "@/types";

interface FactorDisplayProps {
  factor: Factor;
}

export default function FactorDisplay({ factor }: FactorDisplayProps) {
  // Filter and map units for numerator (positive counts)
  const numeratorUnits = Object.entries(factor.units)
    .filter(([_, unitCount]) => unitCount.count > 0)
    .map(([_, unitCount]) => (
      <span key={unitCount.unitMetadata.id}>
        {unitCount.unitMetadata.name}
        {unitCount.count > 1 && <sup>{unitCount.count}</sup>}
      </span>
    ));

  // Filter and map units for denominator (negative counts)
  const denominatorUnits = Object.entries(factor.units)
    .filter(([_, unitCount]) => unitCount.count < 0)
    .map(([_, unitCount]) => (
      <span key={unitCount.unitMetadata.id}>
        {unitCount.unitMetadata.name}
        {unitCount.count < -1 && <sup>{Math.abs(unitCount.count)}</sup>}
      </span>
    ));

  return (
    <div className="inline-flex flex-col items-center justify-center">
      <div className="grid grid-cols-2 justify-between items-center">
        <p>{factor.numeratorOom.value.toString()}</p>
        <p>{numeratorUnits.length > 0 ? numeratorUnits : ""}</p>
      </div>
      {/* division line */}
      <div className="w-full border-2 border-t border-primary"></div>
      <div className="grid grid-cols-2 justify-between items-center">
        <p>{factor.denominatorOom.value.toString()}</p>
        <p>{denominatorUnits.length > 0 ? denominatorUnits : ""}</p>
      </div>
    </div>
  );
}
