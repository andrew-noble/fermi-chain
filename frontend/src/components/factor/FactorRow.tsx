import { Oom } from "@/types";
import InlineUnit from "@/components/InlineUnit";
import OomSelector from "@/components/OomSelector";
import InlineOom from "@/components/InlineOom";
import clsx from "clsx";

interface FactorRowProps {
  label: "numerator" | "denominator";
  oom: Oom;
  units: { name: string; exponent: number }[];
  editing: boolean;
  onUpdateOom?: (oom: Oom) => void;
}

export default function FactorRow({
  label,
  oom,
  units,
  editing,
  onUpdateOom,
}: FactorRowProps) {
  return (
    <div className="flex items-center gap-1 w-full flex-1">
      {editing && (
        <OomSelector
          title={label}
          currentOom={oom}
          onUpdateOom={onUpdateOom!}
        />
      )}

      <div
        className={clsx(
          "flex gap-1 flex-1",
          editing
            ? "items-center"
            : label === "numerator"
            ? "items-end"
            : "items-start"
        )}
      >
        <InlineOom oom={oom} className="text-lg md:text-xl lg:text-2xl" />
        <InlineUnit units={units} className="text-lg md:text-xl lg:text-2xl" />
      </div>
    </div>
  );
}
