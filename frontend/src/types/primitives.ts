export type Dimension = string;

export interface Unit {
  id: string; // non-display string "liters"
  name: string; // "liters or litros if we translate long term"
  dimension: Dimension;
  display?: string; //if not provided, name will be used
}

export interface Oom {
  id: string; //"1e6, 1e12, 1e3"
  value: number;
  exponent: number;
  nameISO?: string; //"mega, giga, kilo"
  nameShortScale?: string; //"million, billion, thousand"
}
