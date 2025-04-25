import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Telescope, Pencil } from "lucide-react";
import MultiplicationSign from "@/components/MultiplicationSign";
import { TutorialOverlay } from "../TutorialOverlay";

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
  const formRef = useRef<HTMLInputElement>(null);

  //this effect makes it so clicking out of the mantissa form submits it
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

  // Handle input changes - only allow digits and one decimal point
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow digits and at most one decimal point
    if (/^[0-9]*\.?[0-9]*$/.test(value)) {
      setInputValue(value);
    }
  };

  const handleSubmit = (e?: React.FormEvent<HTMLInputElement>) => {
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

  const closed = mantissa === 1 && !isEditing;

  if (closed) {
    return (
      <TutorialOverlay
        id="first-mantissa-tutorial"
        content="Add a precision to the mantissa"
        position="bottom"
      >
        <Button
          variant="ghost"
          size="sm"
          className="h-6 px-1 opacity-30 hover:opacity-100 transition-opacity"
          onClick={() => {
            setIsEditing(true);
            setInputValue("1.0");
          }}
        >
          <Telescope className="h-3 w-3" />
        </Button>
      </TutorialOverlay>
    );
  }

  return isEditing ? (
    <div className="flex items-center gap-1">
      <Input
        ref={formRef}
        type="text"
        inputMode="decimal"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleSubmit}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
        className={`w-[5.5rem] text-center ${className}`}
        autoFocus
      />
      <MultiplicationSign className={className} />
    </div>
  ) : (
    <div className="flex items-center gap-1">
      <div
        className={`inline-flex items-center justify-center gap-1 px-1 py-0.5 rounded border border-gray-800 hover:border-gray-600 transition-colors cursor-pointer ${className}`}
        onClick={() => setIsEditing(true)}
      >
        <Pencil className="h-3 w-3 text-gray-400" />
        <span>{mantissa.toString()}</span>
      </div>
      <MultiplicationSign className={className} />
    </div>
  );
}
