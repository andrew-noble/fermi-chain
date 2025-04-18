import { GameHook, EditorHook } from "@/types";

import Editor from "@/components/fermi-chain/Editor";
import FactorDisplay from "./FactorDisplay";
import PhantomFactorDisplay from "./PhantomFactorDisplay";

import { Button } from "@/components/ui/button";

interface FermiChainAreaProps {
  game: GameHook;
  editor: EditorHook;
}

export default function FermiChainArea({ game, editor }: FermiChainAreaProps) {
  const factorList = game.state.userFactors;
  const mode = game.state.mode;

  const renderItems = () => {
    switch (mode.type) {
      case "VIEWING":
        return (
          //TODO: re-implement the multiplication signs!!
          <>
            {factorList.map((factor, index) => (
              <FactorDisplay
                key={factor.id}
                factor={factor}
                onEdit={() => {
                  game.actions.setMode({
                    type: "EDITING",
                    idOfFactorBeingEdited: factor.id,
                  });
                }}
              />
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
                <Editor />
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
              />
            ))}
            <Editor />
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
