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

export const splitUnitInventory = (
  inv?: UnitInventory
): [UnitInventory, UnitInventory] => {
  const numerators: UnitInventory = {};
  const denominators: UnitInventory = {};

  if (!inv) return [numerators, denominators];

  Object.entries(inv).forEach(([id, { count, unitMetadata }]) => {
    if (count > 0) {
      numerators[id] = { count, unitMetadata };
    } else if (count < 0) {
      denominators[id] = { count: Math.abs(count), unitMetadata };
    }
  });

  return [numerators, denominators];
};
