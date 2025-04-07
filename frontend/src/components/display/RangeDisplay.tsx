import { formatNumber, getFraction } from "@/helpers/formatNumber";
import FractionDisplay from "@/components/display/FractionDisplay";
import { Factor } from "@/types";

const RangeDisplay = ({
  factor,
  textSize,
}: {
  factor: Factor;
  textSize: string;
}) => {
  let numeratorLow = 1;
  let denominatorLow = 1;
  let numeratorHigh = 1;
  let denominatorHigh = 1;

  if (factor.isFraction) {
    [numeratorLow, denominatorLow] = getFraction(
      factor.randomizedRange?.[0] ?? factor.targetValue
    );
    [numeratorHigh, denominatorHigh] = getFraction(
      factor.randomizedRange?.[1] ?? factor.targetValue
    );
  }

  return (
    <div className="flex items-center">
      {factor.isFraction ? (
        <>
          <FractionDisplay
            factor={factor}
            numeratorOverride={numeratorLow}
            denominatorOverride={denominatorLow}
            textSize={textSize}
          />
          <p className={`${textSize} font-bold text-primary mx-2`}>-</p>
          <FractionDisplay
            factor={factor}
            numeratorOverride={numeratorHigh}
            denominatorOverride={denominatorHigh}
            textSize={textSize}
          />
        </>
      ) : (
        <>
          <div className={`${textSize} font-bold text-primary`}>
            {formatNumber(factor.randomizedRange?.[0] ?? factor.targetValue)}
          </div>
          <p className={`${textSize} font-bold text-primary mx-2`}>-</p>
          <div className={`${textSize} font-bold text-primary`}>
            {formatNumber(factor.randomizedRange?.[1] ?? factor.targetValue)}
          </div>
        </>
      )}
    </div>
  );
};

export default RangeDisplay;
