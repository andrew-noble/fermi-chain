import { UnpreparedQuestion, Question, Factor, InputtedFactor } from "@/types";
import { v4 as uuidv4 } from "uuid";

// Helper function to round numbers based on the factor's rangeStep
function roundNicely(num: number, rangeStep: number): number {
  // Handle zero case
  if (num === 0) return 0;
  return Math.round(num / rangeStep) * rangeStep;
}

function augmentQuestionWithFactorRanges(
  rawQuestion: UnpreparedQuestion
): Question {
  // first prep non-ranged factors and put them in prepped array
  const preppedFactors: Factor[] = rawQuestion.factors
    .filter((f) => !f.isRanged)
    .map((f) => ({
      ...f,
      randomizedRange: null,
    }));

  // now prep ranged factors
  for (const factor of rawQuestion.factors) {
    if (!factor.isRanged) continue;

    if (factor.rangeStep === undefined) {
      throw new Error(
        `Ranged factor "${factor.label}" must specify a rangeStep`
      );
    }

    //get the offset from the target value
    const offset = factor.rangePct || 0.1; //default to 10% window
    const delta = factor.targetValue * offset;
    const randomShift = (Math.random() - 0.5) * delta; //shift the window randomly around target value

    //round the min and max to the nearest rangeStep
    const min = roundNicely(
      factor.targetValue - delta + randomShift,
      factor.rangeStep
    );
    const max = roundNicely(
      factor.targetValue + delta + randomShift,
      factor.rangeStep
    );

    //augment the UnprepparedFactor to Factor w/ randomizedRange
    const preppedFactor: Factor = {
      ...factor,
      randomizedRange: [min, max],
    };

    //add to preppedFactors
    preppedFactors.push(preppedFactor);
  }

  //return the prepared question
  return {
    ...rawQuestion,
    factors: preppedFactors,
  };
}

function generateInputFactor(factor: Factor): InputtedFactor {
  let displayValue: number;

  //if the factor is ranged, generate a random displayValue within the range
  if (factor.isRanged && factor.randomizedRange) {
    const [min = 0, max = 100] = factor.randomizedRange;
    const step = factor.rangeStep || 1;
    const steps = Math.floor((max - min) / step);
    displayValue = min + Math.floor(Math.random() * steps) * step;
  } else {
    //otherwise its static
    displayValue = factor.targetValue;
  }

  return {
    ...factor,
    id: uuidv4(),
    userSelectedValue: displayValue,
  };
}

export { augmentQuestionWithFactorRanges, generateInputFactor };
