import { useIsMobile } from "@/hooks/useIsMobile";

interface Props {
  unitSelection: React.ReactNode;
  fermiChain: React.ReactNode;
  feedback: React.ReactNode;
}

export default function ResponsiveGameLayout(props: Props) {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col min-h-0">
      {/* Top Row */}
      <div className="p-2">
        {isMobile ? props.feedback : props.unitSelection}
      </div>

      {/* Middle Row */}
      <div className="flex-1 p-2">
        {isMobile ? props.unitSelection : props.fermiChain}
      </div>

      {/* Bottom Row */}
      <div className="p-2">{isMobile ? props.fermiChain : props.feedback}</div>
    </div>
  );
}
