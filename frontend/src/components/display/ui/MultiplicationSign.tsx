interface MultiplicationSignProps {
  className?: string;
}

export default function MultiplicationSign({
  className = "text-xl",
}: MultiplicationSignProps) {
  return (
    <span
      className={`text-gray-400 dark:text-gray-500 italic font-normal ${className}`}
    >
      ×
    </span>
  );
}
