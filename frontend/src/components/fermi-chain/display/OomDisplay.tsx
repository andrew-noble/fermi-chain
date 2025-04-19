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
  const getDisplayVersion = (oom: Oom) => {
    if (oom.exponent === 0) {
      return "1";
    } else if (oom.exponent === 1) {
      return "10";
    } else {
      return (
        <>
          10<sup className="ml-0.5">{oom.exponent}</sup>
        </>
      );
    }
  };

  return (
    <div
      className={`flex flex-col items-start w-16 md:w-20 lg:w-24 ${className}`}
    >
      <span className="font-mono text-gray-600 dark:text-gray-400">
        {getDisplayVersion(numeratorOom)}
      </span>
      <div className="border-t border-gray-200 dark:border-gray-800 w-full my-3" />
      <span className="font-mono text-gray-600 dark:text-gray-400">
        {getDisplayVersion(denominatorOom)}
      </span>
    </div>
  );
}
