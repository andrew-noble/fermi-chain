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
    const v = formatNumberWithCommas(factor.numeratorValue.getFullValue());
    return `(${v} ${inline})`;
  });

  return string.join("·");
};

export const getSharableResultsString = (hook: Hook) => {
  const { targetAnswer, targetUnits, id: questionId } = hook.state.question;
  const { userValue, userUnit } = hook.derivedState;
  const { oomDelta } = hook.derivedState;

  const userChainString = getUserFermiChainString(hook);

  return `Fermi Chain #${questionId}

  Your Fermi Chain: ${userChainString}

  Result: ${formatNumberWithCommas(userValue.getFullValue())} ${getUnitStrings(
    userUnit
  )}

  Actual: ${formatNumberWithCommas(targetAnswer)} ${getUnitStrings(targetUnits)}
  
  ${oomFeedback(oomDelta).text}
  ${unitsFeedback(isSameUnits(userUnit, targetUnits)).text}
  `;
};

export const getResultsStrings = (hook: Hook) => {
  const { targetAnswer, targetUnits } = hook.state.question;
  const { userValue, userUnit } = hook.derivedState;
  const { oomDelta } = hook.derivedState;

  return {
    oomFeedback: oomFeedback(oomDelta),
    unitsFeedback: unitsFeedback(isSameUnits(userUnit, targetUnits)),
    playerChain: getUserFermiChainString(hook),
    playerResult: formatNumberWithCommas(userValue.getFullValue()),
    playerUnits: getUnitStrings(userUnit),
    actualResult: formatNumberWithCommas(targetAnswer),
    actualUnits: getUnitStrings(targetUnits),
  };
};
