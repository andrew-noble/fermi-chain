import { Operation } from "../../types";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

type OperationItemProps = {
  operation: Operation;
  handleRemoveItem: () => void;
};

const OperationItem = ({ operation, handleRemoveItem }: OperationItemProps) => {
  return (
    <div className="flex flex-col items-center gap-2 p-2 bg-blue-100 rounded-md w-24 h-24">
      <p className="text-center text-4xl font-bold">{operation.symbol}</p>
      <Button
        variant="outline"
        onClick={handleRemoveItem}
        className="absolute bottom-1 right-1 p-1 h-6 w-6"
      >
        <Trash2 size={14} />
      </Button>
    </div>
  );
};

export default OperationItem;
