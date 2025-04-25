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
  getResultsStrings,
} from "@/helpers/formatResults";

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

  const shareText = getSharableResultsString(hook);
  const results = getResultsStrings(hook);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Results</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <p className={`text-lg font-semibold ${results.oomFeedback.color}`}>
              {results.oomFeedback.text}
            </p>
            <p
              className={`text-lg font-semibold ${results.unitsFeedback.color}`}
            >
              {results.unitsFeedback.text}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              Your Fermi Chain:
            </h3>
            <p className="text-lg">{results.playerChain}</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              Result:
            </h3>
            <p className="text-lg">{results.playerResult}</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              Actual:
            </h3>
            <p className="text-lg">{results.actualResult}</p>
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
