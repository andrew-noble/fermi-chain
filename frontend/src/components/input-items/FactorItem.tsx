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
  const [value, setValue] = useState(factor.value);

  const handleSliderChange = (newValue: number[]) => {
    setValue(newValue[0]);
    onValueChange?.(newValue[0]);
  };

  return (
    <div className="flex flex-col items-center gap-2 p-2 bg-blue-100 rounded-md min-w-[6rem] min-h-[6rem] relative">
      <p className="text-center break-words">{factor.label}</p>

      {factor.isRanged && factor.randomizedRange && (
        <div className="w-full px-2">
          <Slider
            min={factor.randomizedRange[0]}
            max={factor.randomizedRange[1]}
            step={factor.rangeStep || 1}
            value={[value]}
            onValueChange={handleSliderChange}
            className="w-full"
          />
          <p className="text-sm text-center mt-1">{formatNumber(value)}</p>
        </div>
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
