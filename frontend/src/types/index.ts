export interface Question {
  id: string;
  prompt: string;
  target_answer: number;
  unit: string;
  factors: Factor[];
  notes: string;
}

export interface Factor {
  label: string;
  value: number;
  unit: string;
  ranged: boolean; //not all factors are fun with a guess range. weeks/year for ex
  range_pct?: number; //if ranged, this is the percentage of the range to use
  roundingStep?: number; //required for ranged factors, specifies how to round the range boundaries
}

export interface Operation {
  label: string;
  symbol: string;
  operation: string;
}

export interface PreparedFactor extends Factor {
  randomizedRange: [number, number] | null;
}

export interface PreparedQuestion extends Question {
  factors: PreparedFactor[];
}

export type InputItem = {
  id: string;
  type: "factor" | "operation";
  data: Factor | Operation;
};

export type ValidationState = "init" | "valid" | "invalid";
