import { UnitInventory } from "@/types";
import { superscriptMap } from "./superscript";
import { UNITS } from "@/data/units";
import { splitUnitInventory } from "@/helpers/unitManagement";

export const getInlineUnitString = (inv: UnitInventory): string => {
  const [numerators, denominators] = splitUnitInventory(inv);

  //gets unit data from lookup table, puts it into a string
  const formatUnit = (unitId: string, power: number): string => {
    const unit = UNITS[unitId];
    if (!unit) {
      console.error(`Unit not found for ID: ${unitId}`);
      return unitId;
    }
    const name = unit.symbol ? unit.symbol : unit.displayNamePlural;
    const superscript = power === 1 ? "" : superscriptMap[Math.abs(power)];
    return `${name}${superscript}`;
  };

  //do for num.denom
  const numeratorStrings = Object.entries(numerators).map(([id, data]) =>
    formatUnit(id, data?.power ?? 0)
  );
  const denominatorStrings = Object.entries(denominators).map(([id, data]) =>
    formatUnit(id, data?.power ?? 0)
  );

  return denominatorStrings.length > 0
    ? `${numeratorStrings.join("·")}/${denominatorStrings.join("·")}`
    : numeratorStrings.join("·");
};
