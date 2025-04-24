import { Trash2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FactorButtonGroupProps {
  editing: boolean;
  isValid: boolean;
  onStartEdit?: () => void;
  onRemove?: () => void;
  onSubmit?: () => void;
  onClear?: () => void;
}

export default function FactorButtonGroup({
  editing,
  isValid,
  onStartEdit,
  onRemove,
  onSubmit,
  onClear,
}: FactorButtonGroupProps) {
  return (
    <div className="flex gap-2 mt-6">
      {editing ? (
        <>
          <Button variant="outline" disabled={!isValid} onClick={onSubmit}>
            Save
          </Button>
          <Button variant="outline" onClick={onClear}>
            Clear
          </Button>
        </>
      ) : (
        <>
          <Button variant="outline" onClick={onStartEdit}>
            <Pencil />
          </Button>
          <Button variant="outline" onClick={onRemove}>
            <Trash2 />
          </Button>
        </>
      )}
    </div>
  );
}
