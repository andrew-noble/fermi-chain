import { Oom } from "@/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface InlineOomProps {
  oom: Oom;
  className?: string;
}

export function InlineOom({ oom, className }: InlineOomProps) {
  const getDisplayVersion = (oom: Oom) => {
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

  const fullValue = oom.value.toLocaleString();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className={`inline-block w-[2.5rem] text-center mr-2 ${className}`}
          >
            {getDisplayVersion(oom)}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{fullValue}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
