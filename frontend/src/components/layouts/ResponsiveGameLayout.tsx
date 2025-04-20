// components/layouts/ResponsiveGameLayout.tsx
import { useIsMobile } from "@/hooks/useIsMobile";
import DesktopLayout from "@/components/layouts/DesktopLayout";
import MobileLayout from "@/components/layouts/MobileLayout";

interface Props {
  unitSelection: React.ReactNode;
  fermiChain: React.ReactNode;
  feedback: React.ReactNode;
}

export default function ResponsiveGameLayout(props: Props) {
  const isMobile = useIsMobile();

  return isMobile ? (
    <MobileLayout
      top={props.unitSelection}
      middle={props.feedback}
      bottom={props.fermiChain}
    />
  ) : (
    <DesktopLayout
      top={props.unitSelection}
      middle={props.fermiChain}
      bottom={props.feedback}
    />
  );
}
