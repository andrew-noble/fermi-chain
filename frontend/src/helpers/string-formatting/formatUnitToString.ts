import { UnitInventory } from "@/types";
import { superscriptMap } from "./superscript";
import { UNITS } from "@/data/units";

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
    .filter(([_, unitData]) => unitData?.power !== 0)
    .map(([unitId, unitData]) => {
      const exponent = unitData?.power ?? 0;
      // Don't show exponent 1 in display
      const displayExponent = Math.abs(exponent) === 1 ? 0 : Math.abs(exponent);
      return {
        name: UNITS[unitId].displayName,
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
