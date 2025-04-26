/**
 * These types aren't actually used in the app, they're just
 * for the lookup tables in data/ directory
 */

export interface Unit {
  id: string; // non-display string "liter"
  symbol: string; // display string "L"
  displayName: string; //often same as id "liter" or "golf ball"
  displayNamePlural: string;
  dimension: string;
}

export interface Oom {
  id: string; //"1e6, 1e12, 1e3"
  value: number;
  exponent: number;
  nameISO?: string; //"mega, giga, kilo"
  nameShortScale?: string; //"million, billion, thousand"
}
