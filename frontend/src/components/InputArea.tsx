import { InputtedFactor } from "../types";
import FactorItem from "./FactorItem";

interface InputAreaProps {
  factors: InputtedFactor[];
  onFactorValueChange?: (itemId: string, newValue: number) => void;
}

const InputArea = ({ factors, onFactorValueChange }: InputAreaProps) => {
  return (
    <div className="flex flex-wrap gap-y-4">
      {factors.map((factor, index) => (
        <FactorItem
          key={factor.id}
          factor={factor}
          isFirst={index === 0}
          onFactorValueChange={(newValue) =>
            onFactorValueChange?.(factor.id, newValue)
          }
        />
      ))}
    </div>
  );
};

export default InputArea;
