import { Hook } from "@/types";

import Editor from "@/components/fermi-chain/editor/Editor";
import FactorDisplay from "@/components/fermi-chain/display/FactorDisplay";
import PhantomFactorDisplay from "@/components/fermi-chain/display/PhantomFactorDisplay";

import { Button } from "@/components/ui/button";

interface FermiChainAreaProps {
  hook: Hook;
}

export default function FermiChainArea({ hook }: FermiChainAreaProps) {
  const factorList = hook.state.factors;

  //shouldn't be here...
  const handleSubmit = () => {
    if (hook.state.mode === "EDITING") {
      hook.actions.updateFactor();
    } else {
      hook.actions.createFactor();
    }
    // After submission, ensure we're in create mode with a fresh editor
    hook.actions.startCreateMode();
  };

  const renderItems = () => {
    // EDIT: editing an existing factor
    if (hook.state.mode === "EDITING" && hook.state.editingFactor) {
      return factorList.map((factor) =>
        factor.id === hook.state.editingFactor?.id ? (
          <Editor key={factor.id} hook={hook} onSubmit={handleSubmit} />
        ) : (
          <FactorDisplay
            key={factor.id}
            factor={factor}
            onEdit={() => hook.actions.startEditMode(factor)}
            onRemove={() => hook.actions.deleteFactor(factor.id)}
          />
        )
      );
    }

    // INIT: show just the start prompt
    if (hook.state.mode === "INIT") {
      return (
        <PhantomFactorDisplay
          isInit={true}
          onClick={() => {
            hook.actions.startCreateMode();
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
            onEdit={() => hook.actions.startEditMode(factor)}
            onRemove={() => hook.actions.deleteFactor(factor.id)}
          />
        ))}
        <Editor hook={hook} onSubmit={handleSubmit} />
      </>
    );
  };

  return <div className="flex flex-wrap">{renderItems()}</div>;
}
