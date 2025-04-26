import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import MultiplicationSign from "@/components/MultiplicationSign";
import { TutorialOverlay } from "../TutorialOverlay";
import { createValueFromNum } from "@/helpers/valueManagement";

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
  onUpdateOom,
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

    // Add a small delay to ensure blur event is processed
    setTimeout(() => {
      const newValue = parseFloat(inputValue);

      // Only validate that it's a valid number
      if (!isNaN(newValue) && newValue !== 0) {
        // Convert to scientific notation to get proper mantissa and OOM
        const value = createValueFromNum(newValue);
        onUpdateMantissa(value.mantissa);
        // If we have an OOM callback, update that too
        if (onUpdateOom) {
          onUpdateOom(value.oomId);
        }
        setIsEditing(false);
      } else {
        setInputValue(mantissa.toString());
        setIsEditing(false);
      }
    }, 0);
  };

  return isEditing ? (
    <div className="flex items-center gap-1">
      <TutorialOverlay
        id="tutorial-mantissa"
        content="Add a precise mantissa"
        position="bottom"
      >
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
      </TutorialOverlay>

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
