import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  FactorInfoWithLayout,
  SliderWithLayout,
} from "@/components/input/InputFactors";
import { InputtedFactor } from "@/types";
import { useState } from "react";

interface TutorialDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ExampleFactor = ({
  factor,
  isFirst,
  onValueChange,
}: {
  factor: InputtedFactor;
  isFirst: boolean;
  onValueChange: (value: number) => void;
}) => {
  return (
    <>
      {!isFirst && (
        <div className="flex justify-center items-center h-full">
          <div className="flex items-center justify-center m-2">
            <span className="text-2xl">×</span>
          </div>
        </div>
      )}
      <div className="grid grid-rows-[1fr_auto] bg-card text-card-foreground p-3 border rounded-lg gap-2 w-full max-w-[240px]">
        <div className="w-full">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">{factor.label}</p>
            <FactorInfoWithLayout factor={factor} />
            {factor.isRanged && (
              <div className="w-full">
                <div className="w-[200px] mx-auto">
                  <SliderWithLayout
                    factor={factor}
                    onSliderChange={onValueChange}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default function TutorialDialog({
  open,
  onOpenChange,
}: TutorialDialogProps) {
  const [exampleValue1, setExampleValue1] = useState(5);
  const [exampleValue2, setExampleValue2] = useState(10);

  const exampleFactor1 = {
    id: "example1",
    label: "Average pizzas per month",
    unit: "pizzas",
    userSelectedValue: exampleValue1,
    randomizedRange: [0, 20] as [number, number],
    rangeStep: 1,
    isFraction: false,
    targetValue: 10,
    isReciprocal: false,
    isRanged: true,
  };

  const exampleFactor2 = {
    id: "example2",
    label: "Cost per pizza",
    unit: "dollars",
    userSelectedValue: exampleValue2,
    randomizedRange: [5, 30] as [number, number],
    rangeStep: 1,
    isFraction: false,
    targetValue: 15,
    isReciprocal: false,
    isRanged: true,
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">How To Play</DialogTitle>
          <DialogDescription>
            String together factors to answer the question. Some factors are
            fixed, others have a slider to let you make an educated guess.
          </DialogDescription>
        </DialogHeader>
        <p className="font-semibold">Example</p>
        <div className="flex flex-col sm:flex-row gap-2">
          <ExampleFactor
            factor={exampleFactor1}
            isFirst={true}
            onValueChange={setExampleValue1}
          />
          <ExampleFactor
            factor={exampleFactor2}
            isFirst={false}
            onValueChange={setExampleValue2}
          />
        </div>
        <div className="p-2 text-card-foreground rounded-lg">
          <p className="text-sm">
            Monthly pizza spending:{" "}
            <span className="font-bold text-primary">
              ${exampleValue1 * exampleValue2}
            </span>
          </p>
        </div>
        <Button onClick={() => onOpenChange(false)}>Got it</Button>
      </DialogContent>
    </Dialog>
  );
}
