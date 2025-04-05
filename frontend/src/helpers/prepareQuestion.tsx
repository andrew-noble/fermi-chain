import { UnpreparedQuestion, Question, Factor } from "@/types";

// Helper function to round numbers based on the factor's rangeStep
function roundNicely(num: number, rangeStep: number): number {
  // Handle zero case
  if (num === 0) return 0;
  return Math.round(num / rangeStep) * rangeStep;
}

function prepareQuestion(rawQuestion: UnpreparedQuestion): Question {
  // first pull out non-ranged factors and put them in result
  const preppedFactors: Factor[] = rawQuestion.factors
    .filter((f) => !f.isRanged)
    .map((f) => ({
      ...f,
      randomizedRange: null,
    }));

  for (const factor of rawQuestion.factors) {
    if (!factor.isRanged) continue;

    if (factor.rangeStep === undefined) {
      throw new Error(
        `Ranged factor "${factor.label}" must specify a rangeStep`
      );
    }

    const offset = factor.rangePct || 0.1;
    const delta = factor.value * offset;
    const randomShift = (Math.random() - 0.5) * delta;
    const min = roundNicely(
      factor.value - delta + randomShift,
      factor.rangeStep
    );
    const max = roundNicely(
      factor.value + delta + randomShift,
      factor.rangeStep
    );

    const preppedFactor: Factor = {
      ...factor,
      randomizedRange: [min, max],
    };

    preppedFactors.push(preppedFactor);
  }

  return {
    ...rawQuestion,
    factors: preppedFactors,
  };
}

export default prepareQuestion;
