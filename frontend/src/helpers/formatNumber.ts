/**
 * Formats a number in a user-friendly way based on its magnitude.
 *
 * - Very small numbers (< 0.01): Uses scientific notation
 * - Billions (≥ 1B): Uses B suffix with no decimal places
 * - Millions (≥ 1M): Uses M suffix with no decimal places
 * - Thousands (> 1000): Uses commas as separators
 * - Numbers 1-5: Shows half steps (1.5, 2.0, 2.5, etc.)
 * - Numbers 5-10: Shows whole numbers
 * - Other medium numbers: Uses appropriate decimal places based on magnitude
 *
 * @param num The number to format
 * @returns A formatted string representation of the number
 */
export const formatNumber = (num: number): string => {
  // Handle zero case
  if (num === 0) return "0";

  // Get the absolute value to work with
  const absNum = Math.abs(num);

  // Determine the magnitude of the number
  const magnitude = Math.floor(Math.log10(absNum));

  // For very small numbers (less than 0.01)
  if (magnitude < -2) {
    // Format with scientific notation for very small numbers
    return num.toExponential(2);
  }

  // For billions (greater than 1 billion)
  if (magnitude >= 9) {
    // Format as billions with B suffix, no decimals
    return Math.round(num / 1e9) + "B";
  }

  // For millions (greater than 1 million)
  if (magnitude >= 6) {
    // Format as millions with M suffix, no decimals
    return Math.round(num / 1e6) + "M";
  }

  // For thousands (greater than 1000)
  if (magnitude > 3) {
    // Format with commas for thousands separators
    return num.toLocaleString(undefined, { maximumFractionDigits: 0 });
  }

  // For medium-sized numbers, format with appropriate decimal places
  if (magnitude < 0) {
    // For numbers between 0.01 and 1, show 2 decimal places
    return num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  } else if (magnitude === 0) {
    // For numbers between 1 and 10
    if (absNum <= 5) {
      // Check if the number is an integer
      if (Number.isInteger(num)) {
        // For integers between 1 and 5, show no decimal places
        return num.toLocaleString(undefined, { maximumFractionDigits: 0 });
      } else {
        // For non-integers between 1 and 5, show one decimal place
        return num.toLocaleString(undefined, {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        });
      }
    }
    // For numbers between 5 and 10, show whole numbers
    return num.toLocaleString(undefined, { maximumFractionDigits: 0 });
  } else {
    // For numbers between 10 and 1000, show no decimal places
    return num.toLocaleString(undefined, { maximumFractionDigits: 0 });
  }
};

//this is used for rendering fractions. Given a decimal, return numerator
//and denominator as a tuple
export const getFraction = (num: number): [number, number] => {
  // For 1/8 (0.125), we want to return [1, 8]
  // For common fractions like 1/2, 1/3, 1/4, 1/8, etc.
  const denominator = Math.round(1 / num);
  const numerator = 1;
  return [numerator, denominator];
};
