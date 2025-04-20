import { Panel } from "@/components/ui/Panel";
import { EditorHook, ChainHook } from "@/types";
import UnitDisplay from "@/components/fermi-chain/display/UnitDisplay";
import { resolveUnits, isSameUnits } from "@/helpers/unitManagement";
// import { isSameOom } from "@/helpers/oomManagement";

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

  const winStyling = (isCorrect: boolean) => {
    if (isCorrect) return "text-green-500";
    else return "text-yellow-500";
  };

  // //later, when user can do more granular than just oom, this do more lifting
  // const isCorrectOom = isSameOom(
  //   chain.derivedState.chainOom.value,
  //   chain.state.question.targetOom.value
  // );

  return (
    <Panel>
      <h2 className="text-lg font-bold">Results</h2>
      <div className={`flex flex-col gap-2 ${winStyling(isCorrectUnits)}`}>
        <p>Goal Units:</p>
        <UnitDisplay unitInventory={chain.state.question.targetUnits} />
        <p>Your Units:</p>
        <UnitDisplay unitInventory={liveUnits} />
      </div>
    </Panel>
  );
}
