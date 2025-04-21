import { Oom } from "@/types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useIsMobile } from "@/hooks/useIsMobile";
interface InlineOomProps {
  oom: Oom;
  className?: string;
}

export function InlineOom({ oom, className }: InlineOomProps) {
  const isMobile = useIsMobile();

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

  const fullValue = oom.nameShortScale || oom.value.toString();

  //for mobile, a touch popover, for desktop, a hover tooltip
  return isMobile ? (
    <Popover>
      <PopoverTrigger asChild>
        <span
          className={`inline-block w-[3.5rem] text-center mr-2 ${className}`}
        >
          {getDisplayVersion(oom)}
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-2">
        <p>{fullValue}</p>
      </PopoverContent>
    </Popover>
  ) : (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          className={`inline-block w-[3.5rem] text-center mr-2 ${className}`}
        >
          {getDisplayVersion(oom)}
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p>{fullValue}</p>
      </TooltipContent>
    </Tooltip>
  );
}
