import { Factor, Hook, Oom, UnitInventory } from "@/types";
import { collapseOom } from "./oomManagement";
import { getUnitStrings } from "./unitManagement";
import { formatNumberWithCommas } from "./formatNumber";

const superscriptMap: Record<number, string> = {
  0: "⁰",
  1: "¹",
  2: "²",
  3: "³",
  4: "⁴",
  5: "⁵",
  6: "⁶",
  7: "⁷",
  8: "⁸",
  9: "⁹",
};

const playerFeedback: Record<number, string> = {
  0: "Perfect! �",
  1: "Pretty close! 🔥",
  2: "Not quite! 🤔",
  3: "Wild Guess 😳",
};

const getUnitString = (units: UnitInventory) => {
  const { numerators, denominators } = getUnitStrings(units);
  const numUnitString = numerators
    .map((num) => num.name + superscriptMap[num.exponent])
    .join("-");
  const denUnitString = denominators
    .map((den) => den.name + superscriptMap[den.exponent])
    .join("-");
  return [numUnitString, denUnitString].join("/");
};

const getOomString = (oom: Oom) => {
  const oomExp = superscriptMap[oom.exponent];
  return `10${oomExp}`;
};

const getFullChainString = (factors: Factor[]) => {
  return factors
    .map((factor) => {
      const oom = collapseOom(factor.numeratorOom, factor.denominatorOom);
      const oomString = getOomString(oom);
      const units = getUnitString(factor.units);
      return `${oomString} ${units}`;
    })
    .join(" × ");
};

export default function getResultsString(hook: Hook) {
  const factorChainString = getFullChainString(hook.state.factors);

  return `Fermi Chain #${hook.state.question.id}

  Your Fermi Chain: ${factorChainString}

  Result: ${formatNumberWithCommas(
    hook.derivedState.chainOom.value
  )} ${getUnitString(hook.derivedState.chainUnits)}

  Actual: ${formatNumberWithCommas(
    hook.state.question.targetOom.value
  )} ${getUnitString(hook.state.question.targetUnits)}
  
  ${playerFeedback[hook.derivedState.oomDelta]}
  `;
}
