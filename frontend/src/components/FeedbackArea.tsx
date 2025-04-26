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

  return (
    <>
      <div className="flex items-center gap-2">
        <span className="text-primary font-semibold">
          {formatNumberWithCommas(liveValue.fullValue)}
        </span>
        <span className="text-gray-500 text-sm">
          <SciNotationDisplay value={liveValue} showParentheses />
        </span>
      </div>

      <div className={`flex gap-1 whitespace-nowrap font-bold ${unitStyle}`}>
        <InlineUnit unit={numerators} />
        {Object.keys(denominators).length > 0 && (
          <>
            <span className="text-gray-400">/</span>
            <InlineUnit unit={denominators} />
          </>
        )}
      </div>
    </>
  );
}
