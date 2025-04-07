import { Button } from "@/components/ui/button";
import { Factor } from "../types";
import { cn } from "@/lib/utils"; //for conditional className resolution
import { formatNumber } from "@/helpers/formatNumber";

interface FactorBankProps {
  factors: Factor[];
  onAdd: (factor: Factor) => void;
}

const FactorBank = ({ factors, onAdd }: FactorBankProps) => (
  <div className={cn("flex flex-col gap-2")}>
    {factors.map((factor: Factor) => (
      <Button
        key={factor.label}
        variant="outline"
        className="w-full px-6 py-8 flex justify-between items-center hover:bg-accent/50"
        onClick={() => onAdd(factor)}
      >
        {factor.isRanged ? (
          <>
            <div className="text-left">
              <p className="font-light text-lg">{factor.label}?</p>
              {/* <p className="text-sm text-muted-foreground">{factor.unit}</p> */}
            </div>
            <span className="text-xl font-bold text-primary">
              {formatNumber(factor.randomizedRange?.[0] ?? factor.targetValue)}{" "}
              -{" "}
              {formatNumber(factor.randomizedRange?.[1] ?? factor.targetValue)}
            </span>
          </>
        ) : (
          <>
            <div className="text-left">
              <p className="font-light text-lg">{factor.label}</p>
              {/* <p className="text-sm text-muted-foreground">{factor.unit}</p> */}
            </div>
            <span className="text-xl font-bold text-primary">
              {formatNumber(factor.targetValue)}
            </span>
          </>
        )}
      </Button>
    ))}
  </div>
);

export default FactorBank;
