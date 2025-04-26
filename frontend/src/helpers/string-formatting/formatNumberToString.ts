/**
 * Formats a number with both decimal precision and thousands separators.
 * For numbers >= 1000, uses toLocaleString for nice comma formatting.
 * For numbers < 1000, uses toFixed for nice decimal formatting.
 *
 * @param num The number to format
 * @returns A formatted string representation of the number
 */
export const formatNumberWithCommas = (num: number): string => {
  if (num >= 1000) {
    return num.toLocaleString(undefined, { maximumFractionDigits: 0 });
  } else {
    return num.toString();
  }
};
