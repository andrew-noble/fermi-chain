import { ooms, getOomById } from "@/data/ooms";
import { Button } from "@/components/ui/button";
import { TutorialOverlay } from "../TutorialOverlay";

interface InlineOomProps {
  oomId: string;
  className?: string;
  onUpdateOom: (oomId: string) => void;
}

export default function InlineOom({
  oomId,
  className,
  onUpdateOom,
}: InlineOomProps) {
  const getDisplayVersion = (oomId: string) => {
    const oom = getOomById(oomId);
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

  const getHigherOom = (currentOomId: string): string => {
    const currentIndex = ooms.findIndex((oom) => oom.id === currentOomId);
    return ooms[Math.min(currentIndex + 1, ooms.length - 1)].id;
  };

  const getLowerOom = (currentOomId: string): string => {
    const currentIndex = ooms.findIndex((oom) => oom.id === currentOomId);
    return ooms[Math.max(currentIndex - 1, 0)].id;
  };

  return (
    <div className={`flex flex-col gap-2 w-[3.5rem] text-center ${className}`}>
      <TutorialOverlay
        id="tutorial-oom"
        content="Adjust the order of magnitude"
        position="right"
      >
        <Button
          variant="outline"
          className="w-[3.5rem] h-8"
          onClick={() => onUpdateOom(getHigherOom(oomId))}
        >
          <span className="text-lg font-medium">+</span>
        </Button>
      </TutorialOverlay>
      <p>{getDisplayVersion(oomId)}</p>
      <Button
        variant="outline"
        className="w-[3.5rem] h-8"
        onClick={() => onUpdateOom(getLowerOom(oomId))}
      >
        <span className="text-lg font-medium">-</span>
      </Button>
    </div>
  );
}
