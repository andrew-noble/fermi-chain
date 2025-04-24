import { useIsMobile } from "@/hooks/useIsMobile";
import { TutorialTooltip } from "../TutorialTooltip";

interface Props {
  unitSelection: React.ReactNode;
  fermiChain: React.ReactNode;
  feedback: React.ReactNode;
  resultsSection: React.ReactNode;
}

export default function ResponsiveGameLayout({
  unitSelection,
  fermiChain,
  feedback,
  resultsSection,
}: Props) {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col gap-2">
      {isMobile ? (
        <>
          <div className="border-b border-gray-800 p-2">{resultsSection}</div>
          <div className="border-b border-gray-800 p-2">
            <h2 className="font-semibold mb-2">Your Answer</h2>
            <div className="overflow-x-auto snap-x snap-mandatory">
              <div className="flex gap-2">{feedback}</div>
            </div>
          </div>

          <div className="border-b border-gray-800 p-2">
            <h2 className="font-semibold mb-2">Units</h2>
            <TutorialTooltip
              id="unit-selection-tooltip"
              content="Add units to numerator (×) or denominator (÷) here"
            >
              <div className="overflow-x-auto snap-x snap-mandatory">
                <div className="flex gap-2">{unitSelection}</div>
              </div>
            </TutorialTooltip>
          </div>

          <div className="border-b border-gray-800 p-2">
            <h2 className="font-semibold mb-2">Fermi Chain</h2>
            <div className="overflow-x-auto snap-x snap-mandatory">
              <div className="flex gap-2">{fermiChain}</div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Top Row */}
          <div className="p-3 border-b border-gray-800">
            <h2 className="text-base md:text-lg font-semibold mb-2">Units</h2>
            <TutorialTooltip
              id="unit-selection-tooltip"
              content="Add units to numerator (×) or denominator (÷) here"
            >
              <div className="flex flex-wrap gap-2">{unitSelection}</div>
            </TutorialTooltip>
          </div>

          {/* Middle Row */}
          <div className="flex-1 p-3 border-b border-gray-800">
            <h2 className="text-base md:text-lg font-semibold mb-2">
              Fermi Chain
            </h2>
            <div className="flex flex-wrap gap-2">{fermiChain}</div>
          </div>

          {/* Bottom Row */}
          <div className="border-b border-gray-800 p-2">
            <h2 className="text-base md:text-lg font-semibold mb-2">
              Your Answer
            </h2>
            <div className="flex flex-wrap gap-2">{feedback}</div>
          </div>
          <div className="mt-2">{resultsSection}</div>
        </>
      )}
    </div>
  );
}
