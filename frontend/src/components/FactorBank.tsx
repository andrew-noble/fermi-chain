import { Button } from "@/components/ui/button";
import { Factor } from "@/types";
import { formatNumber } from "@/helpers/formatNumber";
import FractionDisplay from "@/components/display/FractionDisplay";
import RangeDisplay from "@/components/display/RangeDisplay";

interface FactorBankProps {
  factors: Factor[];
  onAdd: (factor: Factor) => void;
}

const textSize = "text-lg";

const FactorBank = ({ factors, onAdd }: FactorBankProps) => {
  const renderOperator = (factor: Factor) => {
    if (factor.isReciprocal) {
      return <p className="text-xl">÷</p>;
    } else {
      return <p className="text-xl">×</p>;
    }
  };

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
          <div className="flex items-center justify-center gap-2">
            {renderOperator(factor)}
            <RangeDisplay factor={factor} textSize={textSize} />
          </div>
        </>
      );
    } else {
      return (
        <>
          {factor.isFraction ? (
            <>
              {renderLabel(factor)}
              <div className="flex items-center justify-center gap-2">
                {renderOperator(factor)}
                <FractionDisplay factor={factor} textSize={textSize} />
              </div>
            </>
          ) : (
            <>
              {renderLabel(factor)}
              <div className="flex items-center justify-center gap-2">
                {renderOperator(factor)}
                <p className={`font-bold text-primary ${textSize}`}>
                  {formatNumber(factor.targetValue)}
                </p>
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
        >
          {renderFactor(factor)}
        </Button>
      ))}
    </div>
  );
};

export default FactorBank;
