import { GameHook, EditorHook } from "@/types";

import Editor from "@/components/fermi-chain/editor/Editor";
import FactorDisplay from "@/components/fermi-chain/display/FactorDisplay";
import PhantomFactorDisplay from "@/components/fermi-chain/display/PhantomFactorDisplay";

import { Button } from "@/components/ui/button";

interface FermiChainAreaProps {
  game: GameHook;
  editor: EditorHook;
}

export default function FermiChainArea({ game, editor }: FermiChainAreaProps) {
  const factorList = game.state.userFactors;
  const mode = game.state.mode;

  //this nasty tree is gross but okay for now
  const renderItems = () => {
    switch (mode.type) {
      case "VIEWING":
        return (
          //TODO: re-implement the multiplication signs!! using index
          <>
            {factorList.map((factor) => (
              <>
                <FactorDisplay
                  key={factor.id}
                  factor={factor}
                  onEdit={() => {
                    game.actions.setMode({
                      type: "EDITING",
                      idOfFactorBeingEdited: factor.id,
                    });
                  }}
                  onRemove={() => game.actions.removeFactor(factor)}
                />
              </>
            ))}
            <PhantomFactorDisplay
              onClick={() => {
                game.actions.setMode({ type: "CREATING" });
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
                    game.actions.setMode({ type: "VIEWING" });
                  }}
                />
              ) : (
                <FactorDisplay
                  key={factor.id}
                  factor={factor}
                  onEdit={() => {
                    game.actions.setMode({
                      type: "EDITING",
                      idOfFactorBeingEdited: factor.id,
                    });
                  }}
                  onRemove={() => game.actions.removeFactor(factor)}
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
                  game.actions.setMode({
                    type: "EDITING",
                    idOfFactorBeingEdited: factor.id,
                  });
                }}
                onRemove={() => game.actions.removeFactor(factor)}
              />
            ))}
            <Editor
              editor={editor}
              onSubmit={() => game.actions.submitFactor(editor.state)}
            />
          </>
        );
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4">{renderItems()}</div>
      <Button variant="outline" onClick={game.actions.reset}>
        Reset All
      </Button>
    </div>
  );
}
