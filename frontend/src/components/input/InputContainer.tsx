import { InputtedFactor } from "@/types";

import { Button } from "@/components/ui/button";

import { Trash2, GripHorizontal } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FactorInfoWithLayout, SliderWithLayout } from "./InputFactors";

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
    if (factor.isRanged) {
      return (
        <>
          <FactorInfoWithLayout factor={factor} />
          <SliderWithLayout
            factor={factor}
            onSliderChange={onFactorValueChange}
          />
        </>
      );
    } else {
      return <FactorInfoWithLayout factor={factor} />;
    }
  };

  return (
    <>
      {!isFirst && (
        <div className="flex items-center justify-center mx-4 py-4">
          <span className="text-2xl">×</span>
        </div>
      )}
      <div
        ref={setNodeRef}
        style={dragStyle}
        className={`${
          isOver && !isDragging ? "opacity-50" : ""
        } grid grid-rows-[1fr_auto] bg-card text-card-foreground p-4 rounded-lg gap-4`}
      >
        {/* Main content area - factor display and slider */}
        <div className="w-full">{renderFactor()}</div>

        {/* Controls row - using flex to put grip on left, trash on right */}
        <div className="flex justify-between items-center">
          <div {...attributes} {...listeners} className="cursor-grab">
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
