import { Oom } from "@/types";

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

  return <span className={` ${className}`}>{getDisplayVersion(oom)}</span>;
}
