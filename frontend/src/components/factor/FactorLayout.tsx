import FactorRow from "@/components/factor/FactorRow";
import FactorButtonGroup from "@/components/factor/FactorButtonGroup";
import clsx from "clsx";
import { EditorState, Oom } from "@/types";
import { Factor } from "@/types";
import { getUnitStrings } from "@/helpers/unitManagement";

interface FactorLayoutProps {
  data: Factor | EditorState;
  isEditing: boolean;
  updateNumeratorMantissa: (mantissa: number) => void;
  updateDenominatorMantissa: (mantissa: number) => void;
  updateNumeratorOom: (oom: Oom) => void;
  updateDenominatorOom: (oom: Oom) => void;
  onStartEdit?: () => void;
  onRemove?: () => void;
  onSubmit?: () => void;
  onClear?: () => void;
}

export default function FactorLayout({
  data,
  isEditing,
  updateNumeratorMantissa,
  updateDenominatorMantissa,
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
        "flex flex-col items-center p-2 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 h-min-[270px]",
        isEditing && "ring-2 ring-primary/50"
      )}
    >
      <FactorRow
        label="numerator"
        value={data.numeratorValue}
        units={numerators}
        editing={isEditing}
        onUpdateMantissa={updateNumeratorMantissa}
        onUpdateOom={updateNumeratorOom}
      />

      <div className="w-full border-t border-gray-200 dark:border-gray-800 my-1" />

      <FactorRow
        label="denominator"
        value={data.denominatorValue}
        units={denominators}
        editing={isEditing}
        onUpdateMantissa={updateDenominatorMantissa}
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
