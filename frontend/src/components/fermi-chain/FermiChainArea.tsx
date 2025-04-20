import { ChainHook, EditorHook } from "@/types";

import Editor from "@/components/fermi-chain/editor/Editor";
import FactorDisplay from "@/components/fermi-chain/display/FactorDisplay";
import PhantomFactorDisplay from "@/components/fermi-chain/display/PhantomFactorDisplay";

import { Button } from "@/components/ui/button";

interface FermiChainAreaProps {
  chain: ChainHook;
  editor: EditorHook;
}

export default function FermiChainArea({ chain, editor }: FermiChainAreaProps) {
  const factorList = chain.state.userFactors;
  const mode = chain.state.mode;

  const handleSubmit = () => {
    chain.actions.submitFactor(editor.state);
    editor.actions.reset();
  };

  const renderItems = () => {
    if (mode?.type === "EDITING") {
      return factorList.map((factor) =>
        factor.id === mode.idOfFactorBeingEdited ? (
          <Editor key={factor.id} editor={editor} onSubmit={handleSubmit} />
        ) : (
          <FactorDisplay
            key={factor.id}
            factor={factor}
            onEdit={() => chain.actions.startEdit(factor)}
            onRemove={() => chain.actions.removeFactor(factor)}
          />
        )
      );
    }

    // INIT: show just the start prompt
    if (mode?.type === "INIT") {
      return (
        <PhantomFactorDisplay
          isInit={true}
          onClick={() => {
            chain.actions.startEdit(null); // go to create mode
          }}
        />
      );
    }

    // DEFAULT: creating new factor
    return (
      <>
        {factorList.map((factor) => (
          <FactorDisplay
            key={factor.id}
            factor={factor}
            onEdit={() => chain.actions.startEdit(factor)}
            onRemove={() => chain.actions.removeFactor(factor)}
          />
        ))}
        <Editor editor={editor} onSubmit={handleSubmit} />
      </>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4">{renderItems()}</div>
      {mode?.type !== "INIT" && (
        <Button
          variant="outline"
          onClick={() => {
            chain.actions.reset();
            editor.actions.reset();
          }}
        >
          Start Over
        </Button>
      )}
    </div>
  );
}
