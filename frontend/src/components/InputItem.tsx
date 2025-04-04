import { InputItem as InputItemType, Factor, Operation } from "../types";
import { Button } from "./ui/button";
import { GripVertical, Trash2 } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type InputItemProps = {
  item: InputItemType;
  handleRemoveItem: (item: InputItemType) => void;
};

const InputItem = ({ item, handleRemoveItem }: InputItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const renderContent = () => {
    if (item.type === "factor") {
      const factor = item.data as Factor;
      return <p>{factor.label}</p>;
    } else {
      const operation = item.data as Operation;
      return <p>{operation.symbol}</p>;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex flex-col items-center gap-2 p-2 bg-blue-100 rounded-md"
    >
      <div {...attributes} {...listeners} className="cursor-grab">
        <GripVertical size={20} />
      </div>
      {renderContent()}
      <div>
        <Button
          variant="outline"
          onClick={() => handleRemoveItem(item)}
          className="ml-auto"
        >
          <Trash2 size={16} />
        </Button>
      </div>
    </div>
  );
};

export default InputItem;
