import { InputItem } from "../types";
import InputItemComponent from "./InputItem";

// this file is sorta scary.
// But all the obtuse logic is *just* for implementing drag reordering!

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";

import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

type EntryAreaProps = {
  userInput: InputItem[];
  handleRemoveItem: (item: InputItem) => void;
  handleReorder: (items: InputItem[]) => void;
};

const EntryArea = ({
  userInput,
  handleRemoveItem,
  handleReorder,
}: EntryAreaProps) => {
  const sensors = useSensors(useSensor(PointerSensor));

  // this is the logic for drag reordering
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // rejection logic: if the item is not over a valid target, or the item is over itself, return
    if (!over || active.id === over.id) return;

    const oldIndex = userInput.findIndex((item) => item.id === active.id);
    const newIndex = userInput.findIndex((item) => item.id === over.id);

    // move the item to the new index
    const reordered = arrayMove(userInput, oldIndex, newIndex);

    handleReorder(reordered);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={userInput.map((item) => item.id)}
          strategy={rectSortingStrategy}
        >
          <div className="flex flex-wrap gap-2">
            {userInput.map((item) => (
              <InputItemComponent
                key={item.id}
                item={item}
                handleRemoveItem={handleRemoveItem}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default EntryArea;
