import { formatNumber, getFraction } from "@/helpers/formatNumber";
import { InputtedFactor } from "@/types";
import { Slider } from "@/components/ui/slider";

const textSize = "text-2xl";

// Internal-use fraction layout
const FractionDisplay = ({
  numerator,
  denominator,
}: {
  numerator: number;
  denominator: number;
}) => (
  <div className="inline-flex flex-col items-center mr-2">
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

const FactorInfoWithLayout = ({ factor }: { factor: InputtedFactor }) => {
  let numerator = 1;
  let denominator = 1;

  if (factor.isFraction) {
    [numerator, denominator] = getFraction(factor.userSelectedValue);
  }

  return (
    <div className="col-span-2 mb-4">
      <div className="flex items-center justify-center">
        {factor.isFraction ? (
          <FractionDisplay numerator={numerator} denominator={denominator} />
        ) : (
          <p className={`${textSize} font-bold text-center mx-1 text-primary`}>
            {formatNumber(factor.userSelectedValue)}
          </p>
        )}
        <p
          className={`${textSize} text-center break-words text-foreground mx-1`}
        >
          {factor.unit}
        </p>
      </div>
    </div>
  );
};

const SliderWithLayout = ({
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
  );
};

export { FactorInfoWithLayout, SliderWithLayout };
