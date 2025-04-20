import { Panel } from "@/components/ui/Panel";
import { EditorHook, ChainHook } from "@/types";
import { resolveUnits, isSameUnits } from "@/helpers/unitManagement";
import { getUnitStrings } from "@/helpers/unitManagement";
// import { isSameOom } from "@/helpers/oomManagement";
import { InlineUnit } from "@/components/fermi-chain/display/InlineUnit";

interface FeedbackAreaProps {
  show: boolean;
  chain: ChainHook;
  editor: EditorHook;
}

export default function FeedbackArea({
  show,
  chain,
  editor,
}: FeedbackAreaProps) {
  if (!show) return null;

  //this isolated stage merge isn't architechturally amazing, but it works
  // Need to resolve the units the user has in the editor and committed to
  // the chain. If not editing, the editorUnits is a no-op
  const chainUnits = chain.derivedState.chainUnits;
  const editorUnits = editor.state.units;
  const liveUnits = resolveUnits([chainUnits, editorUnits]);

  const isCorrectUnits = isSameUnits(
    liveUnits,
    chain.state.question.targetUnits
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
      <div className="flex gap-2 items-center">
        <span>Your Answer: </span>
        <span className="text-primary font-semibold">
          {chain.derivedState.chainOom.value}
        </span>
        <div className={`flex gap-1 ${correctUnitsStyling(isCorrectUnits)}`}>
          <InlineUnit units={numerators} />
          <p> / </p>
          <InlineUnit units={denominators} />
        </div>
      </div>
    </Panel>
  );
}
