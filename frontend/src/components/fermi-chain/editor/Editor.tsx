import { EditorHook, EditorState } from "@/types";
import OomSelectors from "@/components/fermi-chain/editor/OomSelectors";
import UnitDisplay from "@/components/fermi-chain/display/UnitDisplay";
import OomDisplay from "../display/OomDisplay";
import { Button } from "@/components/ui/button";

interface EditorProps {
  editor: EditorHook;
  onSubmit: (editorState: EditorState) => void;
}

export default function Editor({ editor, onSubmit }: EditorProps) {
  return (
    <div className="flex flex-col items-center min-w-[200px] gap-2">
      <div className="flex flex-row items-center gap-4">
        {/* OOM's stacked on the left */}
        <OomSelectors
          onUpdateNumeratorOom={editor.actions.updateNumeratorOom}
          onUpdateDenominatorOom={editor.actions.updateDenominatorOom}
          currentNumeratorOom={editor.state.numeratorOom}
          currentDenominatorOom={editor.state.denominatorOom}
        />

        <OomDisplay
          numeratorOom={editor.state.numeratorOom}
          denominatorOom={editor.state.denominatorOom}
        />

        {/* Units on the right */}
        <UnitDisplay unitInventory={editor.state.units} />
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onSubmit(editor.state)}
      >
        Submit
      </Button>
    </div>
  );
}
