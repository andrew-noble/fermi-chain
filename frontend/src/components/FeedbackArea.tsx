import { Hook } from "@/types";
import { resolveUnits, isSameUnits } from "@/helpers/unitManagement";
import { getUnitStrings } from "@/helpers/unitManagement";
// import { isSameOom } from "@/helpers/oomManagement";
import InlineUnit from "@/components/InlineUnit";
import { formatNumberWithCommas } from "@/helpers/formatNumber";

interface FeedbackAreaProps {
  hook: Hook;
}

export default function FeedbackArea({ hook }: FeedbackAreaProps) {
  const chainUnits = hook.derivedState.chainUnits;
  const editorUnits = hook.state.editorState.units;
  const liveUnits = resolveUnits([chainUnits, editorUnits]);

  const chainOom = hook.derivedState.chainOom.value;
  const editorOom_n = hook.state.editorState.numeratorOom;
  const editorOom_d = hook.state.editorState.denominatorOom;
  const liveOom = (chainOom * editorOom_n.value) / editorOom_d.value;

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
      <span className="text-primary font-semibold">
        {formatNumberWithCommas(liveOom)}
      </span>

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
