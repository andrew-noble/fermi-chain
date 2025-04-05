export interface UnpreparedQuestion {
  id: string;
  prompt: string;
  target_answer: number;
  unit: string;
  factors: UnpreparedFactor[];
  notes: string;
}

export interface UnpreparedFactor {
  label: string;
  value: number;
  unit: string;
  isRanged: boolean; //not all factors are fun with a guess range. weeks/year for ex
  rangePct?: number; //if ranged, this is the percentage of the range to use
  rangeStep?: number; //required for ranged factors, specifies how to round the range boundaries, and slider step
}

export interface Operation {
  label: string;
  symbol: string;
  operation: string;
}

export interface Factor extends UnpreparedFactor {
  randomizedRange: [number, number] | null;
}

export interface Question extends UnpreparedQuestion {
  factors: Factor[];
}

export type InputItem = {
  id: string;
  type: "factor" | "operation";
  data: Factor | Operation;
};

export type ValidationState = "init" | "valid" | "invalid";
