import { InputtedFactor } from "@/types";

import { Button } from "@/components/ui/button";

import { Trash2, GripHorizontal } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  RegularFactor,
  RangedFactor,
  FractionFactor,
  RangedFractionFactor,
} from "./InputFactors";

//this file is mostly just a draggability shell over the input factors

type InputContainerProps = {
  factor: InputtedFactor;
  isFirst: boolean;
  onRemoveFactor: () => void;
  onFactorValueChange: (value: number) => void;
};

const InputContainer = ({
  factor,
  isFirst,
  onRemoveFactor,
  onFactorValueChange,
}: InputContainerProps) => {
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

  const renderFactor = () => {
    switch (factor.type) {
      case "static":
        return <RegularFactor factor={factor} />;
      case "ranged":
        return (
          <RangedFactor factor={factor} onSliderChange={onFactorValueChange} />
        );
      case "staticFraction":
        return <FractionFactor factor={factor} />;
      case "rangedFraction":
        return (
          <RangedFractionFactor
            factor={factor}
            onSliderChange={onFactorValueChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {!isFirst && (
        <div className="flex items-start justify-center mx-4 pt-4">
          <span className="text-2xl">×</span>
        </div>
      )}
      <div
        ref={setNodeRef}
        style={dragStyle}
        className={`${
          isOver && !isDragging ? "opacity-50" : ""
        } flex flex-col items-center bg-card text-card-foreground p-4 rounded-lg`}
      >
        {renderFactor()}

        {/* Controls at bottom */}
        <div className="flex justify-between w-full mt-auto pt-2">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab z-10 h-9 w-9 flex items-center justify-center"
          >
            <GripHorizontal size={36} />
          </div>
          <Button variant="ghost" onClick={onRemoveFactor} className="h-9 w-9">
            <Trash2 size={48} className="size-6" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default InputContainer;
