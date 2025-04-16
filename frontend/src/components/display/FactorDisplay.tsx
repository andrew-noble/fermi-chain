import { Factor } from "@/types";

interface FactorDisplayProps {
  factor: Factor;
}

export default function FactorDisplay({ factor }: FactorDisplayProps) {
  // Filter and map units for numerator (positive counts)
  const numUnits = Object.entries(factor.units)
    .filter(([_, unitCount]) => unitCount.count > 0)
    .map(([_, unitCount]) => (
      <span key={unitCount.unitMetadata.id}>
        {unitCount.unitMetadata.name}
        {unitCount.count > 1 && <sup>{unitCount.count}</sup>}
      </span>
    ));

  // Filter and map units for denominator (negative counts)
  const denomUnits = Object.entries(factor.units)
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
        <p>{numUnits.length > 0 ? numUnits : ""}</p>
      </div>
      {/* division line */}
      <div className="w-full border-2 border-t border-primary"></div>
      <div className="grid grid-cols-2 justify-between items-center">
        <p>{factor.denominatorOom.value.toString()}</p>
        <p>{denomUnits.length > 0 ? denomUnits : ""}</p>
      </div>
    </div>
  );
}
