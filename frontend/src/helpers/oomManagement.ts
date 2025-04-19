import { Oom } from "@/types";
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

export const resolveOoms = (numerators: Oom[], denominators: Oom[]): Oom => {
  const numProduct = numerators.reduce((acc, oom) => acc * oom.value, 1);
  const denomProduct = denominators.reduce((acc, oom) => acc * oom.value, 1);
  return getClosestOom(numProduct / denomProduct);
};
