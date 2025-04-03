import { Button } from "@/components/ui/button";
import { Factor } from "../types";

const formatNumber = (num: number) => {
  return num.toLocaleString();
};

const FactorBank = ({ factors, onAdd }: { factors: Factor[]; onAdd: any }) => (
  <div className="flex flex-col gap-2">
    {factors.map((factor: Factor) => (
      <Button
        key={factor.label}
        variant="outline"
        className="w-full px-6 py-8 flex justify-between items-center hover:bg-green-100/50"
        onClick={() => onAdd(factor)}
      >
        <div className="text-left">
          <p className="font-medium">{factor.label}</p>
          <p className="text-sm text-muted-foreground">{factor.unit}</p>
        </div>
        <span className="text-xl font-bold">{formatNumber(factor.value)}</span>
      </Button>
    ))}
  </div>
);

export default FactorBank;
