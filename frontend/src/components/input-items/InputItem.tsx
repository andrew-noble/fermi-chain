import { InputItem as InputItemType, Factor, Operation } from "../../types";
import { GripVertical } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import FactorItem from "./FactorItem";
import OperationItem from "./OperationItem";

type InputItemProps = {
  item: InputItemType;
  handleRemoveItem: (item: InputItemType) => void;
  onFactorValueChange?: (itemId: string, newValue: number) => void;
};

const InputItem = ({
  item,
  handleRemoveItem,
  onFactorValueChange,
}: InputItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative ${isOver && !isDragging ? "opacity-50" : ""}`}
    >
      {item.type === "factor" ? (
        <div className="relative">
          <div
            {...attributes}
            {...listeners}
            className="absolute bottom-1 left-1 cursor-grab z-10 p-1 h-6 w-6 flex items-center justify-center"
          >
            <GripVertical size={14} />
          </div>
          <FactorItem
            factor={item.data as Factor}
            handleRemoveItem={() => handleRemoveItem(item)}
            onValueChange={(value) => onFactorValueChange?.(item.id, value)}
          />
        </div>
      ) : (
        <div className="relative">
          <div
            {...attributes}
            {...listeners}
            className="absolute bottom-1 left-1 cursor-grab z-10 p-1 h-6 w-6 flex items-center justify-center"
          >
            <GripVertical size={14} />
          </div>
          <OperationItem
            operation={item.data as Operation}
            handleRemoveItem={() => handleRemoveItem(item)}
          />
        </div>
      )}
    </div>
  );
};

export default InputItem;
