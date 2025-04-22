import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AboutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AboutDialog({ open, onOpenChange }: AboutDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>About Fermi Chain</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>
            Fermi Chain is a brain teaser that challenges you ability to
            estimate in orders of magnitude.
          </p>
          <p>
            It's named after the physicist Enrico Fermi, who was known for his
            ability to make useful{" "}
            <a
              href="https://en.wikipedia.org/wiki/Fermi_estimation"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 hover:underline font-medium"
            >
              back-of-the-envelope calculations
            </a>
            . This reasoning technique is the origin of the famous{" "}
            <a
              href="https://en.wikipedia.org/wiki/Fermi_paradox"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 hover:underline font-medium"
            >
              Fermi Paradox
            </a>
            , which predicts that aliens ought to exist 👽.
          </p>
          <hr className="border-gray-200 dark:border-gray-700" />
          <p>
            Built by{" "}
            <a
              href="https://www.andrewnoble.me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 hover:underline font-medium"
            >
              Andrew Noble
            </a>
          </p>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
