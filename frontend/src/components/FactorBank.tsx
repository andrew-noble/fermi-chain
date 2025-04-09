import { Button } from "@/components/ui/button";
import { Factor, InputtedFactor } from "@/types";
import { formatNumber } from "@/helpers/formatNumber";
import FractionDisplay from "@/components/display/FractionDisplay";
import RangeDisplay from "@/components/display/RangeDisplay";

interface FactorBankProps {
  factors: Factor[];
  pickedFactors: InputtedFactor[];
  onAdd: (factor: Factor) => void;
}

const textSize = "text-lg";

const FactorBank = ({ factors, pickedFactors, onAdd }: FactorBankProps) => {
  const renderLabel = (factor: Factor) => (
    <>
      {/* <p className="text-sm text-muted-foreground">{factor.unit}</p> */}
      <p className={`font-light text-left ${textSize}`}>{factor.label}</p>
    </>
  );

  const renderFactor = (factor: Factor) => {
    if (factor.isRanged) {
      return (
        <>
          {renderLabel(factor)}
          <RangeDisplay factor={factor} textSize={textSize} />
        </>
      );
    } else {
      return (
        <>
          {factor.isFraction ? (
            <>
              {renderLabel(factor)}
              <FractionDisplay factor={factor} textSize={textSize} />
            </>
          ) : (
            <>
              {renderLabel(factor)}
              <div className={`${textSize} font-bold text-primary`}>
                {formatNumber(factor.targetValue)}
              </div>
            </>
          )}
        </>
      );
    }
  };

  return (
    <div className="flex flex-row flex-wrap gap-2 w-full max-w-[1000px]">
      {factors.map((factor: Factor) => (
        <Button
          key={factor.label}
          variant="outline"
          className="w-full md:w-[calc(50%-0.25rem)] px-4 py-8 flex justify-between items-center hover:bg-accent/50 whitespace-normal break-words"
          onClick={() => onAdd(factor)}
          disabled={pickedFactors.some(
            //grey out factors of buttons already picked
            (pickedFactor) => pickedFactor.label === factor.label
          )}
        >
          {renderFactor(factor)}
        </Button>
      ))}
    </div>
  );
};

export default FactorBank;
