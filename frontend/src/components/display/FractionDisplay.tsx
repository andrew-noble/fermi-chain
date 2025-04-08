import { type Factor } from "@/types";
import { getFraction } from "@/helpers/formatNumber";

interface FractionDisplayProps {
  factor: Factor;
  textSize: string;
  numeratorOverride?: number;
  denominatorOverride?: number;
}

const FractionDisplay = ({
  factor,
  textSize,
  numeratorOverride,
  denominatorOverride,
}: FractionDisplayProps) => {
  let numerator: number;
  let denominator: number;

  //this is so we can display fractions representing min/max ranges
  if (numeratorOverride !== undefined && denominatorOverride !== undefined) {
    numerator = numeratorOverride;
    denominator = denominatorOverride;
  } else if (factor.isFraction) {
    [numerator, denominator] = getFraction(factor.targetValue);
  } else {
    numerator = 1;
    denominator = 1;
  }

  return (
    <div className="inline-flex flex-col items-center justify-center">
      <div className={`${textSize} font-bold text-primary text-center`}>
        {numerator}
      </div>
      {/* division line */}
      <div className="w-full border-2 border-t border-primary"></div>
      <div className={`${textSize} font-bold text-primary text-center`}>
        {denominator}
      </div>
    </div>
  );
};

export default FractionDisplay;
