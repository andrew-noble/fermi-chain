// components/layouts/ResponsiveGameLayout.tsx
import { useIsMobile } from "@/hooks/useIsMobile";
import DesktopLayout from "@/components/layouts/DesktopLayout";
import MobileLayout from "@/components/layouts/MobileLayout";

interface Props {
  unitSelection: React.ReactNode;
  fermiChain: React.ReactNode;
  results: React.ReactNode;
}

export default function ResponsiveGameLayout(props: Props) {
  const isMobile = useIsMobile();

  return isMobile ? (
    <MobileLayout
      top={props.unitSelection}
      middle={props.results}
      bottom={props.fermiChain}
    />
  ) : (
    <DesktopLayout
      top={props.unitSelection}
      middle={props.fermiChain}
      bottom={props.results}
    />
  );
}
