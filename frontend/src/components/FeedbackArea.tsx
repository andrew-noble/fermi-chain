import { Hook, Value } from "@/types";
import { resolveUnits, isSameUnits } from "@/helpers/unitManagement";
import { getUnitStrings } from "@/helpers/unitManagement";
import InlineUnit from "@/components/InlineUnit";
import { formatNumberWithCommas } from "@/helpers/formatNumber";
import { collapseValue } from "@/helpers/valueManagement";
import SciNotationDisplay from "@/components/SciNotationDisplay";

interface FeedbackAreaProps {
  hook: Hook;
}

export default function FeedbackArea({ hook }: FeedbackAreaProps) {
  const chainUnits = hook.derivedState.chainUnits;
  const editorUnits = hook.state.editorState.units;
  const liveUnits = resolveUnits([chainUnits, editorUnits]);

  const chainValue = hook.derivedState.chainValue;
  const editorNumerator = hook.state.editorState.numeratorValue;
  const editorDenominator = hook.state.editorState.denominatorValue;

  // Create a proper Value object for the numerator
  const numeratorValue: Value = {
    mantissa: chainValue.mantissa * editorNumerator.mantissa,
    oom: chainValue.oom,
    getFullValue: () =>
      chainValue.getFullValue() * editorNumerator.getFullValue(),
  };

  // Use collapseValue to properly handle mantissa normalization
  const liveValue = collapseValue(numeratorValue, editorDenominator);

  const isCorrectUnits = isSameUnits(
    liveUnits,
    hook.state.question.targetUnits
  );

  const correctUnitsStyling = (isCorrect: boolean) => {
    if (isCorrect) return "text-green-500";
    else return "text-amber-500";
  };

  // //later, when user can do more granular than just oom, this do more lifting
  // const isCorrectOom = isSameOom(
  //   chain.derivedState.chainOom.value,
  //   chain.state.question.targetOom.value
  // );

  const { numerators, denominators } = getUnitStrings(liveUnits);

  return (
    <>
      <div className="flex items-center gap-2">
        <span className="text-primary font-semibold">
          {formatNumberWithCommas(liveValue.getFullValue())}
        </span>
        <span className="text-gray-500 text-sm">
          (<SciNotationDisplay value={liveValue} />)
        </span>
      </div>

      <div
        className={`flex gap-1 whitespace-nowrap font-bold ${correctUnitsStyling(
          isCorrectUnits
        )}`}
      >
        <InlineUnit units={numerators} />
        {denominators.length > 0 && (
          <>
            <span className="text-gray-400"> / </span>
            <InlineUnit units={denominators} />
          </>
        )}
      </div>
    </>
  );
}
