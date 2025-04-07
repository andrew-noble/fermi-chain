import { InputtedFactor } from "@/types";
import InputContainer from "@/components/input/InputContainer";

//dnd imports
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import {
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { rectSortingStrategy } from "@dnd-kit/sortable";

interface InputAreaProps {
  factors: InputtedFactor[];
  onReorderFactors: (items: InputtedFactor[]) => void;
  onRemoveFactor: (item: InputtedFactor) => void;
  onFactorValueChange?: (itemId: string, newValue: number) => void;
}

const InputArea = ({
  factors,
  onReorderFactors,
  onRemoveFactor,
  onFactorValueChange,
}: InputAreaProps) => {
  //dnd sensors -- it sets up event listeners
  const sensors = useSensors(useSensor(PointerSensor));

  // this is the logic for drag reordering
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // rejection logic: if the item is not over a valid target, or the item is over itself, return
    if (!over || active.id === over.id) return;

    const oldIndex = factors.findIndex((factor) => factor.id === active.id);
    const newIndex = factors.findIndex((factor) => factor.id === over.id);

    // move the item to the new index
    const reordered = arrayMove(factors, oldIndex, newIndex);

    //report reorder to parent
    onReorderFactors(reordered);
  };

  return (
    <div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={factors.map((factor) => factor.id)}
          strategy={rectSortingStrategy}
        >
          <div className="flex flex-wrap gap-y-4">
            {factors.map((factor, index) => (
              <InputContainer
                key={factor.id}
                factor={factor}
                isFirst={index === 0}
                onRemoveFactor={() => onRemoveFactor(factor)}
                onFactorValueChange={(newValue) =>
                  onFactorValueChange?.(factor.id, newValue)
                }
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default InputArea;
