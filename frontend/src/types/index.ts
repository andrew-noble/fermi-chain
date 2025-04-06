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

export interface Factor extends UnpreparedFactor {
  randomizedRange: [number, number] | null;
}

export interface Question extends UnpreparedQuestion {
  factors: Factor[];
}

export interface InputtedFactor extends Factor {
  id: string;
  userSelectedValue: number;
}
