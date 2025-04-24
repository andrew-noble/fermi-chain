import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// import { useEffect } from "react";

type TutorialTooltipProps = {
  id: string;
  content: React.ReactNode;
  children: React.ReactNode;
};

export function TutorialTooltip({ content, children }: TutorialTooltipProps) {
  const [show, setShow] = useState(false);

  // useEffect(() => {
  //   if (!localStorage.getItem(id)) {
  //     setShow(true);
  //     localStorage.setItem(id, "1");
  //   }
  // }, [id]);

  return (
    <Tooltip open={show}>
      <TooltipTrigger asChild onClick={() => setShow(false)}>
        {children}
      </TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </Tooltip>
  );
}
