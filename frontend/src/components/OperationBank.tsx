import { Button } from "@/components/ui/button";
import { Operation } from "../types";
import { cn } from "@/lib/utils";

interface OperationBankProps {
  onAdd: (operation: Operation) => void;
}

const operations: Operation[] = [
  { label: "Multiply", symbol: "×", operation: "multiply" },
  { label: "Divide", symbol: "÷", operation: "divide" },
  { label: "Add", symbol: "+", operation: "add" },
  { label: "Subtract", symbol: "−", operation: "subtract" },
];

const OperationBank = ({ onAdd }: OperationBankProps) => (
  <div className={cn("grid grid-cols-2 gap-2 h-full")}>
    {operations.map((op: Operation) => (
      <Button
        key={op.label}
        variant="outline"
        className="w-full h-full px-6 py-8 flex justify-between items-center hover:bg-blue-200/50 border-blue-300 bg-blue-100/50"
        onClick={() => onAdd(op)}
      >
        <div className="text-left">
          <p className="font-medium text-blue-700">{op.label}</p>
        </div>
        <span className="text-4xl font-bold text-blue-600">{op.symbol}</span>
      </Button>
    ))}
  </div>
);

export default OperationBank;
