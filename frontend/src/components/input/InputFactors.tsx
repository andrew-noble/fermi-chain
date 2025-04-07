import { formatNumber, getFraction } from "@/helpers/formatNumber";
import { InputtedFactor } from "@/types";
import { Slider } from "@/components/ui/slider";

const textSize = "text-2xl";

// Reusable fraction display component
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

// Regular factor renderer
const RegularFactor = ({ factor }: { factor: InputtedFactor }) => {
  return (
    <div className="flex flex-row justify-center">
      <p className={`${textSize} font-bold text-center mx-1 text-primary`}>
        {formatNumber(factor.userSelectedValue)}
      </p>
      <p className={`${textSize} text-center break-words text-foreground mx-1`}>
        {factor.unit}
      </p>
    </div>
  );
};

// Ranged factor renderer
const RangedFactor = ({
  factor,
  onSliderChange,
}: {
  factor: InputtedFactor;
  onSliderChange: (value: number) => void;
}) => {
  const handleSliderChange = (value: number[]) => {
    onSliderChange(value[0]);
  };

  return (
    <>
      <div className="flex flex-row justify-center mb-4">
        <p className={`${textSize} font-bold text-center mx-1 text-primary`}>
          {formatNumber(factor.userSelectedValue)}
        </p>
        <p
          className={`${textSize} text-center break-words text-foreground mx-1`}
        >
          {factor.unit}
        </p>
      </div>

      {/* slider */}
      <div className="w-full flex justify-center mb-4">
        <div className="w-48">
          <Slider
            min={factor.randomizedRange?.[0] || 0}
            max={factor.randomizedRange?.[1] || 100}
            step={factor.rangeStep || 1}
            value={[factor.userSelectedValue]}
            onValueChange={handleSliderChange}
            orientation="horizontal"
          />
        </div>
      </div>
    </>
  );
};

// Fraction factor renderer
const FractionFactor = ({ factor }: { factor: InputtedFactor }) => {
  const [numerator, denominator] = getFraction(factor.userSelectedValue);

  return (
    <div className="flex flex-row justify-center">
      <FractionDisplay numerator={numerator} denominator={denominator} />
      <p className={`${textSize} text-center break-words text-foreground mx-1`}>
        {factor.unit}
      </p>
    </div>
  );
};

// Ranged fraction factor renderer
const RangedFractionFactor = ({
  factor,
  onSliderChange,
}: {
  factor: InputtedFactor;
  onSliderChange: (value: number) => void;
}) => {
  const [numerator, denominator] = getFraction(factor.userSelectedValue);

  const handleSliderChange = (value: number[]) => {
    onSliderChange(value[0]);
  };

  return (
    <>
      <div className="flex flex-row justify-center">
        <FractionDisplay numerator={numerator} denominator={denominator} />
        <p
          className={`${textSize} text-center break-words text-foreground mx-1`}
        >
          {factor.unit}
        </p>
      </div>

      {/* slider */}
      <div className="w-full flex justify-center mb-4">
        <div className="w-48">
          <Slider
            min={factor.randomizedRange?.[0] || 0}
            max={factor.randomizedRange?.[1] || 100}
            step={factor.rangeStep || 1}
            value={[factor.userSelectedValue]}
            onValueChange={handleSliderChange}
            orientation="horizontal"
          />
        </div>
      </div>
    </>
  );
};

export { RegularFactor, FractionFactor, RangedFactor, RangedFractionFactor };
