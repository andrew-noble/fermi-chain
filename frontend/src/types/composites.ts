export interface Value {
  mantissa: number;
  oomId: string; // reference to OOM in lookup table
  fullValue: number;
}

// Inventory tracking unit structure with powers (positive for numerator, negative for denominator)
export type UnitInventory = Partial<{
  [unitId: string]: { power?: number };
}>;

// Base Types
export interface BaseFactor {
  unit: UnitInventory;
  numeratorValue: Value;
  denominatorValue: Value;
  label?: string;
}

export interface Question {
  id: string;
  prompt: string;
  targetValue: Value;
  targetUnit: UnitInventory;
  targetChain: BaseFactor[];
  UnitList: string[];
}

export interface Factor extends BaseFactor {
  id: string; //uuid
}
