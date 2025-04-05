import { InputItem as InputItemType } from "../types";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import InputItem from "./input-items/InputItem";

// this file is sorta scary.
// But all the obtuse logic is *just* for implementing drag reordering!

import {
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { rectSortingStrategy } from "@dnd-kit/sortable";

interface EntryAreaProps {
  items: InputItemType[];
  onReorder: (items: InputItemType[]) => void;
  onRemoveItem: (item: InputItemType) => void;
  onFactorValueChange?: (itemId: string, newValue: number) => void;
}

const EntryArea = ({
  items,
  onReorder,
  onRemoveItem,
  onFactorValueChange,
}: EntryAreaProps) => {
  const sensors = useSensors(useSensor(PointerSensor));

  // this is the logic for drag reordering
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // rejection logic: if the item is not over a valid target, or the item is over itself, return
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);

    // move the item to the new index
    const reordered = arrayMove(items, oldIndex, newIndex);

    onReorder(reordered);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map((item) => item.id)}
          strategy={rectSortingStrategy}
        >
          <div className="flex flex-wrap gap-2 [&>*]:transform-gpu">
            {items.map((item) => (
              <InputItem
                key={item.id}
                item={item}
                handleRemoveItem={onRemoveItem}
                onFactorValueChange={onFactorValueChange}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default EntryArea;
