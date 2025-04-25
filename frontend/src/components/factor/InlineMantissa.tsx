import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Telescope } from "lucide-react";
import MultiplicationSign from "@/components/MultiplicationSign";

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
    <>
      <span
        className={`inline-block w-[5.5rem] text-center mr-2 ${className} cursor-pointer`}
        onClick={() => setIsEditing(true)}
      >
        {mantissa.toString()}
      </span>
      <MultiplicationSign className="text-2xl md:text-3xl lg:text-4xl" />
    </>
  );
}
