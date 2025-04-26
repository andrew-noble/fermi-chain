interface MultiplicationSignProps {
  className?: string;
}

export default function MultiplicationSign({
  className = "",
}: MultiplicationSignProps) {
  return (
    <span
      className={`text-gray-400 dark:text-gray-500 text-sm italic font-normal ${className}`}
    >
      ×
    </span>
  );
}
