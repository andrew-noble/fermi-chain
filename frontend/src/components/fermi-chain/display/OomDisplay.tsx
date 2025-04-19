import { Oom } from "@/types";

interface OomDisplayProps {
  numeratorOom: Oom;
  denominatorOom: Oom;
  className?: string;
}

export default function OomDisplay({
  numeratorOom,
  denominatorOom,
  className,
}: OomDisplayProps) {
  return (
    <div className={`flex flex-col items-end ${className}`}>
      <span className="font-mono text-gray-600 dark:text-gray-400">
        {numeratorOom.value.toString()}
      </span>
      <div className="border-t border-gray-200 dark:border-gray-800 w-full my-1" />
      <span className="font-mono text-gray-600 dark:text-gray-400">
        {denominatorOom.value.toString()}
      </span>
    </div>
  );
}
