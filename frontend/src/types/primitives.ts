/**
 * These types aren't actually used in the app, they're just
 * for the lookup tables in data/ directory
 */

export interface Unit {
  id: string; // non-display string "liter"
  symbol?: string; // this is the preffered display in-chain. "km", "kWh". Weird stuff like heart beats won't have it
  displayName: string; //often same as id "liter" or "golf ball". If no symbol, we do a plurality check and display this or the below one
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
