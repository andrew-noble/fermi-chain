import { Factor, Hook, Oom, UnitInventory } from "@/types";
import { getUnitStrings, isSameUnits } from "./unitManagement";
import { formatNumberWithCommas } from "./formatNumber";
import { collapseOom } from "./valueManagement";

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

const oomFeedback = (oomDelta: number) => {
  if (oomDelta === 0) {
    return { text: "Correct order of magnitude! 🎯", color: "text-green-500" };
  } else if (oomDelta === 1) {
    return { text: "One order of magnitude off! 🔥", color: "text-yellow-500" };
  } else if (oomDelta === 2) {
    return {
      text: "Not quite (2 orders of magnitude off)! 🤔",
      color: "text-yellow-500",
    };
  } else {
    return {
      text: "Wild Guess (3+ orders of magnitude off) 😳",
      color: "text-red-500",
    };
  }
};

const unitsFeedback = (unitsMatch: boolean) => {
  return unitsMatch
    ? { text: "Correct Units ✅", color: "text-green-500" }
    : { text: "Incorrect Units ❌", color: "text-red-500" };
};

export const getUnitString = (units: UnitInventory): string => {
  const { numerators, denominators } = getUnitStrings(units);

  const numUnitString = numerators
    .map(
      (unit) =>
        `${unit.name}${unit.exponent > 1 ? superscriptMap[unit.exponent] : ""}`
    )
    .join("·");

  const denUnitString = denominators
    .map(
      (unit) =>
        `${unit.name}${unit.exponent > 1 ? superscriptMap[unit.exponent] : ""}`
    )
    .join("·");

  return denUnitString ? `${numUnitString}/${denUnitString}` : numUnitString;
};

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

export const getFullChainString = (factors: Factor[]) => {
  return factors
    .map((factor) => {
      const oom = collapseOom(
        factor.numeratorValue.oom,
        factor.denominatorValue.oom
      );
      const oomString = getOomString(oom);
      const units = getUnitString(factor.units);
      return `${oomString} ${units}`;
    })
    .join(" × ");
};

export const getSharableString = (hook: Hook) => {
  const factorChainString = getFullChainString(hook.state.factors);

  return `Fermi Chain #${hook.state.question.id}

  Your Fermi Chain: ${factorChainString}

  Result: ${formatNumberWithCommas(
    hook.derivedState.chainValue.mantissa
  )} ${getUnitString(hook.derivedState.chainUnits)}

  Actual: ${formatNumberWithCommas(
    hook.state.question.targetAnswer
  )} ${getUnitString(hook.state.question.targetUnits)}
  
  ${oomFeedback(hook.derivedState.oomDelta).text}
  `;
};

export const getResultsStrings = (hook: Hook) => {
  const fullPlayerAnswer = `${formatNumberWithCommas(
    hook.derivedState.chainValue.mantissa
  )} ${getUnitString(hook.derivedState.chainUnits)}`;

  const fullActualAnswer = `${formatNumberWithCommas(
    hook.state.question.targetAnswer
  )} ${getUnitString(hook.state.question.targetUnits)}`;

  const oomFeedbackResult = oomFeedback(hook.derivedState.oomDelta);
  const unitsFeedbackResult = unitsFeedback(
    isSameUnits(hook.derivedState.chainUnits, hook.state.question.targetUnits)
  );

  return {
    playerChain: getFullChainString(hook.state.factors),
    playerResult: fullPlayerAnswer,
    actualResult: fullActualAnswer,
    oomFeedback: oomFeedbackResult.text,
    oomFeedbackColor: oomFeedbackResult.color,
    unitsFeedback: unitsFeedbackResult.text,
    unitsFeedbackColor: unitsFeedbackResult.color,
  };
};
