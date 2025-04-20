import React from "react";
import { UnitInventory } from "@/types";
import { getUnitStrings } from "@/helpers/unitManagement";

interface UnitDisplayProps {
  unitInventory: UnitInventory;
  className?: string;
}

export default function UnitDisplay({
  unitInventory,
  className,
}: UnitDisplayProps) {
  const { numerators, denominators } = getUnitStrings(unitInventory);

  const numeratorUnits = numerators.map((unit) => (
    <span key={unit.name} className="whitespace-nowrap">
      {unit.name}
      {unit.exponent > 1 && <sup className="ml-0.5">{unit.exponent}</sup>}
    </span>
  ));

  const denominatorUnits = denominators.map((unit) => (
    <span key={unit.name} className="whitespace-nowrap">
      {unit.name}
      {unit.exponent > 1 && <sup className="ml-0.5">{unit.exponent}</sup>}
    </span>
  ));

  //does the job of interjecting ·'s when there are multiple units strung together
  const renderUnitsWithSeparator = (units: React.ReactElement[]) => (
    <div className="flex flex-wrap">
      {units.map((unit, index) => (
        <span key={index} className="flex items-center">
          {unit}
          {index < units.length - 1 && (
            <span className="mx-1 text-gray-400">·</span>
          )}
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`flex flex-col items-center w-32 md:w-40 lg:w-48 ${className}`}
    >
      <div className="min-h-[1.5em] flex items-center justify-center">
        {renderUnitsWithSeparator(numeratorUnits)}
      </div>
      <div className="w-full border-t border-gray-200 dark:border-gray-800 my-2" />
      <div className="min-h-[1.5em] flex items-center justify-center">
        {renderUnitsWithSeparator(denominatorUnits)}
      </div>
    </div>
  );
}
