import React from "react";
import { UnitInventory } from "@/types";

interface UnitDisplayProps {
  unitInventory: UnitInventory;
  className?: string;
}

export default function UnitDisplay({
  unitInventory,
  className,
}: UnitDisplayProps) {
  //filters for numerator units in the UnitInventory
  const numeratorUnits = Object.entries(unitInventory)
    .filter(([_, unitCount]) => unitCount.count > 0)
    .map(([_, unitCount]) => (
      <span key={unitCount.unitMetadata.id} className="whitespace-nowrap">
        {unitCount.unitMetadata.name}
        {unitCount.count > 1 && <sup className="ml-0.5">{unitCount.count}</sup>}
      </span>
    ));

  //filters for denominator units in the UnitInventory
  const denominatorUnits = Object.entries(unitInventory)
    .filter(([_, unitCount]) => unitCount.count < 0)
    .map(([_, unitCount]) => (
      <span key={unitCount.unitMetadata.id} className="whitespace-nowrap">
        {unitCount.unitMetadata.name}
        {unitCount.count < -1 && (
          <sup className="ml-0.5">{Math.abs(unitCount.count)}</sup>
        )}
      </span>
    ));

  //does the job of interjecting ·'s when there are multiple units strung together
  const renderFilteredUnits = (units: React.ReactElement[]) => (
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
    <div className={`flex flex-col items-center min-w-[200px] ${className}`}>
      {renderFilteredUnits(numeratorUnits)}
      <div className="w-full border-t border-gray-200 dark:border-gray-800 my-2" />
      {renderFilteredUnits(denominatorUnits)}
    </div>
  );
}
