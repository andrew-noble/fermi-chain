import { Hook } from "@/types";
import SciNotationDisplay from "@/components/SciNotationDisplay";
import InlineUnit from "@/components/factor/InlineUnit";

import { isSameUnits, splitUnitInventory } from "@/helpers/unitManagement";
import { formatNumberWithCommas } from "@/helpers/string-formatting";

interface FeedbackAreaProps {
  hook: Hook;
}

export default function FeedbackArea({ hook }: FeedbackAreaProps) {
  const { liveValue, liveUnits } = hook.derivedState;
  const { question } = hook.state;

  const isCorrectUnits = isSameUnits(liveUnits, question.targetUnit);
  const unitStyle = isCorrectUnits ? "text-green-500" : "text-amber-500";
  const [numerators, denominators] = splitUnitInventory(liveUnits);
  const textStyles =
    "text-base sm:text-lg md:text-xl lg:text-2xl xl:text-2xl 2xl:text-2xl";

  const numIsPlural = liveValue.fullValue !== 1;
  const denIsPlural = liveValue.fullValue !== 1;
  return (
    <>
      <div className="flex items-center gap-2">
        <span className="text-primary font-semibold">
          {formatNumberWithCommas(liveValue.fullValue)}
        </span>
        <span className={`text-gray-500 ${textStyles}`}>
          <SciNotationDisplay value={liveValue} showParentheses />
        </span>
      </div>

      <div
        className={`flex gap-1 whitespace-nowrap font-bold ${unitStyle} ${textStyles}`}
      >
        <InlineUnit
          unit={numerators}
          className={textStyles}
          isPlural={numIsPlural}
        />
        {Object.keys(denominators).length > 0 && (
          <>
            <span className="text-gray-400">/</span>
            <InlineUnit
              unit={denominators}
              className={textStyles}
              isPlural={denIsPlural}
            />
          </>
        )}
      </div>
    </>
  );
}
