import { Oom } from "@/types";
import { superscriptMap } from "./superscript";

const getOomString = (oom: Oom) => {
  const oomExp = superscriptMap[oom.exponent];
  if (oom.exponent === 0) {
    return "1";
  } else if (oom.exponent === 1) {
    return "10";
  } else {
    return `10${oomExp}`;
  }
};
