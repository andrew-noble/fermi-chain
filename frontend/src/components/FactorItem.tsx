import { useState } from "react";
import { InputtedFactor } from "../types";
import { formatNumber } from "@/helpers/formatNumber";

import { Slider } from "./ui/slider";

//alot of the opaque code in here is for draggability, fyi

type FactorItemProps = {
  factor: InputtedFactor;
  isFirst: boolean;
  onFactorValueChange: (value: number) => void;
};

const FactorItemDraggable = ({
  factor,
  isFirst,
  onFactorValueChange,
}: FactorItemProps) => {
  const randomizeStartingValue = () => {
    if (factor.isRanged && factor.randomizedRange) {
      const [min = 0, max = 100] = factor.randomizedRange;
      const step = factor.rangeStep || 1;
      const steps = Math.floor((max - min) / step);
      return min + Math.floor(Math.random() * steps) * step;
    }
    return factor.value;
  };

  //state for value. starts ranged values at a random number so as not to give a hint
  const [userSelectedValue, setUserSelectedValue] = useState(() =>
    randomizeStartingValue()
  );

  const handleSliderChange = (newValue: number[]) => {
    setUserSelectedValue(newValue[0]);
    onFactorValueChange(newValue[0]);
  };

  const textSize = "text-2xl";

  return (
    <>
      {!isFirst && (
        <div className="flex items-start justify-center mx-4 pt-4">
          <span className={textSize}>×</span>
        </div>
      )}
      <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg h-fit">
        {/* value and units with parentheses*/}
        <div
          className={`flex flex-row relative ${
            factor.isRanged ? "mb-2" : "mb-0"
          }`}
        >
          <p
            className={`${textSize} font-bold text-center mx-1 ${
              factor.isRanged ? "text-amber-400" : "text-black"
            }`}
          >
            {formatNumber(userSelectedValue)}
          </p>
          <p className={`${textSize} text-center break-words text-black mx-1`}>
            {factor.unit}
          </p>
        </div>

        {/* slider (if ranged) */}
        {factor.isRanged && (
          <div className="w-30 mt-2">
            <Slider
              min={factor.randomizedRange?.[0] || 0}
              max={factor.randomizedRange?.[1] || 100}
              step={factor.rangeStep || 1}
              value={[userSelectedValue]}
              onValueChange={handleSliderChange}
              orientation="horizontal"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default FactorItemDraggable;
