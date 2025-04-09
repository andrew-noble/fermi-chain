import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import { formatResults, formatShare } from "@/helpers/formatResults";
import { Question, InputtedFactor } from "@/types";
import { useState } from "react";

interface ResultDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  question: Question;
  userInput: InputtedFactor[];
  userEstimate: number;
}

export default function ResultDialog({
  open,
  onOpenChange,
  question,
  userInput,
  userEstimate,
}: ResultDialogProps) {
  const [copied, setCopied] = useState(false);

  const results = formatResults(question, userInput, userEstimate);
  const shareText = formatShare(results);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 text-white rounded-lg p-6 shadow-lg max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold mb-2">
            Results
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-zinc-300">You guessed:</p>

          <pre className="bg-zinc-800 text-purple-300 rounded p-4 text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">
            {results.reasoningChain}
            {"\n\n"}={" "}
            <span className="text-white font-semibold">
              {results.userEstimateFormatted}
            </span>
          </pre>

          <p className="text-zinc-300">
            <strong>Reference estimate:</strong>{" "}
            {results.referenceEstimateFormatted} {results.targetUnit}
          </p>

          <p className="text-lg text-zinc-100">{results.postscript}</p>

          <div className="flex justify-center pt-2">
            <Button
              onClick={() => {
                navigator.clipboard.writeText(shareText);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }}
              className={`flex items-center gap-2 bg-purple-600 hover:bg-purple-700 ${
                copied ? "bg-green-600 hover:bg-green-700" : ""
              }`}
            >
              <Share className="h-4 w-4" />
              {copied ? "Copied to clipboard!" : "Share Results"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
