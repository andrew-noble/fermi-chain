import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import { formatNumber } from "@/helpers/formatNumber";
import { Hook } from "@/types";
import { useState } from "react";
import getResultsString from "@/helpers/formatString";

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

  const shareText = `I solved a Fermi problem! My answer: ${formatNumber(
    hook.derivedState.chainOom.value
  )}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 text-white rounded-lg p-6 shadow-lg max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold mb-2">
            Results
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <pre className="text-lg">{getResultsString(hook)}</pre>

          <Button
            onClick={() => {
              navigator.clipboard.writeText(shareText);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
            variant={copied ? "outline" : "default"}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
          >
            <Share className="h-4 w-4" />
            {copied ? "Copied to clipboard!" : "Share Results"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
