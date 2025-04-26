import { UnitInventory } from "@/types";
import { superscriptMap } from "./superscript";

export interface UnitString {
  name: string;
  exponent: number;
}

export interface UnitStrings {
  numerators: UnitString[];
  denominators: UnitString[];
  inline: string;
}

export const getUnitStrings = (inv: UnitInventory): UnitStrings => {
  const allUnits = Object.entries(inv)
    .filter(([_, unitCount]) => unitCount.count !== 0)
    .map(([_, unitCount]) => {
      const exponent = unitCount.count;
      // Don't show exponent 1 in display
      const displayExponent = Math.abs(exponent) === 1 ? 0 : Math.abs(exponent);
      return {
        name: unitCount.unitMetadata.name,
        exponent: exponent > 0 ? displayExponent : -displayExponent,
      };
    });

  const formatUnit = (unit: UnitString) => {
    return `${unit.name}${superscriptMap[Math.abs(unit.exponent)]}`;
  };

  const numerators = allUnits.filter((unit) => unit.exponent > 0);
  const denominators = allUnits.filter((unit) => unit.exponent < 0);
  const inline =
    denominators.length > 0
      ? `${numerators.map(formatUnit).join("·")}/${denominators
          .map(formatUnit)
          .join("·")}`
      : numerators.map(formatUnit).join("·");

  return {
    numerators,
    denominators,
    inline,
  };
};
