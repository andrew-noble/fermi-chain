import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TutorialTooltip } from "./TutorialTooltip";

interface InlineMantissaProps {
  mantissa: number;
  className?: string;
  onUpdateMantissa: (newMantissa: number) => void;
}

export default function InlineMantissa({
  mantissa,
  className,
  onUpdateMantissa,
}: InlineMantissaProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(mantissa.toString());
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        handleSubmit();
      }
    };

    if (isEditing) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditing]);

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }
    const newValue = parseFloat(inputValue);

    // Validate the input is a number between 1 and 10
    if (!isNaN(newValue) && newValue >= 1 && newValue < 10) {
      onUpdateMantissa(newValue);
      setIsEditing(false);
    } else {
      setInputValue(mantissa.toString());
      setIsEditing(false);
    }
  };

  if (mantissa === 1 && !isEditing) {
    return (
      <div className="group relative">
        <span className="opacity-0 group-hover:opacity-100 transition-opacity">
          <TutorialTooltip
            id="add-mantissa"
            content="Click to add a specific mantissa value"
          >
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-1 absolute -left-6 top-1/2 -translate-y-1/2"
              onClick={() => {
                setIsEditing(true);
                setInputValue("1.5");
              }}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </TutorialTooltip>
        </span>
        <span className="text-gray-400">×</span>
      </div>
    );
  }

  return isEditing ? (
    <form ref={formRef} onSubmit={handleSubmit} className="inline-block">
      <Input
        type="text"
        inputMode="decimal"
        value={inputValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInputValue(e.target.value)
        }
        className={`w-[5.5rem] text-center mr-2 ${className}`}
        autoFocus
      />
    </form>
  ) : (
    <span
      className={`inline-block w-[5.5rem] text-center mr-2 ${className} cursor-pointer`}
      onClick={() => setIsEditing(true)}
    >
      {mantissa.toString()}
    </span>
  );
}
