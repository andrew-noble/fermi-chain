import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/Panel";
import { Oom } from "@/types";
import { StagingAreaState } from "@/types/stagingAreaTypes";
import { ooms, getOomById } from "@/data/ooms";
import FactorDisplay from "@/components/display/FactorDisplay";

interface StagingPanelProps {
  state: StagingAreaState;
  onUpdateNumeratorOOM: (oom: Oom) => void;
  onUpdateDenominatorOOM: (oom: Oom) => void;
  onReset: () => void;
  onAddFactor: () => void;
}

export default function StagingPanel({
  state,
  onUpdateNumeratorOOM,
  onUpdateDenominatorOOM,
  onReset,
  onAddFactor,
}: StagingPanelProps) {
  const [selectedNumOOM, setSelectedNumOOM] = useState<Oom>(getOomById("1e0"));
  const [selectedDenOOM, setSelectedDenOOM] = useState<Oom>(getOomById("1e0"));

  // Create a temporary factor for display
  const tempFactor = {
    id: "staging", // Temporary ID for display purposes
    numeratorOom: state.numeratorOom,
    denominatorOom: state.denominatorOom,
    units: state.units,
  };

  return (
    <Panel
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Staging Area</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onReset}>
              Reset
            </Button>
            <Button size="sm" onClick={onAddFactor}>
              Add Factor
            </Button>
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Current Factor
          </h3>
          <div className="p-4 bg-gray-50 dark:bg-gray-950 rounded-lg">
            <FactorDisplay factor={tempFactor} />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Numerator Order of Magnitude
            </h3>
            <div className="flex items-center gap-2">
              <select
                className="flex-1 rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-1.5 text-sm"
                value={selectedNumOOM.id}
                onChange={(e) => {
                  const selected = ooms.find(
                    (oom) => oom.id === e.target.value
                  );
                  if (selected) setSelectedNumOOM(selected);
                }}
              >
                {ooms.map((oom) => (
                  <option key={oom.id} value={oom.id}>
                    {`10^${oom.exponent}`}
                  </option>
                ))}
              </select>
              <Button
                size="sm"
                onClick={() => onUpdateNumeratorOOM(selectedNumOOM)}
              >
                Update
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Denominator Order of Magnitude
            </h3>
            <div className="flex items-center gap-2">
              <select
                className="flex-1 rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-1.5 text-sm"
                value={selectedDenOOM.id}
                onChange={(e) => {
                  const selected = ooms.find(
                    (oom) => oom.id === e.target.value
                  );
                  if (selected) setSelectedDenOOM(selected);
                }}
              >
                {ooms.map((oom) => (
                  <option key={oom.id} value={oom.id}>
                    {`10^${oom.exponent}`}
                  </option>
                ))}
              </select>
              <Button
                size="sm"
                onClick={() => onUpdateDenominatorOOM(selectedDenOOM)}
              >
                Update
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}
