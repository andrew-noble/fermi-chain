interface MultiplicationSignProps {
  className?: string;
}

export default function MultiplicationSign({
  className = "",
}: MultiplicationSignProps) {
  return <span className={className}>×</span>;
}
