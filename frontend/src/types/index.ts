export interface UnpreparedQuestion {
  id: string;
  prompt: string;
  targetAnswer: number;
  unit: string;
  factors: UnpreparedFactor[];
  notes: string;
}

export interface UnpreparedFactor {
  label: string;
  targetValue: number;
  unit: string;
  isReciprocal: boolean; //this means a division. Hack way now-- will improve later
  isFraction: boolean;
  isRanged: boolean;
  rangePct?: number; //if ranged, this is the percentage of the range to use
  rangeStep?: number; //required for ranged factors, specifies how to round the range boundaries, and slider step
}

//note: don't fuck with ranged fractions for now-- the stepping logic does not work!

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
