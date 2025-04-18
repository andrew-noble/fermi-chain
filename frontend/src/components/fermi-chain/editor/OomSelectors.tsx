import { Oom } from "@/types";
import { ooms } from "@/data/ooms";

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
      <button
        onClick={() => onUpdateNumeratorOom(getHigherOom(currentNumeratorOom))}
        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        Higher
      </button>
      <button
        onClick={() => onUpdateNumeratorOom(getLowerOom(currentNumeratorOom))}
        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        Lower
      </button>
      <button
        onClick={() =>
          onUpdateDenominatorOom(getHigherOom(currentDenominatorOom))
        }
        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        Higher
      </button>
      <button
        onClick={() =>
          onUpdateDenominatorOom(getLowerOom(currentDenominatorOom))
        }
        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        Lower
      </button>
    </div>
  );
}
