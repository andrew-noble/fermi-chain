import { Button } from "@/components/ui/button";
import { Operation } from "../types";
import { cn } from "@/lib/utils";

interface OperationBankProps {
  onAdd: (operation: Operation) => void;
  disabled?: boolean;
}

const operations: Operation[] = [
  { label: "Add", symbol: "+" },
  { label: "Subtract", symbol: "-" },
  { label: "Multiply", symbol: "x" },
  { label: "Divide", symbol: "÷" },
];

const OperationBank = ({ onAdd, disabled = false }: OperationBankProps) => (
  <div
    className={cn(
      "flex flex-col gap-2",
      disabled && "opacity-50 pointer-events-none"
    )}
  >
    {operations.map((op: Operation) => (
      <Button
        key={op.label}
        variant="outline"
        className="w-full px-6 py-8 flex justify-between items-center hover:bg-green-100/50"
        onClick={() => onAdd(op)}
        disabled={disabled}
      >
        <div className="text-left">
          <p className="font-medium">{op.label}</p>
        </div>
        <span className="text-xl font-bold">{op.symbol}</span>
      </Button>
    ))}
  </div>
);

export default OperationBank;
