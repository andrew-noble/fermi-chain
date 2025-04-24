import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect } from "react";

type TutorialTooltipProps = {
  id: string;
  content: React.ReactNode;
  children: React.ReactNode;
};

export function TutorialTooltip({
  id,
  content,
  children,
}: TutorialTooltipProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem(id)) {
      setShow(true);
      sessionStorage.setItem(id, "1");
    }
  }, [id]);

  return (
    <Tooltip open={show}>
      <TooltipTrigger asChild onClick={() => setShow(false)}>
        {children}
      </TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </Tooltip>
  );
}
