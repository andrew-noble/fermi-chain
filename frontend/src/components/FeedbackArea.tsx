import { Panel } from "@/components/ui/Panel";
import { Hook } from "@/types";
import { resolveUnits, isSameUnits } from "@/helpers/unitManagement";
import { getUnitStrings } from "@/helpers/unitManagement";
// import { isSameOom } from "@/helpers/oomManagement";
import { InlineUnit } from "@/components/fermi-chain/display/InlineUnit";
import ResetButton from "@/components/fermi-chain/ResetButton";

interface FeedbackAreaProps {
  show: boolean;
  hook: Hook;
}

export default function FeedbackArea({ show, hook }: FeedbackAreaProps) {
  if (!show) return null;

  //this isolated stage merge isn't architechturally amazing, but it works
  // Need to resolve the units the user has in the editor and committed to
  // the chain. If not editing, the editorUnits is a no-op
  const chainUnits = hook.derivedState.chainUnits;
  const editorUnits = hook.state.editorState.units;
  const liveUnits = resolveUnits([chainUnits, editorUnits]);

  const isCorrectUnits = isSameUnits(
    liveUnits,
    hook.state.question.targetUnits
  );

  const correctUnitsStyling = (isCorrect: boolean) => {
    if (isCorrect) return "text-green-500";
    else return "text-yellow-500";
  };

  // //later, when user can do more granular than just oom, this do more lifting
  // const isCorrectOom = isSameOom(
  //   chain.derivedState.chainOom.value,
  //   chain.state.question.targetOom.value
  // );

  const { numerators, denominators } = getUnitStrings(liveUnits);

  return (
    <Panel>
      <div className="flex flex-row justify-between items-center">
        <div className="flex gap-2 items-center">
          <span>Your Answer: </span>
          <span className="text-primary font-semibold">
            {hook.derivedState.chainOom.value}
          </span>
          <div className="flex gap-1">
            <InlineUnit
              units={numerators}
              className={`${correctUnitsStyling(isCorrectUnits)}`}
            />
            <p> / </p>
            <InlineUnit
              units={denominators}
              className={`${correctUnitsStyling(isCorrectUnits)}`}
            />
          </div>
        </div>
        <ResetButton hook={hook} />
      </div>
    </Panel>
  );
}
