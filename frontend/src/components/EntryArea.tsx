import { EntryItem } from "../types";
import { Button } from "./ui/button";

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
  useSortable,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

type SortableTokenProps = {
  item: EntryItem;
  handleRemoveItem: (item: EntryItem) => void;
};

// SortableToken adds drag behavior to the calculation tokens
const SortableToken = ({ item, handleRemoveItem }: SortableTokenProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.item.label }); // use unique ID for drag tracking

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center gap-2 p-2"
    >
      <p>{item.item.label}</p>
      <Button variant="outline" onClick={() => handleRemoveItem(item)}>
        -
      </Button>
    </div>
  );
};

type EntryAreaProps = {
  userInput: EntryItem[];
  handleRemoveItem: (item: EntryItem) => void;
  setUserInput: (items: EntryItem[]) => void; // you now control reordering from parent
};

const EntryArea = ({
  userInput,
  handleRemoveItem,
  setUserInput,
}: EntryAreaProps) => {
  const sensors = useSensors(useSensor(PointerSensor));

  // this is the logic for drag reordering
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // rejection logic: if the item is not over a valid target, or the item is over itself, return
    if (!over || active.id === over.id) return;

    // find the old and new indices of the item
    const oldIndex = userInput.findIndex(
      (item) => item.item.label === active.id
    );
    const newIndex = userInput.findIndex((item) => item.item.label === over.id);

    // move the item to the new index
    const reordered = arrayMove(userInput, oldIndex, newIndex);

    // 🧠 Custom Reordering rule enforcement/rejection.
    // so you can't have two operations in a row "--"
    for (let i = 0; i < reordered.length - 1; i++) {
      if (reordered[i].type === reordered[i + 1].type) {
        return; // reject move
      }
    }

    setUserInput(reordered);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={userInput.map((item) => item.item.label)}
          strategy={rectSortingStrategy}
        >
          <div className="flex flex-col gap-2">
            {userInput.map((item) => (
              <SortableToken
                key={item.item.label}
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
