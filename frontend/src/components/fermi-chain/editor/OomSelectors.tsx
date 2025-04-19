import { Oom } from "@/types";
import { ooms } from "@/data/ooms";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown } from "lucide-react";

interface OomSelectorsProps {
  onUpdateNumeratorOom: (oom: Oom) => void;
  onUpdateDenominatorOom: (oom: Oom) => void;
  currentNumeratorOom: Oom;
  currentDenominatorOom: Oom;
}

export default function OomSelectors({
  onUpdateNumeratorOom,
  onUpdateDenominatorOom,
  currentNumeratorOom,
  currentDenominatorOom,
}: OomSelectorsProps) {
  const getHigherOom = (currentOom: Oom): Oom => {
    const currentIndex = ooms.findIndex((oom) => oom.id === currentOom.id);
    return ooms[Math.min(currentIndex + 1, ooms.length - 1)];
  };

  const getLowerOom = (currentOom: Oom): Oom => {
    const currentIndex = ooms.findIndex((oom) => oom.id === currentOom.id);
    return ooms[Math.max(currentIndex - 1, 0)];
  };

  return (
    <div className="flex flex-col gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onUpdateNumeratorOom(getHigherOom(currentNumeratorOom))}
        title="Increase numerator order of magnitude"
      >
        <ChevronUp className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => onUpdateNumeratorOom(getLowerOom(currentNumeratorOom))}
        title="Decrease numerator order of magnitude"
      >
        <ChevronDown className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() =>
          onUpdateDenominatorOom(getHigherOom(currentDenominatorOom))
        }
        title="Increase denominator order of magnitude"
      >
        <ChevronUp className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() =>
          onUpdateDenominatorOom(getLowerOom(currentDenominatorOom))
        }
        title="Decrease denominator order of magnitude"
      >
        <ChevronDown className="h-4 w-4" />
      </Button>
    </div>
  );
}
