import { ooms } from "@/data/ooms";
import { Oom } from "@/types";
import { Button } from "@/components/ui/button";

interface InlineOomProps {
  oom: Oom;
  className?: string;
  onUpdateOom: (oom: Oom) => void;
}

export default function InlineOom({
  oom,
  className,
  onUpdateOom,
}: InlineOomProps) {
  const getDisplayVersion = (oom: Oom) => {
    if (oom.exponent === 0) {
      return "1";
    } else if (oom.exponent === 1) {
      return "10";
    } else {
      return (
        <>
          10<sup className="ml-0.5">{oom.exponent}</sup>
        </>
      );
    }
  };

  const getHigherOom = (currentOom: Oom): Oom => {
    const currentIndex = ooms.findIndex((oom) => oom.id === currentOom.id);
    return ooms[Math.min(currentIndex + 1, ooms.length - 1)];
  };

  const getLowerOom = (currentOom: Oom): Oom => {
    const currentIndex = ooms.findIndex((oom) => oom.id === currentOom.id);
    return ooms[Math.max(currentIndex - 1, 0)];
  };

  //for mobile, a touch popover, for desktop, a hover tooltip
  return (
    <div className={`flex flex-col gap-2 w-[3.5rem] text-center ${className}`}>
      <Button
        variant="outline"
        className="w-[3.5rem] h-8"
        onClick={() => onUpdateOom(getHigherOom(oom))}
      >
        <span className="text-lg font-medium">+</span>
      </Button>
      <p>{getDisplayVersion(oom)}</p>
      <Button
        variant="outline"
        className="w-[3.5rem] h-8"
        onClick={() => onUpdateOom(getLowerOom(oom))}
      >
        <span className="text-lg font-medium">-</span>
      </Button>
    </div>
  );
}
