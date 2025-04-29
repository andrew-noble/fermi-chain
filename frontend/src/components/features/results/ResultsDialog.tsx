import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/display/ui/dialog";
import { Button } from "@/components/display/ui/button";
import { Share } from "lucide-react";
import { Hook } from "@/types";
import { useState } from "react";
import {
  getSharableResultsString,
  oomFeedback,
  unitsFeedback,
} from "@/helpers/formatResults";
import { isSameUnits } from "@/helpers/unitManagement";
import { formatNumberWithCommas } from "@/helpers/string-formatting";
import MultiplicationSign from "@/components/display/ui/MultiplicationSign";
import FactorDisplay from "@/components/display/FactorDisplay";
import FullUnitDisplay from "@/components/display/FullUnitDisplay";

interface ResultsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hook: Hook;
}

export default function ResultsDialog({
  open,
  onOpenChange,
  hook,
}: ResultsDialogProps) {
  const [copied, setCopied] = useState(false);

  const { liveValue, liveUnits, liveOomDelta } = hook.derivedState;
  const { targetValue, targetUnit } = hook.state.question;
  const shareText = getSharableResultsString(hook);

  const unitsFb = unitsFeedback(isSameUnits(liveUnits, targetUnit));
  const oomFb = oomFeedback(liveOomDelta);

  const textStyles = "text-xl";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Results</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2 text-center">
            <p className={`${textStyles} font-semibold ${oomFb.color}`}>
              {oomFb.text}
            </p>
            <p className={`${textStyles} font-semibold ${unitsFb.color}`}>
              {unitsFb.text}
            </p>
          </div>

          {/* Player chain */}
          <div className="space-y-1">
            <h3 className="text-xl font-semibold">Your Fermi Chain:</h3>
            <div className="flex flex-wrap gap-2">
              {hook.state.factors.map((factor, index) => (
                <div key={factor.id} className="flex items-center gap-2">
                  <FactorDisplay factor={factor} className={textStyles} />
                  {index !== hook.state.factors.length - 1 && (
                    <MultiplicationSign className={textStyles} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-1 flex items-center justify-left gap-2">
            <p className="mb-0">= </p>
            <p className={`${textStyles} ${oomFb.color} mb-0`}>
              {formatNumberWithCommas(liveValue.fullValue)}{" "}
            </p>
            <FullUnitDisplay
              unit={liveUnits}
              className={`${textStyles} ${unitsFb.color}`}
            />
          </div>

          <hr className="border-gray-200 dark:border-gray-700" />

          {/* Target chain */}
          <div className="space-y-1">
            <h3 className="text-xl font-semibold">Our Fermi Chain:</h3>
            <div className="flex flex-wrap gap-2">
              {hook.state.question.targetChain.map((factor, index) => (
                <div
                  key={factor.label}
                  className="flex flex-col items-center gap-1 max-w-[200px]"
                >
                  <div className="flex items-center gap-2">
                    <FactorDisplay factor={factor} className={textStyles} />
                    {index !== hook.state.question.targetChain.length - 1 && (
                      <MultiplicationSign className={textStyles} />
                    )}
                  </div>
                  <p className="text-sm text-gray-500 text-center break-words whitespace-normal w-full">
                    {factor.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-1 flex items-center justify-left gap-2">
            <p className="mb-0">= </p>
            <p className={`${textStyles} mb-0`}>
              {formatNumberWithCommas(targetValue.fullValue)}{" "}
            </p>
            <FullUnitDisplay unit={targetUnit} className={textStyles} />
          </div>

          <Button
            onClick={() => {
              navigator.clipboard.writeText(shareText);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
            variant={copied ? "outline" : "default"}
            className="w-full flex items-center justify-center gap-2"
          >
            <Share className="h-4 w-4" />
            {copied ? "Copied to clipboard!" : "Share Results"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
