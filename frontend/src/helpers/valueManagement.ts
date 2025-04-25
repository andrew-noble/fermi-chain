import { Oom, Value } from "@/types";
import { ooms, getOomById } from "@/data/ooms";

export const getClosestOom = (num: number): Oom => {
  const exp = Math.floor(Math.log10(num));
  return ooms.find((oom) => oom.exponent === exp) || getOomById("1e0");
};

//this function is a little sus with its math, but its only called in here, watch out
const createValueFromNum = (rawValue: number): Value => {
  // Handle special cases
  if (!Number.isFinite(rawValue)) {
    throw new Error("Cannot create Value from non-finite number");
  }

  if (rawValue === 0) {
    return {
      mantissa: 0,
      oom: ooms.find((oom) => oom.exponent === 0) || getOomById("1e0"),
      fullValue: 0,
    };
  }

  // Convert to scientific notation string to avoid floating point issues
  const scientificStr = rawValue.toExponential(3);
  const [mantissaStr, exponentStr] = scientificStr.split("e");
  const mantissa = parseFloat(mantissaStr);
  const exponent = parseInt(exponentStr);

  // Find the OOM directly using the exponent
  const oom =
    ooms.find((oom) => oom.exponent === exponent) || getOomById("1e0");

  return {
    mantissa,
    oom,
    fullValue: mantissa * oom.value,
  };
};

export const createValueFromMantissaAndOom = (
  mantissa: number,
  oom: Oom
): Value => {
  return {
    mantissa,
    oom,
    fullValue: mantissa * oom.value,
  };
};

export const multiplyValues = (values: Value[]): Value => {
  const product = values.reduce((acc, val) => acc * val.fullValue, 1);
  return createValueFromNum(product);
};

// Resolve values - works with either single values or arrays
export const resolveValues = (
  numerators: Value | Value[],
  denominators: Value | Value[]
): Value => {
  // Convert single values to arrays
  const numArray = Array.isArray(numerators) ? numerators : [numerators];
  const denArray = Array.isArray(denominators) ? denominators : [denominators];

  const numProduct = numArray.reduce((acc, val) => acc * val.fullValue, 1);
  const denomProduct = denArray.reduce((acc, val) => acc * val.fullValue, 1);
  return createValueFromNum(numProduct / denomProduct);
};
