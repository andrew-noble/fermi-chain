import { Factor } from "../../types";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

type FactorItemProps = {
  factor: Factor;
  handleRemoveItem: () => void;
};

const FactorItem = ({ factor, handleRemoveItem }: FactorItemProps) => {
  return (
    <div className="flex flex-col items-center gap-2 p-2 bg-blue-100 rounded-md min-w-[6rem] min-h-[6rem]">
      <p className="text-center break-words">{factor.label}</p>
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

export default FactorItem;
