import { formatNumber } from "@/helpers/formatNumber";
import FractionDisplay from "@/components/display/FractionDisplay";
import { InputtedFactor } from "@/types";
import { Slider } from "@/components/ui/slider";

// TODO: Consider moving to theme configuration
const textSize = "text-xl";

interface FactorInfoWithLayoutProps {
  factor: InputtedFactor;
}

/**
 * Displays factor information with a consistent layout
 * @param props.factor - The factor to display
 * @returns A component showing either a fraction or numeric value with units
 */
const FactorInfoWithLayout = ({ factor }: FactorInfoWithLayoutProps) => {
  return (
    <div className="col-span-2 flex items-center justify-center h-16">
      <div className="flex items-center justify-center">
        {factor.isFraction ? (
          <FractionDisplay factor={factor} textSize={textSize} />
        ) : (
          <p
            className={`${textSize} font-bold text-center text-primary min-w-[35px]`}
          >
            {formatNumber(factor.userSelectedValue)}
          </p>
        )}
        <p
          className={`${textSize} text-center break-words text-foreground ml-2`}
        >
          {factor.unit}
        </p>
      </div>
    </div>
  );
};

interface SliderWithLayoutProps {
  factor: InputtedFactor;
  onSliderChange: (value: number) => void;
}

/**
 * Displays a slider control with consistent layout
 * @param props.factor - The factor to control
 * @param props.onSliderChange - Callback when slider value changes
 * @returns A slider component with proper layout and constraints
 */
const SliderWithLayout = ({
  factor,
  onSliderChange,
}: SliderWithLayoutProps) => {
  const handleSliderChange = (value: number[]) => {
    onSliderChange(value[0]);
  };

  const min = factor.randomizedRange?.[0] ?? 0;
  const max = factor.randomizedRange?.[1] ?? 100;
  const step = factor.rangeStep ?? 1;

  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-[240px] py-2">
        <Slider
          min={min}
          max={max}
          step={step}
          value={[factor.userSelectedValue]}
          onValueChange={handleSliderChange}
          orientation="horizontal"
        />
      </div>
    </div>
  );
};

export { FactorInfoWithLayout, SliderWithLayout };
