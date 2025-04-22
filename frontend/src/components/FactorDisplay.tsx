import { Factor, EditorState, Oom } from "@/types";
import { Button } from "@/components/ui/button";
import InlineOom from "@/components/InlineOom";
import InlineUnit from "@/components/InlineUnit";
import { getUnitStrings } from "@/helpers/unitManagement";
import { Pencil, Trash2 } from "lucide-react";
import OomSelector from "@/components/OomSelector";

interface FactorDisplayProps {
  data: Factor | EditorState;
  isEditing: boolean;
  updateNumeratorOom?: (oom: Oom) => void;
  updateDenominatorOom?: (oom: Oom) => void;
  onStartEdit?: () => void;
  onRemove?: () => void;
  onSubmit?: () => void;
  onClear?: () => void;
}

export default function FactorDisplay({
  data,
  isEditing,
  updateNumeratorOom,
  updateDenominatorOom,
  onStartEdit,
  onRemove,
  onSubmit,
  onClear,
}: FactorDisplayProps) {
  const { numerators, denominators } = getUnitStrings(data.units);

  const editingBgColor = "bg-primary/15";
  const isValid = Object.keys(data.units).length > 0;

  return (
    <div
      className={`flex flex-col items-center p-2 rounded-lg shadow-sm h-min-[270px] ${
        isEditing ? editingBgColor : ""
      }`}
    >
      {/* Numerator Row */}
      <div className="flex items-center gap-1 w-full flex-1">
        {isEditing && (
          <OomSelector
            onUpdateOom={updateNumeratorOom!}
            currentOom={data.numeratorOom}
            title="numerator"
          />
        )}
        <div
          className={`flex gap-1 flex-1 ${
            isEditing ? "items-center" : "items-end"
          }`}
        >
          <InlineOom
            oom={data.numeratorOom}
            className="text-xl md:text-2xl lg:text-3xl"
          />
          <div className="text-xl md:text-2xl lg:text-3xl whitespace-nowrap">
            <InlineUnit units={numerators} />
          </div>
        </div>
      </div>

      {/* Divider line */}
      <div className="w-full border-t border-gray-200 dark:border-gray-800 my-1" />

      {/* Denominator Row */}
      <div className="flex items-center gap-1 w-full flex-1">
        {isEditing && (
          <OomSelector
            onUpdateOom={updateDenominatorOom!}
            currentOom={data.denominatorOom}
            title="denominator"
          />
        )}
        <div
          className={`flex gap-1 flex-1 ${
            isEditing ? "items-center" : "items-start"
          }`}
        >
          <InlineOom
            oom={data.denominatorOom}
            className="text-xl md:text-2xl lg:text-3xl"
          />
          <div className="text-xl md:text-2xl lg:text-3xl whitespace-nowrap">
            <InlineUnit units={denominators} />
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-2 mt-6">
        {isEditing ? (
          <>
            <Button
              variant="outline"
              disabled={!isValid}
              onClick={onSubmit}
              className="p-2"
            >
              Add
            </Button>
            <Button variant="outline" onClick={onClear} className="p-2">
              Clear
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" onClick={onStartEdit} className="p-1">
              <Pencil />
            </Button>
            <Button variant="outline" onClick={onRemove} className="p-1">
              <Trash2 />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
