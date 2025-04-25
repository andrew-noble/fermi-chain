import { Value } from "@/types";

interface SciNotationDisplayProps {
  value: Value;
  className?: string;
}

/**
 * Displays a value in scientific notation, with special handling for:
 * - Values with mantissa = 1 (shows just the OOM)
 * - Values with exponent = 0 (shows just the mantissa)
 * - Values with exponent = 1 (shows 10 instead of 10^1)
 * - Strips trailing zeros from mantissa for cleaner display
 */
export default function SciNotationDisplay({
  value,
  className = "",
}: SciNotationDisplayProps) {
  /**
   * Formats a mantissa by removing trailing zeros after the decimal point.
   * Examples:
   * - 1.000 -> "1"
   * - 1.500 -> "1.5"
   * - 1.234 -> "1.234"
   * - 1.230 -> "1.23"
   */
  const formatMantissa = (mantissa: number) => {
    // Convert to string and remove trailing zeros after decimal
    let str = mantissa.toString();
    if (str.includes(".")) {
      str = str.replace(/\.?0+$/, "");
    }
    return str;
  };

  return (
    <span className={className}>
      {value.mantissa === 1 ? (
        // If mantissa is 1, we can simplify the display
        value.oom.exponent === 0 ? (
          // If exponent is 0, just show 1
          "1"
        ) : (
          // Otherwise show 10^n
          <>
            10<sup>{value.oom.exponent === 1 ? "" : value.oom.exponent}</sup>
          </>
        )
      ) : (
        // For other mantissas, show full scientific notation
        <>
          {formatMantissa(value.mantissa)} × 10
          <sup>{value.oom.exponent === 1 ? "" : value.oom.exponent}</sup>
        </>
      )}
    </span>
  );
}
