import { Hook } from "@/types";
import { OomSelector } from "@/components/fermi-chain/editor/OomSelector";
import { InlineUnit } from "@/components/fermi-chain/display/InlineUnit";
import { InlineOom } from "@/components/fermi-chain/display/InlineOom";
import { Button } from "@/components/ui/button";
import { getOomById } from "@/data/ooms";
import { getUnitStrings } from "@/helpers/unitManagement";

interface EditorProps {
  hook: Hook;
  onSubmit: () => void;
}

export default function Editor({ hook, onSubmit }: EditorProps) {
  const { numerators, denominators } = getUnitStrings(
    hook.state.editorState.units
  );
  const hasNoUnits = Object.values(hook.state.editorState.units).every(
    (unitCount) => unitCount.count === 0
  );
  const hasNoOoms =
    hook.state.editorState.numeratorOom === getOomById("1e0") &&
    hook.state.editorState.denominatorOom === getOomById("1e0");
  const isInvalid = hasNoUnits || hasNoOoms;

  return (
    <div className="flex flex-col items-center w-full min-w-[200px] gap-4 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-primary/20">
      {/* Numerator Row */}
      <div className="flex items-center gap-4 w-full">
        <OomSelector
          onUpdateOom={hook.actions.updateNumeratorOom}
          currentOom={hook.state.editorState.numeratorOom}
          title="numerator"
        />
        <div className="flex items-center gap-2 flex-1">
          <InlineOom
            oom={hook.state.editorState.numeratorOom}
            className="text-xl md:text-2xl lg:text-3xl"
          />
          <InlineUnit
            units={numerators}
            className="text-xl md:text-2xl lg:text-3xl"
          />
        </div>
      </div>

      <div className="w-full border-t border-gray-200 dark:border-gray-800 my-2" />

      {/* Denominator Row */}
      <div className="flex items-center gap-4 w-full">
        <OomSelector
          onUpdateOom={hook.actions.updateDenominatorOom}
          currentOom={hook.state.editorState.denominatorOom}
          title="denominator"
        />
        <div className="flex items-center gap-2 flex-1">
          <InlineOom
            oom={hook.state.editorState.denominatorOom}
            className="text-xl md:text-2xl lg:text-3xl"
          />
          <InlineUnit
            units={denominators}
            className="text-xl md:text-2xl lg:text-3xl"
          />
        </div>
      </div>

      <div className="flex flex-row gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={isInvalid}
          onClick={() => {
            onSubmit();
          }}
        >
          Submit
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            hook.actions.cancelEditing();
          }}
        >
          Clear
        </Button>
      </div>
    </div>
  );
}
