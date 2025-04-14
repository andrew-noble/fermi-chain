export type Dimension = string;

export interface Unit {
  id: string; // non-display string "liters"
  name: string; // "liters or litros if translate long term"
  display?: string; //if not provided, name will be used
  dimension: Dimension;
}

export interface OOM {
  id: string; //"1e6, 1e12, 1e3"
  nameISO?: string; //"mega, giga, kilo"
  nameShortScale?: string; //"million, billion, thousand"
  value: number;
}

export interface Factor {
  id: string; //will be a uuid (i think?)
  numeratorUnits: Unit[];
  denominatorUnits: Unit[];
  numeratorOOM: OOM; //i think these don't need to be lists
  denominatorOOM: OOM;
}

export interface Question {
  id: string;
  prompt: string;
  targetAnswer: number;
  targetOOM: OOM;
  targetNumeratorUnit: Unit; //not sure if this can be null
  targetDenominatorUnit: Unit | null;
}
