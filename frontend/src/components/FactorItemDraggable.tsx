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

  //styling for draggability/ordering
  const dragStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleSliderChange = (newValue: number[]) => {
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
        } flex flex-col items-center bg-card text-card-foreground p-4 rounded-lg`}
      >
        {/* value and units */}
        <div
          className={`flex flex-row justify-center ${
            factor.isRanged ? "mb-4" : "mb-0"
          }`}
        >
          <p className={`${textSize} font-bold text-center mx-1 text-primary`}>
            {formatNumber(factor.userSelectedValue)}
          </p>
          <p
            className={`${textSize} text-center break-words text-foreground mx-1`}
          >
            {factor.unit}
          </p>
        </div>

        {/* slider (if ranged) */}
        {factor.isRanged && (
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
        )}

        {/* Controls at bottom */}
        <div className="flex justify-between w-full mt-auto pt-2">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab z-10 h-9 w-9 flex items-center justify-center"
          >
            <GripHorizontal size={36} />
          </div>
          <Button variant="ghost" onClick={onRemoveItem} className="h-9 w-9">
            <Trash2 size={48} className="size-6" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default FactorItemDraggable;
