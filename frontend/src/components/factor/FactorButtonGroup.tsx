import { Trash2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FactorButtonGroupProps {
  isInput: boolean;
  isValid: boolean;
  onStartEdit?: () => void;
  onRemove?: () => void;
  onSubmit?: () => void;
  onClear?: () => void;
}

export default function FactorButtonGroup({
  isInput,
  isValid,
  onStartEdit,
  onRemove,
  onSubmit,
  onClear,
}: FactorButtonGroupProps) {
  return isInput ? (
    <div className="flex flex-row gap-2 mt-6">
      <Button
        variant="outline"
        className={`bg-green-200/50 hover:bg-green-300 dark:bg-green-700/10 dark:hover:bg-green-600/25 ${
          isValid &&
          "bg-green-200/90 hover:bg-green-300 dark:bg-green-700/30 dark:hover:bg-green-600/45"
        }`}
        onClick={onSubmit}
      >
        Save
      </Button>
      <Button
        variant="outline"
        className="bg-red-200/50 hover:bg-red-300 dark:bg-red-800/10 dark:hover:bg-red-700/25"
        onClick={onClear}
      >
        Clear
      </Button>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-2">
      <Button
        variant="outline"
        className="w-10 h-10 bg-blue-200 hover:bg-blue-300 dark:bg-blue-800/10 dark:hover:bg-blue-700/25"
        onClick={onStartEdit}
      >
        <Pencil />
      </Button>
      <Button
        variant="outline"
        className="w-8 h-8 bg-red-200/50 hover:bg-red-300 dark:bg-red-800/10 dark:hover:bg-red-700/25"
        onClick={onRemove}
      >
        <Trash2 />
      </Button>
    </div>
  );
}
