import { Value, Oom } from "@/types";
import InlineUnit from "@/components/factor/InlineUnit";
import OomSelector from "@/components/factor/OomSelector";
import InlineOom from "@/components/factor/InlineOom";
import clsx from "clsx";
import InlineMantissa from "./InlineMantissa";
import SciNotationDisplay from "../SciNotationDisplay";

interface FactorRowProps {
  label: "numerator" | "denominator";
  value: Value;
  units: { name: string; exponent: number }[];
  editing: boolean;
  onUpdateMantissa: (mantissa: number) => void;
  onUpdateOom: (oom: Oom) => void;
}

export default function FactorRow({
  label,
  value,
  units,
  editing,
  onUpdateMantissa,
  onUpdateOom,
}: FactorRowProps) {
  return (
    <div
      className={clsx(
        "flex gap-1 w-full flex-1",
        editing
          ? "items-center"
          : label === "numerator"
          ? "items-end"
          : "items-start"
      )}
    >
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
        {editing ? (
          <>
            <InlineMantissa
              mantissa={value.mantissa}
              className="text-lg md:text-xl lg:text-2xl"
              onUpdateMantissa={onUpdateMantissa}
            />
            <InlineOom
              oom={value.oom}
              className="text-lg md:text-xl lg:text-2xl"
            />
          </>
        ) : (
          <SciNotationDisplay
            value={value}
            className="text-lg md:text-xl lg:text-2xl"
          />
        )}
        <InlineUnit units={units} className="text-lg md:text-xl lg:text-2xl" />
      </div>
      {editing && (
        <OomSelector
          title={label}
          currentOom={value.oom}
          onUpdateOom={onUpdateOom}
        />
      )}
    </div>
  );
}
