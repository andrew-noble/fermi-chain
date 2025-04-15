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
  exponent: number;
  value: number;
}
