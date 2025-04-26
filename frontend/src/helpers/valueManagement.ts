import { Value } from "@/types";
import { ooms, getOomById } from "@/data/ooms";

export const getClosestOomId = (num: number): string => {
  const exp = Math.floor(Math.log10(num));
  return ooms.find((oom) => oom.exponent === exp)?.id || "1e0";
};

//this function encodes an important characteristic of the app
//we allow mantissas between 1.001 and 999, but outside those,
//we adjust the oom and mantissa before storing
//this is a choice to make the values the most humane
export const createValueFromNum = (rawValue: number): Value => {
  // Handle special cases
  if (!Number.isFinite(rawValue)) {
    throw new Error("Cannot create Value from non-finite number");
  }

  if (rawValue === 0) {
    return {
      mantissa: 0,
      oomId: "1e0",
      fullValue: 0,
    };
  }

  // we preserve mantissas between 1.001 and 9999
  if (rawValue <= 9999 && rawValue >= 0.01) {
    return {
      mantissa: rawValue,
      oomId: "1e0",
      fullValue: rawValue,
    };
  }

  //otherwise, overflow into OOM and adjust mantissa accordingly
  const scientificStr = rawValue.toExponential(3);
  const [mantissaStr, exponentStr] = scientificStr.split("e");
  const mantissa = parseFloat(mantissaStr);
  const exponent = parseInt(exponentStr);

  //handle out of range
  if (exponent < -12 || exponent > 24) {
    // Return the closest valid OOM instead of throwing
    const closestExponent = Math.max(-12, Math.min(24, exponent));
    const oom = ooms.find((oom) => oom.exponent === closestExponent);
    if (!oom) throw new Error("Invalid OOM range configuration");
  }

  // Find the OOM directly using the exponent
  const oom = ooms.find((oom) => oom.exponent === exponent);
  if (!oom) {
    throw new Error("Cannot find OOM for exponent: " + exponent);
  }

  return {
    mantissa,
    oomId: oom.id,
    fullValue: mantissa * oom.value,
  };
};

export const createValueFromMantissaAndOom = (
  mantissa: number,
  oomId: string
): Value => {
  const oom = getOomById(oomId);
  return {
    mantissa,
    oomId,
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
