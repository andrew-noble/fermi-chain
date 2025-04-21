import { Panel } from "@/components/ui/Panel";
import { Hook } from "@/types";
import { resolveUnits, isSameUnits } from "@/helpers/unitManagement";
import { getUnitStrings } from "@/helpers/unitManagement";
// import { isSameOom } from "@/helpers/oomManagement";
import InlineUnit from "@/components/InlineUnit";
import { Button } from "./ui/button";
import { formatNumberWithCommas } from "@/helpers/formatNumber";
import { useState } from "react";
import ResultsDialog from "@/components/ResultsDialog";
interface FeedbackAreaProps {
  show: boolean;
  hook: Hook;
}

export default function FeedbackArea({ show, hook }: FeedbackAreaProps) {
  const [isResultsDialogOpen, setIsResultsDialogOpen] = useState(false);
  if (!show) return null;

  //this isolated stage merge isn't architechturally amazing, but it works
  // Need to resolve the units the user has in the editor and committed to
  // the chain. If not editing, the editorUnits is a no-op
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
            {formatNumberWithCommas(liveOom)}
          </span>
          <div className="flex gap-1">
            <InlineUnit
              units={numerators}
              className={`${correctUnitsStyling(isCorrectUnits)}`}
            />
            {denominators.length > 0 && (
              <>
                <p> / </p>
                <InlineUnit
                  units={denominators}
                  className={`${correctUnitsStyling(isCorrectUnits)}`}
                />
              </>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            className="bg-green-900 hover:bg-green-700"
            onClick={() => {
              hook.state.mode === "EDITING"
                ? hook.actions.updateFactor()
                : hook.actions.createFactor();
              setIsResultsDialogOpen(true);
            }}
          >
            Submit
          </Button>
          <Button
            className="bg-red-900 hover:bg-red-700"
            onClick={() => {
              hook.actions.reset();
            }}
          >
            Start Over
          </Button>
        </div>
      </div>
      <ResultsDialog
        open={isResultsDialogOpen}
        onOpenChange={setIsResultsDialogOpen}
        hook={hook}
      />
    </Panel>
  );
}
