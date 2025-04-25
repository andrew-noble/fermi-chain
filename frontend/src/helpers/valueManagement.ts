import { Oom, Value } from "@/types";
import { ooms, getOomById } from "@/data/ooms";

export const getClosestOom = (num: number): Oom => {
  const exp = Math.floor(Math.log10(num));
  return ooms.find((oom) => oom.exponent === exp) || getOomById("1e0");
};

// New Value creation and manipulation helpers
export const createValue = (rawValue: number): Value => {
  if (rawValue === 0) {
    return {
      mantissa: 0,
      oom: ooms.find((oom) => oom.exponent === 0) || getOomById("1e0"),
      getFullValue: () => 0,
    };
  }

  let currentExponent = Math.log10(rawValue);
  let currentMantissa = rawValue / Math.pow(10, currentExponent);

  // Normalize mantissa to be between 1.000 and 9.999
  while (currentMantissa >= 10) {
    currentMantissa /= 10;
    currentExponent += 1;
  }
  while (currentMantissa < 1 && currentMantissa !== 0) {
    currentMantissa *= 10;
    currentExponent -= 1;
  }

  // Round to 3 decimal places
  currentMantissa = parseFloat(currentMantissa.toFixed(3));

  // Find the OOM directly using the exponent
  const oom =
    ooms.find((oom) => oom.exponent === currentExponent) || getOomById("1e0");

  return {
    mantissa: currentMantissa,
    oom,
    getFullValue: () => currentMantissa * oom.value,
  };
};

// Resolve values - works with either single values or arrays
export const resolveValues = (
  numerators: Value | Value[],
  denominators: Value | Value[]
): Value => {
  // Convert single values to arrays
  const numArray = Array.isArray(numerators) ? numerators : [numerators];
  const denArray = Array.isArray(denominators) ? denominators : [denominators];

  const numProduct = numArray.reduce((acc, val) => acc * val.getFullValue(), 1);
  const denomProduct = denArray.reduce(
    (acc, val) => acc * val.getFullValue(),
    1
  );
  return createValue(numProduct / denomProduct);
};
