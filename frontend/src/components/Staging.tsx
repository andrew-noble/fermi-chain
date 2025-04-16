import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/Panel";
import { Oom } from "@/types";
import { StagingAreaState } from "@/types/stagingAreaTypes";
import { ooms, getOomById } from "@/data/ooms";

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

  return (
    <Panel>
      <h2 className="text-lg font-bold">Staging Area</h2>
      <p>
        Units:{" "}
        {Object.entries(state.units).map(([id, { count, unitMetadata }]) => (
          <span key={id}>
            {unitMetadata.name} (
            {count > 0
              ? "numerator x" + count
              : "denominator x" + Math.abs(count)}
            )
          </span>
        ))}
      </p>
      <p>Num OOM: {state.numeratorOom.id}</p>
      <p>Den OOM: {state.denominatorOom.id}</p>
      <div className="bg-red-400 p-4 rounded-lg m-3">
        <label htmlFor="oom-select-numerator">Select OOM for numerator</label>
        <select
          id="oom-select-numerator"
          value={selectedNumOOM.id}
          onChange={(e) => {
            const selected = ooms.find((oom) => oom.id === e.target.value);
            if (selected) setSelectedNumOOM(selected);
          }}
        >
          {ooms.map((oom) => (
            <option className="bg-blue-300" key={oom.id} value={oom.id}>
              {`10^${oom.exponent}`}
            </option>
          ))}
        </select>
        <Button onClick={() => onUpdateNumeratorOOM(selectedNumOOM)}>
          Set Numerator OOM
        </Button>
      </div>
      <div className="bg-red-400 p-4 rounded-lg m-3">
        <label htmlFor="oom-select-denominator">
          Select OOM for denominator
        </label>
        <select
          id="oom-select-denominator"
          value={selectedDenOOM.id}
          onChange={(e) => {
            const selected = ooms.find((oom) => oom.id === e.target.value);
            if (selected) setSelectedDenOOM(selected);
          }}
        >
          {ooms.map((oom) => (
            <option className="bg-blue-300" key={oom.id} value={oom.id}>
              {`10^${Math.log10(oom.value)}`}
            </option>
          ))}
        </select>
        <Button onClick={() => onUpdateDenominatorOOM(selectedDenOOM)}>
          Set Denominator OOM
        </Button>
      </div>
      <Button onClick={onReset}>Reset SA</Button>
      <Button onClick={onAddFactor}>Add Factor</Button>
    </Panel>
  );
}
