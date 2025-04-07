import { Button } from "@/components/ui/button";
import { Factor } from "@/types";
import { formatNumber, getFraction } from "@/helpers/formatNumber";

interface FactorBankProps {
  factors: Factor[];
  onAdd: (factor: Factor) => void;
}

// Fraction display component used by both static and ranged fractions
const FractionDisplay = ({
  numerator,
  denominator,
}: {
  numerator: number;
  denominator: number;
}) => (
  <div className="inline-flex flex-col items-center">
    <div className="text-xl font-bold text-primary text-center">
      {numerator}
    </div>
    <div className="w-full border-2 border-t border-primary"></div>
    <div className="text-xl font-bold text-primary text-center">
      {denominator}
    </div>
  </div>
);

// Static factor renderer
const StaticFactor = ({ factor }: { factor: Factor }) => (
  <>
    <div className="text-left">
      <p className="font-light text-lg">{factor.label}</p>
      {/* <p className="text-sm text-muted-foreground">{factor.unit}</p> */}
    </div>
    <span className="text-xl font-bold text-primary">
      {formatNumber(factor.targetValue)}
    </span>
  </>
);

// Ranged factor renderer
const RangedFactor = ({ factor }: { factor: Factor }) => (
  <>
    <div className="text-left">
      <p className="font-light text-lg">{factor.label}?</p>
      {/* <p className="text-sm text-muted-foreground">{factor.unit}</p> */}
    </div>
    <span className="text-xl font-bold text-primary">
      {formatNumber(factor.randomizedRange?.[0] ?? factor.targetValue)} -{" "}
      {formatNumber(factor.randomizedRange?.[1] ?? factor.targetValue)}
    </span>
  </>
);

// Static fraction renderer
const StaticFractionFactor = ({ factor }: { factor: Factor }) => {
  const [num, denom] = getFraction(factor.targetValue);
  return (
    <>
      <div className="text-left">
        <p className="font-light text-lg">{factor.label}</p>
        {/* <p className="text-sm text-muted-foreground">{factor.unit}</p> */}
      </div>
      <FractionDisplay numerator={num} denominator={denom} />
    </>
  );
};

// Ranged fraction renderer
const RangedFractionFactor = ({ factor }: { factor: Factor }) => {
  const [lowNumerator, lowDenominator] = getFraction(
    factor.randomizedRange?.[0] ?? factor.targetValue
  );
  const [highNumerator, highDenominator] = getFraction(
    factor.randomizedRange?.[1] ?? factor.targetValue
  );

  return (
    <>
      <div className="text-left">
        <p className="font-light text-lg">{factor.label}</p>
        {/* <p className="text-sm text-muted-foreground">{factor.unit}</p> */}
      </div>
      <div className="flex">
        <FractionDisplay
          numerator={lowNumerator}
          denominator={lowDenominator}
        />
        <p className="text-xl font-bold text-primary mx-2">-</p>
        <FractionDisplay
          numerator={highNumerator}
          denominator={highDenominator}
        />
      </div>
    </>
  );
};

const FactorBank = ({ factors, onAdd }: FactorBankProps) => {
  const renderFactor = (factor: Factor) => {
    const type = `${factor.isRanged ? "ranged" : "static"}${
      factor.isFraction ? "Fraction" : ""
    }`;

    switch (type) {
      case "static":
        return <StaticFactor factor={factor} />;
      case "staticFraction":
        return <StaticFractionFactor factor={factor} />;
      case "ranged":
        return <RangedFactor factor={factor} />;
      case "rangedFraction":
        return <RangedFractionFactor factor={factor} />;
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
