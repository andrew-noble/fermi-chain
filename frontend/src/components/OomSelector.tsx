import { Oom } from "@/types";
import { ooms } from "@/data/ooms";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown } from "lucide-react";

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
    <div className="flex flex-col gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onUpdateOom(getHigherOom(currentOom))}
        title={`Increase ${title} order of magnitude`}
      >
        <ChevronUp className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => onUpdateOom(getLowerOom(currentOom))}
        title={`Decrease ${title} order of magnitude`}
      >
        <ChevronDown className="h-4 w-4" />
      </Button>
    </div>
  );
}
