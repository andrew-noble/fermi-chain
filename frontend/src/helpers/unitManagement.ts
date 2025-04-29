import { UnitInventory } from "@/types/composites";

//strips unit counts of 0 out of a UnitInventory
export const removeZeroUnits = (inv: UnitInventory): UnitInventory =>
  Object.entries(inv).reduce<UnitInventory>((acc, [id, unitData]) => {
    const power = unitData?.power ?? 0;
    if (power !== 0) {
      acc[id] = { power };
    }
    return acc;
  }, {});

//increases or decreases a specific unit inside a UnitInventory and strips out zeroes
export const updateUnitCount = (
  units: UnitInventory,
  unitId: string,
  delta: number // +1 for increment, -1 for decrement
): UnitInventory => {
  const currentPower = units[unitId]?.power ?? 0;
  const newPower = currentPower + delta;

  const newInv = {
    ...units,
    [unitId]: { power: newPower },
  };

  return removeZeroUnits(newInv);
};

//flattens list of unitInventories into one UnitInventory and strips out zeroes
export const resolveUnits = (inventories: UnitInventory[]): UnitInventory => {
  const newInv: UnitInventory = {};

  //unpack each factor's unitInventory into a master unitInventory
  inventories.forEach((inv) => {
    Object.entries(inv).forEach(([unitId, unitData]) => {
      const currentPower = newInv[unitId]?.power ?? 0;
      const addPower = unitData?.power ?? 0;
      newInv[unitId] = { power: currentPower + addPower };
    });
  });

  return removeZeroUnits(newInv);
};

export const isSameUnits = (
  inv1: UnitInventory,
  inv2: UnitInventory
): boolean => {
  //sorted in case I enter them in the wrong order or something
  const sortKeys = (obj: Record<string, any>) =>
    Object.fromEntries(Object.entries(obj).sort());
  return JSON.stringify(sortKeys(inv1)) === JSON.stringify(sortKeys(inv2));
};

export const splitUnitInventory = (
  inv?: UnitInventory
): [UnitInventory, UnitInventory] => {
  const numerators: UnitInventory = {};
  const denominators: UnitInventory = {};

  if (!inv) return [numerators, denominators];

  Object.entries(inv).forEach(([id, unitData]) => {
    const power = unitData?.power ?? 0;
    if (power > 0) {
      numerators[id] = { power };
    } else if (power < 0) {
      denominators[id] = { power: Math.abs(power) };
    }
  });

  return [numerators, denominators];
};
