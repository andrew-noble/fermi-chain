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
    <div className="flex flex-col items-center w-full min-w-[200px] gap-2 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-primary/20">
      <div className="flex flex-col md:flex-row items-center gap-4 w-full">
        {/* OOM's stacked on the left */}
        <div className="w-full md:w-auto">
          <OomSelectors
            onUpdateNumeratorOom={editor.actions.updateNumeratorOom}
            onUpdateDenominatorOom={editor.actions.updateDenominatorOom}
            currentNumeratorOom={editor.state.numeratorOom}
            currentDenominatorOom={editor.state.denominatorOom}
          />
        </div>

        {/* Display container with responsive layout */}
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 w-full md:flex-1">
          <div className="w-full md:w-28 lg:w-32 flex justify-center md:justify-end">
            <OomDisplay
              numeratorOom={editor.state.numeratorOom}
              denominatorOom={editor.state.denominatorOom}
              className="text-2xl md:text-3xl lg:text-4xl"
            />
          </div>

          <div className="w-full md:w-28 lg:w-32 flex justify-center">
            <UnitDisplay
              unitInventory={editor.state.units}
              className="text-2xl md:text-3xl lg:text-4xl"
            />
          </div>
        </div>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          onSubmit(editor.state);
          editor.actions.reset();
        }}
      >
        Submit
      </Button>
    </div>
  );
}
