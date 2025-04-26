import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
import MultiplicationSign from "./MultiplicationSign";
import { getUnitStrings } from "@/helpers/string-formatting";
import FactorDisplay from "./factor/FactorDisplay";

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

  const playerTextStyles = "text-xl";
  const targetTextStyles = "text-lg";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Results</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <p className={`${playerTextStyles} font-semibold ${oomFb.color}`}>
              {oomFb.text}
            </p>
            <p className={`${playerTextStyles} font-semibold ${unitsFb.color}`}>
              {unitsFb.text}
            </p>
          </div>

          {/* Player chain */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Your Fermi Chain:</h3>
            <div className="flex flex-wrap gap-2">
              {hook.state.factors.map((factor, index) => (
                <div key={factor.id} className="flex items-center gap-2">
                  <FactorDisplay factor={factor} className={playerTextStyles} />
                  {index !== hook.state.factors.length - 1 && (
                    <MultiplicationSign className={playerTextStyles} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <span>= </span>
            <span className={`${playerTextStyles} ${oomFb.color}`}>
              {formatNumberWithCommas(liveValue.fullValue)}{" "}
            </span>
            <span className={`${playerTextStyles} ${unitsFb.color}`}>
              {getUnitStrings(liveUnits).inline}
            </span>
          </div>

          <hr className="border-gray-200 dark:border-gray-700" />

          {/* Target chain */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Our Fermi Chain:</h3>
            <div className="flex flex-wrap gap-2">
              {hook.state.question.targetChain.map((factor, index) => (
                <div key={factor.label} className="flex items-center gap-2">
                  <FactorDisplay factor={factor} className={targetTextStyles} />
                  {index !== hook.state.question.targetChain.length - 1 && (
                    <MultiplicationSign className={targetTextStyles} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <span>= </span>
            <span className={`${targetTextStyles}`}>
              {formatNumberWithCommas(targetValue.fullValue)}{" "}
            </span>
            <span className={`${targetTextStyles}`}>
              {getUnitStrings(targetUnit).inline}
            </span>
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
