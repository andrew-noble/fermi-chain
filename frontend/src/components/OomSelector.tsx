import { Oom } from "@/types";
import { ooms } from "@/data/ooms";
import { Button } from "@/components/ui/button";
import { TutorialTooltip } from "./TutorialTooltip";

interface OomSelectorProps {
  onUpdateOom: (oom: Oom) => void;
  currentOom: Oom;
  title: string;
}

export default function OomSelector({
  onUpdateOom,
  currentOom,
  title,
}: OomSelectorProps) {
  const getHigherOom = (currentOom: Oom): Oom => {
    const currentIndex = ooms.findIndex((oom) => oom.id === currentOom.id);
    return ooms[Math.min(currentIndex + 1, ooms.length - 1)];
  };

  const getLowerOom = (currentOom: Oom): Oom => {
    const currentIndex = ooms.findIndex((oom) => oom.id === currentOom.id);
    return ooms[Math.max(currentIndex - 1, 0)];
  };

  return (
    <TutorialTooltip
      id="oom-selector-tooltip"
      content="Adjust order-of-magnitude estimates here"
    >
      <div className="flex flex-col gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onUpdateOom(getHigherOom(currentOom))}
          title={`Increase ${title} order of magnitude`}
        >
          <span className="text-lg font-medium">+</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onUpdateOom(getLowerOom(currentOom))}
          title={`Decrease ${title} order of magnitude`}
        >
          <span className="text-lg font-medium">-</span>
        </Button>
      </div>
    </TutorialTooltip>
  );
}
