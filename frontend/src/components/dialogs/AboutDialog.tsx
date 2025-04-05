import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
          <DialogTitle>About Fermi Game</DialogTitle>
          <DialogDescription>
            Learn about the game and its origins
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <p>
            Fermi Game is a brain teaser that challenges your ability to make
            real-world (if outlandish) estimates using reasonable assumptions
            and basic mathematical reasoning.
          </p>
          <p>
            It's named after the physicist Enrico Fermi, who was known for his
            ability to make useful{" "}
            <a
              href="https://en.wikipedia.org/wiki/Fermi_estimation"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
            >
              back-of-the-envelope calculations
            </a>
            .
          </p>
          <hr />
          <p>
            Built by Andrew Noble. I'd love it if you left feedback via the
            anonymous form on my{" "}
            <a
              href="https://www.andrewnoble.me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
            >
              website
            </a>
            .
          </p>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
