export type Dimension = string;

export interface Unit {
  id: string; // non-display string "liter"
  name: string; // "liters or litros if we translate long term"
  namePlural: string;
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

export interface Value {
  mantissa: number;
  oom: Oom;
  fullValue: number;
}

type UnitId = string;

// Common Structures
type UnitCount = {
  count: number;
  unitMetadata: Unit;
};

//structure for tracking what units are in num/denom
//count is positive? thats in the num, vv for denom
//note: there is special display logic to expel units with count = 0
export type UnitInventory = {
  [K in UnitId]: UnitCount;
};

// Base Types
export interface BaseFactor {
  unit: UnitInventory;
  numeratorValue: Value;
  denominatorValue: Value;
}

export interface Question {
  id: string;
  prompt: string;
  targetAnswer: number;
  targetOom: Oom;
  targetUnits: UnitInventory;
  usefulUnitList: Unit[];
}

export interface Factor extends BaseFactor {
  id: string; //uuid
}
