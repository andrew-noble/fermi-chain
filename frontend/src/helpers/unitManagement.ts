import { UnitInventory, Unit } from "@/types";

//strips unit counts of 0 out of a UnitInventory
export const removeZeroUnits = (inv: UnitInventory): UnitInventory =>
  Object.entries(inv).reduce<UnitInventory>(
    (acc, [id, { count, unitMetadata }]) => {
      if (count != 0) {
        acc[id] = { count, unitMetadata };
      }
      return acc;
    },
    {}
  );

//increases or decreases a specific unit inside a UnitInventory and strips out zeroes
export const updateUnitCount = (
  units: UnitInventory,
  unitMetadata: Unit,
  delta: number // +1 for increment, -1 for decrement
): UnitInventory => {
  //if not present, init count
  const newCount = (units[unitMetadata.id]?.count || 0) + delta;

  const newInv = {
    ...units,
    [unitMetadata.id]: {
      unitMetadata: unitMetadata,
      count: newCount,
    },
  };

  return removeZeroUnits(newInv);
};

//flattens list of unitInventories into one UnitInventory and strips out zeroes
export const resolveUnits = (inventories: UnitInventory[]): UnitInventory => {
  const newInv: UnitInventory = {};

  //unpack each factor's unitInventory into a master unitInventory
  inventories.forEach((inv) => {
    const units = Object.entries(inv);
    for (const [unitId, unitCount] of units) {
      if (!newInv[unitId]) {
        //init if this unit hasn't been seen yet
        newInv[unitId] = { ...unitCount };
      } else {
        //otherwise, record its count
        newInv[unitId].count += inv[unitId].count;
      }
    }
  });

  return removeZeroUnits(newInv);
};

export const isSameUnits = (
  inv1: UnitInventory,
  inv2: UnitInventory
): boolean => {
  return JSON.stringify(inv1) === JSON.stringify(inv2);
};

export interface UnitString {
  name: string;
  exponent: number;
}

export interface UnitStrings {
  numerators: UnitString[];
  denominators: UnitString[];
}

export const getUnitStrings = (inv: UnitInventory): UnitStrings => {
  const allUnits = Object.entries(inv)
    .filter(([_, unitCount]) => unitCount.count !== 0)
    .map(([_, unitCount]) => ({
      name: unitCount.unitMetadata.name,
      exponent: unitCount.count,
    }));

  return {
    numerators: allUnits.filter((unit) => unit.exponent > 0),
    denominators: allUnits
      .filter((unit) => unit.exponent < 0)
      .map((unit) => ({ ...unit, exponent: Math.abs(unit.exponent) })),
  };
};
