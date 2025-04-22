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
import { getSharableString, getResultsStrings } from "@/helpers/formatString";

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

  const shareText = getSharableString(hook);
  const results = getResultsStrings(hook);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Results</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p>Your Fermi Chain:</p>
          <p>{results.playerChain}</p>
          <p>Result: {results.playerResult}</p>
          <p>Actual: {results.actualResult}</p>
          <p>{results.playerFeedback}</p>

          <Button
            onClick={() => {
              navigator.clipboard.writeText(shareText);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
            variant={copied ? "outline" : "default"}
            className="flex items-center gap-2"
          >
            <Share className="h-4 w-4" />
            {copied ? "Copied to clipboard!" : "Share Results"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
