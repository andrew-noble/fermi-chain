import { useState } from "react";
import { InputtedFactor } from "../types";
import { formatNumber } from "@/helpers/formatNumber";

import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Trash2 } from "lucide-react";
import { GripVertical } from "lucide-react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

//alot of the opaque code in here is for draggability, fyi

type FactorItemDraggableProps = {
  factor: InputtedFactor;
  isFirst: boolean;
  onRemoveItem: () => void;
  onFactorValueChange: (value: number) => void;
};

const FactorItemDraggable = ({
  factor,
  isFirst,
  onRemoveItem,
  onFactorValueChange,
}: FactorItemDraggableProps) => {
  //state for draggability/ordering
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
  } = useSortable({ id: factor.id });

  //styling for draggability/ordering
  const dragStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  //starts ranged values at a random number so as not to give a hint
  const [userSelectedValue, setUserSelectedValue] = useState(() => {
    if (factor.isRanged && factor.randomizedRange) {
      const [min = 0, max = 100] = factor.randomizedRange;
      const step = factor.rangeStep || 1;
      const steps = Math.floor((max - min) / step);
      return min + Math.floor(Math.random() * steps) * step;
    }
    return factor.value;
  });

  const handleSliderChange = (newValue: number[]) => {
    setUserSelectedValue(newValue[0]);
    onFactorValueChange(newValue[0]);
  };

  return (
    <div
      ref={setNodeRef}
      style={dragStyle}
      className={`relative ${isOver && !isDragging ? "opacity-50" : ""}`}
    >
      {/* this is the mouse target for dragging */}
      <div className="relative">
        <div
          {...attributes}
          {...listeners}
          className="absolute bottom-1 left-1 cursor-grab z-10 p-1 h-6 w-6 flex items-center justify-center"
        >
          <GripVertical size={14} />
        </div>

        {/* this is the factor input item */}
        <div className="flex flex-col items-center gap-2 p-2 bg-blue-100 rounded-md min-w-[6rem] min-h-[6rem] relative">
          {isFirst ? "" : <p className="text-sm text-center mt-1">×</p>}
          {factor.isRanged ? (
            <div className="w-full px-2">
              <p className="text-xl text-center mb-3">
                {formatNumber(userSelectedValue)}
              </p>
              <p className="text-center break-words mb-3">{factor.label}</p>

              <Slider
                min={factor.randomizedRange?.[0] || 0}
                max={factor.randomizedRange?.[1] || 100}
                step={factor.rangeStep || 1}
                value={[userSelectedValue]}
                onValueChange={handleSliderChange}
                orientation="vertical"
                className="h-24"
              />
            </div>
          ) : (
            <p className="text-sm text-center mt-1">
              {formatNumber(userSelectedValue)}
            </p>
          )}

          {/* this is the remove button */}
          <Button
            variant="outline"
            onClick={onRemoveItem}
            className="absolute bottom-1 right-1 p-1 h-6 w-6"
          >
            <Trash2 size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FactorItemDraggable;
