import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import MultiplicationSign from "@/components/MultiplicationSign";
import { TutorialOverlay } from "../TutorialOverlay";

interface InlineMantissaProps {
  mantissa: number;
  className?: string;
  onUpdateMantissa: (newMantissa: number) => void;
  onUpdateOom?: (newOomId: string) => void; // Optional callback for OOM updates
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
    // Allow up to 4 digits total with optional decimal
    if (/^\d{0,4}(\.\d{0,4})?$/.test(value)) {
      setInputValue(value);
    }
  };

  const handleSubmit = (e?: React.FormEvent<HTMLInputElement>) => {
    if (e) {
      e.preventDefault();
    }

    // Add a small delay to ensure blur event is processed
    setTimeout(() => {
      const newValue = parseFloat(inputValue);

      // Only validate that it's a valid number
      if (!isNaN(newValue) && newValue !== 0) {
        onUpdateMantissa(newValue);
        setIsEditing(false);
      } else {
        setInputValue(mantissa.toString());
        setIsEditing(false);
      }
    }, 0);
  };

  return isEditing ? (
    <div className="flex items-center gap-1">
      <Input
        ref={formRef}
        type="text"
        inputMode="decimal"
        maxLength={5} //max mantissa length, 4 numbers and a decimal
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleSubmit}
        onFocus={(e) => e.target.select()}
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
      <TutorialOverlay
        id="tutorial-mantissa"
        content="Add a precise mantissa"
        position="bottom"
      >
        <div
          className={`inline-flex items-center justify-center gap-1 px-1 py-0.5 rounded border border-gray-800 hover:border-gray-600 transition-colors cursor-pointer ${className}`}
          onClick={() => setIsEditing(true)}
        >
          <Pencil className="h-3 w-3 text-gray-400" />
          <span>{mantissa.toString()}</span>
        </div>
      </TutorialOverlay>

      <MultiplicationSign className={className} />
    </div>
  );
}
