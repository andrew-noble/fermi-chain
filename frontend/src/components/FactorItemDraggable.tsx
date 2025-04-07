import { useState } from "react";
import { InputtedFactor } from "../types";
import { formatNumber } from "@/helpers/formatNumber";

import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Trash2, GripHorizontal } from "lucide-react";

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

  //styling for draggability/ordering
  const dragStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

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
      <div
        ref={setNodeRef}
        style={dragStyle}
        className={`${
          isOver && !isDragging ? "opacity-50" : ""
        } flex flex-col items-center bg-gray-200 p-4 rounded-lg relative`}
      >
        {/* value and units with parentheses*/}
        <div className="flex flex-row relative mb-8">
          <span className={`${textSize} mr-1`}>(</span>
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
          <span className={`${textSize} ml-1`}>)</span>
        </div>

        {/* slider (if ranged) */}
        {factor.isRanged && (
          <div className="mb-8 w-30">
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

        {/* this is the mouse target for dragging */}
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab z-10 h-9 w-9 m-2 absolute bottom-0 left-0 flex items-center justify-center"
        >
          <GripHorizontal size={36} />
        </div>

        {/* this is the remove button */}
        <Button
          variant="ghost"
          onClick={onRemoveItem}
          className="h-9 w-9 m-2 absolute bottom-0 right-0"
        >
          <Trash2 size={48} className="size-6" />
        </Button>
      </div>
    </>
  );
};

export default FactorItemDraggable;
