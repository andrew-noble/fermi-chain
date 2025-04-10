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
          <DialogTitle>About Fermi Game</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>
            Fermi Game is a brain teaser that challenges your ability to make
            real-world (if outlandish) estimates using reasonable assumptions
            and mathematical reasoning.
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
            . A version of this reasoning technique is the origin of the famous{" "}
            <a
              href="https://en.wikipedia.org/wiki/Fermi_paradox"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 hover:underline font-medium"
            >
              Fermi Paradox
            </a>
            , which predicts that we should have received alien signals by now
            👽.
          </p>
          <hr className="border-gray-200 dark:border-gray-700" />
          <p>
            I got some great feedback and interest on this idea. As of April 11,
            2025, I am currently building a much-improved v2.{" "}
          </p>
          <p>
            In the meantime, this game cycles through 4 different questions.
          </p>
          <hr className="border-gray-200 dark:border-gray-700" />
          <p>
            Built by Andrew Noble. I'd love it if you left feedback via the
            anonymous form on my{" "}
            <a
              href="https://www.andrewnoble.me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 hover:underline font-medium"
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
