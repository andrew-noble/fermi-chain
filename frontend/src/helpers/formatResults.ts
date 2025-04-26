import { Hook } from "@/types";
import {
  formatNumberWithCommas,
  getUnitStrings,
} from "@/helpers/string-formatting";
import { isSameUnits } from "@/helpers/unitManagement";

export const oomFeedback = (oomDelta: number) => {
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

export const unitsFeedback = (unitsMatch: boolean) => {
  return unitsMatch
    ? { text: "Correct Units ✅", color: "text-green-500" }
    : { text: "Incorrect Units ❌", color: "text-red-500" };
};

export const getUserFermiChainString = (hook: Hook) => {
  const string = hook.state.factors.map((factor) => {
    const { inline } = getUnitStrings(factor.unit);
    const v = formatNumberWithCommas(factor.numeratorValue.fullValue);
    return `(${v} ${inline})`;
  });

  return string.join("·");
};

export const getSharableResultsString = (hook: Hook) => {
  const { targetValue, targetUnit, id: questionId } = hook.state.question;
  const { liveValue, liveUnits, liveOomDelta } = hook.derivedState;

  const userChainString = getUserFermiChainString(hook);

  return `Fermi Chain #${questionId}

  Your Fermi Chain: ${userChainString}

  Result: ${formatNumberWithCommas(liveValue.fullValue)} ${getUnitStrings(
    liveUnits
  )}

  Actual: ${formatNumberWithCommas(targetValue.fullValue)} ${getUnitStrings(
    targetUnit
  )}

  ${oomFeedback(liveOomDelta).text}
  ${unitsFeedback(isSameUnits(liveUnits, targetUnit)).text}
  `;
};
