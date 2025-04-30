import { useIsMobile } from "@/hooks/useIsMobile";

interface Props {
  unitSelection: React.ReactNode;
  fermiChain: React.ReactNode;
  feedback: React.ReactNode;
  gameButtonArea: React.ReactNode;
  showUnits?: boolean;
  showFermiChain?: boolean;
  showFeedback?: boolean;
  showResults?: boolean;
}

export default function ResponsiveGameLayout({
  unitSelection,
  fermiChain,
  feedback,
  gameButtonArea,
  showUnits = true,
  showFermiChain = true,
  showFeedback = true,
  showResults = true,
}: Props) {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col">
      {isMobile ? (
        <>
          {showResults && (
            <div className="border-b border-gray-800 p-1">{gameButtonArea}</div>
          )}
          {showFeedback && (
            <div className="border-b border-gray-800 p-1">
              <h2 className="font-semibold mb-1">Your Answer</h2>
              <div className="overflow-x-auto snap-x snap-mandatory flex gap-1 p-1">
                {feedback}
              </div>
            </div>
          )}
          {showUnits && (
            <div className="border-b border-gray-800 p-1">
              <h2 className="font-semibold mb-1">Units</h2>
              <div className="overflow-x-auto snap-x snap-mandatory flex gap-2">
                {unitSelection}
              </div>
            </div>
          )}
          {showFermiChain && (
            <div className="border-b border-gray-800 p-1">
              <h2 className="font-semibold mb-1">Fermi Chain</h2>
              <div className="overflow-x-auto snap-x snap-mandatory flex gap-4 p-1">
                {fermiChain}
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {/* Top Row */}
          {showUnits && (
            <div className="p-3 border-b border-gray-800">
              <h2 className="text-base md:text-lg font-semibold mb-2">Units</h2>
              <div className="flex flex-wrap gap-2">{unitSelection}</div>
            </div>
          )}

          {/* Middle Row */}
          {showFermiChain && (
            <div className="flex-1 p-3 border-b border-gray-800">
              <h2 className="text-base md:text-lg font-semibold mb-2">
                Fermi Chain
              </h2>
              <div className="flex flex-wrap gap-10">{fermiChain}</div>
            </div>
          )}

          {/* Bottom Row */}
          {showFeedback && (
            <div className="border-b border-gray-800 p-2">
              <h2 className="text-base md:text-lg font-semibold mb-2">
                Your Answer
              </h2>
              <div className="flex flex-wrap gap-2">{feedback}</div>
            </div>
          )}
          {showResults && <div className="mt-2">{gameButtonArea}</div>}
        </>
      )}
    </div>
  );
}
