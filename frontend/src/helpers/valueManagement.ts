import { Oom, Value } from "@/types";
import { ooms, getOomById } from "@/data/ooms";

export const isSameOom = (a: number, b: number): boolean => {
  const aOom = Math.floor(Math.log10(a));
  const bOom = Math.floor(Math.log10(b));
  return aOom == bOom;
};

export const getClosestOom = (num: number): Oom => {
  const exp = Math.floor(Math.log10(num));
  return ooms.find((oom) => oom.exponent === exp) || getOomById("1e0"); // fallback to OOMS[0] if not found
};

//collapses a single numerator and denominator
export const collapseOom = (num: Oom, den: Oom): Oom => {
  return getClosestOom(num.value / den.value);
};

//resolves a whole list of N and D pairs
export const resolveOoms = (numerators: Oom[], denominators: Oom[]): Oom => {
  const numProduct = numerators.reduce((acc, oom) => acc * oom.value, 1);
  const denomProduct = denominators.reduce((acc, oom) => acc * oom.value, 1);
  return getClosestOom(numProduct / denomProduct);
};

// New Value creation and manipulation helpers
export const createValue = (fullValue: number): Value => {
  if (fullValue === 0) {
    return {
      mantissa: 0,
      oom: getClosestOom(1),
      getFullValue: () => 0,
    };
  }

  let currentExponent = Math.floor(Math.log10(Math.abs(fullValue)));
  let currentMantissa = Math.abs(fullValue) / Math.pow(10, currentExponent);

  // Normalize mantissa to be between 1.000 and 9.999
  while (currentMantissa >= 10) {
    currentMantissa /= 10;
    currentExponent += 1;
  }
  while (currentMantissa < 1 && currentMantissa !== 0) {
    currentMantissa *= 10;
    currentExponent -= 1;
  }

  // Round to 3 decimal places (4 significant digits)
  currentMantissa = Math.round(currentMantissa * 1000) / 1000;

  // Handle negative values
  if (fullValue < 0) {
    currentMantissa = -currentMantissa;
  }

  const oom = getClosestOom(Math.pow(10, currentExponent));

  return {
    mantissa: currentMantissa,
    oom,
    getFullValue: () => currentMantissa * oom.value,
  };
};

// Helper to get the full value from a Value object
export const getFullValue = (value: Value): number => {
  return value.mantissa * value.oom.value;
};

// Collapse a single numerator and denominator pair
export const collapseValue = (num: Value, den: Value): Value => {
  const fullValue = getFullValue(num) / getFullValue(den);
  return createValue(fullValue);
};

// Resolve a whole list of N and D pairs
export const resolveValues = (
  numerators: Value[],
  denominators: Value[]
): Value => {
  const numProduct = numerators.reduce(
    (acc, val) => acc * getFullValue(val),
    1
  );
  const denomProduct = denominators.reduce(
    (acc, val) => acc * getFullValue(val),
    1
  );
  return createValue(numProduct / denomProduct);
};

// Helper to format a value for display
export const formatValue = (value: Value): string => {
  const mantissa = value.mantissa.toFixed(3);
  if (value.oom.exponent === 0) {
    return mantissa;
  } else if (value.oom.exponent === 1) {
    return `${mantissa} × 10`;
  } else {
    return `${mantissa} × 10${value.oom.exponent}`;
  }
};
