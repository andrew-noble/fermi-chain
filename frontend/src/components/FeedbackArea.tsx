import { Hook } from "@/types";
import SciNotationDisplay from "@/components/SciNotationDisplay";
import InlineUnit from "@/components/factor/InlineUnit";

import { resolveUnits, isSameUnits } from "@/helpers/unitManagement";
import {
  getUnitStrings,
  formatNumberWithCommas,
} from "@/helpers/string-formatting";
import { resolveValues } from "@/helpers/valueManagement";

interface FeedbackAreaProps {
  hook: Hook;
}

export default function FeedbackArea({ hook }: FeedbackAreaProps) {
  const { editorState, question } = hook.state;
  const { userValue, userUnit } = hook.derivedState;

  //collapse the committed value and whatever is in the editor
  const liveValue = resolveValues(
    [userValue, editorState.numeratorValue],
    editorState.denominatorValue
  );
  const liveUnits = resolveUnits([userUnit, editorState.unit]);

  const isCorrectUnits = isSameUnits(liveUnits, question.targetUnits);
  const unitStyle = isCorrectUnits ? "text-green-500" : "text-amber-500";

  console.log(liveValue);

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

      <div className={`flex gap-1 whitespace-nowrap font-bold ${unitStyle}`}>
        <InlineUnit unit={numerators} />
        {denominators.length > 0 && (
          <>
            <span className="text-gray-400">/</span>
            <InlineUnit unit={denominators} />
          </>
        )}
      </div>
    </>
  );
}
