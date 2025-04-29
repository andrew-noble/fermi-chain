import { Hook } from "@/types";
import {
  formatNumberWithCommas,
  getInlineUnitString,
} from "@/helpers/string-formatting";

const SITE_URL = "https://fermi-chain.andrewnoble.me";

export const oomFeedback = (oomDelta: number) => {
  if (Math.abs(oomDelta) === 0) {
    return { text: "Correct order of magnitude! 🎯", color: "text-green-500" };
  } else if (Math.abs(oomDelta) === 1) {
    return { text: "One order of magnitude off! 🔥", color: "text-yellow-500" };
  } else if (Math.abs(oomDelta) === 2) {
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
    ? { text: "Correct units ✅", color: "text-green-500" }
    : { text: "Wrong units 🤔", color: "text-red-500" };
};

export const getSharableResultsString = (hook: Hook) => {
  const { id: questionId } = hook.state.question;
  const { liveValue, liveUnits, liveOomDelta } = hook.derivedState;

  const oomFeedbackText =
    liveOomDelta === 0
      ? "I got the correct order of magnitude! 🎯"
      : `I was off by ${liveOomDelta} orders of magnitude! 🤔`;

  return `Fermi Chain #${questionId}: ${hook.state.question.prompt}

  My Fermi Estimate: ${formatNumberWithCommas(
    liveValue.fullValue
  )} ${getInlineUnitString(liveUnits)}
  ${oomFeedbackText}

  Try it yourself -> ${SITE_URL}
  `;
};
