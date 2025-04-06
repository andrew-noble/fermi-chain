import { Factor } from "../../types";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { Slider } from "../ui/slider";
import { formatNumber } from "@/helpers/formatNumber";
import { useState } from "react";

type FactorItemProps = {
  factor: Factor;
  handleRemoveItem: () => void;
  onValueChange?: (value: number) => void;
};

const FactorItem = ({
  factor,
  handleRemoveItem,
  onValueChange,
}: FactorItemProps) => {
  //starts ranged values at a random number so as not to give a hint
  const [value, setValue] = useState(() => {
    if (factor.isRanged && factor.randomizedRange) {
      const [min = 0, max = 100] = factor.randomizedRange;
      const step = factor.rangeStep || 1;
      const steps = Math.floor((max - min) / step);
      return min + Math.floor(Math.random() * steps) * step;
    }
    return factor.value;
  });

  const handleSliderChange = (newValue: number[]) => {
    setValue(newValue[0]);
    onValueChange?.(newValue[0]);
  };

  return (
    <div className="flex flex-col items-center gap-2 p-2 bg-blue-100 rounded-md min-w-[6rem] min-h-[6rem] relative">
      {factor.isRanged ? (
        <div className="w-full px-2">
          <p className="text-xl text-center mb-3">{formatNumber(value)}</p>
          <p className="text-center break-words mb-3">{factor.label}</p>

          <Slider
            min={factor.randomizedRange?.[0] || 0}
            max={factor.randomizedRange?.[1] || 100}
            step={factor.rangeStep || 1}
            value={[value]}
            onValueChange={handleSliderChange}
            orientation="vertical"
            className="h-24"
          />
        </div>
      ) : (
        <p className="text-sm text-center mt-1">{formatNumber(value)}</p>
      )}

      <Button
        variant="outline"
        onClick={handleRemoveItem}
        className="absolute bottom-1 right-1 p-1 h-6 w-6"
      >
        <Trash2 size={14} />
      </Button>
    </div>
  );
};

export default FactorItem;
