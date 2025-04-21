interface MultiplicationSignProps {
  className?: string;
}

export default function MultiplicationSign({
  className = "",
}: MultiplicationSignProps) {
  return (
    <span className={`text-gray-500 dark:text-gray-400 ${className}`}>×</span>
  );
}
