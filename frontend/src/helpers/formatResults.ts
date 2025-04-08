import { InputtedFactor, Question } from "@/types";
import { formatNumber, getFraction } from "./formatNumber";

// formatResults.ts
export interface StructuredResults {
  questionText: string;
  reasoningChain: string;
  userEstimateFormatted: string;
  referenceEstimateFormatted: string;
  postscript: string;
  targetUnit: string;
}

export function formatResults(
  question: Question,
  userInput: InputtedFactor[],
  userEstimate: number
): StructuredResults {
  const reasoningChain = userInput
    .map((factor) => {
      if (factor.isFraction) {
        const [numerator, denominator] = getFraction(factor.userSelectedValue);
        return `${numerator}/${denominator} ${factor.unit}`;
      }
      return `${formatNumber(factor.userSelectedValue)} ${factor.unit}`;
    })
    .join(" × ");

  return {
    questionText: `🎯 Fermi Game #${question.idNum}: “${question.prompt}”`,
    reasoningChain,
    userEstimateFormatted: `~${formatNumber(userEstimate)} ${
      question.targetUnit
    }`,
    referenceEstimateFormatted: formatNumber(question.targetAnswer),
    postscript: question.postscript,
    targetUnit: question.targetUnit,
  };
}

export function formatShare(results: StructuredResults): string {
  return [
    results.questionText,
    results.reasoningChain,
    `= ${results.userEstimateFormatted}`,
    results.postscript,
    `→ https://fermi.game`,
  ].join("\n\n");
}
