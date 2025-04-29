import { Hook } from "@/types";
import SciNotationDisplay from "@/components/display/SciNotationDisplay";
import { isSameUnits } from "@/helpers/unitManagement";
import { formatNumberWithCommas } from "@/helpers/string-formatting";
import FullUnitDisplay from "@/components/display/FullUnitDisplay";

interface FeedbackAreaProps {
  hook: Hook;
}

export default function FeedbackArea({ hook }: FeedbackAreaProps) {
  const { liveValue, liveUnits } = hook.derivedState;
  const { question } = hook.state;

  const isCorrectUnits = isSameUnits(liveUnits, question.targetUnit);
  const unitStyle = isCorrectUnits ? "text-green-500" : "";
  const textStyles =
    "text-base sm:text-lg md:text-xl lg:text-2xl xl:text-2xl 2xl:text-2xl";

  const numIsPlural = liveValue.fullValue !== 1;
  const denIsPlural = liveValue.fullValue !== 1;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="text-primary font-semibold">
          {formatNumberWithCommas(liveValue.fullValue)}
        </span>
        <span className={`text-gray-500 ${textStyles}`}>
          <SciNotationDisplay value={liveValue} showParentheses />
        </span>
        <FullUnitDisplay
          unit={liveUnits}
          className={`${unitStyle} ${textStyles}`}
          numIsPlural={numIsPlural}
          denIsPlural={denIsPlural}
        />
      </div>
      <div className="flex items-center gap-2">
        <p className="text-gray-500 text-sm">Goal Unit:</p>
        <FullUnitDisplay
          unit={question.targetUnit}
          className={`${unitStyle} text-sm font-normal`}
          numIsPlural={question.targetValue.fullValue !== 1}
          denIsPlural={false}
        />
      </div>
    </div>
  );
}
