import { Hook } from "@/types";
import {
  formatNumberWithCommas,
  getUnitStrings,
} from "@/helpers/string-formatting";
import { isSameUnits } from "@/helpers/unitManagement";

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

export const getUserFermiChainString = (hook: Hook) => {
  const string = hook.state.factors.map((factor) => {
    const { inline } = getUnitStrings(factor.unit);
    const v = formatNumberWithCommas(factor.numeratorValue.fullValue);
    return `(${v} ${inline})`;
  });

  return string.join("·");
};

export const getSharableResultsString = (hook: Hook) => {
  const { targetAnswer, targetUnits, id: questionId } = hook.state.question;
  const { liveValue, liveUnits, liveOomDelta } = hook.derivedState;

  const userChainString = getUserFermiChainString(hook);

  return `Fermi Chain #${questionId}

  Your Fermi Chain: ${userChainString}

  Result: ${formatNumberWithCommas(liveValue.fullValue)} ${getUnitStrings(
    liveUnits
  )}

  Actual: ${formatNumberWithCommas(targetAnswer)} ${getUnitStrings(targetUnits)}
  
  ${oomFeedback(liveOomDelta).text}
  ${unitsFeedback(isSameUnits(liveUnits, targetUnits)).text}
  `;
};

export const getResultsStrings = (hook: Hook) => {
  const { targetAnswer, targetUnits } = hook.state.question;
  const { liveValue, liveUnits, liveOomDelta } = hook.derivedState;

  return {
    oomFeedback: oomFeedback(liveOomDelta),
    unitsFeedback: unitsFeedback(isSameUnits(liveUnits, targetUnits)),
    playerChain: getUserFermiChainString(hook),
    playerResult: formatNumberWithCommas(liveValue.fullValue),
    playerUnits: getUnitStrings(liveUnits),
    actualResult: formatNumberWithCommas(targetAnswer),
    actualUnits: getUnitStrings(targetUnits),
  };
};
