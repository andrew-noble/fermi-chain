import FactorRow from "@/components/factor/FactorRow";
import FactorButtonGroup from "@/components/factor/FactorButtonGroup";
import clsx from "clsx";
import { EditorState } from "@/types";
import { Factor } from "@/types";
import { Oom } from "@/types";
import { getUnitStrings } from "@/helpers/unitManagement";

interface FactorLayoutProps {
  data: Factor | EditorState;
  isEditing: boolean;
  updateNumeratorOom?: (oom: Oom) => void;
  updateDenominatorOom?: (oom: Oom) => void;
  onStartEdit?: () => void;
  onRemove?: () => void;
  onSubmit?: () => void;
  onClear?: () => void;
}

export default function FactorLayout({
  data,
  isEditing,
  updateNumeratorOom,
  updateDenominatorOom,
  onStartEdit,
  onRemove,
  onSubmit,
  onClear,
}: FactorLayoutProps) {
  const { numerators, denominators } = getUnitStrings(data.units);
  const isValid = Object.keys(data.units).length > 0;

  return (
    <div
      className={clsx(
        "flex flex-col items-center p-2 rounded-lg shadow-sm h-min-[270px]",
        isEditing && "bg-primary/15"
      )}
    >
      <FactorRow
        label="numerator"
        oom={data.numeratorOom}
        units={numerators}
        editing={isEditing}
        onUpdateOom={updateNumeratorOom}
      />

      <div className="w-full border-t border-gray-200 dark:border-gray-800 my-1" />

      <FactorRow
        label="denominator"
        oom={data.denominatorOom}
        units={denominators}
        editing={isEditing}
        onUpdateOom={updateDenominatorOom}
      />

      <FactorButtonGroup
        editing={isEditing}
        isValid={isValid}
        onStartEdit={onStartEdit}
        onRemove={onRemove}
        onSubmit={onSubmit}
        onClear={onClear}
      />
    </div>
  );
}
