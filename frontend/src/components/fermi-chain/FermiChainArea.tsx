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

  //this nasty tree is gross but okay for now
  const renderItems = () => {
    switch (mode.type) {
      case "INIT":
        return (
          <PhantomFactorDisplay
            isInit={true}
            onClick={() => {
              chain.actions.setMode({ type: "CREATING" });
            }}
          />
        );
      case "VIEWING":
        return (
          <>
            {factorList.map((factor) => (
              <>
                <FactorDisplay
                  key={factor.id}
                  factor={factor}
                  onEdit={() => {
                    chain.actions.setMode({
                      type: "EDITING",
                      idOfFactorBeingEdited: factor.id,
                    });
                  }}
                  onRemove={() => chain.actions.removeFactor(factor)}
                />
              </>
            ))}
            <PhantomFactorDisplay
              isInit={false}
              onClick={() => {
                chain.actions.setMode({ type: "CREATING" });
              }}
            />
          </>
        );
      case "EDITING":
        return (
          <>
            {factorList.map((factor) =>
              factor.id === mode.idOfFactorBeingEdited ? (
                <Editor
                  editor={editor}
                  onSubmit={() => {
                    chain.actions.setMode({ type: "VIEWING" });
                  }}
                />
              ) : (
                <FactorDisplay
                  key={factor.id}
                  factor={factor}
                  onEdit={() => {
                    chain.actions.setMode({
                      type: "EDITING",
                      idOfFactorBeingEdited: factor.id,
                    });
                  }}
                  onRemove={() => chain.actions.removeFactor(factor)}
                />
              )
            )}
          </>
        );
      case "CREATING":
        return (
          <>
            {factorList.map((factor) => (
              <FactorDisplay
                key={factor.id}
                factor={factor}
                onEdit={() => {
                  chain.actions.setMode({
                    type: "EDITING",
                    idOfFactorBeingEdited: factor.id,
                  });
                }}
                onRemove={() => chain.actions.removeFactor(factor)}
              />
            ))}
            <Editor
              editor={editor}
              onSubmit={() => chain.actions.submitFactor(editor.state)}
            />
          </>
        );
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4">{renderItems()}</div>
      {mode.type !== "INIT" && (
        <Button
          variant="outline"
          onClick={() => {
            chain.actions.reset();
            editor.actions.reset();
          }}
        >
          Reset All
        </Button>
      )}
    </div>
  );
}
