import { Button } from "@/components/ui/button";
import { Factor } from "@/types";
import { formatNumber } from "@/helpers/formatNumber";
import FractionDisplay from "@/components/display/FractionDisplay";
import RangeDisplay from "@/components/display/RangeDisplay";

interface FactorBankProps {
  factors: Factor[];
  onAdd: (factor: Factor) => void;
}

const textSize = "text-xl";

const FactorBank = ({ factors, onAdd }: FactorBankProps) => {
  const renderFactor = (factor: Factor) => {
    if (factor.isRanged) {
      return (
        <>
          <p className={`font-light ${textSize}`}>{factor.label}</p>
          {/* <p className="text-sm text-muted-foreground">{factor.unit}</p> */}
          <div className="flex items-center justify-center gap-2">
            {factor.isReciprocal ? (
              <p className="text-xl text-muted-foreground">÷</p>
            ) : (
              <p className="text-xl text-muted-foreground">×</p>
            )}
            <RangeDisplay factor={factor} textSize={textSize} />
          </div>
        </>
      );
    } else {
      return (
        <>
          <p className={`font-light ${textSize}`}>{factor.label}</p>
          {/* <p className="text-sm text-muted-foreground">{factor.unit}</p> */}
          {factor.isFraction ? (
            <div className="flex items-center justify-center gap-2">
              {factor.isReciprocal ? (
                <p className="text-xl text-muted-foreground">÷</p>
              ) : (
                <p className="text-xl text-muted-foreground">×</p>
              )}
              <FractionDisplay factor={factor} textSize={textSize} />
            </div>
          ) : (
            <div className={`${textSize} font-bold text-primary`}>
              <div className="flex items-center justify-center gap-2">
                {factor.isReciprocal ? (
                  <p className="text-xl text-muted-foreground">÷</p>
                ) : (
                  <p className="text-xl text-muted-foreground">×</p>
                )}
                {formatNumber(factor.targetValue)}
              </div>
            </div>
          )}
        </>
      );
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {factors.map((factor: Factor) => (
        <Button
          key={factor.label}
          variant="outline"
          className="w-full px-6 py-8 flex justify-between items-center hover:bg-accent/50"
          onClick={() => onAdd(factor)}
        >
          {renderFactor(factor)}
        </Button>
      ))}
    </div>
  );
};

export default FactorBank;
