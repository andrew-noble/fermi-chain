import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/display/ui/dialog";
import { Button } from "@/components/display/ui/button";
import {
  clearTutorialStorage,
  forceTutorialRerender,
} from "@/helpers/tutorial";

interface TutorialDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function TutorialDialog({
  open,
  onOpenChange,
}: TutorialDialogProps) {
  const handleResetTutorials = () => {
    clearTutorialStorage();
    forceTutorialRerender();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tutorial</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-semibold mb-2">Units Selection</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Add units to the numerator (×) or denominator (÷) from the unit
              selection area. This helps you build your Fermi estimation by
              selecting the appropriate units for your calculation.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">Fermi Chain</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Tune your orders-of-magnitude here. Adjust the exponents to refine
              your estimation and build a reasoning chain.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">Your Answer</h3>
            <p className="text-gray-600 dark:text-gray-300">
              See your current answer displayed here. The units will be
              highlighted in green if they match the target units.
            </p>
          </section>
        </div>
        <div className="mt-6 flex justify-between">
          <Button variant="outline" onClick={handleResetTutorials}>
            Reset Tutorial Overlays
          </Button>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
