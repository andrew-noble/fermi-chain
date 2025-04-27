import FactorButtonGroup from "@/components/factor/FactorButtonGroup";
import { EditorState } from "@/types";
import { Factor } from "@/types";
import InlineMantissa from "@/components/factor/InlineMantissa";
import InlineOom from "@/components/factor/InlineOom";
import InlineUnit from "@/components/factor/InlineUnit";
import { splitUnitInventory } from "@/helpers/unitManagement";
import FactorDisplay from "./FactorDisplay";
import MultiplicationSign from "../MultiplicationSign";
import { useState } from "react";

interface FactorLayoutProps {
  data: Factor | EditorState;
  isInput: boolean;
  showMultiplicationSign: boolean;
  updateNumeratorMantissa: (mantissa: number) => void;
  updateDenominatorMantissa: (mantissa: number) => void;
  updateNumeratorOom: (oomId: string) => void;
  updateDenominatorOom: (oomId: string) => void;
  onStartEdit?: () => void;
  onRemove?: () => void;
  onSubmit?: () => void;
  onClear?: () => void;
}

export default function FactorLayout({
  data,
  isInput,
  showMultiplicationSign = false,
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
  const [showInvalidFlash, setShowInvalidFlash] = useState(false);
  const isValid =
    (data.denominatorValue.fullValue !== 1 ||
      data.numeratorValue.fullValue !== 1) &&
    (Object.keys(numerators).length > 0 ||
      Object.keys(denominators).length > 0); //ensure minimum one value and one unit

  const handleSubmit = () => {
    if (isValid) {
      onSubmit?.();
    } else {
      setShowInvalidFlash(true);
      setTimeout(() => setShowInvalidFlash(false), 500);
    }
  };

  const textStyles =
    "text-base sm:text-lg md:text-xl lg:text-2xl xl:text-2xl 2xl:text-2xl";

  return isInput ? (
    <div
      className={`flex transition-all duration-200 rounded-md ${
        showInvalidFlash ? "shadow-[0_0_0_2px] shadow-primary" : ""
      }`}
    >
      <div className="grid grid-cols-[minmax(2rem, auto)_minmax(2rem, auto)_minmax(2rem, auto)] ring-2 ring-primary/40 p-2 rounded-md">
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
            oomId={data.numeratorValue.oomId}
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
            oomId={data.denominatorValue.oomId}
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
            isInput={isInput}
            isValid={isValid}
            onStartEdit={onStartEdit}
            onRemove={onRemove}
            onSubmit={handleSubmit}
            onClear={onClear}
          />
        </div>
      </div>
      {showMultiplicationSign && <MultiplicationSign className="text-base" />}
    </div>
  ) : (
    <div className="flex flex-col gap-1 items-center">
      <FactorDisplay
        factor={data}
        showMultiplicationSign
        className={textStyles}
      />
      <FactorButtonGroup
        isInput={isInput}
        isValid={isValid}
        onStartEdit={onStartEdit}
        onRemove={onRemove}
        onSubmit={handleSubmit}
        onClear={onClear}
      />
    </div>
  );
}
