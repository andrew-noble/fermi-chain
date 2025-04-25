import FactorButtonGroup from "@/components/factor/FactorButtonGroup";
import { EditorState, Oom } from "@/types";
import { Factor } from "@/types";
import InlineMantissa from "@/components/factor/InlineMantissa";
import InlineOom from "@/components/factor/InlineOom";
import InlineUnit from "@/components/factor/InlineUnit";
import SciNotationDisplay from "@/components/SciNotationDisplay";
import { splitUnitInventory } from "@/helpers/unitManagement";

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
  const [numerators, denominators] = splitUnitInventory(data.unit);
  const isValid = data.unit && Object.keys(data.unit).length > 0;

  const textStyles = isEditing ? "text-base" : "text-lg md:text-xl lg:text-2xl";

  return isEditing ? (
    <div className="grid grid-cols-[minmax(7rem, auto)_minmax(5rem, auto)_minmax(6rem, auto)] ring-2 ring-primary/50 p-2 rounded-md">
      {/* Numerator Row */}
      <div className="col-start-1 flex items-center justify-center">
        <InlineMantissa
          mantissa={data.numeratorValue.mantissa}
          onUpdateMantissa={updateNumeratorMantissa}
          className={textStyles}
        />
      </div>
      <div className="col-start-2 flex items-center justify-center">
        <InlineOom
          oom={data.numeratorValue.oom}
          onUpdateOom={updateNumeratorOom}
          className={textStyles}
        />
      </div>
      <div className="col-start-3 flex items-center justify-center">
        <InlineUnit unit={numerators} className={textStyles} />
      </div>

      {/* Divider Row */}
      <div className="col-span-3 border-t border-gray-200 dark:border-gray-800 my-1" />

      {/* Denominator Row */}
      <div className="col-start-1 flex items-center justify-center">
        <InlineMantissa
          mantissa={data.denominatorValue.mantissa}
          onUpdateMantissa={updateDenominatorMantissa}
          className={textStyles}
        />
      </div>
      <div className="col-start-2 flex items-center justify-center">
        <InlineOom
          oom={data.denominatorValue.oom}
          onUpdateOom={updateDenominatorOom}
          className={textStyles}
        />
      </div>
      <div className="col-start-3 flex items-center justify-center">
        <InlineUnit unit={denominators} className={textStyles} />
      </div>

      {/* Button Row */}
      <div className="col-span-3 flex items-center justify-center">
        <FactorButtonGroup
          editing={isEditing}
          isValid={isValid}
          onStartEdit={onStartEdit}
          onRemove={onRemove}
          onSubmit={onSubmit}
          onClear={onClear}
        />
      </div>
    </div>
  ) : (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1">
        <SciNotationDisplay
          value={data.numeratorValue}
          className={textStyles}
        />
        <InlineUnit unit={numerators} className={textStyles} />
      </div>
      <div className="col-span-3 border-t border-gray-200 dark:border-gray-800 my-1" />
      <div className="flex gap-1">
        <SciNotationDisplay
          value={data.denominatorValue}
          className={textStyles}
        />
        <InlineUnit unit={denominators} className={textStyles} />
      </div>
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
