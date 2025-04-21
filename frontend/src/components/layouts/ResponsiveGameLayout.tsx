import { useIsMobile } from "@/hooks/useIsMobile";

interface Props {
  unitSelection: React.ReactNode;
  fermiChain: React.ReactNode;
  feedback: React.ReactNode;
}

export default function ResponsiveGameLayout(props: Props) {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col gap-2">
      {isMobile ? (
        <>
          <div className="border-b border-gray-800 p-2">
            <h2 className="font-semibold mb-2">Your Answer</h2>
            <div className="overflow-x-auto">
              <div className="flex space-x-4">{props.feedback}</div>
            </div>
          </div>

          <div className="border-b border-gray-800 p-2">
            <h2 className="font-semibold mb-2">Units</h2>
            <div className="overflow-x-auto">
              <div className="flex space-x-4">{props.unitSelection}</div>
            </div>
          </div>

          <div className="border-b border-gray-800 p-2">
            <h2 className="font-semibold mb-2">Fermi Chain</h2>
            <div className="overflow-x-auto">
              <div className="flex space-x-4">{props.fermiChain}</div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Top Row */}
          <div className="p-3 border-b border-gray-800">
            <h2 className="text-base md:text-lg font-semibold mb-2">Units</h2>

            {props.unitSelection}
          </div>

          {/* Middle Row */}
          <div className="flex-1 p-3 border-b border-gray-800">
            <h2 className="text-base md:text-lg font-semibold mb-2">
              Fermi Chain
            </h2>
            {props.fermiChain}
          </div>

          {/* Bottom Row */}
          <div className="p-3">
            <h2 className="text-base md:text-lg font-semibold mb-2">
              Your Answer
            </h2>
            {props.feedback}
          </div>
        </>
      )}
    </div>
  );
}
